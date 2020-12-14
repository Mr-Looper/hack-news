import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Post,
    Body,
    Put,
    NotFoundException,
    Delete,
    Param,
    Query,
  } from '@nestjs/common';
  import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) {}
  
    @Get()
    public async getAllNews(
      @Res() res
    ) {
      const news = await this.newsService.findAll();
      return res.status(HttpStatus.OK).json(news);
    }
  
    @Post()
    public async addNews(
      @Res() res,
      @Body() createNewsDto: any,
    ) {
      try {
        const customer = await this.newsService.create(createNewsDto);
        return res.status(HttpStatus.OK).json({
          message: 'News has been created successfully',
          customer,
        });
      } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error: News not created!',
          status: 400,
        });
      }
    }
}
