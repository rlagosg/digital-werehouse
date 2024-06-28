import { VouchersPaginationOptions } from "./get-vouchers";


export const processFilters = ({
    search,
    startDate,
    endDate,
    startValue,
    endValue,
}:VouchersPaginationOptions) => {

    // Construir el objeto where dinámicamente para VoucherFolders
    const whereVouchers: any = {};
    
    // Filtro por valores de cheque
    if (startValue !== -1 && endValue !== -1) {
        whereVouchers.checkValue = {
            gte: startValue,
            lte: endValue
        };
    } else if (startValue !== -1) {
        whereVouchers.checkValue = {
            gte: startValue
        };
    } else if (endValue !== -1) {
        whereVouchers.checkValue = {
            lte: endValue
        };
    }

    // Filtro por fechas de cheque
    if (startDate && endDate) {
        whereVouchers.checkDate = {
            gte: startDate,
            lte: endDate
        };
    } else if (startDate) {
        whereVouchers.checkDate = {
            gte: startDate
        };
    } else if (endDate) {
        whereVouchers.checkDate = {
            lte: endDate
        };
    }

    // Filtro por búsqueda en múltiples campos
    if (search) {
        whereVouchers.OR = [
            { check: { contains: search, mode: 'insensitive' } },
            { beneficiary: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { proyects: { contains: search, mode: 'insensitive' } },
        ];
    }

    return {
        whereVouchers
    } 
}