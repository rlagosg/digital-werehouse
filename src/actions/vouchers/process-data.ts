import { Voucher, VoucherFolder } from "@/interfaces";
import { FolderData, VoucherData } from "./vouchers.data.interface";



export const ProcessFolder = ( folder : FolderData ) : Voucher[] => {
    try {
        
        const { name, scanDetails, description, year, VoucherFolder } = folder;
        const { id, month, firstVoucher, lastVoucher, Voucher:Vouchers } = VoucherFolder[0];
    
        const voucherFolder:VoucherFolder = {
            id,
            scanDetails,
            name,
            description,
            year,
            month,
            firstVoucher,
            lastVoucher,
        }

        return ProcessVouchers( voucherFolder, Vouchers )

    } catch (error) {
        throw new Error('Error en la conversion de los documentos: ' + error)
    }
}

const ProcessVouchers = (folder: VoucherFolder , vouchers: VoucherData[]): Voucher[] => {

    return vouchers
        .map(voucher => filter( folder, voucher )) // Procesa cada voucher
        .filter((voucher): voucher is Voucher => voucher !== null); // Filtra las que son nulas
}

export const filter = (folder: VoucherFolder, voucher: VoucherData): Voucher | null => {

    if (!voucher || folder.name.length === 0) return null;

    return {
        ...voucher,
        folder: folder
    }

}