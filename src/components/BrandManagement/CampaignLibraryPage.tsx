import { useState } from 'react';
import {  Search, Filter, ChevronDown } from 'lucide-react';

interface Campaign {
  id: number;
  name: string;
  createdBy: string;
  role: string;
  description: string;
  type: string;
  status: string;
  image: string;
}

interface ImportCampaignData {
  name: string;
  openRate: string;
  clickRate: string;
  purchaseRate: string;
  unsubscribeRate: string;
  bounceRate: string;
}

export default function CampaignLibraryPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: 'Employee Spotlight',
      createdBy: 'Matthew Johnson',
      role: 'Software Engineer',
      description: 'Top-performing employee of January!',
      type: 'Employee Spotlight',
      status: 'Imported',
      image: '/profile.png',
    },
    {
      id: 2,
      name: 'Employee Spotlight',
      createdBy: 'Matthew Johnson',
      role: 'Software Engineer',
      description: 'Top-performing employee of January!',
      type: 'Employee Spotlight',
      status: 'Imported',
      image: '/profile.png',
    },
    {
      id: 3,
      name: 'Employee Spotlight',
      createdBy: 'Matthew Johnson',
      role: 'Software Engineer',
      description: 'Top-performing employee of January!',
      type: 'Employee Spotlight',
      status: 'Imported',
      image: '/profile.png',
    },
  ]);

  const [importData, setImportData] = useState<ImportCampaignData>({
    name: '',
    openRate: '1%',
    clickRate: '',
    purchaseRate: '',
    unsubscribeRate: '',
    bounceRate: '',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleImportInputChange = (field: keyof ImportCampaignData, value: string) => {
    setImportData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddCampaign = () => {
    if (importData.name.trim()) {
      const newCampaign: Campaign = {
        id: campaigns.length + 1,
        name: importData.name,
        createdBy: 'You',
        role: 'Campaign Manager',
        description: 'New imported campaign',
        type: importData.name,
        status: 'Imported',
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${campaigns.length + 4}`,
      };
      setCampaigns([...campaigns, newCampaign]);
      setImportData({
        name: '',
        openRate: '1%',
        clickRate: '',
        purchaseRate: '',
        unsubscribeRate: '',
        bounceRate: '',
      });
    }
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="text-[#5D586C] border rounded-2xl p-2 mr-2">
            <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-3xl font-bold text-[#5D586C]">Campaign Library</h1>
            <p className="text-sm text-[#5D586C] mt-1">Import Your Previous Campaigns To Reuse As Templates Or For A/B Testing</p>
          </div>
          <button className="px-6 py-2 bg-[#5087FF] text-white rounded-lg font-medium hover:bg-indigo-600">
            Upload
          </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3 ">
          <h2 className="text-2xl font-bold text-[#5D586C] mb-6">Import Campaign</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#5D586C] mb-2">Campaign Name</label>
            <input
              type="text"
              placeholder="Enter Campaign Name"
              value={importData.name}
              onChange={(e) => handleImportInputChange('name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-5 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#5D586C] mb-2">Open Rate</label>
              <input
                type="text"
                placeholder="1%"
                value={importData.openRate}
                onChange={(e) => handleImportInputChange('openRate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5D586C] mb-2">Click through rate</label>
              <input
                type="text"
                placeholder="Enter Campaign Name"
                value={importData.clickRate}
                onChange={(e) => handleImportInputChange('clickRate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5D586C] mb-2">Purchase rate</label>
              <input
                type="text"
                placeholder="Enter Campaign Name"
                value={importData.purchaseRate}
                onChange={(e) => handleImportInputChange('purchaseRate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5D586C] mb-2">Unsubscribe Rate</label>
              <input
                type="text"
                placeholder="Enter Campaign Name"
                value={importData.unsubscribeRate}
                onChange={(e) => handleImportInputChange('unsubscribeRate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5D586C] mb-2">Bounce Rate</label>
              <input
                type="text"
                placeholder="Enter Campaign Name"
                value={importData.bounceRate}
                onChange={(e) => handleImportInputChange('bounceRate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#5D586C] mb-3">Campaign Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-500 cursor-pointer transition">
                <img src='upload.png' alt='upload' className='w-8 h-8 mx-auto mb-2'/>
                <p className="text-[#5D586C] font-medium text-sm mb-1">Upload screenshot</p>
                <p className="text-xs text-gray-400">PNG,JPG (Max 10MB)</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5D586C] mb-3">Campaign HTML (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-500 cursor-pointer transition">
                <img src='upload1.png' alt='upload' className='w-8 h-8 mx-auto mb-2'/>
                <p className="text-[#5D586C] font-medium text-sm mb-1">Upload HTML</p>
                <p className="text-xs text-gray-400">HTML or EML (Max 10MB)</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddCampaign}
            className="w-full py-2 border border-gray-300 text-[#5D586C] rounded-lg bg-[#F3F4F6] font-medium"
          >
            + Add Campaign
          </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-[#5D586C]">Your Campaign</h2>
            <span className="px-3 py-1 text-[#5087FF] border border-[#5087FF] text-sm font-medium rounded-full">
              {campaigns.length} campaigns
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4  text-[#A5A2AD] py-2 border border-gray-300 text-[#5D586C] rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4  text-[#A5A2AD]" />
              Filter
            </button>
            <button className="flex items-center gap-2  text-[#A5A2AD] px-4 py-2 border border-gray-300 text-[#5D586C] rounded-lg hover:bg-gray-50">
              <img src='sort.png' alt='sort' className='w-6 h-6  text-[#A5A2AD]'/>
              Sort by
              <ChevronDown className="w-4 h-4  text-[#A5A2AD]" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-1 hover:shadow-md transition">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#5D586C]">{campaign.createdBy}</h3>
                  <p className="text-sm text-gray-500">{campaign.role}</p>
                </div>
<img src={campaign.image} alt={campaign.name} className="" />
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">{campaign.description}</p>
                </div>

                <div className="flex items-center justify-between ml-2 mb-4">
                  <div className="flex items-center gap-1">
                    <img src='star.png' alt='star' className='w-4 h-4'/>
                    <span className="text-sm font-medium text-[#5D586C]">{campaign.type}</span>
                  </div>
                  <div className='border rounded-xl flex items-center justify-center px-2 py-0.5 mr-2
'>
                  <span className="text-xs text-gray-500">{campaign.status}</span>
                  </div>
                </div>

                <div className="flex gap-1 p-1 rounded-xl w-[92%] mb-4 mx-auto bg-[#F7F7F7]">
                  <button className="flex-1 px-3 py-1 bg-white text-sm font-medium text-[#5D586C] border border-gray-300 rounded-lg hover:bg-gray-50">
                    View
                  </button>
                  <button className="flex-1 px-3 py-1 bg-white  text-sm font-medium text-[#5D586C] border border-gray-300 rounded-lg hover:bg-gray-50">
                    Edit
                  </button>
                  <button className="flex-1 px-3 py-1 bg-white  text-sm font-medium text-[#5D586C] border border-gray-300 rounded-lg hover:bg-gray-50">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}
