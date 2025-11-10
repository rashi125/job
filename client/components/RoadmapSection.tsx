import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface RoadmapCard {
  title: string;
  description: string;
  icon: string;
  image: string;
  bgColor: string;
  path: string;
}

const roadmaps: RoadmapCard[] = [
  {
    title: "Android Development",
    description: "Build native apps for Android using Kotlin or Java.",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
    bgColor: "from-green-200 to-green-300",
    path: "/android",
  },
  {
    title: "Backend Development",
    description: "Design scalable APIs and databases.",
    icon: "🖥️",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&h=300&fit=crop",
    bgColor: "from-gray-200 to-gray-300",
    path: "/backend",
  },
  {
    title: "BI Analyst",
    description: "Turn data into actionable insights.",
    icon: "📊",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    bgColor: "from-blue-200 to-blue-300",
    path: "/bianalyst",
  },
  {
    title: "Blockchain Development",
    description: "Build decentralized applications and smart contracts.",
    icon: "⛓️",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=500&h=300&fit=crop",
    bgColor: "from-purple-200 to-indigo-300",
    path: "/blockchain",
  },
  {
    title: "CyberSecurity",
    description: "Protect systems and data from digital threats.",
    icon: "🔒",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=500&h=300&fit=crop",
    bgColor: "from-red-200 to-red-300",
    path: "/cybersecurity",
  },
  {
    title: "DevOps",
    description: "Automate deployments and manage infrastructure.",
    icon: "⚙️",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    bgColor: "from-orange-200 to-orange-300",
    path: "/devops",
  },
  {
    title: "Frontend Development",
    description: "Design interactive and responsive user interfaces.",
    icon: "🎨",
    image: "https://images.unsplash.com/photo-1542171649-7847adc966b1?w=500&h=300&fit=crop",
    bgColor: "from-pink-200 to-purple-300",
    path: "/frontend",
  },
  {
    title: "Full Stack Development",
    description: "Work on both frontend and backend of applications.",
    icon: "🌐",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&h=300&fit=crop",
    bgColor: "from-yellow-200 to-orange-300",
    path: "/fullstack",
  },
  {
    title: "Machine Learning",
    description: "Build predictive models and intelligent systems.",
    icon: "🤖",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop",
    bgColor: "from-cyan-200 to-blue-300",
    path: "/machinelearning",
  },
  {
    title: "Data Analyst",
    description: "Collect, process, and visualize data for insights.",
    icon: "📈",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=500&h=300&fit=crop",
    bgColor: "from-teal-200 to-teal-300",
    path: "/dataanalyst",
  },
];

export const RoadmapSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"roles" | "skills">("roles");
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="w-full py-12">
      <div className="max-w-[1400px] mx-auto px-4">
        <h2 className="font-serif font-bold text-3xl md:text-4xl text-sidebar-foreground mb-8">
          Roadmaps
        </h2>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-secondary mb-8">
          {["roles", "skills"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "roles" | "skills")}
              className={`pb-3 font-semibold text-lg transition-colors ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "text-sidebar-accent-foreground hover:text-sidebar-foreground"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="w-full flex-shrink-0">
          <Slider {...sliderSettings}>
            {roadmaps.map((roadmap, idx) => (
              <div key={idx} className="px-4">
                <div
                  onClick={() => navigate(roadmap.path)}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <div
                    className={`h-48 bg-gradient-to-br ${roadmap.bgColor} relative`}
                  >
                    <img
                      src={roadmap.image}
                      alt={roadmap.title}
                      className="w-full h-full object-cover opacity-70"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-lg text-sidebar-foreground mb-2">
                      {roadmap.icon} {roadmap.title}
                    </h3>
                    <p className="text-sm text-sidebar-accent-foreground leading-relaxed">
                      {roadmap.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
