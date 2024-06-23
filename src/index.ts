import path from "path";
import { ts2apex } from "./transpile";

console.log("TS2APEX");
console.log("=======");

console.log(ts2apex(path.resolve(__dirname + "/../data/examples/src.ts")));
console.log();
