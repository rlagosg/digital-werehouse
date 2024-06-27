import { Breadcrumb } from "@/components";
import { VoucherGrid } from "@/components/vouchers/vouchers-card/VocherGrid";
import { initialData } from '@/seed/seed';
import { Metadata } from "next";
import { VouchersSearchInpus } from "./ui/SearchInputs";

interface Props{
    params: {
        name: string
    }
}

export const metadata: Metadata = {
    title: "Digital Werehouse | AMC",
    description: "Almacen digital Alcadia Municipal de Comayagua",
  };

export default async function FolderPage({ params } : Props) {
    
    const { name } = params;

    const vouchers = initialData.vouchers.filter(voucher => voucher.folder.name === name);

    const onClick  = (value: string) => {
      console.log(value);
      return ''
    }
    
    return (
      <> 
      <div className="flex flex-col min-h-[256px] fadeIn ">
        <div className="flex-grow overflow-y-auto min-h-[765px]">
          <Breadcrumb pageName={`Archivadores \\ ${name}`}/>
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
  