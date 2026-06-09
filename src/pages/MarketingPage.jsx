import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import {
  Users, IndianRupee, CalendarCheck, Bell, Clock,
  ArrowRight, Menu, X, Star, MessageSquare,
  GraduationCap, Building2, CheckCircle, BarChart3,
  Shield, Zap, Calendar, ClipboardList, CreditCard,
  BookOpen, Trophy, MapPin, Smartphone, Monitor,
  ChevronRight, Play, TrendingUp, FileText, Settings,
  UserCheck, AlertCircle, Wallet,
} from 'lucide-react';

// ── Aceternity UI components ──────────────────────────────────────────────────
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import { MacbookScroll }   from '../components/ui/macbook-scroll';
import { MaskContainer }   from '../components/ui/svg-mask-effect';
import { PinContainer }    from '../components/ui/3d-pin';
import { LayeredStack }    from '../components/ui/layered-stack';

// ── Standalone — CTA buttons scroll to #pricing ───────────────────────────────
function Link({ children, className, onClick }) {
  function handleClick(e) {
    e.preventDefault();
    if (onClick) onClick(e);
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
  return <a href="#pricing" className={className} onClick={handleClick}>{children}</a>;
}

// ── Scroll-reveal wrapper ─────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
}

// ── FadeIn left/right ─────────────────────────────────────────────────────────
function FadeIn({ children, from = 'left', delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from === 'left' ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
}

// ── Magnetic button — Emil spring physics ─────────────────────────────────────
function MagneticButton({ children }) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 18, mass: 0.08 });
  const y = useSpring(rawY, { stiffness: 200, damping: 18, mass: 0.08 });

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width  / 2)) * 0.28);
    rawY.set((e.clientY - (r.top  + r.height / 2)) * 0.28);
  }
  function onLeave() { rawX.set(0); rawY.set(0); }

  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave}
      className="inline-block">
      {children}
    </motion.div>
  );
}

// ── Phone mockup frame ────────────────────────────────────────────────────────
function PhoneMockup({ children, accent = '#0071E3' }) {
  return (
    <div className="relative mx-auto select-none" style={{ width: 248, height: 508 }}>
      <div className="absolute inset-0 rounded-[44px]"
           style={{
             background: '#1A1A1A',
             boxShadow: `0 50px 100px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)`
           }}>
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-24 w-[3px] h-8 bg-[#333] rounded-l-sm" />
        <div className="absolute -left-[3px] top-36 w-[3px] h-12 bg-[#333] rounded-l-sm" />
        <div className="absolute -left-[3px] top-52 w-[3px] h-12 bg-[#333] rounded-l-sm" />
        <div className="absolute -right-[3px] top-32 w-[3px] h-16 bg-[#333] rounded-r-sm" />
        {/* Notch pill */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black rounded-full px-4 py-1.5 z-20">
          <div className="w-[5px] h-[5px] rounded-full bg-[#333]" />
          <div className="w-14 h-1.5 bg-[#1A1A1A] rounded-full" />
          <div className="w-3 h-3 rounded-full border border-[#333]" />
        </div>
        {/* Screen */}
        <div className="absolute inset-[3px] rounded-[41px] overflow-hidden bg-white">
          {children}
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/20 rounded-full" />
      </div>
    </div>
  );
}

// ── Admin Dashboard mockup ────────────────────────────────────────────────────
function DashboardMockup({ compact = false }) {
  const statItems = [
    { label: 'Students', value: '212',       color: 'bg-blue-500',  Icon: Users        },
    { label: 'Collected',value: '₹44.6K',    color: 'bg-green-500', Icon: IndianRupee  },
    { label: 'Pending',  value: '₹1.01 Cr',  color: 'bg-amber-500', Icon: Clock        },
    { label: 'Present',  value: '198',        color: 'bg-teal-500',  Icon: CalendarCheck},
  ];
  const bars = [
    { month: 'Jan', h: 45 }, { month: 'Feb', h: 68 }, { month: 'Mar', h: 55 },
    { month: 'Apr', h: 80 }, { month: 'May', h: 62 }, { month: 'Jun', h: 90 },
  ];
  const payments = [
    { name: 'Arjun K.',  amount: '₹4,800', status: 'paid'    },
    { name: 'Priya R.',  amount: '₹3,200', status: 'paid'    },
    { name: 'Ravi S.',   amount: '₹2,400', status: 'pending' },
    { name: 'Anita M.',  amount: '₹1,800', status: 'paid'    },
  ];
  return (
    <div className="select-none w-full h-full">
      <div className="rounded-[16px] overflow-hidden h-full"
           style={{ boxShadow: compact ? 'none' : '0 48px 120px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.06)' }}>
        <div className="h-9 bg-[#EBEBEB] flex items-center px-4 gap-3 border-b border-black/[0.07]">
          <div className="flex gap-[5px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-52 h-5 bg-white rounded-[5px] border border-black/10 flex items-center justify-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[8px] text-gray-400 font-medium">app.edufee.in/dashboard</span>
            </div>
          </div>
        </div>
        <div className="flex bg-[#F2F4F7]" style={{ height: compact ? 'calc(100% - 36px)' : '400px' }}>
          <div className="w-[160px] bg-[#0D0D18] flex flex-col py-3 px-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-2 pb-3 mb-2 border-b border-white/[0.07]">
              <div className="w-5 h-5 bg-[#0071E3] rounded-[5px] flex items-center justify-center">
                <GraduationCap size={10} className="text-white" strokeWidth={2} />
              </div>
              <span className="text-white text-[10px] font-bold">EduFee</span>
            </div>
            {['Dashboard','Students','Attendance','Fee Mgmt','Payments','Reports','AI Assistant','Calendar'].map((label, i) => (
              <div key={label} className={`flex items-center gap-1.5 px-2 py-[5px] rounded-[6px] text-[8.5px] font-medium mb-0.5
                ${i === 0 ? 'bg-[#0071E3]/15 text-white' : 'text-white/30'}`}>
                <div className={`w-[3px] h-[3px] rounded-full ${i === 0 ? 'bg-[#60A5FA]' : 'bg-transparent'}`} />
                {label}
              </div>
            ))}
          </div>
          <div className="flex-1 p-3 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-[11px] font-bold text-slate-900">Dashboard</h3>
                <p className="text-[7.5px] text-slate-400">Academic Year 2026-27 · ESJHS</p>
              </div>
              <div className="w-6 h-6 bg-[#0071E3] rounded-full flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">S</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1.5 mb-2.5">
              {statItems.map(s => (
                <div key={s.label} className="bg-white rounded-[8px] p-2 border border-black/[0.05]">
                  <div className={`${s.color} rounded-[4px] mb-1.5 flex items-center justify-center`} style={{width:16,height:16}}>
                    <s.Icon size={7} className="text-white" strokeWidth={2} />
                  </div>
                  <p className="text-[10px] font-bold text-slate-900 leading-none">{s.value}</p>
                  <p className="text-[6px] text-slate-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-2">
              <div className="col-span-3 bg-white rounded-[8px] p-2.5 border border-black/[0.05]">
                <p className="text-[7px] font-bold text-slate-700 mb-1.5">Monthly Collection</p>
                <div className="flex items-end gap-1 h-[60px]">
                  {bars.map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full rounded-t-[2px]" style={{ height: `${bar.h}%`, background: i === 5 ? '#0071E3' : '#BFDBFE' }} />
                      <span className="text-[5px] text-slate-400">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-2 bg-white rounded-[8px] p-2.5 border border-black/[0.05]">
                <p className="text-[7px] font-bold text-slate-700 mb-1.5">Recent Payments</p>
                <div className="space-y-1.5">
                  {payments.map((p, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-[7px] text-slate-700">{p.name}</span>
                      <span className={`text-[6px] font-bold px-1 py-0.5 rounded-full ${p.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{p.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Teacher App phone screen ───────────────────────────────────────────────────
function TeacherScreen() {
  const [active, setActive] = useState(0);
  const students = [
    { name: 'Arjun Kumar',   roll: '01', status: 'present' },
    { name: 'Priya Reddy',   roll: '02', status: 'absent'  },
    { name: 'Ravi Shankar',  roll: '03', status: 'present' },
    { name: 'Kavitha M.',    roll: '04', status: 'late'    },
    { name: 'Suresh Babu',   roll: '05', status: 'present' },
    { name: 'Meena Kumari',  roll: '06', status: 'present' },
  ];
  return (
    <div className="h-full flex flex-col bg-[#F2F4F7]">
      {/* Header */}
      <div className="bg-white border-b border-black/[0.06] px-4 pt-10 pb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-[#34C759] rounded-[6px] flex items-center justify-center">
            <GraduationCap size={11} className="text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-900">Teacher Portal</p>
            <p className="text-[8px] text-slate-400">Ravi Kumar · Class 8A</p>
          </div>
        </div>
        <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg">
          {['7A','7B','8A','8B','9A'].map((c, i) => (
            <button key={c} onClick={() => setActive(i)}
              className={`flex-1 text-[8px] font-bold py-1 rounded-[6px] transition-all ${active === i ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-1.5 px-3 py-2">
        {[['Present','4','text-emerald-600'],['Absent','1','text-red-600'],['Late','1','text-amber-600']].map(([l,v,c]) => (
          <div key={l} className="bg-white rounded-[8px] py-1.5 text-center border border-black/[0.04]">
            <p className={`text-[13px] font-bold ${c}`}>{v}</p>
            <p className={`text-[7px] font-semibold ${c}`}>{l}</p>
          </div>
        ))}
      </div>
      {/* Student list */}
      <div className="flex-1 overflow-hidden px-3 space-y-1.5">
        {students.map((s, i) => (
          <motion.div key={s.roll}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 bg-white rounded-[10px] px-2.5 py-2 border border-black/[0.04]">
            <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[8px] font-bold text-slate-600">{s.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[8.5px] font-semibold text-slate-900 truncate">{s.name}</p>
              <p className="text-[7px] text-slate-400">Roll #{s.roll}</p>
            </div>
            <div className="flex gap-0.5">
              {['P','A','L'].map(btn => (
                <button key={btn}
                  className={`w-6 h-6 rounded-[5px] text-[8px] font-bold transition-all
                    ${s.status === 'present' && btn === 'P' ? 'bg-emerald-500 text-white' :
                      s.status === 'absent'  && btn === 'A' ? 'bg-red-500 text-white' :
                      s.status === 'late'    && btn === 'L' ? 'bg-amber-400 text-white' :
                      'bg-slate-100 text-slate-400'}`}>
                  {btn}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      {/* Save bar */}
      <div className="px-3 py-2.5">
        <div className="bg-slate-900 rounded-[10px] py-2.5 flex items-center justify-center gap-1.5">
          <CalendarCheck size={10} className="text-white" strokeWidth={2} />
          <span className="text-[9px] font-bold text-white">Save Attendance</span>
        </div>
      </div>
    </div>
  );
}

// ── Parent App phone screen ────────────────────────────────────────────────────
function ParentScreen() {
  const fees = [
    { label: 'Term 1 Fees',  amount: '₹4,800', due: 'Due Jun 30', status: 'pending' },
    { label: 'Lab Charges',  amount: '₹800',   due: 'Due Jul 15', status: 'pending' },
    { label: 'Term 2 Fees',  amount: '₹4,800', due: 'Paid Mar 1', status: 'paid'    },
    { label: 'Books Fees',   amount: '₹1,200', due: 'Paid Jan 5', status: 'paid'    },
  ];
  return (
    <div className="h-full flex flex-col bg-[#F2F4F7]">
      {/* Header */}
      <div className="bg-[#0071E3] px-4 pt-10 pb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/70 text-[8px] font-medium">Welcome back</p>
            <p className="text-white text-[11px] font-bold">Ramesh Kumar</p>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">R</span>
          </div>
        </div>
        <div className="bg-white/15 rounded-[12px] p-3 border border-white/20">
          <p className="text-white/70 text-[7.5px] mb-0.5">Total Outstanding</p>
          <p className="text-white text-[20px] font-bold leading-none tracking-tight">₹5,600</p>
          <p className="text-white/60 text-[7px] mt-1">Arjun Kumar · Class 8A · ESJHS</p>
        </div>
      </div>
      {/* Fee list */}
      <div className="flex-1 overflow-hidden px-3 py-3 space-y-2">
        <p className="text-[8.5px] font-bold text-slate-700 mb-2">Fee Details</p>
        {fees.map((f, i) => (
          <motion.div key={f.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="flex items-center justify-between bg-white rounded-[10px] px-3 py-2.5 border border-black/[0.04]">
            <div>
              <p className="text-[8.5px] font-semibold text-slate-900">{f.label}</p>
              <p className="text-[7px] text-slate-400">{f.due}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold text-slate-900">{f.amount}</p>
              <span className={`text-[6.5px] font-bold px-1.5 py-0.5 rounded-full
                ${f.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {f.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Pay button */}
      <div className="px-3 pb-3">
        <div className="bg-[#0071E3] rounded-[10px] py-2.5 flex items-center justify-center gap-1.5">
          <CreditCard size={10} className="text-white" strokeWidth={2} />
          <span className="text-[9px] font-bold text-white">Pay ₹5,600 Now</span>
        </div>
      </div>
    </div>
  );
}

// ── Events/Calendar App mockup ────────────────────────────────────────────────
function EventsScreen() {
  const events = [
    { title: 'Annual Sports Day',  date: 'Jun 15', color: 'bg-purple-500',  type: 'Event'    },
    { title: 'Parent-Teacher Meet', date: 'Jun 18', color: 'bg-blue-500',   type: 'Meeting'  },
    { title: 'Fee Collection Drive', date: 'Jun 22', color: 'bg-amber-500', type: 'Finance'  },
    { title: 'Mid-Term Exams',      date: 'Jul 1',  color: 'bg-red-500',    type: 'Exam'     },
    { title: 'Science Exhibition',  date: 'Jul 8',  color: 'bg-teal-500',   type: 'Event'    },
  ];
  const tasks = [
    { task: 'Collect Term 2 fees from Class 9', done: true  },
    { task: 'Update student attendance records', done: true  },
    { task: 'Send SMS for Sports Day',           done: false },
    { task: 'Prepare monthly report',            done: false },
  ];
  return (
    <div className="h-full flex flex-col bg-[#F2F4F7]">
      {/* Header */}
      <div className="bg-white border-b border-black/[0.06] px-4 pt-10 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-900">Academic Calendar</p>
            <p className="text-[8px] text-slate-400">June 2026 · ESJHS</p>
          </div>
          <div className="w-6 h-6 bg-[#AF52DE] rounded-[6px] flex items-center justify-center">
            <Calendar size={11} className="text-white" strokeWidth={2} />
          </div>
        </div>
      </div>
      {/* Mini calendar strip */}
      <div className="flex gap-1.5 px-3 py-2 overflow-x-hidden">
        {['9','10','11','12','13','14','15'].map((d, i) => (
          <div key={d} className={`flex-1 flex flex-col items-center py-1.5 rounded-[8px] text-center
            ${i === 3 ? 'bg-[#AF52DE]' : 'bg-white border border-black/[0.05]'}`}>
            <p className={`text-[7px] font-medium ${i === 3 ? 'text-white/70' : 'text-slate-400'}`}>
              {['M','T','W','T','F','S','S'][i]}
            </p>
            <p className={`text-[10px] font-bold ${i === 3 ? 'text-white' : 'text-slate-800'}`}>{d}</p>
            {i === 3 && <div className="w-1 h-1 bg-white rounded-full mt-0.5" />}
          </div>
        ))}
      </div>
      {/* Upcoming events */}
      <div className="px-3 mb-2">
        <p className="text-[8.5px] font-bold text-slate-700 mb-1.5">Upcoming Events</p>
        <div className="space-y-1.5">
          {events.slice(0,3).map((ev, i) => (
            <motion.div key={ev.title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-2 bg-white rounded-[8px] px-2.5 py-2 border border-black/[0.04]">
              <div className={`w-1.5 h-8 ${ev.color} rounded-full flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-[8px] font-semibold text-slate-900 truncate">{ev.title}</p>
                <p className="text-[6.5px] text-slate-400">{ev.date} · {ev.type}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Tasks */}
      <div className="px-3 flex-1">
        <p className="text-[8.5px] font-bold text-slate-700 mb-1.5">Tasks</p>
        <div className="space-y-1.5">
          {tasks.slice(0,3).map((t, i) => (
            <div key={i} className="flex items-start gap-2 bg-white rounded-[8px] px-2.5 py-2 border border-black/[0.04]">
              <div className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 mt-0.5 flex items-center justify-center
                ${t.done ? 'bg-[#34C759] border-[#34C759]' : 'border-slate-300'}`}>
                {t.done && <CheckCircle size={8} className="text-white" strokeWidth={2.5} />}
              </div>
              <p className={`text-[7.5px] leading-snug ${t.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{t.task}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Testimonial card ──────────────────────────────────────────────────────────
function TestimonialCard({ quote, name, role, school }) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('');
  return (
    <div className="bg-white rounded-[22px] p-7 border border-black/[0.055] flex flex-col flex-shrink-0"
         style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)', width: 360 }}>
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
      </div>
      <p className="text-[14.5px] text-[#1D1D1F] leading-[1.7] mb-6 flex-1">"{quote}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-black/[0.05]">
        <div className="w-9 h-9 bg-[#0071E3] rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-[11px]">{initials}</span>
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[#1D1D1F] truncate">{name}</p>
          <p className="text-[11px] text-[#6E6E73] truncate">{role} · {school}</p>
        </div>
      </div>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Apps',         href: '#apps'         },
  { label: 'Features',    href: '#features'      },
  { label: 'Product',     href: '#showcase'      },
  { label: 'Pricing',     href: '#pricing'       },
];

const STATS = [
  { value: '3,200+',  label: 'Students managed',   sub: 'Across all school types'  },
  { value: '₹2.4 Cr', label: 'Fees collected',     sub: 'This academic year'       },
  { value: '50+',     label: 'Schools onboarded',  sub: 'And growing every month'  },
];

const APPS = [
  {
    id: 'admin',
    name: 'Admin Dashboard',
    tagline: 'Total school command.',
    desc: 'The nerve centre for principals and admins. Every KPI, every rupee, every student — visible at a glance.',
    icon: Monitor,
    color: '#0071E3',
    bg: 'bg-[#0071E3]',
    softBg: 'bg-blue-50',
    softText: 'text-blue-700',
    platform: 'Web App',
    features: [
      { Icon: BarChart3,    title: 'Live KPI Dashboard',       desc: 'Real-time fee collection, attendance rates, and pending dues — all on one screen.' },
      { Icon: IndianRupee,  title: 'Smart Fee Management',     desc: 'Assign fees by class, apply RTE / hostel concessions, and track every transaction.' },
      { Icon: Users,        title: 'Student Registry',         desc: 'Full student profiles with enrollment history, fee records, and attendance logs.' },
      { Icon: FileText,     title: 'One-Click Reports',        desc: 'Generate monthly, termly, or annual collection reports and export to PDF instantly.' },
      { Icon: Building2,    title: 'Multi-School Support',     desc: 'Switch between ESJHS and JFK (or any school) from a single admin account.' },
      { Icon: Zap,          title: 'AI Fee Assistant',         desc: 'Ask anything — "Who has pending fees in Class 9?" — and get an instant answer.' },
    ],
  },
  {
    id: 'teacher',
    name: 'Teacher App',
    tagline: 'Attendance in seconds.',
    desc: 'A mobile-first portal designed for busy teachers. Mark attendance for a full class in under a minute.',
    icon: GraduationCap,
    color: '#34C759',
    bg: 'bg-[#34C759]',
    softBg: 'bg-green-50',
    softText: 'text-green-700',
    platform: 'Mobile & Web',
    features: [
      { Icon: CalendarCheck, title: 'One-Tap Attendance',      desc: 'Mark present, absent, or late for every student with a single tap per row.' },
      { Icon: Users,         title: 'Class Roster',            desc: 'Instantly switch between any class you are assigned to — 7A, 8B, 9C and more.' },
      { Icon: MessageSquare, title: 'Auto Parent Alerts',      desc: 'The moment you save attendance, absent students trigger an SMS to their parents.' },
      { Icon: BarChart3,     title: 'Attendance History',      desc: 'View any student\'s past attendance record with date-wise breakdown.' },
      { Icon: Clock,         title: 'Backdated Entry',         desc: 'Missed a day? Edit attendance for any past date without calling the admin.' },
      { Icon: Shield,        title: 'Offline Ready',           desc: 'Mark attendance even without internet. It syncs automatically when you reconnect.' },
    ],
  },
  {
    id: 'parent',
    name: 'Parent Portal',
    tagline: 'Pay from anywhere.',
    desc: 'Parents see their child\'s dues, pay online, and receive instant receipts — no more office visits.',
    icon: Wallet,
    color: '#FF9F0A',
    bg: 'bg-[#FF9F0A]',
    softBg: 'bg-amber-50',
    softText: 'text-amber-700',
    platform: 'Mobile & Web',
    features: [
      { Icon: CreditCard,    title: 'Online Fee Payment',      desc: 'Pay term fees, book fees, or uniform charges securely from any device.' },
      { Icon: IndianRupee,   title: 'Fee Breakdown',           desc: 'See exactly what is due — term-wise, category-wise, with outstanding totals.' },
      { Icon: FileText,      title: 'Instant Receipts',        desc: 'Download a PDF receipt the moment a payment goes through.' },
      { Icon: Bell,          title: 'Due Date Reminders',      desc: 'Get SMS reminders before fee due dates so you are never caught off-guard.' },
      { Icon: CalendarCheck, title: 'Attendance Visibility',   desc: 'Check your child\'s daily attendance record right from the parent app.' },
      { Icon: MessageSquare, title: 'Absence Notifications',   desc: 'Receive an instant SMS alert whenever your child is marked absent by the teacher.' },
    ],
  },
  {
    id: 'events',
    name: 'Event Management',
    tagline: 'Every event, on schedule.',
    desc: 'Plan school events, assign tasks to staff, manage the academic calendar — all in one organised space.',
    icon: Calendar,
    color: '#AF52DE',
    bg: 'bg-[#AF52DE]',
    softBg: 'bg-purple-50',
    softText: 'text-purple-700',
    platform: 'Web App',
    features: [
      { Icon: Calendar,      title: 'Academic Calendar',       desc: 'Plot exams, sports days, holidays, and fee drives on a full-year calendar.' },
      { Icon: ClipboardList, title: 'Task Management',         desc: 'Assign tasks to staff with deadlines, track completion, and get reminders.' },
      { Icon: Trophy,        title: 'Event Planning',          desc: 'Create events with details, assign coordinators, and notify stakeholders via SMS.' },
      { Icon: Bell,          title: 'Event Reminders',         desc: 'Automated reminders go to staff and parents days before every scheduled event.' },
      { Icon: MapPin,        title: 'Venue & Resource Mgmt',   desc: 'Assign classrooms, halls, and resources to events without conflicts.' },
      { Icon: BarChart3,     title: 'Event Reports',           desc: 'Track participation, costs, and outcomes for every event you run.' },
    ],
  },
];

const TESTIMONIALS = [
  {
    quote: 'EduFee transformed how we manage collections. What took days of paperwork now takes minutes. The SMS alerts alone changed everything.',
    name: 'K. Suresh Babu',
    role: 'Principal',
    school: 'ESJHS, Hyderabad',
  },
  {
    quote: 'Parent satisfaction improved overnight. They can see exactly what is due, when it is due, and pay without calling the office.',
    name: 'Priya Lakshmi',
    role: 'Finance Coordinator',
    school: 'Just For Kids, Hyderabad',
  },
  {
    quote: 'The teacher portal is beautifully simple. My staff took zero training. Mark attendance, done. Everything syncs instantly.',
    name: 'Rajesh Narayan',
    role: 'School Administrator',
    school: 'Sri Vidya School, Hyderabad',
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MarketingPage() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeApp,   setActiveApp]   = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Auto-cycle features in the active app
  useEffect(() => {
    const t = setInterval(() => setActiveFeature(f => (f + 1) % APPS[activeApp].features.length), 2800);
    return () => clearInterval(t);
  }, [activeApp]);

  const currentApp = APPS[activeApp];

  return (
    <div style={{ fontFamily: "'Hanken Grotesk', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}
         className="antialiased text-[#1D1D1F] bg-white overflow-x-hidden">

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-2xl border-b border-black/[0.07] shadow-[0_1px_0_rgba(0,0,0,0.04)]'
          : 'bg-[#0A0E1A]/60 backdrop-blur-md'
      }`} style={{ height: 52 }}>
        <div className="max-w-[1080px] mx-auto h-full px-5 flex items-center justify-between gap-8">
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 bg-[#0071E3] rounded-[8px] flex items-center justify-center">
              <GraduationCap size={14} className="text-white" strokeWidth={2} />
            </div>
            <span className={`text-[15px] font-bold tracking-[-0.025em] transition-colors duration-300 ${scrolled ? 'text-[#1D1D1F]' : 'text-white'}`}>EduFee</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
            {NAV_LINKS.map(link => (
              <a key={link.label} href={link.href}
                 className={`text-[13px] font-medium transition-colors duration-150 ${scrolled ? 'text-[#6E6E73] hover:text-[#1D1D1F]' : 'text-white/65 hover:text-white'}`}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link className={`hidden md:block text-[13px] font-medium transition-colors ${scrolled ? 'text-[#1D1D1F] hover:text-[#0071E3]' : 'text-white/70 hover:text-white'}`}>
              Sign in
            </Link>
            <Link className={`text-[13px] font-semibold px-4 py-[7px] rounded-full active:scale-[0.96] transition-all ${scrolled ? 'bg-[#0071E3] text-white hover:bg-[#0077ED] shadow-sm' : 'bg-white text-[#0A0E1A] hover:bg-white/90 shadow-sm'}`}>
              Get started
            </Link>
            <button className={`md:hidden p-1.5 -mr-1 ${scrolled ? 'text-[#1D1D1F]' : 'text-white'}`} onClick={() => setMobileOpen(v => !v)}>
              {mobileOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={1.8} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-black/5 overflow-hidden">
              <div className="px-6 py-5 space-y-4">
                {NAV_LINKS.map(link => (
                  <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                     className="block text-[16px] font-medium text-[#1D1D1F] py-0.5">{link.label}</a>
                ))}
                <div className="pt-2 border-t border-black/5 flex flex-col gap-3">
                  <Link onClick={() => setMobileOpen(false)} className="text-[15px] font-medium text-[#0071E3]">Sign in</Link>
                  <Link onClick={() => setMobileOpen(false)} className="text-[15px] font-semibold bg-[#0071E3] text-white text-center py-3 rounded-full">Get started free</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero — asymmetric split ───────────────────────────────────────── */}
      <section className="min-h-[100dvh] bg-[#0A0E1A] overflow-hidden flex flex-col justify-center pt-[52px]">
        <div className="max-w-[1200px] mx-auto px-5 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[52%_48%] gap-8 xl:gap-16 items-center py-16 lg:py-20">

            {/* ── Left: text ── */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 text-[11px] font-semibold text-white/30 tracking-[0.1em] mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] flex-shrink-0" />
                50+ schools · Telangana &amp; Andhra Pradesh
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(52px,7vw,88px)] font-black text-white leading-[0.96] tracking-[-0.04em] mb-6"
                style={{ textWrap: 'balance' }}>
                School fees,<br />simplified.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.13, ease: [0.22, 1, 0.36, 1] }}
                className="text-[17px] text-white/45 leading-[1.7] max-w-[430px] mb-10">
                Collect fees, track attendance, and keep parents informed.
                One platform, four apps, built for Indian schools.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.21, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-4 mb-14">
                <MagneticButton>
                  <Link className="bg-[#0071E3] hover:bg-[#0077ED] text-white text-[14px] font-semibold px-7 py-3.5 rounded-full transition-colors active:scale-[0.97] shadow-[0_4px_28px_rgba(0,113,227,0.45)] inline-block">
                    Start free — all 4 apps
                  </Link>
                </MagneticButton>
                <a href="#apps" className="flex items-center gap-1.5 text-[13px] font-medium text-white/45 hover:text-white/70 transition-colors">
                  See how it works <ArrowRight size={12} strokeWidth={2} />
                </a>
              </motion.div>

              {/* Inline stats */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.07]">
                {STATS.map((s, i) => (
                  <motion.div key={s.label}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.42 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}>
                    <p className="text-[clamp(22px,2.4vw,30px)] font-black text-white leading-none tracking-[-0.03em] mb-1">{s.value}</p>
                    <p className="text-[11px] font-medium text-white/40">{s.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: floating dashboard ── */}
            <motion.div
              initial={{ opacity: 0, x: 56, y: 16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.95, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex items-center justify-center relative">
              {/* blue ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-[#0071E3]/[0.07] rounded-full blur-3xl pointer-events-none" />
              <div className="w-full max-w-[580px] relative"
                   style={{
                     transform: 'perspective(1200px) rotateY(-5deg) rotateX(2deg)',
                     boxShadow: '0 60px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
                   }}>
                <DashboardMockup compact />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          THE SUITE — 4-App overview
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="apps" className="py-28 bg-[#1D1D1F]">
        <div className="max-w-[1080px] mx-auto px-5">

          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-[clamp(44px,6vw,72px)] font-black text-white tracking-[-0.04em] leading-[1.02] mb-5"
                  style={{ textWrap: 'balance' }}>
                Four apps.<br />One school system.
              </h2>
              <p className="text-[16px] text-white/45 leading-relaxed max-w-[480px] mx-auto">
                Admin, teacher, parent, and coordinator — each gets a purpose-built experience, included in one plan.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {APPS.map((app, i) => {
              // Admin (0) and Events (3) get wide treatment; Teacher (1) and Parent (2) stay narrow
              const wide = i === 0 || i === 3;
              return (
              <FadeUp key={app.id} delay={i * 0.08} className={wide ? 'md:col-span-2' : 'md:col-span-1'}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-[24px] p-8 border border-white/[0.07] cursor-default overflow-hidden relative"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px]"
                       style={{ background: `radial-gradient(circle at 30% 40%, ${app.color}18 0%, transparent 70%)` }} />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0"
                           style={{ backgroundColor: app.color + '22' }}>
                        <app.icon size={22} style={{ color: app.color }} strokeWidth={1.8} />
                      </div>
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border"
                            style={{ color: app.color, borderColor: app.color + '40', background: app.color + '12' }}>
                        {app.platform}
                      </span>
                    </div>

                    <h3 className="text-[22px] font-bold text-white tracking-[-0.025em] mb-1">{app.name}</h3>
                    <p className="text-[14px] font-semibold mb-3" style={{ color: app.color }}>{app.tagline}</p>
                    <p className="text-[13.5px] text-white/40 leading-relaxed mb-6">{app.desc}</p>

                    <div className="space-y-2.5">
                      {app.features.slice(0, 3).map((f, j) => (
                        <div key={j} className="flex items-center gap-2.5">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                               style={{ backgroundColor: app.color + '20' }}>
                            <f.Icon size={9} style={{ color: app.color }} strokeWidth={2} />
                          </div>
                          <span className="text-[12.5px] text-white/55">{f.title}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-1.5 pt-1" style={{ color: app.color }}>
                        <span className="text-[12px] font-semibold">+{app.features.length - 3} more features</span>
                        <ChevronRight size={13} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          INTERACTIVE APP DEEP DIVE — tab switcher
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-5">

          <FadeUp>
            <div className="text-center mb-14">
              <h2 className="text-[clamp(38px,5vw,60px)] font-black text-[#1D1D1F] tracking-[-0.04em] leading-[1.05] mb-4"
                  style={{ textWrap: 'balance' }}>
                Explore each app.
              </h2>
              <p className="text-[16px] text-[#6E6E73] max-w-[400px] mx-auto leading-relaxed">
                Click any app to see exactly what it does and how it looks in practice.
              </p>
            </div>
          </FadeUp>

          {/* Tab switcher */}
          <FadeUp delay={0.08}>
            <div className="flex flex-wrap justify-center gap-2 mb-14">
              {APPS.map((app, i) => (
                <motion.button
                  key={app.id}
                  onClick={() => { setActiveApp(i); setActiveFeature(0); }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200
                    ${activeApp === i
                      ? 'text-white shadow-lg'
                      : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]'}`}
                  style={activeApp === i ? { backgroundColor: app.color, boxShadow: `0 8px 24px ${app.color}44` } : {}}
                >
                  <app.icon size={15} strokeWidth={2} />
                  {app.name}
                </motion.button>
              ))}
            </div>
          </FadeUp>

          {/* App content panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeApp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left — features */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-[12px] flex items-center justify-center"
                       style={{ backgroundColor: currentApp.color + '18' }}>
                    <currentApp.icon size={20} style={{ color: currentApp.color }} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-[22px] font-bold text-[#1D1D1F] tracking-[-0.025em]">{currentApp.name}</h3>
                    <p className="text-[13px] font-semibold" style={{ color: currentApp.color }}>{currentApp.platform}</p>
                  </div>
                </div>
                <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-8">{currentApp.desc}</p>

                <div className="space-y-3">
                  {currentApp.features.map((feat, i) => (
                    <motion.div
                      key={feat.title}
                      initial={false}
                      animate={{ opacity: activeFeature === i ? 1 : 0.55 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setActiveFeature(i)}
                      className={`rounded-[16px] p-4 cursor-pointer transition-all duration-200 ${activeFeature === i ? 'border' : 'border border-transparent hover:border-black/5'}`}
                      style={activeFeature === i ? {
                        borderColor: currentApp.color + '30',
                        background: currentApp.color + '08',
                      } : { background: '#F5F5F7' }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0 mt-0.5"
                             style={{ backgroundColor: currentApp.color + (activeFeature === i ? '22' : '12') }}>
                          <feat.Icon size={15} style={{ color: currentApp.color }} strokeWidth={1.8} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[14px] font-bold text-[#1D1D1F] mb-0.5">{feat.title}</p>
                          {activeFeature === i && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-[13px] text-[#6E6E73] leading-relaxed"
                            >{feat.desc}</motion.p>
                          )}
                        </div>
                        {activeFeature === i && (
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: currentApp.color }} />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right — mockup */}
              <div className="flex justify-center">
                {currentApp.id === 'admin' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-[520px]"
                    style={{ boxShadow: '0 40px 100px rgba(0,113,227,0.12)' }}
                  >
                    <DashboardMockup />
                  </motion.div>
                )}
                {currentApp.id === 'teacher' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.93, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ filter: `drop-shadow(0 40px 80px rgba(52,199,89,0.22))` }}
                  >
                    <PhoneMockup accent="#34C759"><TeacherScreen /></PhoneMockup>
                  </motion.div>
                )}
                {currentApp.id === 'parent' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.93, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ filter: `drop-shadow(0 40px 80px rgba(255,159,10,0.22))` }}
                  >
                    <PhoneMockup accent="#FF9F0A"><ParentScreen /></PhoneMockup>
                  </motion.div>
                )}
                {currentApp.id === 'events' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.93, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ filter: `drop-shadow(0 40px 80px rgba(175,82,222,0.22))` }}
                  >
                    <PhoneMockup accent="#AF52DE"><EventsScreen /></PhoneMockup>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ADMIN APP — full deep dive
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#F5F5F7] overflow-hidden" id="features">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn from="left">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-[9px] flex items-center justify-center bg-blue-100">
                  <Monitor size={14} className="text-[#0071E3]" strokeWidth={1.8} />
                </div>
                <span className="text-[13px] font-semibold text-[#0071E3]">Admin Dashboard</span>
              </div>
              <h2 className="text-[clamp(34px,4vw,48px)] font-black text-[#1D1D1F] tracking-[-0.04em] leading-[1.06] mb-5"
                  style={{ textWrap: 'balance' }}>
                Your entire school,<br />at a single glance.
              </h2>
              <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-8">
                Principals and admins get a real-time overview of every student, every rupee, and every attendance record — all from one powerful web dashboard.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: IndianRupee, title: 'Live fee collection tracker',     color: '#0071E3' },
                  { Icon: BarChart3,   title: 'Monthly & annual reports',        color: '#0071E3' },
                  { Icon: Users,       title: 'Full student registry & profiles', color: '#0071E3' },
                  { Icon: Zap,         title: 'AI assistant for instant answers', color: '#0071E3' },
                  { Icon: Building2,   title: 'Multi-school account switching',  color: '#0071E3' },
                ].map((item, i) => (
                  <motion.div key={item.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-[9px] flex items-center justify-center flex-shrink-0">
                      <item.Icon size={15} className="text-[#0071E3]" strokeWidth={2} />
                    </div>
                    <span className="text-[14px] font-medium text-[#1D1D1F]">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
            <FadeIn from="right" delay={0.1}>
              <div style={{ boxShadow: '0 40px 100px rgba(0,113,227,0.1)' }}>
                <DashboardMockup />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          TEACHER APP — full deep dive
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#1D1D1F] overflow-hidden">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Phone — left on desktop */}
            <FadeIn from="left" delay={0.1} className="flex justify-center lg:justify-start">
              <div style={{ filter: 'drop-shadow(0 50px 90px rgba(52,199,89,0.25))' }}>
                <PhoneMockup accent="#34C759"><TeacherScreen /></PhoneMockup>
              </div>
            </FadeIn>
            {/* Text — right */}
            <FadeIn from="right">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-[9px] flex items-center justify-center"
                     style={{ background: 'rgba(52,199,89,0.18)' }}>
                  <Smartphone size={14} strokeWidth={1.8} style={{ color: '#34C759' }} />
                </div>
                <span className="text-[13px] font-semibold" style={{ color: '#34C759' }}>Teacher App</span>
              </div>
              <h2 className="text-[clamp(34px,4vw,48px)] font-black text-white tracking-[-0.04em] leading-[1.06] mb-5"
                  style={{ textWrap: 'balance' }}>
                Attendance done<br />in under a minute.
              </h2>
              <p className="text-[15px] text-white/45 leading-relaxed mb-8">
                Teachers open the app, select their class, tap P or A for each student, and hit save. That's it. Parents are instantly notified of absences.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: CalendarCheck, title: 'Mark P / A / Late per student'       },
                  { Icon: Users,         title: 'Switch between any assigned class'    },
                  { Icon: MessageSquare, title: 'Auto-SMS parents on absence'          },
                  { Icon: Clock,         title: 'Backdate attendance for missed days'  },
                  { Icon: Shield,        title: 'Works offline — syncs when reconnected' },
                ].map((item, i) => (
                  <motion.div key={item.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0"
                         style={{ background: 'rgba(52,199,89,0.15)' }}>
                      <item.Icon size={15} className="text-[#34C759]" strokeWidth={2} />
                    </div>
                    <span className="text-[14px] font-medium text-white/70">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PARENT APP — full deep dive
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn from="left">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-[9px] flex items-center justify-center bg-amber-50">
                  <Smartphone size={14} strokeWidth={1.8} className="text-[#FF9F0A]" />
                </div>
                <span className="text-[13px] font-semibold text-[#FF9F0A]">Parent Portal</span>
              </div>
              <h2 className="text-[clamp(34px,4vw,48px)] font-black text-[#1D1D1F] tracking-[-0.04em] leading-[1.06] mb-5"
                  style={{ textWrap: 'balance' }}>
                Pay fees from<br />the sofa.
              </h2>
              <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-8">
                Parents see their child's complete fee breakdown, pay online in seconds, and get an instant receipt — without ever visiting the school office.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: CreditCard,    title: 'Secure online fee payment'           },
                  { Icon: IndianRupee,   title: 'Full fee breakdown by category'      },
                  { Icon: FileText,      title: 'Instant downloadable receipts'       },
                  { Icon: Bell,          title: 'Due date SMS reminders'              },
                  { Icon: CalendarCheck, title: 'View child\'s attendance anytime'   },
                ].map((item, i) => (
                  <motion.div key={item.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-50 rounded-[9px] flex items-center justify-center flex-shrink-0">
                      <item.Icon size={15} className="text-[#FF9F0A]" strokeWidth={2} />
                    </div>
                    <span className="text-[14px] font-medium text-[#1D1D1F]">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
            <FadeIn from="right" delay={0.1} className="flex justify-center">
              <div style={{ filter: 'drop-shadow(0 50px 90px rgba(255,159,10,0.22))' }}>
                <PhoneMockup accent="#FF9F0A"><ParentScreen /></PhoneMockup>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          EVENT MANAGEMENT — full deep dive
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#F5F5F7] overflow-hidden">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Phone left */}
            <FadeIn from="left" delay={0.1} className="flex justify-center lg:justify-start">
              <div style={{ filter: 'drop-shadow(0 50px 90px rgba(175,82,222,0.22))' }}>
                <PhoneMockup accent="#AF52DE"><EventsScreen /></PhoneMockup>
              </div>
            </FadeIn>
            {/* Text right */}
            <FadeIn from="right">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-[9px] flex items-center justify-center bg-purple-50">
                  <Calendar size={14} strokeWidth={1.8} className="text-[#AF52DE]" />
                </div>
                <span className="text-[13px] font-semibold text-[#AF52DE]">Event Management</span>
              </div>
              <h2 className="text-[clamp(34px,4vw,48px)] font-black text-[#1D1D1F] tracking-[-0.04em] leading-[1.06] mb-5"
                  style={{ textWrap: 'balance' }}>
                Every school event,<br />perfectly organised.
              </h2>
              <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-8">
                Plan sports days, parent-teacher meetings, exam schedules, and fee drives on a shared calendar — with task assignments and automated reminders.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: Calendar,      title: 'Full academic year calendar'         },
                  { Icon: ClipboardList, title: 'Staff task assignment & tracking'    },
                  { Icon: Trophy,        title: 'Event creation & coordination'       },
                  { Icon: Bell,          title: 'Auto reminders to staff & parents'   },
                  { Icon: MapPin,        title: 'Venue & resource booking'            },
                ].map((item, i) => (
                  <motion.div key={item.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-50 rounded-[9px] flex items-center justify-center flex-shrink-0">
                      <item.Icon size={15} className="text-[#AF52DE]" strokeWidth={2} />
                    </div>
                    <span className="text-[14px] font-medium text-[#1D1D1F]">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SVG Mask tagline ────────────────────────────────────────────────── */}
      <MaskContainer
        revealText={
          <div className="max-w-4xl mx-auto text-center px-5">
            <p className="text-[32px] md:text-[48px] font-bold text-[#1D1D1F] tracking-[-0.035em] leading-tight">
              One platform for every school, every role, every day.
            </p>
            <p className="text-[15px] text-[#6E6E73] mt-4 max-w-lg mx-auto leading-relaxed">
              Move your cursor to reveal the full picture.
            </p>
          </div>
        }
        className="h-[50vh] min-h-[360px] bg-[#F5F5F7] cursor-crosshair"
      >
        <div className="max-w-4xl mx-auto text-center px-5">
          <p className="text-[32px] md:text-[48px] font-bold text-white tracking-[-0.035em] leading-tight">
            One platform for every school,{' '}
            <span className="text-[#60A5FA]">every role, every day.</span>
          </p>
          <p className="text-[15px] text-white/60 mt-4 max-w-lg mx-auto leading-relaxed">
            EduFee brings admins, teachers, parents, and coordinators onto one unified system.
          </p>
        </div>
      </MaskContainer>

      {/* ── MacbookScroll showcase ──────────────────────────────────────────── */}
      <section id="showcase" className="bg-white overflow-hidden">
        <div className="max-w-[1080px] mx-auto px-5 pt-20">
          <FadeUp>
            <h2 className="text-[clamp(40px,5vw,58px)] font-black text-[#1D1D1F] tracking-[-0.04em] leading-[1.04] mb-4 max-w-2xl"
                style={{ textWrap: 'balance' }}>
              Built for Indian schools.<br />Designed for everyone.
            </h2>
            <p className="text-[16px] text-[#6E6E73] leading-relaxed max-w-xl">
              From the principal's financial overview to the teacher's daily roll call — EduFee works for every role, beautifully.
            </p>
          </FadeUp>
        </div>
        <MacbookScroll
          src="/esjhs-campus-desktop.jpg"
          showGradient
          title={
            <span className="text-[#1D1D1F] text-3xl font-bold tracking-[-0.03em]">
              Your school, powered by EduFee
            </span>
          }
        />
      </section>

      {/* ── Testimonials — auto-scroll marquee ──────────────────────────── */}
      <section id="testimonials" className="py-28 bg-[#F5F5F7] overflow-hidden">
        <FadeUp>
          <div className="max-w-[1080px] mx-auto px-5 mb-12">
            <h2 className="text-[clamp(36px,4.5vw,52px)] font-black text-[#1D1D1F] tracking-[-0.04em]">
              Loved by schools.
            </h2>
            <p className="text-[15px] text-[#6E6E73] mt-3 leading-relaxed">
              Real results from schools already on EduFee.
            </p>
          </div>
        </FadeUp>
        {/* Marquee track — 4× duplication for seamless loop */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
               style={{ background: 'linear-gradient(to right, #F5F5F7, transparent)' }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
               style={{ background: 'linear-gradient(to left, #F5F5F7, transparent)' }} />
          <div className="flex gap-5 marquee-track" style={{ width: 'max-content' }}>
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature highlights — 3D Pin ─────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-[1080px] mx-auto px-5">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-[clamp(36px,4.5vw,52px)] font-black text-[#1D1D1F] tracking-[-0.04em]"
                  style={{ textWrap: 'balance' }}>
                Built right, from the ground up.
              </h2>
            </div>
          </FadeUp>
          <div className="flex flex-wrap justify-center gap-8 md:gap-4">
            {[
              { Icon: Shield,      color: '#0071E3', title: 'Secure & private',  desc: 'Your data stays on your server. No third-party access, ever.'         },
              { Icon: Zap,         color: '#FF9F0A', title: 'Lightning fast',    desc: 'Built on modern infrastructure. Every action feels instant.'           },
              { Icon: BarChart3,   color: '#34C759', title: 'Detailed reports',  desc: 'Export fee collection and attendance reports in one click.'             },
              { Icon: CheckCircle, color: '#FF3B30', title: 'Always up to date', desc: 'Updates roll out silently. Nothing to install, ever.'                  },
            ].map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.07}>
                <PinContainer title={f.title} href="#features" containerClassName="cursor-pointer">
                  <div className="flex flex-col gap-4 p-5 w-[240px] h-[200px]">
                    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: f.color + '20' }}>
                      <f.Icon size={18} style={{ color: f.color }} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-white text-[15px] font-bold tracking-[-0.02em] mb-2">{f.title}</p>
                      <p className="text-slate-400 text-[12.5px] leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </PinContainer>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-28 bg-[#F5F5F7]">
        <div className="max-w-[900px] mx-auto px-5 text-center">
          <FadeUp>
            <h2 className="text-[clamp(36px,4.5vw,52px)] font-black text-[#1D1D1F] tracking-[-0.04em] mb-4">Simple, honest pricing.</h2>
            <p className="text-[16px] text-[#6E6E73] leading-relaxed max-w-md mx-auto mb-3">
              One plan. All four apps. Your entire school covered.
            </p>
            {/* All 4 apps included pill */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {APPS.map(app => (
                <span key={app.id} className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1 rounded-full border"
                      style={{ color: app.color, borderColor: app.color + '40', background: app.color + '0D' }}>
                  <app.icon size={11} strokeWidth={2} />
                  {app.name}
                </span>
              ))}
            </div>

            <div className="inline-block bg-white rounded-[28px] border border-black/[0.06] p-10 text-left
                            shadow-[0_8px_40px_rgba(0,0,0,0.07)] max-w-sm w-full">
              <p className="text-[12px] font-semibold text-[#0071E3] mb-4">School Plan · All Apps Included</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-[52px] font-bold text-[#1D1D1F] leading-none tracking-[-0.04em]">₹999</span>
                <span className="text-[15px] text-[#6E6E73] mb-2.5">/month</span>
              </div>
              <p className="text-[13px] text-[#6E6E73] mb-8">Billed annually. Unlimited students, unlimited staff.</p>
              <div className="space-y-3 mb-8">
                {[
                  'Admin Dashboard (web)',
                  'Teacher App (mobile + web)',
                  'Parent Portal (mobile + web)',
                  'Event Management App',
                  'Unlimited students & classes',
                  'SMS parent notifications',
                  'Monthly & annual reports',
                  'AI fee assistant',
                  'Multi-school support',
                  'Dedicated onboarding',
                ].map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CheckCircle size={15} className="text-[#34C759] flex-shrink-0" strokeWidth={2} />
                    <span className="text-[13.5px] text-[#1D1D1F]">{f}</span>
                  </div>
                ))}
              </div>
              <Link className="block w-full bg-[#0071E3] text-white text-[14px] font-semibold text-center
                               py-3.5 rounded-full hover:bg-[#0077ED] transition-colors active:scale-[0.97]
                               shadow-[0_4px_16px_rgba(0,113,227,0.28)]">
                Start free trial — all apps
              </Link>
              <p className="text-[11.5px] text-[#6E6E73] text-center mt-3">30 days free · No credit card needed</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-36 bg-[#0A0E1A]">
        <div className="max-w-[680px] mx-auto px-5 text-center">
          <FadeUp>
            <h2 className="text-[clamp(40px,6vw,72px)] font-black text-white tracking-[-0.04em] leading-[1.02] mb-5"
                style={{ textWrap: 'balance' }}>
              Ready to simplify<br />your school?
            </h2>
            <p className="text-[17px] text-white/50 leading-relaxed mb-10 max-w-md mx-auto">
              Join 50+ schools already on EduFee. All four apps set up in one afternoon.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <Link className="bg-[#0071E3] text-white text-[15px] font-semibold px-9 py-3.5 rounded-full
                                 hover:bg-[#0077ED] transition-colors active:scale-[0.97]
                                 shadow-[0_4px_28px_rgba(0,113,227,0.45)] inline-block">
                  Get started free
                </Link>
              </MagneticButton>
              <a href="mailto:support@edufee.in"
                 className="flex items-center gap-1.5 text-[15px] font-medium text-white/50 hover:text-white/80 transition-colors">
                Contact sales <ArrowRight size={14} strokeWidth={2.2} />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#1D1D1F] py-16">
        <div className="max-w-[1080px] mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-[#0071E3] rounded-[8px] flex items-center justify-center">
                  <GraduationCap size={14} className="text-white" strokeWidth={2} />
                </div>
                <span className="text-[15px] font-bold text-white tracking-[-0.025em]">EduFee</span>
              </div>
              <p className="text-[13px] text-white/40 leading-relaxed max-w-[200px] mb-5">
                Smart school management for Indian schools — all four apps in one plan.
              </p>
              <div className="flex flex-wrap gap-2">
                {APPS.map(app => (
                  <span key={app.id} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: app.color, background: app.color + '15' }}>
                    {app.name}
                  </span>
                ))}
              </div>
            </div>
            {[
              { title: 'Apps',     links: ['Admin Dashboard','Teacher App','Parent Portal','Event Management'] },
              { title: 'Product',  links: ['Features','Pricing','Reports','AI Assistant']                      },
              { title: 'Company',  links: ['About','Contact','Privacy Policy','Terms of Service']              },
            ].map(col => (
              <div key={col.title}>
                <p className="text-[10.5px] font-bold text-white/35 uppercase tracking-[0.1em] mb-4">{col.title}</p>
                <div className="space-y-2.5">
                  {col.links.map(link => (
                    <a key={link} href="#"
                       className="block text-[13px] text-white/45 hover:text-white/75 transition-colors">{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.07] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-white/25">© 2026 EduFee. All rights reserved.</p>
            <p className="text-[12px] text-white/25">Made for Indian schools, with care.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
