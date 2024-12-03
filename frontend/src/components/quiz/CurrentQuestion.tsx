import React from 'react';
import { useContractRead } from 'wagmi';
import { QUIZ_GAME_ADDRESS, QUIZ_GAME_ABI } from '../../config/contracts';
import { QuestionCard } from './QuestionCard';

export function CurrentQuestion() {
  const { data: question, isLoading } = useContractRead({
    address: QUIZ_GAME_ADDRESS,
    abi: QUIZ_GAME_ABI,
    functionName: 'getCurrentQuestion'
  });

  if (isLoading) {
    return <div className="text-center">Loading question...</div>;
  }

  if (!question) {
    return <div className="text-center">No active question</div>;
  }

  const [questionText, options, endTime, revealed] = question;

  return (
    <QuestionCard
      question={questionText}
      options={options}
      endTime={Number(endTime)}
      revealed={revealed}
    />
  );
}