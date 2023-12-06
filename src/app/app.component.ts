import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      // Accessing task number 7
      // const taskNumber7 = this.tasks.find(task => task.id === 7);
      // console.log(taskNumber7);
    });
  }
}
