export interface FallbackQuestion {
	question: string;
	choices: string[];
	correctIndex: number;
  }
  
export const fallbackQuestion: Record<string, FallbackQuestion[]> = {
	NullByte: [
	  {
		question: "What is the result of the expression `null + 1` in JavaScript?",
		choices: ["1", "TypeError", "NaN", "undefined"],
		correctIndex: 2, // "NaN"
	  },
	  {
		question: "Which of these values is *falsy* in JavaScript?",
		choices: ["0", "'0'", "[]", "{}"],
		correctIndex: 0, // 0
	  },
	  {
		question: "How do you check if a variable `x` is exactly null (and not undefined)?",
		choices: ["`x == null`", "`x === null`", "`typeof x === 'null'`", "`x instanceof Null`"],
		correctIndex: 1, // x === null
	  },
  ],
  
  DeBug: [
  {
    question: "What is wrong with this JavaScript code?\n\n```js\nlet num = 5;\nconsole.log(numm);\n```",
    choices: [
      "SyntaxError",
      "ReferenceError",
      "TypeError",
      "The code runs and logs undefined"
    ],
    correctIndex: 1,
  },
  {
    question: "What bug is in this if-statement?\n\n```js\nif (x = 5) {\n  console.log(\"Equal!\");\n}\n```",
    choices: [
      "It will throw an error",
      "It will always be false",
      "It assigns instead of compares",
      "It compares incorrectly but still works"
    ],
    correctIndex: 2,
  },
  {
    question: "What will this function log?\n\n```js\nfunction greet() {\n  \"Hello World\";\n}\nconsole.log(greet());\n```",
    choices: [
      "Hello World",
      "undefined",
      "null",
      "ReferenceError"
    ],
    correctIndex: 1,
    }
  ],
    Python: [
  {
    question: "What type of value does the expression `3.14` have in Python?",
    choices: ["int", "str", "float", "bool"],
    correctIndex: 2,
  },
  {
    question: "Which keyword is used to loop over a sequence in Python?",
    choices: ["loop", "iterate", "for", "while"],
    correctIndex: 2,
  },
  {
    question: "What is the value of `my_list[1]`?\n\n```python\nmy_list = [10, 20, 30]\n```",
    choices: ["10", "20", "30", "Error"],
    correctIndex: 1,
  },
],
Typerroruss: [
  {
    question: "What happens if you try to call `.toUpperCase()` on an undefined value in JavaScript?",
    choices: [
      "It returns undefined",
      "It throws a TypeError",
      "It logs 'undefined'",
      "It returns null"
    ],
    correctIndex: 1,
  },
  {
    question: "What is the result of this JavaScript expression?\n\n```js\n'5' + 3\n```",
    choices: [
      "'8'",
      "'53'",
      "8",
      "Error"
    ],
    correctIndex: 1,
  },
  {
    question: "What happens if you access a property on `null` in JavaScript?",
    choices: [
      "It throws a ReferenceError",
      "It throws a TypeError",
      "It returns null",
      "It returns undefined"
    ],
    correctIndex: 1,
  }
],
Codezilla: [
  {
    question: "In a MongoDB query, what does the `$set` operator do?",
    choices: [
      "Deletes fields from a document",
      "Adds a new document to the collection",
      "Updates specific fields in a document",
      "Finds documents that match a condition"
    ],
    correctIndex: 2,
  },
  {
    question: "In React, why is providing a unique `key` prop important when rendering lists?",
    choices: [
      "It helps React optimize rendering",
      "It makes the list sortable",
      "It binds event handlers automatically",
      "It prevents API calls"
    ],
    correctIndex: 0,
  },
  {
    question: "What happens if error-handling middleware is placed before route handlers in Express?",
    choices: [
      "It will not catch any errors",
      "It will prevent routes from being reached",
      "It will automatically reroute to '/'",
      "It improves performance"
    ],
    correctIndex: 1,
  }
],
}



