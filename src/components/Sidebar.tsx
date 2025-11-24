import { useState } from 'react';
import {
  Settings,
  ChevronDown,
  Palette,
  Package,
  MessageSquare
} from 'lucide-react';
import { menuItems } from '../utils/PersonaAudienceconstants';

interface SidebarProps {
  collapsed: boolean;
  currentPage: 'dashboard' | 'campaigns' | 'analytics' | 'segments' | 'playbooks' | 'brand' | 'brand-setup' | 'brand-voice' | 'brand-products' | 'settings' | 'profile' | 'persona-audience';
  onNavigate: (page: 'dashboard' | 'campaigns' | 'analytics' | 'segments' | 'playbooks' | 'brand' | 'brand-voice' | 'brand-products' | 'settings' | 'persona-audience') => void;
}

function Sidebar({ collapsed, currentPage, onNavigate }: SidebarProps) {
  const [brandExpanded, setBrandExpanded] = useState(false);

  return (
    <aside className={`m-2 p-2 ${collapsed ? 'w-12' : 'w-52'} bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col transition-all duration-300 ease-in-out`}>
      <div className="p-4 flex items-center gap-3">
        <div className={`transition-all duration-200 ${collapsed ? 'w-10 h-10' : 'w-32 h-10'} rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden`}>
          <img src="/logo.png" alt="Individia AI" className="w-full h-full object-contain" />
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id || (item.id === 'persona-audience' && (currentPage === 'segments' || currentPage === 'profile')) || (item.id === 'brand' && (currentPage === 'brand' || currentPage === 'brand-setup' || currentPage === 'brand-voice' || currentPage === 'brand-products'));

          if (item.id === 'brand') {
            return (
              <div key={item.id}>
                <div
                  onClick={() => {
                    setBrandExpanded(!brandExpanded);
                    onNavigate('brand');
                  }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-[#5087FF] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className={`flex-1 flex items-center justify-between transition-opacity duration-200 max-w-32 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                    <div className="min-w-0">
                      <div className="text-sm font-medium leading-tight">{item.label}</div>
                    </div>
                    {item.hasChevron && (
                      <ChevronDown className={`w-4 h-4 flex-shrink-0 ml-2 transition-transform ${brandExpanded ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </div>
                {brandExpanded && !collapsed && (
                  <div className="ml-8 mt-1 space-y-1">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('brand');
                      }}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        currentPage === 'brand' || currentPage === 'brand-setup'
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Palette className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">Creative Hub</span>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('brand-products');
                      }}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        currentPage === 'brand-products'
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Package className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">Products</span>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('brand-voice');
                      }}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        currentPage === 'brand-voice'
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">Brand Voice</span>
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-[#5087FF] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <div className={`flex-1 flex items-center justify-between transition-opacity duration-200 max-w-32 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                <div className="min-w-0">
                  <div className="text-sm font-medium leading-tight">{item.label}</div>
                  {item.description && (
                    <div className="text-xs text-gray-400 leading-tight">{item.description}</div>
                  )}
                </div>
                {item.hasChevron && (
                  <ChevronDown className="w-4 h-4 flex-shrink-0 ml-2" />
                )}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-2">
        <div
          onClick={() => onNavigate('settings')}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
            currentPage === 'settings'
              ? 'bg-[#5087FF] text-white'
              : 'text-gray-600 hover:bg-gray-100'
          } ${collapsed ? 'justify-center' : ''}`}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          <div className={`flex-1 flex items-center justify-between transition-opacity duration-200 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            <span className="text-sm font-medium leading-tight">Settings</span>
            <ChevronDown className="w-4 h-4 flex-shrink-0 ml-2" />
          </div>
        </div>

        <div className={`mt-2 p-3 flex items-center gap-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-opacity duration-200 ${collapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <div className="w-8 h-8 bg-[#5087FF] rounded-full flex-shrink-0"></div>
          <span className="text-sm font-medium leading-tight">Naman P.</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;