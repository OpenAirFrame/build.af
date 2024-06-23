function Private(target: Function, _): void {}
function Public(target: Function, _): void {}
// @ts-ignore
function Global(target: Function, _): void {}

function WithoutSharing(target: Function, _): void {}
function WithSharing(target: Function, _): void {}
function InheritedSharing(target: Function, _): void {}

// function IsTest(target: Function, _): void {}
function NamespaceAccessible(target: Function, _): void {}
function SuppressWarnings(target: Function, _): void {}

function IsTest(
  arg0: Object = {}
): (
  target: typeof PrivatePerson,
  context: ClassDecoratorContext<typeof PrivatePerson>
) => void | typeof PrivatePerson {
  throw new Error("Function not implemented.");
}


// function IsTest(SeeAllData: boolean) { return function (target: Function, _) {};}
function RestResource(SeeAllData: boolean) { return function (target: Function, _) {};}
function JsonAccess(SeeAllData: boolean) { return function (target: Function, _) {};}



@IsTest({SeeAllData:true})
@JsonAccess(serializable='samePackage' deserializable=’sameNamespace’)
@NamespaceAccessible
@RestResource(urlMapping='/MyRestResource/*')
@SuppressWarnings
class DefaultPersonx {
  name: String;
  age: number;
}

@WithSharing
@private
abstract class PrivatePerson {
  name: String;
  age: number;
}

@public
@IsTest
@InheritedSharing
class PublicPerson {
  name: String;
  age: number;
}

@global
@WithoutSharing
class GlobalPerson {
  name: String;
  age: number;
}
