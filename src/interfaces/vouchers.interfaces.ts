export interface Folder {
    scanDetails   : ScanDetails;
    number        : string;
    year          : number;
    month         : number;
    firstVoucher  : number;
    lastVoucher   : number;
}

export interface Document{
    description   : string;
    pages         : number;
    pdfPath       : string;
    documentType  : 'voucher';
    scanDetails   : ScanDetails;
}

export interface Bank{
    name            : string;
    account         : string;
    internalAccount : string;
}

export interface Voucher {
    //id : number;
    document      : Document;
    checkDate     : Date;
    check         : number;
    bank          : Bank;
    checkValue    : number;
    beneficiary   : string;
    folder        : number;
    isNull        : boolean;
    nullDate?     : Date;
}

export interface ScanDetails {
    scanEntryDate : Date;
    scanExitDate  : Date;
    observations  : string;
}