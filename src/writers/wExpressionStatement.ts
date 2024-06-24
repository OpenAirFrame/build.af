import { Node, ExpressionStatement } from "ts-morph";
import Context from "../context";
import { printNode } from "../printer";

export default function writeExpressionStatement(_node: Node, context: Context): string {
  let node = _node as ExpressionStatement;

  let apexCode: string = "";

  // Assume expression statement has one child based on AST examples so far
  const expression = node.getFirstChild();

  if (expression) {
    apexCode += printNode(expression, context);
  }

  return apexCode;
}
