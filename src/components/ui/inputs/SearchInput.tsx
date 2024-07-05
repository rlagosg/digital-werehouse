'use client'

import { usePathname, useRouter } from 'next/navigation';
import { HTMLInputTypeAttribute } from 'react';
import { IconSearch } from '../Icons/IconSearch';

interface Props {
  textInput?: string;
  value     : string;
  onChange  : (value: string) => void;
  onSearch  : (basePath: string) => string;
  type? : HTMLInputTypeAttribute | undefined;
}

export const SearchInput = ({textInput = 'Busca', value, onChange, onSearch, type = ''}:Props) => {

  
  const pathname = usePathname();
  const router = useRouter(); 

  const onSearchTerm = () => {
    router.push(onSearch(pathname));
  }

  return (
    <>      
      <div className="relative mb-5 flex items-center ">
        <div className="flex items-center bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none rounded-lg overflow-hidden px-4 py-5 justify-between w-full shadow-md border-[1px] relative">
          <IconSearch className='absolute left-0 top-1/2 -translate-y-1/2 ml-4'/>
          <input
            value={value}
            placeholder={`${textInput}`}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? onSearchTerm() : null}
            className="no-spinners text-base text-gray-700 flex-grow outline-none px-2 focus ml-5 bg-transparent font-medium focus:outline-none xl:w-125" type={type}
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
    </>
  );
};
