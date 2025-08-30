export class DllNode {
  value: any = null;
  prev: DllNode = null;
  next: DllNode = null;

  constructor (value?: any) {
    if(value) this.value = value;
  };
};

export class DoublyLinkedList {
  head: DllNode = null;
  tail: DllNode = null;

  addToFront(value: any) {
    let newNode = new DllNode(value);
    newNode.next = this.head;
    if(this.head) {
      this.head.prev = newNode;
    } else {
      this.tail = newNode;
    };
    this.head = newNode;
  };

  addToEnd(value: any) {
    let newNode = new DllNode(value);
    newNode.prev = this.tail;
    if(this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    };
    this.tail = newNode;
  };

  removeFromFront() {
    if(!this.head) return null;
    let removedValue = this.head.value;
    this.head = this.head.next;
    if(this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    };
    return removedValue;
  };

  removeFromEnd() {
    if(!this.tail) return null;
    let removedValue = this.tail.value;
    this.tail = this.tail.prev
    if(this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    };
    return removedValue;
  };

};