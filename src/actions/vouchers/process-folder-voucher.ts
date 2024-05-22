import { VoucherFolder } from "@/interfaces";

export interface VoucherFolderData {
    id:           string;
    folderId:     string;
    month:        number;
    firstVoucher: number;
    lastVoucher:  number;
    folder:       FolderData;
}

export interface FolderData {
    id:            string;
    name:          string;
    description:   string;
    year:          number;
    folderType:    string;
    scanDetailsId: string;
    scanDetails:   ScanDetailsData;
}

export interface ScanDetailsData {
    id:            string;
    scanEntryDate: Date;
    scanExitDate:  Date;
    observations:  string;
}

export const ProcessVoucherFolder = ( folderVoucher : VoucherFolderData ) : VoucherFolder => {
    
    const { id, folder, month, firstVoucher, lastVoucher } = folderVoucher;
    const { name, description, year, scanDetails } = folder;

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