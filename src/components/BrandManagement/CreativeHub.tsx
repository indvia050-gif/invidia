import { LinkIcon, Mail, Palette } from "lucide-react"

const CreativeHub=()=>{

    return (
            <div className="max-w-7xl mx-auto p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Creative Hub</h1>
                <p className="text-sm text-gray-500 mt-1">Centralize And Manage All Your Brand Assets And Integrations.</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="text-4xl font-bold text-gray-900">12</div>
                  <div className="text-sm text-gray-600 mt-2">Brand Assets</div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="text-4xl font-bold text-gray-900">48</div>
                  <div className="text-sm text-gray-600 mt-2">Campaigns</div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="text-4xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-gray-600 mt-2">Integrations</div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Assets & Content</h2>
                <p className="text-sm text-gray-500 mb-6">Manage Creative Assets And Content Resources</p>

                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col items-center p-8 border border-gray-200 rounded-lg hover:shadow-md transition">
                    <Palette className="w-12 h-12 text-indigo-500 mb-3" />
                    <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-medium rounded-full mb-4">
                      12 assets
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Brand Assets</h3>
                    <p className="text-sm text-gray-500 text-center mb-6">
                      Manage logos , colors , fonts and brand guidelines.
                    </p>
                    <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600">
                      Manage Assets
                    </button>
                  </div>

                  <div className="flex flex-col items-center p-8 border border-gray-200 rounded-lg hover:shadow-md transition">
                    <Mail className="w-12 h-12 text-indigo-500 mb-3" />
                    <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-medium rounded-full mb-4">
                      48 campaign
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Campaign Library</h3>
                    <p className="text-sm text-gray-500 text-center mb-6">
                      Store and organize past email campaigns.
                    </p>
                    <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600">
                      Manage Assets
                    </button>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-2">Integrations</h2>
                <p className="text-sm text-gray-500 mb-6">Connect External Platforms And Services</p>

                <div className="flex flex-col items-center p-8 border border-gray-200 rounded-lg hover:shadow-md transition">
                  <LinkIcon className="w-12 h-12 text-indigo-500 mb-3" />
                  <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-medium rounded-full mb-4">
                    15 tracked links
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Website & Links</h3>
                  <p className="text-sm text-gray-500 text-center mb-6">
                    Track websites , Amazon links , and competitors
                  </p>
                  <button className="w-full max-w-sm px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600">
                    Manage Assets
                  </button>
                </div>
              </div>
            </div>
)}
export default CreativeHub