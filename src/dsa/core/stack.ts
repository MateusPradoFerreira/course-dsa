export class Stack {
  items: any[];
  maxLength: number;
  pointer: number = 0;

  constructor (maxLength: number = 1000) {
    this.items = new Array(maxLength);
  };

  push(value: any) {
    if(this.pointer > this.maxLength) throw new Error("max limit reached!");
    this.items[this.pointer] = value;
    this.pointer++;
  };

  pop(): any {
    if(!this.items.length) throw new Error("does have no items to pop!");
    const value = this.items[this.pointer - 1];
    delete this.items[this.pointer - 1];
    this.pointer--;
    return value;
  };

  peek(): any {
    if(!this.items.length) throw new Error("does have no items to peek!");
    return this.items[this.pointer - 1];
  };

  size(): number {
    return this.pointer;
  };
};

const stack = new Stack(5);

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(5);

console.log("POP", stack.pop());
console.log("POP", stack.pop());
console.log("PEEK", stack.peek());
console.log("POP", stack.pop());
console.log("SIZE", stack.size());