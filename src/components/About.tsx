import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const AboutItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start gap-2 mb-3">
    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
    <p className="text-gray-700 dark:text-gray-300">{text}</p>
  </div>
);

const About: React.FC = () => {
  const benefits = [
    "Build real-world experience by working on production code",
    "Learn professional development practices and workflows",
    "Connect with mentors and the developer community",
    "Enhance your portfolio with meaningful contributions",
    "Gain confidence in your programming skills",
    "Understand large codebases and collaborative development"
  ];

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Why Open Source Matters for Beginners
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Contributing to open source is one of the most effective ways to grow as a developer. 
                It's not just about coding – it's about collaboration, communication, and building 
                confidence in a supportive community.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <AboutItem key={index} text={benefit} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700">
              <div className="aspect-w-16 aspect-h-9 mb-8 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                <div className="p-6">
                  <div className="flex space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="font-mono text-xs text-gray-800 dark:text-gray-200 overflow-hidden">
                    <div className="text-green-600 dark:text-green-400">$ git clone https://github.com/example/project.git</div>
                    <div className="text-gray-600 dark:text-gray-400">Cloning into 'project'...</div>
                    <div className="text-gray-600 dark:text-gray-400">remote: Counting objects: 100, done.</div>
                    <div className="text-green-600 dark:text-green-400">$ cd project</div>
                    <div className="text-green-600 dark:text-green-400">$ git checkout -b fix-issue-123</div>
                    <div className="text-gray-600 dark:text-gray-400">Switched to a new branch 'fix-issue-123'</div>
                    <div className="text-green-600 dark:text-green-400">$ npm install</div>
                    <div className="text-gray-600 dark:text-gray-400">Installing dependencies...</div>
                    <div className="text-gray-600 dark:text-gray-400">✓ Done</div>
                    <div className="text-green-600 dark:text-green-400">$ npm test</div>
                    <div className="text-gray-600 dark:text-gray-400">PASS  src/components/__tests__/App.test.js</div>
                    <div className="text-gray-600 dark:text-gray-400">PASS  src/utils/__tests__/api.test.js</div>
                    <div className="text-gray-600 dark:text-gray-400">Test Suites: 2 passed, 2 total</div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                From Beginner to Contributor in 4 Steps
              </h3>
              
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">1</div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Find an issue</h4>
                    <p className="text-gray-600 dark:text-gray-400">Use FirstPullRequest to discover beginner-friendly issues that match your skills.</p>
                  </div>
                </li>
                
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">2</div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Fork & clone</h4>
                    <p className="text-gray-600 dark:text-gray-400">Fork the repository and clone it to your local machine.</p>
                  </div>
                </li>
                
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">3</div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Work on the issue</h4>
                    <p className="text-gray-600 dark:text-gray-400">Make your changes, test them thoroughly, and commit.</p>
                  </div>
                </li>
                
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">4</div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Submit a pull request</h4>
                    <p className="text-gray-600 dark:text-gray-400">Push your changes and create a pull request for review.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;