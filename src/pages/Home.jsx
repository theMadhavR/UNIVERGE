import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Users, 
  Compass, 
  Award, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare,
  ChevronRight,
  Target
} from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      {/* Header/Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              UniVerge
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/auth"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/auth"
              className="relative group overflow-hidden px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-sm font-semibold transition-all duration-300 shadow-md shadow-blue-600/20 hover:shadow-blue-500/30"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Announcement Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full text-xs font-medium text-slate-300">
              <Sparkles className="h-4 w-4 text-blue-400 animate-pulse" />
              <span>Connecting First-gen Students with Alumni Mentors</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight"
            >
              Forge Connections that Shape{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Your Future
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants} 
              className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              UniVerge bridges the gap between first-generation college students and experienced alumni. Gain personalized career guidance, track secure milestones, and reach your full potential.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link
                to="/auth"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center group"
              >
                Join the Network
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-850 border border-slate-850 hover:border-slate-800 rounded-xl font-bold text-slate-300 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-900/30 border-y border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Why UniVerge?</h2>
            <p className="text-slate-400">Everything you need to successfully navigate your career journey, backed by the power of alumni connections.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                  <Compass className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">AI Career Pathfinder</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Tailored career path suggestions and custom skills roadmap aligned with your background and goals.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-all">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Intelligent Matching</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Connect with alumni sharing your hometown, major, regional background, or specific career goals.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-all">
                  <ShieldCheck className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Verified Milestones</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Secure milestones and verified achievements backend records to build a trustworthy professional presence.
                </p>
              </div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 bg-pink-500/10 border border-pink-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-500/20 transition-all">
                  <MessageSquare className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Real-time Messaging</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Dynamic chats and interactive meeting schedulers built in, letting you easily communicate with mentors.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Student vs Alumni Visual Cards */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Student Panel */}
          <div className="bg-gradient-to-br from-blue-950/40 via-blue-900/20 to-slate-950 border border-blue-900/50 p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-blue-500/10 blur-[80px]" />
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">For Students</span>
            <h3 className="text-3xl font-extrabold mt-2 mb-4">Kickstart Your Professional Path</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Find mentors who understand where you come from and can open doors to new career opportunities. Get support in crafting your career storyboard, setting milestones, and developing technical skills.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-slate-300">
              <li className="flex items-center"><Target className="h-4 w-4 mr-2 text-blue-400" /> Personalized recommendation cards</li>
              <li className="flex items-center"><Target className="h-4 w-4 mr-2 text-blue-400" /> 1-on-1 mentorship programs</li>
              <li className="flex items-center"><Target className="h-4 w-4 mr-2 text-blue-400" /> Interactive skill roadmaps</li>
            </ul>
            <Link 
              to="/auth" 
              className="inline-flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-colors"
            >
              Sign Up as Student <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Alumni Panel */}
          <div className="bg-gradient-to-br from-purple-950/40 via-purple-900/20 to-slate-950 border border-purple-900/50 p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-purple-500/10 blur-[80px]" />
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">For Alumni</span>
            <h3 className="text-3xl font-extrabold mt-2 mb-4">Give Back and Foster Talent</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Share your journey with students facing similar path challenges. Provide mock interviews, feedback on resume building, and guide first-gen students towards fulfilling jobs.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-slate-300">
              <li className="flex items-center"><Award className="h-4 w-4 mr-2 text-purple-400" /> Verifiable impact verification</li>
              <li className="flex items-center"><Award className="h-4 w-4 mr-2 text-purple-400" /> Network with other experienced alumni</li>
              <li className="flex items-center"><Award className="h-4 w-4 mr-2 text-purple-400" /> Digital mentor certificate</li>
            </ul>
            <Link 
              to="/auth" 
              className="inline-flex items-center text-purple-400 font-semibold group-hover:text-purple-300 transition-colors"
            >
              Join as Alumni Mentor <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 bg-slate-950/50 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} UniVerge Platform. All rights reserved.
          </p>
          <p className="text-xs text-slate-650">
            Empowering first-generation student networks with verified digital alumni mentoring.
          </p>
        </div>
      </footer>
    </div>
  );
}