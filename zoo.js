class Animal{
    constructor(name, age){
        if(name.trim() == ""){
            throw new Error("Имя не может быть пустым");
        }
        if(age<0){
            throw new Error("Возраст не может быть меньше нуля");
        }

        this.name = name;
        this.age = age;
    }

    info(){
        return `${this.name}, ${this.age} г.`;
    }

    voice(){
        return "....";
    }

    speak(){
        return `${this.name}: ${this.voice()}`;
    }
}


class Cat extends Animal{
    constructor(name, age){
        super(name, age);
    }

    voice(){
        return "Myau";
    }
}

class Dog extends Animal{
    constructor(name, age, breed){
        super(name, age);
        this.breed = breed;
    }

    voice(){
        return "Gav";
    }

    info(){
        return `Breed - ${this.breed}, ${super.info()}`; 
    }
}

class Parrot extends Animal{
    constructor(name, age, word){
        super(name, age);
        this.word = word;
    }

    voice(){
        return `${this.word} ${this.word}`;
    }
}

class ZooError extends Error{
    constructor(message){
        super(message);
        this.name = "ZooError";
    }
}

class Zoo {
    #animals = [];

    add(animal) {
        if (!(animal instanceof Animal)) {
            throw new ZooError("Это не животное");
        }

        for (let i = 0; i < this.#animals.length; i++) {
            if (this.#animals[i].name === animal.name) {
                throw new ZooError(`${animal.name} уже есть`);
            }
        }

        this.#animals.push(animal);
    }

    get size() {
        return this.#animals.length;
    }

    oldest() {
        if (this.#animals.length == 0) {
            return null;
        }

        let oldestAnimal = this.#animals[0]

        for (let i = 0; i < this.#animals.length; i++) {
            if (this.#animals[i].age > oldestAnimal.age) {
                oldestAnimal = this.#animals[i];
            }
        }

        return oldestAnimal.name;
    }
}




const barsik = new Cat("Barsik", 4);
const reks = new Dog("Reks", 2, "Hasmut");
const kesha = new Parrot("Kesha", 3, "Hi");

try{
    const testAnimal = new Cat("  ", 0);
}catch(e){
    console.log(e.message);
}


console.log(barsik.info() + " | " + reks.info());
console.log(barsik.speak());
console.log(reks.speak());

let zoo = [barsik, reks, kesha];
try{
    for(let animal of zoo){
        console.log(animal.speak());
    }
}catch(e){
    console.log(e.message);
}finally{
    console.log("Проверка завершена");
}


const zooClass = new Zoo();
try{
    zooClass.add(barsik);
    zooClass.add(reks);
    zooClass.add(kesha);
    zooClass.add(barsik);
}catch(e){
    console.log(`${e.name} - ${e.message}`);
}

try{
    zooClass.add('barsik');
}catch(e){
    console.log(`${e.name} - ${e.message}`);
}

console.log(`Животных: ${zooClass.size} | Старший: ${zooClass.oldest()}`);