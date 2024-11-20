import multer, { StorageEngine } from 'multer';
import { Request } from 'express';

// Configuración de almacenamiento
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    // Ruta donde se guardarán las imágenes
    cb(null, './public/images');
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    // Determinar la extensión según el tipo MIME del archivo
    let filetype = '';
    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    } else if (file.mimetype === 'image/png') {
      filetype = 'png';
    } else if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    } else {
      // Si no es un tipo de archivo válido, devolver un error
      return cb(new Error('Tipo de archivo no soportado'), '');
    }

    // Generar un nombre único para el archivo (con fecha/hora)
    const filename = `image-${Date.now()}.${filetype}`;
    cb(null, filename);
  }
});

// Configuración de Multer
const upload = multer({ storage });

export default upload;
