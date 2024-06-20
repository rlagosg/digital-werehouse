'use server'

import { VoucherFolder } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ProcessQueryVoucherFolder } from "./process-query-folders";


interface PaginationOptions {
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
  }: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    
   
    console.log("startYear: " + startYear);
    console.log("endYear: " + endYear);
    

    // Obtener los folders
    try {

        let isLoading = true;

        let baseQuery = Prisma.sql`
            SELECT 
            VF.id, "Folders"."name", "Folders".description, "Folders"."year", VF."month", VF."firstVoucher", 
            VF."lastVoucher", SD.id as "idScanDetails", SD."scanEntryDate", SD."scanExitDate", SD.observations
            FROM "Folders"
            LEFT JOIN "VoucherFolders" VF ON "Folders".id = VF."folderId"
            LEFT JOIN "ScanDetails" SD ON "Folders"."scanDetailsId" = SD.id
            WHERE "Folders"."name" ILIKE '%' || ${folder} || '%'
        `;

        baseQuery = startYear != -1 && endYear != -1
            ? Prisma.sql`${baseQuery} AND "Folders"."year" BETWEEN ${startYear} AND ${endYear}`
            : startYear != -1
            ? Prisma.sql`${baseQuery} AND "Folders"."year" >= ${startYear}`
            : endYear != -1
            ? Prisma.sql`${baseQuery} AND "Folders"."year" <= ${endYear}`
            : baseQuery;

        let foldersQuery: any = await prisma.$queryRaw(baseQuery);

        //console.log(foldersQuery);
               
        /* folders = await prisma.voucherFolders.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                folder: {
                    include: {
                        scanDetails: true
                    },                    
                }
            },
        }) */


        const foldersData: VoucherFolder[] = foldersQuery.map(ProcessQueryVoucherFolder);
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

