import { Folder } from "@/interfaces";

import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { FcOpenedFolder } from "react-icons/fc";
import { LuCalendarDays } from "react-icons/lu";
import { converNumberToMonth, convertDateToMyFormat } from '../../utils/convertDate';

interface Props {
  folder: Folder;
}

export const FolderCard = ({ folder }: Props ) => {

    const { 
        firstVoucher, lastVoucher, month, number,
        observations, scanEntryDate, scanExitDate, year
    } = folder;

  const levelUp = true;
  const levelDown = true;

  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">

      <div className="mt-2 flex items-end justify-between"> 

        {/* Icono & Numero */}
        <div className="flex items-center">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <div className="fill-primary dark:fill-white">
              <FcOpenedFolder size={ 25 } />
            </div>          
          </div>

          <div className="text-title-md font-bold text-black dark:text-white ml-2">
            {number}
          </div>
        </div>

      <span
          className={` gap-1 text-sm font-medium`}
        >
          <div className="flex items-center ">
            { convertDateToMyFormat(scanExitDate) }
            <FaArrowDown className="text-meta-5" size={12}/>
          </div>

          <div className="flex items-center">
            { convertDateToMyFormat(scanExitDate) }
            <FaArrowUp className="text-meta-3" size={12}/>
          </div>
        </span>
        
      </div> 

      <div className="mt-4 flex items-end justify-between">
        
        {/* Rango */}
        <div>
          <h4 className="text-title-sm font-bold text-black dark:text-white">
            { firstVoucher + ' - ' + lastVoucher }
          </h4>
          <span className="text-sm font-medium">Rango</span>
        </div>

        {/* Fecha */}
        <span
          className={`flex items-center gap-1 text-sm font-medium text-red${
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
  );
};