import { ConfigProvider, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

import esES from 'antd/lib/locale/es_ES';


export const SearchDateRangeInput = ( ) => {

    const onchangue = () => {
      console.log();
    }

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
              <ConfigProvider locale={esES}>
                <RangePicker            
                  style={{ width: '100%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                  onChange={() => {}}
                  className="custom-select h-full"              
                />
              </ConfigProvider>
            </div>            
        </div>
      </div>
    );
}