'use client'

import toast, { Toaster } from 'react-hot-toast';



export const SuccessNotification = () => {

    const notify = () => toast('Here is your toast.');

  return (
    <Toaster
        position="top-center"
        reverseOrder={false}
    />
 );
};