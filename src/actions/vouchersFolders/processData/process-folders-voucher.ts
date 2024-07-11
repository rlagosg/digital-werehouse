import { VoucherFolder } from "@/interfaces";
import { FolderData } from "./vouchersFolders.data.interface";



// Filtra y procesa la lista de carpetas, excluyendo las que son nulas
export const ProcessVoucherFolders = (folders: FolderData[]): VoucherFolder[] => {
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