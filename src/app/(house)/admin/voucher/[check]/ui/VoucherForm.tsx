"use client"

import { createUpdateVoucherFolder } from "@/actions/vouchersFolders/create-update-voucher-folder";
import { InputField, LabelTittle, MultiSelect, SelectGroup } from "@/components";
import { ItemList, VoucherFolder } from "@/interfaces";
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


interface Props{
    folder : Partial<VoucherFolder>;
    banks  : ItemList[];
    isNew  : boolean;
}

interface FormInputs {
    name            : string;
    description     : string;
    year            : string;
    month           : string;
    idVoucherFolder : string;
    firstVoucher    : string;
    lastVoucher     : string;
    idScanDetails   : string;
    scanEntryDate   : string;
    scanExitDate    : string;
    observations    : string;
}

export const VoucherForm = ({ folder, isNew, banks }: Props) => {

    const router = useRouter();

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
                idScanDetails: folder.scanDetails?.id || '',
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

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        
        const formData = new FormData();

        if ( folder.id ){
            formData.append("id", folder.id);
        }

        formData.append('name'          , data.name);
        formData.append('description'   , data.description);
        formData.append('year'          , data.year);
        formData.append('month'         , data.month);
        formData.append('firstVoucher'  , data.firstVoucher);
        formData.append('lastVoucher'   , data.lastVoucher);
        formData.append('idScanDetails' , data.idScanDetails);
        formData.append('scanEntryDate' , data.scanEntryDate);
        formData.append('scanExitDate'  , data.scanExitDate);
        formData.append('observations'  , data.observations);

        const { ok } = await createUpdateVoucherFolder( formData );
        console.log(ok);        
        //router.replace(`/admin/folder/${ updateFolder?.name }`)      

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

    const className = 'w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm'


    const [dateEntry, setDateEntry] = useState<Dayjs | null>(folder.scanDetails?.scanEntryDate ?  dayjs(folder.scanDetails?.scanEntryDate) : null);

    const [dateExit, setDateExit] = useState<Dayjs | null>(folder.scanDetails?.scanExitDate ? dayjs(folder.scanDetails?.scanExitDate) : null);

    const handleDateChange = (date: Dayjs | null) => {
        return date ? date.format( 'YYYY-MM-DD' ) : ''; 
    };

    return(
        <>
        <form onSubmit={ handleSubmit(onSubmit) } action="#">
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                
                {/* <!-- Archivador Form --> */}
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Datos de Voucher
                            </h3>
                        </div>
                        
                        <div className="p-6.5">

                            {/* Nombre / Mes */}
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                
                                <InputField
                                    name="check"
                                    label="Cheke"
                                    placeholder="numero de cheke"
                                    register={register}
                                    required="Este campo es obligatorio"
                                    error={errors.name}
                                />

                                <div className="w-full xl:w-1/2">                                
                                    <LabelTittle name={'Fecha de cheke'} />                                   
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

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row"> 

                                <div className="w-full xl:w-1/2"> 
                                    <SelectGroup title="Banco" placeholder="Selecciona un banco" list={banks}/>
                                </div>

                                <InputField
                                    name="value"
                                    label="Valor"
                                    type="number"
                                    placeholder="Ingresa el valor del cheque"
                                    register={register}
                                    required={msgRequired}
                                    error={errors.firstVoucher}
                                />
                            </div>

                            <div className="mb-4.5">
                                <LabelTittle name={'Proyecto'} /> 
                                <MultiSelect id="MultiSelect" initialSelected="1" />
                            </div>

                            <div className="mb-4.5">
                                <LabelTittle name={'Beneficiario'} /> 
                                <input
                                    type="text"
                                    placeholder="Ingresa el nombre del beneficiario"
                                    className={className}
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