const SectionContainer = ({ children, className }) => {
  return (
    <section className={`py-16 px-4 ${className}`}>
      <div className="container mx-auto">{children}</div>
    </section>
  );
};

export default SectionContainer;