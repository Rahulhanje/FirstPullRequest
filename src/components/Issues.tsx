import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { ExternalLink, ChevronLeft, ChevronRight, Search, Filter, X, Pipette } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { SiReact, SiKubernetes, SiTensorflow, SiProcessingfoundation, SiAppwrite, SiOpenfaas, SiOpenapiinitiative, SiApacheairflow, SiZulip, SiElectron, SiTldraw, SiElastic, SiStylelint, SiNumpy, SiMozilla, SiGnome, SiGit, SiJupyter, SiApache, SiPhp, SiDocker, SiPostgresql, SiMariadb, SiOpenstreetmap, SiBlender, SiGimp, SiLibreoffice, SiWikipedia, SiFreebsd, SiGitlab, SiVim, SiRedis, SiLlvm, SiR, SiInkscape, SiMysql, SiSqlite, SiKrita, SiGnuemacs, SiNextcloud, SiDrupal, SiWordpress, SiJoomla, SiLinux } from 'react-icons/si';
import { FaHandsHelping, FaPython } from 'react-icons/fa';
import { IoLogoMicrosoft } from "react-icons/io5";
import { FaGolang, FaNodeJs } from 'react-icons/fa6';
import { TbHttpTrace, TbBrandCpp } from 'react-icons/tb';
import { MdNat, MdScience, MdSchool } from 'react-icons/md';
// import { BsMeta } from 'react-icons/bs';
import { GiMetalPlate, GiArtificialIntelligence } from 'react-icons/gi';
import {  BiData } from 'react-icons/bi';
import { HiAcademicCap } from 'react-icons/hi';
import { BsCodeSquare, BsGear } from 'react-icons/bs';

interface Issue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  repository_url: string;
  user: {
    login: string;
    avatar_url: string;
  };
  labels: Array<{
    id: number;
    name: string;
    color: string;
  }>;
}

interface FilterState {
  sort: 'newest' | 'oldest' | 'updated';
  languages: string[];
  issueType: 'good-first-issue' | 'documentation';
}

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
  { name: 'Emacs', repo: 'emacs-mirror/emacs', icon: <SiGnuemacs className="w-6 h-6" />, language: 'C' },
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

const LANGUAGES = [
  'All Languages',
  'C',
  'C++',
  'C#',
  'Go',
  'Java',
  'JavaScript',
  'TypeScript',
  'Python',
  'Ruby',
  'PHP',
  'Rust',
  'Scala',
  'R',
  'Swift',
  'Kotlin',
  'Dart',
  'Lua',
  'Shell',
  'Markdown',
  'HTML',
  'CSS',
  'SQL',
  'Assembly',
  'Perl',
  'Haskell',
  'Clojure',
  'Erlang',
  'Elixir',
  'F#',
  'OCaml',
  'Scheme',
  'MATLAB',
  'Objective-C',
  'Fortran',
  'COBOL',
  'Pascal',
  'Ada',
  'Prolog',
  'Lisp',
  'Julia',
  'Nim',
  'Crystal',
  'Zig'
];

const ISSUE_TYPES = [
  { id: 'good-first-issue', label: 'Good First Issues' },
  { id: 'documentation', label: 'Documentation Issues' },
];

const Issues: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRepo, setSelectedRepo] = useState(COMPANIES[0].repo);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Reference to the search container
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filter state
  const [filters, setFilters] = useState<FilterState>(() => {
    const savedFilters = localStorage.getItem('issueFilters');
    return savedFilters ? JSON.parse(savedFilters) : {
      sort: 'newest',
      languages: ['All Languages'],
      issueType: 'good-first-issue',
    };
  });

  // Save filters to localStorage
  useEffect(() => {
    localStorage.setItem('issueFilters', JSON.stringify(filters));
  }, [filters]);

  // Handle click outside search container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredCompanies = COMPANIES.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.repo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSortQuery = () => {
    switch (filters.sort) {
      case 'oldest':
        return 'sort:created-asc';
      case 'updated':
        return 'sort:updated-desc';
      default:
        return 'sort:created-desc';
    }
  };

  const getLanguageQuery = () => {
    if (filters.languages.includes('All Languages') || filters.languages.length === 0) {
      return '';
    }
    return filters.languages.map(lang => `language:${lang}`).join('+');
  };

  const getIssueTypeQuery = () => {
    switch (filters.issueType) {
      case 'good-first-issue':
        return 'label:"good first issue"';
      case 'documentation':
        return 'label:documentation';
      default:
        return 'label:"good first issue"';
    }
  };

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      setError(null);
      try {
        const sortQuery = getSortQuery();
        const languageQuery = getLanguageQuery();
        const issueTypeQuery = getIssueTypeQuery();
        const query = `${issueTypeQuery}+state:open+repo:${selectedRepo}+${sortQuery}+${languageQuery}`;
        const response = await axios.get(
          `https://api.github.com/search/issues?q=${query}&page=${page}&per_page=8`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
              Authorization: `token ${import.meta.env.VITE_GIT_HUB_TOKEN}`,
            },
          }
        );

        setIssues(response.data.items);
        setTotalCount(response.data.total_count);
        setHasMore(response.data.total_count > page * 8);
      } catch (err) {
        setError('Failed to fetch issues. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [page, selectedRepo, filters]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  const resetFilters = () => {
    setFilters({
      sort: 'newest',
      languages: ['All Languages'],
      issueType: 'good-first-issue',
    });
    setPage(1);
  };

  const getRepoName = (url: string) => {
    const match = url.match(/repos\/([^/]+\/[^/]+)/);
    return match ? match[1] : '';
  };

  const getIssueTypeLabel = (issueType: string) => {
    const type = ISSUE_TYPES.find(t => t.id === issueType);
    return type ? type.label : 'Issues';
  };

  const selectedCompany = COMPANIES.find(company => company.repo === selectedRepo);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              {getIssueTypeLabel(filters.issueType)}
              {selectedCompany && (
                <div>
                  <span className="text-xl text-gray-600 dark:text-gray-400 ml-2 flex items-center gap-2">
                    Company  :  {selectedCompany.name} {selectedCompany.icon}
                  </span>
                  <p className="text-xl text-gray-600 dark:text-gray-400 ml-2 flex items-center gap-2">
                    Repo : {(selectedCompany.repo).split('/')[1]}
                  </p>
                  <p className="text-xl text-gray-600 dark:text-gray-400 ml-2 flex items-center gap-2">
                    Language : {selectedCompany.language}
                  </p>

                </div>
              )}
            </h1>

            <div className="flex flex-col space-y-4">
              <div className="relative" ref={searchContainerRef}>
                <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex-shrink-0 pl-4">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search repositories (e.g., React, VSCode)..."
                    className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>

                {showSuggestions && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
                    {filteredCompanies.map((company) => (
                      <button
                        key={company.repo}
                        onClick={() => {
                          setSelectedRepo(company.repo);
                          setSearchQuery('');
                          setShowSuggestions(false);
                          setPage(1);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                      >
                        {company.icon}
                        <div className='flex flex-row justify-between w-full pr-10'>
                          <div>
                            <div className="text-gray-900 dark:text-white font-medium">
                              {company.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {company.repo}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {company.language}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Filters:</span>
                </div>

                {/* Issue Type Menu */}
                <Menu as="div" className="relative">
                  <Menu.Button className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                    Type: {getIssueTypeLabel(filters.issueType)}
                  </Menu.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Menu.Items className="absolute z-10 mt-2 w-48 rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                      {ISSUE_TYPES.map((type) => (
                        <Menu.Item key={type.id}>
                          <button
                            className={`w-full text-left px-4 py-2 text-sm ${filters.issueType === type.id
                              ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                            onClick={() => setFilters(f => ({ ...f, issueType: type.id as FilterState['issueType'] }))}
                          >
                            {type.label}
                          </button>
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Sort Menu */}
                <Menu as="div" className="relative">
                  <Menu.Button className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                    Sort: {filters.sort.charAt(0).toUpperCase() + filters.sort.slice(1)}
                  </Menu.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Menu.Items className="absolute z-10 mt-2 w-48 rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                      {['newest', 'oldest', 'updated'].map((sort) => (
                        <Menu.Item key={sort}>
                          <button
                            className={`w-full text-left px-4 py-2 text-sm ${filters.sort === sort
                              ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                            onClick={() => setFilters(f => ({ ...f, sort: sort as FilterState['sort'] }))}
                          >
                            {sort.charAt(0).toUpperCase() + sort.slice(1)}
                          </button>
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Languages Menu */}
                <Menu as="div" className="relative">
                  <Menu.Button className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                    Languages ({filters.languages.length})
                  </Menu.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Menu.Items className="absolute z-10 mt-2 w-48 rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
                      {LANGUAGES.map((language) => (
                        <Menu.Item key={language}>
                          <button
                            className={`w-full text-left px-4 py-2 text-sm ${filters.languages.includes(language)
                              ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                            onClick={() => {
                              if (language === 'All Languages') {
                                setFilters(f => ({ ...f, languages: ['All Languages'] }));
                              } else {
                                setFilters(f => ({
                                  ...f,
                                  languages: f.languages.includes(language)
                                    ? f.languages.filter(l => l !== language)
                                    : [...f.languages.filter(l => l !== 'All Languages'), language]
                                }));
                              }
                            }}
                          >
                            {language}
                          </button>
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  onClick={resetFilters}
                  className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Reset Filters
                </button>
              </div>

              {!loading && !error && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Found {totalCount} issues
                </div>
              )}
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {!loading && !error && issues.length === 0 && (
            <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 p-4 rounded-lg mb-6">
              No issues found with the current filters. Try adjusting your search criteria.
            </div>
          )}

          {!loading && !error && issues.length > 0 && (
            <>
              <div className="space-y-4 md:space-y-6">
  {issues.map((issue) => (
    <div
      key={issue.id}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
        <div className="flex-1">
          <div className="flex items-center justify-between md:justify-start mb-2">
            <span className="text-xs md:text-sm font-medium px-2 py-1 md:px-3 md:py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
              {getRepoName(issue.repository_url)}
            </span>
            <img
              src={issue.user.avatar_url}
              alt={`${issue.user.login}'s avatar`}
              className="w-8 h-8 rounded-full md:hidden"
            />
          </div>
          <a
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg md:text-xl font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2 break-words"
          >
            {issue.title}
            <ExternalLink size={16} />
          </a>
          <div className="mt-2 flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            <span>#{issue.number}</span>
            <span className="hidden md:inline">
              Opened on {format(new Date(issue.created_at), 'MMM d, yyyy')}
            </span>
            <span className="md:hidden">
              Opened: {format(new Date(issue.created_at), 'MMM d, yyyy')}
            </span>
            <span className="hidden md:inline">
              Updated {format(new Date(issue.updated_at), 'MMM d, yyyy')}
            </span>
            <span className="md:hidden">
              Updated: {format(new Date(issue.updated_at), 'MMM d, yyyy')}
            </span>
            <span>by {issue.user.login}</span>
          </div>
        </div>
        <img
          src={issue.user.avatar_url}
          alt={`${issue.user.login}'s avatar`}
          className="w-10 h-10 rounded-full hidden md:block"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {issue.labels.map((label) => (
          <span
            key={label.id}
            className="px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm"
            style={{
              backgroundColor: `#${label.color}20`,
              color: `#${label.color}`,
            }}
          >
            {label.name}
          </span>
        ))}
      </div>
    </div>
  ))}
</div>

              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${page === 1
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'bg-indigo-600 dark:bg-indigo-500 text-white hover:opacity-90'
                    }`}
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <span className="text-gray-600 dark:text-gray-400">
                  Page {page}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={!hasMore}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${!hasMore
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'bg-indigo-600 dark:bg-indigo-500 text-white hover:opacity-90'
                    }`}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Issues;
