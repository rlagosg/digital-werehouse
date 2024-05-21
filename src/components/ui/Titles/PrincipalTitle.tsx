
interface Props {
  title: string;
}
export const PrincipalTitle = ({ title }: Props) => {
  // Componente para indicar la ruta en la que se encuentra
  return (
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {title}
      </h2>
  );
};