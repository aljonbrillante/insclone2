import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service'
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { ModalController, AlertController, Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  result = 10;
  pageNumber = 1;
  datas = [];
  profile;
  dataphotos = [];
  dataFilters = {
    results: this.result,
    page: this.pageNumber,
  };
  completed = false;
  constructor(private router: Router, private loadingController: LoadingController, private dataservice: DataService
    ,private alertCtrl: AlertController,) { }


  ngOnChange(change: any) {

  }
  async ngOnInit() {
    await this.dataservice.getrandomprofile(this.dataFilters, async (err, data) => {
      if (data) { 
        this.profile = data.results;
        console.log(this.profile)
      }
    });
    await this.dataservice.getrandomfeed(this.dataFilters, async (err, data) => {
      if (data) {
        this.datas = data.results;
        await this.dataservice.getrandomphotos(this.dataFilters, async (err, data) => {
          if (data) {
            this.dataphotos = data;
            console.log('this.dataphotos')
            console.log(this.dataphotos)
          }
        });
      }
    });
  }

  async loadDatas(event) {
    if (this.completed) return;

    this.dataFilters.page = ++this.pageNumber;

    try {
      await this.dataservice.getrandomfeed(this.dataFilters, async (err, data) => {
        if (data) {
          let dataaa = data.results.length
          console.log('data.results', dataaa)
          for (let o = 0; o <= dataaa - 1; o++) {
            console.log(data.results[o])
            // this.datas.push(data.results[o]);
            if (data.results[0] != undefined || data.results[0] != 'undefined') { this.datas.push(data.results[o]); }
          }


          event.target.complete();
          console.log(this.datas)
          await this.dataservice.getrandomphotos(this.dataFilters, async (err, data) => {
            if (data) {
              let dataaa = data.length
              console.log('data.results', dataaa)
              for (let o = 0; o <= dataaa - 1; o++) {
                console.log(data[o])
                if (data[0] != undefined || data[0] != 'undefined') { this.dataphotos.push(data[o]); }
                // this.dataphotos.push(data[o]);
              }
              event.target.complete();
            }
            else {
              this.completed = true;
            }
          });
        }
      });
    } catch (error) {
      console.warn(error);
      this.completed = true;
    }
  }
  async goAlert() {
    let __alert = await this.alertCtrl.create({
      buttons: [
        {
          text: "Report",
          handler: () => {
          }
        },
        {
          text: "Unfollow",
          handler: () => {
          }
        },
        {
          text: "Go to post",
          handler: (data) => {
          }
        },
        {
          text: "Share to...",
          handler: (data) => {
          }
        },
        {
          text: "Copy link",
          handler: (data) => {
          }
        },
        {
          text: "Embed",
          handler: (data) => {
          }
        },
        {
          text: "Cancel",
          role: 'cancel',
          handler: () => {
         
          }
        }
      ]
    });

    await __alert.present();
  }
}
