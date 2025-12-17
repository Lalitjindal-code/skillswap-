import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Share2,
  MapPin,
  Calendar,
  Award,
  Star,
  Zap,
  ShieldCheck,
  Edit2,
  ExternalLink,
  Link as LinkIcon
} from 'lucide-react';
import { useGlobal } from '@/contexts/GlobalContext';
import { PageTransition } from '@/components/PageTransition';
import { toast } from 'sonner';

export default function Profile() {
  const { user } = useGlobal();
  const [isDownloading, setIsDownloading] = useState(false);

  // Generate a deterministic "hash" for a skill to simulate blockchain verification
  const getSkillHash = (skillName: string) => {
    let hash = 0;
    for (let i = 0; i < skillName?.length; i++) {
      hash = (hash << 5) - hash + skillName.charCodeAt(i);
      hash |= 0;
    }
    return `0x${Math.abs(hash).toString(16).padEnd(40, '0').substring(0, 10)}...`;
  };

  const handleDownloadCV = async () => {
    setIsDownloading(true);
    toast.loading("Compiling Blockchain Verifications...", { id: "cv-download" });

    // Simulate compilation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Map verified skills to string format
    const skillsList = user.verifiedSkills?.map(s => `- ${s.name} [Hash: ${s.hash || getSkillHash(s.name)}]`).join('\n') || "No verified skills yet.";

    const cvContent = `
SkillSync Verified Resume
-------------------------
Name: ${user.name}
Email: ${user.email}
Level: ${user.level} (${user.levelTitle})
Member Since: 2024

-------------------------
VERIFIED SKILLS (Blockchain Secured)
-------------------------
${skillsList}

-------------------------
IMPACT STATS
-------------------------
Time Coins Earned: ${user.coins}
Rating: 4.9/5

Certified by SkillSync Protocol
Values: Trust. Learn. Share.
    `.trim();

    try {
      const blob = new Blob([cvContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${user.name.replace(/\s+/g, '_')}_SkillSync_CV.txt`);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.dismiss("cv-download");
      toast.success("Verified CV Downloaded Successfully!");
    } catch (err) {
      console.error("Download failed", err);
      toast.error("Failed to download CV");
    } finally {
      setIsDownloading(false);
    }
  };

  // Use verifiedSkills from context, or fallback if empty for UI demo
  const displaySkills = user.verifiedSkills && user.verifiedSkills.length > 0
    ? user.verifiedSkills
    : [
      { name: "React", hash: getSkillHash("React") },
      { name: "TypeScript", hash: getSkillHash("TypeScript") },
      { name: "UI/UX", hash: getSkillHash("UI/UX") }
    ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

          {/* LEFT COLUMN: Sticky Profile Card */}
          <div className="w-full md:w-[350px] shrink-0 md:sticky md:top-24 h-fit space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 relative group"
            >
              {/* Holographic Header Background */}
              <div className="h-32 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 bg-repeat mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
              </div>

              {/* Avatar Container */}
              <div className="px-6 relative">
                <div className={`-mt-16 w-32 h-32 rounded-full p-1 ${user.level > 2 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-gradient-to-br from-blue-400 to-blue-600'} shadow-xl`}>
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                    alt={user.name}
                    className="w-full h-full rounded-full bg-black/50 border-4 border-black/50 object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-md text-xs px-2 py-0.5 rounded-full border border-white/10 text-white flex items-center gap-1">
                    lvl {user.level}
                  </div>
                </div>
              </div>

              {/* Identity Info */}
              <div className="p-6 pt-4 text-center md:text-left">
                <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
                <p className="text-primary font-medium text-sm mb-4 flex items-center justify-center md:justify-start gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Full Stack Developer
                </p>

                <div className="text-sm text-muted-foreground space-y-2 mb-6">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Global Remote</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Member since 2024</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadCV}
                    disabled={isDownloading}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary/80 to-purple/80 hover:from-primary hover:to-purple text-white font-medium shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all border border-white/10"
                  >
                    {isDownloading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    Download Verified CV
                  </motion.button>

                  <div className="flex gap-3">
                    <button className="flex-1 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit Profile
                    </button>
                    <button className="py-2.5 px-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-muted-foreground hover:text-white">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Content */}
          <div className="flex-1 space-y-6">

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Hours Taught", value: "32h", icon: Zap, color: "text-yellow-400" },
                { label: "Impact Score", value: "924", icon: Award, color: "text-purple-400" },
                { label: "Rating", value: "4.9/5", icon: Star, color: "text-green-400" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-4 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-colors cursor-default"
                >
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* About Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 rounded-3xl"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                About Me
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Passionate about sharing knowledge and growing together. I specialize in web development and love helping others master complex concepts. Always learning, always building.
              </p>
            </motion.div>

            {/* Verified Skills - The Blockchain Part */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-8 rounded-3xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Verified Skills
                </h3>
                <span className="text-xs py-1 px-3 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  Blockchain Secured
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {displaySkills.length > 0 ? (
                  displaySkills.map((skill, index) => (
                    <div key={index} className="group relative flex items-center gap-2 pl-4 pr-3 py-2 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
                      <span className="text-sm font-medium text-white">{skill.name}</span>

                      {/* Blockchain Link Trigger */}
                      <div className="relative">
                        <LinkIcon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors cursor-help" />

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-lg bg-black/90 border border-white/20 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                          <p className="font-mono text-primary mb-1">On-Chain Verification:</p>
                          <p className="font-mono break-all leading-tight">{skill.hash || getSkillHash(skill.name)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground italic">Complete onboarding to verify skills.</p>
                )}
              </div>
            </motion.div>

            {/* Activity Timeline Placeholder */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-8 rounded-3xl opacity-60"
            >
              <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div>
                    <p className="text-sm text-white">Joined the "React Masters" circle</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-purple mt-2 shrink-0" />
                  <div>
                    <p className="text-sm text-white">Earned "Early Adopter" Badge</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}
