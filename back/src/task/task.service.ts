import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AppService } from 'src/app.service';
import { InjectModel } from '@nestjs/mongoose';
import { News, NewsDocument } from 'src/news/schemas/news.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(private service: AppService, @InjectModel(News.name) private newsModel: Model<NewsDocument>) { }

  @Cron('10 * * * * *')
  async handleCron(): Promise<void> {
    // const createdCat = new this.newsModel(news);
    this.service.getNews()
        .subscribe((response: any) =>{
            console.log(response);
            // return createdCat.save();
        })
  }
}