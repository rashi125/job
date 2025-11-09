import React from "react";

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-full md:w-64 lg:w-72 bg-sidebar rounded-2xl p-6 md:p-8 shadow-md">
      {/* Profile Section */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-4xl">👩</span>
        </div>
        <h2 className="font-serif font-bold text-xl text-sidebar-foreground">
          Lakshya Ghangoriya
        </h2>
        <p className="text-sm text-sidebar-accent-foreground font-medium mt-1">
          Software Engineer
        </p>
        <p className="text-xs text-sidebar-accent-foreground mt-1">India</p>
      </div>

      {/* Skills Section */}
      <div className="mb-8">
        <h3 className="font-bold text-sm text-sidebar-foreground mb-3 uppercase tracking-tight">
          Skills
        </h3>
        <div className="space-y-2">
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs bg-white bg-opacity-40 text-sidebar-foreground px-3 py-1 rounded-full font-medium">
              Java
            </span>
            <span className="text-xs bg-white bg-opacity-40 text-sidebar-foreground px-3 py-1 rounded-full font-medium">
              JavaScript
            </span>
            <span className="text-xs bg-white bg-opacity-40 text-sidebar-foreground px-3 py-1 rounded-full font-medium">
              React
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs bg-white bg-opacity-40 text-sidebar-foreground px-3 py-1 rounded-full font-medium">
              Node.js
            </span>
            <span className="text-xs bg-white bg-opacity-40 text-sidebar-foreground px-3 py-1 rounded-full font-medium">
              UI/UX
            </span>
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
              Building seamless AI-powered communication tools for goods businesses
            </p>
            <p className="text-xs text-sidebar-accent-foreground font-medium mt-2">
              2021-2023
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
              2023-2025
            </p>
          </div>
        </div>
      </div>

      {/* Project Section */}
      <div className="mb-8">
        <h3 className="font-bold text-sm text-sidebar-foreground mb-3 uppercase tracking-tight">
          Project
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground">
              The Medical Website
            </p>
            <p className="text-xs text-sidebar-accent-foreground font-medium">
              2022
            </p>
          </div>
          <div className="border-t border-sidebar-border pt-3">
            <p className="text-sm font-semibold text-sidebar-foreground">
              Beacon For B2B
            </p>
            <p className="text-xs text-sidebar-accent-foreground font-medium">
              2024
            </p>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mb-8">
        <h3 className="font-bold text-sm text-sidebar-foreground mb-3 uppercase tracking-tight">
          Achievements:
        </h3>
        <p className="text-xs text-sidebar-accent-foreground">Published Articles.</p>
      </div>

      {/* Badges Section */}
      <div>
        <h3 className="font-bold text-sm text-sidebar-foreground mb-4 uppercase tracking-tight">
          Badges
        </h3>
        <div className="space-y-4">
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center border-2 border-white border-opacity-50"
              >
                <span className="text-xs">⭐</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={`medal-${i}`}
                className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center border-2 border-white border-opacity-50"
              >
                <span className="text-xs">🏅</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
