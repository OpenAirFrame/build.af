class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  public greet(): string {
    return this.greet_x(this.name);
  }

  greet_x = (who: String): string => {
    return "Hello XX, " + who;
  };
}

class Greg extends Person {
  constructor() {
    super("Greg");
  }

  // Need to inherit the parent scope
  public override greet(): string {
    return "Hello, Mr. " + this.name + " Thomson";
  }
}

console.log("Jane: " + new Person("Jane").greet());
console.log("Greg: " + new Greg().greet());
