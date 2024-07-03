import { VouchersPaginationOptions } from '@/actions/vouchers/get-vouchers';
import { create } from 'zustand';

interface State extends VouchersPaginationOptions {
    setPage       : (page: number)       => void;
    setTake       : (take: number)       => void;
    setSearch     : (search: string)     => void;
    setStartDate  : (startDate: string)  => void;
    setEndDate    : (endDate: string)    => void;
    setStartValue : (startValue: number) => void;
    setEndValue   : (endValue: number)   => void;

    Url           : string;
    buildUrl      : (basePath: string) => string;

    resetOptions  : () => void;
}

const seedState = {
    page         : 1,
    take         : 16,
    search       : "",
    startDate    : "",
    endDate      : "",
    startValue   : 0,
    endValue     : 0,

    Url          : ''
}

export const useSaveInputsVouchers = create<State>()((set) => ({

    ...seedState,

    setPage       : (page)       => set({ page }),
    setTake       : (take)       => set({ take }),
    setSearch     : (search)     => set({ search }),
    setStartDate  : (startDate)  => set({ startDate }),
    setEndDate    : (endDate)    => set({ endDate }),
    setStartValue : (startValue) => set({ startValue }),
    setEndValue   : (endValue)   => set({ endValue }),

    buildUrl: (basePath: string) => {

        const params: string[] = [];
        let url = '';

        set((state) => {
            
            if (state.search) params.push(`search=${encodeURIComponent(state.search)}`);
            if (state.startDate  !== "") params.push(`startDate=${state.startDate}`);
            if (state.endDate    !== "") params.push(`endDate=${state.endDate}`);
            if (state.startValue !== 0) params.push(`startValue=${state.startValue}`);
            if (state.endValue   !== 0) params.push(`endValue=${state.endValue}`);

            url = `${basePath}?${params.join('&')}`
            return { Url: url}
        })

        return url;    
    },

    resetOptions: () => { set(() => ({ ...seedState })) }

}));

