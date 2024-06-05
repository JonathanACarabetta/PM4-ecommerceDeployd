import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`Estas ejecutando un metodo ${req.method} en la ruta ${req.url} y en la fecha ${Date.now()}`);
        next();
    }
};

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
    const onlyDate = new Date();
    const dateString = `${onlyDate.getDate()}/${onlyDate.getMonth()+1}/${onlyDate.getFullYear()} a las ${onlyDate.getHours()}:${onlyDate.getMinutes()}:${onlyDate.getSeconds()}`
    console.log(`Estas ejecutando un metodo ${req.method} en la ruta ${req.url} y en la fecha ${dateString}`);
    next();
}