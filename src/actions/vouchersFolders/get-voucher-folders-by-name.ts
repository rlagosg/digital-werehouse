'use server'

import { VoucherFolder } from "@/interfaces";
import prisma from "@/lib/prisma";
import { ProcessVoucherFolder } from "./processData";

interface Resp {
    folder: VoucherFolder | null
    isLoading: boolean
}

/**
 * Obtiene un arhivador de vouchers, por su nombre de archivador
*/
export const getVoucherFolderByName = async (name: string) : Promise<Resp> => {

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

        console.log('No se pudo encontrar el archivador:');
                
        return {
            folder: null,
            isLoading: false
        };
    }
}

