import { Node, MethodDeclaration, ClassDeclaration } from "ts-morph";
import Context from "../context";
import { printNode } from "../printer";
import { getApexType } from "./wDeclaration";

export default function writeMethodDeclaration(_node: Node, context: Context): string {
  let node = _node as MethodDeclaration;

  let apexCode: string = "";
  const isConstructor = node.getKindName() === "Constructor";

  let scope = "public"; // Default scope
  let isStatic = false;
  let isReadonly = false;
  let isOverride = false;

  node.getModifiers().forEach((modifier) => {
    const modifierName = modifier.getText().toLowerCase();
    switch (modifierName) {
      case "private":
        scope = "private";
        break;
      case "protected":
        scope = "protected";
        break;
      case "public":
        scope = "public";
        break;
      case "static":
        isStatic = true;
        break;
      case "readonly":
        isReadonly = true;
        break;
      case "override":
        isOverride = true;
        break;
      default:
        throw Error("Unsupported class property modifier: " + modifierName);
    }
  });

  if (isConstructor) {
    scope = "public";
  }

  apexCode += scope;

  if (!isOverride && !isReadonly && !isConstructor) {
    apexCode += " virtual";
  }

  apexCode += isOverride ? " override" : "";
  apexCode += isReadonly ? " final" : "";
  apexCode += isStatic ? " static" : "";

  let methodParams: Array<string> = [];
  node.getParameters().map((param) => {
    let name = param.getName();
    let apexType = getApexType(param.getType().getText());

    methodParams.push(apexType + " " + name);
  });

  let methodName = "__UNDEFINED__";

  // For constructors, we need to use the class name
  if (isConstructor) {
    let parentNode = node.getParent() as ClassDeclaration;
    let parentClassName = parentNode.getName() || "";
    methodName = parentClassName;
  } else {
    methodName = node.getName();
  }

  let apexReturnType = getApexType(node.getReturnType().getText());

  if (!isConstructor) {
    apexCode += " " + apexReturnType;
  }

  apexCode += " " + methodName;
  apexCode += "(";
  apexCode += methodParams.join(", ");
  apexCode += ")";

  // methodApexCode += constructor.getText() + "\n";
  const body = node.getBody();
  if (body) {
    apexCode += printNode(body, context);
  } else {
    apexCode += ";";
  }

  apexCode += "\n";

  return apexCode;
}
