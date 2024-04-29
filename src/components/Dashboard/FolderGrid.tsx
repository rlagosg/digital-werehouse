"use client";

import { Folder } from "@/interfaces";
import { HoverEffect } from "../cards/card-hover-effect";

interface Props {
  folders: Folder[]
}

const FolderGrid = ( { folders }: Props ) => {
  return (
    <>
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5"> */}

        {/* {
          folders.map( ( folder: Folder ) => (
            
            <FolderCard key={ folder.number } folder={ folder } />
          ))
        } */}

        <HoverEffect items={folders} />
        
      {/* </div> */}

    </>
  );
};

export default FolderGrid;
