import { useState } from 'react';
import { ChevronRight, X, CheckCircle2 } from 'lucide-react';

interface StepData {
  id: number;
  title: string;
  subtitle: string;
  menu?: string;
  type: 'text' | 'select' | 'options' | 'sliders';
}

const steps: StepData[] = [
  {
    id: 1,
    title: 'Brand Foundation Story',
    menu:'Brand Foundation',
    subtitle: 'Tell Us , What Inspires To You To Start A Business ?',
    type: 'text'
  },
  {
    id: 2,
    title: 'Where Are You In Your Journey ?',
    subtitle: 'Help Us To Understand Your Current Stage',
    menu: 'Current Stage',
    type: 'options'
  },
  {
    id: 3,
    title: 'Audience Size & Growth',
    subtitle: 'Tell Us About Your Current Reach And Goals',
    menu: 'Audience & Growth',
    type: 'select'
  },
  {
    id: 4,
    title: 'Brand Aspirations',
    subtitle: 'Where Do You Want Your Brand To Be In 3 Years',
    menu: 'Brand Aspirations',
    type: 'options'
  },
  {
    id: 5,
    title: 'Brand Personality',
    subtitle: 'How Would You Describe Your Brand\'s Personality?',
    menu: 'Brand Personality',
    type: 'sliders'
  },
  {
    id: 6,
    title: 'Target Customer',
    subtitle: 'Who is your ideal customer ?',
    menu: 'Target Customer',
    type: 'text'
  },
  {
    id: 7,
    title: 'Competition',
    subtitle: 'Market position and differentiation',
    menu: 'Competition',
    type: 'text'
  },
  {
    id: 8,
    title: 'Communication Style',
    subtitle: 'How do you talk to customers?',
    menu: 'Communication Style',
    type: 'text'
  },
  {
    id: 9,
    title: 'Target Category',
    subtitle: 'Define your market segment and discover consumer pain points.',
    menu: 'Target Category',
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
          <div className="space-y-6">
            <div>
              <label className="block text-base font-medium text-[#6F6B7D] mb-3">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
                rows={1}
              />
            </div>
            {step.id === 1 && (
              <div>
                <label className="block text-base font-medium text-[#6F6B7D] mb-3">
                  What year did you launch?
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-base cursor-pointer">
                  <option>2001</option>
                  <option>2002</option>
                  <option>2003</option>
                  <option>2004</option>
                  <option>2005</option>
                  <option>2010</option>
                  <option>2015</option>
                  <option>2020</option>
                  <option>2021</option>
                  <option>2022</option>
                  <option>2023</option>
                  <option>2024</option>
                  <option>2025</option>
                </select>
              </div>
            )}
          </div>
        );

      case 'options':
        if (step.id === 2) {
          return (
            <div className="grid grid-cols-2 gap-4 mx-20 ">
              {stageOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setFormData({ ...formData, [step.id]: idx })}
                  className={`p-6 border-2 w-[14vw] h-[20vh] rounded-xl text-center transition-all ${
                    formData[step.id] === idx
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="text-3xl mb-3">{option.icon}</div>
                  <div style={{fontSize:"14px"}} className=" flex justify-center items-center text-[#6F6B7D]">{option.label}</div>
                  <div style={{fontSize:"14px"}} className=" text-gray-500">{option.timeframe}</div>
                </button>
              ))}
            </div>
          );
        } else if (step.id === 4) {
          return (
            <div className="space-y-3 mb-5">
              <div className="text-sm font-medium text-[#6F6B7D] text-center mb-4">Select all that apply</div>
              {aspirationOptions.map((option, idx) => (
                <label 
                  key={idx} 
                  className={`flex items-center p-4 mx-[15%] border-2 rounded-lg cursor-pointer transition-all ${
                    formData[step.id] === idx
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    checked={formData[step.id] === idx}
                    onChange={() => setFormData({ ...formData, [step.id]: idx })}
                  />
                  <span className="ml-3 text-base text-[#6F6B7D]">{option}</span>
                </label>
              ))}
            </div>
          );
        }
        break;

      case 'select':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-base font-medium text-[#6F6B7D] mb-3">
                What is your current email subscriber count ?
              </label>
              <select
                value={formData[step.id]?.audience || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  [step.id]: { ...formData[step.id], audience: e.target.value }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-base cursor-pointer"
              >
                <option>Select your audience size</option>
                {audienceOptions.map((opt) => (
                  <option className='text-[#6F6B7D]' key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-base font-medium text-[#6F6B7D] mb-3">
                What is your subscriber growth goal for next 12 months ?
              </label>
              <select
                value={formData[step.id]?.growth || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  [step.id]: { ...formData[step.id], growth: e.target.value }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-base cursor-pointer"
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
          <div className="space-y-8 mx-[15%]">
            {[
              { key: 'professional', label: 'Professional', left: 'Casual', right: 'Professional' },
              { key: 'luxury', label: 'Luxury', left: 'Accessible', right: 'Luxury' },
              { key: 'bold', label: 'Bold', left: 'Subtle', right: 'Bold' },
              { key: 'playful', label: 'Playful', left: 'Serious', right: 'Playful' },
              { key: 'traditional', label: 'Traditional', left: 'Innovative', right: 'Traditional' }
            ].map((slider) => (
              <div key={slider.key}>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-base font-medium text-[#6F6B7D]">{slider.label}</label>
                  <span className="text-sm font-semibold bg-blue-500 text-white px-3 py-1 rounded-full">
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
                <div className="flex justify-between text-sm text-gray-500 mt-2">
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full h-[100%] flex flex-col shadow-2xl">
                 <button
          onClick={onClose}
          className="absolute right-[19%] items-center p-2 text-gray-400 hover:text-[#6F6B7D] transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex flex-1  border-b overflow-hidden">
          {/* Left Sidebar - Steps Navigation */}
          <div className="w-[18vw] p-3 rounded-lg overflow-y-auto bg-white">
            <div className="border w-[16vw]  p-2 rounded-lg space-y-1">
              {steps.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-4 rounded-lg text-sm transition-all ${
                    currentStep === idx
                      ? 'text-[#5C5C5C] bg-gray-50'
                      : 'text-[#6F6B7D] hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 flex items-center justify-center text-sm font-medium rounded-full flex-shrink-0 ${
                      completedSteps.includes(s.id)
                        ? 'bg-green-500 text-white'
                        : currentStep === idx 
                        ? 'bg-white text-[#6F6B7D] border-2 border-gray-300' 
                        : 'bg-white text-gray-500 border border-gray-300'
                    }`}>
                      {completedSteps.includes(s.id) ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        s.id
                      )}
                    </span>
                    <span className={`text-left ${currentStep === idx ? 'font-medium' : ''}`}>
                      {s.menu}
                    </span>
                  </div>
                  {currentStep === idx && (
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className=" overflow-y-auto p-4 mt-[20%]">
              <h3 className="text-2xl text-center font-semibold  text-[#6F6B7D] mb-2">{step.title}</h3>
              <p className="text-base text-[#6F6B7D] text-center mb-8">{step.subtitle}</p>
              {renderStepContent()}
            </div>

        
          </div>
    
        </div>
                  {/* Footer Buttons */}
            <div className="flex gap-4 py-3 mx-4 justify-between border-gray-200 bg-white">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-2  px-8 py-2 border border-gray-300 rounded-lg font-medium transition-colors ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#6F6B7D] hover:bg-gray-50'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors ml-auto"
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
      </div>
    </div>
  );
}

export default BrandDiscoveryModal;
