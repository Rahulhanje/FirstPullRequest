import React, { useState } from 'react';
import { BookOpen, Code, GitBranch, FileText, Search, Filter, ExternalLink } from 'lucide-react';
import { 
  SiElastic, SiTldraw, SiApacheairflow, SiAppwrite, 
  SiReact, SiOpenfaas, SiKubernetes, SiOpenapiinitiative, 
  SiProcessingfoundation, SiStylelint, SiTensorflow, SiZulip,
  SiMozilla, SiGnome, SiGit, SiJupyter, SiApache, SiPhp, 
  SiDocker, SiPostgresql, SiMariadb, SiOpenstreetmap, SiBlender, 
  SiGimp, SiLibreoffice, SiWikipedia, SiFreebsd, SiGitlab, 
  SiVim, SiRedis, SiLlvm, SiR, SiInkscape, SiMysql, SiSqlite, 
  SiKrita, SiNextcloud, SiDrupal, SiWordpress, SiJoomla,
  SiLinux, SiNumpy
} from 'react-icons/si';
import { FaHandsHelping, FaNodeJs, FaPython, FaJava } from 'react-icons/fa';
import { IoLogoMicrosoft } from 'react-icons/io5';
import { MdNat, MdScience, MdSchool } from 'react-icons/md';
import { TbHttpTrace, TbBrandCpp } from 'react-icons/tb';
import { GiMetalPlate, GiArtificialIntelligence } from 'react-icons/gi';
import { Pipette } from 'lucide-react';
import { FaGolang } from 'react-icons/fa6';
import { BiData } from 'react-icons/bi';
import { HiAcademicCap } from 'react-icons/hi';
import { BsCodeSquare, BsGear } from 'react-icons/bs';

const OpenSourceDocumentation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');

  const COMPANIES = [
    { name: 'First Contributions', repo: 'firstcontributions/first-contributions', icon: <FaHandsHelping className="w-6 h-6" />, language: 'All Languages' },
    
    // Major Tech Companies
    { name: 'Google', repo: 'google/material-design-icons', icon: <BsCodeSquare className="w-6 h-6" />, language: 'JavaScript' },
    { name: 'Microsoft', repo: 'microsoft/vscode', icon: <IoLogoMicrosoft className="w-6 h-6" />, language: 'TypeScript' },
    { name: 'Facebook (Meta)', repo: 'facebook/react', icon: <SiReact className="w-6 h-6" />, language: 'JavaScript' },
    { name: 'Mozilla', repo: 'mozilla/firefox-translations', icon: <SiMozilla className="w-6 h-6" />, language: 'Python' },
    
    // Apache Software Foundation
    { name: 'Apache Software Foundation', repo: 'apache/airflow', icon: <SiApacheairflow className="w-6 h-6" />, language: 'Python' },
    { name: 'Apache Kafka', repo: 'apache/kafka', icon: <SiApache className="w-6 h-6" />, language: 'Java' },
    { name: 'Apache Spark', repo: 'apache/spark', icon: <SiApache className="w-6 h-6" />, language: 'Scala' },
    { name: 'Apache Maven', repo: 'apache/maven', icon: <SiApache className="w-6 h-6" />, language: 'Java' },
    { name: 'Apache Beam', repo: 'apache/beam', icon: <SiApache className="w-6 h-6" />, language: 'Java' },
    
    // Programming Languages & Frameworks
    { name: 'Node.js', repo: 'nodejs/node', icon: <FaNodeJs className="w-6 h-6" />, language: 'JavaScript' },
    { name: 'Python Software Foundation', repo: 'python/cpython', icon: <FaPython className="w-6 h-6" />, language: 'Python' },
    { name: 'Golang', repo: 'golang/go', icon: <FaGolang className="w-6 h-6" />, language: 'Go' },
    { name: 'PHP', repo: 'php/php-src', icon: <SiPhp className="w-6 h-6" />, language: 'PHP' },
    { name: 'Ruby', repo: 'ruby/ruby', icon: <BsGear className="w-6 h-6" />, language: 'Ruby' },
    
    // Cloud Native & DevOps
    { name: 'Kubernetes', repo: 'kubernetes/kubernetes', icon: <SiKubernetes className="w-6 h-6" />, language: 'Go' },
    { name: 'Docker', repo: 'docker/cli', icon: <SiDocker className="w-6 h-6" />, language: 'Go' },
    { name: 'GitLab', repo: 'gitlab-org/gitlab', icon: <SiGitlab className="w-6 h-6" />, language: 'Ruby' },
    { name: 'Prometheus', repo: 'prometheus/prometheus', icon: <BsGear className="w-6 h-6" />, language: 'Go' },
    
    // AI/ML & Data Science
    { name: 'TensorFlow', repo: 'tensorflow/tensorflow', icon: <SiTensorflow className="w-6 h-6" />, language: 'Python' },
    { name: 'Scikit-learn', repo: 'scikit-learn/scikit-learn', icon: <GiArtificialIntelligence className="w-6 h-6" />, language: 'Python' },
    { name: 'NumPy', repo: 'numpy/numpy', icon: <SiNumpy className="w-6 h-6" />, language: 'Python' },
    { name: 'Pandas', repo: 'pandas-dev/pandas', icon: <BiData className="w-6 h-6" />, language: 'Python' },
    { name: 'Jupyter', repo: 'jupyter/notebook', icon: <SiJupyter className="w-6 h-6" />, language: 'Python' },
    { name: 'PyTorch', repo: 'pytorch/pytorch', icon: <GiArtificialIntelligence className="w-6 h-6" />, language: 'Python' },
    
    // Operating Systems & Low Level
    { name: 'FreeBSD', repo: 'freebsd/freebsd-src', icon: <SiFreebsd className="w-6 h-6" />, language: 'C' },
    { name: 'Linux Kernel', repo: 'torvalds/linux', icon: <SiLinux className="w-6 h-6" />, language: 'C' },
    { name: 'LLVM', repo: 'llvm/llvm-project', icon: <SiLlvm className="w-6 h-6" />, language: 'C++' },
    { name: 'GCC', repo: 'gcc-mirror/gcc', icon: <TbBrandCpp className="w-6 h-6" />, language: 'C++' },
    
    // Databases
    { name: 'PostgreSQL', repo: 'postgres/postgres', icon: <SiPostgresql className="w-6 h-6" />, language: 'C' },
    { name: 'MariaDB', repo: 'mariadb/server', icon: <SiMariadb className="w-6 h-6" />, language: 'C++' },
    { name: 'Redis', repo: 'redis/redis', icon: <SiRedis className="w-6 h-6" />, language: 'C' },
    { name: 'SQLite', repo: 'sqlite/sqlite', icon: <SiSqlite className="w-6 h-6" />, language: 'C' },
    { name: 'MySQL', repo: 'mysql/mysql-server', icon: <SiMysql className="w-6 h-6" />, language: 'C++' },
    
    // Creative & Media Tools
    { name: 'Blender', repo: 'blender/blender', icon: <SiBlender className="w-6 h-6" />, language: 'C++' },
    { name: 'GIMP', repo: 'gnome/gimp', icon: <SiGimp className="w-6 h-6" />, language: 'C' },
    { name: 'Inkscape', repo: 'inkscape/inkscape', icon: <SiInkscape className="w-6 h-6" />, language: 'C++' },
    { name: 'Krita', repo: 'kde/krita', icon: <SiKrita className="w-6 h-6" />, language: 'C++' },
    { name: 'VLC', repo: 'videolan/vlc', icon: <BsGear className="w-6 h-6" />, language: 'C' },
    
    // Text Editors & Development Tools
    { name: 'Vim', repo: 'vim/vim', icon: <SiVim className="w-6 h-6" />, language: 'C' },
    { name: 'Emacs', repo: 'emacs-mirror/emacs', icon: <BsGear className="w-6 h-6" />, language: 'C' },
    { name: 'Git', repo: 'git/git', icon: <SiGit className="w-6 h-6" />, language: 'C' },
    
    // Web Frameworks & CMS
    { name: 'WordPress', repo: 'wordpress/wordpress-develop', icon: <SiWordpress className="w-6 h-6" />, language: 'PHP' },
    { name: 'Drupal', repo: 'drupal/drupal', icon: <SiDrupal className="w-6 h-6" />, language: 'PHP' },
    { name: 'Joomla', repo: 'joomla/joomla-cms', icon: <SiJoomla className="w-6 h-6" />, language: 'PHP' },
    { name: 'Django', repo: 'django/django', icon: <FaPython className="w-6 h-6" />, language: 'Python' },
    { name: 'Flask', repo: 'pallets/flask', icon: <FaPython className="w-6 h-6" />, language: 'Python' },
    
    // Desktop Environments & GUI
    { name: 'GNOME', repo: 'gnome/gtk', icon: <SiGnome className="w-6 h-6" />, language: 'C' },
    { name: 'KDE', repo: 'kde/plasma-desktop', icon: <BsGear className="w-6 h-6" />, language: 'C++' },
    { name: 'Qt', repo: 'qt/qtbase', icon: <BsGear className="w-6 h-6" />, language: 'C++' },
    
    // Educational & Non-Profit
    { name: 'Wikimedia', repo: 'wikimedia/mediawiki', icon: <SiWikipedia className="w-6 h-6" />, language: 'PHP' },
    { name: 'OpenStreetMap', repo: 'openstreetmap/openstreetmap-website', icon: <SiOpenstreetmap className="w-6 h-6" />, language: 'Ruby' },
    { name: 'Khan Academy', repo: 'khan/khan-exercises', icon: <HiAcademicCap className="w-6 h-6" />, language: 'JavaScript' },
    { name: 'Moodle', repo: 'moodle/moodle', icon: <MdSchool className="w-6 h-6" />, language: 'PHP' },
    
    // Cloud & Enterprise
    { name: 'LibreOffice', repo: 'libreoffice/core', icon: <SiLibreoffice className="w-6 h-6" />, language: 'C++' },
    { name: 'Nextcloud', repo: 'nextcloud/server', icon: <SiNextcloud className="w-6 h-6" />, language: 'PHP' },
    { name: 'ownCloud', repo: 'owncloud/core', icon: <BsGear className="w-6 h-6" />, language: 'PHP' },
    
    // Scientific Computing
    { name: 'SciPy', repo: 'scipy/scipy', icon: <MdScience className="w-6 h-6" />, language: 'Python' },
    { name: 'R Project', repo: 'wch/r-source', icon: <SiR className="w-6 h-6" />, language: 'R' },
    { name: 'Matplotlib', repo: 'matplotlib/matplotlib', icon: <BiData className="w-6 h-6" />, language: 'Python' },
    
    // Previously existing entries (updated)
    { name: 'Elastic', repo: 'elastic/kibana', icon: <SiElastic className="w-6 h-6" />, language: 'TypeScript' },
    { name: 'Tldr-pages', repo: 'tldr-pages/tldr', icon: <SiTldraw className="w-6 h-6" />, language: 'Markdown' },
    { name: 'Appwrite', repo: 'appwrite/appwrite', icon: <SiAppwrite className="w-6 h-6" />, language: 'TypeScript' },
    { name: 'getodk', repo: 'getodk/collect', icon: <SiOpenfaas className="w-6 h-6" />, language: 'Java' },
    { name: 'Mdn', repo: 'mdn/content', icon: <MdNat className="w-6 h-6" />, language: 'Markdown' },
    { name: 'Oppia', repo: 'oppia/oppia', icon: <SiOpenapiinitiative className="w-6 h-6" />, language: 'Python' },
    { name: 'Processing Website', repo: 'processing/processing-website', icon: <SiProcessingfoundation className="w-6 h-6" />, language: 'JavaScript' },
    { name: 'Pypa', repo: 'pypa/pip', icon: <Pipette className="w-6 h-6" />, language: 'Python' },
    { name: 'Stylelint', repo: 'stylelint/stylelint', icon: <SiStylelint className="w-6 h-6" />, language: 'JavaScript' },
    { name: 'traceloop', repo: 'traceloop/openllmetry', icon: <TbHttpTrace className="w-6 h-6" />, language: 'Python' },
    { name: 'MetaMask', repo: 'metamask/metamask-extension', icon: <GiMetalPlate className="w-6 h-6" />, language: 'JavaScript and TypeScript' },
    { name: 'Zulip', repo: 'zulip/zulip', icon: <SiZulip className="w-6 h-6" />, language: 'Python' },
  ];

  // Get unique languages for filter
  const languages = [...new Set(COMPANIES.map(company => company.language))];

  // Filter companies based on search term and language filter
  const filteredCompanies = COMPANIES.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          company.repo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.language.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLanguage = languageFilter === '' || company.language === languageFilter;
    
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="container mx-auto px-4 py-12 pt-28 ">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Open Source Projects</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover and contribute to popular open source projects across different languages and technologies
          </p>
        </div>
        <section className="mb-16 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <div className="sm:flex items-center grid grid-cols-1 gap-3 mb-6">
            <div><BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" /></div>
            <h2 className="text-3xl font-semibold">Getting Started with Open Source</h2>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-4">
              Contributing to open source is a rewarding way to learn, teach, share, and build experience. 
              Whether you're a beginner or an experienced developer, there's a project that needs your skills.
            </p>
            <p className="text-lg">
              Browse through our curated list of organizations and repositories below to find projects that match your 
              interests and expertise. Each listing includes the primary programming language and a direct link to the repository.
            </p>
          </div>
        </section>
        {/* Search and Filter */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search projects, organizations, languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
            >
              <option value="">All Languages</option>
              {languages.map((language, index) => (
                <option key={index} value={language}>{language}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Introduction Section */}
        

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredCompanies.map((company, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                  {company.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{company.name}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{company.repo}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700">
                  {company.language}
                </span>
                <a 
                  href={`https://github.com/${company.repo}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Repository
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Contributing Guide Section */}
        <section className="mb-16 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <GitBranch className="h-8 w-8 text-green-600 dark:text-green-400" />
            <h2 className="text-3xl font-semibold">How to Contribute</h2>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-4">
              Ready to make your first contribution? Here's a simple guide to get started:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li className="text-lg">Fork the repository you're interested in</li>
              <li className="text-lg">Clone your fork to your local machine</li>
              <li className="text-lg">Create a new branch for your changes</li>
              <li className="text-lg">Make your changes and commit them</li>
              <li className="text-lg">Push your changes to your fork</li>
              <li className="text-lg">Open a pull request from your fork to the original repository</li>
            </ol>
            <p className="text-lg mt-4">
              Remember to check the CONTRIBUTING.md file in each repository for project-specific guidelines.
            </p>
          </div>
        </section>

        {/* Best Practices Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <h2 className="text-3xl font-semibold">Open Source Best Practices</h2>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-4">
              Follow these best practices to make your open source journey successful:
            </p>
            <ul className="space-y-3">
              <li className="text-lg flex items-start gap-2">
                <Code className="h-5 w-5 mt-1 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                <span>Start with projects tagged "good first issue" or "beginner-friendly"</span>
              </li>
              <li className="text-lg flex items-start gap-2">
                <Code className="h-5 w-5 mt-1 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                <span>Read the code of conduct and contributing guidelines before starting</span>
              </li>
              <li className="text-lg flex items-start gap-2">
                <Code className="h-5 w-5 mt-1 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                <span>Communicate clearly in issues and pull requests</span>
              </li>
              <li className="text-lg flex items-start gap-2">
                <Code className="h-5 w-5 mt-1 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                <span>Write descriptive commit messages and keep PRs focused</span>
              </li>
              <li className="text-lg flex items-start gap-2">
                <Code className="h-5 w-5 mt-1 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                <span>Be patient and respectful of maintainers' time</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OpenSourceDocumentation;