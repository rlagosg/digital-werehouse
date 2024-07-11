import { VoucherFolder } from "@/interfaces";
import { FolderData } from "./vouchersFolders.data.interface";


// Filtra y procesa la lista de carpetas, excluyendo las que son nulas
export const ProcessVoucherFolder = (folder: FolderData): VoucherFolder => {

    try {
        
        const { name, description, year, scanDetails, VoucherFolder } = folder;        
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