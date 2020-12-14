import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// import { INews } from './interfaces/news.interface';
// import { CreateNewsDto, UpdateNewsDto } from './dto';
import { News } from './schemas/news.schema';
// import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private readonly newsModel: Model<News>,
  ) {}

  public async findAll(): Promise<News[]> {

    return await this.newsModel
      .find()
      .exec();
  }

  public async create(createNewsDto: any): Promise<any> {//INews
    const newNews = await new this.newsModel(createNewsDto);
    return newNews.save();
  }
}