
import { getPaginatedVoucherFolders } from "@/actions";
import { FolderGrid, Pagination, SearchInput } from "@/components";
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

const { folder = '', startYear, endYear, startMonth, endMonth, startRange, endRange } = searchParams;

const convertedParams = {
  folder,
  startYear : convertNumber(startYear),
  endYear   : convertNumber(endYear),
  startMonth: convertNumber(startMonth),
  endMonth  : convertNumber(endMonth),
  startRange: convertNumber(startRange),
  endRange  : convertNumber(endRange),
};

const { folders, totalPages } = await getPaginatedVoucherFolders(convertedParams);

  //let folders = [...initialData.voucherFolders];

 /*  for (let x = 0; x < 7; x++) {
    folders.push(...initialData.voucherFolders)
  } */

  return (
    <>  
      <div className="fadeIn">
        <SearchInput/>
        <FolderGrid folders={folders}/>
        <Pagination totalPages={totalPages} />
      </div> 
    </>
  );
}
