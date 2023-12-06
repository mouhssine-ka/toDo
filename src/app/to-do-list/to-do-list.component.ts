
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../services/data.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  sortOrder = 'asc';
  taskArray: any[] = [];

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(data => {
      this.taskArray = data; 
      this.changeSortOrder();
    });

  }

  onSubmit(form: NgForm): void {
    const newTask = {
      taskName: form.controls['task'].value,
      isCompleted: false
    };

    this.taskService.addTask(newTask).subscribe(() => {
      this.loadTasks();
    });

    form.reset();
  }

  onDelete(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  onCheck(taskId: number): void {
    const taskToUpdate = this.taskArray.find(task => task.id == taskId);
    taskToUpdate.isCompleted = !taskToUpdate.isCompleted;
    
    this.taskService.updateTask(taskId, taskToUpdate).subscribe(response => {
    });
  }
  
  getCompletedTasks(): void{
    this.taskService.getTaskByStatus(true).subscribe(data => this.taskArray = data);
  }
  getNonCompletedTasks(): void{
    this.taskService.getTaskByStatus(false).subscribe(data => this.taskArray = data)
  }

  changeSortOrder(){
    if(this.sortOrder === 'asc'){
      this.taskArray.sort((a,b) => {
        return a.taskName.localeCompare(b.taskName);
      })
    }
    else {
      this.taskArray.sort((a,b) => {
        return b.taskName.localeCompare(a.taskName);
      })
    }
  }
}
