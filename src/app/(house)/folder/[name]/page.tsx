
import { getBanks } from "@/actions/banks/get-list-banks";
import { getPaginatedVouchers } from "@/actions/vouchers/get-vouchers";
import { Breadcrumb } from "@/components";
import { VoucherGrid } from "@/components/vouchers/vouchers-card/VocherGrid";
import { convertNumber } from "@/utils/convertNumber";
import { Metadata } from "next";
import { VouchersSearchInpus } from "./ui/SearchInputs";

interface Props {
  params: {
    name      : string;
    
  },
  searchParams: {
    page?       : string;
    take?       : string;
    search?     : string;
    startDate?  : string;
    endDate?    : string;
    startValue? : string;
    endValue?   : string;
    bank?       : string;
  }
}

export const metadata: Metadata = {
    title: "Digital Werehouse | AMC",
    description: "Almacen digital Alcadia Municipal de Comayagua",
  };

export default async function FolderPage({ params, searchParams } : Props) {
    
    const { name } = params;
    const { search = '', startDate, endDate, endValue, startValue, page, bank } = searchParams;

    
    const convertedParams = {
      name, search, 
      startDate: startDate ? startDate : '', 
      endDate: endDate ? endDate : '', 
      bank: bank ? bank : '',
      startValue : convertNumber(startValue),
      endValue   : convertNumber(endValue),
      page       : convertNumber(page)
    };
      

    //const vouchers = initialData.vouchers.filter(voucher => voucher.folder.name === folder);
    const { vouchers } = await getPaginatedVouchers(convertedParams);
    const { banks } =  await getBanks();
    
    return (
      <> 
      <div className="flex flex-col min-h-[256px] fadeIn ">
        <div className="flex-grow overflow-y-auto min-h-[765px]">
          <Breadcrumb pageName={`Archivadores \\ ${name}`}/>
          <VouchersSearchInpus banks={banks}/>
          <VoucherGrid items={vouchers} />
        </div>
      <div className="mt-4"> {/* Paginación con margen superior ajustado */}
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div> 
      </>
    );
  }
  