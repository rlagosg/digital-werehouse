import { PrincipalTitle, VoucherItemCard } from '@/components';
import { Voucher } from "@/interfaces";
import { convertDateToMyFormat, format } from "@/utils";
import { BsPersonVcard } from 'react-icons/bs';

interface Props {
    voucher: Voucher
}

import { FaArrowDown, FaArrowUp, FaMoneyCheck, FaRegFolderOpen } from "react-icons/fa6";
import { GrMoney } from 'react-icons/gr';
import { LuCalendarDays } from 'react-icons/lu';
import { RiBankLine } from 'react-icons/ri';



export const VoucherDetails = ({ voucher }: Props) => {

    const { check, checkDate, checkValue, document, bank, folder, isNull, nullDate, beneficiary } = voucher
    const { description, pages, scanDetails } = document
    const { scanEntryDate, observations, scanExitDate } = scanDetails

    return(
    <>
        
        <div className="col-span-1 md:col-span-2 px-5">

            {/* Datos del Propietario */}
            <PrincipalTitle title='Detalles de Voucher'/>

            <div className="flex flex-col pt-4 mb-10">
                
                <div className="mt-3 grid grid-cols-2 gap-5 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-6">
                    <VoucherItemCard nameItem='Cheke' value={voucher ? voucher.check.toString() : null} 
                    icon={ FaMoneyCheck  }/>                   
                    <VoucherItemCard nameItem='Fecha' value={voucher ? convertDateToMyFormat( checkDate ) : null} icon={ LuCalendarDays }/>
                </div>

                <div className="mt-5">
                    <VoucherItemCard nameItem='Banco' value={voucher ? bank.name + ' / ' + bank.account : null} icon={RiBankLine  }/>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-5 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-6">
                    <VoucherItemCard nameItem='Valor' value={voucher ? format(checkValue) : null} icon={GrMoney }/>
                    <VoucherItemCard nameItem='Archivador' value={voucher ? folder.toString() : null} icon={ FaRegFolderOpen }/>
                    {/* <VoucherItemCard nameItem='Fecha' value={voucher ? convertDateToMyFormat( checkDate ) : null} icon={ AiTwotoneFileExcel  }/> */}
                </div>               

                <div className="mt-5">
                    <VoucherItemCard nameItem='Beneficiario' value={voucher ? beneficiary : null} icon={BsPersonVcard }/>
                </div>

            </div>

            {/* Linia Divisora */}
            <div className="w-full h-px bg-gray-300 my-3" />

            {/* Datos de Scaneo */}
            <PrincipalTitle title='Datos de Digitalización'/>

            <div className="flex flex-col pt-4 mb-10">
                <div className="mt-3 grid grid-cols-2 gap-5 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-6">
                    <VoucherItemCard nameItem='Fecha de Entrada' value={voucher ? convertDateToMyFormat( scanEntryDate ) : null} icon={FaArrowDown}/>
                    <VoucherItemCard nameItem='Fecha de Salida' value={voucher ? convertDateToMyFormat( scanExitDate ) : null} icon={FaArrowUp}/>
                </div>
            </div>

            {/* Observaciones */ }
            <h3 className="font-bold text-sm">Observaciones</h3>
                <p className="font-light dark:text-white"> { voucher ? observations : 'Ninguna' } </p>

        </div>
    </>)

}