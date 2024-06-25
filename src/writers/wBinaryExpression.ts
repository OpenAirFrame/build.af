import { Node, BinaryExpression } from "ts-morph";
import Context from "../context";
import { printNode } from "../printer";

export default function writeBinaryExpression(_node: Node, context: Context): string {
  let node = _node as BinaryExpression;

  let apexCode: string = "";
  let operator = node.getOperatorToken().getKindName();
  let left = printNode(node.getLeft(), context);
  let right = printNode(node.getRight(), context);

  switch (operator) {
    case "PlusToken":
      apexCode += left + " + " + right;
      break;
    case "MinusToken":
      apexCode += left + " - " + right;
      break;
    case "SlashToken":
      apexCode += left + " / " + right;
      break;
    case "AsteriskToken":
      apexCode += left + " * " + right;
      break;
    case "PercentToken":
      apexCode += "Math.mod(" + left + ", " + right + ")";
      break;

    case "AsteriskAsteriskToken":
      apexCode += "Math.pow(" + left + ", " + right + ")";
      break;
    case "CaretToken":
      apexCode += left + " ^ " + right;
      break;

    default:
      apexCode += left + " **" + node.getOperatorToken().getKindName() + "** " + right;
  }

  return apexCode;
}
