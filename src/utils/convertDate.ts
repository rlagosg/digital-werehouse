import dayjs from "dayjs";


/**
 * Conversion de fecha a un string con formato personalizado
 * por defecto es: 'DD/MM/YYYY'
 * incluye siempre los dias: DD, mes: MM, anio: YYYY
 */
export const convertDateToMyFormat = ( date: Date, format: string = 'DD/MM/YYYY') => {
    return dayjs(date).format(format);
}


/**
 * Convierte una cadena de fecha de formato personalizado 'DD/MM/YYYY' a 'YYYY-MM-DD'
 * compatible para un calendario.
*/
export const convertMyStringToCalendar = (date: string) => {
    const formattedDate = date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1');
    return dayjs(formattedDate).format('YYYY-MM-DD');
};

/**
 * Convierte una cadena de fecha de formato personalizado 'DD/MM/YYYY' a Date
*/
export const convertMyStringToDate = (date: string) => {
    return convertStringCalendarToDate( convertMyStringToCalendar(date) );
};

/**
 * Conversion de fecha a un string con formato para Calendario 'YYYY-MM-DD'
 */
export const convertDateToCalendar = ( date: Date ) => {
    return dayjs(date).format('YYYY-MM-DD');
}


/**
 * Convierte una cadena de fecha de formato 'YYYY-MM-DD' a Date
 */
export const convertStringCalendarToDate = ( date: string ) => {
    return dayjs(date).toDate();
}

/**
 * Retorna el mes a partir de un numero
 */
export const converNumberToMonth = ( month: number) => {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[month - 1];
}