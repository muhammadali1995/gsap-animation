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

export function CompanyDetails({ company, onClose }: CompanyDetailsProps) {
  const detailsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const foundedRef = useRef<HTMLDivElement>(null);
  const industryRef = useRef<HTMLDivElement>(null);
  const employeesRef = useRef<HTMLDivElement>(null);
  const revenueRef = useRef<HTMLDivElement>(null);
  const headquartersRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const prevCompanyRef = useRef<Company | null>(null);

  useEffect(() => {
    // Check if this is a company change (not initial load)
    const isCompanyChange =
      prevCompanyRef.current && prevCompanyRef.current.name !== company.name;

    if (isCompanyChange) {
      // Animate sections scale up and down when company changes
      const sections = [
        logoRef,
        aboutRef,
        foundedRef,
        industryRef,
        employeesRef,
        revenueRef,
        headquartersRef,
        actionsRef,
      ];

      sections.forEach((ref, index) => {
        if (ref.current) {
          gsap
            .timeline()
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

      <div className="p-8 h-full overflow-y-auto">
        {/* Company Logo */}
        <div ref={logoRef} className="text-center mb-8">
          <div className="text-9xl mb-4">{company.logo}</div>
          <h1 className="text-4xl font-bold text-white">{company.name}</h1>
        </div>

        {/* Company Details */}
        <div className="space-y-6">
          <div
            ref={aboutRef}
            className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold mb-3 text-blue-400">About</h3>
            <p className="text-gray-300 leading-relaxed">
              {company.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div
              ref={foundedRef}
              className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm"
            >
              <h4 className="font-semibold text-green-400 mb-2">Founded</h4>
              <p className="text-gray-300">{company.founded}</p>
            </div>

            <div
              ref={industryRef}
              className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm"
            >
              <h4 className="font-semibold text-purple-400 mb-2">Industry</h4>
              <p className="text-gray-300">{company.industry}</p>
            </div>

            <div
              ref={employeesRef}
              className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm"
            >
              <h4 className="font-semibold text-yellow-400 mb-2">Employees</h4>
              <p className="text-gray-300">{company.employees}</p>
            </div>

            <div
              ref={revenueRef}
              className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm"
            >
              <h4 className="font-semibold text-red-400 mb-2">Revenue</h4>
              <p className="text-gray-300">{company.revenue}</p>
            </div>

            <div
              ref={headquartersRef}
              className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm"
            >
              <h4 className="font-semibold text-indigo-400 mb-2">
                Headquarters
              </h4>
              <p className="text-gray-300">{company.headquarters}</p>
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
    </div>
  );
}
