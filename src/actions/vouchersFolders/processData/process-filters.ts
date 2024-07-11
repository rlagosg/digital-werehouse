import { FolderPaginationOptions } from "../get-voucher-folders";


export const processFilters = ({
    name: folder,
    startYear,
    endYear,
    startMonth,
    endMonth,
    startRange,
    endRange
}:FolderPaginationOptions) => {

     // Construir el objeto where dinámicamente para Folders
    const whereFolders: any = {
        name: {
            contains: folder,
            mode: 'insensitive'
        }
    };

    if (startYear !== -1 && endYear !== -1) {
        whereFolders.year = {
            gte: startYear,
            lte: endYear
        };
    } else if (startYear !== -1) {
        whereFolders.year = {
            gte: startYear
        };
    } else if (endYear !== -1) {
        whereFolders.year = {
            lte: endYear
        };
    }

    // Construir el objeto where dinámicamente para VoucherFolders
    const whereVoucherFolders: any = {};

    if (startMonth !== -1 && endMonth !== -1) {
        whereVoucherFolders.month = {
            gte: startMonth,
            lte: endMonth
        };
    } else if (startMonth !== -1) {
        whereVoucherFolders.month = {
            gte: startMonth
        };
    } else if (endMonth !== -1) {
        whereVoucherFolders.month = {
            lte: endMonth
        };
    }

    if (startRange !== -1 && endRange !== -1) {
        whereVoucherFolders.firstVoucher = {
            gte: startRange,
            lte: endRange
        };
    } else if (startRange !== -1) {
        whereVoucherFolders.firstVoucher = {
            gte: startRange
        };
    } else if (endRange !== -1) {
        whereVoucherFolders.firstVoucher = {
            lte: endRange
        };
    }

    return {
        whereFolders,
        whereVoucherFolders
    }
}