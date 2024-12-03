import React from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config/wagmi';
import { ConnectWallet } from './components/wallet/ConnectButton';
import { CurrentQuestion } from './components/quiz/CurrentQuestion';
import { PlayerStats } from './components/stats/PlayerStats';

const queryClient = new QueryClient();

function QuizApp() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Quiz Game</h1>
          <ConnectWallet />
        </div>
      </nav>

      <main className="max-w-4xl mx-auto mt-8 px-4">
        <PlayerStats />
        <div className="mt-8">
          <CurrentQuestion />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <QuizApp />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;