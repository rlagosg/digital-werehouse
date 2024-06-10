import { Select } from "antd";
import { useState } from "react";
import { TittleInput } from "./title/TittleInput";

export const SearchRangeMothInput = ( ) => {

  const months: { value: number, month: string }[] = [
    { value: 1,  month: 'Enero' },
    { value: 2,  month: 'Febrero' },
    { value: 3,  month: 'Marzo' },
    { value: 4,  month: 'Abril' },
    { value: 5,  month: 'Mayo' },
    { value: 6,  month: 'Junio' },
    { value: 7,  month: 'Julio' },
    { value: 8,  month: 'Agosto' },
    { value: 9,  month: 'Septiembre' },
    { value: 10, month: 'Octubre' },
    { value: 11, month: 'Noviembre' },
    { value: 12, month: 'Diciembre' },
]

const [searchField, setSearchField] = useState<string>(''); 
const [searchValue, setSearchValue] = useState<any>(''); 

const [selectedOption, setSelectedOption] = useState();
const { Option } = Select;

const handleFieldChange = (value: string) => {
setSearchField(value);
setSearchValue('');
console.log(value);

};

    

    const onchangue = () => {
      console.log(searchValue);
    }

    return(
        <div className="w-full">
        <form className="h-full">
          <div className="flex h-full">  
            <TittleInput tittle="Mes"/>     
            <div style={{borderLeft: 'none'}} className="relative w-full text-sm text-gray-900 rounded-e-lg border border-red-300 ">
              <div className="flex w-full h-full">
              <Select
                    defaultValue=""
                    style={{ minWidth: '84px'}}
                    onChange={handleFieldChange}
                    className="custom-select-between h-full w-full"
                >
                    <Option value="">desde</Option>
                    {months.map(month => (
                        <Option key={month.value} value={month.value}>
                            {month.month}
                        </Option>
                    ))}
                </Select>
                <Select
                    defaultValue=""
                    style={{ minWidth: '84px'}}
                    onChange={handleFieldChange}
                    className="custom-select h-full w-full"
                >
                    <Option value="">hasta</Option>
                    {months.map(month => (
                        <Option key={month.value + 1} value={month.value}>
                            {month.month}
                        </Option>
                    ))}
                </Select>
              </div>
            </div>
          </div>
        </form>
        </div>
      );
}