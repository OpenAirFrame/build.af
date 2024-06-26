import {
  Node,
  PropertyDeclaration,
  OptionalKind,
  MethodDeclarationStructure,
  ArrowFunction,
  Scope,
} from "ts-morph";
import Context from "../context";
import { getApexType } from "../writers/wDeclaration";

export default function transformPropertyDeclaration(_node: Node, context: Context): void {
  let node = _node as PropertyDeclaration;

  const initializer = node.getInitializer();
  if (initializer && initializer.getKindName() === "ArrowFunction") {
    // Transform arrow function to method
    const parentClass = node.getParent();
    const arrowFunction = initializer as ArrowFunction; // Arrow function

    const type = node.getType();

    const newMethod: OptionalKind<MethodDeclarationStructure> = {
      name: node.getName(),
    };

    newMethod.isStatic = false;
    newMethod.isAbstract = false;
    newMethod.isAsync = false;
    newMethod.scope = Scope.Public;

    const x = arrowFunction.getType();
    // newMethod.returnType = arrowFunction.getType().getText();
    newMethod.statements = arrowFunction.getBodyText();

    arrowFunction.getParameters().forEach((param) => {
      let name = param.getName();
      let apexType = getApexType(param.getType().getText());

      if (!newMethod.parameters) {
        newMethod.parameters = [];
      }

      newMethod.parameters.push({
        name: name,
        type: apexType,
      });
    });

    // parentClass.addMethod(newMethod);
    parentClass.insertMethod(0, newMethod);
    node.remove();
  }
}
