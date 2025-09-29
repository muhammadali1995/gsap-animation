import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Company {
  name: string;
  logo: string;
  description: string;
  founded: string;
  industry: string;
  employees: string;
  revenue: string;
  headquarters: string;
}

interface CompanyDetailsProps {
  company: Company;
  onClose: () => void;
}

const comparisonCompanies = [
  {
    name: "Amazon",
    logo: "📦",
    description:
      "Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, and artificial intelligence.",
    founded: "1994",
    industry: "E-commerce/Technology",
    employees: "1,500,000+",
    revenue: "$513.9 billion",
    headquarters: "Seattle, Washington",
  },
  {
    name: "Google",
    logo: "🌐",
    description:
      "Google LLC is an American multinational technology company that focuses on search engine technology, online advertising, cloud computing, and more.",
    founded: "1998",
    industry: "Technology",
    employees: "156,000+",
    revenue: "$307.4 billion",
    headquarters: "Mountain View, California",
  },
  {
    name: "Microsoft",
    logo: "🪟",
    description:
      "Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services.",
    founded: "1975",
    industry: "Technology",
    employees: "221,000+",
    revenue: "$211.9 billion",
    headquarters: "Redmond, Washington",
  },
];

export function CompanyDetails({ company, onClose }: CompanyDetailsProps) {
  const detailsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const prevCompanyRef = useRef<Company | null>(null);

  useEffect(() => {
    // Check if this is a company change (not initial load)
    const isCompanyChange =
      prevCompanyRef.current && prevCompanyRef.current.name !== company.name;

    if (isCompanyChange) {
      // Scroll to top when company changes
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      // Animate sections fade in from bottom when company changes
      const sections = [logoRef, aboutRef, comparisonRef, actionsRef];

      sections.forEach((ref, index) => {
        if (ref.current) {
          gsap
            .timeline({ delay: index * 0.1 })
            .to(ref.current, {
              y: 30,
              opacity: 0,
              duration: 0.3,
              ease: "power1.out",
            })
            .to(ref.current, {
              y: 0,
              opacity: 1,
              duration: 0.3,
            });
        }
      });
    } else {
      // Initial load animation - pushing from right to left
      if (detailsRef.current) {
        gsap.set(detailsRef.current, { x: "100%" });

        gsap.to(detailsRef.current, {
          x: "0%",
          duration: 0.6,
          ease: "power3.out",
        });
      }
    }

    // Store current company for next comparison
    prevCompanyRef.current = company;
  }, [company]);

  const handleClose = () => {
    if (detailsRef.current) {
      gsap.to(detailsRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
        onComplete: onClose,
      });
    }
  };

  return (
    <div
      ref={detailsRef}
      className="fixed top-0 right-0 w-3/4 h-full bg-gradient-to-br from-gray-900 to-black text-white z-50 overflow-hidden"
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div ref={scrollContainerRef} className="p-8 h-full overflow-y-auto">
        {/* Company Logo */}

        {/* Company Comparison Section */}
        <div ref={comparisonRef} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparisonCompanies.map((comp, index) => (
              <div
                key={comp.name}
                className={`
                  bg-gradient-to-br rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                  ${
                    index === 0
                      ? "from-orange-600/20 to-orange-800/20 border border-orange-500/30"
                      : index === 1
                        ? "from-blue-600/20 to-blue-800/20 border border-blue-500/30"
                        : "from-green-600/20 to-green-800/20 border border-green-500/30"
                  }
                `}
              >
                {/* Company Header */}
                <div className="text-center mb-4">
                  <div className="text-5xl mb-2">{comp.logo}</div>
                  <h3 className="text-xl font-bold text-white">{comp.name}</h3>
                </div>

                {/* Company Stats */}
                <div className="space-y-3">
                  <div className="bg-black/20 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-gray-300 mb-1">
                      Founded
                    </h4>
                    <p className="text-white font-medium">{comp.founded}</p>
                  </div>

                  <div className="bg-black/20 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-gray-300 mb-1">
                      Industry
                    </h4>
                    <p className="text-white font-medium text-sm">
                      {comp.industry}
                    </p>
                  </div>

                  <div className="bg-black/20 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-gray-300 mb-1">
                      Employees
                    </h4>
                    <p className="text-white font-medium">{comp.employees}</p>
                  </div>

                  <div className="bg-black/20 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-gray-300 mb-1">
                      Revenue
                    </h4>
                    <p className="text-white font-medium text-sm">
                      {comp.revenue}
                    </p>
                  </div>

                  <div className="bg-black/20 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-gray-300 mb-1">
                      HQ
                    </h4>
                    <p className="text-white font-medium text-sm">
                      {comp.headquarters}
                    </p>
                  </div>
                </div>

                {/* Company Description */}
                <div className="mt-4 p-3 bg-black/10 rounded-lg">
                  <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                    {comp.description}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  className={`
                  w-full mt-4 py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300
                  ${
                    index === 0
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : index === 1
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                  }
                `}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Actions */}
        <div ref={actionsRef} className="pt-6 space-y-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Visit Website
          </button>
          <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
