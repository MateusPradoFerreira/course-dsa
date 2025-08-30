export class MinHeap {
  heap: number[] = [];

  constructor (initialValues: number[] = []) {
    for (let value of initialValues) this.insert(value);
  };

  private _getLeftNode(index: number): number {
    return 2 * index + 1;
  };

  private _getRightNode(index: number): number {
    return 2 * index + 1;
  };

  private _getParentNode(index: number): number {
    return Math.floor((index - 1) / 2);
  };

  private _heapifyUp(index: number) {
    if(!index) return;

    const parentIndex = this._getParentNode(index);
    if(this.heap[index] < this.heap[parentIndex]) {
      const heapValue = this.heap[index];
      this.heap[index] = this.heap[parentIndex];
      this.heap[parentIndex] = heapValue;
      this._heapifyUp(parentIndex);
    };
  };

  private _heapifyDown(index: number) {
    const size = this.heap.length;

    const leftIndex = this._getLeftNode(index);
    const rightIndex = this._getRightNode(index);

    let smallestIndex = index;
    if(leftIndex < size && this.heap[leftIndex] < this.heap[smallestIndex]) smallestIndex = leftIndex;
    if(rightIndex < size && this.heap[rightIndex] < this.heap[smallestIndex]) smallestIndex = rightIndex;

    if(smallestIndex === index) return;

    const heapValue = this.heap[index];
    this.heap[index] = this.heap[smallestIndex];
    this.heap[smallestIndex] = heapValue;
    this._heapifyDown(smallestIndex);
  };

  insert(value: number) {
    this.heap.push(value);
    this._heapifyUp(this.heap.length - 1);
  };

  pop(): number {
    if(!this.heap.length) throw new Error("Heap Is Empty");
    if(this.heap.length) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown(0);

    return root;
  };

  print() {
    let level = 0;
    let count = 1;
    let output = "";

    for (let i = 0; i < this.heap.length; i++) {
      output += this.heap[i] + " ";
      
      if (i !== count - 1) continue;
      console.log(output.trim());
      output = "";
      level++;
      count += Math.pow(2, level);
    };

    if (output.length) console.log(output.trim());
  };
};

const heap = new MinHeap([0,4,3,2,5,3,54,3,5,1]);
heap.print();