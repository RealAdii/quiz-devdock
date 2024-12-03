import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  iconColor?: string;
}

export function StatCard({ icon: Icon, label, value, iconColor = 'text-blue-500' }: StatCardProps) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={iconColor} />
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="font-bold">{value}</div>
      </div>
    </div>
  );
}