import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {loggerGlobal} from "./middlewares/logger.middleware"
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  app.useGlobalPipes(new ValidationPipe())
  const swaggerCongfig = new DocumentBuilder()
  .setTitle("Ecommerce")
  .setDescription(`
  Bienvenido a la documentacion de mi primer Ecommerce en BackEnd! aqui encontraras las diferentes rutas con sus especificaciones, los DTOs(Data Transfer Object) y las estructuras de las entidades con ejemplos.
  \nTene en cuenta que para utilizar la mayoria de los endpoints deberas poseer permisos de administrador y para otros generar un token, por ello deberas registrar un primer ususario e iniciar sesion(Por defecto es un usuario comun, si quieres un usuario Admin deberas cambiar su estado de false a true en la propiedad isadmin en la Base de Datos).
  \nUna vez cambiado el estado en la Base de Datos deberas realizar el login/signIn, para que el token generado posea la caracteristica de administrador. 
  \n Para comenzar a operar la API deberas ejecutar primero el Endpoint de GET categories/seeder y consiguiente el GET products/seeder, ya que si no cargases en ese orden, los productos no tendran categorias lo que causara problemas.`)
  .setVersion("1.0")
  .addBearerAuth()
  .build()
  const document = SwaggerModule.createDocument(app, swaggerCongfig);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
