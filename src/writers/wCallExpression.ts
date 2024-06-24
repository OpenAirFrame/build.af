import { Node, CallExpression } from "ts-morph";
import Context from "../context";

export default function writeCallExpression(_node: Node, context: Context): string {
  let node = _node as CallExpression;

  let apexCode: string = "";

  apexCode += "CallExpression: " + node.getFullText().trim();

  return apexCode;
}
