import React from 'react';
import { Users, DollarSign, TrendingUp, MapPin } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  growth: string;
  icon: string;
  color: string;
  iconColor: string;
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
  const getIcon = (iconName: string) => {
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
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
              <IconComponent className={`w-6 h-6 ${iconColor}`} />
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              {growth}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            <span className="text-gray-500 text-sm">{subtitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;