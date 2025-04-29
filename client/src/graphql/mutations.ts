import { gql } from '@apollo/client';

export const SUBMIT_ANSWER = gql`
  mutation SubmitAnswer($questionId: ID!, $selectedOption: String!) {
    submitAnswer(questionId: $questionId, selectedOption: $selectedOption) {
      isCorrect
      feedback
    }
  }
`;
