import React, { useState } from 'react';
import { GitBranch, GitCommit, GitMerge, GitPullRequest, ChevronDown, ChevronRight, Terminal, Copy, Check } from 'lucide-react';

interface Command {
  command: string;
  description: string;
}

interface CommandSection {
  title: string;
  icon: React.ReactNode;
  commands: Command[];
}

const GitCheatsheet = () => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(['Basic Commands']);

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const copyToClipboard = async (command: string) => {
    await navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const sections: CommandSection[] = [
    {
      title: 'Basic Commands',
      icon: <Terminal className="w-5 h-5" />,
      commands: [
        { command: 'git init', description: 'Initialize a new Git repository' },
        { command: 'git clone [url]', description: 'Clone a repository from remote' },
        { command: 'git status', description: 'Check repository status' }
      ]
    },
    {
      title: 'Branch Operations',
      icon: <GitBranch className="w-5 h-5" />,
      commands: [
        { command: 'git branch', description: 'List all branches' },
        { command: 'git checkout -b [name]', description: 'Create and switch to new branch' },
        { command: 'git branch -d [name]', description: 'Delete a branch' }
      ]
    },
    {
      title: 'Staging & Committing',
      icon: <GitCommit className="w-5 h-5" />,
      commands: [
        { command: 'git add [file]', description: 'Add file to staging area' },
        { command: 'git commit -m "[message]"', description: 'Commit staged changes' },
        { command: 'git reset [file]', description: 'Unstage a file' }
      ]
    },
    {
      title: 'Remote Operations',
      icon: <GitPullRequest className="w-5 h-5" />,
      commands: [
        { command: 'git push origin [branch]', description: 'Push commits to remote' },
        { command: 'git pull origin [branch]', description: 'Pull changes from remote' },
        { command: 'git fetch', description: 'Download objects from remote' }
      ]
    },
    {
      title: 'Merging',
      icon: <GitMerge className="w-5 h-5" />,
      commands: [
        { command: 'git merge [branch]', description: 'Merge branch into current branch' },
        { command: 'git rebase [branch]', description: 'Rebase current branch' },
        { command: 'git merge --abort', description: 'Abort a merge in case of conflicts' }
      ]
    }
  ];

  return (
    <div className="pt-40 min-h-screen dark:bg-gray-900 bg-gray-50 dark:text-gray-100 text-gray-800 py-16 px-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="dark:bg-gray-800 bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="p-4 dark:bg-gray-950 bg-gray-200 border-b dark:border-gray-700 border-gray-300">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 dark:text-gray-400 text-gray-600">git-cheatsheet.sh</span>
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-bold mb-8 dark:text-indigo-400 text-indigo-600">
              Git Command Cheatsheet
            </h1>

            <div className="space-y-4">
              {sections.map((section) => (
                <div key={section.title} className="border dark:border-gray-700 border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full px-4 py-3 flex items-center justify-between dark:bg-gray-800 bg-gray-100 dark:hover:bg-gray-750  transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {section.icon}
                      <span className="font-semibold dark:text-indigo-400 text-indigo-600">{section.title}</span>
                    </div>
                    {expandedSections.includes(section.title) ? (
                      <ChevronDown className="w-5 h-5 dark:text-gray-400 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 dark:text-gray-400 text-gray-600" />
                    )}
                  </button>

                  {expandedSections.includes(section.title) && (
                    <div className="border-t dark:border-gray-700 border-gray-300">
                      {section.commands.map((cmd, index) => (
                        <div
                          key={cmd.command}
                          className={`p-4 flex items-start justify-betweenhover:bg-gray-100 transition-colors ${
                            index !== section.commands.length - 1 ? 'border-b dark:border-gray-700 border-gray-300' : ''
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <code className="dark:text-green-400 text-green-600">{cmd.command}</code>
                              <button
                                onClick={() => copyToClipboard(cmd.command)}
                                className="p-1 dark:hover:bg-gray-700 hover:bg-gray-200 rounded transition-colors"
                                title="Copy command"
                              >
                                {copiedCommand === cmd.command ? (
                                  <Check className="w-4 h-4 dark:text-green-400 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4 dark:text-gray-400 text-gray-600" />
                                )}
                              </button>
                            </div>
                            <p className="text-sm dark:text-gray-400 text-gray-600">{cmd.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitCheatsheet;