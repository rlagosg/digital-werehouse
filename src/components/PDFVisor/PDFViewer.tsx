'use client';

import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { useCallback, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './Sample.css';

import type { PDFDocumentProxy } from 'pdfjs-dist';
import { VisorHeader } from './VisorHeader';

interface Props {
    pdfPath: string
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


const resizeObserverOptions = {};

type PDFFile = string | File | null;

export const PDFViewer = ( { pdfPath }: Props) => {
  
  const [file, setFile] = useState<PDFFile>('/documents/CK66407.pdf');
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
   

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <div>
       <VisorHeader pages={ numPages }/>
      <div className="flex items-center justify-center w-full h-full mt-1"
      >        
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} >
            <Page pageNumber={1} />
          </Document>
      </div>
    </div>
  );
}