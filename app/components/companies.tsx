import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Country } from "~/models/country";
import ScrollLogos from "~/components/store-logos";
import CompanyLogos from "../constant/companies-logos";
import type { Company, CountryCompanies } from "~/models/company";

interface CompanyDetailsProps {
  country: Country;
  onClose: () => void;
}

const getCountryCompanies = (id: string): Company[] => {
  const found = CompanyLogos.find((company: CountryCompanies) => company[id]);
  return found ? found[id] : [];
};

export function CompanyDetails({ country, onClose }: CompanyDetailsProps) {
  const detailsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const topLogosRef = useRef<HTMLDivElement>(null);
  const companyDetailsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const circularStatsRef = useRef<HTMLDivElement>(null);
  const prevCompanyRef = useRef<Country | null>(null);
  const firstRenderRef = useRef(true);
  const [countryCompanies, setCountryCompanies] = useState<Company[]>([]);

  useEffect(() => {
    // Lock body scroll when details is open
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;

    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";

    // Focus on the details container when opened
    if (detailsRef.current) {
      detailsRef.current.focus();
    }

    // Prevent scroll propagation
    const handleScroll = (e: WheelEvent) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      // Prevent parent scroll when at boundaries
      if (
        (isAtTop && e.deltaY < 0) || // Scrolling up at top
        (isAtBottom && e.deltaY > 0) // Scrolling down at bottom
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Prevent touch scroll propagation
    const handleTouchMove = (e: TouchEvent) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      // Get touch movement direction
      const touch = e.touches[0];
      const startY = touch.clientY;

      // Store the initial touch position
      if (!container.dataset.startY) {
        container.dataset.startY = startY.toString();
        return;
      }

      const deltaY = startY - parseFloat(container.dataset.startY);

      if (
        (isAtTop && deltaY > 0) || // Swiping down at top
        (isAtBottom && deltaY < 0) // Swiping up at bottom
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchStart = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.dataset.startY = "";
      }
    };

    // Add event listeners to the details container
    if (detailsRef.current) {
      detailsRef.current.addEventListener("wheel", handleScroll, {
        passive: false,
      });
      detailsRef.current.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      detailsRef.current.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }

    const isFirst = firstRenderRef.current;
    const isCompanyChange =
      prevCompanyRef.current && prevCompanyRef.current.name !== country.name;

    if (isFirst) {
      // Only do slide-in once on initial mount
      if (detailsRef.current) {
        gsap.set(detailsRef.current, { x: "100%", opacity: 0 });
        gsap.to(detailsRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      }
      firstRenderRef.current = false;
    } else if (isCompanyChange) {
      // Scroll to top when company changes
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      // Animate sections fade in from bottom when company changes
      const sections = [
        topLogosRef,
        companyDetailsRef,
        statsRef,
        circularStatsRef,
        logoRef,
        aboutRef,
        comparisonRef,
        actionsRef,
      ];

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
    }

    setCountryCompanies(getCountryCompanies(country.id));

    // Store current country for next comparison
    prevCompanyRef.current = country;

    // Cleanup function
    return () => {
      // Restore body scroll
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;

      // Remove event listeners
      if (detailsRef.current) {
        detailsRef.current.removeEventListener("wheel", handleScroll);
        detailsRef.current.removeEventListener("touchstart", handleTouchStart);
        detailsRef.current.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [country]);

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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={detailsRef}
      className="fixed top-0 right-0 w-3/4 h-full pt-10 overflow-hidden border border-stone-300 shadow-2xl z-50 transform"
      tabIndex={-1}
      style={{
        background: `
          linear-gradient(135deg, rgba(245, 245, 244, 0.95) 0%, rgba(231, 229, 228, 0.9) 25%, rgba(245, 245, 244, 0.95) 50%, rgba(231, 229, 228, 0.9) 75%, rgba(245, 245, 244, 0.95) 100%),
          radial-gradient(circle at 20% 30%, rgba(168, 162, 158, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(120, 113, 108, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(214, 211, 209, 0.12) 0%, transparent 30%),
          linear-gradient(45deg, rgba(250, 250, 249, 1) 0%, rgba(245, 245, 244, 1) 100%)
        `,
      }}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 text-stone-600 hover:text-stone-800 transition-colors z-10"
        aria-label="Close details"
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

      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto overflow-x-hidden"
        style={{
          scrollBehavior: "smooth",
          scrollbarWidth: "thin",
          scrollbarColor: "#a8a29e #f5f5f4",
        }}
      >
        {/* Top Company Logos Block */}
        <div
          ref={topLogosRef}
          className="mt-8 bg-transparent p-6 backdrop-blur-sm border-0 border-t border-stone-300"
        >
          {/* Start of the scrollable content*/}
          {countryCompanies.length > 0 && (
            <ScrollLogos companies={countryCompanies} />
          )}
          {/* End of the scrollable content*/}
        </div>

        {/* Company Details Section */}
        <div
          ref={companyDetailsRef}
          className="border border-stone-300 border-l-0 p-8 bg-white/60 backdrop-blur-sm relative overflow-hidden"
          style={{
            background: `
              linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(59, 130, 246, 0.10) 100%),
              radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.10) 0%, transparent 60%),
              radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.10) 0%, transparent 60%)
            `,
          }}
        >
          {/* Abstract blurred shapes */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 0,
              filter: "blur(32px)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "10%",
                left: "5%",
                width: "180px",
                height: "180px",
                background: "rgba(236,72,153,0.25)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "15%",
                right: "10%",
                width: "140px",
                height: "140px",
                background: "rgba(59,130,246,0.22)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "60%",
                width: "120px",
                height: "120px",
                background: "rgba(16,185,129,0.18)",
                borderRadius: "50%",
              }}
            />
          </div>
          {/* Content goes here */}

          {/* Title */}
          <h1 className="text-4xl font-medium text-stone-800 mb-6 text-center">
            Global Business Innovation Hub
          </h1>

          {/* Description */}
          <div className="mb-8 space-y-4">
            <p className="text-stone-600 leading-relaxed text-base">
              In today's interconnected world, businesses are driving
              unprecedented innovation and growth across all industries. From
              technology giants that shape our digital landscape to financial
              institutions that fuel global commerce, these companies represent
              the pinnacle of modern enterprise.
            </p>

            <p className="text-stone-600 leading-relaxed text-base">
              Each organization showcases unique strengths in leadership,
              innovation, and market presence. They leverage cutting-edge
              technologies, sustainable practices, and global partnerships to
              create value for stakeholders while addressing complex challenges
              in their respective markets.
            </p>

            <p className="text-stone-600 leading-relaxed text-base">
              Through strategic vision and operational excellence, these
              industry leaders continue to set benchmarks for performance,
              innovation, and corporate responsibility in the global
              marketplace.
            </p>
          </div>

          {/* Features Cards */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-stone-800 mb-6">
              Key Areas
            </h2>

            <div className="grid grid-cols-5 gap-4">
              <div className="border border-stone-300 rounded-lg p-6 hover:border-stone-400 transition-colors bg-white/50 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-stone-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 9V3.5a.5.5 0 00-.5-.5h-5a.5.5 0 00-.5.5V9m0 0l-4 4m4-4l4 4m-4-4v8"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-stone-800 font-medium mb-2">
                      Innovation
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Cutting-edge technology and breakthrough solutions driving
                      industry transformation
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-stone-300 rounded-lg p-6 hover:border-stone-400 transition-colors bg-white/50 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-stone-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v20m0-20C7.03 2 2 7.03 2 12m10-10c4.97 0 10 5.03 10 10m-10 10c4.97 0 10-5.03 10-10m-10 10C7.03 22 2 16.97 2 12"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-stone-800 font-medium mb-2">
                      Global Reach
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Worldwide presence and international markets spanning
                      multiple continents
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-stone-300 rounded-lg p-6 hover:border-stone-400 transition-colors bg-white/50 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-stone-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3a7 7 0 717 7c0 3.87-3.13 7-7 7s-7-3.13-7-7a7 7 0 717-7zm0 13v2m0 2h.01"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-stone-800 font-medium mb-2">
                      Leadership
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Visionary leadership and strategic excellence in
                      competitive markets
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-stone-300 rounded-lg p-6 hover:border-stone-400 transition-colors bg-white/50 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-stone-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-stone-800 font-medium mb-2">
                      Performance
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Outstanding financial and operational results with
                      consistent growth
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-stone-300 rounded-lg p-6 hover:border-stone-400 transition-colors bg-white/50 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-stone-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 21h8m-4-4v4m0-4a7 7 0 007-7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a7 7 0 007 7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-stone-800 font-medium mb-2">
                      Excellence
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Industry recognition and award-winning achievements across
                      sectors
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section with Table */}
        <div
          ref={statsRef}
          className="border border-stone-300 border-t-0 border-l-0 p-8 bg-white/50 backdrop-blur-sm"
        >
          <h1 className="text-4xl font-medium text-stone-800 mb-6 text-center">
            Market Performance & Analytics
          </h1>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-stone-300">
                  <th className="text-left py-3 px-4 text-stone-800 font-medium">
                    Company
                  </th>
                  <th className="text-left py-3 px-4 text-stone-800 font-medium">
                    Market Cap
                  </th>
                  <th className="text-left py-3 px-4 text-stone-800 font-medium">
                    Revenue
                  </th>
                  <th className="text-left py-3 px-4 text-stone-800 font-medium">
                    Growth Rate
                  </th>
                  <th className="text-left py-3 px-4 text-stone-800 font-medium">
                    Employees
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-stone-200 hover:bg-stone-50/50 transition-colors">
                  <td className="py-3 px-4 text-stone-700 font-medium">
                    Apple Inc.
                  </td>
                  <td className="py-3 px-4 text-stone-600">$2.8T</td>
                  <td className="py-3 px-4 text-stone-600">$394.3B</td>
                  <td className="py-3 px-4 text-green-600">+8.2%</td>
                  <td className="py-3 px-4 text-stone-600">164,000</td>
                </tr>
                <tr className="border-b border-stone-200 hover:bg-stone-50/50 transition-colors">
                  <td className="py-3 px-4 text-stone-700 font-medium">
                    Microsoft Corp.
                  </td>
                  <td className="py-3 px-4 text-stone-600">$2.5T</td>
                  <td className="py-3 px-4 text-stone-600">$211.9B</td>
                  <td className="py-3 px-4 text-green-600">+12.1%</td>
                  <td className="py-3 px-4 text-stone-600">221,000</td>
                </tr>
                <tr className="border-b border-stone-200 hover:bg-stone-50/50 transition-colors">
                  <td className="py-3 px-4 text-stone-700 font-medium">
                    Alphabet Inc.
                  </td>
                  <td className="py-3 px-4 text-stone-600">$1.7T</td>
                  <td className="py-3 px-4 text-stone-600">$307.4B</td>
                  <td className="py-3 px-4 text-green-600">+9.8%</td>
                  <td className="py-3 px-4 text-stone-600">182,000</td>
                </tr>
                <tr className="border-b border-stone-200 hover:bg-stone-50/50 transition-colors">
                  <td className="py-3 px-4 text-stone-700 font-medium">
                    Amazon.com Inc.
                  </td>
                  <td className="py-3 px-4 text-stone-600">$1.4T</td>
                  <td className="py-3 px-4 text-stone-600">$574.8B</td>
                  <td className="py-3 px-4 text-green-600">+15.3%</td>
                  <td className="py-3 px-4 text-stone-600">1,540,000</td>
                </tr>
                <tr className="border-b border-stone-200 hover:bg-stone-50/50 transition-colors">
                  <td className="py-3 px-4 text-stone-700 font-medium">
                    Tesla Inc.
                  </td>
                  <td className="py-3 px-4 text-stone-600">$789B</td>
                  <td className="py-3 px-4 text-stone-600">$96.8B</td>
                  <td className="py-3 px-4 text-green-600">+18.9%</td>
                  <td className="py-3 px-4 text-stone-600">127,855</td>
                </tr>
                <tr className="border-b border-stone-200 hover:bg-stone-50/50 transition-colors">
                  <td className="py-3 px-4 text-stone-700 font-medium">
                    Meta Platforms
                  </td>
                  <td className="py-3 px-4 text-stone-600">$845B</td>
                  <td className="py-3 px-4 text-stone-600">$134.9B</td>
                  <td className="py-3 px-4 text-green-600">+22.7%</td>
                  <td className="py-3 px-4 text-stone-600">77,805</td>
                </tr>
                <tr className="border-b border-stone-200 hover:bg-stone-50/50 transition-colors">
                  <td className="py-3 px-4 text-stone-700 font-medium">
                    NVIDIA Corp.
                  </td>
                  <td className="py-3 px-4 text-stone-600">$1.8T</td>
                  <td className="py-3 px-4 text-stone-600">$79.8B</td>
                  <td className="py-3 px-4 text-green-600">+126.0%</td>
                  <td className="py-3 px-4 text-stone-600">26,196</td>
                </tr>
                <tr className="border-b border-stone-200 hover:bg-stone-50/50 transition-colors">
                  <td className="py-3 px-4 text-stone-700 font-medium">
                    Netflix Inc.
                  </td>
                  <td className="py-3 px-4 text-stone-600">$195B</td>
                  <td className="py-3 px-4 text-stone-600">$33.7B</td>
                  <td className="py-3 px-4 text-green-600">+6.7%</td>
                  <td className="py-3 px-4 text-stone-600">13,000</td>
                </tr>
                <tr className="border-b border-stone-200 hover:bg-stone-50/50 transition-colors">
                  <td className="py-3 px-4 text-stone-700 font-medium">
                    Adobe Inc.
                  </td>
                  <td className="py-3 px-4 text-stone-600">$234B</td>
                  <td className="py-3 px-4 text-stone-600">$19.4B</td>
                  <td className="py-3 px-4 text-green-600">+11.2%</td>
                  <td className="py-3 px-4 text-stone-600">28,775</td>
                </tr>
                <tr className="border-b border-stone-200 hover:bg-stone-50/50 transition-colors">
                  <td className="py-3 px-4 text-stone-700 font-medium">
                    Salesforce Inc.
                  </td>
                  <td className="py-3 px-4 text-stone-600">$267B</td>
                  <td className="py-3 px-4 text-stone-600">$34.9B</td>
                  <td className="py-3 px-4 text-green-600">+10.9%</td>
                  <td className="py-3 px-4 text-stone-600">79,390</td>
                </tr>
                <tr className="border-b border-stone-200 hover:bg-stone-50/50 transition-colors">
                  <td className="py-3 px-4 text-stone-700 font-medium">
                    Oracle Corp.
                  </td>
                  <td className="py-3 px-4 text-stone-600">$368B</td>
                  <td className="py-3 px-4 text-stone-600">$50.0B</td>
                  <td className="py-3 px-4 text-green-600">+4.8%</td>
                  <td className="py-3 px-4 text-stone-600">143,000</td>
                </tr>
                <tr className="border-b border-stone-200 hover:bg-stone-50/50 transition-colors">
                  <td className="py-3 px-4 text-stone-700 font-medium">
                    PayPal Holdings
                  </td>
                  <td className="py-3 px-4 text-stone-600">$67B</td>
                  <td className="py-3 px-4 text-stone-600">$29.8B</td>
                  <td className="py-3 px-4 text-red-600">-2.1%</td>
                  <td className="py-3 px-4 text-stone-600">30,900</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Circular Statistics Section */}
        <div
          ref={circularStatsRef}
          className="mb-8 border border-stone-300 border-t-0 border-l-0 p-12 bg-white/40 backdrop-blur-sm relative overflow-hidden"
          style={{
            background: `
              linear-gradient(135deg, rgba(236, 72, 153, 0.10) 0%, rgba(59, 130, 246, 0.08) 100%),
              radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 60%),
              radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)
            `,
          }}
        >
          {/* Abstract blurred shapes */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 0,
              filter: "blur(32px)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "12%",
                left: "8%",
                width: "160px",
                height: "160px",
                background: "rgba(236,72,153,0.18)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "18%",
                right: "12%",
                width: "120px",
                height: "120px",
                background: "rgba(59,130,246,0.15)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "60%",
                left: "65%",
                width: "100px",
                height: "100px",
                background: "rgba(16,185,129,0.13)",
                borderRadius: "50%",
              }}
            />
          </div>
          <h1 className="text-4xl font-medium text-stone-800 mb-6 text-center">
            Global Business Impact
          </h1>

          <div className="relative flex justify-center items-center min-h-[600px]">
            {/* Half Circle Background */}
            <div className="relative w-[1200px] h-[600px]">
              {/* Concentric half circles */}
              <svg
                viewBox="0 0 1200 600"
                className="absolute inset-0 w-full h-full"
                style={{ transform: "rotate(0deg)" }}
              >
                {/* Draw the circles */}
                <path
                  d="M 150 600 A 450 450 0 0 1 1050 600"
                  fill="none"
                  stroke="#d6d3d1"
                  strokeWidth="2"
                />
                <path
                  d="M 210 600 A 390 390 0 0 1 990 600"
                  fill="none"
                  stroke="#d6d3d1"
                  strokeWidth="2"
                />
                <path
                  d="M 270 600 A 330 330 0 0 1 930 600"
                  fill="none"
                  stroke="#d6d3d1"
                  strokeWidth="2"
                />
                <path
                  d="M 330 600 A 270 270 0 0 1 870 600"
                  fill="none"
                  stroke="#d6d3d1"
                  strokeWidth="2"
                />
                <path
                  d="M 390 600 A 210 210 0 0 1 810 600"
                  fill="none"
                  stroke="#d6d3d1"
                  strokeWidth="2"
                />
                <path
                  d="M 450 600 A 150 150 0 0 1 750 600"
                  fill="none"
                  stroke="#d6d3d1"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-16"></div>
      </div>
    </div>
  );
}
