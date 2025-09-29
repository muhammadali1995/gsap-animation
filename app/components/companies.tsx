export function Companies() {
  const companies = [
    { name: "TechCorp", logo: "🏢" },
    { name: "InnovateLab", logo: "🔬" },
    { name: "DataSys", logo: "📊" },
    { name: "CloudWorks", logo: "☁️" },
    { name: "DevStudio", logo: "💻" },
    { name: "FutureTech", logo: "🚀" },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of companies that trust our platform to power their success.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                {company.logo}
              </div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                {company.name}
              </h3>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            and 1000+ more companies worldwide
          </p>
        </div>
      </div>
    </section>
  );
}