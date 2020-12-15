import { Module, HttpModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://mongodb:27017/nest',
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }),
    }),
    ScheduleModule.forRoot(),
    HttpModule,
    NewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
