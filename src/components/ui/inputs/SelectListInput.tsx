'use client'

import { SimpleItem } from '@/interfaces';
import { ConfigProvider, Select } from 'antd';
import esES from 'antd/lib/locale/es_ES';

interface Props {
    title? : string;
    placeholder? : string;
    list      : SimpleItem[]
    value     : string;
    onChange  : (value: string) => void;
}

export const SelectListInput = ({ list, title = 'Lista', placeholder = 'Selecciona', value, onChange }:Props) => {

    return(      
        <div className='flex w-full '>
        <div 
            id="dropdown-button" 
            className="dropdown-button w-19 flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        >
            {title}
        </div>

        <div className="relative w-full">
            <div className="text-sm text-gray-900 rounded-e-lg border border-red-300  h-full" style={{borderLeft: 'none'}}>            
              <ConfigProvider locale={esES}>
              <Select
                    showSearch
                    value={value}
                    style={{width: '100%'}}
                    placeholder={placeholder}
                    optionFilterProp="label"
                    onChange={onChange}                    
                    options={[{value:"", label:'Ninguno'}, ...list]}
                    className='custom-select h-full w-full'
                />
              </ConfigProvider>
            </div>
        </div>
        
      </div>
    )
}