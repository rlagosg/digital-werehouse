export type FoldersTypes = 'voucher'

export interface Folder_insert{
    scanDetails  : ScanDetails;
    name         : string;
    description  : string;
    year         : number;
    folderType   : FoldersTypes;
}

export interface VoucherFolder_insert {
    folder       : Folder_insert;
    month        : number;
    firstVoucher : number;
    lastVoucher  : number;
}

export interface VoucherFolder {
    scanDetails  : ScanDetails;
    name         : string;
    description  : string;
    year         : number;
    month        : number;
    firstVoucher : number;
    lastVoucher  : number;
}

export interface Document{
    scanDetails   : ScanDetails;
    description   : string;
    pages         : number;
    pdfPath       : string;
    documentType  : FoldersTypes;
}

export interface Bank{
    name            : string;
    account         : string;
    internalAccount : string;
}

export interface Voucher {
    folder        : VoucherFolder;
    document      : Document;
    bank          : Bank;
    check         : number;
    checkDate     : Date;
    checkValue    : number;
    beneficiary   : string;
    proyects      : string;
    isNull        : boolean;
    nullDate?     : Date;
}

export interface ScanDetails {
    scanEntryDate : Date;
    scanExitDate  : Date;
    observations  : string;
}