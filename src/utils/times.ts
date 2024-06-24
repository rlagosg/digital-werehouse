export const months: { value: number, month: string }[] = [
    { value: 1,  month: 'Enero' },
    { value: 2,  month: 'Febrero' },
    { value: 3,  month: 'Marzo' },
    { value: 4,  month: 'Abril' },
    { value: 5,  month: 'Mayo' },
    { value: 6,  month: 'Junio' },
    { value: 7,  month: 'Julio' },
    { value: 8,  month: 'Agosto' },
    { value: 9,  month: 'Septiembre' },
    { value: 10, month: 'Octubre' },
    { value: 11, month: 'Noviembre' },
    { value: 12, month: 'Diciembre' },
]

export const findMonth = (month: number = 0, defaultText: string) => {
    return month === 0 ? defaultText : months.find(m => m.value === month)?.month || defaultText;
};