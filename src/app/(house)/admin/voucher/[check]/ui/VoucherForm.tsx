"use client"

import { InputField, LabelTittle, MultiSelect, SelectList } from "@/components";
import { ItemList, Voucher } from "@/interfaces";
import { DatePicker, InputNumber } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputPDF } from "./InputPDF";

interface Props{
    voucher : Partial<Voucher>;
    banks  : ItemList[];
    isNew  : boolean;
}

export interface FormVoucherInputs {
    check         : string;
    checkDate     : string;
    bankId        : string;
    checkValue    : string;
    beneficiary   : string;
    description?  : string;
    proyects?     : string;
    idScanDetails : string;
    scanEntryDate : string;
    scanExitDate  : string;
    observations  : string;
    isNull        : boolean;
    nullDate?     : string;
    pdf          : File | string;
}

type DateAnt = Dayjs | null

export const VoucherForm = ({ voucher, isNew, banks }: Props) => {

    const router = useRouter();

    const converString = ( value : any ) => value ? value.toString() : "";

    const {
        handleSubmit,
        register,
        formState: { errors },
        getValues,
        setValue,
        watch,
    } = useForm<FormVoucherInputs>({
            defaultValues: {
                check: converString(voucher.check),
                checkDate: converString(voucher.checkDate),
                bankId: converString(voucher.bank?.id),
                checkValue: converString(voucher.checkValue),
                beneficiary: converString(voucher.beneficiary),
                description: converString(voucher.description),
                proyects: converString(voucher.proyects),
                idScanDetails: converString(voucher.document?.id),
                scanEntryDate: converString(voucher.document?.scanDetails.scanEntryDate),
                scanExitDate:  converString(voucher.document?.scanDetails.scanExitDate),
                observations:  converString(voucher.document?.scanDetails.observations),
                isNull: false,    
                pdf: converString(voucher.document?.pdfPath)
            }
        });
    


    const required = 'Este campo es obligatorio';

    const onSubmit: SubmitHandler<FormVoucherInputs> = async (data) => {
        
        const formData = new FormData();

        /* if ( folder.id ){
            formData.append("id", folder.id);
        } */

        //const { ok } = await createUpdateVoucherFolder( formData );
        console.log({data});        
        //router.replace(`/admin/folder/${ updateFolder?.name }`)      

    }

    const className = 'w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm'

    const convertDates = ( date : Date | undefined | null) => date ?  dayjs(date) : null

    const [dateEntry, setDateEntry] = useState<DateAnt>(convertDates(voucher.document?.scanDetails?.scanEntryDate));
    const [dateExit, setDateExit] = useState<DateAnt>(convertDates(voucher.document?.scanDetails?.scanExitDate));
    const [dateCk, setDateCk] = useState<DateAnt>(convertDates(voucher.checkDate));


    const onChangeProyecs = (value: string[]) => {
        const listaOrdenada = value.map(Number).sort((a, b) => a - b).toString();        
        setValue('proyects', listaOrdenada);
    };

    const handleDateChange = (date: DateAnt) => {
        return date ? date.format( 'YYYY-MM-DD' ) : ''; 
    };

    const handleSavePDF = (file: File) => {
        setValue('pdf', file);
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
                                    type="number"
                                    required="Este campo es obligatorio"
                                    error={errors.check}
                                />

                                <div className="w-full xl:w-1/2">                                
                                    <LabelTittle name={'Fecha de Cheke'} />                                   
                                    <DatePicker 
                                        name="checkDate"
                                        type="date" 
                                        className={className}
                                        value={dateCk}                                        
                                        onChange={(e)=>{ setValue('checkDate', handleDateChange(e), { shouldValidate: true }); 
                                        setDateCk(e)
                                    }}
                                    />
                                     <input type="hidden" {...register('checkDate', { required: "La fecha del cheke es requerida" })} />
                                    {errors.checkDate && (
                                        <p className="mt-1 text-red-500 text-sm">
                                            {errors.checkDate.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row"> 

                                <div className='w-full xl:w-1/2'>
                                    <LabelTittle name='Banco'/>
                                    <SelectList
                                        value={getValues('bankId') || ''}
                                        onChange={(e)=> { setValue('bankId', e || '', { shouldValidate: true })}}
                                        title="Banco" 
                                        placeholder="Selecciona un banco" 
                                        list={banks}
                                        className="text-9xl"
                                    />
                                    <input type="hidden" {...register('bankId', { required })} />
                                    {errors.bankId && (
                                        <p className="mt-1 text-red-500 text-sm">
                                        {required}
                                        </p>
                                    )}
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <LabelTittle name={'Valor de Cheke'} />

                                    <div className="relative w-full">
                                        <InputNumber<number>
                                        defaultValue={voucher.checkValue || 0}
                                        placeholder={'Ingresa el valor del cheque'}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                        min={0}
                                        prefix={'L'}
                                        className={ className + ' flex items-center'}
                                        style={{ width: '100%', height: '45px', display: 'flex', alignItems: 'center' }}
                                        onChange={(e)=> { setValue('checkValue', e?.toString() || '', { shouldValidate: true })}}
                                        />
                                    
                                    </div>
                                    <input type="hidden" {...register('checkValue', { required })} />
                                    {errors.checkValue && (
                                        <p className="mt-1 text-red-500 text-sm">
                                        {required}
                                        </p>
                                    )}
                                </div>
                            </div>


                            <div className="mb-4.5">
                                <LabelTittle name={'Proyecto'} /> 
                                <MultiSelect id="MultiSelect" initialSelected={voucher.proyects || ''} onChange={onChangeProyecs}/>
                            </div>

                            <div className="mb-2.5">
                                <LabelTittle name={'Beneficiario'} /> 
                                <input
                                    type="text"
                                    placeholder="Ingresa el nombre del beneficiario"
                                    className={className}                                    
                                    {...register("beneficiary")}
                                />
                                {errors.beneficiary && (
                                        <p className="mt-1 text-red-500 text-sm">
                                        {required}
                                        </p>
                                    )}
                            </div>
                            
                        
                            <div className="mb-6">
                                <LabelTittle name='Descripción'/>
                                <textarea
                                    rows={5}
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
                
                        <div className="p-6">

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

                    <InputPDF
                        document={voucher.document}
                        name="pdf"
                        setValue={setValue}
                        register={register}
                        required="Este campo es obligatorio"
                        error={errors.pdf}
                    />

                </div>
            </div> 

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-10">
                Guardar
            </button>

        </form>
        </>
    )
}