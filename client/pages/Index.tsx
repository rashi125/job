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
  <div className="min-h-screen w-full overflow-x-hidden bg-graypurple-200">

    {/* Full-width container (no max-width) */}
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">

      {/* Vertical layout */}
      <div className="flex flex-col gap-8 w-full">

        {/* Sidebar on top, full width */}
        <Sidenav user={user} />

        {/* Content takes entire screen width */}
        <div className="w-full space-y-12">
          <RoadmapSection />
          <JobFinderSection />
        </div>

      </div>
    </div>
  </div>
);

}
