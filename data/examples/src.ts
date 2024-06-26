class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  public greet_2(): string {
    return "Hello 2, " + this.name;
  }

  greet = (): string => {
    return "Hello, " + this.name;
  };
}

class Greg extends Person {
  constructor() {
    super("Greg");
  }

  // greet(): string {
  // return "Hello, Mr. " + this.name + " Thomson";
  // }
}

// console.log("Jane: " + new Person("Jane").greet());
// console.log("Greg: " + new Greg().greet());

const tim: Person = new Person("Tim");
console.log("Tim: " + tim.greet.abc());
// const timGreet: Function = tim.greet;
// console.log("Tim 1: " + timGreet());
// const timGreet2: Function = tim.greet_2;
// console.log("Tim 2: " + timGreet2.call(tim));
// const timGreet3: Function = tim.greet_2;
// console.log("Tim 3: " + timGreet2.toString());
