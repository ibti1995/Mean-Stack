import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Todo } from '../models/todo';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { TodoService } from '../services/todo.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent implements OnInit {
  form:FormGroup;

  private token = localStorage.getItem('userc')
  private helper = new JwtHelperService();
  private decodedToken = this.helper.decodeToken(this.token);
  private id : string
  
  constructor(fb:FormBuilder,private _userService:UserService,
    private _todoService:TodoService,private _router:Router,private route: ActivatedRoute) {
    this.form=fb.group({
        text: new FormControl('', [  
          Validators.required
        ])
    })
   }
get text() { return this.form.get('text'); }  
  
ngOnInit() {}

edit(){
     let todo= new Todo();
    let detail=this.form.value;
    console.log("detail ",JSON.stringify(detail.text))
    todo.text= detail.text
    todo._userId= this.decodedToken._id
    console.log('decodedtoken', this.decodedToken)
    console.log('decoded._id',this.decodedToken._id)

    //this.id houa id mta3 l todo 

    this.id = this.route.snapshot.paramMap.get("id")
   
    todo._id= this.id
    console.log("the todo isss",todo)
    console.log('idddddddddddddddd',this.id)
    this._todoService.UpdateTodo(todo._id,todo).subscribe(
      res => {
                console.log(res)
               this._router.navigate(['/home']);
         },
      err => {
        console.log(err);
      }
  )
  }

}
