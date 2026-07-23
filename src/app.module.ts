import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { EquiposModule } from './equipos/equipos.module';
import { MantenimientosModule } from './mantenimientos/mantenimientos.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Carga las variables de entorno en toda la app
    }),
    PrismaModule,
    UsersModule,
    CategoriesModule,
    EquiposModule,
    MantenimientosModule,
  ],
})
export class AppModule {}