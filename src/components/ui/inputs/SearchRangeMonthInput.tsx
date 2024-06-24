import { useSaveInputsFolders } from "@/storage";
import { findMonth, months } from "@/utils";
import { Select } from "antd";
import { TittleInput } from "./title/TittleInput";

export const SearchRangeMothInput = ( ) => {

  const { setStartMonth, setEndMonth,  startMonth, endMonth } = useSaveInputsFolders();    

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
                    onChange={(e) => setStartMonth(Number(e))}
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
                    onChange={(e) => setEndMonth(Number(e))}
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