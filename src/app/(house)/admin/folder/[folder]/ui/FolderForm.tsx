"use client"

import { VoucherFolder } from "@/interfaces";
import { DatePicker, Form } from 'antd';

interface Props{
    folder: Partial<VoucherFolder>;
    isNew: boolean
}

export const FolderForm = ({ folder, isNew }: Props) => {

    return(
        <>
           <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Datos de Archivador
                    </h3>

                    </div>
                    <Form action="#">
                    <div className="p-6.5">

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Nombre
                            </label>
                            <input
                            type="text"
                            placeholder="nombre del archivador"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            
                        </div>

                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Año / Mes
                            </label>
                            
                            <DatePicker 
                            picker="month" 
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Voucher inicial
                            </label>
                            <input
                            type="text"
                            placeholder="Ingresa el numero del primer voucher"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Voucher final
                            </label>
                            <input
                            type="text"
                            placeholder="Ingresa el numero del ultimo voucher"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        </div>
                      
                        <div className="mb-6">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Descripcion
                        </label>
                        <textarea
                            rows={6}
                            placeholder="Descripcion del archivador"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        ></textarea>
                        </div>

                        
                    </div>
                    </Form>
                </div>
                </div>

                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Datos de Digitalización
                </h3>
                </div>
                <Form action="#">
                <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Fecha entrada
                            </label>
                            <DatePicker type="date" className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"/>
                        </div>

                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Fecha salida
                            </label>
                            <DatePicker type="date" className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"/>
                        </div>
                        </div>

                        <div className="mb-6">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Observaciones
                        </label>
                        <textarea
                            rows={6}
                            placeholder="Escribe tus observaciones"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        ></textarea>
                        </div>
                    
                </div>
                </Form>
                    </div>
                </div>
            </div> 
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-10">
                    Guardar
                </button>

        </>
    )
}