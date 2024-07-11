'use client'

import { SearchInput, SearchRangeDateInput, SearchRangeInput, SelectListInput } from "@/components";
import { useSaveInputsVouchers } from "@/storage";

interface Props{
    banks: {
        value: string;
        label: string;
    }[]
}

export const VouchersSearchInpus = ({ banks }:Props) => {

    const {
        search, setSearch, endDate, setEndDate, bank, setBank,
        startDate, setStartDate, startValue, setStartValue,
        endValue, setEndValue, buildUrl
    } = useSaveInputsVouchers();

    return(
        <>
            <SearchInput 
                textInput="Buscador" 
                value={search || ''} 
                onChange={setSearch} 
                onSearch={buildUrl}
            />

            <div className="flex flex-col md:flex-row bg-re max-h-8 mb-30 md:mb-8 ">
                
                <div className="flex-1 flex md:mr-4 mb-2 md:mb-0">                   
                    <SearchRangeInput
                        title="Valor"
                        startRange    = {startValue}
                        setStartRange = {setStartValue}
                        endRange      = {endValue}
                        setEndRange   = {setEndValue}
                    />
                </div>

                <div className="flex-1 flex md:mr-4 mb-2 md:mb-0">
                    <SearchRangeDateInput
                        startDate    = {startDate}
                        setStartDate = {setStartDate}
                        endDate      = {endDate}
                        setEndDate   = {setEndDate}
                    />
                </div>

                <div className="flex-1 flex mb-2 md:mb-0">
                    <SelectListInput 
                        title="Banco" 
                        placeholder="Selecciona un Banco"
                        list={banks} 
                        value={bank || ''}
                        onChange={setBank}
                    />
                </div>
            </div> 
        </>
    )
}