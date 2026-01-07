import React from 'react';
import { Box, Layers, ArrowRight, Database, Code, RefreshCw } from 'lucide-react';

export const topicData = {
    // --- Fundamentals ---
    "Introduction": {
        title: "JavaScript Introduction",
        definition: "JavaScript is a high-level, interpreted programming language primarily used to create interactive effects within web browsers.",
        code: `// The "Hello World" of JavaScript
console.log("Hello, World!");

// Alerting the user
alert("Welcome to JS!");`,
        visualType: "text-animation",
        visualContent: "JavaScript"
    },
    "Variables": {
        title: "Variables (var, let, const)",
        definition: "Variables are containers for storing data values. In modern JS, we use 'let' and 'const' for block scope, while 'var' is function-scoped.",
        code: `let name = "John"; // Can be reassigned
const pi = 3.14;   // Cannot be reassigned
var age = 25;      // Old way (avoid if possible)`,
        visualType: "variable-visual"
    },
    "Data types": {
        title: "Data Types",
        definition: "JavaScript variables can hold many data types: numbers, strings, objects and more.",
        code: `// Primitives
let length = 16;          // Number
let lastName = "Johnson"; // String
let x = {firstName:"John", lastName:"Doe"}; // Object`,
        visualType: "list",
        visualData: ["Number", "String", "Boolean", "Undefined", "Null", "Symbol", "Object"]
    },
    "Operators": {
        title: "Operators",
        definition: "Operators are used to perform operations on variables and values (Arithmetic, Assignment, Comparison, etc.).",
        code: `let sum = 10 + 5;   // Addition
let isEqual = 5 == "5"; // true (loose equality)
let isStrict = 5 === "5"; // false (strict equality)`,
        visualType: "operator-visual"
    },
    "Type Conversion": {
        title: "Type Conversion",
        definition: "Converting a value from one data type to another (e.g., String to Number).",
        code: `let x = "123";
let y = Number(x); // 123 (Number)
let z = String(123); // "123" (String)`,
        visualType: "function-visual"
    },
    "Hoisting": {
        title: "Hoisting",
        definition: "Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope.",
        code: `x = 5; // Assign 5 to x
var x; // Declare x
// x is treated as if declared at the top`,
        visualType: "arrow",
        visualContent: "Declaration executes before Assignment"
    },

    // --- Logic Controls ---
    "Conditions": {
        title: "Conditions (if/else)",
        definition: "Conditional statements are used to perform different actions based on different conditions.",
        code: `if (hour < 18) {
  greeting = "Good day";
} else {
  greeting = "Good evening";
}`,
        visualType: "condition-interactive"
    },
    "Loops": {
        title: "Loops",
        definition: "Loops can execute a block of code a number of times.",
        code: `for (let i = 0; i < 5; i++) {
  console.log(i);
}`,
        visualType: "loop-visual"
    },
    "Functions": {
        title: "Functions",
        definition: "A JavaScript function is a block of code designed to perform a particular task.",
        code: `function myFunction(p1, p2) {
  return p1 * p2;
}`,
        visualType: "function-visual"
    },

    // --- Data Structure ---
    "Objects": {
        title: "Objects",
        definition: "Objects are variables that can contain many values as key-value pairs.",
        code: `const car = {
  type: "Fiat",
  model: "500",
  color: "white"
};`,
        visualType: "object-visual"
    },
    "Classes": {
        title: "Classes",
        definition: "Classes are templates for JavaScript Objects.",
        code: `class Car {
  constructor(name) {
    this.name = name;
  }
}
const myCar = new Car("Ford");`,
        visualType: "class-visual"
    },
    "Map, Filter, Reduce": {
        title: "Map, Filter, Reduce",
        definition: "Powerful array methods: Map transforms, Filter selects, Reduce accumulates.",
        code: `const nums = [1, 2, 3];
// map: [2, 4, 6]
// filter: [2]
// reduce: 6`,
        visualType: "array-transform-visual"
    },
    "Array Method": {
        title: "Array Methods (push/pop)",
        definition: "Array methods allow you to add or remove elements. 'push' adds to the end, 'pop' removes from the end.",
        code: `let fruits = ["🍎", "🍌", "🍇"];
fruits.push("🍊"); // Adds Orange
fruits.pop();      // Removes last element`,
        visualType: "array-interactive",
        visualData: ["🍎", "🍌", "🍇"]
    },
    "String Method": {
        title: "String Methods",
        definition: "Strings can be manipulated using methods like toUpperCase(), slice(), etc.",
        code: `let text = "Hello World";
let upper = text.toUpperCase();`,
        visualType: "function-visual"
    },
    "JSON": {
        title: "JSON",
        definition: "JSON is a format for storing and transporting data.",
        code: `let obj = {name: "John", age: 30};
let json = JSON.stringify(obj);`,
        visualType: "function-visual"
    },

    // --- DOM ---
    "DOM Basic": {
        title: "Document Object Model (DOM)",
        definition: "The DOM is a programming interface for web documents.",
        code: `const element = document.getElementById("demo");
element.innerHTML = "Hello World!";`,
        visualType: "dom-tree-visual"
    },
    "Events": {
        title: "DOM Events",
        definition: "JavaScript can 'react' on HTML events.",
        code: `btn.addEventListener('click', () => {
  console.log('Clicked!');
});`,
        visualType: "dom-event-visual"
    },
    "Web Storage": {
        title: "Web Storage API",
        definition: "Store key/value pairs in the browser (localStorage / sessionStorage).",
        code: `localStorage.setItem("name", "John");
let x = localStorage.getItem("name");`,
        visualType: "storage-visual"
    },
    "APIs": {
        title: "Web APIs (Fetch)",
        definition: "The Fetch API provides an interface for fetching resources.",
        code: `fetch('https://api.example.com/data')
  .then(res => res.json())
  .then(data => console.log(data));`,
        visualType: "api-visual"
    },
    "Cookies": {
        title: "Cookies",
        definition: "Cookies are data, stored in small text files, on your computer.",
        code: `document.cookie = "user=John";`,
        visualType: "storage-visual"
    },

    // --- Advanced E6+ ---
    "E6+ features": {
        title: "ES6+ Features",
        definition: "Modern features: Arrow Functions, Template Literals, Destructuring.",
        code: `const add = (a, b) => a + b;
const msg = \`Hello \${name}\`;`,
        visualType: "code-highlight-visual"
    },
    "Callback": {
        title: "Callbacks",
        definition: "A function passed as an argument to another function.",
        code: `function process(callback) {
  callback();
}
process(() => alert('Done'));`,
        visualType: "async-visual"
    },
    "Promise": {
        title: "Promises",
        definition: "Represents the eventual completion or failure of an async operation.",
        code: `new Promise((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
}).then(console.log);`,
        visualType: "async-visual"
    },
    "Async/Await": {
        title: "Async / Await",
        definition: "Async/Await makes promises easier to write.",
        code: `async function run() {
  let val = await myPromise();
  console.log(val);
}`,
        visualType: "async-visual"
    },
    "Modules": {
        title: "Modules",
        definition: "Break up code into separate files.",
        code: `import { name } from "./person.js";`,
        visualType: "module-visual"
    },
    "Proxies": {
        title: "Proxies",
        definition: "Intercept and redefine operations for an object.",
        code: `const p = new Proxy({}, {
  get: (obj, prop) => 37
});`,
        visualType: "proxy-visual"
    },
    "Iterators": {
        title: "Iterators",
        definition: "Objects implementing the iterator protocol.",
        code: `function* gen() { yield 1; yield 2; }
const g = gen();
g.next();`,
        visualType: "iterator-visual"
    },

    // Default fallback
    "default": {
        title: "Select a Topic",
        definition: "Please select a topic from the sidebar menu to view its details.",
        code: "// No code selected",
        visualType: "info",
        visualContent: "Select using the menu on the left."
    }
};
