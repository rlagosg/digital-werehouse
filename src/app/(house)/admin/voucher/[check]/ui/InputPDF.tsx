import { useRef, useState } from "react";

interface Props {
    onSavePDF: (file: File) => void;
}

export const InputPDF = ({ onSavePDF }:Props) => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            onSavePDF(file); // Llamar a la función de guardado
        }
    };

    const handleDelete = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
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
            <div className="flex flex-col gap-5.5 p-6.5">
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
                        <div className={` w-44 items-center py-2.5 px-4 text-black text-sm text-center border border-stroke rounded-s-lg bg-sky-50 hover:bg-sky-100 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-zinc-500 dark:hover:bg-zinc-600 dark:focus:ring-gray-700 dark:text-white dark:border-form-strokedark`}>
                            {selectedFile ? 'Archivo seleccionado' : 'Selecciona un archivo'}
                        </div>
                        <div className={`flex-grow file:px-5 file:py-3 ml-5 text-black ${selectedFile ? 'dark:text-white text-sky-600' : 'text-bodydark dark:text-zinc-300'}`}>
                            {selectedFile ? selectedFile.name : 'Selecciona un documento'}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4.5 h-full">
                    <button
                        className="flex justify-center rounded bg-red px-4 py-1 font-medium text-gray hover:bg-opacity-90"
                        onClick={handleDelete}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};