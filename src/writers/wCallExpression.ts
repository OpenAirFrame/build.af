import { Node, CallExpression, LeftHandSideExpression } from "ts-morph";
import Context from "../context";
import { printNode } from "../printer";

import getBuiltIn from "../builtins";

export default function writeCallExpression(_node: Node, context: Context): string {
  let node = _node as CallExpression;

  let apexCode: string = "";

  const expressions: LeftHandSideExpression = node.getExpression();
  const args: Array<Node> = node.getArguments();
  let firstExpressionCode = expressions.getFirstChild()?.getFullText().trim();

  // console.log("expression: ", expressions.getFullText().trim());

  // console.log("expression Kind: ", expressions.getKindName());
  const expressionParts: Array<Node> = [];
  switch (expressions.getKindName()) {
    case "Identifier":
    case "SuperKeyword":
      expressionParts.push(expressions);
      break;
    case "PropertyAccessExpression":
      expressions.getChildren().forEach((expression) => {
        expressionParts.push(expression);
      });
      break;
    default:
      throw Error("Unknown expression type: " + expressions.getKindName());
  }

  const firstExpressionPart = expressionParts[0];

  // Check to see if a builtin should handle this call
  const builtin = getBuiltIn(firstExpressionPart.getFullText().trim());

  apexCode += builtin.handleCallExpression(expressionParts, args, context);

  // apexCode += ";X";

  return apexCode;
}
