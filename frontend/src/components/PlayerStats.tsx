import React from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { QUIZ_GAME_ADDRESS, QUIZ_GAME_ABI } from '../config/contracts';
import { Trophy, Coins } from 'lucide-react';

export function PlayerStats() {
  const { address } = useAccount();

  const { data: stats } = useContractRead({
    address: QUIZ_GAME_ADDRESS,
    abi: QUIZ_GAME_ABI,
    functionName: 'getPlayerStats',
    args: [address!],
    enabled: !!address
  });

  if (!address || !stats) return null;

  const [score, tokens] = stats;

  return (
    <div className="flex gap-6 bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-2">
        <Trophy className="text-yellow-500" />
        <div>
          <div className="text-sm text-gray-600">Score</div>
          <div className="font-bold">{score.toString()}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Coins className="text-green-500" />
        <div>
          <div className="text-sm text-gray-600">Tokens</div>
          <div className="font-bold">{(Number(tokens) / 1e18).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}