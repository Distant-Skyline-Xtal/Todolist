import { Project } from "../models/project";
import { TodoItem } from "../models/todoItem";

export class ProjectService {

    projects = [];

    constructor(storageController) {
        this.projects = [];
        this.storage = storageController;
    }

    createProject(title, description) {
        const newProject = new Project(title, description);
        this.projects.push(newProject);
        return newProject;
    }

    deleteProject(projectId) {
        this.projects = this.projects.filter(x => x.projectId !== projectId);
    }

    addToDoItem(projectId, todoData) {
        const project = this.projects.find(x => x.projectId === projectId);
        if (project) {
            const todoItem = new TodoItem(
                todoData.title,
                todoData.description,
                todoData.dateDue, 
                todoData.priority
            );
            project.todoItems.push(todoItem);
            return todoItem;
        }
    }

    deleteTodoItem(projectId, todoId) {
        const project = this.projects.find(x => x.projectId === projectId);
        project.todoItems = project.todoItems.filter(x => x.itemId !== todoId);
    }


    createProjectFromData(loadedProject) {
        const newProject = new Project(loadedProject.title, loadedProject.description);
        newProject.projectId = loadedProject.projectId;
        newProject.complete = loadedProject.complete;

        for (const loadedItem of loadedProject.todoItems) {
            const newTodoItem = new TodoItem(
                loadedItem.title,
                loadedItem.description,
                loadedItem.dateDue,
                loadedItem.priority
            );

            newTodoItem.itemId = loadedItem.itemId;
            newProject.todoItems.push(newTodoItem);
        }

        this.projects.push(newProject);
    }
}