import { Bank, Document, ScanDetails } from "@/interfaces";

export interface FolderData {
    name:          string;
    scanDetails:   ScanDetails;
    description:   string;
    year:          number;
    VoucherFolder: VoucherFolderData[];
}

export interface VoucherFolderData {
    id:           string;
    month:        number;
    firstVoucher: number;
    lastVoucher:  number;
    Voucher: VoucherData[];
}

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
    nullDate:    Date | undefined;
    bank:        Bank;
    document:    Document;
}