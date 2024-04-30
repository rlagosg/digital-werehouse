export interface Folder {
    scanEntryDate : Date;
    number        : string;
    year          : number;
    month         : number;
    firstVoucher  : number;
    lastVoucher   : number;
    observations  : string;
    scanExitDate  : Date;
}

export interface Document{
    scanEntryDate : Date;
    pages         : number;
    observations  : string;
    scanExitDate  : Date;
}

export interface Bank{
    name            : string;
    account         : string;
    internalAccount : string;
}

export interface Voucher {
    //id : number;
    document      : Document;
    folder        : number;
    bank          : Bank;
    check         : number;
    checkDate     : Date;
    checkValue    : number;
    isNull        : boolean;
    nullDate?     : Date;
}