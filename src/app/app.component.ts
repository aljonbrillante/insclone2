import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private storage: Storage) {
    this.initializeApp();
  }

  async ngOnInit() {
   console.log('storage')
    await this.storage.create();
  }

  async initializeApp() {
    SplashScreen.hide();
  }
}
