
import { Voucher } from "@/interfaces";

import { convertDateToCalendar } from '@/utils/convertDate';
import { BsFiletypePdf } from "react-icons/bs";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";

interface Props {
  voucher: Voucher;
}

export const VoucherCard = ({ voucher }: Props ) => {

    const { 
        bank, check, checkDate, checkValue, document,
        folder, isNull
    } = voucher ;

    const { observations, pages } = document;

  const levelUp = true;
  const levelDown = true;
  const date = new Date();

  return (
    <div className="rounded-2xl bg-white px-7.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark
    relative z-20 transition-all duration-700 hover:scale-105">

      <div className="mt-2 flex items-end justify-between"> 

        {/* Icono & Numero */}
        <div className="flex items-center">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <div className="fill-primary dark:fill-white">
              <BsFiletypePdf   size={ 25 } />
            </div>          
          </div>

          <div className="text-title-md font-bold text-black dark:text-white ml-2">
            CK{check}
          </div>
        </div>

      <span
          className={` gap-1 text-sm font-medium`}
        >
          <div className="flex items-center ">
            { convertDateToCalendar(date) }
            <FaArrowDown className="text-meta-5" size={12}/>
          </div>

          <div className="flex items-center">
            { convertDateToCalendar(date) }
            <FaArrowUp className="text-meta-3" size={12}/>
          </div>
        </span>
        
      </div>

      <span className="flex items-center gap-1 text-sm mt-2">{ observations }</span> 

      <div className="mt-4 flex items-end justify-between">
        
        {/* Rango */}
        <div>
          <h4 className="text-title-sm font-bold text-black dark:text-white">
            { checkValue } 
            <span className="text-sm font-medium ml-1">Lps.</span>
          </h4>
          <span className="text-sm font-medium">Valor</span>
        </div>

        {/* Fecha */}
        <span
          className={`flex items-center gap-1 text-sm font-medium text-red${
            levelUp && "text-meta-3"
          } ${levelDown && "text-meta-5"} `}
        >
          { convertDateToCalendar(date) }

          <div className="text-cyan-600 dark:text-cyan-300">
          <LuCalendarDays />
          </div>
        </span>
      </div>
      
    </div>
  );
};