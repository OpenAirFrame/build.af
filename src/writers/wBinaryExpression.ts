import { Node, BinaryExpression } from "ts-morph";
import Context from "../context";
import { printNode } from "../printer";

export default function writeBinaryExpression(_node: Node, context: Context): string {
  let node = _node as BinaryExpression;

  let apexCode: string = "";

  apexCode += "BinaryExpression: \n"; // + node.getFullText().trim() + "\n";

  apexCode += "  Left: " + printNode(node.getLeft(), context) + "\n";
  apexCode += "  Operation: " + node.getOperatorToken().getKindName() + "\n";
  apexCode += "  Right: " + printNode(node.getRight(), context) + "\n";

  return apexCode;
}
