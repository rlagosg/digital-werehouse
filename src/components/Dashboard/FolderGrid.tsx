"use client";

import { Folder } from "@/interfaces";
import { FolderCard } from "../cards/folder-card";

interface Props {
  folders: Folder[]
}

const FolderGrid = ( { folders }: Props ) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

        {
          folders.map( ( folder: Folder ) => (
            <FolderCard key={ folder.number } folder={ folder } />
          ))
        }
        
      </div>

    </>
  );
};

export default FolderGrid;
