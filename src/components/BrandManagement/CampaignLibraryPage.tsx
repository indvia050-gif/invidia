import { useState } from 'react';
import { Upload, Search, Filter, ChevronDown, Star } from 'lucide-react';

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
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    },
    {
      id: 2,
      name: 'Employee Spotlight',
      createdBy: 'Matthew Johnson',
      role: 'Software Engineer',
      description: 'Top-performing employee of January!',
      type: 'Employee Spotlight',
      status: 'Imported',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    },
    {
      id: 3,
      name: 'Employee Spotlight',
      createdBy: 'Matthew Johnson',
      role: 'Software Engineer',
      description: 'Top-performing employee of January!',
      type: 'Employee Spotlight',
      status: 'Imported',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
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
  const [sortBy, setSortBy] = useState('newest');

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
            <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaign Library</h1>
            <p className="text-sm text-gray-500 mt-1">Import Your Previous Campaigns To Reuse As Templates Or For A/B Testing</p>
          </div>
          <button className="px-6 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600">
            Upload
          </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Import Campaign</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Open Rate</label>
              <input
                type="text"
                placeholder="1%"
                value={importData.openRate}
                onChange={(e) => handleImportInputChange('openRate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Click through rate</label>
              <input
                type="text"
                placeholder="Enter Campaign Name"
                value={importData.clickRate}
                onChange={(e) => handleImportInputChange('clickRate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Purchase rate</label>
              <input
                type="text"
                placeholder="Enter Campaign Name"
                value={importData.purchaseRate}
                onChange={(e) => handleImportInputChange('purchaseRate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unsubscribe Rate</label>
              <input
                type="text"
                placeholder="Enter Campaign Name"
                value={importData.unsubscribeRate}
                onChange={(e) => handleImportInputChange('unsubscribeRate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bounce Rate</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-3">Campaign Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-500 cursor-pointer transition">
                <Upload className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-gray-700 font-medium text-sm mb-1">Upload screenshot</p>
                <p className="text-xs text-gray-400">PNG,JPG (Max 10MB)</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Campaign HTML (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-500 cursor-pointer transition">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600">📋</span>
                </div>
                <p className="text-gray-700 font-medium text-sm mb-1">Upload HTML</p>
                <p className="text-xs text-gray-400">HTML or EML (Max 10MB)</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddCampaign}
            className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            + Add Campaign
          </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Campaign</h2>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full">
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
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Sort by
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.createdBy}</h3>
                  <p className="text-sm text-gray-500">{campaign.role}</p>
                </div>

                <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-indigo-200 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center overflow-hidden">
                  <img src={campaign.image} alt={campaign.name} className="w-full h-full object-cover" />
                </div>

                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">{campaign.description}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-gray-400 fill-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{campaign.type}</span>
                  </div>
                  <span className="text-xs text-gray-500">{campaign.status}</span>
                </div>

                <div className="flex gap-2 border-t border-gray-200 pt-4">
                  <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                    View
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Edit
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
