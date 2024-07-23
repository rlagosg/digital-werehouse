import { Document, ScanDetails, Voucher, VoucherFolder } from "@/interfaces";

export interface VoucherData {
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
    nullDate:    Date | null | undefined;
    bank:        Bank;
    document:    Document;
    folder:      VoucherDataFolder;
}

export interface Bank {
    id:              string;
    name:            string;
    account:         string;
    internalAccount : string | null;
}

export interface MyDocument extends Document{
    scanDetailsId: string;
}

export interface VoucherDataFolder {
    id:           string;
    month:        number;
    firstVoucher: number;
    lastVoucher:  number;
    folder:       Folder;
}

export interface Folder {
    name:        string;
    scanDetails: ScanDetails;
    description: string;
    year:        number;
}


export const ProcessVoucher = ( voucherData : VoucherData ) : Voucher => {

    try {
 
        const { folder:voucherFolder, bankId, documentId, folderId, ...rest } = voucherData;
               
        const { id, firstVoucher, lastVoucher, month, folder } = voucherFolder;
        const { name, scanDetails, description, year } = folder;
        
        const tempFolder:VoucherFolder = {
            id,
            scanDetails,
            name,
            description,
            year,
            month,
            firstVoucher,
            lastVoucher,
        }


        return {
            ...rest,
            folder: tempFolder

        };

    } catch (error) {
        console.log('Error en la conversion de los documentos: ' + error);        
        throw new Error('Error en la conversion de los documentos: ' + error)
    }
}