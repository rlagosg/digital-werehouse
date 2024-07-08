import { VoucherFolder } from "@/interfaces";

import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { FcOpenedFolder } from "react-icons/fc";
import { LuCalendarDays } from "react-icons/lu";
import { converNumberToMonth, convertDateToMyFormat } from '../../utils/convertDate';
import { DropDown } from "../ui";

interface Props {
  folder: VoucherFolder;
}

export const FolderCard = ({ folder }: Props ) => {

    const { 
        firstVoucher, lastVoucher, month, name, year, scanDetails
    } = folder;

    const { observations, scanEntryDate, scanExitDate } = scanDetails

  const levelUp = true;
  const levelDown = true;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
    
    <div className="rounded-2xl bg-white px-4 py-2 shadow-default dark:border-strokedark dark:bg-boxdark
    relative z-20 transition-all duration-700 hover:scale-100 "
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >

      {isHovered && (
        <div
          className="absolute top-2 right-2 z-10 fadeIn"
          onClick={(e) => e.stopPropagation()} // Detiene la propagación del clic
        >
          <DropDown />
        </div>
      )}

      <div className={`mt-2 flex items-end justify-between `}> 

        {/* Icono & Numero */}
        <div className="flex items-center">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <div className="fill-primary dark:fill-white">
              <FcOpenedFolder size={ 25 } />
            </div>          
          </div>

          <div className="text-title-md lg:text-title-sm2 2xl:text-title-md font-bold text-black dark:text-white ml-2">
            {name}
          </div>
        </div>

      <span
          className={` gap-1 text-sm font-medium `}
        >
          <div className="flex items-center ">
            { convertDateToMyFormat(scanEntryDate) }
            <FaArrowDown className="text-meta-5" size={12}/>
          </div>

          <div className={`flex items-center transition-all duration-300 ${isHovered ? 'ml-7' : 'ml-0'}`}>
            { convertDateToMyFormat(scanExitDate) }
            <FaArrowUp className="text-meta-3" size={12}/>
          </div>
        </span>
        
      </div> 

      <div className="mt-4 flex items-end justify-between">
        
        {/* Rango */}
        <div>
          <h4 className="text-title-sm lg:text-base 2xl:text-title-sm font-bold text-black dark:text-white">
            { firstVoucher + ' - ' + lastVoucher }
          </h4>
          <span className="text-sm lg:text-xs 2xl:text-sm font-medium">Rango</span>
        </div>

        {/* Fecha */}
        <span
          className={`flex items-center gap-1 text-sm lg:text-xs 2xl:text-sm font-medium text-red${
            levelUp && "text-meta-3"
          } ${levelDown && "text-meta-5"} `}
        >
          { converNumberToMonth( month ) + ' '+ year }

          <div className="text-cyan-600 dark:text-cyan-300">
          <LuCalendarDays />
          </div>
        </span>
      </div>
      
    </div>
    </>
  );
};