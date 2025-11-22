import {
  Menu,
  ChevronLeft,
  Cloud,
  Bell,
  Share2,
  ChevronRight
} from 'lucide-react';
import { avatars } from '../utils/constants';

interface HeaderProps {
  onToggleSidebar: () => void;
  onBack?: () => void;
  onNext?: () => void;
}

function Header({ onToggleSidebar, onBack, onNext }: HeaderProps) {

  return (
    <header className="bg-[#5087FF] p-2 mx-[0.1%] my-2 text-white flex items-center rounded-lg justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-[#3D6CE8] rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100  rounded-lg bg-white text-black"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <div className="flex items-center gap-2 px-3 py-2  rounded-lg">
          <Cloud className="w-4 h-4" />
          <span className="text-sm">Last Saved 8:10PM</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
          <span className="text-sm font-medium">Jake & Sage</span>
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center -space-x-2">
          {avatars.map((avatar, i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#5087FF] overflow-hidden bg-white">
              <img src={avatar} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-[#5087FF] bg-white flex items-center justify-center">
            <span className="text-xs font-medium text-gray-700">+9</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-3 py-2   rounded-lg">
          <Share2 className="w-4 h-4" />
          <span className="text-sm">Share</span>
        </button>
        <button className="p-2   rounded-lg">
          <Bell className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100"
        >
          <span className="text-sm">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}

export default Header;