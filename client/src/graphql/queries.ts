import { gql } from '@apollo/client';

export const GENERATE_QUESTIONS = gql`
  query GenerateQuestion($track: String!, level: $level, minion: $minion) {
    questions {
      question
      choices
      answer
    }
  }
`;


