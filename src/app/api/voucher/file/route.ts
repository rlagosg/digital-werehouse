import * as fs from 'fs/promises';
import { NextResponse } from 'next/server';
import * as path from 'path';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url || '', process.env.LOCAL_HOST);
    const pdfName = searchParams.get('pdfName');
  
    if (!pdfName) {
      return NextResponse.json({ ok: 'El parámetro "pdfName" es obligatorio.' }, { status: 400 });
    }

    const pdfPath = path.join('C:\\DGT\\', pdfName);
  
    try {
      // Intenta leer el PDF desde el disco duro
      const pdfBuffer = await fs.readFile(pdfPath);
  
      // Devuelve el PDF como un buffer para que pueda ser descargado o visualizado
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="${pdfName}"`,
        },
      });
    } catch (error) {
      // Si hay un error al leer el PDF, devuelve un mensaje de error
      return NextResponse.json({ ok: `No se pudo encontrar el documento ${pdfName}` }, { status: 400 });
    }
  }