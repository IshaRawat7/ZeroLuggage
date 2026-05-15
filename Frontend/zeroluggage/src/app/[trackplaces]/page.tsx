"use client";
import Image from "next/image";
import Img from "@/public/img5.webp"

export default function ExploreMorePage() {
  const highlights = [
    {
      title: "Eco Trails",
      desc: "Guided hikes through lush pine forests.",
      img: "/eco-trails.jpg",
    },
    {
      title: "Mall Road",
      desc: "Shop, dine and explore local crafts.",
      img: "/mall-road.jpg",
    },
    {
      title: "Snow View Point",
      desc: "Take a cable car to stunning vistas.",
      img: "/snow-view.jpg",
    },
    {
      title: "Cultural Gems",
      desc: "Visit ancient temples and heritage sites.",
      img: "/cultural-gems.jpg",
    },
  ];

  return (
    <main className="font-sans text-gray-800 bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${Img.src})` }}>
        <div className=" bg-opacity-50 p-10 rounded-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Discover Nainital Beyond the Lake
          </h1>
        </div>
      </section>

      {/* Highlights */}
      <section className="text-center py-16 px-6">
        <h2 className="text-3xl font-semibold mb-10">Discover the Wonders of Nainital</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((card) => (
            <div key={card.title} className="bg-white rounded-xl shadow-md p-5">
              <Image
                src={card.img}
                alt={card.title}
                width={400}
                height={250}
                className="rounded-lg w-full h-auto"
              />
              <h3 className="text-xl font-bold text-blue-600 mt-4">{card.title}</h3>
              <p className="mt-2 text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plan Your Day */}
      <section className="text-center py-16 px-6">
        <h2 className="text-3xl font-semibold mb-8">Plan Your Day in Nainital</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {["Adventure", "Relaxation", "Culture", "Food"].map((interest) => (
            <button
              key={interest}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {interest}
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-center gap-6">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Book Your Experience
          </button>
          <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition">
            Customize My Trip
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-6">
        <p>Contact Us: info@zeroluggage.com | +91 9876543210</p>
        <p className="mt-2">
          <a href="#" className="mx-2 hover:underline">Travel</a> | 
          <a href="#" className="mx-2 hover:underline">Luggage</a> | 
          <a href="#" className="mx-2 hover:underline">Fast</a> | 
          <a href="#" className="mx-2 hover:underline">Book Now</a>
        </p>
      </footer>
    </main>
  );
}
