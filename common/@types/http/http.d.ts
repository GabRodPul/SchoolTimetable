import 'express';
import { Multer } from 'multer'; // Importa Multer para definir el tipo

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File; // Archivo único subido con multer
    }
  }
}