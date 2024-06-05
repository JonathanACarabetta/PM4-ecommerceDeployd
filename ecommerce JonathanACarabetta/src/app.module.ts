import { Module } from '@nestjs/common';
import { UsersModule } from "./users/users.module";
import { ProductsModule } from './products/products.module';
import { AuthModule } from './Auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm'
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import {FilesModule} from "./files/files.module";
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './config/envs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
     inject: [ConfigService],
     useFactory:(configService: ConfigService) => configService.get('typeorm')
    }),
    ProductsModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    OrdersModule,
    FilesModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: "1h",
      },
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
