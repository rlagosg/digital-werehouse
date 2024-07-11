'use server'

import { VoucherFolder } from "@/interfaces";
import prisma from "@/lib/prisma";
import { ProcessVoucherFolder } from "./processData";



/**
 * Obtiene un arhivador de vouchers, por su nombre de archivador
*/
export const getVoucherFolder = async (name: string) => {

    try {

        let isLoading = true;

        
        let folderData:any = [];       
        folderData = await prisma.folders.findFirst({
            where:{
                name: name
            },
            include: { 
                      scanDetails: true,
                      VoucherFolder: true
                    },
            });

        //console.log(JSON.stringify(folder, null, 2));
            
        const folder: VoucherFolder = ProcessVoucherFolder(folderData);       
        if(folder)  isLoading = false;

        return {
            folder,
            isLoading
        };
     
        
    } catch (error) {
        throw new Error('No se pudo cargar el archivador: ' + error)
    }
}

