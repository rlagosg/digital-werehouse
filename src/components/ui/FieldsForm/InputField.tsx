import { UseFormRegister } from 'react-hook-form';

interface Props {
  name         : string;
  label        : string;
  type?        : string;
  placeholder? : string;
  register     : UseFormRegister<any>;
  required?    : string;
  error?       : any;
}

export const InputField = ({ name, label, type = 'text', placeholder, register, required, error } : Props ) => {
  return (
    <div className="w-full xl:w-1/2">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
        {...register(name, { required })}
      />
      {error && (
        <p className="mt-1 text-red-500 text-sm">
          {error.message}
        </p>
      )}
    </div>
  );
};