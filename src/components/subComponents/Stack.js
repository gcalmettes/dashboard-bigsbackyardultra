export class Stack {
  constructor(startingList = []){
    this.startingItems = startingList
    this.items = startingList.slice();
  }

  push(element){
    // push element into the items
    this.items.push(element);
  }

  pop(){
    // return top most element in the stack
    // and removes it from the stack
    // cycle over starting list if stack is empty
    if (this.items.length === 0) this.items = this.startingItems.slice()
    return this.items.pop();
  }

  peek(){
    // return the top most element from the stack
    // but does'nt delete it.
    return this.items[this.items.length - 1];
  }

  isEmpty(){
    // return true if stack is empty
    return this.items.length === 0;
  }

  printStack(){
    return this.items.join(" ");
  }
}