import addIconImage from "../images/plus-circle.svg";
import deleteIconImage from "../images/delete.svg";
import { project } from "../models/project";

export class ProjectView {

    constructor() {
        this.eventHandlers = {};
        this.projectContainer = document.getElementById("content");
        this.projectCardContainer = document.querySelector(".project-container");
        
        this.boundHandleClick = this.handleClick.bind(this);

        this.setupEventDelegation();
    }

    setupEventDelegation() {
        this.projectContainer.addEventListener("click", this.boundHandleClick);
    }
    

    handleClick(event) {
        const target = event.target;
        
        if (target.matches('.delete-project-btn') || target.parentNode.matches('.delete-project-btn')) {
            const projectId = this.getProjectId(target);
            if (this.eventHandlers.onprojectDelete) {
                this.eventHandlers.onprojectDelete(projectId);
            }
        }
        else if (target.matches('.add-todo-btn') || target.parentNode.matches('.add-todo-btn')) {
            const projectId = this.getProjectId(target);

            if (this.eventHandlers.onAddTodo) {
                this.eventHandlers.onAddTodo(projectId);
            }
        }
        else if (target.matches('.add-project-btn') || target.parentNode.matches('.add-project-btn')) {
            if (this.eventHandlers.onAddProject) {
                this.eventHandlers.onAddProject();
            }
        }
        else if (target.parentNode.matches(".delete-todo-btn")) {
            const projectId = this.getProjectId(target);
            const todoId = this.getTodoId(target);
            if (this.eventHandlers.onDeleteTodo) {
                this.eventHandlers.onDeleteTodo(projectId, todoId);
            }
        }
        else if (target.matches('#save-button') || target.parentNode.matches('#save-button')) {
            if (this.eventHandlers.onSaveData) {
                this.eventHandlers.onSaveData();
            }
        }
        else if (target.matches('#load-button') || target.parentNode.matches('#load-button')) {
            if (this.eventHandlers.onLoadData) {
                this.eventHandlers.onLoadData();
            }
        }
    }

    getProjectId(element) {
        const projectCard = element.closest(".project-card");
        return projectCard ? projectCard.dataset.projectId : null;
    }

    getTodoIds(element) {
        const todoItem = element.closest('.todo-item');
        const projectCard = element.closest('.project-card');
        return {
            projectId: projectCard ? projectCard.dataset.projectId : null,
            todoId: todoItem ? todoItem.dataset.todoId : null,
        }
    }

    getTodoId(element) {
        const todoItem = element.closest('.todo-item');
        return todoItem ? todoItem.dataset.todoId : null;
    }

    renderProject(project) {
        const element = this.createProjectElement(project);
        this.projectCardContainer.appendChild(element);
        return element;
    }

    renderTodoItem(todoItem, projectId) {
        console.log(`looking for project card with id ${projectId}`);
        
        const projectCard = this.projectContainer.querySelector(`[data-project-id="${projectId}"]`);
        const todoList = projectCard.querySelector('.todo-list');

        const element = this.createTodoItem(todoItem);
        todoList.appendChild(element);
        return element;
    }

    renderTodoItems(todoItems, projectId) {
        
    }

    removeProject(projectId) {
        const projectCard = this.projectContainer.querySelector(`[data-project-id="${projectId}"]`);
        if (projectCard) {
            projectCard.remove();
        }
    }

    removeTodoItem(projectId, todoId) {
        const todoItem = this.projectContainer.querySelector(
            `[data-project-id="${projectId}"] [data-todo-id="${todoId}"]`
        );

        if (todoItem) { 
            todoItem.remove();
        }
    }

    createProjectElement(project) {
        // Create main project card container
        const projectCardElement = document.createElement("div");
        projectCardElement.classList.add("project-card");
        projectCardElement.dataset.projectId = project.projectId;
        
        // Create project title
        const projectTitle = document.createElement("h3");
        projectTitle.textContent = project.title;
        
        // Create project description
        const projectDesc = document.createElement("p");
        projectDesc.classList.add("bodytext");
        projectDesc.id = "project-desc";
        projectDesc.textContent = project.desc;
        
        // Create todolist container
        const todoList = document.createElement("div");
        todoList.classList.add("todo-list");
        
        // Create project card footer
        const projectCardFooter = document.createElement("div");
        projectCardFooter.classList.add("projectcard-footer");
        
        // Create add button
        const addButton = document.createElement("button");
        addButton.classList.add("add-todo-btn");
        addButton.classList.add("button-icon");

        // Create add icon image
        const addIcon = document.createElement("img");
        addIcon.src = addIconImage;
        addIcon.alt = "Add Todoitem button";
        addIcon.classList.add("add-icon");

        //Create Delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-project-btn");
        deleteButton.classList.add("button-icon");
        const deleteIcon = document.createElement("img");
        deleteIcon.src = deleteIconImage;
        deleteIcon.alt = "Delete project button";
        deleteIcon.classList.add("delete-icon");
        
        // Assemble the structure
        deleteButton.appendChild(deleteIcon);
        projectCardFooter.appendChild(deleteButton);

        addButton.appendChild(addIcon);
        projectCardFooter.appendChild(addButton);
        
        projectCardElement.appendChild(projectTitle);
        projectCardElement.appendChild(projectDesc);
        projectCardElement.appendChild(todoList);
        projectCardElement.appendChild(projectCardFooter);        
        //Create todoItems
        for(const todoItem of project.todoItems) {
            const todoItemElement = this.createTodoItem(todoItem);
            todoList.appendChild(todoItemElement);
        }

        return projectCardElement;
    }

    createTodoItem(todoItem) {
        // Create todo item container
        const todoItemElement = document.createElement("div");
        todoItemElement.classList.add("todo-item");
        todoItemElement.classList.add(`priority-${todoItem.priority.toLowerCase()}`);
        todoItemElement.dataset.todoId = todoItem.itemId;
        // Create todo item title
        const todoTitle = document.createElement("h4");
        todoTitle.id = "todoitem-title";
        todoTitle.textContent = todoItem.title;
        
        // Create todo item description
        const todoDesc = document.createElement("p");
        todoDesc.classList.add("body-text-small");
        todoDesc.id = "todoitem-desc";
        todoDesc.textContent = todoItem.description;
        
        // Create todo item date
        const todoDate = document.createElement("p");
        todoDate.classList.add("body-text-small");
        todoDate.id = "todoitem-date";
        todoDate.textContent = todoItem.dateDue;
        
        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "todoitem-complete";
        checkbox.id = "todoitem-complete";
        
        // Assemble basic structure
        todoItemElement.appendChild(todoTitle);
        todoItemElement.appendChild(todoDesc);
        todoItemElement.appendChild(todoDate);
        
        // Add delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-todo-btn");
        
        const deleteIcon = document.createElement("img");
        deleteIcon.src = deleteIconImage;
        deleteIcon.alt = "Delete todoitem button";
        deleteIcon.classList.add("delete-icon");
        
        deleteButton.appendChild(deleteIcon);
        todoItemElement.appendChild(deleteButton);
        
        todoItemElement.appendChild(checkbox);

        console.log(`Added todoItemElement to DOM ${todoItemElement.id}`);
        return todoItemElement;
    }

    clearDashboard() {
        console.log("clearDashboard")
        let projectCardHolder = document.querySelector(".project-container");
        [...projectCardHolder.children].forEach((element) => {
            if (element.classList.contains("project-card"))
                projectCardHolder.removeChild(element);
        });
    }

    refreshTodoItemList(project) {
        console.log("refreshTodoItemList");
        let projectCard = projectCards.find(x => x.projectID == project.projectID);

        [...projectCard.todoItemHolder.children].forEach((element) => {
            projectCardHolder.removeChild(element);
        });


        for(let todoItem of project.todoItems) {
            createTodoItem(projectCard.projectID, todoItem);
        }

        return projectCard;
    }

    onProjectDelete(handler) {this.eventHandlers.onprojectDelete = handler;}
    onAddTodo(handler) {this.eventHandlers.onAddTodo = handler;}
    onDeleteTodo(handler) {this.eventHandlers.onDeleteTodo = handler;}
    onAddProject(handler) {this.eventHandlers.onAddProject = handler;}
    onSaveData(handler) {this.eventHandlers.onSaveData = handler;}
    onLoadData(handler) {this.eventHandlers.onLoadData = handler;}
}

