
import { getPaginatedVoucherFolders } from "@/actions";
import { FolderGrid, SearchInput } from "@/components";
import { convertNumber } from "@/utils/convertNumber";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Werehouse | AMC",
  description: "Almacen digital Alcadia Municipal de Comayagua",
};

interface Props {
  searchParams: {
    folder? : string;
    year?   : string;
  }
}

export default async function Home({ searchParams }:Props) {

  const year = convertNumber(searchParams.year);
  const folder    = searchParams.folder ?? '';
  const { folders } = await getPaginatedVoucherFolders({ folder, year })

  //let folders = [...initialData.voucherFolders];

 /*  for (let x = 0; x < 7; x++) {
    folders.push(...initialData.voucherFolders)
  } */

  return (
    <>      
        <SearchInput />
        <FolderGrid folders={folders}/>
    </>
  );
}
