class DefaultPerson {
  name: string;
  age: number;
  public pubicName: string;
  private static privateAge: number;
  protected protectedNames: Array<string>;
  static readonly staticAge: boolean;
}

// @WithSharing
// @Private
// @IsTest
// abstract class PrivatePerson {
//   name: string;
//   age: number;
// }

// @IsTest
// @InheritedSharing
// class PublicPerson {
//   name: string;
//   age: number;
// }

// @Global
// @WithoutSharing
// class GlobalPerson {
//   name: string;
//   age: number;
// }
