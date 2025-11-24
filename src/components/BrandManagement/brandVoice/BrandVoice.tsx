import { useState } from 'react';
import { Lightbulb, Target, TrendingUp, Users, MessageSquare, Zap, Monitor, Award, BarChart3 } from 'lucide-react';
import BrandDiscoveryModal from './BrandDiscoveryModal';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Brand Foundation',
    description: 'Tell us your brand story',
    icon: <Lightbulb className="w-6 h-6 text-[#5D586C]" />
  },
  {
    number: 2,
    title: 'Current Stage',
    description: 'Where are you in your journey ?',
    icon: <Target className="w-6 h-6 text-[#5D586C]" />
  },
  {
    number: 3,
    title: 'Audience & Growth',
    description: 'Current size and goals',
    icon: <TrendingUp className="w-6 h-6 text-[#5D586C]" />
  },
  {
    number: 4,
    title: 'Brand Aspirations',
    description: 'Where do you want to be ?',
    icon: <Users className="w-6 h-6 text-[#5D586C]" />
  },
  {
    number: 5,
    title: 'Brand Personality',
    description: 'How do you express yourself ?',
    icon: <Zap className="w-6 h-6 text-[#5D586C]" />
  },
  {
    number: 6,
    title: 'Target Customer',
    description: 'Who is your ideal customer ?',
    icon: <Users className="w-6 h-6 text-[#5D586C]" />
  },
  {
    number: 7,
    title: 'Competition',
    description: 'Market position and differentiation',
    icon: <Monitor className="w-6 h-6 text-[#5D586C]" />
  },
  {
    number: 8,
    title: 'Communication Style',
    description: 'How do you talk to customers?',
    icon: <MessageSquare className="w-6 h-6 text-[#5D586C]" />
  },
  {
    number: 9,
    title: 'Target Category',
    description: 'Define your market segment and discover consumer pain points.',
    icon: <Award className="w-6 h-6 text-[#5D586C]" />
  }
];

const benefits = [
  {
    title: 'Personalized Campaigns',
    description: 'Get campaign suggestions tailored to your brand personality and growth goals.',
    icon: <Target className="w-6 h-6 text-gray-600" />
  },
  {
    title: 'Consistent Voice',
    description: 'Maintain consistent communication style across all your marketing channels.',
    icon: <MessageSquare className="w-6 h-6 text-gray-600" />
  },
  {
    title: 'Better Results',
    description: 'Achieve higher engagement with content that resonates with your audience',
    icon: <BarChart3 className="w-6 h-6 text-gray-600" />
  }
];

interface BrandIdentityProps {
  onBack?: () => void;
}

function BrandIdentity({ onBack }: BrandIdentityProps) {
  const [showModal, setShowModal] = useState(false);

  if (showModal) {
    return <BrandDiscoveryModal onClose={() => setShowModal(false)} />;
  }

  return (
    <div className="border rounded-xl bg-gray-50 p-3">
        <div className="mb-3">
          <h1 className="text-3xl font-semibold text-[#5D586C] mb-2">Brand Identity</h1>
          <p className="text-[#5D586C]">Help Us Understand Your Brand To Create Personalized Campaigns And Content.</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-3 mb-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#5D586C] mb-3">Discover your brand identity</h2>
            <p className="text-sm text-[#5D586C] mb-6">Take our 8-step questionnaire to help us understand your unique brand story,goals and personality.This will enable us to provide personalized campaign  suggestions and content recommendations.</p>
          </div>

          <div className="mb-2">
            <h3 className="text-base font-semibold text-[#5D586C] mb-2">Completion Progress</h3>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center h-[5vh] w-[20vw] gap-2 px-6 py-3 bg-[#5087FF] text-white rounded-lg hover:bg-[#3D6CE8] transition-colors"
            >
              <span>▶</span>
              <span style={{fontSize:"14px"}}>Start Brand Discovery</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#5D586C] mb-2">What We'll Discover Together</h2>
            <p className="text-sm text-[#5D586C]">Our questionnaire covers 8 key areas to build your complete brand profile</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[#5D586C] mb-1">
                    Step {step.number}: {step.title}
                  </h3>
                  <p className="text-sm text-[#5D586C]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="grid grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 border rounded-lg p-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  {benefit.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#5D586C] ">{benefit.title}</h3>
                  <p className="text-sm text-[#5D586C] leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}

export default BrandIdentity;
