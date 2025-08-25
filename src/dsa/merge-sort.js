class DllNode {
  value = null;
  prev = null;
  next = null;

  constructor (value) {
    this.value = value;
  };
};

class DoublyLinkedList {
  head = null;
  tail = null;

  addToFront(value) {
    let newNode = new DllNode(value);
    newNode.next = this.head;
    if(this.head) {
      this.head.prev = newNode;
    } else {
      this.tail = newNode
    }
    this.head = newNode
  };

  addToEnd(value) {
    let newNode = new DllNode(value);
    newNode.prev = this.tail;
    if(this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode
    }
    this.tail = newNode
  };

  removeFromFront() {
    if(!this.head) return null;
    let removedValue = this.head.value;
    this.head = this.head.next
    if(this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    return removedValue;
  }

  removeFromEnd() {
    if(!this.tail) return null;
    let removedValue = this.tail.value;
    this.tail = this.tail.prev
    if(this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    return removedValue;
  }

};

function getValues(head) {
    const list = [];
    while (head) {
        list.push(head.value)
        head = head?.next
    }

    return list
}

function findMiddle(head) {
    let slow = head;
    let fast = head?.next;

    while (fast && fast?.next) {
        slow = slow.next
        fast = fast.next.next
    };

    return slow;
};

function merge(l1, l2) {
    let head = new DllNode(null);
    let tail = head;

    while (l1 && l2) {
        if (l1.value < l2.value) {
            tail.next = l1
            l1 = l1.next
        } else {
            tail.next = l2
            l2 = l2.next
        }
        tail = tail.next
    }

    tail.next = l1 || l2
    return head.next
}

function mergesort(head) {
    if(!head || !head.next) {
        return head
    }

    let middle = findMiddle(head)
    let after_middle = middle.next 
    middle.next = null

    let left = mergesort(head)
    let right = mergesort(after_middle);

    let sorted = merge(left, right);
    return sorted;
};

const list = new DoublyLinkedList();

list.addToEnd(1);
list.addToEnd(5);
list.addToEnd(6);
list.addToEnd(3);
list.addToEnd(2);
list.addToEnd(4);

console.log(getValues(mergesort(list.head)))