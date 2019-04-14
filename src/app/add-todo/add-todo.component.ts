import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  form: FormGroup;
  constructor(private fb : FormBuilder,private _TodoService : TodoService,private route : Router) { 
    this.form = fb.group({
      todo: new FormControl('', [
        Validators.required
      ])
    })
  }
  get todo(){return this.form.get('todo')}

  addTodo(){
    let token = localStorage.getItem('userc')
   
    console.log(token)
    console.log('tokeeeeeeeeeeeeeeeeeen')
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console .log(decodedToken)
    console .log('curreeeeeeeeeent user')
    let todoDetail = this.form.value;
   
    let todo = new Todo();
    todo.savedAt = new Date()
    todo.text = todoDetail.todo;
    
    todo.completedAt = null;
    todo._userId = decodedToken._id;
    
    this._TodoService.addTodo(todo).subscribe(res=>{
      console.log(res);
      this.route.navigate(['/home']);},
      err =>{
        console.log(err)
      })
  }
 ngOnInit() {
  }

}
