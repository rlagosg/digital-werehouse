'use client'

import { useSaveInputsFolders } from '@/storage';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { IconSearch } from '../Icons/IconSearch';
import { SearchRangeInput } from './SearchRangeInput';
import { SearchRangeMothInput } from './SearchRangeMonthInput';
import { SearchRangeYearInput } from './SearchRangeYearInput';


export const SearchInput = () => {

  const { setFolder, buildUrl, folder, resetOptions } = useSaveInputsFolders();
  const pathname = usePathname();
  const router = useRouter()

  useEffect(() => {
    //resetOptions();
    //router.push(pathname);
  }, [])
  

  const onSearchTerm = () => {
    router.push(buildUrl(pathname));
  }

  return (
    <>      
      <div className="relative mb-5 flex items-center ">
        <div className="flex items-center bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none rounded-lg overflow-hidden px-4 py-5 justify-between w-full shadow-md border-[1px] relative">
          <IconSearch className='absolute left-0 top-1/2 -translate-y-1/2 ml-4'/>
          <input
            value={folder}
            placeholder="Busca archivador"
            onChange={(e) => setFolder(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? onSearchTerm() : null}
            className="no-spinners text-base text-gray-700 flex-grow outline-none px-2 focus ml-5 bg-transparent font-medium focus:outline-none xl:w-125" type="number"
            maxLength={20}
            min={0}   
          />

          {/* Boton de Busqueda */}
          <div className="absolute inset-y-0 right-0 flex items-center">

            <button
                onClick={ onSearchTerm }
                className="middle none center mr-3 rounded-lg border border-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-pink-800 dark:text-pink-100 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none  bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none"
                data-ripple-dark="true"
                >
                buscar
            </button>

          </div>

        </div>
      </div>
      <>
      
      <div className="flex flex-col md:flex-row bg-re max-h-8 mb-30 md:mb-8 ">
        <div className="flex-1 flex md:mr-4 mb-2 md:mb-0">
          <SearchRangeYearInput/>
        </div>
        <div className="flex-1 flex md:mr-4 mb-2 md:mb-0">
          <SearchRangeMothInput />
        </div>
        <div className="flex-1 flex mb-2 md:mb-0">
          <SearchRangeInput />
        </div>
      </div>   
      
      </>
    </>
  );
};


{/* Menú desplegable */}
{/* <select
    id="Com"
    className="text-base bg-white text-gray-800 outline-none border-2 px-10 py-2 rounded-lg  border-pink-200 hover:border-pink-300 cursor-pointer"
    value={selectedOption}
    onChange={(e) => setSelectedOption(e.target.value)}
>
    <option value="correo">correo</option>
    <option value="nombre">nombre</option>
    <option value="usuario">usuario</option>
</select> */}