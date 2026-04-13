import DepartureBanner from "./DepartureBanner";

export default function DepartureSection() {
  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="px-6 sm:px-8 lg:px-6 xl:px-8 2xl:px-[7.5%]">
        <DepartureBanner variant="full" />
      </div>
    </section>
  );
}
