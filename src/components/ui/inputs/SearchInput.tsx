'use client'

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Header } from '../Header';

export const SearchInput = () => {

  //const [selectedOption, setSelectedOption] = useState('usuario');
  const [searchTerm, setSearchTerm] = useState('');
  const pathname = usePathname();
  const router = useRouter()

  const url = pathname + '/?search=';

  const onSearchTerm = () => {
    router.push(url + searchTerm);
    //console.log(url + searchTerm);
  }

  return (
    <>
      <Header setSidebarOpen={()=>{}} sidebarOpen/>
      <div className="relative mb-5 flex items-center">
        <div className="flex items-center bg-white rounded-lg overflow-hidden px-4 py-5 justify-between w-full shadow-md border-[1px] relative">

          <input
            value={searchTerm}
            placeholder="Busqueda"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? onSearchTerm() : null}
            className="text-base text-gray-700 flex-grow outline-none px-2 focus:" type="text"
            />

          {/* Boton de Busqueda */}
          <div className="absolute inset-y-0 right-0 flex items-center">

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