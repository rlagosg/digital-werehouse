'use client'

import { ItemList } from '@/interfaces';
import { Select } from 'antd';

interface Props {
    title?       : string;
    placeholder? : string;
    list         : ItemList[]
    value        : string;
    onChange     : (value: string) => void;
    height?      : number;
    className?   : string;
}

export const SelectList = ({ list, title = 'Lista', placeholder = 'Selecciona', value, onChange, height = 44, className }:Props) => {

    return(      
        
            <div className="relative w-full">
                <Select
                    showSearch
                    value={value}
                    style={{width: '100%', height}}
                    placeholder={placeholder}
                    optionFilterProp="label"
                    onChange={onChange}                    
                    options={[{value:"", label:'-'}, ...list]}
                    className={className}
                />
            </div>
      
    )
}