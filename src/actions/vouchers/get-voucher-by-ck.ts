import { Voucher } from "@/interfaces";
import prisma from "@/lib/prisma";
import { ProcessVoucher } from "./process-voucher";

export const getVoucherByCk = async ( ck: number ) => {

 // Obtener el voucher
    try {

        
        let isLoading = true;
        
        if (isNaN(Number(ck))) return {
            isLoading: false,
            voucher: {},
        }

        
        let voucherData:any = [];

        voucherData = await prisma.folders.findFirst({
            select: { 
                name: true,
                scanDetails: true,
                description: true,
                year: true,
            
                VoucherFolder: {
                    select: {
                        id: true,
                        month: true,
                        firstVoucher: true,
                        lastVoucher: true,
                        
                        Voucher: {
                            include: {
                                bank: true,
                                document: {
                                    include: {
                                        scanDetails: true
                                    }
                                }
                            },

                            where: { check: ck },
                        }
                    }
                    
                }
            }
        });

        
        //console.log(JSON.stringify(voucherData, null, 2));         
        const voucher: Voucher = ProcessVoucher(voucherData);
        
        if(voucherData)  isLoading = false;
        
        return {
            voucher,
            isLoading
        };
     
        
    } catch (error) {
        throw new Error('No se pudo cargar los ficheros: ' + error)
    }
}

