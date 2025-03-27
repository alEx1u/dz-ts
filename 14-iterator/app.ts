interface typeTask  {
    id: number,
    date: Date,
    title: string 
} 

class Task implements typeTask {
    constructor(public id: number, public date : Date, public title: string,) {}
}

class TaskList {
    private tasks : Task[] = [];
    
    public addTask(task : Task) : void {
        this.tasks.push(task);
    }

    public removeTaskById(id: number) : void {
        this.tasks = this.tasks.filter(task => task.id !== id )
    }

    public getTasks() : Task[] {
        return this.tasks;
    }

    public countTasks() : number {
        return this.tasks.length;
    }

    public sortById() : Task[] {
        this.tasks = this.tasks.sort((a, b) => a.id - b.id);
        return this.tasks;
    }

    public sortByDate() : Task[] {
        this.tasks = this.tasks.sort((a, b) => a.date.getTime() - b.date.getTime())
        return this.tasks;
    }
}

interface IIterator<T> {
    current() : T | undefined,
    next() : T | undefined,
    prev() : T | undefined,
    index() : number;
    getTasks(): TaskList | undefined
}

class IdIterator implements IIterator<Task> {
    private position : number = 0;
    private taskList : TaskList;
    constructor(taskList : TaskList) {
        taskList.sortById();
        this.taskList= taskList;
    }

    current(): Task | undefined {
        return this.taskList.getTasks()[this.position];
    }
    next(): Task | undefined {
        if(this.position + 1 <= this.taskList.getTasks().length + 1) {
            this.position += 1;
            return this.taskList.getTasks()[this.position];
        } else {
            return undefined
        }
    }
    prev(): Task | undefined {
        if (this.position - 1 >= 0) {
            this.position -= 1;
            return this.taskList.getTasks()[this.position];
        } else {
            return undefined;
        }
    }
    index(): number {
        return this.position;
    }

    getTasks(): TaskList | undefined {
        return this.taskList;
    }

}

class DateIterator implements IIterator<Task> {
    private position : number = 0;
    private taskList : TaskList;
    constructor(taskList : TaskList) {
        taskList.sortByDate();
        this.taskList= taskList;
    }

    current(): Task | undefined {
        return this.taskList.getTasks()[this.position];
    }
    next(): Task | undefined {
        if(this.position + 1 <= this.taskList.getTasks().length + 1) {
            this.position += 1;
            return this.taskList.getTasks()[this.position];
        } else {
            return undefined
        }
    }
    prev(): Task | undefined {
        if (this.position - 1 >= 0) {
            this.position -= 1;
            return this.taskList.getTasks()[this.position];
        } else {
            return undefined;
        }
    }
    index(): number {
        return this.position;
    }


    getTasks(): TaskList | undefined {
        return this.taskList;
    }
 }



const tl = new TaskList();
tl.addTask(new Task(3, new Date(), 'text'));
tl.addTask(new Task(1, new Date(10000), 'srt'));
tl.addTask(new Task(2, new Date(10001), 'U a gay'));
console.log(tl);

const id = new IdIterator(tl);
console.log(id.getTasks());
console.log(id.prev());
id.next()
id.next();
console.log(id.current());
console.log(id.index())


console.log('');

const dt = new DateIterator(tl);
console.log(dt.getTasks());
console.log(dt.prev());
dt.next()
dt.next();
console.log(dt.current());
console.log(dt.index())


