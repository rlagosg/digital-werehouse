
interface Props {
    year?: number
}

export const SearchYearInput = ({ year = 2023 }: Props ) => {
    return(
        <>
        <form className="mr-5">
            <div className="flex h-full">  

                <div id="dropdown-button" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 h-full" >Año 
                </div>

                <div className="relative w-full h-full">
                    <input type="number" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 h-full" placeholder="año del archivador" required  style={{borderLeft: 'none', minWidth: 168}}/>            
                </div>

            </div>
        </form>
        </>
    )
}