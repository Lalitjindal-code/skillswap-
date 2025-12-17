import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Globe, CreditCard, LogOut, ChevronRight, Moon, Sun, Volume2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useGlobal } from '@/contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const settingsSections = [
  { id: 'account', icon: User, label: 'Account', description: 'Profile, email, password' },
  { id: 'notifications', icon: Bell, label: 'Notifications', description: 'Alerts and reminders' },
  { id: 'privacy', icon: Shield, label: 'Privacy & Security', description: 'Data and permissions' },
  { id: 'appearance', icon: Palette, label: 'Appearance', description: 'Theme and display' },
  { id: 'language', icon: Globe, label: 'Language', description: 'English (US)' },
  { id: 'billing', icon: CreditCard, label: 'Billing', description: 'Plan and payments' },
];

export default function Settings() {
  const { user, logout, updateProfile } = useGlobal();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('account');
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Edit Profile State
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSaveProfile = () => {
    updateProfile({ name, email });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Settings Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-4"
          >
            <div className="space-y-1">
              {settingsSections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeSection === section.id
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-secondary/10 card-text'
                    }`}
                >
                  <section.icon className="w-5 h-5" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">{section.label}</p>
                    <p className="text-xs card-muted">{section.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 card-muted" />
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          </motion.div>

          {/* Settings Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card p-6"
          >
            {activeSection === 'account' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold card-title">Account Settings</h2>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-teal flex items-center justify-center text-2xl font-bold text-white">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold card-title">{user.name || 'User'}</p>
                    <p className="text-sm card-muted">{user.email || 'user@example.com'}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="ml-auto px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium card-title mb-2">Display Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/5 border border-secondary/20 card-text focus:outline-none focus:border-primary disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium card-title mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/5 border border-secondary/20 card-text focus:outline-none focus:border-primary disabled:opacity-50"
                    />
                  </div>

                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex justify-end pt-2"
                    >
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-2 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
                      >
                        Save Changes
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold card-title">Notification Preferences</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/10">
                    <div>
                      <p className="font-medium card-title">Email Notifications</p>
                      <p className="text-sm card-muted">Receive session reminders via email</p>
                    </div>
                    <button
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`w-12 h-6 rounded-full transition-colors ${emailNotifications ? 'bg-primary' : 'bg-muted'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/10">
                    <div>
                      <p className="font-medium card-title">Push Notifications</p>
                      <p className="text-sm card-muted">Get alerts on your device</p>
                    </div>
                    <button
                      onClick={() => setPushNotifications(!pushNotifications)}
                      className={`w-12 h-6 rounded-full transition-colors ${pushNotifications ? 'bg-primary' : 'bg-muted'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${pushNotifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/10">
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 card-muted" />
                      <div>
                        <p className="font-medium card-title">Sound Effects</p>
                        <p className="text-sm card-muted">Play sounds for notifications</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={`w-12 h-6 rounded-full transition-colors ${soundEnabled ? 'bg-primary' : 'bg-muted'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold card-title">Appearance</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/10">
                    <div className="flex items-center gap-3">
                      {darkMode ? <Moon className="w-5 h-5 card-muted" /> : <Sun className="w-5 h-5 text-primary" />}
                      <div>
                        <p className="font-medium card-title">Dark Mode</p>
                        <p className="text-sm card-muted">Toggle dark theme</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-muted'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(activeSection === 'privacy' || activeSection === 'language' || activeSection === 'billing') && (
              <div className="text-center py-12">
                <p className="card-muted">Coming soon...</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
