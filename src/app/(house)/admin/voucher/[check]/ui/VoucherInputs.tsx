import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormVoucherInputs } from "./VoucherForm";

import { InputField, LabelTittle, MultiSelect, SelectList } from "@/components";
import { DateAnt, ItemList, Voucher } from "@/interfaces";
import { DatePicker, InputNumber } from 'antd';
import dayjs from 'dayjs';
import { useState } from "react";

interface Props {
    register    : UseFormRegister<FormVoucherInputs>;
    setValue    : UseFormSetValue<FormVoucherInputs>;
    getValues   : UseFormGetValues<FormVoucherInputs>;
    errors      : FieldErrors<FormVoucherInputs>
    className   : string;
    voucher     : Partial<Voucher>;
    banks       : ItemList[];
}

export const VoucherInputs = ({register, setValue, getValues, errors, className, voucher, banks}:Props) => {

    const { checkDate } = voucher;
    
    const convertDates = ( date : Date | undefined | null) => date ?  dayjs(date) : null
    const [dateCk, setDateCk] = useState<DateAnt>(convertDates(checkDate));

    const handleDateChange = (date: DateAnt) => {
        return date ? date.format( 'YYYY-MM-DD' ) : ''; 
    };

    const onChangeProyecs = (value: string[]) => {
        const listaOrdenada = value.map(Number).sort((a, b) => a - b).toString();        
        setValue('proyects', listaOrdenada);
    };

    const required = 'Este campo es obligatorio';

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
                        
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Datos de Voucher
                            </h3>
                        </div>
                        
                        <div className="px-6.5 pt-6.5">

                            {/* Nombre / Mes */}
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row ">
                                
                                <InputField
                                    name="check"
                                    label="Cheke"
                                    placeholder="numero de cheke"
                                    register={register}
                                    type="number"
                                    required={required}
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

                            <div className="mb-5">
                                <InputField 
                                    name="beneficiary"
                                    label="Beneficiario"
                                    placeholder={'Ingresa el nombre del beneficiario'}
                                    required={required}
                                    error={errors.beneficiary}
                                    register={register} 
                                />
                            </div>                            
                        
                            <div className="mb-6 ">
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
        </>
    )
}