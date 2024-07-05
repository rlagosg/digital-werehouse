import { convertStringCalendarToDate } from "@/utils";
import { VouchersPaginationOptions } from "./get-vouchers";


export const processFilters = ({
    search,
    startDate,
    endDate,
    startValue,
    endValue,
    bank
}:VouchersPaginationOptions) => {

    // Convert search string to a number if possible
    const searchNumber = Number(search);

    // Determine if the search is a valid number
    const isSearchNumber = !isNaN(searchNumber);

    // Construir el objeto where dinámicamente para VoucherFolders
    const whereVouchers: any = {};
    const dateStartDate = startDate ? convertStringCalendarToDate(startDate) : null;
    const dateEndDate = endDate ? convertStringCalendarToDate(endDate) : null;
    
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
            gte: dateStartDate,
            lte: dateEndDate
        };
    } else if (startDate) {
        whereVouchers.checkDate = {
            gte: dateStartDate
        };
    } else if (endDate) {
        whereVouchers.checkDate = {
            lte: dateEndDate
        };
    }

    if(bank !== ''){
        whereVouchers.bank = {
            id: bank
        };
    }

    // Filtro por búsqueda en múltiples campos
    if (search != '') {
        whereVouchers.OR = [           
            { beneficiary: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { proyects: { contains: search, mode: 'insensitive' } },
        ];

        if (isSearchNumber) {
            whereVouchers.OR.push({ check: searchNumber });
        }
    }

    return {
        whereVouchers
    } 
}