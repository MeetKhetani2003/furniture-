import { ArrowRight, Users, HeartPulse, GraduationCap, MapPin } from "lucide-react";
import Link from "next/link";

const OPEN_ROLES = [
  { id: 1, title: "Senior Interior Designer", department: "Design Studio", location: "Mumbai, India", type: "Full-Time" },
  { id: 2, title: "E-Commerce Manager", department: "Digital", location: "Remote / Bengaluru", type: "Full-Time" },
  { id: 3, title: "Master Carpenter", department: "Manufacturing", location: "Jodhpur, India", type: "Full-Time" },
  { id: 4, title: "Retail Experience Associate", department: "Retail", location: "New Delhi, India", type: "Part-Time" },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      {/* Hero Section */}
      <div className="bg-brand-dark text-white py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4 text-brand-primary">Careers at Premius Crafts</p>
          <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-playfair)] font-bold mb-6 max-w-4xl mx-auto">
            Shape the future of modern living.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            We are a collective of designers, craftsmen, engineers, and visionaries united by a passion for quality. Join us in building a brand that defines the modern Indian home.
          </p>
          <a
            href="#open-roles"
            className="inline-block px-10 py-4 bg-brand-primary text-brand-dark font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
          >
            View Open Roles
          </a>
        </div>
      </div>

      {/* Values/Benefits Section */}
      <div className="py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-6">Why Work With Us?</h2>
            <p className="text-brand-muted mb-8 leading-relaxed">
              We believe that to craft the best products, we must cultivate the best environment for our team. We offer competitive compensation, comprehensive benefits, and a culture that celebrates creativity and craftsmanship.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-secondary flex items-center justify-center shrink-0">
                  <HeartPulse size={20} className="text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Comprehensive Wellness</h4>
                  <p className="text-sm text-brand-muted">Premium health, dental, and vision coverage for you and your dependents.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-secondary flex items-center justify-center shrink-0">
                  <Users size={20} className="text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Inclusive Culture</h4>
                  <p className="text-sm text-brand-muted">A diverse team environment where every voice is heard and valued.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-secondary flex items-center justify-center shrink-0">
                  <GraduationCap size={20} className="text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Continuous Learning</h4>
                  <p className="text-sm text-brand-muted">Annual stipend for courses, conferences, and professional development.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
              alt="Team collaborating" 
              className="w-full h-[500px] object-cover rounded-xl shadow-xl"
            />
          </div>
        </div>

        {/* Open Roles */}
        <div id="open-roles" className="scroll-mt-24">
          <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-2">Open Positions</h2>
          <p className="text-brand-muted mb-10">Find your place in our growing team.</p>

          <div className="flex flex-col gap-4">
            {OPEN_ROLES.map((role) => (
              <div key={role.id} className="bg-white border border-brand-border/40 p-6 rounded-lg hover:border-brand-primary hover:shadow-lg transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2">{role.department}</p>
                  <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-brand-muted">
                    <span className="flex items-center gap-1"><MapPin size={14}/> {role.location}</span>
                    <span>•</span>
                    <span>{role.type}</span>
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-brand-secondary text-brand-dark font-bold text-xs uppercase tracking-widest group-hover:bg-brand-dark group-hover:text-white transition-colors whitespace-nowrap">
                  Apply Now <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-brand-secondary/50 rounded-lg text-center border border-brand-border/40">
            <h3 className="text-lg font-bold mb-2">Don't see a fit?</h3>
            <p className="text-brand-muted text-sm mb-4">We're always looking for talented individuals. Send your resume to careers@premiuscrafts.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
