import addIconImage from "../images/plus-circle.svg";
import deleteIconImage from "../images/delete.svg";
class ProjectCard {
    todoItems = [];

    addItemButton;
    removeItemButton;
    deleteButton;
    element;
    projectID;
    todoItemHolder;


    constructor(element, elementId, todoItemHolder) {
        this.projectID = elementId;
        this.element = element;
        this.todoItemHolder = todoItemHolder;
    }
}

class TodoItemCard {

    deleteButton;
    element;
    projectID;
    itemID;
    constructor(element, itemID, projectID, deleteButton) {
        this.element = element;
        this.itemID = itemID;
        this.projectID = projectID;
        this.deleteButton = deleteButton;
    }

}

export function projectDashboard(document) {
    const doc = document;

    let addProjectButton;
    let removeProjectButton;

    const projectCards = [];

    addProjectButton = doc.querySelector(".add-project-button");
    
    function createMainPage() {
        
    }

    function refreshProjectCardsDisplay(projects) {
        let projectCardHolder = document.querySelector(".project-container");
        
        // Remove existing project cards
        [...projectCardHolder.children].forEach((element) => {
            if (element.classList.contains("project-card"))
                projectCardHolder.removeChild(element);
        });
        
        for(let project of projects) {
            let newProjectCard = createProjectCard(project);
            projectCardHolder.appendChild(newProjectCard.element);
        }
    }

    function createProjectCard(project) {
        // Create main project card container
        const projectCardElement = document.createElement("div");
        projectCardElement.classList.add("project-card");
        projectCardElement.id = project.projectID;
        
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
        todoList.classList.add("todolist");
        
        // Create project card footer
        const projectCardFooter = document.createElement("div");
        projectCardFooter.classList.add("projectcard-footer");
        
        // Create add button
        const addButton = document.createElement("button");
        addButton.classList.add("button-icon");
        
        // Create add icon image
        const addIcon = document.createElement("img");
        addIcon.src = addIconImage;
        addIcon.alt = "Add Todoitem button";
        addIcon.classList.add("add-icon");

        //Create Delete button
        const deleteButton = document.createElement("button");
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
        let projectCardHolder = document.querySelector(".project-container");
        projectCardHolder.appendChild(projectCardElement);
        
        let newProjectCard = new ProjectCard(
            projectCardElement, 
            project.projectID,
            todoList,
        );
        newProjectCard.addItemButton = addButton;
        newProjectCard.deleteButton = deleteButton;
        projectCards.push(newProjectCard);

        return newProjectCard;
    }

    function removeProject(projectID) {
        let projectCardHolder = document.querySelector(".project-container");
        let projectCard = projectCards.find(x => x.projectID == projectID);
        projectCardHolder.removeChild(projectCard.element);
        projectCards.splice(projectCards.indexOf(projectCard), 1);
    }

    function createTodoItem(projectID, todoItem) {
        // Create todo item container
        const todoItemElement = document.createElement("div");
        todoItemElement.classList.add("todoitem");
        todoItemElement.classList.add(`priority-${todoItem.priority.toLowerCase()}`);
        todoItemElement.id = todoItem.itemID;
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
        deleteButton.classList.add("button-delete-icon");
        
        const deleteIcon = document.createElement("img");
        deleteIcon.src = deleteIconImage;
        deleteIcon.alt = "Delete todoitem button";
        deleteIcon.classList.add("delete-icon");
        
        deleteButton.appendChild(deleteIcon);
        todoItemElement.appendChild(deleteButton);
        
        todoItemElement.appendChild(checkbox);
        
        let projectCard = projectCards.find(x => x.projectID == projectID);

        todoItem = new TodoItemCard(todoItemElement, todoItem.itemID, projectID, deleteButton);

        projectCard.todoItems.push(todoItem);
        projectCard.todoItemHolder.appendChild(todoItemElement);
        console.log(`Added todoItemElement to DOM ${todoItemElement.id}`);
        return todoItem;
    }

    function removeTodoItem(projectID, todoItemID) {
        console.log("removeToDoItem");
        let projectCard = projectCards.find(x => x.projectID == projectID);
        let itemCard = projectCard.todoItems.find(x => x.itemID == todoItemID);
        
        projectCard.todoItemHolder.removeChild(itemCard.element);
    }

    function clearDashboard() {
        console.log("clearDashboard")
        let projectCardHolder = document.querySelector(".project-container");
        [...projectCardHolder.children].forEach((element) => {
            if (element.classList.contains("project-card"))
                projectCardHolder.removeChild(element);
        });

        projectCards.length = 0;
    }

    function refreshTodoItemList(project) {
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

    return {createMainPage, 
        refreshProjectCardsDisplay, refreshTodoItemList, clearDashboard,
        createProjectCard, createTodoItem, removeTodoItem, removeProject,
         addProjectButton, removeProjectButton, projectCards}
}

