'use server'
import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';


import prisma from "@/lib/prisma";
import { z } from "zod";

import { convertStringCalendarToDate } from '@/utils';
import { Documents, Prisma } from "@prisma/client";

interface SimpleVoucher {
    id   : string;
    check: number
}

const voucherSchema = z.object({
    id            : z.string().uuid().optional().nullable(),
    check         : z.string(),
    checkDate     : z.string(),
    bankId        : z.string(),
    checkValue    : z.string(),
    beneficiary   : z.string(),
    description   : z.string().optional(),
    proyects      : z.string().optional(),
    idDocument    : z.string(),
    idScanDetails : z.string(),
    idFolder      : z.string(),
    folderName    : z.string(),
    scanEntryDate : z.string(),
    scanExitDate  : z.string().optional(),
    observations  : z.string().optional(),
    isNull        : z.string(),
})

interface Resp {
    ok      : boolean;
    message : string;
    voucher : SimpleVoucher | null;
}

interface SavePDFResult {
    filePath: string | null;
    pageCount: number;
}

export const createUpdateVoucher = async (formData: FormData): Promise<Resp> => {

    const data = Object.fromEntries(formData);
    const voucherParsed = voucherSchema.safeParse(data);

    if (!voucherParsed.success) {
        console.log(voucherParsed.error);
        return { 
            ok: false, 
            message: 'Error al parsear los datos',
            voucher: null
        };
    }

    const myVoucher = voucherParsed.data;
    const { id, ...rest } = myVoucher;
    console.log(rest.idFolder);
    console.log('hola mundo');
    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            let document: Documents | null = null;

            // Guarda el PDF si está presente
            if (formData.get('pdf') instanceof File) {
                const pdfFile = formData.get('pdf') as File;
                const pdf = await savePDF(pdfFile, rest.folderName, rest.check);

                if (!pdf) throw new Error('No se pudo guardar el PDF');

                const { filePath, pageCount } = pdf;

                if (id) {
                    if (filePath) {
                        document = await tx.documents.update({
                            data: {
                                pdfPath: filePath,
                                pages: pageCount
                            },
                            where: {
                                id: rest.idDocument
                            }
                        });
                    }
                } else {
                    const scanDetails = await tx.scanDetails.create({
                        data: {
                            observations: rest.observations || '',
                            scanEntryDate: convertStringCalendarToDate(rest.scanEntryDate),
                            scanExitDate: rest.scanExitDate ? convertStringCalendarToDate(rest.scanExitDate) : null,
                        }
                    });

                    document = await tx.documents.create({
                        data: {
                            scanDetailsId: scanDetails.id,
                            pages: pageCount,
                            pdfPath: filePath
                        }
                    });
                }
            }

            let voucherTx: SimpleVoucher;

            if (id) {
                /* Detalles del escanner */
                await tx.scanDetails.update({
                    data: {
                        scanEntryDate: convertStringCalendarToDate(rest.scanEntryDate),
                        scanExitDate: rest.scanExitDate ? convertStringCalendarToDate(rest.scanExitDate) : null,
                        observations: rest.observations,
                    },
                    where: {
                        id: rest.idScanDetails
                    }
                });

                /* Actualización del voucher */
                const voucherUpdate = await tx.vouchers.update({
                    data: {
                        bankId: rest.bankId,
                        check: Number(rest.check),
                        checkDate: convertStringCalendarToDate(rest.checkDate),
                        checkValue: Number(rest.checkValue),
                        beneficiary: rest.beneficiary,
                        description: rest.description,
                        proyects: rest.proyects,
                        isNull: rest.isNull === 'true' ? true : false,
                    },
                    where: { id }
                });

                voucherTx = {
                    id: voucherUpdate.id,
                    check: voucherUpdate.check,
                };

            } else {
                if (!document) {
                    throw new Error('No se pudo crear el documento.');
                }

                console.log(rest.idFolder);
                

                const voucherCreate = await tx.vouchers.create({
                    data: {
                        bankId: rest.bankId,
                        check: Number(rest.check),
                        checkDate: convertStringCalendarToDate(rest.checkDate),
                        checkValue: Number(rest.checkValue),
                        beneficiary: rest.beneficiary,
                        description: rest.description,
                        proyects: rest.proyects || '',
                        isNull: rest.isNull === 'true' ? true : false,
                        documentId: document.id,
                        folderId: rest.idFolder
                    }
                });

                voucherTx = {
                    id: voucherCreate.id,
                    check: voucherCreate.check,
                };
            }

            return { voucherTx };
        });

        return {
            ok: true,
            message: 'Voucher actualizado/creado con éxito',
            voucher: prismaTx.voucherTx
        };

    } catch (error) {
        let errMsg = '';

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002' && Array.isArray(error.meta?.target) && error.meta.target.includes('check')) {
                return {
                    ok: false,
                    message: 'Ya existe un Cheke con este Número.',
                    voucher: null
                };
            }
        }

        if (error instanceof Error) errMsg = error.message;

        return {
            ok: false,
            message: 'No se pudo actualizar/crear. \nDetalles: ' + errMsg,
            voucher: null
        };
    }
};


export const savePDF = async (pdf: File, folderName: string, check: string): Promise<{ filePath: string, pageCount: number } | null> => {
    try {
        const destinationFolder = path.join('C:\\DGT\\Vouchers', folderName);

        // Crear la carpeta si no existe
        if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder, { recursive: true });
        }

        // Genera el nombre del archivo
        const fileName = `CK${check}.pdf`;
        const filePath = path.join(destinationFolder, fileName);

        // Guardar el PDF como stream en disco
        const stream = fs.createWriteStream(filePath);
        stream.write(Buffer.from(await pdf.arrayBuffer()));
        stream.end();

        // Obtener el número de páginas del PDF
        const buffer = await pdf.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer);
        const pageCount = pdfDoc.getPageCount();

        return { filePath:fileName, pageCount };
    } catch (error) {
        console.error('Error guardando el PDF:', error);
        return null;
    }
};

export const getPDFPageCount = async (pdf: File): Promise<number> => {
    try {
        const buffer = await pdf.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer);
        return pdfDoc.getPageCount();
    } catch (error) {
        console.error('Error obteniendo el número de páginas del PDF:', error);
        return 0;
    }
};