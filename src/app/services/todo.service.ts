import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';

//import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
 
  private _addTodoUrl = "http://localhost:3000/Todo/addTodo/";
  private _listTodoUrl = "http://localhost:3000/todo/todoList/";
  private _updateTodoUrl="http://localhost:3000/todo/updateTodo/";
 

  private _delTodoUrl ="http://localhost:3000/todo/deleteTodo/"
  constructor(private http : HttpClient) { 
    
  }

  addTodo(todo){
     
    return this.http.post<any>(this._addTodoUrl+todo._userId,todo);
  }
  listTodo(id){
return this.http.post<any>(this._listTodoUrl+id,id);
  }
  UpdateTodo(id,todo){
    return this.http.patch<any>(this._updateTodoUrl+id,todo)
  }
  
delTodo(id,creator){
  return this.http.delete<any>(this._delTodoUrl+id+"/"+creator)

 }
}
