import { getBanks } from "@/actions/banks/get-list-banks";
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
    //const { isLoading, folder} = await getVoucherFolderByName(name);

    let isLoading = false

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
                        <VoucherForm folder={{}} isNew={false} banks={banks}/>
                    </>
                )
            }
            
        </div>
        </>
    )

}