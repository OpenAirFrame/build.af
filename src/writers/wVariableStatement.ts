import { Node, VariableStatement, NodeFlags, VariableDeclaration } from "ts-morph";
import Context from "../context";
import writeDeclaration from "./wDeclaration";

export default function writeVariableStatement(_node: Node, context: Context): string {
  let node = _node as VariableStatement;

  let apexCode: string = "";
  let isConst = false;

  const declarationKind = node.getDeclarationKind();
  isConst = declarationKind === "const";

  apexCode += isConst ? "final " : "";

  // Loop through declarations
  const declarations = node.getDeclarations();
  let idx = 0;
  declarations.forEach((declaration) => {
    apexCode += writeDeclaration(declaration, context, idx === 0);
    if (idx < declarations.length - 1) {
      apexCode += ", ";
    }
    idx++;
  });

  apexCode += ";";

  return apexCode;
}
