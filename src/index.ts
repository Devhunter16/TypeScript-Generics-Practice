// Providing a type to querySelector, <HTMLInputElement> is that type
// We're doing this because otherwise we could not be able to access the .value
// method on our inputElement because it is initially a generic <Element> type
// unless we specify
const inputElement = document.querySelector<HTMLInputElement>("#username")!;
console.dir(inputElement);

// Changing out input element's value to "Hacked!"
inputElement.value = "Hacked!";

const btn = document.querySelector<HTMLButtonElement>(".btn")!;

///////////////////////////////////////////////////////////////
// Let's make our own generic!

// Without generics... lots of repetition!
function numberIdentity(item: number): number {
  return item;
}
function stringIdentity(item: string): string {
  return item;
}
function booleanIdentity(item: boolean): boolean {
  return item;
}

// If we use "any" as the type, we can put in any type and get any type back
// function identity(item: any): any{
//   return item;
// }

// Creating out own generic... super reusable! We use "Type" as a type here 
// rather than any because now whatever type we put in, we get that same type out
function identity<Type>(item: Type): Type {
  return item;
}

// Using our generic!
identity<number>(7);
identity<string>("hello");


// Making a generic function that returns a random list element
function getRandomElement<Type>(list: Type[]): Type {
  const randIdx = Math.floor(Math.random() * list.length);
  return list[randIdx];
}

// Using our generic function!
console.log(getRandomElement<string>(["a", "b", "c"]));
getRandomElement<number>([5, 6, 21, 354, 567, 234, 654]);
// Here TypeScript is just inferring what type our generic is by what we passed in
getRandomElement([1, 2, 3, 4]);

// Generics with constraints: we're basically just saying types T and U have to be objects here
// T and U are just type naming conventions. We're just returning the intersection between T and U
function merge<T extends object, U extends object>(object1: T, object2: U) {
  return {
    ...object1,
    ...object2,
  };
}

const comboObj = merge({ name: "colt" }, { pets: ["blue", "elton"] });
console.log(merge({ name: "Colt" }, { num: 9 }));
merge<{ name: string }, { pets: string[] }>(
  { name: "colt" },
  { pets: ["blue", "elton"] }
);

interface Lengthy {
  length: number;
}

function printDoubleLength<T extends Lengthy>(thing: T): number {
  return thing.length * 2;
}

// We could also do this
// function printDoubleLength(thing: Lengthy): number {
//   return thing.length * 2;
// }

// This works because a string has a character length but a number does not
printDoubleLength("asdasd");
printDoubleLength(234); //Not allowed!

// Here we're just setting a default value to show we can
function makeEmptyArray<T = number>(): T[] {
  return [];
}

// Becuase we wrote that this defaults to number, this returns a number array
const nums = makeEmptyArray();
// Because we specified the type of array here as boolean, this returns a boolean array rather than our number default
const bools = makeEmptyArray<boolean>();

// A Generic Class Example
interface Song {
  title: string;
  artist: string;
}
interface Video {
  title: string;
  creator: string;
  resolution: string;
}

class Playlist<T> {
  public queue: T[] = [];
  add(el: T) {
    this.queue.push(el);
  }
}

const songs = new Playlist<Song>();
const videos = new Playlist<Video>();
