export class project {
    #complete = false;
    title;
    desc;
    projectID;
    todoItems;
    constructor(title, desc) {
        this.title = title;
        this.desc = desc;
        this.todoItems = [];
        this.#complete = false;
        this.projectID = crypto.randomUUID();
    }

    get complete() {return this.#complete; }
    set complete(value) {this.#complete = value;}
}