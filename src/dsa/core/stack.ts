import { DoublyLinkedList } from "./linked-list";

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

export class DllStack {
  list: DoublyLinkedList = new DoublyLinkedList();
  size: number = 0;

  push(value: any) {
    this.list.addToEnd(value);
    this.size++;
  };

  pop(): any {
    if(!this.list.tail) throw new Error("does have no items to pop!");
    this.size--;
    return this.list.removeFromEnd();
  };

  peek(): any {
    if(!this.list.tail) throw new Error("does have no items to peek!");
    return this.list.tail.value;
  };
};

export class MinStack {
  stack: number[] = [];
  minStack: number[] = [];
  
  push(value: number) {
    this.stack.push(value);
    const prevMinValue = this.minStack[this.minStack.length - 1];
    const minValue = prevMinValue <= value? prevMinValue : value;
    this.minStack.push(minValue);
  };

  pop(): number {
    this.minStack.pop();
    return this.stack.pop();
  };

  top(): number {
    return this.stack[this.stack.length - 1];
  };

  min(): number {
    return this.minStack[this.minStack.length - 1];
  };
};