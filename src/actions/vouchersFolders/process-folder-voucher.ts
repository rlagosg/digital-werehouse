import { VoucherFolder } from "@/interfaces";


export interface FolderData {
    id:            string;
    name:          string;
    description:   string;
    year:          number;
    folderType:    string;
    scanDetailsId: string;
    scanDetails:   ScanDetailsData;
    VoucherFolder: VoucherFolderData[];
}

export interface VoucherFolderData {
    id:           string;
    folderId:     string;
    month:        number;
    firstVoucher: number;
    lastVoucher:  number;
}

export interface ScanDetailsData {
    id:            string;
    scanEntryDate: Date;
    scanExitDate:  Date;
    observations:  string;
}

export const ProcessVoucherFolder = ( folderVoucher : FolderData ) : VoucherFolder => {
    
    const { name, description, year, scanDetails, VoucherFolder } = folderVoucher;
    const { id, month, firstVoucher, lastVoucher } = VoucherFolder[0];

    return{
        id,
        name,
        description,
        year,
        month,
        firstVoucher,
        lastVoucher,
        scanDetails
    }
}