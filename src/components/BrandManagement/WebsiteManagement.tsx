import { Trash2 } from 'lucide-react';

interface SocialMediaOption {
  name: string;
  icon: string;
  color: string;
}

const socialMediaOptions: SocialMediaOption[] = [
  { name: 'Microsoft Office 365', icon: '📊', color: 'bg-orange-50 border-orange-200' },
  { name: 'Zoom', icon: '📹', color: 'bg-blue-50 border-blue-200' },
  { name: 'Slack', icon: '💬', color: 'bg-purple-50 border-purple-200' },
  { name: 'Trello', icon: '📋', color: 'bg-blue-50 border-blue-300' },
];

function UrlManagement() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">Website URLs</h1>
            <p className="text-sm text-gray-500">Add Your Main Designs And Landing Pages</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 mb-4">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-base font-medium text-gray-700">Website 1</h2>
              <button className="text-red-500 hover:text-red-600">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                  <option>Select Category...</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="text"
                placeholder="www.example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description(Optional)
              </label>
              <input
                type="text"
                placeholder="e.g.Main homepage with hero section"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="verify-url"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="verify-url" className="ml-2 text-sm text-gray-700">
                Automatically verify URL status
              </label>
            </div>

            <button className="w-full py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              + Add Another Website URL
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Amazon Products</h2>
              <p className="text-sm text-gray-500">Track Your Amazon Listing</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amazon Product URL
              </label>
              <input
                type="text"
                placeholder="www.example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              />

              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="monitor-price"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="monitor-price" className="ml-2 text-sm text-gray-700">
                    Monitor price changes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="track-stock"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="track-stock" className="ml-2 text-sm text-gray-700">
                    Track stock availability
                  </label>
                </div>
              </div>
            </div>

            <button className="w-full py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              + Add Another Amazon Product
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Social Media Profiles</h2>
              <p className="text-sm text-gray-500">Connect your social media accounts</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {socialMediaOptions.map((option, index) => (
                <button
                  key={index}
                  className={`flex items-center gap-3 p-3 border rounded-lg hover:shadow-sm transition-shadow ${option.color}`}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UrlManagement;
