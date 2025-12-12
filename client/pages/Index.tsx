// client/pages/Index.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/components/firebaseConfig";
import { Sidenav } from "@/components/Sidenav";
import { RoadmapSection } from "@/components/RoadmapSection";
import { JobFinderSection } from "@/components/JobFinderSection";

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        navigate("/login"); // redirect to login if not logged in
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium text-gray-100">
        Loading...
      </div>
    );
  }

  return (
   <div className="min-h-screen w-screen overflow-x-hidden bg-graypurple-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:transform lg:-translate-x-[110px]">

    {/* Layout changed here */}
    <div className="flex flex-col gap-8">

      {/* Sidebar on top */}
      <Sidenav user={user} />

      {/* Content below */}
      <div className="flex-1 space-y-12">
        <RoadmapSection />
        <JobFinderSection />
      </div>

    </div>
  </div>
</div>

  );
}
