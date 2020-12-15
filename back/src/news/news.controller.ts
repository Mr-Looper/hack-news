import {
  Controller,
  Get,
  Res,
  HttpStatus,
  NotFoundException,
  Delete,
  Param,
  Render,
} from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}
  @Get('')
  @Render('')
  public async getAllNews(@Res() res) {
    const news = await this.newsService.findAllActive();
    return res.status(HttpStatus.OK).json(news);
  }
  @Delete('/all')
  public async deleteAll(@Res() res) {
    await this.newsService.removeAll();
    return res.status(HttpStatus.OK).json('All news removed');
  }
  @Delete('/:id')
  public async deleteNew(@Res() res, @Param('id') newId: string) {
    if (!newId) {
      throw new NotFoundException('New ID does not exist');
    }
    const deletedNew = await this.newsService.updateDeletedById(newId);

    if (!deletedNew) {
      throw new NotFoundException('New does not exist');
    }
    return res.status(HttpStatus.OK).json({
      message: 'New has been deleted',
      deletedNew,
    });
  }
}
