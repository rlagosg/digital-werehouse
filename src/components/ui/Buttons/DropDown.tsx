'use client'

import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message } from 'antd';
import React from 'react';

export const DropDown = () => {

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        message.info('Click on left button.');
        console.log('click left button', e);
      };
      
      const handleMenuClick: MenuProps['onClick'] = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
      };
      
      const items: MenuProps['items'] = [
        {
          label: 'editar',
          key: '1',
          icon: <EditOutlined />,
        },
        {
          label: 'eliminar',
          key: '2',
          icon: <DeleteOutlined />,
          danger: true,
        },
      ];
      
      const menuProps = {
        items,
        onClick: handleMenuClick,
      };

    return (
      <div>   
        <Dropdown menu={menuProps} className='rounded-2xl bg-white shadow-default'>
            <Button 
                className='relative flex h-8 w-1 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white'
            >
                <EllipsisOutlined style={{ fontSize: '20px'}} />
            </Button>
        </Dropdown>
      </div>
    )
}