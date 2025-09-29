import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { CompanyDetails } from "./company-details";

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

const companies: Company[] = [
  {
    name: "CHINA 中国",
    logo: "🇨🇳",
    description:
      "China, officially the People's Republic of China, is a country in East Asia. It is the world's most populous country with a population exceeding 1.4 billion.",
    founded: "1949",
    industry: "Government",
    employees: "1.4 billion+",
    revenue: "$17.7 trillion GDP",
    headquarters: "Beijing, China",
  },
  {
    name: "United States 美国",
    logo: "🇺🇸",
    description:
      "The United States of America is a country primarily located in North America. It consists of 50 states, a federal district, and several territories.",
    founded: "1776",
    industry: "Government",
    employees: "331 million+",
    revenue: "$25.4 trillion GDP",
    headquarters: "Washington D.C., USA",
  },
  {
    name: "Canada 加拿大",
    logo: "🇨🇦",
    description:
      "Canada is a country in North America. Its ten provinces and three territories extend from the Atlantic Ocean to the Pacific Ocean and northward into the Arctic Ocean.",
    founded: "1867",
    industry: "Government",
    employees: "38 million+",
    revenue: "$2.1 trillion GDP",
    headquarters: "Ottawa, Canada",
  },
  {
    name: "Australia 澳洲",
    logo: "🇦🇺",
    description:
      "Australia, officially the Commonwealth of Australia, is a sovereign country comprising the mainland of the Australian continent, the island of Tasmania, and numerous smaller islands.",
    founded: "1901",
    industry: "Government",
    employees: "25.7 million+",
    revenue: "$1.6 trillion GDP",
    headquarters: "Canberra, Australia",
  },
  {
    name: "New Zealand 新西兰",
    logo: "🇳�",
    description:
      "New Zealand is an island country in the southwestern Pacific Ocean. It consists of two main landmasses—the North Island and the South Island—and over 700 smaller islands.",
    founded: "1840",
    industry: "Government",
    employees: "5.1 million+",
    revenue: "$249 billion GDP",
    headquarters: "Wellington, New Zealand",
  },
  {
    name: "Cambodia 柬埔寨",
    logo: "🇰🇭",
    description:
      "Cambodia, officially the Kingdom of Cambodia, is a country located in the southern portion of the Indochinese Peninsula in Southeast Asia.",
    founded: "802",
    industry: "Government",
    employees: "16.7 million+",
    revenue: "$27 billion GDP",
    headquarters: "Phnom Penh, Cambodia",
  },
  {
    name: "Japan 日本",
    logo: "🇯🇵",
    description:
      "Japan is an island country in East Asia. It is situated in the northwest Pacific Ocean and is bordered on the west by the Sea of Japan.",
    founded: "660 BC",
    industry: "Government",
    employees: "125.8 million+",
    revenue: "$4.9 trillion GDP",
    headquarters: "Tokyo, Japan",
  },
];

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

export function Companies() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const companiesRef = useRef<HTMLUListElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
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

  const updateCompanyHighlight = (newCompany: Company) => {
    if (companiesRef.current) {
      const companyItems = companiesRef.current.querySelectorAll("li");
      companyItems.forEach((item, index) => {
        const companyName = companies[index].name;
        if (companyName === newCompany.name) {
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

  const handleCompanyClick = (company: Company) => {
    if (isDetailsOpen && selectedCompany?.name === company.name) {
      // If clicking the same company, do nothing
      return;
    }

    if (isDetailsOpen) {
      // If details are already open, just change the company with animation
      setSelectedCompany(company);
      updateCompanyHighlight(company);
    } else {
      // First time opening details
      setSelectedCompany(company);
      setIsDetailsOpen(true);

      // Animate companies container to the left
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          x: "-38%",
          duration: 0.8,
          scale: 0.6,
          ease: "power3.out",
        });
      }

      updateCompanyHighlight(company);
    }
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedCompany(null);

    // Animate companies container back to center
    if (containerRef.current && companiesRef.current) {
      gsap.to(containerRef.current, {
        x: "0%",
        duration: 0.8,
        ease: "power3.out",
      });

      // Restore all company items to original state
      const companyItems = companiesRef.current.querySelectorAll("li");
      gsap.to(companyItems, {
        scale: 1,
        opacity: 1,
        color: "#201a39",
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
              {hoveredCompany && !isDetailsOpen && (
                <div className="text-8xl w-96 h-full flex items-center justify-center">
                  {companies.find((c) => c.name === hoveredCompany)?.logo}
                </div>
              )}
            </div>

            <ul
              ref={companiesRef}
              className="flex flex-col justify-center items-center gap-2"
            >
              {companies.map((company) => (
                <li
                  key={company.name}
                  className="text-center p-4 rounded-lg text-[#201a39] cursor-pointer"
                  onClick={() => handleCompanyClick(company)}
                  onMouseEnter={(e) => {
                    if (!isDetailsOpen) {
                      setHoveredCompany(company.name);
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
                      if (selectedCompany?.name !== company.name) {
                        gsap.to(e.currentTarget, {
                          scale: 1.05,
                          duration: 0.2,
                          ease: "power2.out",
                        });
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    setHoveredCompany(null);
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
                      if (selectedCompany?.name !== company.name) {
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
                    {company.name}
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
      {isDetailsOpen && selectedCompany && (
        <CompanyDetails
          company={selectedCompany}
          onClose={handleCloseDetails}
        />
      )}
    </>
  );
}
