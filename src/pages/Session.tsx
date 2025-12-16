import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Pen,
  Eraser,
  Circle,
  Square,
  Trash2,
  Video,
  VideoOff,
  Mic,
  MicOff,
  MessageSquare,
  Send,
  ArrowLeft,
  Clock,
  Sparkles,
} from 'lucide-react';

const aiNotes = [
  "📝 Topic: Introduction to Physics",
  "💡 Key concept: Force = Mass × Acceleration",
  "⚡ Newton's First Law explained",
  "🔬 Real-world applications discussed",
  "📊 Example problem walkthrough",
  "✅ Summary: F=ma formula derivation",
  "🎯 Practice problems recommended",
  "📖 Additional reading suggested",
];

const chatMessages = [
  { sender: 'Amit', message: 'Welcome to the session!', time: '10:00' },
  { sender: 'You', message: 'Thanks! Excited to learn', time: '10:01' },
  { sender: 'Amit', message: "Let's start with basics", time: '10:02' },
];

export default function Session() {
  const { id } = useParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'circle' | 'square'>('pen');
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const [notes, setNotes] = useState<string[]>([]);
  const [noteIndex, setNoteIndex] = useState(0);
  const [messages, setMessages] = useState(chatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const notesContainerRef = useRef<HTMLDivElement>(null);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // AI Notes simulation
  useEffect(() => {
    if (noteIndex >= aiNotes.length) return;
    
    const interval = setInterval(() => {
      if (noteIndex < aiNotes.length) {
        setNotes(prev => [...prev, aiNotes[noteIndex]]);
        setNoteIndex(prev => prev + 1);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [noteIndex]);

  // Auto-scroll notes
  useEffect(() => {
    if (notesContainerRef.current) {
      notesContainerRef.current.scrollTop = notesContainerRef.current.scrollHeight;
    }
  }, [notes]);

  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPosition = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const pos = getPosition(e);
    setLastPos(pos);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    if (tool === 'circle') {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 30, 0, Math.PI * 2);
      ctx.strokeStyle = '#FACC15';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (tool === 'square') {
      ctx.strokeStyle = '#FACC15';
      ctx.lineWidth = 2;
      ctx.strokeRect(pos.x - 25, pos.y - 25, 50, 50);
    }
  }, [getPosition, tool]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool === 'circle' || tool === 'square') return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const pos = getPosition(e);

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === 'eraser' ? '#1e293b' : '#FACC15';
    ctx.lineWidth = tool === 'eraser' ? 20 : 2;
    ctx.lineCap = 'round';
    ctx.stroke();

    setLastPos(pos);
  }, [isDrawing, lastPos, getPosition, tool]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const sendMessage = useCallback(() => {
    if (!newMessage.trim()) return;
    
    setMessages(prev => [...prev, {
      sender: 'You',
      message: newMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }]);
    setNewMessage('');
  }, [newMessage]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-14 glass-panel border-b border-white/5 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold">Physics with Amit</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Recording Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium">REC</span>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="font-mono font-medium">{formatTime(time)}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Whiteboard */}
        <div className="flex-1 flex flex-col p-4">
          {/* Toolbar */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setTool('pen')}
              className={`p-3 rounded-xl transition-all ${
                tool === 'pen' ? 'bg-primary text-primary-foreground' : 'glass-card hover:bg-muted/50'
              }`}
            >
              <Pen className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`p-3 rounded-xl transition-all ${
                tool === 'eraser' ? 'bg-primary text-primary-foreground' : 'glass-card hover:bg-muted/50'
              }`}
            >
              <Eraser className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTool('circle')}
              className={`p-3 rounded-xl transition-all ${
                tool === 'circle' ? 'bg-primary text-primary-foreground' : 'glass-card hover:bg-muted/50'
              }`}
            >
              <Circle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTool('square')}
              className={`p-3 rounded-xl transition-all ${
                tool === 'square' ? 'bg-primary text-primary-foreground' : 'glass-card hover:bg-muted/50'
              }`}
            >
              <Square className="w-5 h-5" />
            </button>
            <button
              onClick={clearCanvas}
              className="p-3 rounded-xl glass-card hover:bg-accent/20 hover:text-accent transition-all ml-2"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Canvas */}
          <div className="flex-1 glass-card rounded-2xl overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 glass-panel border-l border-white/5 flex flex-col">
          {/* Video Section */}
          <div className="p-4 border-b border-white/5">
            <div className="aspect-video rounded-xl bg-muted/30 mb-2 overflow-hidden relative">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=amit"
                alt="Mentor"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-background/80 text-xs">
                Amit Sharma
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`p-3 rounded-xl transition-all ${
                  videoOn ? 'glass-card' : 'bg-accent text-accent-foreground'
                }`}
              >
                {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMicOn(!micOn)}
                className={`p-3 rounded-xl transition-all ${
                  micOn ? 'glass-card' : 'bg-accent text-accent-foreground'
                }`}
              >
                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* AI Notes */}
          <div className="flex-1 p-4 border-b border-white/5 flex flex-col min-h-0">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI Notes
            </h3>
            <div
              ref={notesContainerRef}
              className="flex-1 overflow-y-auto space-y-2 text-sm"
            >
              {notes.map((note, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-2 rounded-lg bg-muted/30"
                >
                  {note}
                </motion.div>
              ))}
              {notes.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  AI notes will appear here...
                </p>
              )}
            </div>
          </div>

          {/* Chat */}
          <div className="p-4 flex flex-col" style={{ height: '200px' }}>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-secondary" />
              Chat
            </h3>
            <div className="flex-1 overflow-y-auto space-y-2 mb-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm ${msg.sender === 'You' ? 'text-right' : ''}`}
                >
                  <span className="text-muted-foreground text-xs">{msg.sender} • {msg.time}</span>
                  <p className={`mt-0.5 px-3 py-1.5 rounded-lg inline-block ${
                    msg.sender === 'You' ? 'bg-primary text-primary-foreground' : 'bg-muted/50'
                  }`}>
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-lg bg-muted/50 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={sendMessage}
                className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
