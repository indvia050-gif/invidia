import { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  MoreVertical,
  Filter,
  Download
} from 'lucide-react';
import SegmentationSettingsModal from './components/PersonaAndAudience/SegmentationSettingsModal';
import CreateSegmentModal from './components/PersonaAndAudience/CreateSegmentModal';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BrandAssetSetup from './components/BrandManagement/BrandAssetsSetup';
import { segments, customerMetrics, filterOptions, additionalFilters, customerTableHeaders, dummyCustomers } from './utils/PersonaAudienceconstants';
import CreativeHub from './components/BrandManagement/CreativeHub';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isCreateSegmentModalOpen, setIsCreateSegmentModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'campaigns' | 'analytics' | 'segments' | 'playbooks' | 'brand' | 'brand-setup' | 'settings' | 'profile'>('segments');

  const handleNavigate = (page: 'dashboard' | 'campaigns' | 'analytics' | 'segments' | 'playbooks' | 'brand' | 'settings') => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    if (currentPage === 'profile') {
      setCurrentPage('segments');
    }
  };

  const handleNext = () => {
    if (currentPage === 'segments') {
      setCurrentPage('profile');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onBack={handleBack}
          onNext={handleNext}
        />

        <div className="flex-1 overflow-auto bg-gray-50">
          {currentPage === 'segments' && (
            
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 mr-2">
                <div className="mb-6">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Users className="w-5 h-5" />
                  <h1 className="text-2xl font-semibold text-gray-900">Audience Segments</h1>
                </div>
                <p className="text-sm text-gray-500">Automatically Updated Customer Groups For Targeting And Messaging.</p>
              </div>
                <div className= "py-7 px-4 border-b border-gray-200 flex items-center justify-between gap-4">
                  <div className="flex-1 relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5087FF]"
                    />
                  </div>
                  <button
                    onClick={() => setIsSettingsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">Create Segmentation settings</span>
                  </button>
                  <button
                    onClick={() => setIsCreateSegmentModalOpen(true)}
                    className="px-4 py-2 bg-[#5087FF] text-white rounded-lg font-medium hover:bg-[#3D6CE8]"
                  >
                    Create Segment
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="w-12 px-6 py-3"></th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Segment Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Updated
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {segments.map((segment) => (
                        <tr key={segment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-[#5087FF] border-gray-300 rounded focus:ring-[#5087FF]"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-[#5087FF] hover:text-[#3D6CE8] cursor-pointer">
                              {segment.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-700">{segment.type}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-900">{segment.size}</span>
                              {segment.hasIndicator && (
                                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {segment.updated}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
          )}

          {currentPage === 'profile' && (
            <div className="max-w-7xl mx-auto p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Customer Profile</h1>
                  <p className="text-sm text-gray-500 mt-1">View and analyze detailed customer information across all attributes</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">last synced with shopify</span>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#5087FF] text-white rounded-lg font-medium hover:bg-[#3D6CE8]">
                    <Plus className="w-4 h-4" />
                    Add Contact
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                {customerMetrics.map((metric, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="text-4xl font-bold text-gray-900">{metric.value}</div>
                    <div className="text-sm text-gray-600 mt-2">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-5 gap-4">
                  {filterOptions.map((filter, idx) => (
                    <div key={idx}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{filter.label}</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5087FF]">
                        {filter.options.map((option, i) => (
                          <option key={i}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  {additionalFilters.map((filter, idx) => (
                    <div key={idx}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{filter.label}</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5087FF]">
                        {filter.options.map((option, i) => (
                          <option key={i}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex-1 relative max-w-md">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5087FF]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                      <span className="text-sm">Filter</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#5087FF] text-white rounded-lg font-medium hover:bg-[#3D6CE8]">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Export</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="w-12 px-6 py-3"></th>
                          {customerTableHeaders.map((header, idx) => (
                            <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {header}
                            </th>
                          ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dummyCustomers.map((customer, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-[#5087FF] border-gray-300 rounded focus:ring-[#5087FF]"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-[#5087FF] hover:text-[#3D6CE8] cursor-pointer">{customer.id}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-700">{customer.name}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-700">{customer.email}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-700">{customer.phone}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-700">{customer.city}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'brand' && (
            <CreativeHub onOpenSetup={() => setCurrentPage('brand-setup')} />
          )}

          {currentPage === 'brand-setup' && (
            <BrandAssetSetup />
          )}

          {(currentPage === 'dashboard' || currentPage === 'campaigns' || currentPage === 'analytics' || currentPage === 'playbooks' || currentPage === 'settings') && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Page</h2>
                <p className="text-gray-600">This page is under development</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <SegmentationSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      <CreateSegmentModal
        isOpen={isCreateSegmentModalOpen}
        onClose={() => setIsCreateSegmentModalOpen(false)}
      />
    </div>
  );
}

export default App;
