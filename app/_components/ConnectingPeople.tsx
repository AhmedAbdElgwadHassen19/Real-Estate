import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const highlights = [
  "Expert agents with local market knowledge",
  "Transparent process from search to closing",
  "Thousands of verified listings updated daily",
  "Dedicated support every step of the way",
];

export default function ConnectingPeople() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative w-full h-[380px] md:h-[480px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/house.jpg"
                alt="Beautiful home"
                fill
                className="object-cover"
              />
              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Properties Sold</p>
                    <p className="text-2xl font-bold text-gray-900">500+</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Happy Clients</p>
                    <p className="text-2xl font-bold text-gray-900">200+</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Cities</p>
                    <p className="text-2xl font-bold text-gray-900">50+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative blob */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#e04141]/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-blue-100 rounded-full blur-2xl -z-10" />
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#e04141]/10 text-[#e04141] text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              Why Choose Us
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Connecting people with{" "}
              <span className="text-[#e04141]">perfect homes</span> is our passion
            </h2>

            <p className="text-gray-500 text-base leading-relaxed mb-8">
              With a genuine passion for helping people find their dream homes, we
              are dedicated to connecting buyers and sellers in the real estate
              market. Trust us to make your experience seamless and satisfying.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#e04141] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#e04141] text-white font-semibold rounded-xl hover:bg-[#c73636] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Explore Properties
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
