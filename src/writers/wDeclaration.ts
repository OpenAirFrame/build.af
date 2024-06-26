import { ParameterDeclaration, VariableDeclaration } from "ts-morph";
import Context from "../context";
import { printNode } from "../printer";

export default function writeDeclaration(
  declaration: VariableDeclaration | ParameterDeclaration,
  context: Context,
  includeType: boolean = true
): string {
  let apexCode = "";

  //InitializerExpressionableNode

  let type = declaration.getType().getText();
  let name = declaration.getName();
  let initialValue = null;

  // Get initial value if it is set
  const initializer = declaration.getInitializer();
  if (initializer) {
    // TODO: Parse the initializer
    initialValue = printNode(initializer, context);
  }

  apexCode += includeType ? getApexType(type) + " " : "";
  apexCode += name;

  // Apex defaults to a null value for class properties
  if (initialValue !== null) {
    apexCode += " = ";
    apexCode += initialValue;
  }

  return apexCode;
}

export function getApexType(type: string): string {
  // Trim array brackets
  const rootType = type.replace("[]", "");
  const arrayBrackets = type.substring(rootType.length);
  let apexType = rootType;

  switch (rootType.toLocaleLowerCase()) {
    case "boolean":
      apexType = "Boolean";
      break;
    case "string":
      apexType = "String";
      break;
    case "number":
      apexType = "Double";
      break;
    case "id":
      apexType = "ID";
      break;
    case "decimal":
      apexType = "Decimal";
      break;
    case "double":
      apexType = "Double";
      break;
    case "integer":
      apexType = "Integer";
      break;
    case "long":
      apexType = "Long";
      break;
    default:
    // Unknown type - no transformation
  }

  return apexType + arrayBrackets;
}
