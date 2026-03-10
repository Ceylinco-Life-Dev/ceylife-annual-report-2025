'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import OpenAI from 'openai';
import ReactMarkdown from 'react-markdown';

/* ─── Config ──────────────────────────────────────────────────── */
const GOOGLE_TTS_API_KEY = 'AIzaSyDV_4eSGDYv9n8yRFkMYQJBtu_Wo2odLH4';
const ASSISTANT_ID       = 'asst_dBamTMGuCdBm6SsMaZdTjifO';

const SYSTEM_PROMPT = `You are a helpful virtual assistant EXCLUSIVELY for answering questions about the Ceylinco Life Insurance Limited 2025 Annual Report.

STRICT RULES:
- ONLY answer questions that can be found in the 2025 Annual Report
- If a question is NOT in the annual report, politely say: "I can only answer questions about the Ceylinco Life 2025 Annual Report. Please ask something about the report contents."
- Do NOT answer general questions, even if they are about insurance
- Do NOT make up information - only use data from the report
- If you are unsure, suggest the user visit www.ceylincolife.com or contact an agent
Keep answers professional, concise, and friendly.`;

const TTS_VOICE = { languageCode: 'en-us', name: 'en-US-Chirp3-HD-Aoede', ssmlGender: 'FEMALE' };

const WELCOME_MSG = {
  id: 1,
  role: 'bot' as const,
  text: "Welcome to Ceylinco Life Insurance! I'm your virtual assistant for the 2025 Annual Report. How may I assist you today?",
};

const CHIPS = [
  'Key highlights of 2025?',
  'Who is the Chairman?',
  'Life Fund performance?',
  'Market position?',
];

const VOICE_CORRECTIONS: [RegExp, string][] = [
  [/selling call life/gi, 'Ceylinco Life'],
  [/sailing call life/gi, 'Ceylinco Life'],
  [/say lingo life/gi,   'Ceylinco Life'],
  [/seylinco life/gi,    'Ceylinco Life'],
  [/se[yi]l[iy]nco/gi,  'Ceylinco'],
  [/selling co/gi,       'Ceylinco'],
  [/celine co/gi,        'Ceylinco'],
];

function correctVoice(text: string) {
  let t = text;
  for (const [p, r] of VOICE_CORRECTIONS) t = t.replace(p, r);
  return t;
}

function fmt() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/* ─── OpenAI Assistants ──────────────────────────────────────── */
async function getBotReply(text: string, threadId: string | null) {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  let tid = threadId;
  if (!tid) { const thread = await client.beta.threads.create(); tid = thread.id; }
  await client.beta.threads.messages.create(tid, { role: 'user', content: text });
  const run = await client.beta.threads.runs.createAndPoll(tid, {
    assistant_id: ASSISTANT_ID, instructions: SYSTEM_PROMPT,
  });
  if (run.status !== 'completed') throw new Error(`Run failed: ${run.status}`);
  const msgs = await client.beta.threads.messages.list(tid);
  const content = msgs.data[0].content[0];
  if (content.type !== 'text') throw new Error('Unexpected content type');
  return { text: content.text.value.replace(/【[^】]*】/g, '').trim(), threadId: tid };
}

/* ─── Google TTS ─────────────────────────────────────────────── */
async function fetchTTS(text: string) {
  const res = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_TTS_API_KEY}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: { text }, voice: TTS_VOICE, audioConfig: { audioEncoding: 'MP3', speakingRate: 1.0, pitch: 0 } }) }
  );
  if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error((e as { error?: { message?: string } }).error?.message || `TTS error ${res.status}`); }
  const data = await res.json() as { audioContent: string };
  return `data:audio/mp3;base64,${data.audioContent}`;
}

/* ─── Siri Orb ───────────────────────────────────────────────── */
function SiriOrbHeader({ listening, speaking }: { listening: boolean; speaking: boolean }) {
  const active = listening || speaking;
  const speed  = speaking ? '1.2s' : listening ? '1.8s' : '5s';
  const size   = 52;

  return (
    <div style={{ position: 'relative', width: size, height: size, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
      boxShadow: active
        ? speaking
          ? '0 0 0 3px rgba(245,166,35,0.4), 0 0 28px rgba(245,166,35,0.5)'
          : '0 0 0 3px rgba(38,198,218,0.4), 0 0 28px rgba(38,198,218,0.5)'
        : '0 0 0 1.5px rgba(38,198,218,0.2), 0 4px 16px rgba(38,198,218,0.15)',
      transition: 'box-shadow 0.5s ease',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: '#0a0f1e' }} />
      <div style={{ position: 'absolute', width: '150%', height: '130%', top: '-15%', left: '-15%',
        background: speaking
          ? 'conic-gradient(from 0deg at 40% 40%, #F5A623 0deg, transparent 100deg, #CE93D8 200deg, #FF6B6B 300deg, transparent 360deg)'
          : 'conic-gradient(from 0deg at 38% 42%, #26C6DA 0deg, transparent 110deg, #66BB6A 200deg, transparent 310deg)',
        animation: `siriH1 ${speed} linear infinite`,
        opacity: 0.9, filter: 'blur(2px)', transition: 'background 0.8s ease',
      }} />
      <div style={{ position: 'absolute', width: '130%', height: '130%', top: '-15%', left: '-15%',
        background: speaking
          ? 'conic-gradient(from 120deg at 60% 55%, #FF8C42 0deg, transparent 120deg, #F5A623 240deg, transparent 360deg)'
          : 'conic-gradient(from 60deg at 62% 58%, #4FC3F7 0deg, transparent 110deg, #CE93D8 220deg, transparent 340deg)',
        animation: `siriH2 ${speed} linear infinite reverse`,
        opacity: 0.65, filter: 'blur(3px)', transition: 'background 0.8s ease',
      }} />
      <div style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.32) 0%, transparent 58%)',
        animation: `siriGlowH ${speed} ease-in-out infinite`,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.05)' }} />

      {/* Center icon */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {listening ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="rgba(255,255,255,0.2)"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        ) : speaking ? (
          /* Waveform bars when speaking */
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {[1, 1.6, 1, 1.8, 1, 1.4, 1].map((s, i) => (
              <div key={i} style={{ width: '2.5px', borderRadius: '2px', background: 'rgba(255, 255, 255, 0)',
                height: `${10 * s}px`, animation: `siriBar ${0.6 + i * 0.07}s ${i * 0.08}s ease-in-out infinite alternate` }} />
            ))}
          </div>
        ) : (
          <svg width="18" height="18" viewBox="0 0 32 32" style={{ opacity: 0.85 }}>
            <polygon points="16,3 17.5,13 16,15 14.5,13" fill="#F5A623"/>
            <polygon points="16,29 17.5,19 16,17 14.5,19" fill="rgba(200,220,255,0.8)"/>
            <polygon points="29,16 19,14.5 17,16 19,17.5" fill="rgba(200,220,255,0.6)"/>
            <polygon points="3,16  13,14.5 15,16 13,17.5" fill="rgba(200,220,255,0.6)"/>
            <circle cx="16" cy="16" r="2.8" fill="rgba(10,15,30,0.85)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
            <circle cx="16" cy="16" r="1.4" fill="#26C6DA"/>
          </svg>
        )}
      </div>
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────────── */
const SpinnerIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
    style={{ animation: 'chatSpin 0.75s linear infinite', display: 'block' }}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

const SpeakerIcon = ({ size = 12, filled = false }: { size?: number; filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={filled ? 'currentColor' : 'none'}/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    {filled && <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>}
  </svg>
);

interface Msg { id: number; role: 'user' | 'bot'; text?: string; typing?: boolean; time: string; }

const Bubble = ({ msg, onSpeak, isSpeaking, ttsLoading }: { msg: Msg; onSpeak: (m: Msg) => void; isSpeaking: boolean; ttsLoading: boolean; }) => {
  const isUser = msg.role === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', animation: 'chatFadeUp .25s ease both' }}>
      <div style={{ maxWidth: '78%' }}>
        <div style={{
          padding: '10px 14px',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          background: isUser
            ? 'linear-gradient(135deg, #0097A7, #005B6E)'
            : '#F0F6FA',
          border: isUser ? 'none' : '1px solid rgba(38,198,218,0.15)',
          color: isUser ? '#fff' : '#1a2e3a',
          fontSize: '13px', lineHeight: '1.6', wordBreak: 'break-word',
          boxShadow: isUser ? '0 3px 14px rgba(0,150,180,0.25)' : '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          {msg.typing
            ? <div style={{ display: 'flex', gap: '4px', padding: '2px 0' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#94a3b8', animation: `chatDot 1.2s ${i * 0.2}s infinite` }} />
                ))}
              </div>
            : isUser ? msg.text : (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p style={{ margin: '0 0 6px 0', lineHeight: '1.6' }}>{children}</p>,
                    strong: ({ children }) => <strong style={{ color: '#0097A7', fontWeight: 600 }}>{children}</strong>,
                    ol: ({ children }) => <ol style={{ paddingLeft: '16px', margin: '4px 0' }}>{children}</ol>,
                    ul: ({ children }) => <ul style={{ paddingLeft: '16px', margin: '4px 0' }}>{children}</ul>,
                    li: ({ children }) => <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>{children}</li>,
                  }}
                >{msg.text || ''}</ReactMarkdown>
              )
          }
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px', padding: isUser ? '0 4px 0 0' : '0 0 0 4px', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
          <span style={{ fontSize: '10px', color: '#a0b0bc', fontFamily: 'monospace' }}>{msg.time}</span>
          {!isUser && !msg.typing && (
            <button onClick={() => onSpeak(msg)}
              style={{ background: isSpeaking ? 'rgba(0,151,167,0.1)' : 'rgba(0,0,0,0.04)', border: `1px solid ${isSpeaking ? 'rgba(0,151,167,0.35)' : 'rgba(0,0,0,0.08)'}`, borderRadius: '16px', padding: '2px 7px', cursor: 'pointer', color: isSpeaking ? '#0097A7' : '#64748b', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', transition: 'all .2s' }}>
              {ttsLoading ? <SpinnerIcon size={10} /> : <SpeakerIcon size={11} filled={isSpeaking} />}
              <span>{isSpeaking ? 'stop' : 'speak'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Main Popup ─────────────────────────────────────────────── */
export default function ChatbotPopup({ onClose }: { onClose: () => void }) {
  const [messages, setMessages]       = useState<Msg[]>([{ ...WELCOME_MSG, time: fmt() }]);
  const [inputText, setInputText]     = useState('');
  const [interimText, setInterimText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId]   = useState<number | null>(null);
  const [ttsLoading, setTtsLoading]   = useState(false);
  const [micError, setMicError]       = useState('');
  const [ttsError, setTtsError]       = useState('');

  const threadIdRef    = useRef<string | null>(null);
  const audioRef       = useRef<HTMLAudioElement | null>(null);
  const speakLockRef   = useRef(false);
  const speakingMsgRef = useRef<number | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef    = useRef<HTMLTextAreaElement>(null);
  const nextId         = useRef(10);
  const interimTextRef = useRef('');
  const welcomeSpokenRef = useRef(false);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, interimText]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ''; audioRef.current = null; }
    speakLockRef.current = false; speakingMsgRef.current = null;
    setSpeakingId(null); setTtsLoading(false);
  }, []);

  const speakMessage = useCallback(async (msg: Msg) => {
    if (speakingMsgRef.current === msg.id) { stopAudio(); return; }
    stopAudio();
    if (speakLockRef.current) return;
    speakLockRef.current = true; speakingMsgRef.current = msg.id;
    setTtsLoading(true); setTtsError('');
    try {
      const src = await fetchTTS(msg.text || '');
      if (!speakLockRef.current || speakingMsgRef.current !== msg.id) return;
      const audio = new Audio();
      audio.preload = 'auto';
      await new Promise<void>((resolve, reject) => {
        audio.oncanplaythrough = () => {
          audioRef.current = audio; setSpeakingId(msg.id); setTtsLoading(false);
          audio.onended = () => { if (speakingMsgRef.current === msg.id) stopAudio(); };
          audio.onerror = () => reject(new Error('Playback error'));
          audio.play().then(resolve).catch(reject);
        };
        audio.onerror = () => reject(new Error('Audio load error'));
        audio.src = src; audio.load();
      });
    } catch (err) {
      const e = err as Error;
      if (e.name !== 'NotAllowedError') setTtsError(e.message || 'Audio playback failed.');
      stopAudio();
    }
  }, [stopAudio]);

  useEffect(() => {
    if (welcomeSpokenRef.current) return;
    welcomeSpokenRef.current = true;
    const t = setTimeout(() => speakMessage({ ...WELCOME_MSG, time: fmt() }), 900);
    return () => clearTimeout(t);
  }, [speakMessage]);

  const dispatch = useCallback(async (text: string, isVoice = false) => {
    const clean = isVoice ? correctVoice(text.trim()) : text.trim();
    if (!clean) return;
    setInterimText(''); setInputText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    const uid = nextId.current++, tid = nextId.current++;
    setMessages(prev => [...prev,
      { id: uid, role: 'user', text: clean, time: fmt() },
      { id: tid, role: 'bot', typing: true, time: fmt() },
    ]);
    try {
      const { text: reply, threadId } = await getBotReply(clean, threadIdRef.current);
      threadIdRef.current = threadId;
      const botMsg: Msg = { id: tid, role: 'bot', text: reply, time: fmt() };
      setMessages(prev => prev.map(m => m.id === tid ? botMsg : m));
      if (isVoice) speakMessage(botMsg);
    } catch (err) {
      const e = err as Error;
      setMessages(prev => prev.map(m => m.id === tid ? { id: tid, role: 'bot', text: `Sorry, I encountered an error: ${e.message}`, time: fmt() } : m));
    }
  }, [speakMessage]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) { (recognitionRef.current as { _run?: boolean })._run = false; recognitionRef.current.stop(); }
    setIsListening(false);
    if (interimTextRef.current.trim()) setInputText(prev => correctVoice((prev + ' ' + interimTextRef.current).trim()));
    interimTextRef.current = ''; setInterimText('');
  }, []);

  const toggleListening = () => {
    setMicError('');
    if (isListening) { stopListening(); return; }
    const SR = window.SpeechRecognition || (window as { webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition;
    if (!SR) { setMicError('Voice input not supported. Use Chrome, Edge, or Safari.'); return; }
    stopAudio();
    const rec = new SR();
    rec.continuous = true; rec.interimResults = true; rec.lang = 'en-US';
    rec.onresult = (e: SpeechRecognitionEvent) => {
      let interim = '', final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t; else interim += t;
      }
      interimTextRef.current = interim; setInterimText(interim);
      if (final.trim()) setInputText(prev => correctVoice((prev + ' ' + final).trim()));
    };
    rec.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (e.error === 'not-allowed') setMicError('Microphone access denied.');
      else if (e.error !== 'no-speech') setMicError(`Voice error: ${e.error}`);
      setIsListening(false);
    };
    rec.onend = () => { if ((rec as { _run?: boolean })._run) try { rec.start(); } catch (_) {} };
    (rec as { _run?: boolean })._run = true; recognitionRef.current = rec;
    try { rec.start(); setIsListening(true); } catch { setMicError('Could not start microphone.'); }
  };

  const handleSend = () => {
    const text = (inputText + ' ' + interimText).trim();
    if (!text) return;
    if (isListening) stopListening();
    dispatch(text, false);
  };

  const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    const ta = textareaRef.current;
    if (ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 110) + 'px'; }
  };
  const canSend = !!(inputText.trim() || interimText.trim());
  const isSpeaking = speakingId !== null;

  return (
    <>
      <style>{`
        @keyframes chatFadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes chatSpin   { to{transform:rotate(360deg)} }
        @keyframes chatDot    { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }
        @keyframes chatBlink  { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes popupIn    { from{opacity:0;transform:translate(-50%,-50%) scale(0.92)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
        @keyframes backdropIn { from{opacity:0} to{opacity:1} }

        @keyframes siriH1     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes siriH2     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes siriGlowH  { 0%,100%{opacity:0.5;transform:scale(0.9)} 50%{opacity:1;transform:scale(1.12)} }
        @keyframes siriBar    { from{height:3px} to{height:16px} }

        .chat-msgs::-webkit-scrollbar { width: 3px; }
        .chat-msgs::-webkit-scrollbar-thumb { background: rgba(38,198,218,0.2); border-radius: 3px; }
        .chat-chip { transition: all .18s ease; }
        .chat-chip:hover { background: rgba(38,198,218,0.12) !important; border-color: rgba(0,151,167,0.4) !important; color: #0097A7 !important; transform: translateY(-1px); }
        .chat-send:not(:disabled):hover { transform: scale(1.08); filter: brightness(1.08); }
        .chat-textarea:focus { outline: none; }
      `}</style>

      {/* Backdrop */}
      <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:9998, background:'rgba(10,20,40,0.45)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', animation:'backdropIn 0.25s ease' }} />

      {/* Popup */}
      <div onClick={e => e.stopPropagation()} style={{
        position:'fixed', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        zIndex:9999,
        width:'80%',
        height:'clamp(520px, 86vh, 780px)',
        display:'flex', flexDirection:'column',
        background:'rgba(250,253,255,0.98)',
        backdropFilter:'blur(30px)',
        WebkitBackdropFilter:'blur(30px)',
        borderRadius:'1.75rem',
        border:'1px solid rgba(38,198,218,0.15)',
        boxShadow:'0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.8), 0 0 60px rgba(38,198,218,0.06)',
        overflow:'hidden',
        animation:'popupIn 0.3s cubic-bezier(.34,1.56,.64,1) forwards',
        fontFamily:"'Inter', -apple-system, sans-serif",
      }}>

        {/* Header */}
        <div style={{ padding:'1rem 1.25rem 0.85rem', borderBottom:'1px solid rgba(38,198,218,0.1)', display:'flex', alignItems:'center', gap:'0.85rem', flexShrink:0, background:'rgba(255,255,255,0.7)' }}>
          <SiriOrbHeader listening={isListening} speaking={isSpeaking} />
          <div style={{ flex:1 }}>
            <p style={{ margin:0, fontSize:'0.85rem', fontWeight:700, color:'#0a1a2a', letterSpacing:'0.02em' }}>Ceylinco Life AI Assistant</p>
          </div>
          <button onClick={onClose} style={{ background:'rgba(0,0,0,0.05)', border:'1px solid rgba(0,0,0,0.08)', borderRadius:'50%', width:'2rem', height:'2rem', cursor:'pointer', color:'#64748b', fontSize:'1.1rem', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s', flexShrink:0 }}>×</button>
        </div>

        {/* Messages */}
        <div className="chat-msgs" style={{ flex:1, overflowY:'auto', padding:'1rem 1.2rem 0.5rem', display:'flex', flexDirection:'column', gap:'10px', background:'#f7fafe' }}>
          {messages.map(msg => (
            <Bubble key={msg.id} msg={msg} onSpeak={speakMessage} isSpeaking={speakingId === msg.id} ttsLoading={ttsLoading && speakingMsgRef.current === msg.id} />
          ))}
          {interimText && (
            <div style={{ display:'flex', justifyContent:'flex-end' }}>
              <div style={{ maxWidth:'78%', padding:'9px 13px', borderRadius:'18px 18px 4px 18px', background:'rgba(38,198,218,0.06)', border:'1px dashed rgba(0,151,167,0.3)', color:'#0097A7', fontSize:'13px', fontStyle:'italic', display:'flex', alignItems:'center', gap:'7px' }}>
                <span style={{ animation:'chatBlink 1s infinite', fontSize:'8px' }}>●</span>{interimText}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Status strips */}
        {(isListening || isSpeaking) && (
          <div style={{ padding:'0 1.2rem 0.4rem', display:'flex', flexDirection:'column', gap:'4px', flexShrink:0, background:'#f7fafe' }}>
            {isListening && (
              <div style={{ padding:'6px 12px', background:'rgba(38,198,218,0.06)', border:'1px solid rgba(38,198,218,0.2)', borderRadius:'10px', display:'flex', alignItems:'center', gap:'10px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'2px', height:'20px' }}>
                  {Array(10).fill(0).map((_,i) => <div key={i} style={{ width:'2.5px', borderRadius:'2px', background:'#0097A7', height:'4px', animation:`siriBar ${0.5+i*0.06}s ${i*0.06}s ease-in-out infinite alternate` }} />)}
                </div>
                <span style={{ color:'#0097A7', fontSize:'11px', fontWeight:500 }}>Listening…</span>
                <button onClick={stopListening} style={{ marginLeft:'auto', background:'rgba(0,151,167,0.08)', border:'1px solid rgba(0,151,167,0.2)', borderRadius:'8px', padding:'2px 9px', color:'#0097A7', fontSize:'10px', cursor:'pointer' }}>stop ■</button>
              </div>
            )}
            {isSpeaking && (
              <div style={{ padding:'6px 12px', background:'rgba(245,166,35,0.05)', border:'1px solid rgba(245,166,35,0.2)', borderRadius:'10px', display:'flex', alignItems:'center', gap:'10px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'2px', height:'20px' }}>
                  {[1,1.6,1,1.8,1,1.4,1].map((s,i) => <div key={i} style={{ width:'2.5px', borderRadius:'2px', background:'#F5A623', height:`${8*s}px`, animation:`siriBar ${0.5+i*0.07}s ${i*0.07}s ease-in-out infinite alternate` }} />)}
                </div>
                <span style={{ color:'#b07800', fontSize:'11px', fontWeight:500 }}>Speaking…</span>
                <button onClick={stopAudio} style={{ marginLeft:'auto', background:'rgba(245,166,35,0.08)', border:'1px solid rgba(245,166,35,0.2)', borderRadius:'8px', padding:'2px 9px', color:'#b07800', fontSize:'10px', cursor:'pointer' }}>stop ■</button>
              </div>
            )}
          </div>
        )}

        {/* Suggestion chips */}
        <div style={{ padding:'0.5rem 1.2rem', display:'flex', flexWrap:'wrap', gap:'0.4rem', flexShrink:0, background:'rgba(255,255,255,0.6)', borderTop:'1px solid rgba(38,198,218,0.06)' }}>
          {CHIPS.map(chip => (
            <button key={chip} className="chat-chip" onClick={() => dispatch(chip, false)}
              style={{ background:'rgba(255,255,255,0.9)', border:'1px solid rgba(38,198,218,0.2)', borderRadius:'20px', padding:'5px 13px', color:'#334e5e', fontSize:'11.5px', cursor:'pointer', boxShadow:'0 1px 4px rgba(0,0,0,0.05)', whiteSpace:'nowrap' }}>
              {chip}
            </button>
          ))}
        </div>

        {/* Error banners */}
        {(micError || ttsError) && (
          <div style={{ padding:'0 1.2rem', display:'flex', flexDirection:'column', gap:'4px', flexShrink:0 }}>
            {micError && <div style={{ padding:'7px 12px', background:'rgba(239,68,68,0.05)', border:'1px solid rgba(239,68,68,0.15)', borderRadius:'8px', color:'#b91c1c', fontSize:'11px', display:'flex', alignItems:'center', gap:'6px' }}>⚠ {micError}<button onClick={() => setMicError('')} style={{ marginLeft:'auto', background:'none', border:'none', color:'#94a3b8', cursor:'pointer', fontSize:'13px' }}>✕</button></div>}
            {ttsError && <div style={{ padding:'7px 12px', background:'rgba(0,151,167,0.05)', border:'1px solid rgba(0,151,167,0.15)', borderRadius:'8px', color:'#0097A7', fontSize:'11px', display:'flex', alignItems:'center', gap:'6px' }}>⚠ {ttsError}<button onClick={() => setTtsError('')} style={{ marginLeft:'auto', background:'none', border:'none', color:'#94a3b8', cursor:'pointer', fontSize:'13px' }}>✕</button></div>}
          </div>
        )}

        {/* Input bar */}
        <div style={{ padding:'0.7rem 1.2rem 1rem', borderTop:'1px solid rgba(0,0,0,0.06)', flexShrink:0, background:'rgba(255,255,255,0.85)' }}>
          <div style={{ display:'flex', alignItems:'flex-end', gap:'8px', background:'#fff', border:'1.5px solid rgba(38,198,218,0.22)', borderRadius:'24px', padding:'8px 8px 8px 16px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
            <textarea
              ref={textareaRef} rows={1} value={inputText}
              onChange={handleInput} onKeyDown={handleKey}
              placeholder="Ask about the 2025 Annual Report…"
              className="chat-textarea"
              style={{ flex:1, background:'none', border:'none', color:'#0a1a2a', fontSize:'13px', fontFamily:'inherit', resize:'none', lineHeight:'1.55', maxHeight:'110px', overflowY:'auto', caretColor:'#0097A7', minWidth:0, outline:'none' }}
            />
            {/* Mic */}
            <button onClick={toggleListening} title={isListening ? 'Stop' : 'Voice input'}
              style={{ width:'34px', height:'34px', borderRadius:'50%', border:`1.5px solid ${isListening ? 'rgba(0,151,167,0.5)' : 'rgba(0,0,0,0.1)'}`, background: isListening ? 'rgba(0,151,167,0.1)' : 'rgba(0,0,0,0.03)', color: isListening ? '#0097A7' : '#64748b', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s', flexShrink:0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                {isListening
                  ? <rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor" stroke="none"/>
                  : <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>
                }
              </svg>
            </button>
            {/* Send */}
            <button className="chat-send" onClick={handleSend} disabled={!canSend} title="Send (Enter)"
              style={{ width:'38px', height:'38px', borderRadius:'50%', border:'none', background: canSend ? 'linear-gradient(135deg, #00BCD4, #0097A7)' : 'rgba(0,0,0,0.05)', color: canSend ? '#fff' : '#c0cdd8', cursor: canSend ? 'pointer' : 'default', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s', boxShadow: canSend ? '0 3px 12px rgba(0,188,212,0.35)' : 'none', flexShrink:0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
          <p style={{ margin:'0.4rem 0 0', textAlign:'center', fontSize:'10px', color:'#a0b4c0' }}>
            Powered by <span style={{ color:'#0097A7', fontWeight:600 }}>Ceylinco Life Insurance</span>
          </p>
        </div>
      </div>
    </>
  );
}
