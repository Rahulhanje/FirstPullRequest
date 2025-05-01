
const ContributionGuide = () => {
  return (
    <div className="container mx-auto px-4 py-8  pt-40">
      <h1 className="text-4xl font-bold mb-6">Contribution Guide</h1>
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Contribute</h2>
          <p className="mb-4">
            We welcome contributions from the community! This guide will help you understand how to contribute to our project effectively.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Fork the repository</li>
            <li>Clone your fork locally</li>
            <li>Create a new branch for your feature</li>
            <li>Make your changes</li>
            <li>Submit a pull request</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Code Guidelines</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Follow the existing code style</li>
            <li>Write clear commit messages</li>
            <li>Add tests for new features</li>
            <li>Update documentation as needed</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ContributionGuide;