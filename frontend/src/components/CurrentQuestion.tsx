import React from 'react';
import { useContractRead, useContractWrite } from 'wagmi';
import { QUIZ_GAME_ADDRESS, QUIZ_GAME_ABI } from '../config/contracts';

export function CurrentQuestion() {
  const { data: question, isLoading } = useContractRead({
    address: QUIZ_GAME_ADDRESS,
    abi: QUIZ_GAME_ABI,
    functionName: 'getCurrentQuestion'
  });

  const { write: submitAnswer } = useContractWrite({
    address: QUIZ_GAME_ADDRESS,
    abi: QUIZ_GAME_ABI,
    functionName: 'submitAnswer'
  });

  if (isLoading) {
    return <div className="text-center">Loading question...</div>;
  }

  if (!question) {
    return <div className="text-center">No active question</div>;
  }

  const [questionText, options, endTime, revealed] = question;
  const timeLeft = Math.max(0, Number(endTime) - Math.floor(Date.now() / 1000));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">{questionText}</h2>
      <div className="space-y-2">
        {options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => submitAnswer({ args: [BigInt(1), BigInt(index)] })}
            className="w-full p-3 text-left border rounded-lg hover:bg-gray-50"
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Time left: {timeLeft} seconds
      </div>
    </div>
  );
}