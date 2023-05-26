import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  ionicForm2: FormGroup;
  isSubmitted = false;
  passwordType: string = 'password';
  passwordShown: boolean = false;
  
  isActiveToggleTextPassword: Boolean = true;
  constructor(
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,private alertCtrl: AlertController
  ) { }

  togglePassword(){
    if(this.passwordShown){
      this.passwordShown = false;
      this.passwordType = 'password';
    } else {
      this.passwordShown = true;
      this.passwordType = 'password';
    }
  }

  public toggleTextPassword(): void{
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword==true)?false:true;
}
public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
}

  async presentAlert() {
    const alert = await this.alertCtrl.create({
    message: 'These credentials do not match our records.',
    subHeader: 'Unauthorized ',
    buttons: ['Dismiss']
   });
   await alert.present(); 
}
  
  ngOnInit() {
    this.ionicForm2 = this.formBuilder.group({
      name: [],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:['', [Validators.required, Validators.minLength(2)]],
    })
  }
  
  get errorControl() {
    return this.ionicForm2.controls;
  }
   

  submitForm() {
    this.isSubmitted = true;
      this.authService.register(this.ionicForm2.value['name'],this.ionicForm2.value['email'],this.ionicForm2.value['password']).subscribe( data => {}, 
        
        error => {

          this.presentAlert();
          
          console.log(error);

      
      }, () => {this.navCtrl.navigateRoot('/login');
      () => {   
      }})
    
    if (!this.ionicForm2.valid) {
      console.log('Please provide all the required values!')
      
      return false;
      
    } else {
      
    }
  }
}
