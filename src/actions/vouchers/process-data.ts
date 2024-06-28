import { Bank, Document, Voucher } from "@/interfaces";

interface VoucherData {
    VoucherFolder: VoucherFolder[];
}

interface VoucherFolder {
    Voucher: VoucherData[];
}

interface VoucherData {
    id:          string;
    check:       number;
    folderId:    string;
    documentId:  string;
    bankId:      string;
    checkDate:   Date;
    checkValue:  number;
    beneficiary: string;
    description: string;
    proyects:    string;
    isNull:      boolean;
    nullDate:    Date | null;
    bank:        Bank;
    document:    Document;
}


export const ProcessVoucher = (vouchers: VoucherData[]): Voucher[] => {

    return vouchers
        .map(ProcessData) // Procesa cada carpeta
        .filter((voucher): voucher is Voucher => voucher !== null); // Filtra las que son nulas
}

const ProcessData = ( voucher : VoucherData ) : Voucher | null => {

    try {
        
        /* const { 
            id,
            folder,
            document,
            bank,
            check,
            checkDate,
            checkValue,
            beneficiary,
            description,
            proyects,
            isNull,
            nullDate,
        } = voucher;

        if (!folder || folder.length === 0) return null;
    

        return {
            id
            folder,
            document,
            bank,
            check,
            checkDate,
            checkValue,
            beneficiary,
            description,
            proyects,
            isNull,
            nullDate
        } */

        return null;

    } catch (error) {
        throw new Error('Error en la conversion de los documentos: ' + error)
    }
    
    
}