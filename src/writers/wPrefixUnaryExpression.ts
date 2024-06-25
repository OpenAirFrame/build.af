import { Node, PrefixUnaryExpression, SyntaxKind } from "ts-morph";
import Context from "../context";
import { printNode } from "../printer";

export default function writePrefixUnaryExpression(_node: Node, context: Context): string {
  let node = _node as PrefixUnaryExpression;

  // check to see if node is ts.SyntaxKind.PlusToken or ts.SyntaxKind.MinusToken

  let apexCode: string = "";

  const operand = node.getOperand();
  const operandApex = printNode(operand, context);

  switch (node.getOperatorToken()) {
    case SyntaxKind.PlusToken:
      apexCode += "+" + operandApex;
      break;
    case SyntaxKind.MinusToken:
      apexCode += "-" + operandApex;
      break;
    case SyntaxKind.MinusMinusToken:
      apexCode += "--" + operandApex;
      break;

    default:
      apexCode += "Missing Operator: " + SyntaxKind[node.getOperatorToken()] + " " + operandApex;
  }

  //   apexCode += "\n\n";
  //   apexCode += "getOperatorToken: !!" + (node.getOperatorToken() == SyntaxKind.MinusToken) + "!!\n";

  //   apexCode += "getOperand: !!" + node.getOperand().getKindName() + "!!\n";
  //   apexCode += "PrefixUnaryExpression: !!" + node.getFullText().trim() + "!!";
  //   apexCode += "\n\n";

  //ts.SyntaxKind.PlusToken
  //s.SyntaxKind.MinusToken
  return apexCode;
}
