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
          <VoucherGrid items={vouchers} />
      </>
    );
  }
  