'use client'

import { SearchInput, SearchRangeInput, SearchRangeMothInput, SearchRangeYearInput } from "@/components";
import { useSaveInputsVouchers } from "@/storage";

export const VouchersSearchInpus = () => {

    const { 
        setFolder,     buildUrl,    folder, 
        setStartYear,  setEndYear,  startYear, endYear,
        setStartMonth, setEndMonth, startMonth, endMonth,
        setStartRange, setEndRange, startRange, endRange
    } = useSaveInputsVouchers();

    return(
        <>
            <SearchInput 
                textInput="Busca archivador" 
                value={folder || ''} 
                onChange={setFolder} 
                onSearch={buildUrl}
            />

            <div className="flex flex-col md:flex-row bg-re max-h-8 mb-30 md:mb-8 ">
                
                <div className="flex-1 flex md:mr-4 mb-2 md:mb-0">
                    <SearchRangeYearInput
                        startYear    = {startYear}
                        setStartYear = {setStartYear}
                        endYear      = {endYear}
                        setEndYear   = {setEndYear}
                    />
                </div>

                <div className="flex-1 flex md:mr-4 mb-2 md:mb-0">
                    <SearchRangeMothInput
                        startMonth    = {startMonth}
                        setStartMonth = {setStartMonth}
                        endMonth      = {endMonth}
                        setEndMonth   = {setEndMonth}
                    />
                </div>

                <div className="flex-1 flex mb-2 md:mb-0">
                    <SearchRangeInput
                        startRange    = {startRange}
                        setStartRange = {setStartRange}
                        endRange      = {endRange}
                        setEndRange   = {setEndRange}
                    />
                </div>
            </div> 
        </>
    )
}