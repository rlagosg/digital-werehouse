"use client"

import { createUpdateVoucher } from "@/actions/vouchers/create-update-voucher";
import { ItemList, Voucher } from "@/interfaces";
import { Dayjs } from 'dayjs';
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { PDFInput } from "./PDFInput";
import { ScanInputs } from "./ScanInputs";
import { VoucherInputs } from "./VoucherInputs";


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
    idDocument    : string;
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
    


    const required = 'Este campo es obligatorio';

    const onSubmit: SubmitHandler<FormVoucherInputs> = async (data) => {
        
        const formData = new FormData();

        if ( voucher.id ){
            formData.append("id", voucher.id);
        }
        
        formData.append('check',         data.check);
        formData.append('checkDate',     data.checkDate);
        formData.append('bankId',        data.bankId);
        formData.append('checkValue',    data.checkValue);
        formData.append('beneficiary',   data.beneficiary);
        formData.append('description',   converString(data.description));
        formData.append('proyects',      converString(data.proyects));
        formData.append('idDocument',    data.idDocument);
        formData.append('idScanDetails', data.idScanDetails);
        formData.append('scanEntryDate', data.scanEntryDate);
        formData.append('scanExitDate',  data.scanExitDate);
        formData.append('observations',  data.observations);
        formData.append('isNull',        String(data.isNull));
        

        const { ok, message  } = await createUpdateVoucher( formData );
        console.log(message);
            
        //router.replace(`/admin/folder/${ updateFolder?.name }`)      

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