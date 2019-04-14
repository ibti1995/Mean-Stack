import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
  form: FormGroup;
  constructor(fb: FormBuilder, private _userService: UserService, private router: Router) {

    this.form = fb.group({
      
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      pass: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      
    })
    
    
    }
    get email() { return this.form.get('email'); }
    get pass() { return this.form.get('pass'); }


    login() {
      /*les valeurs des chaps lkol tsabbou fel userdetails
      9a3din n3abiw fel model b les informations */
      let userDetail = this.form.value;
    let user = new User();
  
    user.email = userDetail.email;
    user.password = userDetail.pass;
    console.log(user)

      this._userService.loginUser(user).subscribe(
        res => {
          console.log(res);
          localStorage.setItem('userc',JSON.stringify(res))
          this.router.navigate(['/home']);
           },
        err => {
          console.log(err);
        }
    )
  
    }


  ngOnInit() {
  }

}
