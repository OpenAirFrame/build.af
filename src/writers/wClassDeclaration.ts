import { Node, ClassDeclaration } from "ts-morph";
import { ApexClassModifier, ApexClassExtension } from "../apexDef";
import Context from "../context";
import { AbstractKeyword } from "@ts-morph/common/lib/typescript";
import { error } from "console";

// import writePropertyDeclaration from "./wPropertyDeclaration";
// import { printNode } from "../printer";

/* 
  Apex Docs
  
  Class: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_defining.htm
    
  private | public | global 
  [virtual | abstract | with sharing | without sharing] 
  class ClassName [implements InterfaceNameList] [extends ClassName] 
  { 
    // The body of the class
  }
    ---
  Annotations: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation.htm
    Class
      @IsTest(SeeAllData=true)
      @JsonAccess(serializable='samePackage' deserializable=’sameNamespace’)
      @NamespaceAccessible
      @RestResource(urlMapping='/MyRestResource/*')
      @SuppressWarnings

    Method
      @AuraEnabled(cacheable=true scope='global')
      @Deprecated
      @Future (callout=true)
      @HttpDelete
      @HttpGet
      @HttpPatch
      @HttpPost
      @HttpPut
      @InvocableMethod(label='Get Account Names' description='Returns the list of account names corresponding to the specified account IDs.' category='Account')
      @InvocableMethod(label='Convert Leads')
      @IsTest(SeeAllData=true)
      @NamespaceAccessible
      @ReadOnly
      @RemoteAction
      @SuppressWarnings
      @TestSetup
      @TestVisible
*/

export default function writeClassDeclaration(node: Node, context: Context): string {
  // We are sure the node is a ClassDeclaration
  let classNode = node as ClassDeclaration;

  let apexCode: string = "";
  let name: string = "";
  let modifier: ApexClassModifier = ApexClassModifier.Private;
  let extension: ApexClassExtension = ApexClassExtension.None;
  let interfaceClassNames: Array<string> = [];
  let extendingClassName: string = "";
  let classBody: string = "\n// The body of the class";
  let isAbstract: boolean = false;

  // Get class name
  name = classNode.getName() || "";
  isAbstract = classNode.getAbstractKeyword() ? true : false;

  classNode.getDecorators().forEach((decorator) => {
    const decoratorName = decorator.getFullName().toLowerCase();

    if (decoratorName === "api") {
      // Set API value in context and continue
      const version: number = Number.parseFloat(decorator.getArguments()[0].getText());
      context.setApiVersion(version);
      return;
    }

    switch (decoratorName) {
      case "private":
        modifier = ApexClassModifier.Private;
        break;
      case "public":
        modifier = ApexClassModifier.Public;
        break;
      case "global":
        modifier = ApexClassModifier.Global;
        break;
      case "withsharing":
        extension = ApexClassExtension.WithSharing;
        break;
      case "withoutsharing":
        extension = ApexClassExtension.WithoutSharing;
        break;
      case "inheritedsharing":
        extension = ApexClassExtension.InheritedSharing;
        break;

      default:
      // TODO: Add more checks
      //apexCode += decorator.getFullText().trim() + "\n";
    }
  });

  // Class Interfaces
  // interfaceClassNames.push("InterfaceName");
  // interfaceClassNames.push("AnotherInterfaceName");

  // Class Extending Class
  // extendingClassName = "AbstractClassName";

  /*
     Start generating Apex code
  */

  // Add Comments
  // apexCode += "// Class comments go here\n";

  // Get class decorators

  // Modifier defaults to private
  apexCode += modifier; // private | public | global

  // Extension is optional
  if (extension !== ApexClassExtension.None) {
    apexCode += " " + extension; // virtual | abstract | with sharing | without sharing
  }

  // Name is required
  apexCode += " class " + name;

  // Implements are optional
  if (interfaceClassNames.length > 0) {
    apexCode += " implements " + interfaceClassNames.join(", ");
  }

  // Extending is optional
  if (extendingClassName !== "") {
    apexCode += " extends " + extendingClassName;
  }

  // Add opening body tag
  apexCode += " {\n";

  // Get all class members
  const members = classNode.getInstanceProperties();
  if (members.length) {
    apexCode += "  // Members\n";
    members.forEach((member) => {
      // if (member.getKindName() == "PropertyDeclaration") {
      // TODO Move this out of this class
      // TODO Decorators
      // let modifier = modifier.getText();
      let scope = "private";
      let isStatic = false;
      let isReadonly = false;

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
            throw error("Unsupported class member modifier: " + modifierName);
        }
      });

      apexCode += "  " + scope + " " + member.getType().getText() + " " + member.getName() + ";\n";
      // console.log("strig", member.getType().isString());
      // console.log("number", member.getType().isNumber());
      // console.log("kk1", member.getType().getText());

      // } else {
      //   throw error("Unsupported class member type: " + member.getKindName());
      // }
    });
  }

  // node.forEachChild((child) => {
  // apexCode += printNode(child) + "\n";
  // });

  // node.members.forEach((member) => {
  //   if (ts.isPropertyDeclaration(member)) {
  //     apexCode += writePropertyDeclaration(member) + "\n";
  //   } else {
  //     // apexCode += printNode(member) + "\n";
  //     apexCode += "TODO" + "\n";
  //   }
  // });

  // Add body with indentation
  apexCode += "  " + classBody.split("\n").join("\n  ");

  // Add closing body tag
  apexCode += "\n}\n";

  return apexCode;
}
