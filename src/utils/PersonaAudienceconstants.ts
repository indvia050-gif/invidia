// Persona related constants
export const tagColors = [
  'bg-green-100 text-green-700',
  'bg-red-100 text-red-700',
  'bg-blue-100 text-blue-700',
  'bg-yellow-100 text-yellow-700'
];

export const topFeatures = [
  { name: 'Outdoor Recreation Intensity', height: 'h-32' },
  { name: 'Cabin / Lake / Mountain Vacationing', height: 'h-40' },
  { name: 'Slow-Living / Wellness Orientation', height: 'h-36' },
  { name: 'Scenic Travel Preference (vs. Urban)', height: 'h-28' },
  { name: 'Tradition / Heritage-Oriented Style', height: 'h-44' }
];

export const personaMetrics = [
  { value: '0.82', label: 'Silhouette Score' },
  { value: '89%', label: 'Feature Diversity' },
  { value: '12%', label: 'Cluster Overlap' },
  { value: 'High', label: 'Data Enrichment' }
];

// App related constants
export const segments = [
  { id: 1, name: 'New Subscribers', type: 'Lifecycle', size: '1,284', updated: 'Today' },
  { id: 2, name: 'Active Customers', type: 'Lifecycle', size: '642', updated: 'Today' },
  { id: 3, name: 'VIP Customers', type: 'Value', size: '121', updated: 'Today' },
  { id: 4, name: 'Flannel Lovers', type: 'Product Affinity', size: '392', updated: 'Today', hasIndicator: true },
  { id: 5, name: 'Dormant (180+ days)', type: 'Lifecycle', size: '988', updated: 'Today' },
];

export const customerMetrics = [
  { value: 2, label: 'Total Customer' },
  { value: 1, label: 'Avg CLV' },
  { value: 1, label: 'Active Customers' },
  { value: 1, label: 'Avg. Order Value' },
];

export const filterOptions = [
  { label: 'City', options: ['All City'] },
  { label: 'Zip Code', options: ['Any'] },
  { label: 'Total Orders', options: ['Any'] },
  { label: 'Total Sprint', options: ['Any'] },
  { label: 'Avg Discount %', options: ['Any'] },
];

export const additionalFilters = [
  { label: 'Lifecycle Stage', options: ['All City'] },
  { label: 'Persona', options: ['Any'] },
  { label: 'Email Marketing', options: ['Any'] },
];

export const customerTableHeaders = [
  'Customer ID',
  'Name',
  'Email',
  'Phone',
  'City',
];

export const dummyCustomers = Array.from({ length: 6 }, () => ({
  id: `#123456`,
  name: 'Lifecycle',
  email: 'abc@gmail.com',
  phone: '+91 12345 68791',
  city: 'Ahemdabad',
}));

// Sidebar related constants
import {
  LayoutGrid,
  Megaphone,
  BarChart3,
  BookOpen,
  Building2,
  Users
} from 'lucide-react';

export const menuItems = [
  {
    id: 'dashboard' as const,
    icon: LayoutGrid,
    label: 'Dashboard',
    description: 'Performance overview',
    hasChevron: false
  },
  {
    id: 'campaigns' as const,
    icon: Megaphone,
    label: 'Campaigns',
    description: null,
    hasChevron: true
  },
  {
    id: 'analytics' as const,
    icon: BarChart3,
    label: 'Analytics',
    description: null,
    hasChevron: true
  },
  {
    id: 'segments' as const,
    icon: Users,
    label: 'Personas & Audience',
    description: null,
    hasChevron: true
  },
  {
    id: 'playbooks' as const,
    icon: BookOpen,
    label: 'Playbooks',
    description: 'Automation journeys',
    hasChevron: true
  },
  {
    id: 'brand' as const,
    icon: Building2,
    label: 'Brand Management',
    description: null,
    hasChevron: true
  }
];

// Header related constants
export const avatars = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
];

// Create Segment Modal constants
export const segmentOptions = [
  { name: 'New Subscriber', description: 'Signed up but never purchased' },
  { name: 'Window Shoppers', description: 'Browsed but didn\'t buy' },
  { name: 'Active Customers', description: 'Purchased in last 60 days' },
  { name: 'Lapsed Customers', description: 'No Purchase 60-180 days' },
  { name: 'Dormant Customer', description: 'No engagement 180+ days' },
];

export const valueTierOptions = [
  { name: 'VIP Buyers', description: 'Top 20% Lifetime Spend' },
  { name: 'High AOV Buyers', description: 'Above 90th percentile order value' },
  { name: 'Discount-only Buyers', description: 'Primarily purchase with discounts' },
];

export const occasionOptions = [
  'Life Event',
  'First Purchase Anniversary within next',
  'Signup Anniversary within next',
];

export const engagementLevelOptions = [
  { name: 'Active', description: 'Engaged in last 30 days' },
  { name: 'Warm', description: 'Last engaged in 30-60 days ago' },
  { name: 'Cold', description: 'Last engaged in 60-90 days ago' },
  { name: 'Churn Risk', description: 'No engagement 90+ days' },
];

export const engagementBehaviors = [
  'Opened Email in last',
  'Clicked Email in last',
  'Visited Website in last',
  'Viewed Product in last',
  'Added to cart in last',
  'Abandoned checkout in last',
];

// Segmentation Settings Modal constants
export const lifecycleStages = [
  { name: 'New Subscribers', description: 'Joined Email list in last X days', defaultValue: 30 },
  { name: 'Active Shopper', description: 'Viewed or added to cart recently', defaultValue: 30 },
  { name: 'Active Customer', description: 'Purchased recently', defaultValue: 30 },
  { name: 'Lapsed Customer', description: 'No purchase since', defaultValue: 30 },
  { name: 'Dormant', description: 'No engagement in a long time', defaultValue: 30 },
];

export const engagementLevels = [
  { name: 'Active', description: 'Opened converted in last X days', defaultValue: 30 },
  { name: 'Warm', description: 'Last engagement between X and Y days ago', defaultValues: [30, 60] },
  { name: 'Cold', description: 'Last engagement between X and Y days ago', defaultValues: [30, 60] },
  { name: 'Churn Risk', description: 'No engagement in X+ days', defaultValue: 30 },
];

export const buyingTiers = [
  { name: 'VIP Buyers', description: 'Lifetime Spend >X * Median CLV', defaultValue: 1.5, unit: 'x Median' },
  { name: 'Recent High-Value', description: 'CLV > Median CLV in last X days', defaultValue: 90, unit: 'days' },
  { name: 'High AOV Buyers', description: 'AOV >> Xth Percentile', defaultValue: 90, unit: 'th Percentile' },
  { name: 'Discount Buyers', description: 'Average Discount % >= X%', defaultValue: 30, unit: '%' },
];

export const buyerPersonas = [
    {
      id: 'bp1',
      cluster: 'Cluster 1',
      tags: ['$60-79K HHI', '45-54 Active', '$1M+ Moderate ($)', '44+ High Subscriber'],
      title: 'Cabin Weekender',
      contacts: 228,
      persona: 'Millennial couple, travel to cabin retreats, cooks at home, buys organic, values warmth.'
    },
    {
      id: 'bp2',
      cluster: 'Cluster 2',
      tags: ['$60-79K HHI', '55+ Active', '$1M+ Moderate ($)', '44+ High Subscriber'],
      title: 'Gentle Adventurer',
      contacts: 228,
      persona: 'Outdoors-inspired but not technical; seeks comfort, style, and subtle performance.'
    },
    {
      id: 'bp3',
      cluster: 'Cluster 3',
      tags: ['$40-59K HHI', '35% Active', '$1M+ Valuer ($)', '44+ Low Subscriber'],
      title: 'Summer Wayfarer',
      contacts: 228,
      persona: 'Easygoing explorer who values experiences over things; spontaneous and lighthearted.'
    },
    {
      id: 'bp4',
      cluster: 'Cluster 4',
      tags: ['$60-79K HHI', '55% Active', '$1M+ Moderate ($)', '44+ Low Subs/Go+'],
      title: 'Heritage Minimalist',
      contacts: 228,
      persona: 'Discerning, design-minded professional; prefers timeless quality over excess.'
    }
  ];

export const existingPersonas = [
    {
      id: 'ep1',
      cluster: 'Cluster 1',
      tags: ['$60-79K HHI', '45% Active', '$1M+ Moderate ($)', '44+ Low Subscriber'],
      title: 'Cabin Weekender',
      contacts: 228,
      persona: 'Millennial couple, travel to cabin retreats, cooks at home, buys organic, values warmth.'
    },
    {
      id: 'ep2',
      cluster: 'Cluster 2',
      tags: ['$60-79K HHI', '55% Active', '$1M+ Moderate ($)', '44+ Low Subscriber'],
      title: 'Gentle Adventurer',
      contacts: 228,
      persona: 'Outdoors-inspired but not technical; seeks comfort, style, and subtle performance.'
    },
    {
      id: 'ep3',
      cluster: 'Cluster 3',
      tags: ['$60-79K HHI', '35% Active', '$1M+ Valuer ($)', '44+ Low Subscriber'],
      title: 'Summer Wayfarer',
      contacts: 228,
      persona: 'Easygoing explorer who values experiences over things; spontaneous and lighthearted.'
    },
    {
      id: 'ep4',
      cluster: 'Cluster 4',
      tags: ['$60-79K HHI', '55% Active', '$1M+ Moderate ($)', '44+ Low Subs/Go+'],
      title: 'Heritage Minimalist',
      contacts: 228,
      persona: 'Discerning, design-minded professional; prefers timeless quality over excess.'
    }
  ];