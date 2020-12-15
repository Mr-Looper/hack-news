import { Test, TestingModule } from '@nestjs/testing';
import { NewsService } from './news.service';
import { Model } from 'mongoose';
import { News, NewsSchema } from './schemas/news.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('NewsService', () => {
  let service: NewsService;
  const mockRepository = {
    findAll() {
      return {};
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsService, { provide: getModelToken('News'), useFactory: mockRepository }],
    }).compile();

    service = module.get<NewsService>(NewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('get news', () => {
    it('should get all news', async () => {
      const allNews = await service.findAll();
      expect(allNews).toBeDefined();
    });
    it('should get only not deleted news', async () => {
      const allNews = await service.findAllActive();
      allNews.map((element) => {
        expect(element).toHaveProperty('deleted', false);
      });
    });
  });
});
