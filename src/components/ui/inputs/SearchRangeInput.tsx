import { Input } from "antd";
import { useState } from "react";
import { TittleInput } from "./title/TittleInput";


export const SearchRangeInput = ( ) => {

    const [searchValue, setSearchValue] = useState<any>(''); 

    const onchangue = () => {
      console.log(searchValue);
    }

    return(
        <div className="w-full">
        <form className="h-full">
          <div className="flex h-full">  
            <TittleInput tittle="Rango"/>     
            <div style={{borderLeft: 'none'}} className="relative w-full text-sm text-gray-900 rounded-e-lg border border-red-300 ">
              <div className="flex h-full">
                <Input
                  type="number"
                  placeholder="Mínimo"
                  value={searchValue[0]}
                  onChange={(e) => { setSearchValue([Number(e.target.value), searchValue[1]]); onchangue(); }}
                  min={0}
                  className="h-full"
                  style={{ borderRadius: '0', borderBottomLeftRadius: '0', minWidth: '84px'}}
                />
                <Input
                  type="number"
                  placeholder="Máximo"
                  value={searchValue[1]}
                  onChange={(e) => { setSearchValue([searchValue[0], Number(e.target.value)]); onchangue(); }}
                  min={0}
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