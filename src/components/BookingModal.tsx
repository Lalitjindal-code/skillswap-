
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBook: (session: any) => void;
}

export const BookingModal = ({ isOpen, onClose, onBook }: BookingModalProps) => {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedMentor, setSelectedMentor] = useState('');

    const handleBook = () => {
        onBook({
            title: "New Session",
            mentor: selectedMentor,
            time: selectedTime,
            date: selectedDate
        });
        setStep(1);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Book a Session</h2>
                            <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Select Topic</label>
                                <select className="w-full p-3 rounded-xl bg-white/5 border border-white/10">
                                    <option>React Mentorship</option>
                                    <option>Python Basics</option>
                                    <option>UI Design Review</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Select Mentor</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Amit', 'Sarah', 'Raj', 'Jessica'].map(mentor => (
                                        <button
                                            key={mentor}
                                            onClick={() => setSelectedMentor(mentor)}
                                            className={`p-3 rounded-xl border text-left ${selectedMentor === mentor ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                        >
                                            {mentor}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Time</label>
                                    <input
                                        type="time"
                                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                disabled={!selectedMentor || !selectedDate || !selectedTime}
                                onClick={handleBook}
                                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold mt-4 disabled:opacity-50"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
