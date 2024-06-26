import { ClassInstancePropertyTypes, ParameterDeclaration } from "ts-morph";
import Context from "../context";
import writeDeclaration from "./wDeclaration";
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
  _property: ClassInstancePropertyTypes,
  context: Context
): string {
  let property = _property as ParameterDeclaration;
  let apexCode = "";

  // if (property.getKindName() == "PropertyDeclaration") {
  // TODO Move this out of this class
  // TODO Decorators
  // let modifier = modifier.getText();
  let scope = "protected";
  let isStatic = false;
  let isReadonly = false;

  property.getModifiers().forEach((modifier) => {
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
        throw Error("Unsupported class property modifier: " + modifierName);
    }
  });

  apexCode += scope;
  apexCode += isReadonly ? " final" : "";
  apexCode += isStatic ? " static" : "";
  apexCode += " " + writeDeclaration(property, context);
  apexCode += ";";

  return apexCode;
}
