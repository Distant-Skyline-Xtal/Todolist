export class StorageService {
    static STORAGE_KEY = 'todoProjects';

    isStorageAvailable() {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
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

    saveData(projects) {
        try {
            if (!this.isStorageAvailable()) {
                console.warn("localStorage is not available!");
                return false;
            }

            const serializedProjects = projects.map(project => this._serializeProject(project));
            localStorage.setItem(StorageService.STORAGE_KEY, JSON.stringify(serializedProjects));
            return true;
        }
        catch(error) {
            console.error("Failed to save projects:", error);
            return false;
        }
    }

    loadData() {
        try {
            if (!this.isStorageAvailable()) {
                console.warn("localStorage is not available, cancelling load!");
                return null;
            }

            const data = localStorage.getItem(StorageService.STORAGE_KEY);
            if (!data) {
                console.log("No saved data found");
                return null;
            }

            const parsedData = JSON.parse(data);

            if (!Array.isArray(parsedData)) {
                console.warn("Invalid Data loaded");
                return null;
            }

            console.log("Successfully loaded data");
            return parsedData;

        } catch(error) {
            console.error('Failed to load projects:', error);
            return null;
        }
    }

    /**
     * Convert a project object to a serializable format
     * @private
     * @param {Object} project - Project object to serialize
     * @returns {Object} Serialized project data
     */
    _serializeProject(project) {
        return {
            projectId: project.projectId,
            title: project.title,
            description: project.description,
            complete: project.complete,
            todoItems: project.todoItems.map(item => this._serializeTodoItem(item))
        };
    }

    /**
     * Convert a todo item object to a serializable format
     * @private
     * @param {Object} todoItem - Todo item object to serialize
     * @returns {Object} Serialized todo item data
     */
    _serializeTodoItem(todoItem) {
        return {
            itemId: todoItem.itemId,
            title: todoItem.title,
            description: todoItem.description,
            dateDue: todoItem.dateDue,
            priority: todoItem.priority,
            completed: todoItem.completed,
            // Store the formatted date for display
            dateCreated: todoItem.dateCreatedFormatted
        };
    }
}