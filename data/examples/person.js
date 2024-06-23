var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = (function () {
    function Person(name) {
        var _this = this;
        this.greet = function () {
            return "Hello, " + _this.name;
        };
        this.name = name;
    }
    Person.prototype.greet_2 = function () {
        return "Hello 2, " + this.name;
    };
    return Person;
}());
var Greg = (function (_super) {
    __extends(Greg, _super);
    function Greg() {
        return _super.call(this, "Greg") || this;
    }
    return Greg;
}(Person));
console.log("Jane: " + new Person("Jane").greet());
console.log("Greg: " + new Greg().greet());
var tim = new Person("Tim");
console.log("Tim: " + tim.greet());
var timGreet = tim.greet;
console.log("Tim 1: " + timGreet());
var timGreet2 = tim.greet_2;
console.log("Tim 2: " + timGreet2.call(tim));
var timGreet3 = tim.greet_2;
console.log("Tim 3: " + timGreet2.toString());
//# sourceMappingURL=person.js.map