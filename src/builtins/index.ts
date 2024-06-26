import _default from "./baseCallExpression";
import _console from "./console";

const map: { [key: string]: typeof _default } = { console: _console };

export default function getBuiltIn(name: string) {
  return map[name] || _default;
}
