import { FallbackQuestion, fallbackQuestion } from "../utils/fallbackQuestions";

export class PromptBuilder {
  /**
   * Return the appropriate LLM prompt based on difficulty level
   */
  static getPrompt(track: string, level: string): string {
    switch (level) {
      case 'easy':
        return this.nullbytePrompt(track);
      case 'medium':
        return this.debugPrompt(track);
      case 'hard':
        return this.pythonPrompt(track);
      case 'boss':
        return this.codezillaPrompt(track);
      default:
        return this.genericPrompt(track, level);
    }
  }

  /**
   * Generic prompt for unspecified levels
   */
  private static genericPrompt(track: string, level: string): string {
    return `
Generate a concise ${level} JavaScript multiple-choice coding question for a ${track}-level developer.

Requirements:
- Focus on real-world coding concepts.
- Limit the question to 2 sentences max.
- Include 4 answer choices labeled A through D.
- Clearly indicate the correct answer at the end using: "Correct Answer: B"

Format:
Question: ...
A) ...
B) ...
C) ...
D) ...
Correct Answer: ...
`;
  }

  /**
   * Easy-level question prompt for NullByte
   */
  private static nullbytePrompt(track: string): string {
    return `
You're facing **NullByte**, the minion of bugs and broken logic.

Generate an **easy-level** HTML, JavaScript, or CSS multiple-choice coding question that focuses on **debugging or fixing broken code** for a ${track}-level developer.

Requirements:
- Limit to 2 sentences max.
- Use a real JavaScript bug or common mistake (like misuse of == vs ===, off-by-one errors, etc).
- Provide 4 answer options labeled A-D.
- Indicate the correct answer at the end using: "Correct Answer: X"

Format:
Question: ...
A) ...
B) ...
C) ...
D) ...
Correct Answer: ...
`;
  }

  /**
   * Medium-level debugging prompt
   */
  private static debugPrompt(track: string): string {
    return `
You're facing **D'bug**, the glitchy minion of confusion.

Generate a **medium-level** multiple-choice JavaScript coding question that challenges the player to understand code behavior, logic, or flow — suitable for a ${track}-level developer.

Requirements:
- Limit the question to 2 sentences max.
- Avoid fantasy themes.
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

  /**
   * Hard-level Python prompt
   */
  private static pythonPrompt(track: string): string {
    return `
You’re up against **Pie-thon**, the toughest minion before the boss.

Generate a **hard-level** Python multiple-choice question involving complex concepts (e.g. closures, asynchronous behavior, or prototypes), aimed at a ${track}-level developer.

Requirements:
- Be concise (2 sentences max).
- Provide 4 answer options labeled A-D.
- Clearly indicate the correct answer.

Format:
Question: ...
A) ...
B) ...
C) ...
D) ...
Correct Answer: ...
`;
  }

  /**
   * Boss-level Codezilla prompt
   */
  private static codezillaPrompt(track: string): string {
    return `
This is the final challenge: **Codezilla**, the boss monster of code.

Generate a **boss-level** multiple-choice MERN Stack question that requires deep understanding of advanced topics (e.g. event loop, execution context, performance optimization), tailored for a ${track}-level developer.

Requirements:
- Keep it under 2 sentences.
- Avoid fantasy language and be strictly technical.
- Include 4 choices labeled A-D and mark the correct answer.

Format:
Question: ...
A) ...
B) ...
C) ...
D) ...
Correct Answer: ...
`;
  }

  /**
   * If the LLM API fails, pick a random fallback question
   */
  static getFallbackQuestion(minionName: string): FallbackQuestion {
    const pool = fallbackQuestion[minionName] || [];
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
  }
}

/**
 * Parses the raw OpenAI response into question, choices, and answer
 */
// Removed duplicate implementation of parseOpenAIResponse to resolve redeclaration error.

  export function parseOpenAIResponse(raw: string) {
	const lines = raw.split('\n').map(line => line.trim()).filter(line => line !== '');
  
	let question = '';
	const choices: string[] = [];
	let answer = '';
  
	for (const line of lines) {
	  if (line.toLowerCase().startsWith('question:')) {
		question = line.replace(/^question:\s*/i, '').trim();
	  } else if (/^[a-dA-D]\)/.test(line)) {
		choices.push(line);
	  } else if (line.toLowerCase().startsWith('correct answer')) {
		const match = line.match(/[A-D]/i);
		if (match) {
		  answer = match[0].toUpperCase();
		}
	  }
	}
  
	return { question, choices, answer };
  }
  