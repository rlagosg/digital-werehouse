import prisma from "@/lib/prisma";

export const getVoucher = async () => {

    // Obtener los folders
    try {

        let isLoading = true;

        let voucherData:any = [];

        voucherData = await prisma.vouchers.findFirst({
            include: {
                bank: true,
                document: {
                    include: {
                        scanDetails: true
                    }
                }
            },
         })

            
        

        //console.log(JSON.stringify(vouchers, null, 2));            
        const voucher: any = [] // ProcessVoucher(voucherData);

        if(voucherData)  isLoading = false;

        
        return {
            voucher,
            isLoading
        };
     
        
    } catch (error) {
        throw new Error('No se pudo cargar los ficheros: ' + error)
    }
}

