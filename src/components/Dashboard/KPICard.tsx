import React, { memo } from 'react';
import { Users, DollarSign, TrendingUp, MapPin, ArrowUpRight } from 'lucide-react';

interface KPICardProps {
  title: string; value: string; subtitle: string; growth: string;
  icon: 'users' | 'dollar' | 'trending' | 'map';
  color: string; iconColor: string;
}

const KPICard: React.FC<KPICardProps> = memo(({ title, value, subtitle, growth, icon, color, iconColor }) => {
  const IconComponent = { users: Users, dollar: DollarSign, trending: TrendingUp, map: MapPin }[icon];
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between min-h-[160px] ${color}`}>
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-black/5">
          <IconComponent className={`${iconColor} w-6 h-6`} />
        </div>
        <div className="flex items-center bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          <ArrowUpRight size={12} className="mr-1" />
          {growth}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className="flex items-baseline space-x-2 mt-1">
          <span className="text-2xl font-bold text-gray-800">{value}</span>
          <span className="text-sm font-medium text-gray-500 truncate">{subtitle}</span>
        </div>
      </div>
    </div>
  );
});

export default KPICard;