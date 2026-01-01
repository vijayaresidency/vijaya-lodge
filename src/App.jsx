import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, MapPin, Coffee, Wifi, Car, 
  Wind, Utensils, ArrowRight, ChevronLeft, ChevronRight, 
  Instagram, Facebook, Twitter, Mail, Bus, Map, Star, 
  Music, Users, Monitor, Train, Landmark
} from 'lucide-react';

// --- CONFIGURATION ---
// Added 91 country code prefix for valid WhatsApp redirection
const WHATSAPP_NUMBER = "919787182223"; 
// Added 91 prefix for the secondary number in footer as well
const SECONDARY_NUMBER = "91637459007";
const GOOGLE_MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.572793617382!2d79.5296836748175!3d11.58245898861962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a54b3e05972825d%3A0x629555555555555!2sVijaya%20Lodge!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"; 

// --- DATA ---

const ABOUT_SLIDES = [
  { 
    title: "Legacy of Comfort", 
    text: "Establishing a tradition of hospitality, serving guests with warmth and care.",
    image: "/View1.jpg" 
  },
  { 
    title: "Nature's Lap", 
    text: "Located in the heart of the Vadalur biosphere, where nature meets luxury.",
    image: "/View2.jpg" 
  },
  { 
    title: "Nearby Connectivity", 
    text: "Major spiritual spots, transport hubs, dining options, and key town centers are all just minutes away.",
    image: "/View3.jpg" 
  }
];

const ROOMS_DATA = [
  {
    id: 'single-bed',
    name: 'Single Room',
    shortDesc: 'Compact and cozy comfort for solo travelers.',
    image: "/Room1.jpg", 
    description: 'Our single bed room is designed for efficiency and comfort. Perfect for solo travelers or business guests looking for a quiet, well-equipped space to rest.',
    features: ['Single Bed', 'Free WiFi', 'LED TV', '24/7 Service'],
    gallery: ["/Room1.jpg", "/View1.jpg"] 
  },
  {
    id: 'two-king',
    name: 'Double Bed Room',
    shortDesc: 'Spacious luxury with double the comfort.',
    image: "/Room2.jpg", 
    description: 'Experience royalty with our double King Size bedroom. Ideal for families who need extra space without compromising on luxury. Features premium linens and a spacious seating area.',
    features: ['2 King Beds', 'Nature View', 'Free Wifi', 'LED TV'],
    gallery: ["/Room2.jpg", "/Room5.jpg", "/View2.jpg"]
  },
  {
    id: 'two-queen',
    name: 'Presidential Suite',
    shortDesc: 'Perfect harmony of style and space.',
    image: "/Room3.jpg", 
    description: 'The perfect choice for friends or family. This room features two plush Queen beds and a modern interior design that blends comfort with functionality.',
    features: ['2 Queen Beds with 1 Single bed', 'Work desk', 'LED TV with Wifi', 'Air-conditioned'],
    gallery: ["/Room3.jpg", "/Room6.jpg", "/View3.jpg"]
  },
  {
    id: 'family-suite',
    name: 'Family Suite',
    shortDesc: 'The ultimate private escape for the family.',
    image: "/Room4.jpg", 
    description: 'Our signature Family Suite offers a home away from home. Includes a separate living area, multiple sleeping arrangements, and a private kitchenette for your convenience.',
    features: ['Queen size Beds', 'Work desk with Chair', 'LED TV with Wifi', 'Balcony'],
    gallery: ["/Room4.jpg", "/Room8.jpg", "/View1.jpg"]
  }
];

const GALLERY_IMAGES = [
  "/Room4.jpg",
  "/View4.jpg",
  "/Room3.jpg",
  "/Room6.jpg",
  "/View5.jpg",
  "/Banner1.jpg",
  "/Room5.jpg",
  "/Room2.jpg",
  "/Room1.jpg",
  "/View3.jpg",
  "/View2.jpg",
  "/View1.jpg",
  "/Room7.jpg",
  "/Room8.jpg"
];

const NEARBY_ATTRACTIONS = [
  { name: "Sathya Gnana Sabai", distance: "1.5 km away" },
  { name: "Neyveli Arch Gate", distance: "15 Minutes away" },
  { name: "Cuddalore City", distance: "40 Minutes away"}
];

// --- COMPONENTS ---

const WhatsAppButton = ({ text, message, className }) => {
  const handleClick = () => {
    // Uses the updated WHATSAPP_NUMBER with 91 prefix
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  return (
    <button onClick={handleClick} className={className}>
      {text}
    </button>
  );
};

const SectionReveal = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
      {children}
    </div>
  );
};

const Navbar = ({ navigate, currentPage, isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to handle navigation and close mobile menu
  const onNavClick = (page) => {
    navigate(page);
    setIsOpen(false);
  };

  const NavItem = ({ page, label }) => {
    const isActive = currentPage === page;
    const isHome = currentPage === 'home';
    
    // Dynamic classes based on state
    const baseClasses = "font-medium transition cursor-pointer";
    const activeClasses = isActive 
      ? (isScrolled || !isHome ? "text-[#6F4E37] font-bold border-b-2 border-[#6F4E37]" : "text-[#6F4E37] font-bold border-b-2 border-[#6F4E37]")
      : (isScrolled || !isHome ? "text-gray-700 hover:text-[#6F4E37]" : "text-[#6F4E37]/90 hover:text-[#6F4E37]");

    return (
      <button onClick={() => onNavClick(page)} className={`${baseClasses} ${activeClasses}`}>
        {label}
      </button>
    );
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || currentPage !== 'home' ? 'bg-[#F5F5DC] shadow-lg py-2' : 'bg-[#F5F5DC]/95 py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          onClick={() => onNavClick('home')} 
          className={`text-2xl font-serif font-bold cursor-pointer flex items-center gap-2 text-[#6F4E37]`}
        >
          <MapPin size={24} /> Vijaya Lodge
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <NavItem page="home" label="Home" />
          <NavItem page="rooms" label="Rooms" />
          <NavItem page="gallery" label="Gallery" />
          <NavItem page="partyhall" label="Party Hall" />
          <NavItem page="contact" label="Contact" />
          
          <WhatsAppButton 
            text="Book Now" 
            message="Hello! I want to book a stay at Vijaya Lodge." 
            className="bg-[#6F4E37] hover:bg-[#5a3e2b] text-white px-5 py-2 rounded-full font-bold shadow-md transition"
          />
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X className="text-[#6F4E37]" /> : <Menu className="text-[#6F4E37]" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#F5F5DC] absolute w-full shadow-xl border-t border-[#6F4E37]/20">
          <div className="flex flex-col p-4 space-y-4">
             <button onClick={() => onNavClick('home')} className="text-left font-medium text-gray-700 hover:text-[#6F4E37]">Home</button>
             <button onClick={() => onNavClick('rooms')} className="text-left font-medium text-gray-700 hover:text-[#6F4E37]">Rooms</button>
             <button onClick={() => onNavClick('gallery')} className="text-left font-medium text-gray-700 hover:text-[#6F4E37]">Gallery</button>
             <button onClick={() => onNavClick('partyhall')} className="text-left font-medium text-gray-700 hover:text-[#6F4E37]">Party Hall</button>
             <button onClick={() => onNavClick('contact')} className="text-left font-medium text-gray-700 hover:text-[#6F4E37]">Contact</button>
             <WhatsAppButton 
              text="Book Now via WhatsApp" 
              message="Hello! I want to book a stay at Vijaya Lodge." 
              className="bg-[#6F4E37] hover:bg-[#5a3e2b] text-white py-3 rounded-lg w-full font-bold"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

// --- SUB-COMPONENTS FOR REUSE ---

const HighlightItem = ({ icon: Icon, main, sub }) => (
  <div className="flex flex-col items-center min-w-[200px] mx-8">
      <Icon className="h-8 w-8 mb-2 text-[#F5F5DC]" />
      <span className="font-bold text-lg whitespace-nowrap">{main}</span>
      <span className="text-xs text-[#F5F5DC] whitespace-nowrap">{sub}</span>
  </div>
);

// --- PAGES ---

const HomePage = ({ navigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ABOUT_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* 1. HERO SECTION (UPDATED: BG COLOR ONLY, NO IMAGE) */}
      <div className="relative h-screen w-full overflow-hidden bg-[#F5F5DC] flex items-center justify-center text-center px-4">
        <div className="max-w-4xl animate-fade-in-up">
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-[#6F4E37] mb-6 drop-shadow-sm">
            Your Stay <br/> Made Comfortable!
          </h1>
          <p className="text-[#6F4E37]/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Simple, luxury and tidy spaces built for ease and convenience. Move around Vadalur effortlessly with major landmarks nearby.
          </p>
          <WhatsAppButton 
            text="Plan Your Stay" 
            message="Hello! I am interested in booking a stay at Vijaya Lodge."
            className="bg-[#6F4E37] hover:bg-[#5a3e2b] text-white text-lg px-8 py-4 rounded-full font-bold shadow-2xl transition transform hover:scale-105"
          />
        </div>
      </div>

      {/* 2. ATTRACTIVE HIGHLIGHTS (CONTINUOUS SCROLL) */}
      <div className="bg-[#6F4E37] text-white py-10 overflow-hidden relative">
        <div className="flex animate-marquee">
            {/* Duplicate items for seamless loop */}
            {[...Array(2)].map((_, i) => (
                <div key={i} className="flex shrink-0">
                    <HighlightItem icon={Bus} main="Price" sub="Affordable" />
                    <HighlightItem icon={Map} main="Iconic lake view" sub="Location" />
                    <HighlightItem icon={Wind} main="Non-AC" sub="Assured Ventilation" />
                    <HighlightItem icon={Wifi} main="Fast" sub="Fiber WiFi" />
                    <HighlightItem icon={Wind} main="AC" sub="Climate Control" />
                    <HighlightItem icon={Coffee} main="Events" sub="Open party Space" />
                    <HighlightItem icon={Utensils} main="Dining" sub="Nearby Restaurant" />
                </div>
            ))}
        </div>
      </div>

      {/* 3. ABOUT US */}
      <section className="py-20 bg-[#F5F5DC]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif font-bold text-[#6F4E37]">About Us</h2>
            <div className="h-1 w-20 bg-[#6F4E37] mx-auto mt-4"></div>
          </div>
          
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            {ABOUT_SLIDES.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#2C1B18]/80 flex items-center justify-center p-8 text-center">
                    <div className="max-w-2xl text-white">
                        <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">{slide.title}</h3>
                        <p className="text-lg md:text-xl leading-relaxed">{slide.text}</p>
                    </div>
                </div>
              </div>
            ))}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
                {ABOUT_SLIDES.map((_, idx) => (
                  <div key={idx} className={`h-3 w-3 rounded-full transition-all cursor-pointer ${idx === currentSlide ? 'bg-white scale-125' : 'bg-white/50'}`} onClick={() => setCurrentSlide(idx)}></div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. ROOMS SECTION (ON HOME PAGE) */}
      <section className="py-20 bg-[#F5F5DC]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#6F4E37]">Our Signature Stays</h2>
            <div className="h-1 w-20 bg-[#6F4E37] mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ROOMS_DATA.slice(0, 3).map((room) => (
              <SectionReveal key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
                <div className="relative overflow-hidden h-64">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                  {/* Price removed from image overlay */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 font-serif text-[#6F4E37]">{room.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{room.shortDesc}</p>
                  {/* Updated Navigation Logic */}
                  <button 
                    onClick={() => navigate('room-detail', room)}
                    className="w-full bg-[#6F4E37] hover:bg-[#5a3e2b] text-white font-bold py-2 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    View Details <ArrowRight size={16}/>
                  </button>
                </div>
              </SectionReveal>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => navigate('rooms')} className="inline-flex items-center gap-2 text-[#6F4E37] font-bold text-lg hover:underline">
                View All Rooms <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* NEW: LOCATION HIGHLIGHTS (IN & AROUND) */}
      <section className="py-20 bg-[#F5F5DC]">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-[#6F4E37]">In & Around GreenValley</h2>
                <div className="h-1 w-20 bg-[#6F4E37] mx-auto mt-4"></div>
                <p className="text-gray-600 mt-4">Strategically located landmarks for your convenience.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Vadalur Bus Stand */}
                <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                    <div className="bg-[#F5F5DC] p-3 rounded-full text-[#6F4E37]">
                        <Bus size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">Vadalur Bus Stand</h3>
                        <p className="text-[#6F4E37] font-medium">400 mts</p>
                    </div>
                </div>

                {/* Krishna Bavan Hotel */}
                <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                    <div className="bg-[#F5F5DC] p-3 rounded-full text-[#6F4E37]">
                        <Utensils size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">Krishna Bavan Hotel</h3>
                        <p className="text-[#6F4E37] font-medium">500 mts</p>
                    </div>
                </div>

                 {/* Vadalur Railway Station */}
                <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                    <div className="bg-[#F5F5DC] p-3 rounded-full text-[#6F4E37]">
                        <Train size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">Vadalur Railway Station</h3>
                        <p className="text-[#6F4E37] font-medium">1.4 kms</p>
                    </div>
                </div>

                {/* Sathya Gnana Sabai */}
                <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                    <div className="bg-[#F5F5DC] p-3 rounded-full text-[#6F4E37]">
                        <Landmark size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">Sathya Gnana Sabai</h3>
                        <p className="text-[#6F4E37] font-medium">1.5 kms</p>
                    </div>
                </div>

                 {/* Neyveli Arch Gate */}
                <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                    <div className="bg-[#F5F5DC] p-3 rounded-full text-[#6F4E37]">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">Neyveli Arch Gate</h3>
                        <p className="text-[#6F4E37] font-medium">15 Mins Drive</p>
                    </div>
                </div>

                 {/* Cuddalore City */}
                <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                    <div className="bg-[#F5F5DC] p-3 rounded-full text-[#6F4E37]">
                        <Car size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">Cuddalore City</h3>
                        <p className="text-[#6F4E37] font-medium">40 Mins Drive</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 5. GALLERY SECTION (ON HOME PAGE) */}
      <section className="py-20 bg-[#F5F5DC]">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-[#6F4E37]">Gallery</h2>
                <div className="h-1 w-20 bg-[#6F4E37] mx-auto mt-4"></div>
            </div>
            <div className="columns-1 md:columns-3 gap-4 space-y-4">
                {GALLERY_IMAGES.slice(0, 3).map((src, idx) => (
                    <SectionReveal key={idx} className="break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
                        <img src={src} alt="Gallery" className="w-full object-cover hover:scale-105 transition duration-500" />
                    </SectionReveal>
                ))}
            </div>
            <div className="text-center mt-12">
                <button onClick={() => navigate('gallery')} className="inline-flex items-center gap-2 text-[#6F4E37] font-bold text-lg hover:underline">
                    View Full Gallery <ArrowRight size={20} />
                </button>
            </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION (ON HOME PAGE) */}
      <section className="py-20 bg-[#F5F5DC]">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
             <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
                <p className="mb-6 text-gray-600">Have questions? We are always here to help you plan your perfect stay.</p>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-white p-3 rounded-full text-[#6F4E37] shadow-sm"><MapPin size={24}/></div>
                        <div>
                            <h4 className="font-bold">Address</h4>
                            <p className="text-gray-600">1st floor, Uma complex, Cuddalore main road, Vadalur. Near Selliyamman kovil, Vaara sandhai</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white p-3 rounded-full text-[#6F4E37] shadow-sm"><Phone size={24}/></div>
                        <div>
                            <h4 className="font-bold">Phone</h4>
                            {/* Updated 91 prefix */}
                            <p className="text-gray-600 cursor-pointer" onClick={() => window.open(`tel:${WHATSAPP_NUMBER}`)}>+91 9787182223</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                      <button onClick={() => navigate('contact')} className="text-[#6F4E37] font-bold flex items-center gap-2 hover:underline">
                        Visit Contact Page <ArrowRight size={18}/>
                      </button>
                </div>
             </div>
             <div className="h-80 rounded-xl overflow-hidden shadow-lg">
                <iframe src={GOOGLE_MAP_EMBED_URL} width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
             </div>
        </div>
      </section>
    </>
  );
};

const RoomsPage = ({ navigate }) => {
  return (
    <div className="pt-24 bg-[#F5F5DC] min-h-screen">
      <div className="container mx-auto px-6 py-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#6F4E37]">Our Signature Stays</h2>
          <p className="text-gray-600 mt-4">Choose from our variety of luxurious rooms tailored for your comfort.</p>
          <div className="h-1 w-20 bg-[#6F4E37] mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {ROOMS_DATA.map((room) => (
            <SectionReveal key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
              <div className="relative overflow-hidden h-64">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                {/* Price removed from image overlay */}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 font-serif text-[#6F4E37]">{room.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{room.shortDesc}</p>
                {/* Updated Navigation Logic */}
                <button 
                  onClick={() => navigate('room-detail', room)}
                  className="w-full bg-[#6F4E37] hover:bg-[#5a3e2b] text-white font-bold py-2 rounded-lg transition flex items-center justify-center gap-2"
                >
                  View Details <ArrowRight size={16}/>
                </button>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  return (
    <div className="pt-24 bg-[#F5F5DC] min-h-screen">
      <div className="container mx-auto px-6 py-10">
          <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-[#6F4E37]">Gallery</h2>
              <p className="text-gray-600 mt-4">A glimpse into the serenity that awaits you.</p>
              <div className="h-1 w-20 bg-[#6F4E37] mx-auto mt-4"></div>
          </div>
          <div className="columns-1 md:columns-3 gap-4 space-y-4">
              {GALLERY_IMAGES.map((src, idx) => (
                  <SectionReveal key={idx} className="break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
                      <img src={src} alt="Gallery" className="w-full object-cover hover:scale-105 transition duration-500" />
                  </SectionReveal>
              ))}
          </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
  };

  return (
    <div className="pt-20 bg-[#F5F5DC] min-h-screen pb-20">
      {/* 1. Get In Touch Banner */}
      <div className="bg-[#2C1B18] text-white py-16 text-center">
        <h1 className="text-4xl font-serif font-bold">Get In Touch</h1>
        <p className="mt-2 text-[#F5F5DC]">We are here to help you plan your perfect getaway.</p>
      </div>

      <div className="container mx-auto px-6">
        {/* 2. Explore Nearby Section */}
        <div className="py-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Explore Nearby</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {NEARBY_ATTRACTIONS.map((spot, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#6F4E37]">
                <h3 className="font-bold text-lg mb-1">{spot.name}</h3>
                <p className="text-sm text-[#6F4E37] font-semibold mb-2">{spot.distance}</p>
                
              </div>
            ))}
          </div>
        </div>

        {/* 3. Main Content: Location & Review Form */}
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Left Column: Location */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Location</h2>
            
            {/* Map Placeholder */}
            <div className="h-64 rounded-xl overflow-hidden shadow-lg bg-gray-200">
              <iframe src={GOOGLE_MAP_EMBED_URL} width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
            </div>

            {/* Address & Phone Details */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full text-[#6F4E37] mt-1 shadow-sm"><MapPin size={24}/></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Address</h4>
                    <p className="text-gray-600">1st floor, Uma complex, Cuddalore main road, Vadalur. Near Selliyamman kovil, Vaara sandhai</p>
                  </div>
              </div>
              <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full text-[#6F4E37] mt-1 shadow-sm"><Phone size={24}/></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Phone</h4>
                    {/* Updated 91 prefix */}
                    <p className="text-gray-600">+91 9787182223</p>
                  </div>
              </div>
            </div>
          </div>

          {/* Right Column: Review Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Leave a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6F4E37]" placeholder="Your Name" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
                <div className="flex space-x-1">
                  {[1,2,3,4,5].map((star) => (
                    <button type="button" key={star} onClick={() => setRating(star)} className="focus:outline-none">
                      <Star className={`h-8 w-8 transition ${star <= rating ? 'fill-[#6F4E37] text-[#6F4E37]' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Review</label>
                <textarea className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-[#6F4E37]" placeholder="Tell us about your stay..."></textarea>
              </div>

              <button type="submit" className="w-full bg-[#6F4E37] hover:bg-[#5a3e2b] text-white font-bold py-3 rounded-lg transition">
                Submit Feedback
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

const RoomDetailPage = ({ room, navigate }) => {
  if (!room) return <div className="pt-32 text-center">Room not found</div>;

  return (
    <div className="pt-20 bg-white min-h-screen animate-fade-in">
      <div className="relative h-[50vh] w-full">
        <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="container mx-auto px-6 pb-12 text-white">
            {/* Navigation back using history logic */}
            <button onClick={() => navigate('rooms')} className="mb-4 flex items-center text-gray-300 hover:text-white transition">
              <ChevronLeft size={20}/> Back to Rooms
            </button>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-2">{room.name}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <SectionReveal>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Experience the Stay</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {room.description}
              </p>
            </SectionReveal>

            <SectionReveal className="mb-12">
              <h3 className="text-xl font-bold mb-4">Room Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {room.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-[#F5F5DC] rounded-lg border border-[#6F4E37]/20">
                    <div className="h-2 w-2 bg-[#6F4E37] rounded-full"></div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>

            {/* --- NEW SECTION: ROOM GALLERY --- */}
            <SectionReveal className="mb-12">
              <h3 className="text-xl font-bold mb-6">Room Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {room.gallery && room.gallery.map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden shadow-md h-48 group">
                    <img 
                      src={img} 
                      alt={`${room.name} View ${idx + 1}`} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" 
                    />
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>

          <div className="md:col-span-1">
            <div className="bg-[#F5F5DC] p-6 rounded-2xl shadow-2xl border border-[#6F4E37]/10 sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-center text-[#6F4E37]">Reserve This Room</h3>
              <div className="bg-white p-4 rounded-lg text-sm text-[#6F4E37] mb-4">
                <strong className="block mb-1">Best Rate Guarantee</strong>
                Book directly via WhatsApp for exclusive discounts.
              </div>
              <WhatsAppButton 
                text={`Book ${room.name}`}
                message={`Hi, I'm interested in booking the ${room.name}. Please provide availability.`}
                className="w-full bg-[#6F4E37] hover:bg-[#5a3e2b] text-white py-3 rounded-lg font-bold shadow-lg transition"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PartyHallPage = () => {
  // Use specific images for the party hall if you have them, otherwise reuse some views
  const hallImages = ["/View4.jpg", "/View5.jpg", "/Banner1.jpg"];

  return (
    <div className="pt-20 bg-[#F5F5DC] min-h-screen">
      <div className="bg-gray-900 text-white py-24 text-center relative overflow-hidden">
         {/* Background Image for Header */}
         <img src="/View5.jpg" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Hall" />
         <div className="relative z-10 container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Open Party Space</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">The perfect venue for weddings, corporate events, and family gatherings. Where every moment becomes a cherished memory.</p>
         </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <SectionReveal>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Our Hall?</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our Open party Space is designed to host up to 100 guests comfortably. With customizable layouts, state-of-the-art audiovisual equipment, and a dedicated team to manage your event, we ensure flawless execution.
            </p>
            
            <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full text-[#6F4E37] shadow-sm"><Users size={20}/></div>
                    <div>
                        <h4 className="font-bold text-gray-900">Capacity</h4>
                        <p className="text-gray-600 text-sm">Seating for up to 100 guests.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full text-[#6F4E37] shadow-sm"><Music size={20}/></div>
                    <div>
                        <h4 className="font-bold text-gray-900">Audio/Visual</h4>
                        <p className="text-gray-600 text-sm">Premium sound system & projector.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full text-[#6F4E37] shadow-sm"><Wind size={20}/></div>
                    <div>
                        <h4 className="font-bold text-gray-900">Comfort</h4>
                        <p className="text-gray-600 text-sm">Fully centralized air-conditioning.</p>
                    </div>
                </div>
            </div>

            <WhatsAppButton 
              text="Inquire for Availability" 
              message="Hello! I would like to inquire about booking the Party Hall for an event."
              className="bg-[#6F4E37] hover:bg-[#5a3e2b] text-white px-8 py-3 rounded-full font-bold transition shadow-lg"
            />
          </SectionReveal>

          {/* Hall Gallery Grid */}
          <div className="grid grid-cols-1 gap-4">
             <div className="rounded-2xl overflow-hidden h-64 shadow-lg">
                <img src={hallImages[0]} className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Hall Main View"/>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden h-40 shadow-lg">
                    <img src={hallImages[1]} className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Hall Detail"/>
                </div>
                <div className="rounded-2xl overflow-hidden h-40 shadow-lg">
                    <img src={hallImages[2]} className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Hall Setup"/>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-[#2C1B18] text-gray-300 py-16 border-t border-[#6F4E37]/30">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Column 1: Brand */}
        <div>
          <h3 className="text-white text-2xl font-serif font-bold mb-6">Vijaya Lodge</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Luxury in the lap of nature. Your perfect escape awaits.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-[#F5F5DC] transition">About Us</a></li>
            <li><a href="#" className="hover:text-[#F5F5DC] transition">Rooms</a></li>
            <li><a href="#" className="hover:text-[#F5F5DC] transition">Gallery</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h4 className="text-white font-bold mb-6">Contact</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            {/* Added 91 prefix to display as well */}
            <li className="flex items-center gap-2"><Phone size={16}/> +91 9787182223</li>
            <li className="flex items-center gap-2"><Phone size={16}/> +91 637459007</li>
            <li className="flex items-center gap-2"><Mail size={16}/> vijayarecidency1213@gmail.com</li>
            <li className="flex items-center gap-2"><MapPin size={16}/> 1st floor, Uma complex, Cuddalore main road, Vadalur.<br />Near Selliyamman kovil, Vaara sandhai</li>
          </ul>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="border-t border-[#6F4E37]/30 pt-8 text-center text-xs text-gray-500">
        &copy; 2025 Vijaya Lodge. All rights reserved.
      </div>
    </div>
  </footer>
);

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- ADDED HISTORY MANAGEMENT FOR BACK BUTTON ---
  useEffect(() => {
    // Initial state replacement to ensure we have a state to pop back to
    window.history.replaceState({ page: 'home' }, '', '');

    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
        if (event.state.room) {
          setSelectedRoom(event.state.room);
        }
      } else {
        // Fallback to home if no state
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation Wrapper to push history state
  const navigate = (page, room = null) => {
    setCurrentPage(page);
    if (room) setSelectedRoom(room);
    
    // Push state so back button works
    window.history.pushState({ page, room }, '', '');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="font-sans antialiased text-gray-800">
      <Navbar navigate={navigate} currentPage={currentPage} isScrolled={isScrolled} />
      <main className="min-h-screen">
        {currentPage === 'home' && <HomePage navigate={navigate} setSelectedRoom={setSelectedRoom} />}
        {currentPage === 'rooms' && <RoomsPage navigate={navigate} setSelectedRoom={setSelectedRoom} />}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'room-detail' && <RoomDetailPage room={selectedRoom} navigate={navigate} />}
        {currentPage === 'partyhall' && <PartyHallPage />}
      </main>
      <Footer />
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 40px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;