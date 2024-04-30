import { VoucherGrid } from "@/components/vouchers/vouchers-card/VocherGrid";
import { initialData } from '@/seed/seed';
import { convertNumber } from "@/utils/convertNumber";
import { Metadata } from "next";

interface Props{
    params: {
        number: string
    }
}

export const metadata: Metadata = {
    title: "Digital Werehouse | AMC",
    description: "Almacen digital Alcadia Municipal de Comayagua",
  };

export default async function FolderPage({ params } : Props) {
    
    const { number } = params;
    const folder = convertNumber(number);

    const vouchers = initialData.vouchers.filter(voucher => voucher.folder === folder);
    
    return (
      <>      
          <VoucherGrid items={vouchers} />
      </>
    );
  }
  