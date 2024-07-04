import { SimpleItem } from "@/interfaces";
import prisma from "@/lib/prisma";


export const getBanks = async () => {
    try {

        let banksData = [];       
        banksData = await prisma.banks.findMany({
            orderBy: {
                name: "asc"
            }
        });
        
        const banks:SimpleItem[] = banksData.map( (bank) => ({
            value: bank.id,
            label: bank.name + ' / ' + bank.account + ' - ' + bank.internalAccount
        }))
        
        //console.log(JSON.stringify(banks, null, 2));

        return {
            banks
        };
     
        
    } catch (error) {
        throw new Error('No se pudo cargar los ficheros: ' + error)
    }
}