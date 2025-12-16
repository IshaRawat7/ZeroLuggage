import React from "react"
import { DestinationCard } from "./cards"
import Img from "@/public/travel.jpg"
import Img1 from "@/public/Img2.png"
import Img5 from "@/public/img5.webp"
import Img4 from "@/public/IMg4.jpg"
import Img9 from "@/public/img9.jpg"
import Img0 from "@/public/img0.jpg"

const Destination = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <header>
        <h2 className="text-6xl font-bold text-sky-900 mb-16 text-center ">
          Popular Among
        </h2>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Nainital */}
        <DestinationCard
          image={Img}
          imageTitle="Travel at Nainital"
          title="Travel At Nainital"
          location="Nainital"
          description="Enjoy boating at Naini Lake and explore the scenic beauty luggage-free with ZeroLuggage."
          tags={["Travel", "Luggage", "Fast", "Book Now"]}
        />

        {/* 2. Kedarnath */}
        <DestinationCard
          image={Img1}
          imageTitle="Travel at Kedarnath"
          title="Travel At Kedarnath"
          location="Kedarnath"
          description="Experience the divine Kedarnath temple and trek without worrying about your bags."
          tags={["Pilgrimage", "Trek", "Safe", "Book Now"]}
        />

        {/* 3. Badrinath */}
        <DestinationCard
          image={Img5}
          imageTitle="Travel at Badrinath"
          title="Travel At Badrinath"
          location="Badrinath"
          description="Visit the sacred Badrinath temple and enjoy the Himalayas hands-free with ZeroLuggage."
          tags={["Pilgrimage", "Travel", "Luggage-Free", "Book Now"]}
        />

        {/* 4. Haridwar */}
        <DestinationCard
          image={Img4}
          imageTitle="Travel at Haridwar"
          title="Travel At Haridwar"
          location="Haridwar"
          description="Witness the Ganga Aarti at Har Ki Pauri while your luggage is safely managed."
          tags={["Spiritual", "Travel", "Safe", "Book Now"]}
        />

        {/* 5. Rishikesh */}
        <DestinationCard
          image={Img1}
          imageTitle="Travel at Rishikesh"
          title="Travel At Rishikesh"
          location="Rishikesh"
          description="Enjoy yoga retreats and river rafting in Rishikesh without carrying heavy bags."
          tags={["Adventure", "Yoga", "Travel", "Book Now"]}
        />

        {/* 6. Mussoorie */}
        <DestinationCard
          image={Img9}
          imageTitle="Travel at Mussoorie"
          title="Travel At Mussoorie"
          location="Mussoorie"
          description="Explore the Queen of Hills, Mussoorie, luggage-free and stress-free."
          tags={["Hill Station", "Travel", "Relax", "Book Now"]}
        />

        {/* 7. Neem Karoli Ashram */}
        <DestinationCard
          image={Img0}
          imageTitle="Travel at Neem Karoli Ashram"
          title="Travel At Neem Karoli Ashram"
          location="Neem Karoli, Kainchi Dham"
          description="Seek peace and blessings at Neem Karoli Baba Ashram while ZeroLuggage takes care of your bags."
          tags={["Spiritual", "Peace", "Travel", "Book Now"]}
        />
      </div>
    </div>
  )
}

export default Destination
