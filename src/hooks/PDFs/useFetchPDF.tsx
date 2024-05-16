import { useCallback, useState } from 'react';

export const useFetchPDF = () => {
  const [PDF, setPDF] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPDF = useCallback(async (pdfName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/voucher/file/?pdfName=${encodeURIComponent(pdfName)}`);

      if (!response.ok) {
        throw new Error('Error fetching PDF: ' + response.statusText);
      }

      const pdfBlob = await response.blob();

      // Verifica si el blob es un PDF
      if (pdfBlob.type !== 'application/pdf') {
        throw new Error('Fetched file is not a PDF');
      }

      setPDF(pdfBlob);
    } catch (err) {
      setError("No se encontró el documento.");
      setPDF(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { PDF, loading, error, fetchPDF };
};
