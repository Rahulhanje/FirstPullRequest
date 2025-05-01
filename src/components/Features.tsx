import React from 'react';
import { Building2, Code, Sun, SortDesc } from 'lucide-react';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:border-gray-600 transition-all duration-300">
      <div className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Building2 className="h-6 w-6 text-white" />,
      title: "Search by Project",
      description: "Find beginner issues across popular open-source projects from companies like Facebook, Google, Microsoft, and community projects.",
      color: "bg-indigo-600 dark:bg-indigo-500",
    },
    {
      icon: <Code className="h-6 w-6 text-white" />,
      title: "Filter by Language",
      description: "Focus on issues in languages you're comfortable with - JavaScript, TypeScript, Python, C++, C, and many more.",
      color: "bg-blue-600 dark:bg-blue-500",
    },
    {
      icon: <SortDesc className="h-6 w-6 text-white" />,
      title: "Sort  Issues",
      description: "Sort issues by newest, oldest, or most recently updated.",
      color: "bg-purple-600 dark:bg-purple-500",
    },
    {
      icon: <Sun className="h-6 w-6 text-white" />,
      title: "Light & Dark Mode",
      description: "Comfortable browsing experience in any lighting condition. Switch between light and dark mode based on your preference.",
      color: "bg-amber-600 dark:bg-amber-500",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Features Built for Beginners
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to make your first open source contribution successful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;