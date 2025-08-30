import { Stack } from "../core/stack";

export function dailyTemperatures(temperatures: number[]) {
  const results = temperatures.map(() => 0);
  const stack = new Stack();

  for (let [key, temperature] of Object.entries(temperatures)) {
    const index = Number(key);
    while (stack.size() && temperatures[stack.peek()] < temperature) {
      let stackIndex = stack.pop();
      results[stackIndex] = index - stackIndex;
    };
    stack.push(index);
  };

  return results;
};

console.log(dailyTemperatures([24,25,21,28,27,27,32]));