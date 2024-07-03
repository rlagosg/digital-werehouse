'use client'

import { SearchInput, SearchRangeDateInput, SearchRangeInput } from "@/components";
import { useSaveInputsVouchers } from "@/storage";

export const VouchersSearchInpus = () => {

    const {
        search, setSearch, endDate, setEndDate, 
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
                        startRange    = {startValue}
                        setStartRange = {setStartValue}
                        endRange      = {endValue}
                        setEndRange   = {setEndValue}
                    />
                </div>

                <div className="flex-1 flex md:mr-4 mb-2 md:mb-0">
                    <SearchRangeDateInput
                        /* startMonth    = {startMonth}
                        setStartMonth = {setStartMonth}
                        endMonth      = {endMonth}
                        setEndMonth   = {setEndMonth} */
                    />
                </div>

                <div className="flex-1 flex mb-2 md:mb-0">
                {/* <SearchRangeYearInput
                        startYear    = {startYear}
                        setStartYear = {setStartYear}
                        endYear      = {endYear}
                        setEndYear   = {setEndYear}
                    /> */}
                </div>
            </div> 
        </>
    )
}