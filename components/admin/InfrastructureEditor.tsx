import React, { useRef, useState } from 'react';
import { Project, InfrastructureItem, InfrastructureType } from '../../types';
import { 
  GraduationCap, ShoppingBag, Pill, Dumbbell, Stethoscope, Baby, Home,
  Plus, Trash2, X
} from 'lucide-react';

interface InfrastructureEditorProps {
  items: InfrastructureItem[];
  onChange: (items: InfrastructureItem[]) => void;
}

const TYPE_CONFIG: Record<InfrastructureType, { icon: React.ElementType, color: string, label: string }> = {
  school: { icon: GraduationCap, color: 'bg-blue-400', label: 'Школа' },
  kindergarten: { icon: Baby, color: 'bg-pink-400', label: 'Детский сад' },
  shop: { icon: ShoppingBag, color: 'bg-orange-400', label: 'Магазин' },
  pharmacy: { icon: Pill, color: 'bg-green-400', label: 'Аптека' },
  gym: { icon: Dumbbell, color: 'bg-purple-400', label: 'Спорт' },
  dentist: { icon: Stethoscope, color: 'bg-teal-400', label: 'Стоматология' },
};

export const InfrastructureEditor: React.FC<InfrastructureEditorProps> = ({ items, onChange }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [addingItem, setAddingItem] = useState<{x: number, y: number} | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState<InfrastructureType>('shop');

  const handleMapClick = (e: React.MouseEvent) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setAddingItem({ x, y });
  };

  const handleAddItem = () => {
    if (addingItem && newItemName) {
      const newItem: InfrastructureItem = {
        id: Date.now().toString(),
        type: newItemType,
        name: newItemName,
        x: addingItem.x,
        y: addingItem.y
      };
      onChange([...items, newItem]);
      setAddingItem(null);
      setNewItemName('');
    }
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(items.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm">
        Кликните в любую точку карты, чтобы добавить объект инфраструктуры.
      </div>
      
      <div 
        ref={mapRef}
        onClick={handleMapClick}
        className="relative w-full h-[500px] bg-gray-200 rounded-2xl overflow-hidden cursor-crosshair border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors"
      >
        <img 
           src="https://picsum.photos/seed/mapbackground/1600/900" 
           alt="Map" 
           className="w-full h-full object-cover grayscale opacity-50 pointer-events-none"
        />
        
        {/* Pins */}
        {items.map((item) => {
          const config = TYPE_CONFIG[item.type];
          const Icon = config.icon;
          return (
            <div
              key={item.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ top: `${item.y}%`, left: `${item.x}%` }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`w-8 h-8 rounded-full ${config.color} flex items-center justify-center text-white shadow-lg border-2 border-white`}>
                <Icon className="w-4 h-4" />
              </div>
              
              {/* Tooltip & Delete in Editor */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded shadow-lg p-2 w-max z-10 hidden group-hover:block">
                <div className="font-bold text-xs">{item.name}</div>
                <button 
                  onClick={(e) => handleDeleteItem(item.id, e)}
                  className="mt-1 flex items-center text-red-500 text-xs hover:underline"
                >
                  <Trash2 className="w-3 h-3 mr-1" /> Удалить
                </button>
              </div>
            </div>
          );
        })}

        {/* Home Pin */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-2xl text-white border-4 border-white">
               <Home className="w-6 h-6" />
            </div>
         </div>

         {/* New Item Modal/Popover */}
         {addingItem && (
           <div 
             className="absolute bg-white p-4 rounded-xl shadow-2xl border border-gray-200 w-64 z-50"
             style={{ top: `${Math.min(addingItem.y, 80)}%`, left: `${Math.min(addingItem.x, 80)}%` }}
             onClick={(e) => e.stopPropagation()}
           >
             <h4 className="font-bold text-sm mb-2">Новый объект</h4>
             <select 
               className="w-full mb-2 p-2 border rounded text-sm"
               value={newItemType}
               onChange={(e) => setNewItemType(e.target.value as InfrastructureType)}
             >
               {Object.entries(TYPE_CONFIG).map(([key, config]) => (
                 <option key={key} value={key}>{config.label}</option>
               ))}
             </select>
             <input 
               type="text" 
               className="w-full mb-3 p-2 border rounded text-sm"
               placeholder="Название (напр. Пятерочка)"
               value={newItemName}
               onChange={(e) => setNewItemName(e.target.value)}
             />
             <div className="flex gap-2">
               <button 
                 onClick={handleAddItem}
                 className="flex-1 bg-green-500 text-white py-1 rounded text-sm hover:bg-green-600"
               >
                 Добавить
               </button>
               <button 
                 onClick={() => setAddingItem(null)}
                 className="flex-1 bg-gray-200 text-gray-700 py-1 rounded text-sm hover:bg-gray-300"
               >
                 Отмена
               </button>
             </div>
           </div>
         )}
      </div>
    </div>
  );
};