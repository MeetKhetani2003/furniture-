"use client";

import { motion } from "framer-motion";
import { Heart, Leaf, Users, Award, Truck, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80"
          alt="About PremiumCrafts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-text/80 to-brand-text/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-[family-name:var(--font-playfair)] text-4xl lg:text-6xl font-bold text-white mb-4"
            >
              Crafting Homes<br />Since 2010
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-lg max-w-xl"
            >
              We believe every home deserves furniture that tells a story. Our journey began with a simple mission: to bring world-class craftsmanship to Indian homes.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-20 py-16 lg:py-24">
        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-brand-primary text-sm font-bold tracking-wider uppercase">Our Story</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-bold text-brand-text mt-2 mb-4">
              From a Small Workshop to India&apos;s Favorite Furniture Brand
            </h2>
            <p className="text-brand-muted leading-relaxed mb-4">
              PremiumCrafts started in a small workshop in Jodhpur, Rajasthan, where our founder worked alongside master craftsmen to create furniture that blended traditional Indian woodworking techniques with contemporary design.
            </p>
            <p className="text-brand-muted leading-relaxed mb-4">
              Today, we work with over 500 artisans across India, sourcing the finest Sheesham wood, teak, and sustainable materials to create furniture that lasts generations.
            </p>
            <p className="text-brand-muted leading-relaxed">
              Every piece in our collection is a testament to the skill, patience, and artistry of Indian craftsmen who have perfected their trade over decades.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80"
              alt="Craftsmanship"
              className="rounded-xl w-full h-64 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80"
              alt="Workshop"
              className="rounded-xl w-full h-64 object-cover mt-8"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-brand-primary text-sm font-bold tracking-wider uppercase">What We Stand For</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-bold text-brand-text mt-2">
              Our Core Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Crafted with Love", desc: "Every piece is made with attention to detail and a passion for excellence." },
              { icon: Leaf, title: "Sustainability First", desc: "We use responsibly sourced wood and eco-friendly manufacturing processes." },
              { icon: Users, title: "Empowering Artisans", desc: "Fair wages and safe working conditions for all 500+ craftsmen in our network." },
              { icon: Award, title: "Quality Guaranteed", desc: "Rigorous quality checks and a 5-year warranty on every furniture piece." },
              { icon: Truck, title: "Pan-India Delivery", desc: "Delivering to 23 states with care, precision, and on-time commitment." },
              { icon: Shield, title: "Customer First", desc: "30-day returns, dedicated support, and a seamless shopping experience." },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 border border-brand-border/50"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
                  <value.icon size={24} className="text-brand-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-brand-muted">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-brand-primary text-sm font-bold tracking-wider uppercase">The People</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl font-bold text-brand-text mt-2">
              Meet Our Leadership
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Rajesh Sharma", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
              { name: "Priya Malhotra", role: "Chief Design Officer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80" },
              { name: "Vikram Patel", role: "Head of Operations", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" },
              { name: "Ananya Gupta", role: "Customer Experience Lead", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80" },
            ].map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold">{person.name}</h3>
                <p className="text-sm text-brand-muted">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-brand-dark rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "15+", label: "Years of Excellence" },
              { value: "500+", label: "Artisan Partners" },
              { value: "2L+", label: "Products Delivered" },
              { value: "50K+", label: "Happy Customers" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl lg:text-4xl font-bold text-brand-accent mb-1">{stat.value}</div>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
