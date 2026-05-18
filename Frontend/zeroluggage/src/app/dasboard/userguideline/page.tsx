"use client";

import {
  Package,
  ScanLine,
  Camera,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Img9 from "@/public/marker.jpeg"
import Img0 from "@/public/imga.jpeg"
import Img1 from "@/public/topview.jpg"

export default function UserGuidelinesPage() {
  const steps = [
    {
      step: "01",
      title: "Place Your Luggage Properly",
      description:
        "Keep the luggage/object on a flat surface with proper lighting. Avoid cluttered or dark backgrounds for better detection accuracy.",
      icon: <Package className="w-7 h-7" />,
      image:
        `${Img0.src}`,
    },

    {
      step: "02",
      title: "Place the ArUco Marker On Top",
      description:
        "Keep the ArUco marker clearly visible on top of the luggage. Do not fold, crop, or block the marker.",
      icon: <ScanLine className="w-7 h-7" />,
      image:`${Img9.src}`,
    },

    {
      step: "03",
      title: "Capture Top View Image",
      description:
        "Hold the camera directly above the luggage and capture a clear top-view image with both luggage and marker fully visible.",
      icon: <Camera className="w-7 h-7" />,
      image:
       `${Img1.src}`,
    },
  ];

  const tips = [
    "Use good lighting for clear visibility",
    "Avoid blurry or tilted images",
    "Ensure full luggage is visible",
    "Keep ArUco marker flat and clear",
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-14 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle2 className="w-4 h-4" />
            Follow These Steps Carefully
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            Luggage Image
            <span className="block text-slate-500">
              Capture Guidelines
            </span>
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-slate-600 leading-relaxed">
            To ensure accurate AI-based luggage detection and verification,
            carefully follow the instructions below while uploading your image.
          </p>
        </div>

        {/* STEPS SECTION */}
        <div className="space-y-16">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* IMAGE */}
              <div
                className={`relative ${
                  index % 2 !== 0 ? "lg:order-2" : ""
                }`}
              >
                <div className="absolute -top-5 -left-5 bg-black text-white text-2xl font-bold w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl z-10">
                  {item.step}
                </div>

                <div className="overflow-hidden rounded-2rem shadow-2xl border border-slate-200 bg-white">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-400px object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div
                className={`${
                  index % 2 !== 0 ? "lg:order-1" : ""
                }`}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-lg">
                    {item.icon}
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    {item.title}
                  </h2>
                </div>

                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  {item.description}
                </p>

                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md">
                  <h3 className="font-semibold text-slate-900 mb-4 text-lg">
                    Important Notes
                  </h3>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-600">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 text-green-600" />
                      Keep the object completely inside the frame.
                    </li>

                    <li className="flex items-start gap-3 text-slate-600">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 text-green-600" />
                      Avoid shadows or reflections on the object.
                    </li>

                    <li className="flex items-start gap-3 text-slate-600">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 text-green-600" />
                      Ensure the marker edges are clearly visible.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TIPS SECTION */}
        <div className="mt-24 bg-white border border-slate-200 rounded-2rem shadow-xl p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Quick Tips Before Upload
            </h2>

            <p className="text-slate-600 mt-3 text-lg">
              Follow these additional tips for best AI detection results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all"
              >
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-700" />
                </div>

                <p className="text-slate-700 font-medium">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
           <Link href="https://zero-luggage-kliq.vercel.app/adDashboard/upload">
          <button  className="bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-2xl text-lg font-semibold shadow-xl hover:scale-105 transition-all duration-300">
            Continue to Upload
          </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}
