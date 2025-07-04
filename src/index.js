import { projectDashboard } from "./interface/projectDashboardDisplay.js";
import { project, projectLocalStorage } from "./data/project.js";
import { TodoItem } from "./data/todoItem.js";
import { AddProjectDisplay } from "./interface/addProjectDisplay.js";
import { AddTodoItemDisplay } from "./interface/addTodoItemDisplay.js";
import { StorageController } from "./storageController.js";
import "./style.css";

class CurrentData {
    projects = [];

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

function createInteractableProject() {
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
        addToDoItemDisplay.descriptionInput.value,
        new Date(),
        addToDoItemDisplay.priorityOptions.value
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
    project.todoItems.splice(project.todoItems.indexOf(x => x.itemID == todoItem.itemID), 1);

    //remove todoItem from display
    currentProjectDashboard.removeTodoItem(project.projectID, todoItem.itemID);
}

function handleRemoveProjectClick(project) {
    currentData.projects.splice(currentData.projects.findIndex(x => x.projectID == project.projectID), 1);
    currentProjectDashboard.removeProject(project.projectID);
}

let currentData = new CurrentData();
const addProjectDisplay = new AddProjectDisplay();
const addToDoItemDisplay = new AddTodoItemDisplay();
const currentProjectDashboard = projectDashboard(document);
currentData.projects = [];

currentProjectDashboard.addProjectButton.addEventListener("click", handleAddProjectClick);

// Setup local storage
const storageController = new StorageController();

if (storageController.storageAvailable("localStorage")) {
    console.log("localStorage is available!");
}

// save and load buttons
const saveButton = document.getElementById("save-button");
const loadButton = document.getElementById("load-button");

saveButton.addEventListener("click", () => { storageController.saveData(currentData) })
loadButton.addEventListener("click", handleLoadDataClick)

function handleLoadDataClick() {
    const loadedPlainObject = storageController.loadData();
    if (loadedPlainObject === null) {
        console.log("No Data was loaded!");
        return;
    }
        console.log(`loaded data: ${loadedPlainObject}`)

    let newCurrentData = new CurrentData();
    for(let loadedProject of loadedPlainObject.projects) {
        let newProject = new project(loadedProject.title, loadedProject.desc);
        newProject.projectID = loadedProject.projectID;
        newProject.complete = loadedProject.complete;
        console.log(`loaded project: ${loadedProject}`)
        for (let loadedTodoitem of loadedProject.todoItems) {
            console.log(`loading todoItem ${loadedTodoitem.title}`)
            let newTodoItem = new TodoItem(
                loadedTodoitem.title, loadedTodoitem.description, 
                loadedTodoitem.dateDue, loadedTodoitem.priority);
            newProject.todoItems.push(newTodoItem);
            
        }
        newCurrentData.projects.push(newProject);
    }
    
    currentData = newCurrentData;

    currentProjectDashboard.clearDashboard();

    for (let currentProject of currentData.projects) {
        let newProjectCard = currentProjectDashboard.createProjectCard(currentProject);
        console.log(`Created project with name: ${currentProject.title}, desc: ${currentProject.desc}}`);
        
        //create event listeners
        newProjectCard.addItemButton.addEventListener("click", () => {handleAddItemClick(currentProject);});
        newProjectCard.deleteButton.addEventListener("click", () => {handleRemoveProjectClick(currentProject);});

        for (let currentTodoItem of currentProject.todoItems) {
            console.log(`creating todoitem: ${currentTodoItem.title}, desc: ${currentTodoItem.description}}`);
            //create todoItem Element
            let todoItemDisplay = currentProjectDashboard.createTodoItem(currentProject.projectID, currentTodoItem);
            
            //create event listeners
            todoItemDisplay.deleteButton.addEventListener("click", () => {handleRemoveItemClick(currentProject, currentTodoItem);})
        }
    }
}

currentProjectDashboard.refreshProjectCardsDisplay(currentData.projects);

