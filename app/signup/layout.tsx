export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-[clac(100vh-60px)] m-auto flex-col items-center justify-center gap-4  md:py-10">
      <div className="flex flex-col justify-center items-center">
        {children}
      </div>
    </section>
  );
}
