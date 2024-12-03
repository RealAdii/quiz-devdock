import React from 'react';
import { useContractWrite, useWriteContract } from 'wagmi';
import { QUIZ_GAME_ADDRESS, QUIZ_GAME_ABI } from '../../config/contracts';
import { Button } from '../ui/Button';
import { useCountdown } from '../../hooks/useCountdown';
import { serialize, deserialize } from 'wagmi'



interface QuestionCardProps {
  question: string;
  options: string[];
  endTime: number;
  revealed: boolean;
}

export function QuestionCard({ question, options, endTime, revealed }: QuestionCardProps) {
  const timeLeft = useCountdown(endTime);
  const { data: hash, writeContract, isPending } = useWriteContract()
  
  

  const handleSubmitAnswer = (index: number) => {
    if (!writeContract) return;
    
    try {
      writeContract({
        args: [BigInt(1), BigInt(index)],
        abi: QUIZ_GAME_ABI,
        functionName: 'submitAnswer',
        address: QUIZ_GAME_ADDRESS
      });
      console.log(hash)
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      <div className="space-y-2">
        {options.map((option, index) => (
          <Button
            key={index}
            variant="secondary"
            onClick={() => handleSubmitAnswer(index)}
            disabled={timeLeft === 0 || isPending}
            className="w-full justify-start"
          >
            {option}
          </Button>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Time left: {timeLeft} seconds
      </div>
    </div>
  );
}