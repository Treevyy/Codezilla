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

  private static genericPrompt(track: string, level: string): string {
    return `
Generate a concise ${level} JavaScript multiple-choice coding question for a ${track}-level developer.

Requirements:
- Focus on real-world coding concepts.
- Wrap code examples in triple backticks (like \`\`\`js ... \`\`\`).
- Use 3 sentences max.
- Provide 4 answer choices labeled A-D.
- End with "Correct Answer: X"

Format:
Question: ...
A) ...
B) ...
C) ...
D) ...
Correct Answer: ...
`;
  }

  private static nullbytePrompt(track: string): string {
    return `
You're facing NullByte, a mischievous bug in the system.

Generate an **easy-level** JavaScript, HTML, or CSS multiple-choice question that focuses on **debugging common beginner mistakes**, suitable for a ${track}-level developer.

Requirements:
- Use simple logic bugs like = vs ==, typos, off-by-one, etc.
- If code is needed, keep it minimal and readable. Avoid full blocks unless essential.
- DO NOT wrap in markdown unless needed.
- Limit to 3 sentences.
- Provide 4 answers labeled A-D.
- End with "Correct Answer: X"

Format:
Question: ...
A) ...
B) ...
C) ...
D) ...
Correct Answer: ...
`;
  }

  private static dbugPrompt(track: string): string {
    return `
You're facing Dbug, a slippery logic breaker.

Generate a **medium-level** JavaScript multiple-choice question that tests logical flow, control structures, or debugging quirks. Tailored for a ${track}-level developer.

Requirements:
- Include a short code snippet wrapped in \`\`\`js ... \`\`\`.
- Avoid fantasy or themed references.
- 3 sentences max.
- Provide 4 answers labeled A-D.
- End with "Correct Answer: X"

Format:
Question: ...
\`\`\`js
...
\`\`\`
A) ...
B) ...
C) ...
D) ...
Correct Answer: ...
`;
  }

  private static typerrorasaurusPrompt(track: string): string {
    return `
You're facing Typerrorasaurus, a creature born of broken types.

Generate a **medium-to-hard** JavaScript multiple-choice question involving **type coercion**, **runtime errors**, or **typeof traps**, suitable for a ${track}-level developer.

Requirements:
- Include a code snippet wrapped in \`\`\`js ... \`\`\`.
- Limit to 3 sentences.
- Provide 4 answers labeled A-D.
- End with "Correct Answer: X"

Format:
Question: ...
\`\`\`js
...
\`\`\`
A) ...
B) ...
C) ...
D) ...
Correct Answer: ...
`;
  }

  private static pieThonPrompt(track: string): string {
    return `
You’re up against PieThon, a logic-twisting adversary.

Generate a **hard-level** Python multiple-choice question targeting concepts like **list comprehensions**, **scope**, or **async behavior**, for a ${track}-level developer.

Requirements:
- Code must be inside \`\`\`python ... \`\`\`.
- 3 sentences max.
- Provide 4 answers labeled A-D.
- End with "Correct Answer: X"

Format:
Question: ...
\`\`\`python
...
\`\`\`
A) ...
B) ...
C) ...
D) ...
Correct Answer: ...
`;
  }

  private static codezillaPrompt(track: string): string {
    return `
You've reached Codezilla, the final test.

Generate a **boss-level** full-stack JavaScript or MERN-stack multiple-choice question focused on topics like **event loop**, **execution context**, **asynchronous behavior**, or **React/Node internals**, for a ${track}-level developer.

Requirements:
- Code block required (use \`\`\`js ... \`\`\`).
- No fantasy. Pure technical.
- 3 sentences max.
- Answers A-D. End with "Correct Answer: X"

Format:
Question: ...
\`\`\`js
...
\`\`\`
A) ...
B) ...
C) ...
D) ...
Correct Answer: ...
`;
  }

  static getFallbackQuestion(minionName: string): FallbackQuestion {
    const pool = fallbackQuestion[minionName] || [];
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
  }
}

export function parseOpenAIResponse(raw: string) {
  const lines = raw.split("\n").map((line) => line.trim()).filter((line) => line !== "");

  let question = "";
  const choices: string[] = [];
  let answer = "";

  for (const line of lines) {
    if (line.toLowerCase().startsWith("question:")) {
      question = line.replace(/^question:\s*/i, "").trim();
    } else if (/^[a-dA-D]\)/.test(line)) {
      choices.push(line);
    } else if (line.toLowerCase().startsWith("correct answer")) {
      const match = line.match(/[A-D]/i);
      if (match) {
        answer = match[0].toUpperCase();
      }
    }
  }

  return { question, choices, answer };
}
