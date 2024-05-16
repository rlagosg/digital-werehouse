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
    pdfPath: string
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export const PDFViewer = ( { pdfPath }: Props) => {
  
  const { PDF, loading, error, fetchPDF } = useFetchPDF();  
  const [numPages, setNumPages] = useState<number>();

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }: PDFDocumentProxy): void => {
    setNumPages(nextNumPages);
  }

  useEffect(() => {
    fetchPDF('CK66407.pdf');
  }, [fetchPDF, 'CK66407.pdf']);

  return (
    <>
    <div>
      { !error && <VisorHeader pages={numPages} handleViewFullPDF={() => PDF && window.open(URL.createObjectURL(PDF), '_blank')} />}
      <div className="flex items-center justify-center w-full h-full mt-1">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {PDF && (
          <Document file={PDF} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={1} />
          </Document>
        )}
      </div>
    </div>
  </>
  );
}