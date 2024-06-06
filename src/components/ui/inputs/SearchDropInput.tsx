'use client'

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props{
    dropList:  { [key: string]: string }[];
}

import { Col, DatePicker, Input, Row, Select } from 'antd';
import { SearchMothInput } from './SearchMothInput';
import { SearchYearInput } from './SearchYearInput';

const { Option } = Select;
const { RangePicker } = DatePicker;

export const SearchDropInput = ({ dropList }:Props) => {

  const [selectedOption, setSelectedOption] = useState(dropList[0].value);
  const selectItem = dropList.find(item => item.value === selectedOption);
  
  const [searchTerm, setSearchTerm] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const url = pathname + '/?'+ selectItem!.key + '=';

  const onSearchTerm = () => {
    router.push(url + searchTerm);
  }

  //----------------------------------------

  const [searchField, setSearchField] = useState<string>(''); 
  const [searchValue, setSearchValue] = useState<any>(''); 

  const handleFieldChange = (value: string) => {
    setSearchField(value);
    setSearchValue('');
  };

  const handleSearch = () => {
    console.log('Buscar por', searchField, 'con valor', searchValue);
  };

  const renderSearchInput = () => {
    switch (searchField) {
      case 'year':
      case 'month':
      case 'firstVoucher':
      case 'lastVoucher':
        return (
          <Input
            type="number"
            value={searchValue}
            onChange={(e) => setSearchValue(Number(e.target.value))}
            placeholder={`Ingrese ${searchField}`}
            className="text-base text-gray-700 flex-grow outline-none px-2 focus ml-5" 
            
          />
        );
      case 'voucherRange':
        return (
          <Row gutter={16}>
            <Col span={12}>
              <Input
                type="number"
                placeholder="Mínimo"
                value={searchValue[0]}
                onChange={(e) => setSearchValue([Number(e.target.value), searchValue[1]])}
              />
            </Col>
            <Col span={12}>
              <Input
                type="number"
                placeholder="Máximo"
                value={searchValue[1]}
                onChange={(e) => setSearchValue([searchValue[0], Number(e.target.value)])}
              />
            </Col>
          </Row>
        );
      case 'dateRange':
        return (
          <RangePicker
            style={{ width: '100%' }}
            onChange={(dates) => setSearchValue(dates)}
          />
        );
      default:
        return (
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Ingrese ${searchField}`}
          />
        );
    }
  };
  //-----------------------------------------


  return (
    <>
      <div className="relative mb-5 flex items-center">
        <div className="flex items-center bg-white rounded-lg overflow-hidden px-4 py-5 justify-between w-full shadow-md border-[1px] relative">
          
          {/* Menú desplegable */}
          <div>
            <select
                  id="Com"
                  className="text-base bg-white text-gray-800 outline-none border-2 px-3 py-2 rounded-lg  border-pink-200 hover:border-pink-300 cursor-pointer"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  >
                  {dropList.map((item) => (
                    <option key={item.key} value={item.value}>{item.value}</option>
                  ))}
              </select>
          </div>

          <button className="absolute left-0 top-1/2 -translate-y-1/2 ml-48">
            <svg
              className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                fill=""
              />
            </svg>
          </button>
          <input
            value={searchTerm}
            placeholder="Busqueda"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? onSearchTerm() : null}
            className="text-base text-gray-700 flex-grow outline-none px-2 focus ml-5" type="text"
            />

            {/* {renderSearchInput()} */}
            

          {/* Boton de Busqueda */}
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
                onClick={ onSearchTerm }
                className="middle none center mr-3 rounded-lg border border-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-pink-800 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-dark="true"
                >
                buscar
            </button>

          </div>

        </div>
      </div>

      <>
      <div className='flex bg-'>
        <SearchYearInput />
        <SearchMothInput />
      </div>
 {/*      <div>
      <Form layout="vertical">
        <Form.Item label="Seleccione un campo de búsqueda">
          <Select
            defaultValue=""
            style={{ width: '100%' }}
            onChange={handleFieldChange}
          >
            <Option value="">Selecciona un campo</Option>
            <Option value="name">Archivador</Option>
            <Option value="year">Año</Option>
            <Option value="month">Mes</Option>
            <Option value="firstVoucher">Primer Voucher</Option>
            <Option value="lastVoucher">Último Voucher</Option>
            <Option value="voucherRange">Rango de Voucher</Option>
            <Option value="dateRange">Rango de Fechas</Option>
          </Select>
        </Form.Item>
        <Form.Item label={`Ingrese ${searchField}`}>
          {renderSearchInput()}
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSearch} block>
            Buscar
          </Button>
        </Form.Item>
      </Form>
    </div>  */}      
      </>
    </>
  );
};

