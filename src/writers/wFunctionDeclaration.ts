import { Node, FunctionDeclaration } from "ts-morph";
import Context from "../context";
import writeMethodDeclaration from "./wMethodDeclaration";
export default function writeFunctionDeclaration(_node: Node, context: Context): string {
  let node = _node as FunctionDeclaration;

  let apexCode: string = "";

  // TODO - Move functions to a class
  apexCode += writeMethodDeclaration(node, context);
  //   apexCode += "FunctionDeclaration: " + node.getFullText().trim();

  return apexCode;
}
