import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  form: any = {
    idd:null,
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private token: TokenStorageService,private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.form.email=this.currentUser.email
    this.form.username=this.currentUser.username
    this.form.idd=this.currentUser.id
    this.form.password=this.currentUser.password
    this.form.sociatyname=this.currentUser.sociatyname
    this.form.universityname=this.currentUser.universityname
    console.log(this.currentUser)

    
  }
   logout(): void {
    this.token.signOut();
    window.location.reload();
  }
  onSubmit(): void {
    //const { idd,username, email, password } = this.form;
    console.log("----------1515 ",this.form.idd,this.form.username)

    this.authService.update(this.form.idd,this.form.username, this.form.email, this.form.password).subscribe({
      next: data => {

        this.currentUser.id=this.form.idd
        this.currentUser.username
        this.form.password=this.currentUser.password

        this.token.saveUser(data);


        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
    
  }
  
}
