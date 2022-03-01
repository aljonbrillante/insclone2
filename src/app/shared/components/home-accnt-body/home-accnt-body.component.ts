import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service'
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home-accnt-body',
  templateUrl: './home-accnt-body.component.html',
  styleUrls: ['./home-accnt-body.component.scss'],
})
export class HomeAccntBodyComponent implements OnInit {
  @Input() datas;

  dataFilters = {
    results: 1,
    page: 50,
  };

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    // console.log('taeeeeeeee')
    // this.dataservice.getrandomfeed(this.dataFilters, async (err, data) => {
    //   if (data) {
    //     console.log(data)
    //   }
    // });
  }

}
