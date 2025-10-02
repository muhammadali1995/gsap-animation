import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { CompanyDetails } from "./companies";
import type { Country } from "~/models/country";
import { countries } from "~/constant/countries";

export function Countries() {
  const sectionRef = useRef<HTMLElement>(null);
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
      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.8,
        filter: "blur(2px)",
        x: 80,
      });
    }
    if (storeNamesRef.current) {
      gsap.set(storeNamesRef.current, {
        opacity: 0,
        scale: 0.85,
        filter: "blur(2px)",
        x: -80,
      });
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
          x: "-38%",
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
            {/* Left: store names (plain, responsive hidden on small screens) */}
            <div className="fixed left-4 lg:left-48 md:left-10 top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden md:flex flex-col gap-4 items-center justify-center text-center">
              <div
                ref={storeNamesRef}
                className="opacity-0 flex items-center justify-center"
              >
                {hoveredCountry &&
                  !isDetailsOpen &&
                  hoveredCountry.details?.companies && (
                    <ul className="space-y-1 text-center">
                      {hoveredCountry.details.companies.slice(0, 5).map((c) => (
                        <li key={c.name}>
                          <span className="text-xs md:text-lg lg:text-2xl font-semibold leading-none opacity-80">
                            {c.name}
                          </span>
                        </li>
                      ))}
                      {hoveredCountry.details.companies.length > 5 && (
                        <li>
                          <span className="text-xs md:text-lg lg:text-2xl font-semibold leading-none opacity-80">
                            & {hoveredCountry.details.companies.length - 5} more
                          </span>
                        </li>
                      )}
                    </ul>
                  )}
              </div>
            </div>

            {/* Right: flag */}
            <div className="fixed right-4 md:right-10 lg:right-48 top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden md:flex flex-col gap-4 items-center justify-center">
              <div
                ref={logoRef}
                className="opacity-0 flex items-center justify-center"
              >
                {hoveredCountry && !isDetailsOpen && (
                  <div className="w-40 h-28 md:w-48 md:h-32 flex items-center justify-center">
                    <img
                      src={hoveredCountry.logo}
                      alt={hoveredCountry.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            <ul
              ref={companiesRef}
              className="flex flex-col justify-center items-center gap-2 px-4"
            >
              {countries.map((country) => (
                <li
                  key={country.name}
                  className="group text-center p-2 md:p-4 rounded-lg text-[#201a39] cursor-pointer opacity-60"
                  onClick={() => handleCountryClick(country)}
                  onMouseEnter={(e) => {
                    if (isDetailsOpen) return;
                    setHoveredCountry(country);
                    // Country item hover motion & opacity
                    gsap.to(e.currentTarget, {
                      x: 32,
                      opacity: 1,
                      duration: 0.4,
                      ease: "power3.out",
                    });
                    // Kill any running tweens to avoid stacking
                    if (logoRef.current) gsap.killTweensOf(logoRef.current);
                    if (storeNamesRef.current)
                      gsap.killTweensOf(storeNamesRef.current);
                    const tl = gsap.timeline();
                    if (storeNamesRef.current) {
                      tl.fromTo(
                        storeNamesRef.current,
                        {
                          autoAlpha: 0,
                          x: -90,
                          scale: 0.8,
                          filter: "blur(6px)",
                        },
                        {
                          autoAlpha: 1,
                          x: 0,
                          scale: 1,
                          filter: "blur(0px)",
                          duration: 0.55,
                          ease: "power3.out",
                        },
                        0
                      );
                    }
                    if (logoRef.current) {
                      tl.fromTo(
                        logoRef.current,
                        {
                          autoAlpha: 0,
                          x: 90,
                          scale: 0.75,
                          rotation: 4,
                          filter: "blur(6px)",
                        },
                        {
                          autoAlpha: 1,
                          x: 0,
                          scale: 1,
                          rotation: 0,
                          filter: "blur(0px)",
                          duration: 0.6,
                          ease: "power3.out",
                        },
                        0.05
                      );
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isDetailsOpen) return;
                    setHoveredCountry(null);
                    gsap.to(e.currentTarget, {
                      x: 0,
                      opacity: 0.6,
                      duration: 0.4,
                      ease: "power3.inOut",
                    });
                    if (storeNamesRef.current) {
                      gsap.to(storeNamesRef.current, {
                        autoAlpha: 0,
                        x: -60,
                        scale: 0.9,
                        filter: "blur(4px)",
                        duration: 0.3,
                        ease: "power2.in",
                      });
                    }
                    if (logoRef.current) {
                      gsap.to(logoRef.current, {
                        autoAlpha: 0,
                        x: 60,
                        scale: 0.9,
                        filter: "blur(4px)",
                        duration: 0.3,
                        ease: "power2.in",
                      });
                    }
                  }}
                >
                  <h3 className="font-semibold whitespace-nowrap text-[30px] md:text-[40px] lg:text-[56px] leading-none">
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
