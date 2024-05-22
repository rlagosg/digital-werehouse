'use server'

import { VoucherFolder } from "@/interfaces";
import prisma from "@/lib/prisma";
import { ProcessVoucherFolder } from "./process-folder-voucher";


interface PaginationOptions {
    page?     : number;
    take?     : number;
    folder?   : string;
    year?     : number;
}

type itemsSearch = 'folder' | 'year' | 'none'

export const getPaginatedVoucherFolders = async ({
    page    = 1,
    take    = 16,
    folder  = "",
    year    = -1,
  }: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    const itemSelectd: itemsSearch =
            folder !== '' ? 'folder' :
            year    >= 0 ? 'year'    : 'none';


    if ( isNaN(year) ) {
        return {
            currentPage: page,
            totalPages: 1,
            folders: [],
            isLoading: true
        };
    }

    // Obtener los fierros
    try {

        let isLoading = true;

        const buildQuery = (field: itemsSearch, value: any, condition: any = { [field]: value } ) => {

            const where = condition ?? { [field]: value }
            const order = field === 'folder'
                ? { }//[field]: { firstNames: 'asc' }}
                : { [field]: 'asc' };

            return {
                where,
                take,
                skip: (page - 1) * take,
                include: {
                    folder: {
                        include: {
                            scanDetails: true
                        }
                    }
                },
                orderBy: order
            };

            isLoading = true;
        };

        let folders:any = [];
        let listFoldersWithSearchTerm: [{registre: number}];

        folders = await prisma.voucherFolders.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                folder: {
                    include: {
                        scanDetails: true
                    }
                }
            }
        })

        const foldersData: VoucherFolder[] = folders.map(ProcessVoucherFolder);
        if(foldersData)  isLoading = false;

        // Obtener el total de paginas
        const totalCount = foldersData.length + 1;
        const totalPages = Math.ceil(totalCount / take);
        
        return {
            currentPage: page,
            totalPages: totalPages,
            folders: foldersData,
            isLoading
        };
     
        
    } catch (error) {
        throw new Error('No se pudo cargar los fierros: ' + error)
    }
}

