import { BsFiletypePdf } from 'react-icons/bs';

export const PDFNotFounf = () => {

    return(
        <div className="p-5">
            <div className="bg-gray  dark:bg-meta-4 rounded-full p-3 ">
                <span className="flex items-center ">
                    <BsFiletypePdf size={24}/>
                    <h1 className="ml-5">No se encontro el documento PDF</h1>
                </span>
            </div>
        </div>
    )
}