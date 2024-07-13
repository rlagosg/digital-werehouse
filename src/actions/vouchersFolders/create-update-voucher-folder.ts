'use server'

import { VoucherFolder } from '@/interfaces';
import prisma from '@/lib/prisma';
import { convertStringCalendarToDate } from '@/utils';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

const FolderSchema =  z.object({
    id            : z.string().uuid().optional().nullable(),
    name          : z.string(),
    description   : z.string().optional(),
    year          : z.string(),
    month         : z.string(),
    firstVoucher  : z.string(),
    lastVoucher   : z.string(),
    idScanDetails : z.string(),
    scanEntryDate : z.string(),
    scanExitDate  : z.string().optional(),
    observations  : z.string().optional()
})

interface Resp {
    ok      : boolean;
    message : string;
    folder  : VoucherFolder | null;
}

export const createUpdateVoucherFolder = async ( formData: FormData ) :  Promise<Resp> => {

    const data = Object.fromEntries( formData );
    const folderParsed = FolderSchema.safeParse( data );

    if( !folderParsed.success){
        console.log( folderParsed.error);
        return { 
            ok: false, 
            message: 'Error al parsear los datos',
            folder: null
        }
    }

    const myFolder = folderParsed.data;

    const { id, ...rest } =  myFolder;

    try {

        const prismaTx = await prisma.$transaction( async (tx) => {

            let folderTx: VoucherFolder;
       
            if ( id ) {

                const scanDetails = await prisma.scanDetails.update({
                    data: {
                        scanEntryDate : convertStringCalendarToDate(rest.scanEntryDate),
                        scanExitDate  : rest.scanExitDate ? convertStringCalendarToDate(rest.scanExitDate) : null,
                        observations  : rest.observations || '',
                    },
                    where: {
                        id: rest.idScanDetails
                    }
                });

                const folder = await prisma.folders.update({
                    data: {
                        name          : rest.name,
                        year          : Number(rest.year),
                        description   : rest.description,
                        scanDetailsId : scanDetails.id,
                        folderType    : 'voucher'
                    },
                    where :{
                        name: rest.name
                    }
                });

                const dbVoucherFolder = await prisma.voucherFolders.update({
                    data: {
                        firstVoucher : Number(rest.firstVoucher),
                        lastVoucher  : Number(rest.lastVoucher),
                        month        : Number(rest.month),
                        folderId     : folder.id,
                    },
                    where : {
                        id: id
                    }
                });

                folderTx = {
                    id           : dbVoucherFolder.id,
                    scanDetails  : scanDetails,
                    name         : folder.name,
                    month        : dbVoucherFolder.month,
                    description  : folder.description || '',
                    year         : folder.year,
                    firstVoucher : dbVoucherFolder.firstVoucher,
                    lastVoucher  : dbVoucherFolder.lastVoucher            
                }

            }else {


                const scanDetails = await prisma.scanDetails.create({
                    data: {
                        scanEntryDate : convertStringCalendarToDate(rest.scanEntryDate),
                        scanExitDate  : rest.scanExitDate ? convertStringCalendarToDate(rest.scanExitDate) : null,
                        observations  : rest.observations || '',
                    }
                });

                const folder = await prisma.folders.create({
                    data: {
                        name          : rest.name,
                        year          : Number(rest.year),
                        description   : rest.description,
                        scanDetailsId : scanDetails.id,
                        folderType    : 'voucher'
                    },
                });

                const dbVoucherFolder = await prisma.voucherFolders.create({
                    data: {
                        firstVoucher : Number(rest.firstVoucher),
                        lastVoucher  : Number(rest.lastVoucher),
                        month        : Number(rest.month),
                        folderId     : folder.id,
                    }
                });

                folderTx = {
                    id           : dbVoucherFolder.id,
                    scanDetails  : scanDetails,
                    name         : folder.name,
                    month        : dbVoucherFolder.month,
                    description  : folder.description || '',
                    year         : folder.year,
                    firstVoucher : dbVoucherFolder.firstVoucher,
                    lastVoucher  : dbVoucherFolder.lastVoucher            
                }

            }

            return {folderTx}

        })
        
        return {
            ok: true,
            message: 'Folder actualizado/creado con éxito',
            folder: prismaTx.folderTx, // Cambia esto según sea necesario
        };
        
    } catch (error) {
        
        let  errMsg = '';

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002' && Array.isArray(error.meta?.target) && error.meta.target.includes('name')) {
                return {
                    ok: false,
                    message: 'Ya existe un propietario con esta Identidad.',
                    folder: null
                };
            }
        }

        if (error instanceof Error) errMsg = error.message;

        return {
            ok: false,
            message: 'No se pudo actualizar/crear. \nDetalles: ' + errMsg,
            folder: null
        }
    }

}