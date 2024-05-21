
import { FolderGrid, SearchInput } from "@/components";
import { initialData } from "@/seed/seed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Werehouse | AMC",
  description: "Almacen digital Alcadia Municipal de Comayagua",
};

export default async function Home() {

  const folders = initialData.voucherFolders;

  return (
    <>      
        <SearchInput />
        <FolderGrid folders={folders}/>
    </>
  );
}
