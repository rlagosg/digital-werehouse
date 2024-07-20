'use server'

import prisma from "@/lib/prisma";
import { z } from "zod";

import { convertStringCalendarToDate } from '@/utils';
import { Prisma } from "@prisma/client";

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

export const createUpdateVoucher = async ( formData: FormData ) : Promise<Resp> => {

    const data = Object.fromEntries( formData );
    const voucherParsed = voucherSchema.safeParse( data );

    if( !voucherParsed.success){
        console.log( voucherParsed.error);
        return { 
            ok: false, 
            message: 'Error al parsear los datos',
            voucher: null
        }
    }

    const myVoucher = voucherParsed.data;
    const { id, ...rest} = myVoucher;

    try {
        
        const prismaTx = await prisma.$transaction( async (tx) => {

            let voucherTx: SimpleVoucher;

            if ( id ) {
                
                /* Detalles del escanner */
                const scanDetails = await prisma.scanDetails.update({
                    data: {
                        scanEntryDate : convertStringCalendarToDate(rest.scanEntryDate),
                        scanExitDate  : rest.scanExitDate ? convertStringCalendarToDate(rest.scanExitDate) : null,
                        observations  : rest.observations,
                    },
                    where: {
                        id: rest.idScanDetails
                    }
                });


                /* Actualizacion del voucher */
                const voucherUpdate = await prisma.vouchers.update({
                    data: {
                        bankId      : rest.bankId,
                        check       : Number(rest.check),
                        checkDate   : convertStringCalendarToDate(rest.checkDate),
                        checkValue  : Number(rest.checkValue),
                        beneficiary : rest.beneficiary,
                        description : rest.description,
                        proyects    : rest.proyects,
                        isNull      : rest.isNull === 'true' ? true : false,
                    },
                    where: { id }
                })

                voucherTx = {
                    id: voucherUpdate.id,
                    check: voucherUpdate.check,
                }

            }else {

                voucherTx = {
                    id: '',
                    check: 0,
                }

            }            

            return { voucherTx }

        })

        return {
            ok: true,
            message: 'Voucher actualizado/creado con éxito',
            voucher: prismaTx.voucherTx
        }

    } catch (error) {

        let  errMsg = '';

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
        }
    }

}
