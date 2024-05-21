import prisma from '../lib/prisma';
import { initialData } from './seed';



async function main() {

  // 1. Borrar registros previos
   //await Promise.all( [
     await prisma.vouchers.deleteMany(); 
     await prisma.voucherFolders.deleteMany();
     await prisma.folders.deleteMany();
     await prisma.banks.deleteMany();
     await prisma.documents.deleteMany();
     await prisma.scanDetails.deleteMany(); 
   //]);

  const { vouchers, voucherFolders } = initialData;


  voucherFolders.forEach( async(folder) =>{

    //insercion de destalles de escaeno
    const dbScanDetail = await prisma.scanDetails.create({
      data: folder.scanDetails
    })

    //insercion de folder simple
    const dbFolder = await prisma.folders.create({
      data: {
        name: folder.name,
        year: folder.year,
        description: folder.description,
        scanDetailsId: dbScanDetail.id,
        folderType: 'voucher'
      },
    });

    //insercion de folder de voucher
    const dbVoucherFolder = await prisma.voucherFolders.create({
      data: {
        firstVoucher: folder.firstVoucher,
        lastVoucher: folder.lastVoucher,
        month: folder.month,
        folderId: dbFolder.id,
      },
    });

    
    vouchers.forEach( async (voucher) => {      

      if( voucher.folder.name === dbFolder.name){
        const { folder, document, bank, ...rest } = voucher

        //creamos el banco
        const dbBank = await prisma.banks.create({
          data: bank
        });

        //creamos el documento
        const dbDocument = await prisma.documents.create({
          data: {
            pages: document.pages,
            pdfPath: document.pdfPath,
            description: document.description,
            scanDetailsId: dbScanDetail.id,
            documentType: 'voucher',            
          }
        })

        //creamos los vouchers
        await prisma.vouchers.create({
          data: {
            ...rest,
            bankId: dbBank.id,
            folderId: dbVoucherFolder.id,
            documentId: dbDocument.id
          }
        })       
        
      }
    })

  });
  
  console.log( 'Seed ejecutado correctamente' );
}


( () => {

  if ( process.env.NODE_ENV === 'production' ) return;

  main();
} )();