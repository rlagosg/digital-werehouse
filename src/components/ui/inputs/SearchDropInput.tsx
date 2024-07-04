'use client'

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props{
    dropList:  { [key: string]: string }[];
}

import { IconSearch } from '../Icons/IconSearch';



export const SearchDropInput = ({ dropList }:Props) => {

  const [selectedOption, setSelectedOption] = useState(dropList[0].value);
  const selectItem = dropList.find(item => item.value === selectedOption);
  
  const [searchTerm, setSearchTerm] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const url = pathname + '/?'+ selectItem!.key + '=';

  const onSearchTerm = () => {
    router.push(url + searchTerm);
  }

  return (
    <>
      <div className="relative mb-5 flex items-center">
        <div className="flex items-center bg-white rounded-lg overflow-hidden px-4 py-5 justify-between w-full shadow-md border-[1px] relative">      

          <IconSearch className='absolute left-0 top-1/2 -translate-y-1/2 ml-4'/>
          <input
            value={searchTerm}
            placeholder="Busqueda"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? onSearchTerm() : null}
            className="text-base text-gray-700 flex-grow outline-none px-2 focus ml-5" type="text"
            />            

          {/* Boton de Busqueda */}
          <div className="absolute inset-y-0 right-0 flex items-center">

            {/* Menú desplegable */}
            <select
                id="Com"
                className="text-base bg-white text-gray-800 outline-none border-2 px-3 py-2 rounded-lg  border-pink-200 hover:border-pink-300 cursor-pointer"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
            >
                {dropList.map((item) => (
                    <option key={item.key} value={item.value}>{item.value}</option>
                ))}
            </select>

            <button
              onClick={ onSearchTerm }
              className="middle none center mr-3 rounded-lg border border-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-pink-800 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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

