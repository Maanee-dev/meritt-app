import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  Fingerprint, 
  Lock, 
  ShieldCheck,
  Plus,
  Trash2,
  Building2,
  Wallet,
  Check,
  ChevronRight,
  Camera,
  FileText,
  Scan,
  Layout,
  BadgeCheck,
  Cpu,
  RefreshCw,
  Star,
  Globe,
  User as UserIcon,
  CircleDot,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { User, ServicePost } from '../types';

interface SettingsProps {
  user: User;
  onUpdateUser?: (user: User) => void;
}

const MOCK_SERVICES: ServicePost[] = [
  { 
    id: 's1', 
    title: 'Modern Resort Branding', 
    freelancer: 'Jauzaf Dhonbe', 
    category: 'Design', 
    description: 'Complete visual identity design for luxury Maldivian resorts.',
    tiers: {
      basic: { price: 'MVR 2,500', delivery: '3 Days', revisions: '2', description: 'Logo + Color Palette' },
      standard: { price: 'MVR 5,000', delivery: '7 Days', revisions: '5', description: 'Full Brand Book' }
    },
    skills: ['Figma', 'Illustrator'],
    rating: 4.9
  }
];

type VerificationStep = 'idle' | 'intro' | 'choice' | 'upload' | 'permission_check' | 'scanning' | 'processing' | 'success' | 'error';

const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser }) => {
  const [activeSection, setActiveSection] = useState('identity');
  const [verificationStep, setVerificationStep] = useState<VerificationStep>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Cleanup effect
  useEffect(() => {
    return () => stopCamera();
  }, []);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleStartScan = async () => {
    setVerificationStep('scanning');
    setScanProgress(0);
    setErrorMessage(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user', 
          width: { ideal: 640 }, 
          height: { ideal: 640 } 
        } 
      });
      
      setStream(mediaStream);
      
      // Use a short timeout to ensure the video element is rendered and the ref is attached
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          startScanningProgress();
        }
      }, 100);

    } catch (err: any) {
      console.error("Biometric Access Error:", err);
      setVerificationStep('error');
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage("Camera access was denied. Please check your browser settings and allow camera access for this site.");
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setErrorMessage("No camera was found on this device. Biometric verification requires a working camera.");
      } else {
        setErrorMessage("An unexpected error occurred while accessing the camera. Please try again.");
      }
    }
  };

  const startScanningProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1.5;
      setScanProgress(prev => {
        const next = prev + 1.5;
        if (next >= 100) {
          clearInterval(interval);
          handleProcessing();
          return 100;
        }
        return next;
      });
    }, 70);
  };

  const handleProcessing = () => {
    setVerificationStep('processing');
    stopCamera();
    setTimeout(() => {
      setVerificationStep('success');
      onUpdateUser?.({
        ...user,
        isHuman: true,
        verificationTier: 'biometric'
      });
    }, 2000);
  };

  const getScanStatus = () => {
    if (scanProgress < 20) return "Detecting Face...";
    if (scanProgress < 50) return "Aligning Biometrics...";
    if (scanProgress < 80) return "Nodal Mapping...";
    return "Finalizing Identity...";
  };

  const SECTIONS = [
    { id: 'identity', label: 'Meritt ID Vault', icon: Fingerprint },
    { id: 'studio', label: 'Service Studio', icon: Layout },
    { id: 'org', label: user.role === 'freelancer' ? 'Identity Bio' : 'Business Profile', icon: Building2 },
    { id: 'billing', label: 'Financial Nodes', icon: Wallet },
    { id: 'security', label: 'Security Protocols', icon: Lock },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20 relative">
      <header className="space-y-1.5">
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-[#0F172A] dark:text-white uppercase leading-none">Node Configuration</h1>
        <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.25em] mt-1">Manage your sovereign professional presence across the archipelago.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <nav className="col-span-1 flex flex-col gap-1.5 h-fit" role="tablist">
          {SECTIONS.map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border ${
                activeSection === item.id 
                ? 'bg-brand border-brand text-white shadow-xl shadow-brand/20' 
                : 'bg-white dark:bg-dark-surface border-[#E2E8F0] dark:border-dark-border text-slate-500 hover:text-brand hover:border-brand shadow-sm'
              }`}
              role="tab"
              aria-selected={activeSection === item.id}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
            </button>
          ))}
        </nav>

        <div className="col-span-3 bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-[36px] overflow-hidden shadow-sm transition-colors relative min-h-[600px] flex flex-col">
          
          {activeSection === 'identity' && (
            <div className="p-8 md:p-10 space-y-10 animate-in slide-in-from-right-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 dark:border-dark-border pb-8">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white leading-none">Meritt ID Protocol</h3>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-2">Sovereign identity and biometric status</p>
                </div>
                {user.isHuman ? (
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl">
                    <BadgeCheck className="w-5 h-5 text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Sovereign Human Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl">
                    <ShieldCheck className="w-5 h-5 text-amber-500" />
                    <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">Standard Entry Tier</span>
                  </div>
                )}
              </div>

              {verificationStep === 'idle' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <article className="p-10 bg-brand/[0.03] border border-brand/10 rounded-[40px] space-y-8 flex flex-col">
                    <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-brand/30">
                      <Fingerprint className="w-8 h-8" />
                    </div>
                    <div className="space-y-3">
                       <h4 className="text-2xl font-black dark:text-white tracking-tight uppercase leading-none">Biometric Upgrade</h4>
                       <p className="text-[13px] text-slate-500 font-medium leading-relaxed">Unlock advanced clearing nodes with "Proof of Human" biometric loop. Requires a valid ID and high-fidelity live facial recognition.</p>
                    </div>
                    <button 
                      onClick={() => setVerificationStep('intro')}
                      className="w-full py-5 bg-brand text-white rounded-[20px] font-black text-[12px] uppercase tracking-widest shadow-2xl shadow-brand/20 hover:scale-105 active:scale-95 transition-all mt-auto"
                    >
                      Initialize Protocol
                    </button>
                  </article>

                  <article className="p-10 bg-slate-50 dark:bg-dark border border-slate-100 dark:border-dark-border rounded-[40px] space-y-8">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sovereign Node ID</p>
                      <Lock className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="p-8 bg-white dark:bg-dark-surface border border-slate-100 dark:border-dark-border rounded-3xl text-center shadow-inner">
                       <code className="text-2xl font-black tracking-widest dark:text-white">{user.merittId}</code>
                    </div>
                    <div className="space-y-5">
                       <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 font-bold uppercase tracking-widest">Identity Score</span>
                          <span className="font-black dark:text-white">{user.isHuman ? '98%' : '65%'}</span>
                       </div>
                       <div className="h-3 bg-slate-200 dark:bg-dark-border rounded-full overflow-hidden">
                          <div className={`h-full bg-brand transition-all duration-1000 ${user.isHuman ? 'w-[98%]' : 'w-[65%]'}`}></div>
                       </div>
                    </div>
                  </article>
                </div>
              ) : (
                <div className="bg-slate-50 dark:bg-dark border border-slate-100 dark:border-dark-border rounded-[40px] min-h-[550px] flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-300 relative overflow-hidden transition-all">
                  
                  {verificationStep === 'intro' && (
                    <div className="max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4">
                       <div className="w-24 h-24 bg-brand/10 text-brand rounded-[32px] flex items-center justify-center mx-auto shadow-inner border border-brand/5">
                          <Scan className="w-12 h-12" />
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-3xl font-black dark:text-white uppercase tracking-tighter">Identity Protocol</h4>
                          <p className="text-slate-500 font-medium leading-relaxed">Secure your professional node. We will verify your official documents followed by a biometric facial mapping.</p>
                       </div>
                       <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <button onClick={() => setVerificationStep('idle')} className="flex-1 py-4 bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-2xl font-black text-[11px] uppercase tracking-widest">Cancel</button>
                          <button onClick={() => setVerificationStep('choice')} className="flex-1 py-4 bg-brand text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-brand/20">Begin</button>
                       </div>
                    </div>
                  )}

                  {verificationStep === 'choice' && (
                    <div className="max-w-md w-full space-y-8 animate-in fade-in slide-in-from-bottom-4">
                       <h4 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Step 1: Identity Token</h4>
                       <div className="grid gap-4">
                          <button onClick={() => setVerificationStep('upload')} className="w-full p-6 bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-[32px] flex items-center justify-between hover:border-brand hover:scale-[1.02] active:scale-95 transition-all group">
                             <div className="flex items-center gap-5 text-left">
                                <div className="w-14 h-14 bg-slate-50 dark:bg-dark rounded-2xl flex items-center justify-center group-hover:bg-brand/5 transition-colors shadow-sm"><FileText className="w-7 h-7 text-slate-400 group-hover:text-brand" /></div>
                                <div>
                                   <p className="font-black text-[16px] dark:text-white leading-none mb-1.5">Maldivian ID Card</p>
                                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Smart Card standard</p>
                                </div>
                             </div>
                             <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-brand" />
                          </button>
                          <button onClick={() => setVerificationStep('upload')} className="w-full p-6 bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-[32px] flex items-center justify-between hover:border-brand hover:scale-[1.02] active:scale-95 transition-all group">
                             <div className="flex items-center gap-5 text-left">
                                <div className="w-14 h-14 bg-slate-50 dark:bg-dark rounded-2xl flex items-center justify-center group-hover:bg-brand/5 transition-colors shadow-sm"><Globe className="w-7 h-7 text-slate-400 group-hover:text-brand" /></div>
                                <div>
                                   <p className="font-black text-[16px] dark:text-white leading-none mb-1.5">Maldivian Passport</p>
                                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">E-Passport Protocol</p>
                                </div>
                             </div>
                             <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-brand" />
                          </button>
                       </div>
                    </div>
                  )}

                  {verificationStep === 'upload' && (
                    <div className="max-w-md w-full space-y-8 animate-in fade-in slide-in-from-bottom-4">
                       <h4 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Document Acquisition</h4>
                       <div className="w-full aspect-[1.6/1] bg-slate-200/50 dark:bg-dark-surface border-4 border-dashed border-slate-300 dark:border-dark-border rounded-[40px] flex flex-col items-center justify-center relative overflow-hidden group transition-all">
                          <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-all pointer-events-none"></div>
                          <Camera className="w-14 h-14 text-slate-300 mb-4 group-hover:text-brand transition-colors" />
                          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest group-hover:text-brand transition-colors">Capture or Upload ID Front</p>
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={() => setVerificationStep('permission_check')} aria-label="Upload Identification" />
                       </div>
                       <p className="text-slate-400 text-xs font-bold px-8 leading-relaxed">Ensure your document is flat, centered, and well-lit with no glares.</p>
                    </div>
                  )}

                  {verificationStep === 'permission_check' && (
                    <div className="max-w-md w-full space-y-8 animate-in fade-in slide-in-from-bottom-4">
                       <div className="w-24 h-24 bg-brand/10 text-brand rounded-[32px] flex items-center justify-center mx-auto shadow-inner border border-brand/5">
                          <Camera className="w-12 h-12" />
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-3xl font-black dark:text-white uppercase tracking-tighter leading-none">Biometric Access</h4>
                          <p className="text-slate-500 font-medium leading-relaxed">To complete the verification loop, we need to perform a live biometric scan. Ensure you are in a brightly lit environment.</p>
                       </div>
                       <button 
                         onClick={handleStartScan}
                         className="w-full py-5 bg-brand text-white rounded-[24px] font-black text-[13px] uppercase tracking-widest shadow-2xl shadow-brand/20 hover:scale-[1.02] active:scale-95 transition-all"
                       >
                         Initialize Biometrics
                       </button>
                    </div>
                  )}

                  {verificationStep === 'scanning' && (
                    <div className="w-full flex flex-col items-center space-y-10 animate-in fade-in duration-500">
                       <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto">
                          {/* Laser Scan Animation */}
                          <div className="absolute inset-0 z-30 overflow-hidden rounded-full pointer-events-none">
                             <div className="h-1 bg-brand shadow-[0_0_20px_#0047FF,0_0_40px_rgba(0,71,255,0.6)] w-full absolute top-0 animate-[scan_3s_ease-in-out_infinite]"></div>
                             <style>{`
                                @keyframes scan {
                                   0% { transform: translateY(0); }
                                   50% { transform: translateY(320px); }
                                   100% { transform: translateY(0); }
                                }
                             `}</style>
                          </div>

                          {/* Face Guide Overlay */}
                          <div className="absolute inset-0 z-20 border-[3px] border-brand/40 border-dashed rounded-full pointer-events-none flex items-center justify-center">
                             <div className="w-[85%] h-[85%] border-2 border-brand/20 rounded-[45%] flex items-center justify-center relative">
                                <div className="absolute inset-0 border border-brand/10 rounded-[45%] animate-pulse scale-105"></div>
                                <div className="relative w-full h-full">
                                   {/* Simulated Nodal Points */}
                                   <div className={`absolute top-1/4 left-1/4 w-2 h-2 bg-brand rounded-full shadow-[0_0_10px_#0047FF] animate-pulse transition-opacity duration-300 ${scanProgress > 30 ? 'opacity-100' : 'opacity-0'}`}></div>
                                   <div className={`absolute top-1/4 right-1/4 w-2 h-2 bg-brand rounded-full shadow-[0_0_10px_#0047FF] animate-pulse transition-opacity duration-300 ${scanProgress > 35 ? 'opacity-100' : 'opacity-0'}`}></div>
                                   <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand rounded-full shadow-[0_0_10px_#0047FF] animate-pulse transition-opacity duration-300 ${scanProgress > 50 ? 'opacity-100' : 'opacity-0'}`}></div>
                                   <div className={`absolute bottom-1/4 left-1/3 w-2 h-2 bg-brand rounded-full shadow-[0_0_10px_#0047FF] animate-pulse transition-opacity duration-300 ${scanProgress > 70 ? 'opacity-100' : 'opacity-0'}`}></div>
                                   <div className={`absolute bottom-1/4 right-1/3 w-2 h-2 bg-brand rounded-full shadow-[0_0_10px_#0047FF] animate-pulse transition-opacity duration-300 ${scanProgress > 75 ? 'opacity-100' : 'opacity-0'}`}></div>
                                </div>
                             </div>
                          </div>
                          
                          {/* Video Feed */}
                          <div className="absolute inset-0 rounded-full overflow-hidden bg-slate-900 border-4 border-brand/30 shadow-2xl">
                             <video 
                               ref={videoRef}
                               autoPlay 
                               playsInline 
                               muted
                               className="w-full h-full object-cover scale-x-[-1]"
                             />
                          </div>

                          {/* Progress Circle SVG */}
                          <svg className="absolute inset-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)] -rotate-90 z-10">
                            <circle
                              cx="50%"
                              cy="50%"
                              r="48%"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="8"
                              className="text-brand/5"
                            />
                            <circle
                              cx="50%"
                              cy="50%"
                              r="48%"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="8"
                              strokeDasharray="100"
                              strokeDashoffset={100 - scanProgress}
                              strokeLinecap="round"
                              className="text-brand transition-all duration-100"
                              pathLength="100"
                            />
                          </svg>
                       </div>

                       <div className="space-y-6">
                          <h4 className="text-3xl font-black dark:text-white uppercase tracking-tighter leading-none">Biometric Mapping</h4>
                          <div className="flex flex-col items-center gap-4">
                             <div className="flex items-center gap-3 text-brand font-black text-[12px] uppercase tracking-[0.25em]">
                                <RefreshCw className="w-4 h-4 animate-spin" /> {getScanStatus()}
                             </div>
                             <div className="w-56 h-1.5 bg-slate-200 dark:bg-dark-border rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-brand transition-all duration-100" style={{ width: `${scanProgress}%` }}></div>
                             </div>
                          </div>
                       </div>
                    </div>
                  )}

                  {verificationStep === 'error' && (
                    <div className="max-w-md w-full space-y-8 animate-in zoom-in-95 duration-300">
                       <div className="w-24 h-24 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-[32px] flex items-center justify-center mx-auto border border-rose-100 dark:border-rose-500/20 shadow-xl shadow-rose-500/5">
                          <AlertCircle className="w-12 h-12" />
                       </div>
                       <div className="space-y-4 text-center px-4">
                          <h4 className="text-2xl font-black dark:text-white uppercase tracking-tighter leading-tight">Access Protocol Failed</h4>
                          <p className="text-slate-500 font-medium leading-relaxed">{errorMessage}</p>
                       </div>
                       <div className="flex flex-col gap-4 pt-4">
                          <button 
                            onClick={handleStartScan}
                            className="w-full py-5 bg-brand text-white rounded-[24px] font-black text-[12px] uppercase tracking-widest shadow-2xl shadow-brand/20 flex items-center justify-center gap-3"
                          >
                            <RotateCcw className="w-4 h-4" /> Restart Node Scan
                          </button>
                          <button 
                            onClick={() => setVerificationStep('idle')}
                            className="w-full py-4 bg-slate-100 dark:bg-dark-border text-slate-500 rounded-[20px] font-black text-[11px] uppercase tracking-widest"
                          >
                            Return to Vault
                          </button>
                       </div>
                    </div>
                  )}

                  {verificationStep === 'processing' && (
                    <div className="max-w-md w-full space-y-8 animate-in fade-in duration-500 text-center">
                       <div className="w-28 h-28 bg-brand/10 text-brand rounded-[40px] flex items-center justify-center mx-auto animate-pulse shadow-inner border border-brand/5">
                          <Cpu className="w-14 h-14" />
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-3xl font-black dark:text-white uppercase tracking-tighter leading-tight">Neural Sync</h4>
                          <p className="text-slate-500 font-medium leading-relaxed">Cross-referencing biometric signatures with identity document protocol. Finalizing sovereign node entry...</p>
                       </div>
                    </div>
                  )}

                  {verificationStep === 'success' && (
                    <div className="max-w-md w-full space-y-12 animate-in zoom-in-95 duration-500 py-6">
                       <div className="w-28 h-28 bg-emerald-500 text-white rounded-[40px] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/40 relative">
                          <Check className="w-14 h-14 stroke-[5px]" />
                          <div className="absolute -inset-4 border-2 border-emerald-500/20 rounded-[48px] animate-ping opacity-20"></div>
                       </div>
                       <div className="space-y-5 px-4">
                          <h4 className="text-4xl font-black dark:text-white uppercase tracking-tighter leading-none">Protocol <br/>Complete</h4>
                          <p className="text-slate-500 font-medium leading-relaxed">Sovereign identity successfully anchored. Your professional node is now fully verified for island-wide commerce.</p>
                       </div>
                       <button 
                         onClick={() => setVerificationStep('idle')}
                         className="w-full py-6 bg-emerald-600 text-white rounded-[24px] font-black text-[14px] uppercase tracking-widest shadow-2xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                       >
                         Sync Final Node
                       </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeSection === 'studio' && (
            <div className="p-8 md:p-10 space-y-10 animate-in slide-in-from-right-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-dark-border pb-10">
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black uppercase tracking-tighter dark:text-white leading-none">Service Studio</h3>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-none">Craft your sovereign marketplace offerings</p>
                 </div>
                 <button className="flex items-center gap-3 px-8 py-4 bg-brand text-white rounded-[20px] text-[12px] font-black uppercase tracking-widest shadow-2xl shadow-brand/30 hover:scale-105 active:scale-95 transition-all">
                    <Plus className="w-5 h-5" /> New Listing Node
                 </button>
              </div>

              <div className="space-y-8">
                {MOCK_SERVICES.map(service => (
                  <div key={service.id} className="p-10 border border-slate-100 dark:border-dark-border rounded-[48px] bg-slate-50/50 dark:bg-dark/40 shadow-sm">
                    <div className="flex flex-col xl:flex-row gap-12">
                      <div className="flex-1 space-y-10">
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Primary Service Title</label>
                          <h4 className="text-3xl font-black dark:text-white tracking-tighter uppercase leading-none">{service.title}</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {Object.entries(service.tiers).map(([tier, data]) => (
                            <div key={tier} className="p-6 bg-white dark:bg-dark border border-slate-100 dark:border-dark-border rounded-[32px] group hover:border-brand transition-all shadow-sm">
                               <div className="flex justify-between items-center mb-4">
                                  <span className="text-[10px] font-black text-brand uppercase tracking-widest bg-brand/5 dark:bg-brand/10 px-4 py-1.5 rounded-full">{tier}</span>
                                  <span className="font-black text-xl dark:text-white">{data.price}</span>
                               </div>
                               <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">{data.description}</p>
                               <div className="flex items-center gap-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                  <span className="flex items-center gap-1.5"><RefreshCw className="w-3 h-3" /> {data.delivery}</span>
                                  <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" /> {data.revisions} Revisions</span>
                               </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="w-full xl:w-[320px] shrink-0">
                         <div className="sticky top-8 space-y-5">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-4">Marketplace Preview</label>
                            <div className="bg-white dark:bg-dark border border-slate-100 dark:border-dark-border rounded-[40px] p-6 shadow-2xl shadow-brand/5 scale-[0.95] origin-top border-brand/5">
                               <div className="aspect-video bg-slate-50 dark:bg-dark-surface rounded-3xl mb-5 flex items-center justify-center text-slate-200 shadow-inner"><Layout className="w-12 h-12" /></div>
                               <h5 className="font-black text-[17px] dark:text-white mb-2 truncate uppercase tracking-tighter">{service.title}</h5>
                               <div className="flex items-center justify-between pt-5 border-t border-slate-50 dark:border-dark-border mt-3">
                                  <span className="text-brand font-black text-xl">{service.tiers.basic.price}</span>
                                  <div className="flex items-center gap-1.5">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-[12px] font-black dark:text-white">4.9</span>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="px-10 py-8 bg-white dark:bg-dark-surface border-t border-slate-100 dark:border-dark-border flex justify-end gap-5 mt-auto">
            <button className="px-10 py-4 bg-brand text-white rounded-[20px] text-[12px] font-black uppercase tracking-widest shadow-2xl shadow-brand/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
               <Check className="w-5 h-5 stroke-[4px]" /> Sync Global Hub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;