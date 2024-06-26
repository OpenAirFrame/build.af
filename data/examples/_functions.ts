function Private(target: Function, _: Object): void {}
function Public(target: Function, _: Object): void {}
// @ts-ignore
function Global(target: Function, _: Object): void {}

function WithoutSharing(target: Function, _: Object): void {}
function WithSharing(target: Function, _: Object): void {}
function InheritedSharing(target: Function, _: Object): void {}

// function IsTest(target: Function, _): void {}
function NamespaceAccessible(target: Function, _: Object): void {}
function SuppressWarnings(target: Function, _: Object): void {}
