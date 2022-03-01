import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private ionLoader: LoaderService
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]], //eve.holt@reqres.in
      password: ['', [Validators.required, Validators.minLength(6)]], //cityslicka
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.ionLoader.showLoader('');
    // this.ionLoader.hideLoader(); 
    // 

    let param = {
      email: this.credentials.value['email'],
      password: this.credentials.value['password']
    }
    this.router.navigateByUrl('home', { replaceUrl: true });
    this.authService.getLogin(param, async (err, data) => {
      let userinfo = data;
      if (userinfo.id != 0) {
        this.ionLoader.hideLoader();
        await loading.dismiss();
        this.router.navigateByUrl('home', { replaceUrl: true });
      }
      else {
        this.ionLoader.hideLoader();
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Invalid Username or Password',
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

}
