'use server'

import { VoucherFolder } from "@/interfaces";
import prisma from "@/lib/prisma";
import { processFilters, ProcessVoucherFolders } from "./processData";




export interface FolderPaginationOptions {
    page?       : number;
    take?       : number;
    name?     : string;
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
    name: folder       = "",
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

        const {whereFolders, whereVoucherFolders} = processFilters({name: folder, endMonth, endRange, endYear, startMonth, startRange, startYear})
        let folders:any = [];       
        folders = await prisma.folders.findMany({  
            where: whereFolders,
            take: take,
            skip: (page - 1) * take,
            include: { 
                      scanDetails: true,
                      VoucherFolder: {
                        where: whereVoucherFolders, 
                      } 
                    },
            });

        //console.log(JSON.stringify(folders, null, 2));
            
        const foldersData: VoucherFolder[] = ProcessVoucherFolders(folders);

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

