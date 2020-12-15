import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news: any[];
  datePipe = new DatePipe('en');
  deleteId: string;
  constructor(private newsService: NewsService) {
    this.getAllNews()
  }

  ngOnInit(): void {
  }

  getAllNews() {
    this.newsService.getAllNews()
    .subscribe(resp => {
      this.news = resp.map(element => {
        const elementDate = new Date(element.date);
        const currentDate = new Date();
        const format = this.getFormatDate(elementDate, currentDate); // yesterday, MMMM d, longDate
        element.date = format === 'yesterday'? format : this.datePipe.transform(element.date, format)
        return element;
      });
    })
  }

  openUrl(url){
    if(url && url !== ''){
      window.open(url, '_blank');
    }
  }

  deleteNew(id){
    this.deleteId = id;
    Swal.fire({
      title: 'Do you want to delete this new?',
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDeletion();
      }
    })
  }

  confirmDeletion(){
    this.newsService.deleteNew(this.deleteId)
      .subscribe(resp => {
        if(resp.deletedNew){
          this.news.splice(this.news.findIndex(currentNew => currentNew._id === this.deleteId), 1)
          Swal.fire('Deleted!', '', 'success')
        }
      })
  }

  getFormatDate(date1: Date, date2: Date){
    if(this.datePipe.transform(date1, 'dd/MM/yyyy') === this.datePipe.transform(date2, 'dd/MM/yyyy')){
      return 'shortTime'
    }else if(date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear() && date1.getDate() === date2.getDate() - 1){
      return 'yesterday'
    }else if(date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()){
      return 'MMMM d'
    }else if(date1.getFullYear() === date2.getFullYear()){
      return 'MMMM d'
    }else{
      return 'longDate'
    }
  }

}
