import { FolderPaginationOptions } from '@/actions';
import { create } from 'zustand';

interface State extends FolderPaginationOptions {
    setPage       : (page: number)       => void;
    setTake       : (take: number)       => void;
    setName       : (name: string)     => void;
    setStartYear  : (startYear: number)  => void;
    setEndYear    : (endYear: number)    => void;
    setStartMonth : (startMonth: number) => void;
    setEndMonth   : (endMonth: number)   => void;
    setStartRange : (startRange: number) => void;
    setEndRange   : (endRange: number)   => void;

    Url           : string;
    buildUrl      : (basePath: string) => string;

    resetOptions  : () => void;
}

const seedState = {
    page         : 1,
    take         : 16,
    name         : "",
    startYear    : 0,
    endYear      : 0,
    startMonth   : 0,
    endMonth     : 0,
    startRange   : 0,
    endRange     : 0,

    Url          : ''
}

export const useSaveInputsFolders = create<State>()((set) => ({

    ...seedState,

    setPage       : (page)       => set({ page }),
    setTake       : (take)       => set({ take }),
    setName       : (name)       => set({ name }),
    setStartYear  : (startYear)  => set({ startYear }),
    setEndYear    : (endYear)    => set({ endYear }),
    setStartMonth : (startMonth) => set({ startMonth }),
    setEndMonth   : (endMonth)   => set({ endMonth }),
    setStartRange : (startRange) => set({ startRange }),
    setEndRange   : (endRange)   => set({ endRange }),

    buildUrl: (basePath: string) => {

        const params: string[] = [];
        let url = '';

        set((state) => {
            
            if (state.name) params.push(`name=${encodeURIComponent(state.name)}`);
            if (state.startYear  !== 0) params.push(`startYear=${state.startYear}`);
            if (state.endYear    !== 0) params.push(`endYear=${state.endYear}`);
            if (state.startMonth !== 0) params.push(`startMonth=${state.startMonth}`);
            if (state.endMonth   !== 0) params.push(`endMonth=${state.endMonth}`);
            if (state.startRange !== 0) params.push(`startRange=${state.startRange}`);
            if (state.endRange   !== 0) params.push(`endRange=${state.endRange}`);

            url = `${basePath}?${params.join('&')}`
            return { Url: url}
        })

        return url;    
    },

    resetOptions: () => { set(() => ({ ...seedState })) }

}));

