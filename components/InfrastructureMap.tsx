import React, { useState } from 'react';
import { Project, InfrastructureType } from '../types';
import { 
  GraduationCap, 
  ShoppingBag, 
  Pill, 
  Dumbbell, 
  Stethoscope, 
  Baby, 
  Home
} from 'lucide-react';

interface InfrastructureMapProps {
  project: Project;
}

const TYPE_CONFIG: Record<InfrastructureType, { icon: React.ElementType, color: string, label: string }> = {
  school: { icon: GraduationCap, color: 'bg-blue-400', label: 'Школа' },
  kindergarten: { icon: Baby, color: 'bg-pink-400', label: 'Детский сад' },
  shop: { icon: ShoppingBag, color: 'bg-orange-400', label: 'Магазин' },
  pharmacy: { icon: Pill, color: 'bg-green-400', label: 'Аптека' },
  gym: { icon: Dumbbell, color: 'bg-purple-400', label: 'Спорт' },
  dentist: { icon: Stethoscope, color: 'bg-teal-400', label: 'Стоматология' },
};

export const InfrastructureMap: React.FC<InfrastructureMapProps> = ({ project }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] bg-[#e5e7eb] rounded-3xl overflow-hidden shadow-inner group border border-sand">
      {/* Background Map Image - grayscale/light */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-multiply"
      >
        <img 
           src="https://picsum.photos/seed/mapbackground/1600/900" 
           alt="Map" 
           className="w-full h-full object-cover grayscale opacity-50 contrast-125 hover:scale-105 transition-transform duration-[20s]"
        />
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />

      {/* Central Project Pin */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group/pin"
      >
        <div className="relative">
           <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-2xl text-white z-10 relative border-4 border-white">
             <Home className="w-8 h-8" />
           </div>
           <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
        </div>
        <div className="mt-2 bg-white px-4 py-2 rounded-xl shadow-lg font-bold text-primary text-sm whitespace-nowrap border border-sand/50">
          {project.name}
        </div>
      </div>

      {/* Infrastructure Pins */}
      {project.infrastructure.map((item) => {
        const config = TYPE_CONFIG[item.type];
        const Icon = config.icon;
        const isActive = activeItem === item.id;

        return (
          <div
            key={item.id}
            className="absolute z-10 transition-all duration-500 ease-out"
            style={{ 
              top: `${item.y}%`, 
              left: `${item.x}%`,
            }}
            onMouseEnter={() => setActiveItem(item.id)}
            onMouseLeave={() => setActiveItem(null)}
          >
            <div className={`
              relative -translate-x-1/2 -translate-y-1/2 cursor-pointer
              transition-all duration-300
              ${isActive ? 'scale-125 z-30' : 'scale-100 hover:scale-110'}
            `}>
              {/* Pin Icon */}
              <div className={`
                w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg border-2 border-white flex items-center justify-center text-white
                ${config.color}
              `}>
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>

              {/* Tooltip */}
              <div className={`
                absolute bottom-full left-1/2 -translate-x-1/2 mb-3
                w-48 bg-white rounded-xl shadow-xl p-3 text-center pointer-events-none
                transition-all duration-300 origin-bottom border border-sand
                ${isActive ? 'opacity-100 transform scale-100 translate-y-0' : 'opacity-0 transform scale-95 translate-y-2'}
              `}>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{config.label}</div>
                <div className="text-primary font-bold text-sm">{item.name}</div>
                {/* Little triangle arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Legend / Filter (Visual only for now) */}
      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg hidden md:block border border-sand">
        <h3 className="font-bold text-primary mb-3 text-sm">Обозначения</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(TYPE_CONFIG).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${config.color}`} />
              <span className="text-xs text-secondary">{config.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};