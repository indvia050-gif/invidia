import { X } from 'lucide-react';
import { useState } from 'react';
import {
  segmentOptions,
  valueTierOptions,
  occasionOptions,
  engagementLevelOptions,
  engagementBehaviors
} from '../../utils/PersonaAudienceconstants';

interface CreateSegmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

 const CreateSegmentModal =({ isOpen, onClose }: CreateSegmentModalProps)=> {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(['Life Event']);
  const [selectedEngagementLevels, setSelectedEngagementLevels] = useState<string[]>([]);
  const [occasionDays, setOccasionDays] = useState('30');
  const [engagementBehaviorDays, setEngagementBehaviorDays] = useState<Record<string, string>>({
    'Opened Email': '30',
    'Clicked Email': '30',
    'Visited Website': '30',
    'Viewed Product': '30',
    'Added to cart': '30',
    'Abandoned checkout': '30',
  });

  const toggleSegment = (name: string) => {
    setSelectedSegments(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  const toggleOccasion = (name: string) => {
    setSelectedOccasions(prev =>
      prev.includes(name) ? prev.filter(o => o !== name) : [...prev, name]
    );
  };

  const toggleEngagementLevel = (name: string) => {
    setSelectedEngagementLevels(prev =>
      prev.includes(name) ? prev.filter(e => e !== name) : [...prev, name]
    );
  };

  const toggleEngagementBehavior = (behavior: string) => {
    if (engagementBehaviorDays.hasOwnProperty(behavior)) {
      const newDays = { ...engagementBehaviorDays };
      delete newDays[behavior];
      setEngagementBehaviorDays(newDays);
    } else {
      setEngagementBehaviorDays({ ...engagementBehaviorDays, [behavior]: '30' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Create New Segment</h2>
            <p className="text-sm text-gray-500 mt-1">
              Select customer attributes to build your target audience. Your segment will update automatically as customers meet the criteria
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
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Segment Name
              </label>
              <input
                type="text"
                placeholder="e.g., Warm Cart"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Segment Name
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {segmentOptions.map((option) => (
                    <div
                      key={option.name}
                      className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer"
                      onClick={() => toggleSegment(option.name)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSegments.includes(option.name)}
                        onChange={() => {}}
                        className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{option.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {valueTierOptions.map((option) => (
                    <div
                      key={option.name}
                      className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer"
                      onClick={() => toggleSegment(option.name)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSegments.includes(option.name)}
                        onChange={() => {}}
                        className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{option.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Occasions
              </label>
              <div className="space-y-3">
                {occasionOptions.map((option) => (
                  <div
                    key={option}
                    className="flex items-center gap-3 p-3 border border-blue-300 rounded-lg bg-blue-50"
                    onClick={() => toggleOccasion(option)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedOccasions.includes(option)}
                      onChange={() => {}}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="flex-1 text-sm font-medium text-gray-900">{option}</span>
                    {selectedOccasions.includes(option) && (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={occasionDays}
                          onChange={(e) => setOccasionDays(e.target.value)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600">days</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-400 flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <span className="text-sm text-amber-900">Choose Either Engagement Level OR Engagement Behaviors</span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4 cursor-pointer">
                <input
                  type="radio"
                  id="engagement-level"
                  name="engagement-choice"
                  defaultChecked
                  className="w-4 h-4"
                />
                <label htmlFor="engagement-level" className="text-sm font-medium text-gray-900">
                  Engagement Level
                </label>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {engagementLevelOptions.map((option) => (
                  <div
                    key={option.name}
                    className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer"
                    onClick={() => toggleEngagementLevel(option.name)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedEngagementLevels.includes(option.name)}
                      onChange={() => {}}
                      className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{option.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Engagement Behaviors (Optional)
              </label>
              <div className="space-y-2">
                {engagementBehaviors.map((behavior) => {
                  const isChecked = engagementBehaviorDays.hasOwnProperty(behavior);
                  return (
                    <div
                      key={behavior}
                      className="flex items-center gap-3 p-3 border border-blue-200 rounded-lg bg-blue-50"
                      onClick={() => toggleEngagementBehavior(behavior)}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="flex-1 text-sm font-medium text-gray-900">{behavior}</span>
                      {isChecked && (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={engagementBehaviorDays[behavior]}
                            onChange={(e) =>
                              setEngagementBehaviorDays({
                                ...engagementBehaviorDays,
                                [behavior]: e.target.value,
                              })
                            }
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-600">days</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
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
export default CreateSegmentModal;