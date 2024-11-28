import express from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: any;  // Puedes cambiar `any` por el tipo específico si sabes el tipo de `user`
        token?: string;
    }
}