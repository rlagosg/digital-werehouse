'use client'
import { ConfigProvider, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

import esES from 'antd/lib/locale/es_ES';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

interface Props {
  startDate    : string | undefined;
  endDate      : string | undefined;
  
  setStartDate : (startDate: string) => void;
  setEndDate   : (endDate  : string) => void;
}

export const SearchRangeDateInput = ({ startDate,  endDate, setStartDate, setEndDate  }:Props ) => {
  
  //inicializamos el valor de las fechas
  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null] | null>([
    startDate ? dayjs(startDate) : null,
    endDate ? dayjs(endDate) : null
  ]);

  //actualizamos cada que cambien
  useEffect(() => {
    setDates([
      startDate ? dayjs(startDate) : null,
      endDate ? dayjs(endDate) : null
    ]);
  }, [startDate, endDate]);

  //actualizamos variables globales
  const onChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
      //console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
      setStartDate("");
      setEndDate("");
      //console.log('Clear');
    }
  };

    return (
      <div className='flex w-full'>
        <div 
            id="dropdown-button" 
            className="dropdown-button flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        >
            Fechas
        </div>

        <div className="relative w-full">
            <div className="text-sm text-gray-900 rounded-e-lg border border-red-300  h-full" style={{borderLeft: 'none'}}>            
              <ConfigProvider locale={esES}>
                <RangePicker
                  value={dates}  
                  picker='date'
                  style={{ width: '100%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                  onChange={onChange}
                  className="custom-select h-full"
                />
              </ConfigProvider>
            </div>
        </div>
      </div>
    );
}