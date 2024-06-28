
import { getPaginatedVoucherFolders } from "@/actions";
import { Breadcrumb, FolderGrid, Pagination } from "@/components";
import { convertNumber } from "@/utils/convertNumber";
import { Metadata } from "next";
import { FoldersSearchInpus } from "./ui/SearchInpus";

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
    page?       : string;
  }
}

export default async function FoldersPage({ searchParams }:Props ) {

  const { folder = '', startYear, endYear, startMonth, endMonth, startRange, endRange, page } = searchParams;

  const convertedParams = {
    folder,
    startYear : convertNumber(startYear),
    endYear   : convertNumber(endYear),
    startMonth: convertNumber(startMonth),
    endMonth  : convertNumber(endMonth),
    startRange: convertNumber(startRange),
    endRange  : convertNumber(endRange),
    page      : convertNumber(page)
  };
  
  const { folders, totalPages } = await getPaginatedVoucherFolders(convertedParams);
  
    //let folders = [...initialData.voucherFolders];
  
   /*  for (let x = 0; x < 7; x++) {
      folders.push(...initialData.voucherFolders)
    } */
  
    return (
      <>  
      <div className="flex flex-col min-h-[256px] fadeIn ">
        <div className="flex-grow overflow-y-auto min-h-[765px]"> {/* Contenido principal con al menos 765px de altura */}
          <Breadcrumb pageName="Archivadores"/>
          <FoldersSearchInpus/>
          <FolderGrid folders={folders} />
        </div>
        <div className="mt-4"> {/* Paginación con margen superior ajustado */}
          <Pagination totalPages={totalPages} />
        </div>
      </div> 
      </>
    );
}