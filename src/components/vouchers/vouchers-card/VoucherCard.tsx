
import { DropDown } from "@/components/ui";
import { Voucher } from "@/interfaces";
import { format } from "@/utils";

import { convertDateToCalendar } from '@/utils/convertDate';
import { BsFiletypePdf } from "react-icons/bs";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";

interface Props {
  voucher: Voucher;
  isHovered: boolean;
}

export const VoucherCard = ({ voucher, isHovered }: Props ) => {

    const { 
        bank, check, checkDate, checkValue, document, beneficiary,
        folder, isNull, proyects, description
    } = voucher ;

    const { scanEntryDate, scanExitDate } = document.scanDetails;

  return (
    <div className="rounded-2xl bg-white px-4 py-2 shadow-default dark:border-strokedark dark:bg-boxdark
    relative z-20 transition-all duration-700 hover:scale-105">

      {isHovered && (
          <div
            className="absolute top-2 right-2 z-10 fadeIn"
            onClick={(e) => {
              e.preventDefault(); // Previene la navegación
              e.stopPropagation(); // Detiene la propagación del clic
            }}
          >
            <DropDown url={`/admin/voucher/${ voucher.check }`}/>
          </div>
        )}

      <div className="mt-2 block md:flex xl:block 2xl:flex items-end justify-between"> 

        {/* Icono & Numero */}
        <div className="flex items-center">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <div className="fill-primary dark:fill-white">
              <BsFiletypePdf   size={ 25 } />
            </div>          
          </div>

          <div className="text-title-xsm font-bold text-black dark:text-white ml-2">
            CK{check}
          </div>
        </div>

      <span
          className={`gap-1 flex md:block xl:flex 2xl:block text-xs font-medium`}
        >
          <div className="flex items-center ">
            { convertDateToCalendar(scanEntryDate) }
            <FaArrowDown className="text-meta-5" size={12}/>
          </div>

          <div className={`flex items-center transition-all duration-300 ${isHovered ? 'ml-7' : 'ml-0'}`}>
            { scanExitDate ? convertDateToCalendar(scanExitDate) : 'procesando' }
            <FaArrowUp className="text-meta-3" size={12}/>
          </div>
      </span>
        
      </div>

      <div className="mt-5 items-end justify-between">
          <h4 className="text-xs font-semibold text-black dark:text-white">
            {beneficiary}
          </h4>

          { /* si existe descripcion lo mostramos */
            description != '' && (
              <div className="mt-1">
                  <h4 className="text-xs font-light text-black dark:text-white">
                    {description}
                  </h4>
                {/* <span className="text-xs font-medium">Descripción</span> */}
              </div>
            )
          }

          <span className="text-xs font-medium">Beneficiario</span>
        </div>
      {/* <span className="flex items-center gap-1 text-xs mt-2">{ beneficiary }</span>  */}
      
      { /* si existen proyectos los mostramos */
        proyects != '' && (
          <div className="mt-4">
            <h4 className="font-semibold text-xs text-black dark:text-white">
              {proyects}
            </h4>
            <span className="text-xs font-medium">Proyecto</span>
          </div>
        )
      }
      
      { /* si existen proyectos los mostramos */
        bank && (
          <div className="mt-4">
            <h4 className="font-semibold text-xs text-black dark:text-white">
              {bank.name}
            </h4>
            <span className="text-xs font-medium">Banco</span>
          </div>
        )
      }

      <div className="mt-4 flex items-end justify-between">       
        {/* Valor */}
        <div>
          <h4 className="text-title-xsm font-bold text-black dark:text-white">
            { format(checkValue) } 
            {/* <span className="text-xs font-medium ml-1">Lps.</span> */}
          </h4>
          <span className="text-xs font-medium">Valor</span>
        </div>

        {/* Fecha */}
        <span
          className={`flex items-center gap-1 text-xs font-medium text-meta-5`}
        >
          { convertDateToCalendar(checkDate) }
          <div className="text-cyan-600 dark:text-cyan-300">
          <LuCalendarDays />
          </div>
        </span>
      </div>
      
    </div>
  );
};