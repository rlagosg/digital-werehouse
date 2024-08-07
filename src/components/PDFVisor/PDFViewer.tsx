'use client';

import { useEffect, useState } from 'react';

import type { PDFDocumentProxy } from 'pdfjs-dist';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './Sample.css';

import { useFetchPDF } from '@/hooks';
import { VisorHeader } from './VisorHeader';

interface Props {
  folder: string;
  pdfPath: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export const PDFViewer = ( { folder, pdfPath }: Props) => {
  
  const { PDF, loading, error, fetchPDF } = useFetchPDF();  
  const [numPages, setNumPages] = useState<number>();

  useEffect(() => {
    fetchPDF(folder, pdfPath);
  }, [fetchPDF, pdfPath]);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }: PDFDocumentProxy): void => {
    setNumPages(nextNumPages);
  }

  return (
    <>
    <div>
      { !error && <VisorHeader pages={numPages} handleViewFullPDF={() => PDF && window.open(URL.createObjectURL(PDF), '_blank')} />}
      <div className="flex items-center justify-center w-full h-full mt-1 fadeIn">
        {loading && <p>Cargando el documento...</p>}
        {error && <p>{error}</p>}
        {PDF && (
          <Document className={'fadeIn'} file={PDF} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={1} />
          </Document>
        )}
      </div>
    </div>
  </>
  );
}