import { Metadata } from "next";

interface Props{
    params: {
        check: string
    }
}

export const metadata: Metadata = {
    title: "Digital Werehouse | AMC",
    description: "Almacen digital Alcadia Municipal de Comayagua",
  };

export default async function VoucherPage({ params } : Props) {
    
    const { check } = params;    
    return (
      <>      
          <h1>CK {check}</h1>
      </>
    );
  }
  