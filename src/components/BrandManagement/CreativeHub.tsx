
import { useState } from 'react';
import CampaignLibraryPage from './CampaignLibraryPage';
import WebsiteManagement from './WebsiteManagement';

interface CreativeHubProps {
  onOpenSetup?: () => void;
}

const CreativeHub = ({ onOpenSetup }: CreativeHubProps) => {
  const [currentView, setCurrentView] = useState<'hub' | 'campaign' | 'website'>('hub');
  const assets = [
    {
      image: '/Brand.png',
      count: '12 assets',
      title: 'Brand Assets',
      description: 'Manage logos, colors, fonts and brand guidelines.',
      buttonText: 'Manage Assets',
    },
    {
      image: '/Brand-2.png',
      count: '48 campaign',
      title: 'Campaign Library',
      description: 'Store and organize past email campaigns.',
      buttonText: 'Manage Assets',
    },
  ];

  const integrations = [
    {
      image: '/Brand-3.png',
      count: '15 tracked links',
      title: 'Website & Links',
      description: 'Track websites, Amazon links, and competitors',
      buttonText: 'Manage Assets',
    },
    {
      image: '/Brand-4.png',
      count: 'connected',
      title: 'Klaviyo Integration',
      description: 'connect and sync with your Klaviyo account',
      buttonText: 'Manage Assets',
    },
  ];

  const renderCard = (item: any, index: number) => {
    const handleClick = () => {
      if (item.title === 'Brand Assets' && onOpenSetup) {
        onOpenSetup();
      } else if (item.title === 'Campaign Library') {
        setCurrentView('campaign');
      } else if (item.title === 'Website & Links') {
        setCurrentView('website');
      }
    };

    return (
      <div
        key={index}
        className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col transition hover:shadow-md"
      >
        <div className="flex items-start justify-between mb-6">
            <img src={item.image} alt="" className="w-12 h-12 object-contain" />
          <div className={`px-3 py-1 bg-white border ${item.title === 'Klaviyo Integration' ? 'border-[#50FF50] text-[#50FF50]' : 'border-[#5087FF] text-[#5087FF]'} text-xs font-medium rounded-full`}>
            {item.count}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-[#5D586C] mb-2">{item.title}</h3>
        <p className="text-sm text-gray-500 mb-6 flex-grow">{item.description}</p>
        <button
          onClick={handleClick}
          className="w-full px-4 py-2 bg-[#5087FF] text-white rounded-lg font-medium hover:bg-[#3D6CE8]"
        >
          {item.buttonText}
        </button>
      </div>
    );
  };

  if (currentView === 'campaign') {
    return <CampaignLibraryPage />;
  } else if (currentView === 'website') {
    return <WebsiteManagement />;
  } else {
    return (
      <div className="bg-white rounded-xl border border-gray-200 max-w-7xl p-3 mb-2 mr-2">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#5D586C]">Creative Hub</h1>
        <p className="text-sm text-gray-500 mt-1">
          Centralize And Manage All Your Brand Assets And Integrations.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 grid grid-cols-3 gap-6 mb-8 ">
        <div className="bg-white p-1 m-4 flex flex-col  border-r border-gray-200">
          <span className="text-2xl font-bold text-[#5D586C]">12</span>
          <span className="text-sm text-gray-600 mt-2">Brand Assets</span>
        </div>
        <div className="bg-white p-1 m-4 flex flex-col  border-r border-gray-200">
          <span className="text-2xl font-bold text-[#5D586C]">48</span>
          <span className="text-sm text-gray-600 mt-2">Campaigns</span>
        </div>
        <div className="bg-white p-1 m-4 flex flex-col  border-gray-200">
          <span className="text-2xl font-bold text-[#5D586C]">3</span>
          <span className="text-sm text-gray-600 mt-2">Integrations</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-3">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#5D586C] mb-1">Assets & Content</h2>
          <p className="text-sm text-gray-500">
            Manage Creative Assets And Content Resources
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-4">
          {assets.map(renderCard)}
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#5D586C] mb-1">Integrations</h2>
          <p className="text-sm text-gray-500">Connect External Platforms And Services</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {integrations.map(renderCard)}
        </div>
      </div>
    </div>
  );
  }
};

export default CreativeHub;