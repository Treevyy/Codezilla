import { FallbackQuestion, fallbackQuestion } from "../utils/fallbackQuestions";

export class PromptBuilder {
  static getPrompt(track: string, level: string): string {
    switch (level) {
      case "easy":
        return this.nullbytePrompt(track);
      case "medium":
        return this.dbugPrompt(track);
      case "medium-hard":
        return this.typerrorasaurusPrompt(track);
      case "hard":
        return this.pieThonPrompt(track);
      case "boss":
        return this.codezillaPrompt(track);
      default:
        return this.genericPrompt(track, level);
    }
  }

  private static nullbytePrompt(track: string): string {
    return `
You're facing NullByte, a mischievous bug in the system.

Generate an **easy-level** beginner multiple-choice question in **HTML, CSS, or JavaScript**.

Requirements:
- Do **NOT** include a code snippet.
- Focus on **common beginner errors or misunderstandings**.
- Phrase it as a clear, concise question.
- Include four answer choices (A–D) and a correct answer.

Format:
Question: <simple conceptual or mistake-based question>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
`;
  }

  private static dbugPrompt(track: string): string {
    const useSnippet = Math.random() < 0.5;
    return useSnippet ? `
You're facing Dbug, a logic trap master.

Generate a **medium-level** JavaScript multiple-choice question that tests logic flow, scope, or control behavior.

Requirements:
- Include a **short** JavaScript code snippet inside triple backticks (≤ 6 lines).
- Then write a question and four labeled answers.
- End with "Correct Answer: X"

Format:
\`\`\`js
<short JS logic trap>
\`\`\`

Question: <what does this code do or output?>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
` : `
You're facing Dbug, a logic trap master.

Generate a **medium-level** multiple-choice question that tests understanding of logic, scope, or conditionals in JavaScript.

Requirements:
- Do **NOT** include a snippet.
- Write a question involving tricky logical outcomes.
- Provide four labeled choices and a correct answer.

Format:
Question: <question involving logic or outcome>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
`;
  }

  private static typerrorasaurusPrompt(track: string): string {
    const useSnippet = Math.random() < 0.8;
    return useSnippet ? `
You're facing Typerrorasaurus, master of coercion and confusion.

Generate a **medium-hard** JavaScript question involving **type coercion**, **runtime errors**, or **weird typeof results**.

Requirements:
- Use a **short JavaScript snippet** (≤ 8 lines) that could cause runtime confusion.
- Ask a question based on the outcome.
- Provide 4 labeled choices and the correct answer.

Format:
\`\`\`js
<JS coercion or typeof trap>
\`\`\`

Question: <what is the result or error?>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
` : `
You're facing Typerrorasaurus, master of runtime bugs.

Generate a conceptual **medium-hard** JavaScript question about runtime behavior or type coercion.

Requirements:
- **No code snippet**.
- Focus on common traps like typeof, NaN, null, undefined, equality checks.
- Format with question, 4 answers, and correct letter.

Format:
Question: <runtime or coercion-based question>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
`;
  }

  private static pieThonPrompt(track: string): string {
    const useSnippet = Math.random() < 0.5;
    return useSnippet ? `
You're up against PieThon, the async illusionist.

Generate a **hard-level** Python multiple-choice question.

Requirements:
- Use a **Python snippet** (≤ 10 lines).
- Focus on list comprehensions, async, or scope.
- Follow with question, answers, and correct answer.

Format:
\`\`\`python
<complex or quirky Python code>
\`\`\`

Question: <what does this code do?>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
` : `
You're up against PieThon, the async illusionist.

Generate a **hard-level** Python multiple-choice question testing **async**, **loops**, or **comprehension quirks**.

Requirements:
- **Do not** include code.
- Make it a conceptual Python logic question.
- Include 4 answer choices and one correct one.

Format:
Question: <Python async or scope logic>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
`;
  }

  private static codezillaPrompt(track: string): string {
    return `
You've reached Codezilla — the final full-stack menace.

Generate a **boss-level** full-stack JavaScript multiple-choice question.

Requirements:
- Include a **realistic** full-stack code snippet (5–15 lines) that touches **2+ technologies** (React, Node.js, MongoDB, Express).
- Then ask a deep question testing understanding across these layers.
- Provide 4 complete answer choices and 1 correct letter.

Format:
\`\`\`js
<React+Node or Express+Mongo or async combo>
\`\`\`

Question: <full-stack integration question>
A) <complete>
B) <complete>
C) <complete>
D) <complete>
Correct Answer: <A/B/C/D>
`;
  }

  private static genericPrompt(track: string, level: string): string {
    return `
You are a coding interview question writer.

Generate a **${level}** multiple-choice question.

Requirements:
- You may optionally use a **short code snippet** in JavaScript.
- Focus on practical coding knowledge.
- Include a question, 4 choices, and correct answer letter.

Format:
\`\`\`js
<if applicable>
\`\`\`

Question: <your question>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
`;
  }

  static getFallbackQuestion(minionName: string): FallbackQuestion {
    const pool = fallbackQuestion[minionName] || [];
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
  }
}


export function parseOpenAIResponse(raw: string) {
  const lines = raw.split("\n").map(line => line.trim()).filter(line => line !== "");

  const questionLines: string[] = [];
  const choices: string[] = [];
  let answer = "";
  let codeBlock: string | undefined = undefined;
  let recordingQuestion = false;

  // ✅ Smart snippet check
  const codeRegex = /```(?:js|python)?\n([\s\S]*?)```/i;
  const codeMatch = raw.match(codeRegex);

  if (codeMatch && codeMatch[1].trim().length > 0) {
    codeBlock = codeMatch[1].trim();
  } else {
    console.info("ℹ️ No code block found — likely a non-snippet question.");
  }

  // ✅ Extract question & answers
  for (const line of lines) {
    if (line.toLowerCase().startsWith("question:")) {
      questionLines.push(line.replace(/^question:\s*/i, "").trim());
      recordingQuestion = true;
    } else if (/^[a-dA-D]\)/.test(line)) {
      choices.push(line);
      recordingQuestion = false;
    } else if (line.toLowerCase().startsWith("correct answer")) {
      const match = line.match(/[A-D]/i);
      if (match) {
        answer = match[0].toUpperCase();
      }
    } else if (recordingQuestion) {
      questionLines.push(line);
    }
  }

  const question = questionLines.join("\n");

  return {
    snippet: codeBlock,
    question,
    choices,
    answer,
  };
}
