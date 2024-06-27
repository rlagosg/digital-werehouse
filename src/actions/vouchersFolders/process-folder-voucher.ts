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


// Filtra y procesa la lista de carpetas, excluyendo las que son nulas
export const ProcessVoucherFolder = (folders: FolderData[]): VoucherFolder[] => {
    return folders
        .map(ProcessData) // Procesa cada carpeta
        .filter((folder): folder is VoucherFolder => folder !== null); // Filtra las que son nulas
}

const ProcessData = ( folderVoucher : FolderData ) : VoucherFolder | null => {

    try {
        
        const { name, description, year, scanDetails, VoucherFolder } = folderVoucher;
        if (!VoucherFolder || VoucherFolder.length === 0) return null;
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

    } catch (error) {
        throw new Error('Error en la conversion de los documentos: ' + error)
    }
    
    
}