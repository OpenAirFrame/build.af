import { Node, ArrowFunction } from "ts-morph";
import Context from "../context";

export default function writeArrowFunction(_node: Node, context: Context): string {
  let node = _node as ArrowFunction;

  let apexCode: string = "";

  apexCode += "ArrowFunction: " + node.getFullText().trim();

  return apexCode;
}
