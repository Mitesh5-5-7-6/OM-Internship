import { Injectable } from "@angular/core";
import { type NewTaskDataType } from "./new-task/new-task.model";

@Injectable({ providedIn: 'root' })
export class TasksService {
    private tasks = [
        {
            id: 't1',
            userId: 'u1',
            title: 'Master Angular',
            summary: 'Learn all the basic and advanced features of Angular.',
            dueDate: '2025-05-09'
        },
        {
            id: 't2',
            userId: 'u3',
            title: 'Build Responsive Design',
            summary: 'Build responsive design using css style.',
            dueDate: '2025-03-15'
        },
        {
            id: 't3',
            userId: 'u3',
            title: 'Learn More In deep Concepts',
            summary: 'Learn HTML,CSS,JS,TS and now recently learn AngularJs',
            dueDate: '2025-05-30'
        }
    ];

    constructor() {
        const tasks = localStorage.getItem('tasks')

        if (tasks) {
            this.tasks = JSON.parse(tasks);
        }
    }

    getUserTasks(userId: string) {
        return this.tasks.filter((task) => task.userId === userId);
    }

    addTask(taskData: NewTaskDataType, userId: string) {
        this.tasks.unshift({
            id: new Date().getTime.toString(),
            userId: userId,
            title: taskData.title,
            summary: taskData.summary,
            dueDate: taskData.date
        })
        this.saveTasks();
    }

    reoveTask(id: string) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.saveTasks();
    }

    private saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
}