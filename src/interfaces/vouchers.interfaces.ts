export type FoldersTypes = 'voucher'

export interface VoucherFolder {
    id           : string;
    scanDetails  : ScanDetails;
    name         : string;
    description  : string;
    year         : number;
    month        : number;
    firstVoucher : number;
    lastVoucher  : number;
}

export interface Document{
    id            : string;
    scanDetails   : ScanDetails;
    pages         : number;
    pdfPath       : string;
}

export interface Bank{
    id              : string;
    name            : string;
    account         : string;
    internalAccount : string | null;
}

export interface Voucher {
    id            : string;
    folder        : VoucherFolder;
    document      : Document;
    bank          : Bank;
    check         : number;
    checkDate     : Date;
    checkValue    : number;
    beneficiary   : string;
    description?  : string;
    proyects?     : string;
    isNull        : boolean;
    nullDate?     : Date | null;
}

export interface ScanDetails {
    id            : string;
    scanEntryDate : Date;
    scanExitDate? : Date | null;
    observations  : string;
}