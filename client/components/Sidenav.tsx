import React, { useEffect, useState } from "react";
import { signOut, User } from "firebase/auth";
import { auth, db } from "@/components/firebaseConfig";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface SidenavProps {
  user: User | null;
}

export const Sidenav: React.FC<SidenavProps> = ({ user }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;

    const userDoc = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userDoc, (snap) => {
      if (snap.exists()) {
        setProfile(snap.data());
      } else {
        setDoc(userDoc, {
          name: user.displayName || "",
          email: user.email || "",
          country: "",
          skills: [],
          jobs: [],
          achievements: [],
          projects: []
        });
      }
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-[440px] lg:w-[500px] bg-gradient-to-b from-indigo-500/20 via-purple-100/30 to-white/70 
        backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 hover:shadow-indigo-200/60 
        transition-all duration-300"
      >
        <div className="text-center mb-10">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="w-36 h-36 mx-auto mb-4 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full 
            flex items-center justify-center shadow-lg border-4 border-white/60"
          >
            <span className="text-6xl text-white">👤</span>
          </motion.div>

          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {profile?.name || "User"}
          </h2>
          <p className="text-sm text-gray-700">{profile?.email}</p>
          <p className="text-xs mt-1 text-gray-500">{profile?.country || "Not added"}</p>

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => setShowEdit(true)}
              className="py-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-xl transition 
              shadow-md hover:shadow-indigo-300/50"
            >
              ✏️ Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="py-2 w-full bg-red-500 hover:bg-red-600 text-white text-sm rounded-xl transition 
              shadow-md hover:shadow-red-300/50"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        <Section title="Skills">
          <BadgeList list={profile?.skills} color="indigo" />
        </Section>

        <Section title="Completed Jobs">
          <EmojiList list={profile?.jobs} emoji="✅" />
        </Section>

        <Section title="Achievements">
          <EmojiList list={profile?.achievements} emoji="🏅" />
        </Section>

        <Section title="Projects">
          <EmojiList list={profile?.projects} emoji="📌" />
        </Section>
      </motion.aside>

      {showEdit && (
        <EditProfileModal user={user} profile={profile} close={() => setShowEdit(false)} />
      )}
    </>
  );
};

// ----- Sub Components -----

const Section = ({ title, children }: any) => (
  <div className="mt-8 bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-sm hover:shadow-md transition">
    <h3 className="font-bold text-sm uppercase tracking-wide text-gray-600 mb-2">{title}</h3>
    {children}
  </div>
);

const BadgeList = ({ list, color }: any) => (
  <div className="flex flex-wrap gap-2">
    {(list || []).map((item: string, i: number) => (
      <span
        key={i}
        className={`px-3 py-1 bg-${color}-100 text-${color}-700 rounded-full border border-${color}-300 
        text-xs font-medium shadow-sm hover:shadow-md transition`}
      >
        {item}
      </span>
    ))}
  </div>
);

const EmojiList = ({ list, emoji }: any) => (
  <ul className="list-none space-y-1 text-sm text-gray-800">
    {(list || []).map((item: string, i: number) => (
      <li key={i} className="flex items-center gap-1">
        <span>{emoji}</span> {item}
      </li>
    ))}
  </ul>
);

function EditProfileModal({ user, profile, close }: any) {
  const [name, setName] = useState(profile?.name || "");
  const [country, setCountry] = useState(profile?.country || "");
  const [skills, setSkills] = useState((profile?.skills || []).join(", "));
  const [jobs, setJobs] = useState((profile?.jobs || []).join(", "));
  const [achievements, setAchievements] = useState((profile?.achievements || []).join(", "));
  const [projects, setProjects] = useState((profile?.projects || []).join(", "));

  const saveProfile = async () => {
    const userDoc = doc(db, "users", user.uid);
    await setDoc(
      userDoc,
      {
        name,
        country,
        skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        jobs: jobs.split(",").map((j) => j.trim()).filter(Boolean),
        achievements: achievements.split(",").map((a) => a.trim()).filter(Boolean),
        projects: projects.split(",").map((p) => p.trim()).filter(Boolean),
      },
      { merge: true }
    );
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-8 w-[440px]"
      >
        <h2 className="text-xl font-bold mb-5 text-gray-800 text-center">Edit Profile</h2>

        <div className="space-y-3">
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
          <input className="input" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
          <textarea className="input" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills (comma separated)" />
          <textarea className="input" value={jobs} onChange={(e) => setJobs(e.target.value)} placeholder="Completed Jobs (comma separated)" />
          <textarea className="input" value={achievements} onChange={(e) => setAchievements(e.target.value)} placeholder="Achievements (comma separated)" />
          <textarea className="input" value={projects} onChange={(e) => setProjects(e.target.value)} placeholder="Projects (comma separated)" />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={close} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
            Cancel
          </button>
          <button onClick={saveProfile} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
