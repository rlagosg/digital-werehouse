import { Document } from "@/interfaces";
import { useEffect, useRef, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface Props {
    //onSavePDF : (pdf: File) => void;
    document  : Document | null | undefined;
    name      : string;
    register  : UseFormRegister<any>;
    setValue  : UseFormSetValue<any>;
    required? : string;
    error?    : any;
}

export const PDFInput = ({ document, name, register, setValue,required, error }:Props) => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [namePDF, setNamePDF] = useState<string | undefined>(document?.pdfPath);

    useEffect(() => {
        setNamePDF(document?.pdfPath);
    }, [document]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setValue(name, file, { shouldValidate: true }); // Actualiza el valor del campo en el formulario
        } else if (selectedFile) {
            event.target.value = '';
        }
    };

    const handleDelete = () => {
        setSelectedFile(null);
        setNamePDF(undefined);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setValue(name, '', { shouldValidate: true }); // Elimina el valor del campo en el formulario
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Documento PDF
                </h3>
            </div>
            <div className="flex flex-col gap-5.5 px-6.5 pt-6.5 pb-4">
                <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Adjuntar archivo
                    </label>
                    <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <div 
                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary flex items-center"
                        onClick={handleClick}
                    >
                        <div className="w-44 items-center py-2.5 px-4 text-black text-sm text-center border border-stroke rounded-s-lg bg-sky-50 hover:bg-sky-100 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-zinc-500 dark:hover:bg-zinc-600 dark:focus:ring-gray-700 dark:text-white dark:border-form-strokedark">
                            {selectedFile || namePDF ? 'Archivo seleccionado' : 'Selecciona un archivo'}
                        </div>
                        <div className={`flex-grow file:px-5 file:py-3 ml-5 text-black ${selectedFile || namePDF ? 'dark:text-white text-sky-600' : 'text-bodydark dark:text-zinc-300'}`}>
                            {selectedFile?.name || namePDF || 'Selecciona un documento'}
                        </div>
                    </div>

                    {/* Error */}
                    <input type="hidden" {...register(name, { required })} />
                    {error && (
                        <p className="mt-3 text-red-500 text-sm">
                            {error.message}
                        </p>
                    )}

                    {/* Boton eliminar */}
                    <div className="flex justify-end gap-4.5 h-full mt-5.5">
                        <button
                            className="flex justify-center rounded bg-red px-4 py-1 font-medium text-gray hover:bg-opacity-90"
                            onClick={handleDelete}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};