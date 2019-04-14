import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public todos:Todo[]= []
  public dones:Todo[]= []
  private token = localStorage.getItem('userc')
  private helper = new JwtHelperService();
  private decodedToken = this.helper.decodeToken(this.token);
  constructor(private _TodoService : TodoService,private route : Router) { 
    
   
     console .log(this.decodedToken)
     console .log(' tawa a7na fel home curreeeeeeeeeent user')
     let idUser = this.decodedToken._id;
     this._TodoService.listTodo(idUser).subscribe(res=>{
       
      for (let index = 0; index < res.todos.length; index++){
        
        if (res.todos[index].completed) {
          this.dones.push(res.todos[index]);
          
        }else{
          this.todos.push(res.todos[index]);
     }
    }},
       err =>{
         console.log(err)
       }
 )

  }

  ngOnInit() {}
  done(todo){
   
   console.log(todo.text)
   console.log(todo._id)
     todo.completed = true;
     todo._userId = this.decodedToken._id
     console.log('user id',todo._userId)
    this._TodoService.UpdateTodo(todo._id,todo).subscribe(
      res => {
        this.todos = res.todos
        window.location.reload();
         },
      err => {
        console.log(err);
      }
  )
  }
  
  deleteTodo(todo){
  

    console.log(this.decodedToken._id)
    console.log(todo._id)
    
    this._TodoService.delTodo(todo._id,this.decodedToken._id).subscribe(
      res => {
        console.log('lahneeeeeeeeeeee el resultat')
        console.log(res)
        window.location.reload();
        
         },
      err => {
        console.log(err);
      }
  )
  }

}
