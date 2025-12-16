import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, User, Video, Plus } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';

const mockSessions = [
  { id: 1, date: new Date(2024, 11, 18), title: 'React Basics', mentor: 'Amit', time: '10:00 AM', duration: '1h' },
  { id: 2, date: new Date(2024, 11, 20), title: 'JavaScript Advanced', mentor: 'Priya', time: '2:00 PM', duration: '45m' },
  { id: 3, date: new Date(2024, 11, 22), title: 'CSS Grid Mastery', mentor: 'Rahul', time: '11:00 AM', duration: '1h' },
];

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const sessionsForDate = (date: Date) => 
    mockSessions.filter(session => isSameDay(session.date, date));

  const selectedSessions = selectedDate ? sessionsForDate(selectedDate) : [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
            <p className="text-muted-foreground">Manage your sessions and schedules</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            Schedule Session
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card p-6"
          >
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold card-title">{format(currentMonth, 'MMMM yyyy')}</h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="p-2 rounded-lg hover:bg-secondary/10 transition-colors card-text"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="p-2 rounded-lg hover:bg-secondary/10 transition-colors card-text"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium card-muted py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {days.map(day => {
                const hasSessions = sessionsForDate(day).length > 0;
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                      isToday(day) 
                        ? 'bg-secondary text-white font-bold' 
                        : isSelected 
                          ? 'bg-primary text-primary-foreground font-bold'
                          : 'hover:bg-secondary/10 card-text'
                    }`}
                  >
                    <span className="text-sm">{format(day, 'd')}</span>
                    {hasSessions && !isSelected && !isToday(day) && (
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Sessions for Selected Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-bold card-title mb-4">
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
            </h3>

            {selectedDate ? (
              selectedSessions.length > 0 ? (
                <div className="space-y-4">
                  {selectedSessions.map(session => (
                    <div key={session.id} className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                      <h4 className="font-semibold card-title">{session.title}</h4>
                      <div className="flex items-center gap-2 mt-2 card-muted text-sm">
                        <User className="w-4 h-4" />
                        <span>{session.mentor}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 card-muted text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{session.time} ({session.duration})</span>
                      </div>
                      <button className="w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                        <Video className="w-4 h-4" />
                        Join Session
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="card-muted">No sessions scheduled</p>
                  <button className="mt-4 px-4 py-2 rounded-lg bg-secondary/10 card-text hover:bg-secondary/20 transition-colors">
                    Book a Session
                  </button>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <p className="card-muted">Click on a date to see sessions</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
