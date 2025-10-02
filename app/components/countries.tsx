import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { CompanyDetails } from "./companies";
import type { Country } from "~/models/country";
import { countries } from "~/constant/countries";

export function Countries() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const companiesRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const storeNamesRef = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    // Set initial logo state
    if (logoRef.current) {
      gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
    }
    if (storeNamesRef.current) {
      gsap.set(storeNamesRef.current, { opacity: 0, scale: 0.9, x: -30 });
    }
    // Ensure container has no leftover transforms (keep centered)
    if (containerRef.current) {
      gsap.set(containerRef.current, { clearProps: "transform" });
    }
  }, []);

  const updateCountryHighlight = (country: Country) => {
    if (companiesRef.current) {
      const companyItems = companiesRef.current.querySelectorAll("li");
      companyItems.forEach((item, index) => {
        const companyName = countries[index].name;
        if (companyName === country.name) {
          // Highlight selected company with bounce effect
          gsap.to(item, {
            scale: 1.2,
            opacity: 1,
            fontWeight: "bold",
            duration: 0.4,
            ease: "back.out(1.7)",
          });
        } else {
          // Fade out other companies
          gsap.to(item, {
            scale: 0.9,
            opacity: 0.3,
            fontWeight: "normal",
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });
    }
  };

  const handleCountryClick = (country: Country) => {
    if (isDetailsOpen && selectedCountry?.name === country.name) {
      // If clicking the same country, do nothing
      return;
    }

    if (isDetailsOpen) {
      // If details are already open, just change the country with animation
      setSelectedCountry(country);
      console.log(selectedCountry);
      updateCountryHighlight(country);
    } else {
      // First time opening details
      setSelectedCountry(country);
      setIsDetailsOpen(true);
      // Re-introduced: animate list container to the left & scale down
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          x: "-35%",
          scale: 0.4,
          duration: 0.8,
          ease: "power3.out",
        });
      }
      updateCountryHighlight(country);
    }
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedCountry(null);

    // Return container to center & restore items
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        x: "0%",
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      });
    }
    if (companiesRef.current) {
      const companyItems = companiesRef.current.querySelectorAll("li");
      gsap.to(companyItems, {
        scale: 1,
        opacity: 1,
        fontWeight: "normal",
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
      });
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="bg-white flex items-center justify-center h-screen relative overflow-hidden"
      >
        <div
          ref={containerRef}
          className="w-full h-full flex items-center justify-center"
        >
          <div className="relative flex items-center justify-center">
            {/* Store Names (Left) */}
            <div
              ref={storeNamesRef}
              className="fixed left-8 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none z-10"
            >
              {hoveredCountry &&
                !isDetailsOpen &&
                hoveredCountry.details?.companies && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-md px-4 py-3 shadow-lg border border-stone-200 max-w-xs">
                    <h4 className="text-sm font-semibold mb-2 text-stone-700">
                      Stores
                    </h4>
                    <ul className="space-y-1 text-xs text-stone-700">
                      {hoveredCountry.details.companies.slice(0, 6).map((c) => (
                        <li key={c.name}>{c.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* Company Logo Display (Right Flag) */}
            <div
              ref={logoRef}
              className="fixed right-8 top-1/2 opacity-0 pointer-events-none z-10"
            >
              {hoveredCountry && !isDetailsOpen && (
                <div className="text-2xl md:text-3xl lg:text-2xl xl:text-6xl w-64 h-full flex items-center justify-center">
                  <img src={hoveredCountry?.logo} alt={hoveredCountry?.name} />
                </div>
              )}
            </div>

            <ul
              ref={companiesRef}
              className="flex flex-col justify-center items-center gap-2"
            >
              {countries.map((country) => (
                <li
                  key={country.name}
                  className="text-center p-4 rounded-lg text-[#201a39] cursor-pointer"
                  onClick={() => handleCountryClick(country)}
                  onMouseEnter={(e) => {
                    if (!isDetailsOpen) {
                      setHoveredCountry(country);
                      gsap.to(e.currentTarget, {
                        // Keep centered: only adjust opacity (and slight scale for feedback)
                        opacity: 0.35,
                        scale: 0.98,
                        duration: 0.3,
                        ease: "power2.out",
                      });
                      // Animate logo in
                      gsap.to(logoRef.current, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: "back.out(1.7)",
                      });
                    } else {
                      // When details are open, add subtle hover effect
                      if (selectedCountry?.name !== country.name) {
                        gsap.to(e.currentTarget, {
                          scale: 1.05,
                          duration: 0.2,
                          ease: "power2.out",
                        });
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    setHoveredCountry(null);
                    gsap.to(e.currentTarget, {
                      // Revert scale & opacity only
                      scale: 1,
                      opacity: 1,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                    if (!isDetailsOpen) {
                      // Animate logo out
                      gsap.to(logoRef.current, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3,
                        ease: "power2.out",
                      });
                      // Animate store names out
                      gsap.to(storeNamesRef.current, {
                        opacity: 0,
                        scale: 0.9,
                        x: -30,
                        duration: 0.25,
                        ease: "power2.out",
                      });
                    } else {
                      // When details are open, remove hover effect
                      if (selectedCountry?.name !== country.name) {
                        gsap.to(e.currentTarget, {
                          scale: 0.9,
                          duration: 0.2,
                          ease: "power2.out",
                        });
                      }
                    }
                  }}
                >
                  <h3 className="text-xl md:text-3xl lg:text-5xl font-semibold whitespace-nowrap">
                    {country.name}
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Company Details Component */}
      {isDetailsOpen && selectedCountry && (
        <CompanyDetails
          country={selectedCountry}
          onClose={handleCloseDetails}
        />
      )}
    </>
  );
}
