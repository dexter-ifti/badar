import React, { useState, useEffect } from 'react';
import { Scale, GraduationCap, Trophy, Star, Sparkles, Gavel, BookOpen, Award, User, MessageCircle, Send, Heart } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setShowConfetti(true);
    }, 300);

    // Load messages from localStorage
    const savedMessages = localStorage.getItem('badar-congratulations');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    return () => clearTimeout(timer);
  }, []);

  const saveMessage = () => {
    if (!newMessage.trim() || !senderName.trim()) return;

    setIsSubmitting(true);
    
    const message: Message = {
      id: Date.now().toString(),
      name: senderName.trim(),
      message: newMessage.trim(),
      timestamp: Date.now()
    };

    const updatedMessages = [message, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('badar-congratulations', JSON.stringify(updatedMessages));
    
    setNewMessage('');
    setSenderName('');
    
    setTimeout(() => setIsSubmitting(false), 500);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const confettiPieces = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full animate-bounce opacity-80 ${
        showConfetti ? 'animate-pulse' : ''
      }`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
      }}
    />
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-40 w-20 h-20 border-2 border-blue-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-24 h-24 border-2 border-amber-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-20 w-28 h-28 border-2 border-blue-400 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {confettiPieces}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        
        {/* Header Icon */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-amber-400 to-orange-500 p-6 rounded-full shadow-2xl">
              <Scale className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div className={`text-center mb-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Congratulations!
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Photo and Name Section */}
        <div className={`text-center mb-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Photo Placeholder */}
          <div className="mb-6">
            <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 border-4 border-amber-400 shadow-2xl overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20"></div>
              <div className="flex items-center justify-center h-full">
                <img 
                  src="/badar.jpg" 
                  alt="Badar Iftikhar" 
                  className="w-full h-full object-cover"
                  
                />
                {/* <User className="w-16 h-16 md:w-20 md:h-20 text-amber-300" /> */}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2">
            Badar Iftikhar
          </h2>
          <div className="flex items-center justify-center gap-2 text-amber-300">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-lg font-medium">Esquire</span>
            <Star className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Achievement Message */}
        <div className={`text-center mb-12 max-w-2xl transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed mb-4">
            On your outstanding achievement of becoming a
          </p>
          <p className="text-2xl md:text-3xl font-bold text-white mb-4">
            Licensed Attorney at Law
          </p>
          <p className="text-lg text-blue-200 leading-relaxed">
            Your dedication, perseverance, and commitment to justice have brought you to this remarkable milestone. 
            May you serve with integrity and make a positive impact in the legal profession.
          </p>
        </div>

        {/* Achievement Icons */}
        <div className={`flex flex-wrap justify-center gap-8 mb-12 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="group flex flex-col items-center">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <span className="text-blue-200 text-sm mt-2 font-medium">Education</span>
          </div>
          
          <div className="group flex flex-col items-center">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-full shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
              <Gavel className="w-8 h-8 text-white" />
            </div>
            <span className="text-blue-200 text-sm mt-2 font-medium">Justice</span>
          </div>
          
          <div className="group flex flex-col items-center">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-full shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <span className="text-blue-200 text-sm mt-2 font-medium">Knowledge</span>
          </div>
          
          <div className="group flex flex-col items-center">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <span className="text-blue-200 text-sm mt-2 font-medium">Achievement</span>
          </div>
        </div>

        {/* Congratulations Message Box */}
        <div className={`w-full max-w-4xl mb-12 transform transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-6 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-semibold text-white">Leave Your Congratulations</h3>
                <Heart className="w-5 h-5 text-red-400 fill-current" />
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Message Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">Your Message</label>
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Write your congratulations message..."
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>
                  
                  <button
                    onClick={saveMessage}
                    disabled={!newMessage.trim() || !senderName.trim() || isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Congratulations
                      </>
                    )}
                  </button>
                </div>

                {/* Messages Display */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    Messages ({messages.length})
                  </h4>
                  
                  <div className="max-h-80 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                    {messages.length === 0 ? (
                      <div className="text-center py-8 text-slate-400">
                        <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Be the first to congratulate Badar!</p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div key={msg.id} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                          <div className="flex items-start justify-between mb-2">
                            <span className="font-medium text-amber-300">{msg.name}</span>
                            <span className="text-xs text-slate-400">{formatDate(msg.timestamp)}</span>
                          </div>
                          <p className="text-blue-100 text-sm leading-relaxed">{msg.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className={`text-center mb-12 max-w-3xl transform transition-all duration-1000 delay-1300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <blockquote className="text-lg md:text-xl text-blue-100 italic leading-relaxed border-l-4 border-amber-400 pl-6 bg-slate-800/30 backdrop-blur-sm rounded-r-lg p-6">
            "The good lawyer is not the man who has an eye to every side and angle of contingency, 
            but who throws himself on your part so heartily, that he can get you out of a scrape."
            <footer className="text-amber-300 mt-3 font-medium">— Ralph Waldo Emerson</footer>
          </blockquote>
        </div>

        {/* Call to Action */}
        <div className={`text-center transform transition-all duration-1000 delay-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 cursor-pointer inline-flex items-center gap-3">
            <Award className="w-6 h-6" />
            <span className="text-lg font-semibold">Welcome to the Bar!</span>
            <Sparkles className="w-6 h-6" />
          </div>
          
          <p className="text-blue-200 mt-4 text-sm">
            Wishing you success in all your future endeavors
          </p>
        </div>

        {/* Footer Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 animate-float">
          <div className="w-3 h-3 bg-amber-400 rounded-full opacity-70"></div>
        </div>
        <div className="absolute top-1/3 right-10 animate-float delay-1000">
          <div className="w-2 h-2 bg-blue-400 rounded-full opacity-70"></div>
        </div>
        <div className="absolute bottom-1/4 left-20 animate-float delay-2000">
          <div className="w-4 h-4 bg-orange-400 rounded-full opacity-70"></div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.7);
        }
      `}</style>
    </div>
  );
}

export default App;