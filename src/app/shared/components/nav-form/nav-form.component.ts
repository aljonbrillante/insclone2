import { Component, Input, OnInit, NgZone } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FilterComponent } from 'src/app/shared/filter/filter/filter.component';
import { NavController, IonSearchbar, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-nav-form',
  templateUrl: './nav-form.component.html',
  styleUrls: ['./nav-form.component.scss'],
})
export class NavFormComponent implements OnInit {
  @Input() profile;
  constructor(private router: Router, private navCtrl: NavController, private popoverCtrl: PopoverController,
    private ngZone: NgZone,) { }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl("inspection-details");
  }
  home() {
    this.router.navigateByUrl("home");
  }
  logout() {
    this.router.navigateByUrl("login");
  }

  async select(ev: any, type) {
    let component: any;
    let componentProps = {};
    switch (type) {
      case 'filter':
        component = FilterComponent;
        break;

    };
    let cssClass = '';
    switch (component) {
      case FilterComponent:
        cssClass = 'filter-popover-css';
        break;
    }
    const popover = await this.popoverCtrl.create({
      // componentProps: componentProps,
      component: component,
      cssClass: cssClass,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
