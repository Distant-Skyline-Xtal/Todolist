const { format } = require("date-fns");

export class TodoItem {

    #completed = false;
    #dateCreated;
    itemID;
    priority;
    constructor(title, description, dateDue, priority) {
        this.title = title;
        this.description = description;
        this.dateDue = dateDue;
        this.priority = priority;
        this.#completed = false;
        this.#dateCreated = new Date();
        this.itemID = crypto.randomUUID();
    }

    get completed() {return this.#completed;}
    set completed(value) {this.#completed = value;}

    get dateCreated() {return format(this.#dateCreated, "dd/mm/yyyy");}
}