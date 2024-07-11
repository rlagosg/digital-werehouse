import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Control, Controller, FieldError } from 'react-hook-form';

interface Props {
  name: string;
  control: Control<any>;
  defaultValue?: Dayjs | null;
  label: string;
  error?: FieldError;
  required?: string;
}

export const DatePickerField = ({ name, control, defaultValue, label, error, required }: Props) => {
  return (
    <div className="w-full xl:w-1/2">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required }}
        render={({ field }) => (
          <DatePicker 
            {...field}
            className='w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
          />
        )}
      />
      {error && (
        <p className="mt-1 text-red-500 text-sm">
          {error.message}
        </p>
      )}
    </div>
  );
  };