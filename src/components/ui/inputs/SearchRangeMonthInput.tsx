import { useSaveInputsFolders } from "@/storage";
import { Select } from "antd";
import { TittleInput } from "./title/TittleInput";

type range = 'desde' | 'hasta';

export const SearchRangeMothInput = ( ) => {

  const { setStartMonth, setEndMonth,  startMonth, endMonth } = useSaveInputsFolders();    
  
    const onChangeStartMonth = (month: string) => {
      setStartMonth(Number(month));
    };
  
    const onChangeEndMonth = (month: string) => {
      setEndMonth(Number(month));      
    };

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

  const findMonth = (month: number = 0, defaultText: string) => {
    return month === 0 ? defaultText : months.find(m => m.value === month)?.month || defaultText;
  };

  const { Option } = Select;  

    return(
        <div className="w-full">
        <form className="h-full">
          <div className="flex h-full">  
            <TittleInput tittle="Mes"/>     
            <div style={{borderLeft: 'none'}} className="relative w-full text-sm text-gray-900 rounded-e-lg border border-red-300 ">
              <div className="flex w-full h-full">
              <Select
                     defaultValue={findMonth(startMonth, "desde")}
                    style={{ minWidth: '84px'}}
                    onChange={onChangeStartMonth}
                    className="custom-select-between h-full w-full"
                >
                    <Option value={0}>desde</Option>
                    {months.map(month => (
                        <Option key={month.value} value={month.value}>
                            {month.month}
                        </Option>
                    ))}
                </Select>
                <Select
                    defaultValue={findMonth(endMonth, "hasta")}
                    style={{ minWidth: '84px'}}
                    onChange={onChangeEndMonth}
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