"use client";

import type React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  MapPin,
  Calendar,
  Clock,
  Package,
  Upload,
  RefreshCw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LuggageBookingForm() {
  const [formData, setFormData] = useState({
    pickupLocation: "Pantnagar, Uttarakhand, India",
    dropoffLocation: "Pantnagar, Uttarakhand, India",
    pickupDate: "2025-12-25",
    pickupTime: "10:00",
    dropoffDate: "2025-10-25",
    dropoffTime: "14:00",
    luggageItems: "2",
    duration: "4 hrs",
    luggagePhotos: [] as File[],
  });

  const [dragActive, setDragActive] = useState(false);
  const estimatedFare = 20.0;
  const today = new Date().toISOString().split("T")[0];

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDurationSelect = (duration: string) => {
    setFormData((prev) => ({ ...prev, duration }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else setDragActive(false);
  };

  const addFiles = (files: FileList) => {
    const newFiles = Array.from(files).slice(0, 5 - formData.luggagePhotos.length);
    setFormData((prev) => ({
      ...prev,
      luggagePhotos: [...prev.luggagePhotos, ...newFiles],
    }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      luggagePhotos: prev.luggagePhotos.filter((_, i) => i !== index),
    }));
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in!");
        return;
      }

      const data = new FormData();
      data.append("pickupLocation", formData.pickupLocation);
      data.append("dropoffLocation", formData.dropoffLocation);
      data.append("pickupDate", `${formData.pickupDate}T${formData.pickupTime}`);
      data.append("dropoffDate", `${formData.dropoffDate}T${formData.dropoffTime}`);
      data.append("duration", formData.duration);
      data.append("luggageItems", formData.luggageItems);
      data.append("estimatedFare", estimatedFare.toString());

      formData.luggagePhotos.forEach((file) => {
        data.append("luggagePhotos", file);
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: data,
        }
      );

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success(result.message || "Booking created successfully!");
        setFormData({
          pickupLocation: "",
          dropoffLocation: "",
          pickupDate: "",
          pickupTime: "",
          dropoffDate: "",
          dropoffTime: "",
          luggageItems: "",
          duration: "",
          luggagePhotos: [],
        });
      } else {
        toast.error(result.message || "Booking failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className=" mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Book a New Luggage Delivery
        </h1>
        <p className="text-muted-foreground">
          Fill in the details below to schedule your delivery securely.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Location */}
         <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Location</h2>

          <div className="relative mb-6">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              className="pl-10 h-12"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="block text-sm mb-2">
              Upload luggage photos (max 5)
            </label>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                dragActive ? "border-sky-500 bg-sky-50" : ""
              }`}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id="luggage-photo"
              />
              <label htmlFor="luggage-photo" className="cursor-pointer">
                <Upload className="mx-auto mb-2" />
                <p>Drag & drop or click to upload</p>
              </label>
            </div>

            {/* PREVIEWS */}
            {formData.luggagePhotos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                {formData.luggagePhotos.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="h-24 w-full object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Drop-off
              </h3>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="date"
                  name="dropoffDate"
                  value={formData.dropoffDate}
                  onChange={handleChange}
                  className="pl-10 mb-3 h-12"
                  placeholder={today}
                />
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Select date & time
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Pickup
              </h3>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className="pl-10 mb-3 h-12"
                  placeholder={today}
                />
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Select date & time
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full border-2 border-sky-500 flex items-center justify-center mt-0.5">
                <div className="h-2 w-2 bg-sky-500 rounded-full" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Real-time availability: 8 storage points nearby
                </p>
                <p className="text-xs text-muted-foreground">
                  with space right now
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sky-600 text-xs font-medium">
              <RefreshCw className="h-3 w-3" />
              Auto-refreshing
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {["2 hrs", "4 hrs", "All day", "Overnight"].map((dur) => (
              <button
                key={dur}
                type="button"
                onClick={() => handleDurationSelect(dur)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                  formData.duration === dur
                    ? "border-sky-500 bg-sky-50 text-sky-600"
                    : "border-muted-foreground text-muted-foreground hover:border-sky-500"
                }`}
              >
                <Clock className="h-4 w-4" />
                {dur}
              </button>
            ))}
          </div>
        </Card>

        {/* Luggage & Fare */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Luggage & Fare
          </h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Number of Luggage Items
            </label>
            <div className="relative">
              <Package className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="number"
                name="luggageItems"
                value={formData.luggageItems}
                onChange={handleChange}
                min="1"
                className="pl-10 h-12"
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-foreground font-medium">Estimated Fare:</span>
            <span className="text-2xl font-bold text-sky-600">
              ₹{estimatedFare.toFixed(2)}
            </span>
          </div>
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg"
        >
          Confirm Booking
        </Button>
      </form>
    </div>
  );
} 