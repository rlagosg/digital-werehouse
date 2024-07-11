"use client"

import { DatePickerField, InputField, LabelTittle } from "@/components";
import { VoucherFolder } from "@/interfaces";
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props{
    folder: Partial<VoucherFolder>;
    isNew: boolean
}

interface FormInputs {
    name          : string;
    description   : string;
    year          : string;
    month         : string;
    firstVoucher  : string;
    lastVoucher   : string;
    scanEntryDate : string;
    scanExitDate  : string;
    observations  : string;
}

export const FolderForm = ({ folder, isNew }: Props) => {

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        getValues,
        setValue,
        watch,
    } = useForm<FormInputs>({
            defaultValues: {
                name: folder.name,
                description: folder.description,
                year: folder.year?.toString() || '',
                month: folder.year?.toString() || '',
                firstVoucher: folder.firstVoucher?.toString() || '',
                lastVoucher: folder.lastVoucher?.toString() || '',
                scanEntryDate: folder.scanDetails?.scanEntryDate?.toString() || '',
                scanExitDate: folder.scanDetails?.scanExitDate?.toString() || '',
                observations: folder.scanDetails?.observations || '',
            }
        });
    
    const [dateMoth, setDateMoth] = useState<Dayjs | null>(
        folder.month && folder.year ? dayjs().year(folder.year).month(folder.month - 1) : null
    );

    useEffect(() => {
        handleMothChange(dateMoth);
    }, [])

    const msgRequired = 'Este campo es obligatorio';

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log(data);
    }

    const handleMothChange = (date: Dayjs | null) => {
        if (date) {
            setValue('year', date.year().toString());
            setValue('month', (date.month() + 1).toString());
            setDateMoth(date);
        } else {
            setValue('year', '');
            setValue('month', '');
            setDateMoth(null)
        }
    };

    const className = 'w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'

    return(
        <>
        <form onSubmit={ handleSubmit(onSubmit) } action="#">
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                
                {/* <!-- Archivador Form --> */}
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Datos de Archivador
                            </h3>
                        </div>
                        
                        <div className="p-6.5">

                            {/* Nombre / Mes */}
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                
                                <InputField
                                    name="name"
                                    label="Nombre"
                                    placeholder="nombre del archivador"
                                    register={register}
                                    required="Este campo es obligatorio"
                                    error={errors.name}
                                />

                                <div className="w-full xl:w-1/2">
                                    <LabelTittle name={'Año / Mes'} />
                                    <DatePicker 
                                    picker="month" 
                                    className={className}
                                    onChange={handleMothChange}
                                    value={dateMoth}
                                    />
                                    <input type="hidden" {...register('month', { required: msgRequired })} />
                                    {errors.month && (
                                        <p className="mt-1 text-red-500 text-sm">
                                            {msgRequired}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Rangos */}
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <InputField
                                    name="firstVoucher"
                                    label="Voucher inicial"
                                    type="number"
                                    placeholder="Ingresa el numero del primer voucher"
                                    register={register}
                                    required={msgRequired}
                                    error={errors.firstVoucher}
                                />

                                <InputField
                                    name="lastVoucher"
                                    label="Voucher final"
                                    type="number"
                                    placeholder="Ingresa el numero del ultimo voucher"
                                    register={register}
                                    required={msgRequired}
                                    error={errors.lastVoucher}
                                />
                            </div>
                        
                            <div className="mb-6">
                                <LabelTittle name='Descripción'/>
                                <textarea
                                    rows={6}
                                    placeholder="Descripcion del archivador"
                                    className={className}
                                    {...register("description")}
                                ></textarea>
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* Segunda mitad Digitalización*/}
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Datos de Digitalización
                            </h3>
                        </div>

                
                        <div className="p-6.5">

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                
                                <DatePickerField
                                    name="scanEntryDate"
                                    control={control}
                                    label="Fecha entrada"
                                    error={errors.scanEntryDate}
                                    required="La fecha de entrada es requerida"
                                />

                                <DatePickerField
                                    name="scanExitDate"
                                    control={control}
                                    label="Fecha salida"
                                />
                            </div>

                            <div className="mb-6">
                                <LabelTittle name={'Observaciones'} />
                                <textarea
                                    rows={6}
                                    placeholder="Escribe tus observaciones"
                                    className={className}
                                    {...register("observations")}
                                ></textarea>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div> 

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-10">
                Guardar
            </button>

        </form>
        </>
    )
}