import { X } from 'lucide-react';
import { lifecycleStages, engagementLevels, buyingTiers } from '../../utils/PersonaAudienceconstants';

interface SegmentationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SegmentationSettingsModal=({ isOpen, onClose }: SegmentationSettingsModalProps)=> {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Customer Segmentation Settings</h2>
            <p className="text-sm text-gray-500 mt-1">
              Configure How Individia Automatically Categorizes Your Customers Based On Purchase Behavior, Spending Patterns, And Engagement Activity.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-8">
            <section>
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900">A/B Testing</h3>
                <p className="text-sm text-gray-500 mt-1">Test Different Variations To Optimize Campaign Performance</p>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        LIFECYCLE STAGE
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                        DESCRIPTION
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        TIME WINDOW
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lifecycleStages.map((stage, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-4 text-sm text-gray-900">{stage.name}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{stage.description}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              defaultValue={stage.defaultValue}
                              className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600">Days</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900">Lifecycle Stage</h3>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        LIFECYCLE STAGE
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                        DESCRIPTION
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        TIME WINDOW
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lifecycleStages.map((stage, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-4 text-sm text-gray-900">{stage.name}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{stage.description}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              defaultValue={stage.defaultValue}
                              className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600">Days</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900">Engagement Level</h3>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        LIFECYCLE STAGE
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                        DESCRIPTION
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        TIME WINDOW
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {engagementLevels.map((level, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-4 text-sm text-gray-900">{level.name}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{level.description}</td>
                        <td className="px-4 py-4">
                          {level.defaultValues ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                defaultValue={level.defaultValues[0]}
                                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-600">-</span>
                              <input
                                type="number"
                                defaultValue={level.defaultValues[1]}
                                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-600">Days</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                defaultValue={level.defaultValue}
                                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-600">Days</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900">Buying Tier</h3>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        TIER NAME
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                        DESCRIPTION
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        THRESHOLD
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {buyingTiers.map((tier, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-4 text-sm text-gray-900">{tier.name}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{tier.description}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              defaultValue={tier.defaultValue}
                              step={tier.unit === 'x Median' ? '0.1' : '1'}
                              className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600">{tier.unit}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
          >
            Close
          </button>
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg font-medium"
            >
              Reset
            </button>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SegmentationSettingsModal;
