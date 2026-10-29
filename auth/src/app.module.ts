import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeORMModule } from './infrastructure/database/typeorm';
import { UserFeatureModule } from './features/user/user.module';
import { DriverFeatureModule } from './features/driver/driver.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeORMModule,
    UserFeatureModule,
    DriverFeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
