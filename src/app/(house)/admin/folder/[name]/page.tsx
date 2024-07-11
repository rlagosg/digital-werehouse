import { getVoucherFolderByName } from "@/actions/vouchersFolders/get-voucher-folders-by-name";
import { Breadcrumb, FullScreenLoading } from "@/components";
import { Metadata } from "next";
import { FolderForm } from "./ui/FolderForm";


interface Props{
    params: {
      name: string,
    }
}

export const metadata: Metadata = {
    title: "Digital Werehouse | AMC",
    description: "Almacen digital Alcadia Municipal de Comayagua",
  };

export default async function FolderPage({ params }:Props) {

    const { name } = params;

    const title = ( name === 'new') ? 'Nuevo Archivador' : `Editar Archivador ${ name }`;

    const { isLoading, folder} = await getVoucherFolderByName(name);

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
                    <FolderForm folder={folder ?? {}} isNew={false} />
                    </>
                )
            }
            
        </div>
        </>
    )

}