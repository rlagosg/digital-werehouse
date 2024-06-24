import { VoucherFolder } from "@/interfaces";

interface DataFolder {
    id            : string;
    name          : string;
    description   : string;
    year          : number;
    month         : number;
    firstVoucher  : number;
    lastVoucher   : number;
    idScanDetails : string;
    scanEntryDate : Date;
    scanExitDate  : Date;
    observations  : string;
}

export const ProcessQueryVoucherFolder = ( folderVoucher: DataFolder ) : VoucherFolder => {
    
    const {idScanDetails, scanEntryDate, scanExitDate, observations, ...rest } = folderVoucher;

    return{
        ...rest,
        scanDetails:{
            id:idScanDetails,
            scanEntryDate,
            scanExitDate,
            observations
        }
    }
}