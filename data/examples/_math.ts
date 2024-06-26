let x = 0;
let str0: string = "Add: " + (64 + x);
let str1: string = "Sub: " + (64 - x++);
let str3: string = "Div: " + 64 / 2 + x--;
let str4: string = "Mul: " + ((64 * 2) / 1) * x++ * x++ * --x;
let str5: string = "Mod: " + (-64 + 2);
let str6: string = "Exp: " + 2 ** 3;

console.log("Add: " + str0, 5, "ok");
console.log("Sub: " + str1);
console.log("Div: " + str3);
console.log("Mul: " + str4);
console.log("Mod: " + str5);
console.log("Exp: " + str6);
