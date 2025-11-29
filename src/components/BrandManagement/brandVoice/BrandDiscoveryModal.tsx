import { useState } from 'react';
import { ChevronRight, Trash2, X, Plus } from 'lucide-react';

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
    menu: 'Brand Foundation',
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
    subtitle: 'Who Is Your Ideal Customer?',
    menu: 'Target Customer',
    type: 'text'
  },
  {
    id: 7,
    title: 'Competition And Market Position',
    subtitle: 'Who Is Your Ideal Customer ?',
    menu: 'Competition',
    type: 'text'
  },
  {
    id: 8,
    title: 'Communication Style',
    subtitle: 'How Do You Want To Communicate With Your Customers?',
    menu: 'Communication Style',
    type: 'text'
  },
  {
    id: 9,
    title: 'Target Category',
    subtitle: 'Define Your Market Segment And Discover Consumer Pain Points.',
    menu: 'Target Category',
    type: 'text'
  }
];

const stageOptions = [
  { label: 'Just getting started', timeframe: '(0-6 months)', icon: '/Frame-1.png' },
  { label: 'Building momentum', timeframe: '(6 months-2years)', icon: '/Frame-2.png' },
  { label: 'Established and growing', timeframe: '(2-5 years)', icon: '/Frame-3.png' },
  { label: 'Scaling and expanding', timeframe: '(5+ years)', icon: '/Frame-4.png' }
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
  const [targetCustomerData, setTargetCustomerData] = useState({
    ageRange: '',
    incomeLevel: '',
    primaryInterests: [] as string[],
    shoppingBehaviours: [] as string[],
  });
  const [sliderValues, setSliderValues] = useState({
    professional: 50,
    luxury: 50,
    bold: 50,
    playful: 50,
    traditional: 50
  });
  // Step 7: Competition
  const [competitors, setCompetitors] = useState([
    { name: '', website: '' },
    { name: '', website: '' },
    { name: '', website: '' }
  ]);
  const handleCompetitorChange = (idx: number, field: 'name' | 'website', value: string) => {
    const updated = competitors.map((c, i) => i === idx ? { ...c, [field]: value } : c);
    setCompetitors(updated);
  };
  const addCompetitor = () => setCompetitors([...competitors, { name: '', website: '' }]);
  const removeCompetitor = (idx: number) => setCompetitors(competitors.filter((_, i) => i !== idx));
  const [valuePosition, setValuePosition] = useState('');
  const [admiredBrands, setAdmiredBrands] = useState('');
  // Step 8: Communication Style
  const styles = [
    { label: 'Educational & Expert', desc: 'Here is why this ingredient works...' },
    { label: 'Friendly & Conversational', desc: 'Hey there !!! we’ve got something exciting' },
    { label: 'Inspiring & Motivational', desc: 'You deserve to feel amazing every day' },
    { label: 'Exclusive & Premium', desc: 'As a valued member, you got first access' },
    { label: 'Fun & Entertaining', desc: 'Plot twist, this product will change your life' }
  ];
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);
  // Step 9: Target Category
  const primarySegments = ['Fashion', 'Beauty', 'Technology', 'Food & Drink', 'Home/Garden', 'Parenting', 'Finance', 'Entertainment', 'Arts & Culture', 'Sports'];
  const geographicFocus = ['Global', 'Local', 'Regional', 'National'];
  const [categoryData, setCategoryData] = useState({
    primarySegment: '',
    subSegment: '',
    targetNiche: '',
    geographicFocus: ''
  });

  const step = steps[currentStep];

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
      // Mark current step as uncomplete when going back
      const newCompleted = completedSteps.filter(id => id !== step.id);
      setCompletedSteps(newCompleted);
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (step.id) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-base font-medium text-[#6F6B7D] mb-3">Brand Story</label>
              <textarea
                value={formData[step.id] || ''}
                onChange={(e) => setFormData({ ...formData, [step.id]: e.target.value })}
                placeholder="Tell us your story....."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
                rows={1}
              />
            </div>
            <div>
              <label className="block text-base font-medium text-[#6F6B7D] mb-3">What year did you launch?</label>
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
          </div>
        );
      case 6:
        const ageRanges = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
        const incomeLevels = ['Under $25k', '$25k-$50k', '$50k-$100k', '$100k-$200k', '$200k+'];
        const primaryInterests = ['Sustainability', 'Wellness', 'Beauty', 'Fashion', 'Technology', 'Fitness', 'Travel', 'Food & Drink', 'Home/Garden', 'Parenting', 'Career', 'Finance', 'Entertainment', 'Arts & Culture', 'Sports'];
        const shoppingBehaviours = ['Price-conscious', 'Quality-focused', 'Convenience-driven', 'Brand-loyal', 'Early adopters', 'Research-heavy', 'Impulse buyers', 'Socially conscious'];
        return (
          <div className="space-y-6">
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-base font-medium text-[#6F6B7D] mb-2">Age Range</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-base cursor-pointer"
                  value={targetCustomerData.ageRange}
                  onChange={e => setTargetCustomerData({ ...targetCustomerData, ageRange: e.target.value })}
                >
                  <option className='text[#5D586C]' value="">Select age range</option>
                  {ageRanges.map((range, idx) => (
                    <option key={idx} value={range}>{range}</option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-base font-medium text-[#6F6B7D] mb-2">Income Level</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-base cursor-pointer"
                  value={targetCustomerData.incomeLevel}
                  onChange={e => setTargetCustomerData({ ...targetCustomerData, incomeLevel: e.target.value })}
                >
                  <option className='text-[#5D586C]' value="">Select income level</option>
                  {incomeLevels.map((level, idx) => (
                    <option className='text-[#5D586C]' key={idx} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-base font-medium text-[#6F6B7D] mb-2">Primary Interests (Select all that apply)</label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {primaryInterests.map((interest, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`border text-[#5D586C] rounded-lg px-4 py-2 text-base transition-all ${targetCustomerData.primaryInterests.includes(interest) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                    onClick={() => {
                      const updated = targetCustomerData.primaryInterests.includes(interest)
                        ? targetCustomerData.primaryInterests.filter((i: string) => i !== interest)
                        : [...targetCustomerData.primaryInterests, interest];
                      setTargetCustomerData({ ...targetCustomerData, primaryInterests: updated });
                    }}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-base font-medium text-[#6F6B7D] mb-2">Shopping Behaviour</label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {shoppingBehaviours.map((behaviour, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`border text-[#5D586C] rounded-lg px-4 py-2 text-base transition-all ${targetCustomerData.shoppingBehaviours.includes(behaviour) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                    onClick={() => {
                      const updated = targetCustomerData.shoppingBehaviours.includes(behaviour)
                        ? targetCustomerData.shoppingBehaviours.filter((b: string) => b !== behaviour)
                        : [...targetCustomerData.shoppingBehaviours, behaviour];
                      setTargetCustomerData({ ...targetCustomerData, shoppingBehaviours: updated });
                    }}
                  >
                    {behaviour}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 7:
        // Competition JSX
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-base font-medium text-[#6F6B7D]">Competitor</label>
                <button
                  type="button"
                  onClick={addCompetitor}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg p-2 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              {competitors.map((c, idx) => (
                <div key={idx} className="flex gap-4 mb-3 items-center">
                  <input
                    type="text"
                    className="px-4 py-3 border border-gray-300 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    placeholder="Competitor name"
                    value={c.name}
                    onChange={e => handleCompetitorChange(idx, 'name', e.target.value)}
                  />
                  <input
                    type="text"
                    className="px-4 py-3 border border-gray-300 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    placeholder="https://website.com"
                    value={c.website}
                    onChange={e => handleCompetitorChange(idx, 'website', e.target.value)}
                  />
                  {competitors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCompetitor(idx)}
                      className="text-red-400 hover:text-red-500 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            <button type="button" onClick={addCompetitor} className="w-full py-2 bg-[#F3F4F6] text-sm border border-gray-300 rounded-lg text-black mt-2">+ Add Another Competitor</button>
            </div>
            <div>
              <label className="block text-base font-medium text-[#6F6B7D] mb-2">What makes you different from them?</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
                rows={1}
                placeholder="Describe your value position"
                value={valuePosition}
                onChange={e => setValuePosition(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-base font-medium text-[#6F6B7D] mb-2">Which brands do you admire (even outside your industry)?</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                placeholder="e.g., Apple..."
                value={admiredBrands}
                onChange={e => setAdmiredBrands(e.target.value)}
              />
            </div>
          </div>
        );
      case 8:
        // Communication Style JSX
        return (
          <div className="space-y-2">
            {styles.map((style, idx) => (
              <button
                key={idx}
                type="button"
                className={`w-full text-left p-3 mb-3 border rounded-xl transition-all ${selectedStyle === idx ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                onClick={() => setSelectedStyle(idx)}
              >
                <div className="font-semibold text-md text-[#6F6B7D] mb-1">{style.label}</div>
                <div className="text-sm text-gray-500">{style.desc}</div>
              </button>
            ))}
          </div>
        );
      case 9:
        // Target Category UI
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-base font-medium text-[#6F6B7D] mb-2">Primary Segment</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-base cursor-pointer"
                value={categoryData.primarySegment}
                onChange={e => setCategoryData({ ...categoryData, primarySegment: e.target.value })}
              >
                <option value="">Select segment</option>
                {primarySegments.map((seg, idx) => (
                  <option className='text-[#5D586C]' key={idx} value={seg}>{seg}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-base font-medium text-[#6F6B7D] mb-2">Sub-segment</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                placeholder="e.g., Skincare"
                value={categoryData.subSegment}
                onChange={e => setCategoryData({ ...categoryData, subSegment: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-base font-medium text-[#6F6B7D] mb-2">Target Niche</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                placeholder="XYZ..."
                value={categoryData.targetNiche}
                onChange={e => setCategoryData({ ...categoryData, targetNiche: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-base font-medium text-[#6F6B7D] mb-2">Geographic Focus</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-base cursor-pointer"
                value={categoryData.geographicFocus}
                onChange={e => setCategoryData({ ...categoryData, geographicFocus: e.target.value })}
              >
                <option value="">Select focus</option>
                {geographicFocus.map((geo, idx) => (
                  <option key={idx} value={geo}>{geo}</option>
                ))}
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-4 sm:px-6 md:px-10 lg:px-14">
            {stageOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setFormData({ ...formData, [step.id]: idx })}
                className={`p-3 sm:p-4 border-2 rounded-xl text-center transition-all min-h-[100px] ${formData[step.id] === idx
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
              >
                <img className='h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-2' src={option.icon} alt="" />
                <div className="text-sm font-medium text-[#6F6B7D] mb-1">{option.label}</div>
                <div className="text-xs text-gray-500">{option.timeframe}</div>
              </button>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="space-y-2 mb-4">
            <div className="text-sm font-medium text-[#6F6B7D] text-center mb-3">Select all that apply</div>
            {aspirationOptions.map((option, idx) => (
              <label
                key={idx}
                className={`flex items-center p-3 mx-4 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-16 border-2 rounded-lg cursor-pointer transition-all ${formData[step.id] === idx
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
                <span className="ml-3 text-sm text-[#6F6B7D]">{option}</span>
              </label>
            ))}
          </div>
        );
      case 3:
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
      case 5:
        return (
          <div className="space-y-6 mx-4 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-16">
            {[{ key: 'professional', label: 'Professional', left: 'Casual', right: 'Professional' },
            { key: 'luxury', label: 'Luxury', left: 'Accessible', right: 'Luxury' },
            { key: 'bold', label: 'Bold', left: 'Subtle', right: 'Bold' },
            { key: 'playful', label: 'Playful', left: 'Serious', right: 'Playful' },
            { key: 'traditional', label: 'Traditional', left: 'Innovative', right: 'Traditional' }
            ].map((slider) => (
              <div key={slider.key}>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-base font-medium text-[#6F6B7D]">{slider.label}</label>
                </div>
                <div style={{ position: 'relative', width: '100%' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: `calc(${sliderValues[slider.key as keyof typeof sliderValues]}% - 12px)`,
                      top: '-17px',
                      backgroundColor: '#5087FF',
                      fontSize: '12px',
                      color: 'white',
                      fontWeight: 600,
                      pointerEvents: 'none',
                      width: '24px',
                      borderRadius: "4px",
                      textAlign: 'center',
                    }}
                  >
                    {sliderValues[slider.key as keyof typeof sliderValues]}
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
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#5087FF]"
                    style={{ background: `linear-gradient(to right, #5087FF 0%, #5087FF ${sliderValues[slider.key as keyof typeof sliderValues]}%, #e5e7eb ${sliderValues[slider.key as keyof typeof sliderValues]}%, #e5e7eb 100%)` }}
                  />
                </div>
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full h-full sm:h-[90vh] md:h-[85vh] lg:h-[80vh] flex flex-col shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-gray-400 hover:text-[#6F6B7D] transition-colors z-10"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="flex flex-1  border-b overflow-hidden">
          {/* Left Sidebar - Steps Navigation */}
          <div className="w-full sm:w-72 lg:w-80 p-2 rounded-lg overflow-y-auto bg-white flex-shrink-0">
            <div className="border p-2 rounded-lg space-y-1">
              {steps.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-3 rounded-lg text-sm transition-all ${currentStep === idx
                      ? 'text-[#5C5C5C] bg-gray-50'
                      : 'text-[#6F6B7D] hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 flex items-center justify-center text-sm font-medium rounded-full flex-shrink-0 ${completedSteps.includes(s.id)
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
            <div className="overflow-y-auto p-4 pt-6 sm:pt-8 md:pt-10">
              <h3 className="text-lg sm:text-xl text-center font-semibold text-[#6F6B7D] mb-2">{step.title}</h3>
              <p className="text-sm text-[#6F6B7D] text-center mb-4 sm:mb-6">{step.subtitle}</p>
              {renderStepContent()}
            </div>
          </div>

        </div>
        {/* Footer Buttons */}
        <div className="flex gap-2 sm:gap-4 p-2 sm:p-2 justify-between border-t border-gray-200 bg-white">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 sm:px-8 py-2 border border-gray-300 rounded-lg font-medium transition-colors text-sm sm:text-base ${currentStep === 0
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
            className="flex items-center gap-2 px-4 sm:px-8 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base ml-auto"
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
