import Link from "next/link";
import { IconType } from "react-icons";

interface Props {
    nameItem   : string;
    value?     : string | null;
    icon       : IconType;
    isLoading? : boolean
    href?      : string;
}

export const VoucherItemCard = ({ value = '', nameItem, icon: Icon, isLoading = false, href='' }: Props) => {

    return (

        <div className="relative flex flex-grow !flex-row items-center rounded-[10px] border-[1px]  shadow-xl bg-white dark:border-strokedark dark:bg-boxdark">

            <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="bg-gray  dark:bg-meta-4 rounded-full p-3 ">
                    <span className="flex items-center ">
                        {Icon && <Icon size={24}/>}
                    </span>
                </div>                
            </div>
            
            <div className="h-auto ml-4 flex w-auto flex-col justify-center py-2 pr-2 ">
                <p className="font-dm text-sm font-medium ">{nameItem}</p>
                {
                    (isLoading || !value) ? (
                        <h4 className="bg-gray-200 animate-pulse text-sm sm:text-base font-bold  ">&nbsp;</h4>
                    ) : (
                    value !== null && (
                        href === '' ? (
                            <h4 className="text-sm sm:text-base font-bold text-black dark:text-white">{value}</h4>
                        ):(
                            <Link href = {href} className="font-bold hover:underline">
                                <h4 className="text-sm sm:text-base font-bold">{value}</h4>
                            </Link>
                        )
                    ))
                }
            </div>
        </div>
    );
}