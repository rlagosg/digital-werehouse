'use server'

import { VoucherFolder } from "@/interfaces";
import prisma from "@/lib/prisma";
import { processFilters } from "./process-filters";
import { ProcessVoucherFolder } from "./process-folder-voucher";


export interface FolderPaginationOptions {
    page?       : number;
    take?       : number;
    folder?     : string;
    startYear?  : number;
    endYear?    : number;
    startMonth? : number;
    endMonth?   : number;
    startRange? : number;
    endRange?   : number;
}


export const getPaginatedVoucherFolders = async ({
    page         = 1,
    take         = 16,
    folder       = "",
    startYear    = -1,
    endYear      = -1,
    startMonth   = -1,
    endMonth     = -1,
    startRange   = -1,
    endRange     = -1,
  }: FolderPaginationOptions) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    // Obtener los folders
    try {

        let isLoading = true;

        const {whereFolders, whereVoucherFolders} = processFilters({folder, endMonth, endRange, endYear, startMonth, startRange, startYear})
        let folders:any = [];       
        folders = await prisma.folders.findMany({  
            where: whereFolders,
            take: take,
            skip: (page - 1) * take,
            include: { 
                      scanDetails: true,
                      VoucherFolder: {
                        where: whereVoucherFolders,
                        include: {

                        }
                      } 
                },
            });

        //console.log(JSON.stringify(folders, null, 2));
            
        const foldersData: VoucherFolder[] = folders
            .map(ProcessVoucherFolder)
            .filter((folder:any): folder is VoucherFolder => folder !== null);

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
        throw new Error('No se pudo cargar los ficheros: ' + error)
    }
}

