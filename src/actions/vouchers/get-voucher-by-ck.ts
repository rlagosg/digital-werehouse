import { Voucher } from "@/interfaces";
import prisma from "@/lib/prisma";
import { ProcessVoucher } from "./processData";

interface Resp{
    isLoading : boolean,
    voucher   : Voucher | null,
}

export const getVoucherByCk = async ( ck: number ) : Promise<Resp> => {

 // Obtener el voucher
    try {

        let isLoading = true;
        
        if (isNaN(Number(ck))) return {
            isLoading: false,
            voucher: null,
        }
        
        let voucherData:any;

        voucherData = await prisma.vouchers.findFirst({
            include:{
                bank: true,
                document: {
                    include: { scanDetails: true }
                },
                folder: { //voucher folder
                    select :{ 
                        id: true,
                        month: true,
                        firstVoucher: true,
                        lastVoucher: true,
                        folder: { //folder
                            select: {
                                name: true,
                                scanDetails: true,
                                description: true,
                                year: true,
                            }
                        }
                    },
                }
            },
            where: { check: ck },
        })

        
        //console.log(JSON.stringify(voucherData, null, 2));  
        const voucher: Voucher | null = ProcessVoucher(voucherData);
        
        if(voucherData)  isLoading = false;
        
        return {
            voucher,
            isLoading
        };
     
        
    } catch (error) {
        
        console.log('No se pudo cargar los ficheros: ' + error);       

        return {
            isLoading: false,
            voucher: null,
        }
    }
}

