
/**
 * Obtiene la subcadena que sigue al primer separador en una cadena dada.
 * @param {string} cadena La cadena de entrada.
 * @param {string} separador El separador a buscar.
 * @returns {string} La subcadena después del primer separador encontrado, o la cadena original si el separador no está presente.
 */

export const getStringAfterSeparator = (inputString: string, separator: string) => {
    // Encontrar la posición del separador
    const separatorIndex = inputString.indexOf(separator);
    
    // Si no se encuentra el separador, devolver la cadena original
    if (separatorIndex === -1) {
        return inputString;
    } else {
        // Devolver la subcadena después del separador
        return inputString.substring(separatorIndex + 1);
    }
}

/**
 * Obtiene la subcadena que esta antes al separador en una cadena dada.
 * @param {string} cadena La cadena de entrada.
 * @param {string} separador El separador a buscar.
 * @returns {string} La subcadena antes del separador encontrado, o la cadena original si el separador no está presente.
 */
export const getStringBeforeSeparator = (inputString: string, separator: string) => {
    // Encontrar la posición del separador
    const separatorIndex: number = inputString.indexOf(separator);
    
    // Si no se encuentra el separador, devolver la cadena original
    if (separatorIndex === -1) {
        return inputString;
    } else {
        // Devolver la subcadena antes del separador
        return inputString.substring(0, separatorIndex);
    }
}


/**
 * Devuelve las subcadenas antes y después del separador en un string.
 * @param {string} inputString La cadena de entrada.
 * @param {string} separator El separador a buscar.
 * @returns {{ before: string, after: string }} Un string con las subcadenas antes y después del separador.
 */
export const getStringBeforeAndAfterSeparator = (inputString: string, separator: string): { before: string, after: string } => {
    // Encontrar la posición del separador
    const separatorIndex: number = inputString.indexOf(separator);
    
    // Si no se encuentra el separador, devolver la cadena original para ambas partes
    if (separatorIndex === -1) {
        return { before: inputString, after: inputString };
    } else {
        // Devolver las subcadenas antes y después del separador
        const before = inputString.substring(0, separatorIndex);
        const after = inputString.substring(separatorIndex + 1);
        return { before, after };
    }
}