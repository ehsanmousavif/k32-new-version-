export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-[clac(100vh-60px)] flex-col items-center justify-center gap-4  md:py-10">
      <div className="">{children}</div>
    </section>
  );
}
