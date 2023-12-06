import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}
  
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.tasksUrl);
  }
  addTask(updatedTasks: any): Observable<any>{
    return this.http.post(this.tasksUrl, updatedTasks);
  }
  deleteTask(taskId: number): Observable<any>{
    return this.http.delete(this.tasksUrl + "/" + taskId);
  }
  updateTask(taskId: number, taskToUpdate: any): Observable<any> {
    const url = `${this.tasksUrl}/${taskId}`;
    return this.http.put(url, taskToUpdate);
  }

  getTaskByStatus(isCompleted: boolean): Observable<any[]>{
    return this.http.get<any[]>(this.tasksUrl + "?isCompleted=" + isCompleted)
  }
  
}
