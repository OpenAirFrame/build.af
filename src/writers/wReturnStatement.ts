import { Node, ReturnStatement } from "ts-morph";
import Context from "../context";
import { printNode } from "../printer";

export default function writeReturnStatement(_node: Node, context: Context): string {
  let node = _node as ReturnStatement;

  let apexCode: string = "";

  apexCode += "return";

  const expression = node.getExpression();
  if (expression) {
    apexCode += " " + printNode(expression, context);
  }

  apexCode += ";";

  return apexCode;
}
