class xPerson {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  private delay(ms: number) {
    return new Promise<void>(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  public async greet_2(): Promise<string> {
    console.log("Knock, knock!");

    await this.delay(1000);
    console.log("Who's there?");

    await this.delay(1000);
    console.log("async/await!");

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
}

console.log("Jane: " + new Person("Jane").greet());
console.log("Greg: " + new Greg().greet());
