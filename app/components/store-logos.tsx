const ScrollLogos = ({ companies }: any) => {
  return (
    <div>
      <article className="wrapper">
        <div className="marquee">
          <div
            className={`marquee__group ${companies?.length > 7 ? " marquee_animated" : ""}`}
          >
            {companies?.map((company: any) => (
              <div className="bg-white h-24" key={company.name}>
                <img className="h-full" src={company.src} alt={company.name} />
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ScrollLogos;
