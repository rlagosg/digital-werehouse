import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormVoucherInputs } from "./VoucherForm";

import { LabelTittle } from "@/components";
import { DateAnt, Voucher } from "@/interfaces";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useState } from "react";

interface Props {
    register    : UseFormRegister<FormVoucherInputs>;
    setValue    : UseFormSetValue<FormVoucherInputs>;
    getValues   : UseFormGetValues<FormVoucherInputs>;
    errors      : FieldErrors<FormVoucherInputs>
    className   : string;
    voucher     : Partial<Voucher>;
}

export const ScanInputs = ({register, setValue, getValues, errors, className, voucher }:Props) => {

    const {  } = voucher;

    const convertDates = ( date : Date | undefined | null) => date ?  dayjs(date) : null
    const [dateEntry, setDateEntry] = useState<DateAnt>(convertDates(voucher.document?.scanDetails?.scanEntryDate));
    const [dateExit, setDateExit] = useState<DateAnt>(convertDates(voucher.document?.scanDetails?.scanExitDate));

    const handleDateChange = (date: DateAnt) => {
        return date ? date.format( 'YYYY-MM-DD' ) : ''; 
    };

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Datos de Digitalización
                            </h3>
                        </div>
                
                        <div className="px-6.5 pt-6.5">

                            <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                                
                                <div className="w-full xl:w-1/2">
                                    <LabelTittle name={'Fecha entrada'} />
                                    <DatePicker 
                                        type="date" 
                                        className={className}
                                        value={dateEntry}
                                        onChange={(e)=>{ setValue('scanEntryDate', handleDateChange(e), { shouldValidate: true }); 
                                        setDateEntry(e) }}
                                    />
                                    <input type="hidden" {...register('scanEntryDate', { required: "La fecha de entrada es requerida" })} />
                                    {errors.scanEntryDate && (
                                        <p className="mt-1 text-red-500 text-sm">
                                            {errors.scanEntryDate.message}
                                        </p>
                                    )}
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <LabelTittle name={'Fecha salida'} />                                   
                                    <DatePicker 
                                        type="date" 
                                        className={className}
                                        value={dateExit}
                                        onChange={(e)=>{ setValue('scanExitDate', handleDateChange(e), { shouldValidate: true }); 
                                        setDateExit(e)
                                    }}
                                    />
                                </div>
                            </div>

                            <div className="mb-5.5">
                                <LabelTittle name={'Observaciones'} />
                                <textarea
                                    rows={4}
                                    placeholder="Escribe tus observaciones"
                                    className={className}
                                    {...register("observations")}
                                ></textarea>
                            </div>
                            
                        </div>
                    </div>
        </>
    )
}