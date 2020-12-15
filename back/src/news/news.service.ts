import { Injectable, NotFoundException, HttpService } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { News } from './schemas/news.schema';
import { Cron } from '@nestjs/schedule';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { UpdateNewDto } from './dtos/update-new.dto';
import { CreateNewDto } from './dtos/create-new.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private readonly newsModel: Model<News>,
    private readonly httpService: HttpService,
  ) {}

  public async findAllActive(): Promise<News[]> {
    return await this.newsModel
      .find({ deleted: false })
      .sort([['date', 'descending']])
      .exec();
  }

  public async findAll(): Promise<News[]> {
    return await this.newsModel
      .find()
      .sort([['date', 'descending']])
      .exec();
  }

  public async create(createNewsDto: CreateNewDto): Promise<any> {
    const newNews = await new this.newsModel(createNewsDto);
    return newNews.save();
  }
  public async removeAll(): Promise<any> {
    return await this.newsModel.deleteMany({});
  }
  public async updateDeletedById(newId: string): Promise<any> {
    const deletedNew = await this.newsModel.findById({ _id: newId }).exec();
    delete deletedNew._id;
    deletedNew.deleted = true;
    if (!deletedNew) {
      throw new NotFoundException(`New #${newId} not found`);
    }
    return this.update(newId, deletedNew);
  }
  public async update(newId: string, newDto: UpdateNewDto): Promise<any> {
    const updatedNew = await this.newsModel.findByIdAndUpdate(
      { _id: newId },
      newDto,
    );

    if (!updatedNew) {
      throw new NotFoundException(`New #${newId} not found`);
    }

    return updatedNew;
  }

  public async removeById(id: string): Promise<any> {
    const removeNew = await this.newsModel.deleteOne({ id });
    return removeNew;
  }

  private getNews(): Observable<AxiosResponse<any>> {
    return this.httpService
      .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
      .pipe(map((response) => response.data));
  }

  private getNewsFromAPI(currentNews) {
    this.getNews().subscribe((response) => {
      response['hits'].map((hit) => {
        if (
          (hit.title || hit.story_title) &&
          currentNews.findIndex((theNew) => theNew.id === `${hit.objectID}`) === -1
        ) {
          this.create({
            id: `${hit.objectID}`,
            title: hit.title || hit.story_title,
            url: hit.url || hit.story_url,
            date: hit.created_at,
            author: hit.author,
            deleted: false,
          });
        }
      });
    });
  }

  @Cron('*/10 * * * * *')
  private taskNews() {
    console.log('Every 10 seconds');
    this.findAll().then((response) => {
      this.getNewsFromAPI(response);
    });
  }
}
