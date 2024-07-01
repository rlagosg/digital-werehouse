'use server'

import { Voucher } from "@/interfaces";
import prisma from "@/lib/prisma";
import { ProcessFolder } from "./process-data";
import { processFilters } from "./process-filters";

export interface VouchersPaginationOptions {
    page?       : number;
    take?       : number;
    folder?     : string;
    search?     : string;
    startDate?  : string;
    endDate?    : string;
    startValue? : number;
    endValue?   : number;
}

export const getPaginatedVouchers = async ({
    page         = 1,
    take         = 16,
    folder       = "",
    search       = "",
    startDate    = "",
    endDate      = "",
    startValue   = -1,
    endValue     = -1,
  }: VouchersPaginationOptions) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    // Obtener los folders
    try {

        let isLoading = true;
        
        let whereFolder = folder != "" ? { name: folder } : {}
        const { whereVouchers } = processFilters({search, startDate, endDate, startValue, endValue,})

        let vouchers:any = [];

        vouchers = await prisma.folders.findMany({
            
            where: whereFolder,
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

                            where: whereVouchers,
                        }
                    }
                    
                }
            },
            take: take,
            skip: (page - 1) * take,
            
        });

        //console.log(JSON.stringify(vouchers, null, 2));            
        const vouchersData: Voucher[] = ProcessFolder(vouchers[0]);

        if(vouchersData)  isLoading = false;

        // Obtener el total de paginas
        const totalCount = vouchersData.length + 1;
        const totalPages = Math.ceil(totalCount / take);
        
        return {
            currentPage: page,
            totalPages: totalPages,
            vouchers: vouchersData,
            isLoading
        };
     
        
    } catch (error) {
        throw new Error('No se pudo cargar los ficheros: ' + error)
    }
}

