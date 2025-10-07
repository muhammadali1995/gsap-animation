import { memo } from "react";

interface Company {
  name: string;
  src: string;
}

interface ScrollLogosProps {
  companies: Company[];
}

const ScrollLogos = memo(({ companies }: ScrollLogosProps) => {
  return (
    <div>
      <article className="wrapper">
        <div className="marquee">
          <div
            className={`marquee__group ${companies?.length > 7 ? " marquee_animated" : ""}`}
          >
            {companies?.map((company) => (
              <div className="bg-white h-24" key={company.name}>
                <img 
                  className="h-full" 
                  src={company.src} 
                  alt={company.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
});

ScrollLogos.displayName = "ScrollLogos";

export default ScrollLogos;
