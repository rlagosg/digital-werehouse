import { Voucher, VoucherFolder } from "@/interfaces";
import { FolderData } from "../vouchers.data.interface";


export const ProcessVoucher = ( folderData : FolderData ) : Voucher => {

    try {
 
        const { name, scanDetails, description, year, VoucherFolder } = folderData;
        const { id, month, firstVoucher, lastVoucher, Voucher } = VoucherFolder[0];

        const folder:VoucherFolder = {
            id,
            scanDetails,
            name,
            description,
            year,
            month,
            firstVoucher,
            lastVoucher,
        }

        const voucher = Voucher[0];

        return {
            ...voucher,
            folder
        };

    } catch (error) {
        throw new Error('Error en la conversion de los documentos: ' + error)
    }
}