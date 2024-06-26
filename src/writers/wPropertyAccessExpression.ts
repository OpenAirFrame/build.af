import { Node, PropertyAccessExpression } from "ts-morph";
import Context from "../context";
import { printNode } from "../printer";

export default function writePropertyAccessExpression(_node: Node, context: Context): string {
  let node = _node as PropertyAccessExpression;

  let apexCode: string = "";

  // apexCode += "\nPropertyAccessExpression: " + node.getFullText().trim() + "\n";

  apexCode += printNode(node.getExpression(), context);
  apexCode += ".";
  apexCode += node.getName();

  return apexCode;
}
