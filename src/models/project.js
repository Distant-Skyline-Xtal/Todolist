export class project {
    #complete = false;
    title;
    desc;
    projectId;
    todoItems;
    constructor(title, desc) {
        this.title = title;
        this.desc = desc;
        this.todoItems = [];
        this.#complete = false;
        this.projectId = crypto.randomUUID();
    }

    get complete() {return this.#complete; }
    set complete(value) {this.#complete = value;}
}

export class projectLocalStorage {
    complete = false;
    title;
    desc;
    projectId;
    todoItems = [];
}