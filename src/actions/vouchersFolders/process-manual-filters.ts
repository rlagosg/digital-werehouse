import { Prisma } from "@prisma/client";
import { FolderPaginationOptions } from "./get-voucher-folders";

export const prorcessManualFilters = ({
    folder,
    startYear,
    endYear,
    startMonth,
    endMonth,
    startRange,
    endRange
}:FolderPaginationOptions )=>{

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

    baseQuery = startMonth != -1 && endMonth != -1
        ? Prisma.sql`${baseQuery} AND VF."month" BETWEEN ${startMonth} AND ${endMonth}`
        : startMonth != -1
        ? Prisma.sql`${baseQuery} AND VF."month" >= ${startMonth}`
        : endMonth != -1
        ? Prisma.sql`${baseQuery} AND VF."month" <= ${endMonth}`
        : baseQuery;

    baseQuery = startRange != -1 && endRange != -1
        ? Prisma.sql`${baseQuery} AND VF."firstVoucher" BETWEEN ${startRange} AND ${endRange}`
        : startRange != -1
        ? Prisma.sql`${baseQuery} AND VF."firstVoucher" >= ${startRange}`
        : endRange != -1
        ? Prisma.sql`${baseQuery} AND VF."firstVoucher" <= ${endRange}`
        : baseQuery;

    

    return baseQuery;

    //colocamos estas 2 instruccion para recibir las carpetas
    //let foldersQuery: any = await prisma.$queryRaw(baseQuery); 
    //const foldersData: VoucherFolder[] = foldersQuery.map(ProcessQueryVoucherFolder);
}