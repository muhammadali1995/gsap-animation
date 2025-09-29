import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { CompanyDetails } from "./company-details";

const companies: Company[] = [
  {
    name: "Apple",
    logo: "🍎",
    description:
      "Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services.",
    founded: "1976",
    industry: "Technology",
    employees: "164,000+",
    revenue: "$394.3 billion",
    headquarters: "Cupertino, California",
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
    name: "Meta",
    logo: "👥",
    description:
      "Meta Platforms, Inc. is an American multinational technology conglomerate holding company that owns Facebook, Instagram, and WhatsApp.",
    founded: "2004",
    industry: "Social Media/Technology",
    employees: "86,000+",
    revenue: "$134.9 billion",
    headquarters: "Menlo Park, California",
  },
  {
    name: "Netflix",
    logo: "🎬",
    description:
      "Netflix, Inc. is an American subscription video on-demand over-the-top streaming service and production company.",
    founded: "1997",
    industry: "Entertainment/Technology",
    employees: "12,800+",
    revenue: "$31.6 billion",
    headquarters: "Los Gatos, California",
  },
  {
    name: "Tesla",
    logo: "⚡",
    description:
      "Tesla, Inc. is an American multinational automotive and clean energy company that designs and manufactures electric vehicles.",
    founded: "2003",
    industry: "Automotive/Clean Energy",
    employees: "127,000+",
    revenue: "$96.8 billion",
    headquarters: "Austin, Texas",
  },
  {
    name: "Nike",
    logo: "👟",
    description:
      "Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and marketing of footwear, apparel, and accessories.",
    founded: "1964",
    industry: "Sportswear",
    employees: "79,100+",
    revenue: "$51.2 billion",
    headquarters: "Beaverton, Oregon",
  },
  {
    name: "McDonald's",
    logo: "🍟",
    description:
      "McDonald's Corporation is an American multinational fast food chain, founded in 1940 as a restaurant operated by Richard and Maurice McDonald.",
    founded: "1940",
    industry: "Fast Food",
    employees: "200,000+",
    revenue: "$23.2 billion",
    headquarters: "Chicago, Illinois",
  },
  {
    name: "Coca-Cola",
    logo: "🥤",
    description:
      "The Coca-Cola Company is an American multinational beverage corporation founded in 1892, best known as the producer of Coca-Cola.",
    founded: "1892",
    industry: "Beverages",
    employees: "86,200+",
    revenue: "$43.0 billion",
    headquarters: "Atlanta, Georgia",
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
              Trusted by Leading Companies
            </h2>
            <p
              ref={subtitleRef}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Join thousands of companies that trust our platform to power their
              success.
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
              and 1000+ more companies worldwide
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
