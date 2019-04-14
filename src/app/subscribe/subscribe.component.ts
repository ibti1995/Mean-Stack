import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { PasswordValidators } from './password.validators';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  
  form: FormGroup;

  constructor(fb: FormBuilder, private _userService: UserService, private router: Router) {
/*ya3mel liaison bin el formulaire fel html wel ts

wel FormControl ye5ou une valeur par defaut w ye5ou les validateurs */
    this.form = fb.group({
      firstname: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z]+')
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z]+')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      tel: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(8),
        Validators.maxLength(13)
      ]),
      pass: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      repass: new FormControl('', [
        Validators.required
      ]),
    },/*hedha test optionnel y3ayet l fichier ts e5er bech na3mlou test  */
      {
        validator: PasswordValidators.passwordShouldMatch
      })

  }

  get firstname() { return this.form.get('firstname'); }   /*y3awnouna fel affichage des erreurs    */
  get lastname() { return this.form.get('lastname'); }
  get tel() { return this.form.get('tel'); }
  get email() { return this.form.get('email'); }
  get pass() { return this.form.get('pass'); }
  get repass() { return this.form.get('repass'); }

  inscription() {

    /*les valeurs des chaps lkol tsabbou fel userdetails
    9a3din n3abiw fel model b les informations */
    
    let userDetail = this.form.value;
    let user = new User();
    user.firstname = userDetail.firstname;
    user.lastname = userDetail.lastname;
    user.email = userDetail.email;
    user.tel = userDetail.tel;
    user.password = userDetail.pass;
    console.log(user)

    this._userService.registerUser(user).subscribe(
      res => {
      console.log("okbb")
        console.log(res);
        this.router.navigate(['/home']); },
      err => {   console.log("erreuurr")
        console.log(err); /*you7elli houniiiiiii */
      }
    )

  }

  ngOnInit() {
  }

}
