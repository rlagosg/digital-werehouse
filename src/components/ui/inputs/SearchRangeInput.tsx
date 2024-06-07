import { Input } from "antd";
import { useState } from "react";


export const SearchRangeInput = ( ) => {

    const [searchValue, setSearchValue] = useState<any>(''); 

    const onchangue = () => {
      console.log(searchValue);
    }

    return(
        <div className="mr-5 ">
        <form className="h-full">
          <div className="flex h-full">  
           <div id="dropdown-button" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
              Rango
            </div>
     
            <div style={{borderLeft: 'none'}} className="relative w-full text-sm text-gray-900 rounded-e-lg border border-red-300 ">
              <div className="flex h-full">
                <Input
                  type="number"
                  placeholder="Mínimo"
                  value={searchValue[0]}
                  onChange={(e) => { setSearchValue([Number(e.target.value), searchValue[1]]); onchangue(); }}
                  className="h-full"
                  style={{ borderRadius: '0', borderBottomLeftRadius: '0', minWidth: '84px'}}
                />
                <Input
                  type="number"
                  placeholder="Máximo"
                  value={searchValue[1]}
                  onChange={(e) => { setSearchValue([searchValue[0], Number(e.target.value)]); onchangue(); }}
                  className="text-sm text-gray-900 rounded-e-lg border border-red-300  h-full"
                  style={{ borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem', minWidth: '84px', borderBottomLeftRadius: '0', borderTopLeftRadius: '0' }}
                />
              </div>
            </div>
          </div>
        </form>
        </div>
      );
}