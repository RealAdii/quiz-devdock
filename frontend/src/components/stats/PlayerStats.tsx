import React from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { QUIZ_GAME_ADDRESS, QUIZ_GAME_ABI } from '../../config/contracts';
import { Trophy, Coins } from 'lucide-react';
import { StatCard } from './StatCard';

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
      <StatCard
        icon={Trophy}
        label="Score"
        value={score.toString()}
        iconColor="text-yellow-500"
      />
      <StatCard
        icon={Coins}
        label="Tokens"
        value={(Number(tokens) / 1e18).toFixed(2)}
        iconColor="text-green-500"
      />
    </div>
  );
}