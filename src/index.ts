// Utility type for extracting the type of array elements
type ElementType<T extends readonly any[]> = T extends readonly (infer U)[] ? U : never;

// Example: Extracting the element type from an array
const numbers: number[] = [1, 2, 3, 4];
type NumberElement = ElementType<typeof numbers>; // number

// Type-safe function using generics and constraints
function merge<T extends object, U extends object>(objA: T, objB: U): T & U {
  return { ...objA, ...objB };
}

const mergedObj = merge({ name: 'John' }, { age: 30 });
// mergedObj is { name: 'John'; age: 30; }

// Using mapped types for partial updates
type User = {
  id: number;
  name: string;
  age: number;
};

type PartialUpdate<T> = {
  [P in keyof T]?: T[P];
};

const updateUser = (id: number, update: PartialUpdate<User>): User => {
  const user: User = { id, name: 'Jane', age: 25 }; // Mock user
  return { ...user, ...update };
};

const updatedUser = updateUser(1, { name: 'John' });
// updatedUser is { id: 1, name: 'John', age: 25 }

// Function overloads
function reverse(value: string): string;
function reverse(value: number[]): number[];
function reverse(value: string | number[]): string | number[] {
  if (typeof value === 'string') {
    return value.split('').reverse().join('');
  } else {
    return value.slice().reverse();
  }
}

const reversedString = reverse('hello'); // 'olleh'
const reversedArray = reverse([1, 2, 3]); // [3, 2, 1]

// Example of using utility types with classes
class Person {
  constructor(public name: string, public age: number) {}
}

type ReadOnlyPerson = Readonly<Person>;

const person: ReadOnlyPerson = new Person('Alice', 28);
// person.name = 'Bob'; // Error: Cannot assign to 'name' because it is a read-only property.