import { Breadcrumb, SearchInput } from "@/components";
import { VoucherGrid } from "@/components/vouchers/vouchers-card/VocherGrid";
import { initialData } from '@/seed/seed';
import { Metadata } from "next";

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
    
    return (
      <> 
      <div className="flex flex-col min-h-[256px] fadeIn ">
        <div className="flex-grow overflow-y-auto min-h-[765px]">
          <Breadcrumb pageName={`Archivadores \\ ${name}`}/>
          <SearchInput />
          <VoucherGrid items={vouchers} />
        </div>
      <div className="mt-4"> {/* Paginación con margen superior ajustado */}
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div> 
      </>
    );
  }
  