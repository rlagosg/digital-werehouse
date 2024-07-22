"use client"

import { createUpdateVoucher } from "@/actions/vouchers/create-update-voucher";
import { ItemList, Voucher, VoucherFolder } from "@/interfaces";
import { Dayjs } from 'dayjs';
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { PDFInput } from "./PDFInput";
import { ScanInputs } from "./ScanInputs";
import { VoucherInputs } from "./VoucherInputs";

import { message, notification } from 'antd';
import { useEffect } from "react";


interface Props{
    voucher       : Partial<Voucher>;
    banks         : ItemList[];
    isNew         : boolean;
    folderSearch? : VoucherFolder | null | undefined;
    returnBack?   : boolean;
}

export interface FormVoucherInputs {
    check         : string;
    checkDate     : string;
    bankId        : string;
    checkValue    : string;
    beneficiary   : string;
    description?  : string;
    proyects?     : string;
    idDocument    : string;
    idScanDetails : string;
    idFolder      : string;
    folderName    : string;
    scanEntryDate : string;
    scanExitDate  : string;
    observations  : string;
    isNull        : boolean;
    nullDate?     : string;
    pdf          : File | string;
}

type DateAnt = Dayjs | null

export const VoucherForm = ({ voucher, isNew, banks, returnBack, folderSearch }: Props) => {


    const router = useRouter();

    useEffect(() => {
        if (returnBack) router.back(); // Redirige a la página anterior
      }, [returnBack]);

    const converString = ( value : any ) => value ? value.toString() : "";

    const dataVoucher: FormVoucherInputs = {
        check: converString(voucher.check),
        checkDate: converString(voucher.checkDate),
        bankId: converString(voucher.bank?.id),
        checkValue: converString(voucher.checkValue),
        beneficiary: converString(voucher.beneficiary),
        description: converString(voucher.description),
        proyects: converString(voucher.proyects),
        idDocument: converString(voucher.document?.id),
        idScanDetails: converString(voucher.document?.scanDetails.id),
        idFolder: converString(voucher.folder?.id) === '' ? folderSearch?.id! : '' ,
        folderName: converString(voucher.folder?.name),
        scanEntryDate: converString(voucher.document?.scanDetails.scanEntryDate),
        scanExitDate:  converString(voucher.document?.scanDetails.scanExitDate),
        observations:  converString(voucher.document?.scanDetails.observations),
        isNull: false,    
        pdf: converString(voucher.document?.pdfPath)
    }

    const {
        handleSubmit,
        register,
        formState: { errors },
        getValues,
        setValue,
        watch,
    } = useForm<FormVoucherInputs>({
            defaultValues: {
                ...dataVoucher
            }
        });
    

        console.log({dataVoucher});
        


    const required = 'Este campo es obligatorio';

    const onSubmit: SubmitHandler<FormVoucherInputs> = async (data) => {
        
        message.loading({ content: 'Guardando...', duration: 0 });

        const formData = new FormData();
        const { pdf, ...voucherToSave } = data;

        if ( voucher.id ){
            formData.append("id", voucher.id);
        }
        
        formData.append('check',         voucherToSave.check);
        formData.append('checkDate',     voucherToSave.checkDate);
        formData.append('bankId',        voucherToSave.bankId);
        formData.append('checkValue',    voucherToSave.checkValue);
        formData.append('beneficiary',   voucherToSave.beneficiary);
        formData.append('description',   converString(voucherToSave.description));
        formData.append('proyects',      converString(voucherToSave.proyects));
        formData.append('idDocument',    voucherToSave.idDocument);
        formData.append('idScanDetails', voucherToSave.idScanDetails);
        formData.append('idFolder',      voucherToSave.idFolder);
        formData.append('folderName',    voucherToSave.folderName);
        formData.append('scanEntryDate', voucherToSave.scanEntryDate);
        formData.append('scanExitDate',  voucherToSave.scanExitDate);
        formData.append('observations',  voucherToSave.observations);
        formData.append('isNull',        String(voucherToSave.isNull));

        if (pdf && pdf instanceof File) {
            formData.append('pdf', data.pdf);
        }

        const { ok, message: responseMessage, voucher:voucherSave  } = await createUpdateVoucher( formData );
                   
        message.destroy(); // Eliminar el mensaje de carga
        if (ok) {
            notification.success({
                message: 'Éxito',
                description: responseMessage,
                duration: 5,
                showProgress: true,
            });

            if (voucherSave) {
                router.replace(`/admin/voucher/${voucherSave.check}`);
                setValue('pdf', converString(voucher.check));
            }
        } else {
            notification.error({
                message: 'Error',
                description: responseMessage,
                duration: 5,
                showProgress: true,
            });

            console.log('Error: ', responseMessage);
        }

    }

    const className = 'w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm'  

    return(
        <>
        <form onSubmit={ handleSubmit(onSubmit) } action="#">
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                
                                
                {/* <!-- Archivador Form --> */}
                <div className="flex flex-col gap-9">
                    <VoucherInputs
                        register={ register }
                        setValue={ setValue }
                        getValues={ getValues }
                        errors= {errors}
                        className={ className }
                        banks={banks}
                        voucher={voucher}
                    />
                </div>

                {/* Segunda mitad Digitalización*/}
                <div className="flex flex-col gap-9">

                    <ScanInputs
                        register={ register }
                        setValue={ setValue }
                        getValues={ getValues }
                        errors= {errors}
                        className={ className }
                        voucher={voucher}
                    />

                    <PDFInput
                        //onSavePDF={handleSavePDF}
                        document={voucher.document}
                        name="pdf"
                        setValue={setValue}
                        register={register}
                        required={required}
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