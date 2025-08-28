import React from 'react';
import { Users, DollarSign, TrendingUp, MapPin, ArrowUpRight } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  growth: string;
  icon: 'users' | 'dollar' | 'trending' | 'map';
  color: string;      // background color for the whole card
  iconColor: string;  // color for the icon itself (e.g. "text-white", "text-green-400")
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  growth,
  icon,
  color,
  iconColor,
}) => {
  const getIcon = (iconName: KPICardProps['icon']) => {
    switch (iconName) {
      case 'users':
        return Users;
      case 'dollar':
        return DollarSign;
      case 'trending':
        return TrendingUp;
      case 'map':
        return MapPin;
      default:
        return Users;
    }
  };

  const IconComponent = getIcon(icon);

  return (
    <div
      className={`w-[284px] h-[159px] rounded-[24px] shadow-lg border border-gray-200 p-4 relative flex flex-col justify-between ${color}`}
      style={{
        boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.25), 0px 0px 10px rgba(0, 0, 0, 0.15)',
      }}
    >
      <div className="flex justify-between items-start">
        {/* Dark background container for icon */}
        <div className="w-[65px] h-[45px] rounded-[10px] flex items-center justify-center ">
          <IconComponent className={`${iconColor} w-5 h-5`} />
        </div>
        <div className="flex items-center bg-[#17C653] text-white text-xs font-medium px-2 py-[2px] rounded-[10px]">
          <ArrowUpRight size={12} className="mr-1" />
          {growth}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">{title}</p>
        <div className="flex items-baseline space-x-2 mt-1">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          <span className="text-base font-medium text-gray-700 truncate">{subtitle}</span>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
