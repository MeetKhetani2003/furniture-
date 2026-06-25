"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation, Calendar, Search } from "lucide-react";

const stores = [
  {
    name: "PremiumCrafts Flagship Store",
    address: "High Street Phoenix, Lower Parel, Mumbai - 400013",
    phone: "+91 22 1234 5678",
    hours: "10:00 AM - 10:00 PM",
    city: "Mumbai",
    pincode: "400013",
  },
  {
    name: "PremiumCrafts Experience Center",
    address: "Phoenix Marketcity, Whitefield, Bangalore - 560048",
    phone: "+91 80 2345 6789",
    hours: "10:00 AM - 10:00 PM",
    city: "Bangalore",
    pincode: "560048",
  },
  {
    name: "PremiumCrafts Studio",
    address: "Select Citywalk Mall, Saket, Delhi - 110017",
    phone: "+91 11 3456 7890",
    hours: "11:00 AM - 9:00 PM",
    city: "Delhi",
    pincode: "110017",
  },
  {
    name: "PremiumCrafts Home",
    address: "Express Avenue Mall, Royapettah, Chennai - 600014",
    phone: "+91 44 4567 8901",
    hours: "10:00 AM - 10:00 PM",
    city: "Chennai",
    pincode: "600014",
  },
  {
    name: "PremiumCrafts Gallery",
    address: "GVK One Mall, Banjara Hills, Hyderabad - 500034",
    phone: "+91 40 5678 9012",
    hours: "10:00 AM - 10:00 PM",
    city: "Hyderabad",
    pincode: "500034",
  },
  {
    name: "PremiumCrafts Lounge",
    address: "Acropolis Mall, Kasba, Kolkata - 700107",
    phone: "+91 33 6789 0123",
    hours: "11:00 AM - 9:00 PM",
    city: "Kolkata",
    pincode: "700107",
  },
];

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  const cities = ["All", ...Array.from(new Set(stores.map((s) => s.city)))];

  const filteredStores = stores.filter((s) => {
    const matchesCity = selectedCity === "All" || s.city === selectedCity;
    const matchesSearch =
      searchQuery === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.pincode.includes(searchQuery);
    return matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      <div className="relative h-[300px] lg:h-[350px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
          alt="Store Locator"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-text/80 to-brand-text/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl font-bold text-white mb-3"
            >
              Find a Store
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/80 max-w-lg"
            >
              Visit our experience centers to see, touch, and feel our furniture before you buy.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-12">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              placeholder="Search by city, pincode, or store name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-primary"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCity === city
                    ? "bg-brand-primary text-white"
                    : "bg-white border border-brand-border text-brand-text hover:border-brand-primary"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Store List */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredStores.map((store, i) => (
            <motion.div
              key={store.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-6 border border-brand-border/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{store.name}</h3>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-brand-secondary text-brand-muted text-xs rounded">
                    {store.city}
                  </span>
                </div>
                <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin size={18} className="text-brand-primary" />
                </div>
              </div>
              <div className="space-y-2 text-sm text-brand-muted mb-4">
                <p className="flex items-center gap-2">
                  <MapPin size={14} className="shrink-0" />
                  {store.address}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={14} className="shrink-0" />
                  {store.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={14} className="shrink-0" />
                  {store.hours}
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 border border-brand-border rounded-lg text-sm font-medium text-center hover:bg-brand-secondary transition-colors flex items-center justify-center gap-1"
                >
                  <Navigation size={14} />
                  Get Directions
                </a>
                <button className="flex-1 py-2.5 bg-brand-primary text-white rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors flex items-center justify-center gap-1">
                  <Calendar size={14} />
                  Book Visit
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div className="text-center py-16">
            <p className="text-brand-muted text-lg">No stores found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
