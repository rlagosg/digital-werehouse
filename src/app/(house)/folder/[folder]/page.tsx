import { getPaginatedVouchers } from "@/actions/vouchers/get-vouchers";
import { Breadcrumb } from "@/components";
import { VoucherGrid } from "@/components/vouchers/vouchers-card/VocherGrid";
import { convertNumber } from "@/utils/convertNumber";
import { Metadata } from "next";
import { VouchersSearchInpus } from "./ui/SearchInputs";

interface Props {
  params: {
    folder      : string;
    page?       : string;
    take?       : string;
    search?     : string;
    startDate?  : string;
    endDate?    : string;
    startValue? : string;
    endValue?   : string;
  }
}

export const metadata: Metadata = {
    title: "Digital Werehouse | AMC",
    description: "Almacen digital Alcadia Municipal de Comayagua",
  };

export default async function FolderPage({ params } : Props) {
    
    const { search = '', startDate, endDate, endValue, startValue, page, folder } = params;

    const convertedParams = {
      folder, search, startDate, endDate,
      startValue : convertNumber(startValue),
      endValue   : convertNumber(endValue),
      page       : convertNumber(page)
    };

    //const vouchers = initialData.vouchers.filter(voucher => voucher.folder.name === folder);
    const { vouchers } = await getPaginatedVouchers(convertedParams);

    const onClick  = (value: string) => {
      console.log(value);
      return ''
    }
    
    return (
      <> 
      <div className="flex flex-col min-h-[256px] fadeIn ">
        <div className="flex-grow overflow-y-auto min-h-[765px]">
          <Breadcrumb pageName={`Archivadores \\ ${folder}`}/>
          <VouchersSearchInpus />
          <VoucherGrid items={vouchers} />
        </div>
      <div className="mt-4"> {/* Paginación con margen superior ajustado */}
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div> 
      </>
    );
  }
  