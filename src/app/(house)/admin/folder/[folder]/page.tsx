import { Breadcrumb } from "@/components";
import { Metadata } from "next";
import { FolderForm } from "./ui/FolderForm";


interface Props{
    params: {
      folder: string,
    }
}

export const metadata: Metadata = {
    title: "Digital Werehouse | AMC",
    description: "Almacen digital Alcadia Municipal de Comayagua",
  };

export default async function FolderPage({ params }:Props) {

    const { folder } = params;

    const title = 'Nuevo Archivador';//( folder === 'new') ? 'Nuevo Archivador' : 'Editar Archivador'

    return(
        <>
            <Breadcrumb pageName={title} />
            <FolderForm folder={{}} isNew={false} />
        </>
    )

}