
import { Select } from 'antd';
import { useState } from 'react';

export const SearchMothInput = () => {

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

  return (
    <div className='flex mr-5'>
        <div 
            id="dropdown-button" 
            className="dropdown-button flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        >
            Mes
        </div>

        <div className="relative w-full">
            <div className="text-sm text-gray-900 rounded-e-lg border border-red-300  h-full" style={{borderLeft: 'none'}}>            
                <Select
                    defaultValue=""
                    style={{ minWidth: 168}}
                    onChange={handleFieldChange}
                    className="custom-select h-full"
                >
                    <Option value="">filtro por mes</Option>
                    {months.map(month => (
                        <Option key={month.value} value={month.value}>
                            {month.month}
                        </Option>
                    ))}
                </Select>
            </div>            
        </div>
    </div>
  );
}