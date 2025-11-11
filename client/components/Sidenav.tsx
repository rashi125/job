import React, { useEffect, useState } from "react";
import { signOut, User } from "firebase/auth";
import { auth, db } from "@/components/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface SidenavProps {
  user: User | null;
}

export const Sidenav: React.FC<SidenavProps> = ({ user }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      if (!user?.uid) return;

      const userDoc = doc(db, "users", user.uid);
      const snap = await getDoc(userDoc);
      if (snap.exists()) {
        setProfile(snap.data());
      }
    };
    getUserProfile();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-sidebar rounded-2xl p-6 shadow-md">

      {/* Profile */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-orange-300 to-orange-400 
                        rounded-full flex items-center justify-center shadow-lg">
          <span className="text-4xl">👤</span>
        </div>

        <h2 className="text-xl font-bold">
          {profile?.name || user?.displayName || "Guest User"}
        </h2>
        <p className="text-sm">{profile?.email || user?.email}</p>
        <p className="text-xs mt-1 text-gray-500">{profile?.country || "Unknown"}</p>

        {user && (
          <button onClick={handleLogout} className="mt-4 text-sm text-red-600 font-semibold hover:underline">
            Logout
          </button>
        )}
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h3 className="font-bold text-sm uppercase mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {(profile?.skills || []).map((skill: string) => (
            <span key={skill} className="text-xs bg-white bg-opacity-40 px-3 py-1 rounded-full font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Jobs */}
      <div className="mb-8">
        <h3 className="font-bold text-sm uppercase mb-3">Completed Jobs</h3>
        <div className="space-y-4">
          {(profile?.jobs || []).map((job: any, index: number) => (
            <div key={index}>
              <p className="text-sm font-semibold">{job.company}</p>
              <p className="text-xs text-gray-600">{job.desc}</p>
              <p className="text-xs font-medium mt-1">{job.year}</p>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
};
