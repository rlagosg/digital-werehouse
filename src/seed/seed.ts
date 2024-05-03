import { Bank, Document, Folder, Voucher } from "@/interfaces";

interface SeedData {
    folders: Folder[],
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
        pages: 141,
        pdfPath: 'CK66407',
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

export const initialData: SeedData = {
    folders: [
        {
            scanDetails: seedScanDetails[0],
            number : '134.1',
            month  : 11,
            year   : 2022,
            firstVoucher : 66318,
            lastVoucher  : 66333,
        },
        {
            scanDetails: seedScanDetails[0],
            number : '135',
            month  : 11,
            year   : 2022,
            firstVoucher : 66334,
            lastVoucher  : 66357,
        },
        {
            scanDetails: seedScanDetails[0],
            number : '136',
            month  : 11,
            year   : 2022,
            firstVoucher : 66358,
            lastVoucher  : 66366,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '137',
            month  : 11,
            year   : 2022,
            firstVoucher : 66367,
            lastVoucher  : 66399,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '138',
            month  : 11,
            year   : 2022,
            firstVoucher : 66400,
            lastVoucher  : 66422,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '139',
            month  : 11,
            year   : 2022,
            firstVoucher : 66358,
            lastVoucher  : 66366,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '140',
            month  : 11,
            year   : 2022,
            firstVoucher : 66367,
            lastVoucher  : 66399,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '141',
            month  : 11,
            year   : 2022,
            firstVoucher : 66400,
            lastVoucher  : 66422,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '142',
            month  : 11,
            year   : 2022,
            firstVoucher : 66358,
            lastVoucher  : 66366,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '143',
            month  : 11,
            year   : 2022,
            firstVoucher : 66367,
            lastVoucher  : 66399,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '144',
            month  : 11,
            year   : 2022,
            firstVoucher : 66400,
            lastVoucher  : 66422,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '145',
            month  : 11,
            year   : 2022,
            firstVoucher : 66358,
            lastVoucher  : 66366,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '146',
            month  : 11,
            year   : 2022,
            firstVoucher : 66367,
            lastVoucher  : 66399,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '147',
            month  : 11,
            year   : 2022,
            firstVoucher : 66400,
            lastVoucher  : 66422,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '148',
            month  : 11,
            year   : 2022,
            firstVoucher : 66358,
            lastVoucher  : 66366,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '149',
            month  : 11,
            year   : 2022,
            firstVoucher : 66367,
            lastVoucher  : 66399,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '150',
            month  : 11,
            year   : 2022,
            firstVoucher : 66400,
            lastVoucher  : 66422,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '151',
            month  : 11,
            year   : 2022,
            firstVoucher : 66358,
            lastVoucher  : 66366,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '152',
            month  : 11,
            year   : 2022,
            firstVoucher : 66367,
            lastVoucher  : 66399,
                                },
        {
            scanDetails: seedScanDetails[0],
            number : '153',
            month  : 11,
            year   : 2022,
            firstVoucher : 66400,
            lastVoucher  : 66422,
                                },
    ],
    banks: seedBanks,
    vouchers: [
        {
            document: seedDocuments[0],
            beneficiary: 'SEGURIDAD PRIVADA MEJIA TROCHEZ S. DE R.',
            folder: 135,
            bank: seedBanks[0],
            check : 66334,
            checkDate : new Date(),
            checkValue : 24431.72,
            isNull : false,
        },
        {
            document: seedDocuments[0],
            beneficiary: 'SEGURIDAD PRIVADA MEJIA TROCHEZ S. DE R.',
            folder: 135,
            bank: seedBanks[0],
            check : 66335,
            checkDate : new Date(),
            checkValue : 5682,
            isNull : false,
        },
        {
            document: seedDocuments[0],
            beneficiary: 'SEGURIDAD PRIVADA MEJIA TROCHEZ S. DE R.',
            folder: 135,
            bank: seedBanks[2],
            check : 66336,
            checkDate : new Date(),
            checkValue : 3172,
            isNull : false,
        },
        {
            document: seedDocuments[0],
            beneficiary: 'SEGURIDAD PRIVADA MEJIA TROCHEZ S. DE R.',
            folder: 135,
            bank: seedBanks[3],
            check : 66337,
            checkDate : new Date(),
            checkValue : 4317,
            isNull : false,
        },
        {
            document: seedDocuments[0],
            beneficiary: 'SEGURIDAD PRIVADA MEJIA TROCHEZ S. DE R.',
            folder: 136,
            bank: seedBanks[0],
            check : 66358,
            checkDate : new Date(),
            checkValue : 24431,
            isNull : false,
        },
        {
            document: seedDocuments[0],
            beneficiary: 'SEGURIDAD PRIVADA MEJIA TROCHEZ S. DE R.',
            folder: 136,
            bank: seedBanks[1],
            check : 66359,
            checkDate : new Date(),
            checkValue : 1002,
            isNull : false,
        },
        {
            document: seedDocuments[0],
            beneficiary: 'SEGURIDAD PRIVADA MEJIA TROCHEZ S. DE R.',
            folder: 136,
            bank: seedBanks[2],
            check : 66360,
            checkDate : new Date(),
            checkValue : 2431.72,
            isNull : false,
        },
    ]
}

