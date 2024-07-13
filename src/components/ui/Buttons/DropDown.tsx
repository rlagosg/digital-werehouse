'use client'

import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message } from 'antd';
import { useRouter } from 'next/navigation';

interface Props{
  url         : string;
  onDelete?() : () => void;
}

export const DropDown = ({ url, onDelete }:Props) => {

      const router = useRouter();

      const handleEditClick = () => {
          router.push(url); 
      };

      const handleDeleteClick = () => {
        message.info('Delete clicked.');
        console.log('Delete clicked');
      };

      const handleMenuClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
          case '1':
            handleEditClick();
            break;
          case '2':
            handleDeleteClick();
            break;
          default:
            break;
        }
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
        <Dropdown menu={menuProps} className='rounded-2xl bg-white shadow-default '>
            <Button 
                className='relative flex h-8 w-1 items-center justify-center rounded-full border-[0.5px] 
                border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white '
            >
                <EllipsisOutlined style={{ fontSize: '20px'}} />
            </Button>
        </Dropdown>
      </div>
    )
}