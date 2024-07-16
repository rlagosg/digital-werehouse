import { getBanks } from "@/actions/banks/get-list-banks";
import { getVoucherByCk } from "@/actions/vouchers/get-voucher-by-ck";
import { Breadcrumb, FullScreenLoading } from "@/components";
import { Metadata } from "next";
import { VoucherForm } from "./ui/VoucherForm";

interface Props{
    params: {
      check: string,
    }
}

export const metadata: Metadata = {
    title: "Digital Werehouse | AMC",
    description: "Almacen digital Alcadia Municipal de Comayagua",
};

export default async function FolderPage({ params }:Props) {

    const { check } = params;

    const title = ( check === 'new') ? 'Nuevo Voucher' : `Editar Voucher ${ check }`;
    const { banks } =  await getBanks();
    const { isLoading, voucher} = await getVoucherByCk(Number(check));

    console.log(voucher);
    

    return(
        <>
        <div className="fadeIn">
            {
                isLoading ? (
                    <FullScreenLoading/>
                ) :
                (
                    <>
                        <Breadcrumb pageName={title} />
                        <VoucherForm voucher={voucher ?? {}} isNew={false} banks={banks}/>
                    </>
                )
            }
            
        </div>
        </>
    )

}