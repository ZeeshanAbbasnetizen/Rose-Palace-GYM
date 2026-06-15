/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import Lenis from "lenis";
import { 
  Dumbbell, 
  Users, 
  Timer, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  ArrowRight, 
  Menu,
  Shield,
  Zap,
  Target,
  Leaf,
  Coffee,
  Droplet,
  Layers,
  ChevronRight,
  X,
  Mail,
  MessageSquare,
  BadgePercent,
  CheckCircle2,
  Camera,
  Info
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import type { FormEvent } from "react";
import { db } from "./lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-4 sm:px-12 py-2 flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-0 ${
        isScrolled ? "bg-black/95 backdrop-blur-2xl border-b border-white/5 py-2 sm:py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" : "bg-transparent py-4"
      }`}
      id="navbar"
    >
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6, ease: "anticipate" }}
            className="w-6 h-6 sm:w-7 sm:h-7 bg-[#FF5F05] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,95,5,0.4)]"
          >
            <Dumbbell className="text-black w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </motion.div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-black text-sm sm:text-base tracking-tighter uppercase italic">
              Rose<span className="text-[#FF5F05]">Palace</span>
            </span>
            <span className="text-[4px] sm:text-[6px] font-black uppercase tracking-[0.4em] text-white/30 ml-0.5">Elite Fitness</span>
          </div>
        </div>

        {/* Mobile Join-only button */}
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="sm:hidden bg-[#FF5F05] p-2 rounded-full shadow-[0_0_15px_rgba(255,95,5,0.4)]"
        >
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-8 text-[7px] sm:text-[9px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white/40 overflow-x-auto no-scrollbar w-full sm:w-auto px-2">
        <a href="#home" className="hover:text-[#FF5F05] transition-all whitespace-nowrap">Home</a>
        <a href="#about" className="hover:text-[#FF5F05] transition-all whitespace-nowrap">About</a>
        <a href="#services" className="hover:text-[#FF5F05] transition-all whitespace-nowrap">Experience</a>
        <a href="#gallery" className="hover:text-[#FF5F05] transition-all whitespace-nowrap">Gallery</a>
        <a href="#contact" className="hover:text-[#FF5F05] transition-all whitespace-nowrap">Contact</a>
      </div>

      <div className="hidden sm:flex items-center gap-3">
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-[#FF5F05] text-white px-6 py-2.5 font-black uppercase text-[9px] tracking-widest hover:scale-105 active:scale-95 transition-all items-center gap-2 group shadow-[0_0_20px_rgba(255,95,5,0.3)] relative overflow-hidden" 
          id="nav-join-btn"
        >
          <span className="relative z-10">Join the Elite</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform relative z-10" />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.2]);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background massive FITNESS text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="font-heading font-black text-[30vw] leading-none text-white/5 uppercase">
          FITNESS
        </span>
      </div>

      {/* Abstract background elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop" 
          alt="Gym Interior"
          className="w-full h-full object-cover grayscale contrast-125 brightness-50"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5F05]/10 blur-[150px] rounded-full opacity-40 shrink-0" />
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[100svh] pt-16">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.5 }}
           className="mb-4 md:mb-6 cursor-pointer group"
           onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="inline-flex items-center gap-2.5 bg-white/[0.07] backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] group-hover:bg-white/10 transition-colors">
            <div className="w-1.5 h-1.5 bg-[#FF5F05] rounded-full animate-pulse shadow-[0_0_12px_#FF5F05]" />
            <span className="text-white font-black text-[8px] md:text-[9px] tracking-[0.35em] uppercase whitespace-nowrap">Join the Lahore Elite</span>
          </div>
        </motion.div>

        <motion.h1 
          className="font-display text-[9vw] sm:text-[8vw] lg:text-[7vw] leading-[0.8] md:leading-[0.75] uppercase tracking-tighter mb-4 md:mb-6 relative flex flex-col items-center justify-center select-none pointer-events-none px-2"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <span className="block text-white italic drop-shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative z-20">Rose</span>
          <span className="block text-[#FF5F05] -mt-[0.06em] sm:-mt-[0.08em] md:-mt-[0.1em] glow-orange relative z-10 scale-[1.02] sm:scale-[1.05] md:scale-[1.02] opacity-90 brightness-110">Palace</span>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[5vw] bg-white opacity-[0.015] -rotate-12 pointer-events-none hidden md:block" />
        </motion.h1>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full max-w-[320px] sm:max-w-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto bg-[#FF5F05] text-white px-8 md:px-10 py-3 md:py-4 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs group flex items-center justify-center gap-3 transition-all glow-orange relative overflow-hidden" 
            id="hero-cta-main"
          >
            <span className="relative z-10">Start Your Journey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
          <div className="flex flex-col items-center gap-1.5 w-full sm:w-auto">
            <button 
              onClick={() => document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto border border-white/10 text-white px-8 md:px-10 py-3 md:py-4 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-white hover:text-black transition-all glass-panel" 
              id="hero-tour-main"
            >
              Virtual Tour
            </button>
            <div className="hidden sm:flex items-center gap-2 opacity-30 mt-2">
               <div className="w-8 h-[1px] bg-white" />
               <span className="text-[8px] font-black uppercase tracking-widest leading-none">Explore Facility</span>
               <div className="w-8 h-[1px] bg-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20"
      >
        <span className="writing-mode-vertical text-[9px] font-black uppercase tracking-[0.5em]">Scroll to Evolve</span>
        <div className="w-[1px] h-10 bg-white" />
      </motion.div>
    </section>
  );
};

const AboutUs = () => {
  return (
    <section id="about" className="py-16 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FF5F05]/5 blur-[100px] rounded-full -mr-48 -mt-48" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-1.5 mb-3">
            <Info className="w-3.5 h-3.5 text-[#FF5F05]" />
            <span className="text-[#FF5F05] font-black uppercase tracking-[0.4em] text-[9px] block">Our Philosophy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter italic mb-3 leading-none">
            Transform <br /> Your <span className="text-[#FF5F05]">Body</span> Today
          </h2>
          <p className="text-white/50 font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] leading-relaxed mb-6 max-w-lg">
            Achieve your weight loss and muscle gain goals with our personalized fitness plans tailored specifically to your body type, BMI, and metabolism. We don't believe in one-size-fits-all. Every body is a unique temple designed for greatness.
          </p>
          
          <div className="bg-white/[0.03] border-l-4 border-[#FF5F05] p-5 rounded-r-2xl mb-6 relative overflow-hidden group">
             <div className="absolute top-3 right-4 text-[#FF5F05] opacity-20 group-hover:scale-110 transition-transform">
               <MessageSquare className="w-10 h-10" />
             </div>
             <p className="text-white italic text-base md:text-lg font-medium leading-relaxed mb-4 relative z-10">
               "It is a very good team, there is a very good atmosphere in which you can feel yourself very well."
             </p>
             <div className="flex items-center gap-3 relative z-10">
               <div className="w-10 h-10 rounded-full bg-[#FF5F05] flex items-center justify-center font-black text-black text-[10px]">SY</div>
               <div>
                 <p className="text-white font-black uppercase tracking-widest text-[9px]">Shoaib Yousaf</p>
                 <div className="flex text-[#FF5F05] gap-0.5 mt-0.5">
                   {[...Array(5)].map((_, i) => <Zap key={i} className="w-2 h-2 fill-current" />)}
                 </div>
               </div>
             </div>
          </div>
          
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3 text-[#FF5F05] font-black uppercase tracking-[0.3em] text-[9px] hover:gap-4 transition-all"
          >
            Start Your Transformation <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.86 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-square md:aspect-[4/5] rounded-[32px] overflow-hidden group"
        >
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-110 transition-transform duration-[3000ms]"
            alt="Transformation"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex flex-col text-center sm:text-left">
               <span className="text-4xl md:text-5xl font-heading font-black italic glow-orange">100%</span>
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF5F05]">Personalized Results</span>
             </div>
             <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-4 rounded-2xl flex items-center gap-3 shadow-2xl">
                <Users className="w-5 h-5 text-[#FF5F05]" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] leading-tight">Elite Training <br /> Atmosphere</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const GalleryGrid = () => {
  const photos = [
    { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop", span: "row-span-2 col-span-2" },
    { src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop", span: "row-span-1 col-span-1" },
    { src: "https://images.unsplash.com/photo-1571388208497-71bedc66e932?q=80&w=1000&auto=format&fit=crop", span: "row-span-1 col-span-1" },
    { src: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000&auto=format&fit=crop", span: "row-span-2 col-span-1" },
    { src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1000&auto=format&fit=crop", span: "row-span-1 col-span-2" },
    { src: "https://images.unsplash.com/photo-1541534741688-6078c64b52d3?q=80&w=1000&auto=format&fit=crop", span: "row-span-1 col-span-1" },
  ];

  return (
    <section id="gallery" className="py-16 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-10 text-center items-center">
          <div className="inline-flex items-center gap-1.5 mb-3">
            <Camera className="w-3.5 h-3.5 text-[#FF5F05]" />
            <span className="text-[#FF5F05] font-black uppercase tracking-[0.4em] text-[9px]">The Visual Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter italic leading-none">
            Dare To Be <br /> <span className="text-white/10 outline-text">Great</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[220px]">
          {photos.map((photo, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: i * 0.1 }}
               className={`group relative overflow-hidden rounded-2xl ${photo.span} border border-white/5`}
            >
               <img src={photo.src} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700" alt="Gym" />
               <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity" />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    <ArrowRight className="text-black w-4 h-4 -rotate-45" />
                  </div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ title, icon: Icon, description, index }: { title: string, icon: any, description: string, index: number, key?: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const images = [
    "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541534741688-6078c64b52d3?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574680096145-d05b474e2158?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1434754239841-c4595faec6c3?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599058917233-5c3b313ef04f?q=80&w=2069&auto=format&fit=crop",
  ];

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group p-6 bg-white/[0.02] border border-white/5 hover:border-[#FF5F05]/30 transition-all relative overflow-hidden glass-panel"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
        <img src={images[index % images.length]} alt="" className="w-full h-full object-cover grayscale" />
      </div>
      <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-16 h-16 text-white" />
      </div>
      <div className="w-10 h-10 bg-[#FF5F05]/10 rounded-lg flex items-center justify-center mb-4 text-[#FF5F05] group-hover:bg-[#FF5F05] group-hover:text-white transition-all glow-orange relative z-10">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-heading font-black text-lg uppercase mb-2 tracking-tighter italic relative z-10">{title}</h3>
      <p className="text-white/30 text-[10px] font-medium leading-relaxed uppercase tracking-widest relative z-10">{description}</p>
      
      <div className="mt-6 flex items-center gap-2 text-[#FF5F05] text-[8px] font-black uppercase tracking-[0.2em] cursor-pointer group-hover:gap-3 transition-all relative z-10">
        Experience Details <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    { 
      title: "Health & Fitness", 
      icon: Users, 
      description: "Personalized fitness plans based on your body type, BMI, and metabolism.",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      title: "Mind & Body Mastery", 
      icon: Zap, 
      description: "Boost your mental and physical health with simple, daily exercises.",
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop" 
    },
    { 
      title: "Work, Sweat, Achieve", 
      icon: Target, 
      description: "Achieve your weight loss and muscle gain goals with our elite infrastructure.",
      img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" 
    },
  ];

  const complimentaryItems = [
    "No Joining Fee",
    "No Admission Fee",
    "24/7 Open Co-GYM",
    "Professional Trainers",
    "Black Coffee | Herbal Tea",
    "Detox Water | Face Towel",
    "Lockers, Shower & Changing Room"
  ];

  return (
    <section id="services" className="py-16 px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-10 text-center items-center">
            <span className="text-[#FF5F05] font-black uppercase tracking-[0.4em] text-[8px] mb-2">Daily Inspiration</span>
            <h2 className="font-heading font-black text-xl sm:text-2xl md:text-4xl uppercase tracking-tighter mb-2 italic leading-none">
              Complimentary <span className="text-white/20 not-italic outline-text">Services</span>
            </h2>
            <p className="max-w-xl text-white/30 font-black uppercase tracking-widest text-[7px] md:text-[8px] mt-1">Elevating your experience with world-class amenities at no extra cost.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative h-[320px] overflow-hidden rounded-2xl border border-white/5"
            >
              <img src={service.img} alt={service.title} className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="w-10 h-10 bg-[#FF5F05] rounded-xl flex items-center justify-center mb-4 shadow-lg glow-orange">
                  <service.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading font-black text-xl uppercase italic mb-3 tracking-tighter transition-colors group-hover:text-[#FF5F05]">{service.title}</h3>
                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white/[0.03] border border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-5">
              <Zap className="w-32 h-32 text-white" />
           </div>
           <h3 className="text-xl font-heading font-black uppercase italic tracking-tighter mb-8 text-center flex items-center justify-center gap-3">
             <div className="h-[1px] w-10 bg-[#FF5F05]" />
             We Offer (Complimentary)
             <div className="h-[1px] w-10 bg-[#FF5F05]" />
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
              {complimentaryItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-white/50 group border-b border-white/5 pb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5F05] group-hover:scale-125 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-widest group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

const MapSection = () => {
  const openMap = () => window.open("https://maps.app.goo.gl/g5rUfutKiNGCDcNw6", "_blank");

  return (
    <section className="h-[250px] md:h-[300px] w-full bg-black relative border-y border-white/5 group cursor-pointer" onClick={openMap}>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.3262649069144!2d74.3414999!3d31.5150000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904535e69d959%3A0xe54e339d6b2b4fcc!2sRose%20Palace%20Gym%20(Gulberg)!5e0!3m2!1sen!2s!4v1714526000000!5m2!1sen!2s" 
        className="w-full h-full grayscale invert opacity-50 contrast-125 group-hover:opacity-70 transition-opacity"
        style={{ border: 0 }} 
        allowFullScreen={true} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,1)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3 text-center">
         <div className="bg-[#FF5F05] w-10 h-10 rounded-full flex items-center justify-center animate-bounce shadow-[0_0_30px_#FF5F05]">
           <MapPin className="text-black w-4 h-4" />
         </div>
         <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-3 rounded-lg">
           <h4 className="text-[#FF5F05] font-black text-[10px] uppercase tracking-widest italic group-hover:tracking-[0.2em] transition-all">Get Directions (Gulberg-II)</h4>
           <div className="flex items-center gap-1.5 justify-center mt-1 text-white/30 text-[7px] font-black">
             <span>OPEN IN GOOGLE MAPS</span>
             <ChevronRight className="w-2.5 h-2.5" />
           </div>
         </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });

  const handleFirestoreError = (error: unknown, operationType: string, path: string | null) => {
    const errInfo = {
      error: error instanceof Error ? error.message : String(error),
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    const path = 'contact_submissions';
    try {
      await addDoc(collection(db, path), {
        ...formData,
        createdAt: serverTimestamp()
      });

      setStatus({ type: 'success', message: 'Your request has been sent! We will contact you soon.' });
      setFormData({ name: "", mobile: "", email: "", message: "" });
    } catch (err: any) {
      console.error("Firebase error:", err);
      setStatus({ 
        type: 'error', 
        message: 'Something went wrong. Please check your Firebase configuration or try again.' 
      });
      // Optionally handle error reporting
      try {
        handleFirestoreError(err, 'create', path);
      } catch (logErr) {
        // Error already logged
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <span className="text-[#FF5F05] font-black uppercase tracking-[0.4em] text-[9px] block mb-3">Get in Touch</span>
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter italic mb-6 leading-none">
              Better yet, <br /> see us in <span className="text-[#FF5F05]">person!</span>
            </h2>
            <p className="text-white/40 font-black uppercase tracking-widest text-[9px] mb-10 leading-relaxed max-w-sm">
              We are open 24/7 so feel free to visit our state-of-the-art facility in Gulberg-II.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#FF5F05] transition-colors">
                  <MapPin className="w-4 h-4 text-[#FF5F05]" />
                </div>
                <div>
                  <h4 className="text-[#FF5F05] font-black uppercase tracking-widest text-[9px] mb-1">Location</h4>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest leading-loose">Rose Palace Gym (Gulberg), Gurumangat Road, Gulberg 2, Lahore, Pakistan</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#FF5F05] transition-colors">
                  <Phone className="w-4 h-4 text-[#FF5F05]" />
                </div>
                <div>
                  <h4 className="text-[#FF5F05] font-black uppercase tracking-widest text-[9px] mb-1">Call Now</h4>
                  <p className="text-white/60 text-xl font-heading font-black italic">+92 335 433 7172</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#FF5F05] transition-colors">
                  <Mail className="w-4 h-4 text-[#FF5F05]" />
                </div>
                <div>
                  <h4 className="text-[#FF5F05] font-black uppercase tracking-widest text-[9px] mb-1">Email</h4>
                  <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest">info@rosepalacegym.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-[#FF5F05]/5 blur-[60px]" />
            <div className="relative bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-[32px] glass-panel backdrop-blur-xl">
               <h3 className="text-2xl font-heading font-black uppercase tracking-tighter italic mb-8">Join Now <span className="text-[#FF5F05]">👇</span></h3>
               
               <form className="space-y-6" onSubmit={handleSubmit}>
                 <div className="space-y-1.5">
                   <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-4">Name*</label>
                   <input 
                     type="text" 
                     required
                     value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     placeholder="Your name" 
                     className="w-full bg-black/50 border border-white/5 rounded-xl px-5 py-4 text-xs font-bold placeholder:text-white/10 outline-none focus:border-[#FF5F05] transition-colors" 
                   />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-4">Mobile*</label>
                   <input 
                     type="text" 
                     required
                     value={formData.mobile}
                     onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                     placeholder="Your Cell Number" 
                     className="w-full bg-black/50 border border-white/5 rounded-xl px-5 py-4 text-xs font-bold placeholder:text-white/10 outline-none focus:border-[#FF5F05] transition-colors" 
                   />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-4">Email*</label>
                   <input 
                     type="email" 
                     required
                     value={formData.email}
                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                     placeholder="Your email address" 
                     className="w-full bg-black/50 border border-white/5 rounded-xl px-5 py-4 text-xs font-bold placeholder:text-white/10 outline-none focus:border-[#FF5F05] transition-colors" 
                   />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-4">Message*</label>
                   <textarea 
                     rows={3} 
                     required
                     value={formData.message}
                     onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                     placeholder="Enter your message" 
                     className="w-full bg-black/50 border border-white/5 rounded-xl px-5 py-4 text-xs font-bold placeholder:text-white/10 outline-none focus:border-[#FF5F05] transition-colors" 
                   />
                 </div>

                 {status.type && (
                   <div className={`p-3 rounded-lg text-[10px] font-black uppercase tracking-widest ${status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                     {status.message}
                   </div>
                 )}
                 
                 <button 
                   disabled={isSubmitting}
                   className="w-full bg-[#FF5F05] text-white py-4 rounded-xl font-black uppercase tracking-[0.3em] text-[10px] glow-orange hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(255,95,5,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {isSubmitting ? "Processing..." : "Submit Request"}
                 </button>
               </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="py-8 bg-[#FF5F05] overflow-hidden whitespace-nowrap -rotate-1 relative z-20 shadow-xl">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-16 items-center uppercase font-heading font-black text-2xl md:text-4xl text-white select-none"
      >
        <span>Yoga & Zumba</span>
        <span className="outline-text" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>Personal Training</span>
        <span>24/7 Access</span>
        <span>Gulberg II Lahore</span>
        <span className="outline-text" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>Spinning Studio</span>
        <span>Zero Joining Fee</span>
        <span>Elite Muscle Palace</span>
      </motion.div>
    </div>
  );
};

const FacilityCard = ({ title, img, index }: { title: string, img: string, index: number, key?: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative h-[280px] overflow-hidden rounded-xl cursor-pointer"
    >
      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      <div className="absolute bottom-0 left-0 p-6">
        <h4 className="text-xl font-heading font-black uppercase tracking-tighter italic">{title}</h4>
        <div className="flex items-center gap-1.5 mt-1.5 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
          <span className="text-[9px] font-black uppercase tracking-widest text-[#FF5F05]">View Facility</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#FF5F05]" />
        </div>
      </div>
    </motion.div>
  );
};

const Facilities = () => {
  const facilities = [
    { title: "Strength Zone", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" },
    { title: "Cardio Arena", img: "https://images.unsplash.com/photo-1571388208497-71bedc66e932?q=80&w=2072&auto=format&fit=crop" },
    { title: "Yoga Sanctuary", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920&auto=format&fit=crop" },
    { title: "Boxing Ring", img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop" },
  ];

  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-[#FF5F05] font-black uppercase tracking-[0.4em] text-[8px] block mb-2">State of the Art</span>
          <h2 className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tighter leading-none italic mb-4">
            The <span className="text-white/10 not-italic outline-text">Palace</span> Infrastructure
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {facilities.map((f, i) => <FacilityCard key={i} {...f} index={i} />)}
        </div>
      </div>
    </section>
  );
};

const VideoSection = () => {
  return (
    <section id="video-section" className="py-16 px-6 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-3xl aspect-video rounded-2xl md:rounded-[32px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(255,95,5,0.1)] mb-10 bg-[#111]"
        >
          <iframe 
            src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D1154010628911569&show_text=0&t=0" 
            className="w-full h-full"
            style={{ border: 'none', overflow: 'hidden' }} 
            scrolling="no" 
            frameBorder="0" 
            allowFullScreen={true} 
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
          <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-2xl md:rounded-[32px]" />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="relative flex flex-col items-center"
        >
          <div className="relative mb-6 flex flex-col items-center">
            <h2 className="text-[#EE0000] font-heading font-black text-3xl md:text-[5vw] uppercase tracking-tighter italic z-20 relative drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
              ROSE
            </h2>
            <h2 className="text-[#EE0000] font-heading font-black text-3xl md:text-[5vw] uppercase tracking-tighter italic -mt-[0.1em] md:-mt-[0.2em] opacity-40 z-10 scale-[1.1]">
              PALACE
            </h2>
          </div>
          <p className="max-w-2xl mx-auto text-white/50 font-black uppercase tracking-[0.2em] text-[9px] md:text-xs leading-loose">
            Welcome to the Rose Palace Gym, where fitness meets luxury. Our state-of-the-art facility is equipped with the latest fitness equipment to help you maintain your workout routine while away from home. Whether you prefer cardio, strength training, or a relaxing yoga session, our gym has everything you need to stay fit and healthy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#0A0A0A] border-t border-white/5 pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-[#FF5F05] rounded-full flex items-center justify-center">
                <Dumbbell className="text-black w-3.5 h-3.5" />
                </div>
                <span className="font-heading font-black text-lg tracking-tighter uppercase italic">
                Rose<span className="text-[#FF5F05]">Palace</span>
                </span>
            </div>
            <p className="text-white/30 text-[10px] mb-6 leading-relaxed font-medium uppercase tracking-widest">
              55-N, Gurumangat Road, <br />
              Gulberg-II, Lahore, Pakistan
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/rosepalacegym/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-4 h-4 text-white/40 hover:text-[#FF5F05] cursor-pointer transition-all" />
              </a>
              <a href="https://www.facebook.com/rosepalacegym/" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-4 h-4 text-white/40 hover:text-[#FF5F05] cursor-pointer transition-all" />
              </a>
              <Twitter className="w-4 h-4 text-white/40 hover:text-[#FF5F05] cursor-pointer transition-all" />
            </div>
          </div>
          
          <div>
            <h4 className="font-black uppercase tracking-widest text-[10px] mb-6 text-[#FF5F05]">Quick Links</h4>
            <ul className="space-y-3 text-white/40 text-[9px] font-bold uppercase tracking-widest">
              <li className="hover:text-[#FF5F05] cursor-pointer transition-colors">Experience</li>
              <li className="hover:text-[#FF5F05] cursor-pointer transition-colors">Class Schedule</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-[#FF5F05]">Contact Us</h4>
            <ul className="space-y-4 text-white/40 text-[11px] font-bold uppercase tracking-widest">
              <li className="flex items-center gap-3">
                <Phone className="w-3 h-3 text-[#FF5F05]" />
                <span>+92 335 433 7172</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-3 h-3 text-[#FF5F05]" />
                <span>Gulberg-II, Lahore</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-[#FF5F05]">Stay Elite</h4>
            <p className="text-white/30 text-[10px] mb-6 font-bold uppercase tracking-widest leading-relaxed">Join our private circle for pre-release nutrition tips.</p>
            <div className="flex border-b border-white/10 pb-2 group focus-within:border-[#FF5F05] transition-all">
              <input type="email" placeholder="YOUR EMAIL" className="bg-transparent border-none outline-none text-[10px] w-full font-black tracking-widest placeholder:text-white/10 text-white" />
              <ArrowRight className="w-4 h-4 text-[#FF5F05] cursor-pointer group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-white/10">
           <span>&copy; 2026 Rose Palace Gym. The Pinnacle of Fitness.</span>
           <div className="flex gap-8">
             <span className="hover:text-[#FF5F05] cursor-pointer">Terms</span>
             <span className="hover:text-[#FF5F05] cursor-pointer">Privacy</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="font-sans antialiased bg-[#0A0A0A] text-white selection:bg-[#FF5F05] selection:text-white">
      <Navbar />
      <Hero />
      <AboutUs />
      <Services />
      <GalleryGrid />
      <Facilities />
      <VideoSection />
      <MapSection />
      <Marquee />
      <ContactForm />
      <Footer />
    </main>
  );
}
