
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
    folder?     : string;
    startYear?  : string;
    endYear?    : string;
    startMonth? : string;
    endMonth?   : string;
    startRange? : string;
    endRange?   : string;
  }
}

export default async function Home({ searchParams }:Props) {

  const folder    = searchParams.folder ?? '';
  const startYear  = convertNumber(searchParams.startYear);
  const endYear    = convertNumber(searchParams.endYear);
  const startMonth = convertNumber(searchParams.startMonth);
  const endMonth   = convertNumber(searchParams.endMonth);
  const startRange = convertNumber(searchParams.startRange);
  const endRange   = convertNumber(searchParams.endRange);

  const { folders } = await getPaginatedVoucherFolders({ folder, startYear, endYear })

  //let folders = [...initialData.voucherFolders];

 /*  for (let x = 0; x < 7; x++) {
    folders.push(...initialData.voucherFolders)
  } */

  return (
    <>      
        <SearchInput/>
        <FolderGrid folders={folders}/>
    </>
  );
}
