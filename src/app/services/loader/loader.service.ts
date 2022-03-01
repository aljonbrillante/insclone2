// loader.service.ts
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    public loadingController: LoadingController
  ) { }

  // This will show then autohide the loader
  showHideAutoLoader() {

    this.loadingController.create({
      message: 'This Loader Will Auto Hide in 2 Seconds',
      duration: 2000,
      // cssClass:'custom-loader-class'
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds', dis);
      });
    });

  }

  // Show the loader for infinite time
  showLoader(msg) {

    this.loadingController.create({
      message: msg,
      spinner: 'dots',
      cssClass:'custom-loader-class'
    }).then((res) => {
      res.present();
    });

  }

  // Hide the loader if already created otherwise return error
  hideLoader() {

    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });

  }


}
