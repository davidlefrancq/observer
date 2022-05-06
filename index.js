class Observer {

    update(event) {
        if(this.eventIsRelevant(event)) {
            this.reactToEvent(event)
        }
    }

    eventIsRelevant() {
        throw new Error("This needs to be implemented")
    }

    reactToEvent() {
        throw new Error("This needs to be implemented")
    }
}

class Subject {

    constructor() {
        this.observers = [];
    }

    addObserver(obs) {
        this.observers.push(obs)
    }

    notifyObservers(event) {
        this.observers.forEach( o => o.update(event))
    }
}

class Human extends Observer {

    constructor() {
        super()
    }

    eventIsRelevant(evnt) {
        return (evnt instanceof TvResponse)
    }

    reactToEvent(evnt) {
        console.log("----------------------")
        console.log("Program TV")
        console.log(evnt.index, evnt.program)
        console.log("----------------------")
    }
}

class Tv extends Subject {

    constructor(first, last) {
        super()
        this.programs = ['Sheet News','Weather Report','Matrix','The Witcher'];
        this.selected = 0;
    }

    changeChanel(index) {
        this.index = index;
        const response = new TvResponse(this.index, this.programs[this.index]);
        this.notifyObservers(response);
    }
}

class TvResponse {
    constructor(index, program){
        this.index = index;
        this.program = program;
    }
    /**
     * @type number
     */
    index;

    /**
     * @type string
     */
    program;
}

const tv = new Tv();

const will = new Human();
tv.addObserver(will);


tv.changeChanel(1);


const anderson = new Human();
tv.addObserver(anderson);

tv.changeChanel(2);