public class Person {
    private String name;

    public Person(String name) {
        this.name = name;
    }

    public virtual String greet() {
        return 'Hello, ' + this.name + ' aged ';
    }
}

public class Greg extends Person{
    public Greg() {
        super('Greg');
    }

     public override String greet() {
        return 'Hello, Mr. ' + this.name + ' Thomson';
    }
}

System.Debug(new Greg().greet());