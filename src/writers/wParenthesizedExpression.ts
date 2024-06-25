import { Node, ParenthesizedExpression } from "ts-morph";
import Context from "../context";
import { printNode } from "../printer";

export default function writeIParenthesizedExpression(_node: Node, context: Context): string {
  let node = _node as ParenthesizedExpression;

  let apexCode: string = "";

  // Assume expression statement has one child based on AST examples so far
  const expression = node.getExpression();
  apexCode += "(";
  apexCode += printNode(expression, context);
  apexCode += ")";

  return apexCode;
}
