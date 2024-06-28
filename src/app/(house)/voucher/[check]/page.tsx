import { PDFViewer, VoucherDetails } from "@/components";
import { initialData } from "@/seed/seed";
import { convertNumber } from "@/utils/convertNumber";
import { Metadata } from "next";

interface Props{
    params: {
        check: string
    }
}

export const metadata: Metadata = {
    title: "Digital Werehouse | AMC",
    description: "Almacen digital Alcadia Municipal de Comayagua",
  };

export default async function VoucherPage({ params } : Props) {
    
    const { check } = params;
    const voucher = initialData.vouchers.find(voucher => voucher.check === convertNumber(check));

    const pathPDF = voucher?.document.pdfPath;
    const folder = voucher?.folder.name!;
    
    return (
      <div className="mb-20 grid grid-cols-1 md:grid-cols-6 2xl:grid-cols-5 gap-3">
        { voucher && (<VoucherDetails voucher={voucher}/>) }
        
        <div className="col-span-1 md:col-span-3 flex ml-3 items-start justify-center">
          <div
            className="bg-white  dark:bg-meta-4 shadow-md rounded-lg overflow-hidden"
            style={{ width: 'calc(100vw - 30px)' }}
          >
            {pathPDF && <PDFViewer folder={folder} pdfPath={pathPDF} />}
          </div>
        </div>
        
      </div>
    );
  }
  