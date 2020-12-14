import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }
  getNews(): Observable<AxiosResponse<any>>{
    return this.httpService.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
      .pipe(
        map(response => response.data),
      );
  }
}
