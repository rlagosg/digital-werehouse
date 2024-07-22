import { getBanks } from "@/actions/banks/get-list-banks";
import { getVoucherByCk } from "@/actions/vouchers/get-voucher-by-ck";
import { getVoucherFolderByName } from "@/actions/vouchersFolders/get-voucher-folders-by-name";
import { Breadcrumb, FullScreenLoading } from "@/components";
import { Metadata } from "next";
import { VoucherForm } from "./ui/VoucherForm";

interface Props{
    params: {
      check: string,
    },
    searchParams: {
        folder? : string;
    }
}

export const metadata: Metadata = {
    title: "Digital Werehouse | AMC",
    description: "Almacen digital Alcadia Municipal de Comayagua",
};

export default async function FolderPage({ params, searchParams }:Props) {

    const { check } = params;
    const { folder } = searchParams;

    const title = ( check === 'new') ? `Nuevo Voucher / Archivador ${folder}` : `Editar Voucher ${ check }`;

    const { banks } =  await getBanks();
    const { isLoading, voucher} = await getVoucherByCk(Number(check));
    let folderSearch; 
    
    let returnBack;

    if (check === 'new') {
    if (!folder) {
        returnBack = true;
        } else if( folder ){
            const { folder: findFolder } = await getVoucherFolderByName(folder);
            folderSearch = findFolder;
            if (!findFolder) {
                returnBack = true;
            }
        }
    }

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
                        <VoucherForm 
                            voucher={voucher ?? {}} 
                            isNew={false} 
                            banks={banks} 
                            returnBack= { returnBack } 
                            folderSearch={folderSearch}
                        />
                    </>
                )
            }
            
        </div>
        </>
    )

}