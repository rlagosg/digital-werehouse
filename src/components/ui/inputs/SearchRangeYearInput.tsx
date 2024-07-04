
'use client'

import { ConfigProvider, DatePicker } from 'antd';
import esES from 'antd/lib/locale/es_ES';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { TittleInput } from "./title/TittleInput";
const { RangePicker } = DatePicker;

interface Props {
  startYear: number | undefined;
  setStartYear: (endYear: number) => void;
  endYear: number | undefined;
  setEndYear: (endYear: number) => void;
}


export const SearchRangeYearInput = ({endYear, setEndYear, startYear, setStartYear}:Props) => {

  //inicializamos el valor de las fechas
  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null] | null>([
    startYear ? dayjs(startYear.toString()) : null,
    endYear ? dayjs(endYear.toString()) : null
  ]);

  const onChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      setStartYear(Number(dateStrings[0]));
      setEndYear(Number(dateStrings[1]));
      //console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
      setStartYear(0);
      setEndYear(0);
      //console.log('Clear');
    }
  };

  //actualizamos cada que cambien
  useEffect(() => {
    setDates([
      startYear ? dayjs(startYear.toString()) : null,
      endYear ? dayjs(endYear.toString()) : null
    ]);
  }, [startYear, endYear]);
       
    return(
        <div className="w-full">
        <form className="h-full ">
          <div className="flex h-full ">  
           <TittleInput tittle="Año"/>
     
            <div style={{borderLeft: 'none'}} className="relative w-full text-sm text-gray-900 rounded-e-lg border border-red-300 ">
              <div className="flex h-full">

                <ConfigProvider locale={esES}>
                  <RangePicker
                    value={dates}  
                    picker='year'
                    placeholder={["Año inicial","Año final"]}
                    style={{ width: '100%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    onChange={onChange}
                    className="custom-select h-full"
                  />
                </ConfigProvider>

              </div>
            </div>
          </div>
        </form>
        </div>
      );
}


{/* viejos inputs, en lugar de inputs de ant 
  <Input
    type="number"
    placeholder="desde"                  
    value={startYear}
    onChange={(e) => { setStartYear(Number(e.target.value)) }}
    min={0}
    className="h-full w-full bg-white dark:bg-boxdark dark:drop-shadow-none text-black dark:text-white"
    style={{ borderRadius: '0', borderBottomLeftRadius: '0', minWidth: '84px'}}
  />
  <Input
    type="number"
    placeholder="hasta"
    value={endYear}
    onChange={(e) => { setEndYear(Number(e.target.value)) }}
    min={0}
    className="text-sm text-gray-900 rounded-e-lg border border-red-300 w-full h-full bg-white dark:bg-boxdark dark:drop-shadow-none text-black dark:text-white"
    style={{ borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem', minWidth: '84px', borderBottomLeftRadius: '0', borderTopLeftRadius: '0' }}
  /> 
*/}