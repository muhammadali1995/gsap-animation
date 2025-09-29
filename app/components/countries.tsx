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
  const footerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    // Set initial logo state
    if (logoRef.current) {
      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.8,
      });
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
      updateCountryHighlight(country);
    } else {
      // First time opening details
      setSelectedCountry(country);
      setIsDetailsOpen(true);

      // Animate companies container to the left
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          x: "-38%",
          duration: 0.8,
          scale: 0.4,
          ease: "power3.out",
        });
      }

      updateCountryHighlight(country);
    }
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedCountry(null);

    // Animate companies container back to center
    if (containerRef.current && companiesRef.current) {
      gsap.to(containerRef.current, {
        x: "0%",
        scale: 1, // Reset scale back to original
        duration: 0.8,
        ease: "power3.out",
      });

      // Restore all company items to original state
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
        <div ref={containerRef} className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Explore Countries Around the World
            </h2>
            <p
              ref={subtitleRef}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Discover fascinating countries from different continents and learn
              about their unique cultures and histories.
            </p>
          </div>

          <div className="max-w-6xl mx-auto relative">
            {/* Company Logo Display */}
            <div
              ref={logoRef}
              className="fixed right-8 top-1/2 opacity-0 pointer-events-none z-10"
            >
              {hoveredCountry && !isDetailsOpen && (
                <div className="text-8xl w-96 h-full flex items-center justify-center">
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
                        x: 50,
                        opacity: 0.3,
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
                      x: 0,
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
                  <h3 className="text-[58px] font-semibold whitespace-nowrap">
                    {country.name}
                  </h3>
                </li>
              ))}
            </ul>
          </div>

          <div ref={footerRef} className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              and 190+ more countries worldwide
            </p>
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
