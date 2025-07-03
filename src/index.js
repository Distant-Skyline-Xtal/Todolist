import { projectDashboard } from "./interface/projectDashboardDisplay.js";
import { project } from "./data/project.js";
import { TodoItem } from "./data/todoItem.js";
import { AddProjectDisplay } from "./interface/addProjectDisplay.js";
import { AddTodoItemDisplay } from "./interface/addTodoItemDisplay.js";
import "./style.css";

class CurrentData {
    projects;

    constructor() {

    }
}

function handleCreateProjectClick() {
    
    const newProject = new project(
        addProjectDisplay.nameInput.value,
        addProjectDisplay.descriptionInput.value
        );
    currentData.projects.push(newProject);
    
    //create project card
    let newProjectCard = currentProjectDashboard.createProjectCard(newProject);
    console.log(`Created project with name: ${newProject.title}, desc: ${newProject.desc}}`);
    
    //create event listeners
    newProjectCard.addItemButton.addEventListener("click", () => {handleAddItemClick(newProject);});
    newProjectCard.deleteButton.addEventListener("click", () => {handleRemoveProjectClick(newProject);});
    //Close Popup
    addProjectDisplay.deletePopup();
    
}

function handleAddProjectClick() {
    //create popup and add event listeners
    addProjectDisplay.createPopup();

    addProjectDisplay.createButton.addEventListener("click", handleCreateProjectClick);
}

function handleAddItemClick(project) {
    addToDoItemDisplay.createPopup();

    addToDoItemDisplay.createButton.addEventListener("click", () => {handleCreateItemClick(project);});

}

function handleCreateItemClick(project) {
    
    const newTodoItem = new TodoItem(
        addToDoItemDisplay.nameInput.value,
        addToDoItemDisplay.descriptionInput.value
    );

    project.todoItems.push(newTodoItem);

    //create todoItem Element
    let todoItemDisplay = currentProjectDashboard.createTodoItem(project.projectID, newTodoItem);
    
    //create event listeners
    todoItemDisplay.deleteButton.addEventListener("click", () => {handleRemoveItemClick(project, newTodoItem);})

    //Close Popup
    addProjectDisplay.deletePopup();

}

function handleRemoveItemClick(project, todoItem) {
    //Remove todoItem from data
    project.todoItems.slice(project.todoItems.indexOf(x => x.itemID == todoItem.itemID), 1);

    //remove todoItem from display
    currentProjectDashboard.removeTodoItem(project.projectID, todoItem.itemID);
}

function handleRemoveProjectClick(project) {
    currentData.projects.splice(currentData.projects.indexOf(x => x.projectID == project.projectID), 1);
    currentProjectDashboard.removeProject(project.projectID);
}



const currentData = new CurrentData();
const addProjectDisplay = new AddProjectDisplay();
const addToDoItemDisplay = new AddTodoItemDisplay();
const currentProjectDashboard = projectDashboard(document);
currentData.projects = [];

currentProjectDashboard.addProjectButton.addEventListener("click", handleAddProjectClick);

currentProjectDashboard.refreshProjectCardsDisplay(currentData.projects);

