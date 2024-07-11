"use client"

import { VoucherFolder } from "@/interfaces";
import { ErrorMessage } from "@hookform/error-message";
import { DatePicker } from 'antd';
import { Dayjs } from 'dayjs';
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

    const msgRequired = 'Este campo es obligatorio';


    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log(data);
    }

    const handleMothChange = (date: Dayjs | null, dateString: string | string[]) => {
        if (date) {
            const year = date.year().toString();
            const month = (date.month() + 1).toString(); // dayjs months are 0-indexed
      
            setValue('year', year);
            setValue('month', month);
          } else {
            setValue('year', '');
            setValue('month', '');
          }      
    };

    const handleDateChange = (date: Dayjs | null) => {
        return date ? date.format( 'YYYY-MM-DD' ) : ''; 
    };

    const className = 'w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'

    const LabelTittle = ({name}: {name: string}) => (
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            {name}
        </label>
    )

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
                                
                                <div className="w-full xl:w-1/2">
                                    <LabelTittle name={'Nombre'} />
                                    <input
                                    type="text"
                                    placeholder="nombre del archivador"
                                    className={className}
                                    {...register("name", { required: msgRequired})} />
                                    <ErrorMessage errors={errors} name="name" />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <LabelTittle name={'Año / Mes'} />
                                    <DatePicker 
                                    picker="month" 
                                    className={className}
                                    onChange={handleMothChange}
                                    />
                                    <input type="hidden" {...register('month', { required: msgRequired })} />
                                    {errors.month && (
                                        <p className="mt-1 text-red-500 text-base">
                                            {errors.month.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Rangos */}
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <LabelTittle name='Voucher inicial' />
                                    <input
                                    type="number"
                                    min={0}
                                    placeholder="Ingresa el numero del primer voucher"
                                    className={className}
                                    {...register("firstVoucher", { required: msgRequired})} />
                                     <ErrorMessage errors={errors} name="firstVoucher" />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <LabelTittle name='Voucher final' />
                                    <input
                                    type="text"
                                    placeholder="Ingresa el numero del ultimo voucher"
                                    className={className}
                                    {...register("lastVoucher", { required: msgRequired})}
                                    />
                                    <ErrorMessage errors={errors} name="lastVoucher" />
                                </div>
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
                                <div className="w-full xl:w-1/2">
                                    <LabelTittle name={'Fecha entrada'} />
                                    <DatePicker 
                                        type="date" 
                                        className={className}
                                        onChange={(e) => { 
                                            setValue('scanEntryDate', handleDateChange(e), { shouldValidate: true }); 
                                        }} 
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
                                        onChange={(e)=>{ setValue('scanExitDate', handleDateChange(e), { shouldValidate: true }); }}
                                    />
                                </div>
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