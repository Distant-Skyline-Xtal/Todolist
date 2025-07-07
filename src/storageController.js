import { projectLocalStorage } from "./models/project.js";
import { project } from "./models/project.js";
import { TodoItemLocalStorage } from "./models/todoItem.js";


class dataLocalStorage {
    projects = [];
}

export class StorageController {

    storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return (
                e instanceof DOMException && 
                e.name === "QuoteExceededError" &&
                // acknowledge QuoteExceededError only if there's 
                // something already stored
                storage && 
                storage.length !== 0
            );
        }
    }

    saveData(currentData) {

        // Create new dataLocalStorage object and fill it with the current data
        let newLocalData = new dataLocalStorage();
        for (let currentProject of currentData.projects) {
            let newProjectLocalStorage = new projectLocalStorage();
            newProjectLocalStorage.title = currentProject.title;
            newProjectLocalStorage.desc = currentProject.desc;
            newProjectLocalStorage.projectID = currentProject.projectID;
            newProjectLocalStorage.complete = currentProject.complete;

            for (let currentTodoItem of currentProject.todoItems) {
                let newTodoitemLocalStorage = new TodoItemLocalStorage();
                newTodoitemLocalStorage.itemID = currentTodoItem.itemID;
                newTodoitemLocalStorage.dateCreated = currentTodoItem.dateCreatedFormatted;
                newTodoitemLocalStorage.dateDue = currentTodoItem.dateDue;
                newTodoitemLocalStorage.title = currentTodoItem.title;
                newTodoitemLocalStorage.description = currentTodoItem.description;
                newTodoitemLocalStorage.priority = currentTodoItem.priority;

                newProjectLocalStorage.todoItems.push(newTodoitemLocalStorage);
            }

            newLocalData.projects.push(newProjectLocalStorage);
        }

        // Convert to plain objects
        const plainDataObject = {...newLocalData};
        
        // save the dataLocalStorage to localStorage
        const jsonString = JSON.stringify(plainDataObject);
        localStorage.setItem("localProjectData", jsonString);
    }

    loadData() {
        // Check if there is data to load
        const loadedData = localStorage.getItem("localProjectData");
        if (loadedData) {
            const retrievedPlainObject = JSON.parse(loadedData);

            return retrievedPlainObject;
        }
        else {
            return null;
        }
    }
    
}