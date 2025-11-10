import React from "react";
import { signOut, User } from "firebase/auth";
import { auth } from "@/components/firebaseConfig";
import { useNavigate } from "react-router-dom";

interface SidenavProps {
  user: User | null;
}

export const Sidenav: React.FC<SidenavProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-sidebar rounded-2xl p-6 md:p-8 shadow-md">
      {/* Profile Section */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-4xl">👤</span>
        </div>
        <h2 className="font-serif font-bold text-xl text-sidebar-foreground">
          {user?.displayName || "Guest User"}
        </h2>
        {user?.email && (
          <p className="text-sm text-sidebar-accent-foreground font-medium mt-1">
            {user.email}
          </p>
        )}
        <p className="text-xs text-sidebar-accent-foreground mt-1">India</p>

        {/* Logout Button */}
        {user && (
          <button
            onClick={handleLogout}
            className="mt-4 text-sm text-red-600 font-semibold hover:underline"
          >
            Logout
          </button>
        )}
      </div>

      {/* Skills Section */}
      <div className="mb-8">
        <h3 className="font-bold text-sm text-sidebar-foreground mb-3 uppercase tracking-tight">
          Skills
        </h3>
        <div className="space-y-2">
          <div className="flex gap-2 flex-wrap">
            {["Java", "JavaScript", "React"].map((skill) => (
              <span
                key={skill}
                className="text-xs bg-white bg-opacity-40 text-sidebar-foreground px-3 py-1 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Node.js", "UI/UX"].map((skill) => (
              <span
                key={skill}
                className="text-xs bg-white bg-opacity-40 text-sidebar-foreground px-3 py-1 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Completed Jobs Section */}
      <div className="mb-8">
        <h3 className="font-bold text-sm text-sidebar-foreground mb-3 uppercase tracking-tight">
          Completed Jobs
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground">
              NowLink Technologies
            </p>
            <p className="text-xs text-sidebar-accent-foreground mt-1 leading-relaxed">
              Building seamless AI-powered communication tools for business.
            </p>
            <p className="text-xs text-sidebar-accent-foreground font-medium mt-2">
              2021–2023
            </p>
          </div>
          <div className="border-t border-sidebar-border pt-4">
            <p className="text-sm font-semibold text-sidebar-foreground">
              EcoSphere Labs
            </p>
            <p className="text-xs text-sidebar-accent-foreground mt-1 leading-relaxed">
              Developing sustainable solutions for waste and water management.
            </p>
            <p className="text-xs text-sidebar-accent-foreground font-medium mt-2">
              2023–2025
            </p>
          </div>
        </div>
      </div>

      {/* Project Section */}
      <div className="mb-8">
        <h3 className="font-bold text-sm text-sidebar-foreground mb-3 uppercase tracking-tight">
          Projects
        </h3>
        <div className="space-y-3">
          {[
            { title: "The Medical Website", year: "2022" },
            { title: "Beacon For B2B", year: "2024" },
          ].map((project, index) => (
            <div
              key={project.title}
              className={index > 0 ? "border-t border-sidebar-border pt-3" : ""}
            >
              <p className="text-sm font-semibold text-sidebar-foreground">
                {project.title}
              </p>
              <p className="text-xs text-sidebar-accent-foreground font-medium">
                {project.year}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mb-8">
        <h3 className="font-bold text-sm text-sidebar-foreground mb-3 uppercase tracking-tight">
          Achievements
        </h3>
        <p className="text-xs text-sidebar-accent-foreground">
          Published articles and open-source contributions.
        </p>
      </div>

      {/* Badges Section */}
      <div>
        <h3 className="font-bold text-sm text-sidebar-foreground mb-4 uppercase tracking-tight">
          Badges
        </h3>
        <div className="space-y-4">
          {[["⭐", 5], ["🏅", 5]].map(([icon, count], idx) => (
            <div key={idx} className="flex gap-2 justify-center">
              {Array.from({ length: count as number }).map((_, i) => (
                <div
                  key={`${icon}-${i}`}
                  className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center border-2 border-white border-opacity-50"
                >
                  <span className="text-xs">{icon}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
