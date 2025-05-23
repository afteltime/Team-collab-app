class Task {
    static STATUSES = ['published', 'pending', 'taken', 'completed'];
    static PRIORITIES = ['low', 'medium', 'high', 'critical'];

    constructor(name = 'Unnamed Task', description='', priority='medium'){
        this.name = String(name);
        this.description = String(description) ;
        this.date = new Date();
        this.priority = Task.PRIORITIES.includes(priority) ? priority : 'medium';
        this.status = 'published';
        //this.owner = roomID;
    }

    updateName(name){
        this.name = String(name);
    }
    updateDescription(description){
        this.description = String(description);
    }
    updatePriority(priority){
        if(Task.PRIORITIES.includes(priority)){
            this.priority = priority;
        }
    }
    updateStatus(status){
        if(Task.STATUSES.includes(status)){
            this.status = status;
        }
    }

}