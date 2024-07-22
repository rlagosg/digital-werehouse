import toast from 'react-hot-toast';

export const Manuelito = () => {
    return(
        <div>
            <h1>Manuelito</h1>
            <div>
            <button onClick={() => toast('Here is your toast.')}>Make me a toast</button>
            </div>
   

        </div>
    )
}