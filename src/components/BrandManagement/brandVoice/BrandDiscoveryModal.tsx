import { useState } from 'react';
import { ChevronRight, X, CheckCircle2 } from 'lucide-react';

interface StepData {
  id: number;
  title: string;
  subtitle: string;
  type: 'text' | 'select' | 'options' | 'sliders';
}

const steps: StepData[] = [
  {
    id: 1,
    title: 'Brand Foundation Story',
    subtitle: 'Tell Us , What Inspires To You To Start A Business ?',
    type: 'text'
  },
  {
    id: 2,
    title: 'Where Are You In Your Journey ?',
    subtitle: 'Help Us To Understand Your Current Stage',
    type: 'options'
  },
  {
    id: 3,
    title: 'Audience Size & Growth',
    subtitle: 'Tell Us About Your Current Reach And Goals',
    type: 'select'
  },
  {
    id: 4,
    title: 'Brand Aspirations',
    subtitle: 'Where Do You Want Your Brand To Be In 3 Years',
    type: 'options'
  },
  {
    id: 5,
    title: 'Brand Personality',
    subtitle: 'How Would You Describe Your Brand\'s Personality?',
    type: 'sliders'
  },
  {
    id: 6,
    title: 'Target Customer',
    subtitle: 'Who is your ideal customer ?',
    type: 'text'
  },
  {
    id: 7,
    title: 'Competition',
    subtitle: 'Market position and differentiation',
    type: 'text'
  },
  {
    id: 8,
    title: 'Communication Style',
    subtitle: 'How do you talk to customers?',
    type: 'text'
  },
  {
    id: 9,
    title: 'Target Category',
    subtitle: 'Define your market segment and discover consumer pain points.',
    type: 'text'
  }
];

const stageOptions = [
  { label: 'Just getting started', timeframe: '(0-6 months)', icon: '🚀' },
  { label: 'Building momentum', timeframe: '(6 months-2years)', icon: '📈' },
  { label: 'Established and growing', timeframe: '(2-5 years)', icon: '🏢' },
  { label: 'Scaling and expanding', timeframe: '(5+ years)', icon: '⭐' }
];

const aspirationOptions = [
  'Industry leader in our category',
  'Expand to new product lines',
  'International expansion',
  'Multi-million dollar revenue',
  'Household brand name',
  'Acquired by larger company',
  'IPO/Public company'
];

const audienceOptions = [
  'Under 1,000',
  '1,000 - 10,000',
  '10,000 - 50,000',
  '50,000 - 100,000',
  '100,000 - 500,000',
  '500,000+'
];

const growthGoals = [
  'Maintain current size',
  '10% growth',
  '25% growth',
  '50% growth',
  '100% growth',
  '200%+ growth'
];

interface BrandDiscoveryModalProps {
  onClose: () => void;
}

function BrandDiscoveryModal({ onClose }: BrandDiscoveryModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<Record<number, any>>({});
  const [sliderValues, setSliderValues] = useState({
    professional: 50,
    luxury: 50,
    bold: 50,
    playful: 50,
    traditional: 50
  });

  const step = steps[currentStep];
  const isStepCompleted = completedSteps.includes(step.id);

  const handleNext = () => {
    const newCompleted = [...completedSteps];
    if (!newCompleted.includes(step.id)) {
      newCompleted.push(step.id);
      setCompletedSteps(newCompleted);
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (step.type) {
      case 'text':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {step.id === 1 && 'Brand Story'}
              {step.id === 6 && 'Target Customer'}
              {step.id === 7 && 'Competition'}
              {step.id === 8 && 'Communication Style'}
              {step.id === 9 && 'Target Category'}
            </label>
            <textarea
              value={formData[step.id] || ''}
              onChange={(e) => setFormData({ ...formData, [step.id]: e.target.value })}
              placeholder={step.id === 1 ? 'Tell us your story.....' : 'Enter your answer...'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
            {step.id === 1 && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What year did you launch?
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                  <option>2001</option>
                  <option>2002</option>
                  <option>2003</option>
                </select>
              </div>
            )}
          </div>
        );

      case 'options':
        if (step.id === 2) {
          return (
            <div className="grid grid-cols-2 gap-3">
              {stageOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setFormData({ ...formData, [step.id]: idx })}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    formData[step.id] === idx
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{option.icon}</div>
                  <div className="text-sm font-medium text-gray-800">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.timeframe}</div>
                </button>
              ))}
            </div>
          );
        } else if (step.id === 4) {
          return (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700 mb-3">Select all that apply</div>
              {aspirationOptions.map((option, idx) => (
                <label key={idx} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    className="w-4 h-4 text-blue-600 border-gray-300"
                    checked={formData[step.id] === idx}
                    onChange={() => setFormData({ ...formData, [step.id]: idx })}
                  />
                  <span className="ml-3 text-sm font-medium text-gray-800">{option}</span>
                </label>
              ))}
            </div>
          );
        }
        break;

      case 'select':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your current email subscriber count ?
              </label>
              <select
                value={formData[step.id]?.audience || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  [step.id]: { ...formData[step.id], audience: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option>Select your audience size</option>
                {audienceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your subscriber growth goal for next 12 months ?
              </label>
              <select
                value={formData[step.id]?.growth || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  [step.id]: { ...formData[step.id], growth: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option>Select your growth goal</option>
                {growthGoals.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'sliders':
        return (
          <div className="space-y-6">
            {[
              { key: 'professional', label: 'Professional', left: 'Casual', right: 'Professional' },
              { key: 'luxury', label: 'Luxury', left: 'Accessible', right: 'Luxury' },
              { key: 'bold', label: 'Bold', left: 'Subtle', right: 'Bold' },
              { key: 'playful', label: 'Playful', left: 'Serious', right: 'Playful' },
              { key: 'traditional', label: 'Traditional', left: 'Innovative', right: 'Traditional' }
            ].map((slider) => (
              <div key={slider.key}>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-600">{slider.label}</label>
                  <span className="text-xs font-semibold bg-blue-500 text-white px-2 py-1 rounded">
                    {sliderValues[slider.key as keyof typeof sliderValues]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValues[slider.key as keyof typeof sliderValues]}
                  onChange={(e) => setSliderValues({
                    ...sliderValues,
                    [slider.key]: parseInt(e.target.value)
                  })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{slider.left}</span>
                  <span>{slider.right}</span>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Brand Discovery</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-40 border-r border-gray-200 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-2">
              {steps.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-all ${
                    completedSteps.includes(s.id)
                      ? 'text-gray-700 font-medium'
                      : currentStep === idx
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {completedSteps.includes(s.id) ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <span className={`w-5 h-5 flex items-center justify-center text-xs font-semibold rounded-full ${
                      currentStep === idx ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {s.id}
                    </span>
                  )}
                  <span className="text-left">{s.title.split(' ')[0]}</span>
                  {currentStep === idx && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 p-8 overflow-y-auto flex flex-col">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 mb-6">{step.subtitle}</p>
              {renderStepContent()}
            </div>

            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors ml-auto"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandDiscoveryModal;
