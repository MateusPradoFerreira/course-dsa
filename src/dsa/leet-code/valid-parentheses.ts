import { Stack } from "../core/stack"

export function isValidParentheses(str: string): boolean {
  const stack = new Stack();
  const mapping: any = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (let char of str.split("")) {
    if(char in mapping) {
      if(stack.size() && (stack.peek() === mapping[char])) {
        stack.pop();
        continue;
      };

      return false;
    };

    stack.push(char);
  };


  return !stack.size();
};

console.log("()", isValidParentheses("()"));
console.log("()[]{}", isValidParentheses("()[]{}"));
console.log("(}", isValidParentheses("(}"));