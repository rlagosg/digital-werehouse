import { v4 as uuidv4 } from 'uuid';
import { Bank, Document, Voucher, VoucherFolder } from "../interfaces/vouchers.interfaces";

interface SeedData {
    voucherFolders: VoucherFolder[],
    banks: Bank[],
    vouchers: Voucher[]
}

const seedScanDetails = [
    {
        id            : uuidv4(),
        scanEntryDate : new Date(),
        observations  : 'Ninguna',
        scanExitDate  : new Date(), 
    },
]

const desc = 'Quis proident nulla magna et minim excepteur aliqua voluptate officia laboris. Veniam nisi laboris amet velit duis cupidatat labore excepteur sit consequat. Sint velit nisi laborum tempor velit consequat voluptate qui laborum esse irure anim fugiat.'

const seedDocuments: Document[] = [
    {
        id: uuidv4(),
        description: desc,
        pages: 2,
        pdfPath: 'CK66407.pdf',
        documentType: 'voucher',
        scanDetails: seedScanDetails[0],
    },
    {
        id: uuidv4(),
        description: desc,
        pages: 27,
        pdfPath: 'CK66423.pdf',
        documentType: 'voucher',
        scanDetails: seedScanDetails[0],
    },
    {
        id: uuidv4(),
        description: desc,
        pages: 157,
        pdfPath: 'CK66432.pdf',
        documentType: 'voucher',
        scanDetails: seedScanDetails[0],
    },
    {
        id: uuidv4(),
        description: desc,
        pages: 383,
        pdfPath: 'CK66433.pdf',
        documentType: 'voucher',
        scanDetails: seedScanDetails[0],
    },
]


const seedBanks : Bank[] =  [
    {
        id: uuidv4(),
        name:"BAC CREDOMATIC",
        account:'0005611510065',
        internalAccount:'7'
    },
    {
        id: uuidv4(),
        name:"OCCIDENTE velit",
        account:'0005611510063',
        internalAccount:'8'
    },
        
    {
        id: uuidv4(),
        name:"ATLANTIDA morbi sem",
        account:'00056115100612',
        internalAccount:'9'
    },
    {
        id: uuidv4(),
        name:"LAFISE",
        account:'0005611510061',
        internalAccount:'10'
    }
]

const voucherFolders : VoucherFolder[] = [
    {
        id           : uuidv4(),
        scanDetails  : seedScanDetails[0],
        name         : '139',
        description  : desc,
        year         : 2022,
        month        : 11,
        firstVoucher : 66423,
        lastVoucher  : 66431,
    },
    {
        id           : uuidv4(),
        scanDetails  : seedScanDetails[0],
        name         : '140',
        description  : desc,
        year         : 2022,
        month        : 11,
        firstVoucher : 66432,
        lastVoucher  : 66433,
    }
]


export const initialData: SeedData = {
    voucherFolders: voucherFolders,
    banks: seedBanks,
    vouchers: [
        {
            id: uuidv4(),
            document: seedDocuments[0],
            folder: voucherFolders[0],
            bank: seedBanks[0],
            check : 66407,
            checkDate : new Date(),
            checkValue  : 41210.25,
            beneficiary: 'CAFETERIA EL FOGON DE LA ABUELA',
            proyects    : '110',
            isNull : false,
        },
        {
            id: uuidv4(),
            document: seedDocuments[1],
            folder: voucherFolders[0],
            bank: seedBanks[1],
            check : 66423,
            checkDate : new Date(),
            checkValue  : 28520,
            beneficiary: 'COPIALA',
            proyects    : '23',
            isNull : false,
            nullDate : new Date(),
        },
        {
            id: uuidv4(),
            document: seedDocuments[2],
            folder: voucherFolders[1],
            bank: seedBanks[2],
            check : 66432,
            checkDate : new Date(),
            checkValue  : 28370,
            beneficiary: 'SUN CERAMICAS, S.A.',
            proyects    : '69',
            isNull : false,
            nullDate : new Date(),
        },
        {
            id: uuidv4(),
            document: seedDocuments[3],
            folder: voucherFolders[1],
            bank: seedBanks[3],
            check : 66433,
            checkDate : new Date(),
            checkValue  : 72260,
            beneficiary: 'SUN CERAMICAS, S.A.',
            proyects    : '110',
            isNull : false,
            nullDate : new Date(),
        },
    ]
}

