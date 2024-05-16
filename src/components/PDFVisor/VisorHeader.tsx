import { BsFiletypePdf } from 'react-icons/bs';

interface Props{
    pages: number | undefined;
    handleViewFullPDF: () => void;
}

export const VisorHeader = ({ pages, handleViewFullPDF }:Props) => {
      
    return(
        <div 
            className={ 'relative flex flex-grow !flex-row items-center rounded-lg shadow-3 border-[1px] bg-white dark:border-strokedark dark:bg-boxdark'}
            style={{ height: 55 }}
        >
            <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="bg-gray  dark:bg-meta-4 rounded-full p-3 ">
                    <span className="flex items-center ">
                        <BsFiletypePdf size={24}/>
                    </span>
                </div> 

                <div className="h-auto ml-4 w-auto ">
                    <h4 className="text-base sm:text-lg font-bold text-black dark:text-white">{pages}</h4>
                </div>       
                <p className="font-dm text-sm font-medium ">&nbsp; Paginas</p>                
            </div>
            
        <button onClick={handleViewFullPDF} className="ml-auto mr-5 text-sm font-semibold dark:text-white hover:underline">
                ver completo
        </button>

      </div>
    )
}