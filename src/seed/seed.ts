import { Bank, Document, Folder_insert, Voucher, VoucherFolder, VoucherFolder_insert } from "@/interfaces";

interface SeedData {
    voucherFolders: VoucherFolder[],
    banks: Bank[],
    vouchers: Voucher[]
}

const seedScanDetails = [
    {
        scanEntryDate: new Date(),
        observations: 'Ninguna',
        scanExitDate: new Date(), 
    },
]

const desc = 'Quis proident nulla magna et minim excepteur aliqua voluptate officia laboris. Veniam nisi laboris amet velit duis cupidatat labore excepteur sit consequat. Sint velit nisi laborum tempor velit consequat voluptate qui laborum esse irure anim fugiat.'

const seedDocuments: Document[] = [
    {
        description: desc,
        pages: 2,
        pdfPath: 'CK66407.pdf',
        documentType: 'voucher',
        scanDetails: seedScanDetails[0],
    },
    {
        description: desc,
        pages: 27,
        pdfPath: 'CK66423.pdf',
        documentType: 'voucher',
        scanDetails: seedScanDetails[0],
    },
    {
        description: desc,
        pages: 157,
        pdfPath: 'CK66432.pdf',
        documentType: 'voucher',
        scanDetails: seedScanDetails[0],
    },
    {
        description: desc,
        pages: 383,
        pdfPath: 'CK66433.pdf',
        documentType: 'voucher',
        scanDetails: seedScanDetails[0],
    },
]


const seedBanks : Bank[] =  [
    {
        name:"BAC CREDOMATIC",
        account:'0005611510065',
        internalAccount:'00056115100611'
    },
    {
        name:"OCCIDENTE velit",
        account:'0005611510063',
        internalAccount:'0005611510062'
    },
        
    {
        name:"ATLANTIDA morbi sem",
        account:'00056115100612',
        internalAccount:'0005611510062'
    },
    {
        name:"DAVIVIENDA vestibulum aliquet",
        account:'0005611510063',
        internalAccount:'00056115100612'
    },
    {
        name:"LAFISE",
        account:'0005611510061',
        internalAccount:'00056115100610'
    }
]

const seedFolder_Insert : Folder_insert[] = [
    {
        scanDetails  : seedScanDetails[0],
        name         : '139',
        description  : desc,
        year         : 2022,
        folderType   : 'voucher'
    },
    {
        scanDetails  : seedScanDetails[0],
        name         : '140',
        description  : desc,
        year         : 2022,
        folderType   : 'voucher'
    }
]

const seedVoucherFolder_Insert: VoucherFolder_insert[] = [
    {
        folder: seedFolder_Insert[0],
        month  : 11,
        firstVoucher : 66423,
        lastVoucher  : 66431,
    },
    {
        folder: seedFolder_Insert[1],
        month  : 11,
        firstVoucher : 66432,
        lastVoucher  : 66433,
    },
]

const voucherFolders : VoucherFolder[] = [
    {
        scanDetails  : seedScanDetails[0],
        name         : '139',
        description  : desc,
        year         : 2022,
        month        : 11,
        firstVoucher : 66423,
        lastVoucher  : 66431,
    },
    {
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

