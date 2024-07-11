interface Props {
    name: string;
  }
  
 export const LabelTittle = ({ name } : Props) => (
    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
      {name}
    </label>
  );
  