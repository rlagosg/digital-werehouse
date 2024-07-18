'use client'

import type { SelectProps } from 'antd';
import { Select, Space } from 'antd';
 // Ajusta la ruta al hook de tu tema

interface Props {
  id: string;
  initialSelected: string; // Cadena separada por comas de valores inicialmente seleccionados
  onChange: (value: string[]) => void
}

export const MultiSelect = ({ id, initialSelected, onChange }: Props) => {
  
  const options: SelectProps['options'] = [];

  for (let i = 1; i < 1000; i++) {
    options.push({
      label: i,
      value: i,
    });
  }

  const handleChange = (value: string[]) => {
    console.log(`Seleccionado: ${value}`);
  };

  return (
    <div className="relative z-50">
      <div className="flex flex-col items-center">
        <Space style={{ width: '100%' }} direction="vertical">
          <Select
            mode="multiple"
            allowClear
            style={{
              width: '100%',
            }}
            placeholder="Selecciona los proyectos"
            defaultValue={ initialSelected.length === 0 ? [] : initialSelected.split(',') }
            onChange={onChange}
            options={options}
          />
        </Space>
      </div>
    </div>
  );
};