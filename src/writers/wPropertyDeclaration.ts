import { ClassInstancePropertyTypes, ParameterDeclaration } from "ts-morph";
import Context from "../context";
import { printNode } from "../printer";
/*
  Apex Docs

    Class Variables: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_declaring_variables.htm
  
    [public | private | protected | global] [final] [static] data_type variable_name 

    Primitive Data Types: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/langCon_apex_primitives.htm

  TypeScript Docs

    TypeScript Primitive Data Types: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

  Mapping (TS => Apex)
    SHIM => Blob
    SHIM => Date
    SHIM => Datetime
    SHIM => Time
    SHIM => URL

    TBD: Array => Map/List
    
    boolean => Boolean
    number => Double
    string => String

    Custom Type (String) => ID
    Custom Type (Number) => Decimal
    Custom Type (Number) => Double
    Custom Type (Number) => Integer
    Custom Type (Number) => Long

    object => Object
    any => Object (Not currently supporting any)

    undefined => ?
    unknown => ?
    null => ?
    
    never => NOT SUPPORTED
    symbol => NOT SUPPORTED
    bigint => NOT SUPPORTED
  
  TODO
  ----------------
  - [ ] bigint: NOT SUPPORTED

*/
export default function writePropertyDeclaration(
  _member: ClassInstancePropertyTypes,
  context: Context
): string {
  let member = _member as ParameterDeclaration;
  let apexCode = "";

  // if (member.getKindName() == "PropertyDeclaration") {
  // TODO Move this out of this class
  // TODO Decorators
  // let modifier = modifier.getText();
  let scope = "private";
  let isStatic = false;
  let isReadonly = false;
  let type = member.getType().getText();
  let name = member.getName();
  let initialValue = null;

  member.getModifiers().forEach((modifier) => {
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
      default:
        throw Error("Unsupported class member modifier: " + modifierName);
    }
  });

  // Get initial value if it is set
  const initializer = member.getInitializer();
  if (initializer) {
    // TODO: Parse the initializer
    initialValue = printNode(initializer, context);
  }

  apexCode += scope;
  apexCode += " " + getApexType(type);
  apexCode += isReadonly ? " final" : "";
  apexCode += isStatic ? " static" : "";
  apexCode += " " + name;

  // Apex defaults to a null value for class properties
  if (initialValue !== null) {
    apexCode += " = ";
    apexCode += initialValue;
  }

  apexCode += ";";

  return apexCode;
}

function getApexType(type: string): string {
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
