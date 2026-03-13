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

/* ─── Module-level audio singleton ───────────────────────────── */
let _audio: HTMLAudioElement | null = null;
let _audioMsgId: number | null = null;
let _audioLock = false;

function _stopAudio() {
  if (_audio) { _audio.pause(); _audio.src = ''; _audio = null; }
  _audioMsgId = null;
  _audioLock  = false;
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

/* ─── Siri Orb (header) ──────────────────────────────────────── */
function SiriOrbHeader({ listening, speaking }: { listening: boolean; speaking: boolean }) {
  const active = listening || speaking;
  const speed  = speaking ? '1.2s' : listening ? '1.8s' : '5s';
  const size   = 48;
  return (
    <div style={{ position: 'relative', width: size, height: size, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
      boxShadow: active
        ? speaking ? '0 0 0 3px rgba(245,166,35,0.4), 0 0 24px rgba(245,166,35,0.5)'
          : '0 0 0 3px rgba(38,198,218,0.4), 0 0 24px rgba(38,198,218,0.5)'
        : '0 0 0 1.5px rgba(38,198,218,0.25), 0 4px 16px rgba(38,198,218,0.2)',
      transition: 'box-shadow 0.5s ease',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: '#0a0f1e11' }} />
      <div style={{ position: 'absolute', width: '150%', height: '130%', top: '-15%', left: '-15%',
        background: speaking
          ? 'conic-gradient(from 0deg at 40% 40%, #F5A623 0deg, transparent 100deg, #CE93D8 200deg, #FF6B6B 300deg, transparent 360deg)'
          : 'conic-gradient(from 0deg at 38% 42%, #26C6DA 0deg, transparent 110deg, #66BB6A 200deg, transparent 310deg)',
        animation: `siriH1 ${speed} linear infinite`, opacity: 0.9, filter: 'blur(2px)', transition: 'background 0.8s ease',
      }} />
      <div style={{ position: 'absolute', width: '130%', height: '130%', top: '-15%', left: '-15%',
        background: speaking
          ? 'conic-gradient(from 120deg at 60% 55%, #FF8C42 0deg, transparent 120deg, #F5A623 240deg, transparent 360deg)'
          : 'conic-gradient(from 60deg at 62% 58%, #4FC3F7 0deg, transparent 110deg, #CE93D8 220deg, transparent 340deg)',
        animation: `siriH2 ${speed} linear infinite reverse`, opacity: 0.65, filter: 'blur(3px)', transition: 'background 0.8s ease',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.28) 0%, transparent 58%)', animation: `siriGlowH ${speed} ease-in-out infinite` }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {listening ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="rgba(255, 255, 255, 0.01)"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        ) : speaking ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {[1, 1.6, 1, 1.8, 1, 1.4, 1].map((s, i) => (
              <div key={i} style={{ width: '2px', borderRadius: '2px', background: 'rgba(255,255,255,0.9)', height: `${8 * s}px`, animation: `siriBar ${0.6 + i * 0.07}s ${i * 0.08}s ease-in-out infinite alternate` }} />
            ))}
          </div>
        ) : (
          <svg width="16" height="16" viewBox="0 0 32 32" style={{ opacity: 0.9 }}>
            <polygon points="16,3 17.5,13 16,15 14.5,13" fill="#F5A623"/>
            <polygon points="16,29 17.5,19 16,17 14.5,19" fill="rgba(200,220,255,0.8)"/>
            <polygon points="29,16 19,14.5 17,16 19,17.5" fill="rgba(200,220,255,0.6)"/>
            <polygon points="3,16  13,14.5 15,16 13,17.5" fill="rgba(200,220,255,0.6)"/>
            <circle cx="16" cy="16" r="2.8" fill="rgba(10, 15, 30, 0)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
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
          background: isUser ? 'linear-gradient(135deg, #0097A7, #005B6E)' : 'rgba(255,255,255,0.92)',
          border: isUser ? 'none' : '1px solid rgba(38,198,218,0.22)',
          color: isUser ? '#fff' : '#334155',
          fontSize: '13px', lineHeight: '1.6', wordBreak: 'break-word',
          boxShadow: isUser ? '0 3px 14px rgba(0,150,180,0.3)' : '0 2px 12px rgba(0,0,0,0.07)',
        }}>
          {msg.typing
            ? <div style={{ display: 'flex', gap: '4px', padding: '2px 0' }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(38,198,218,0.6)', animation: `chatDot 1.2s ${i * 0.2}s infinite` }} />)}
              </div>
            : isUser ? msg.text : (
                <ReactMarkdown components={{
                  p: ({ children }) => <p style={{ margin: '0 0 6px 0', lineHeight: '1.6' }}>{children}</p>,
                  strong: ({ children }) => <strong style={{ color: '#0891b2', fontWeight: 600 }}>{children}</strong>,
                  ol: ({ children }) => <ol style={{ paddingLeft: '16px', margin: '4px 0' }}>{children}</ol>,
                  ul: ({ children }) => <ul style={{ paddingLeft: '16px', margin: '4px 0' }}>{children}</ul>,
                  li: ({ children }) => <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>{children}</li>,
                }}>{msg.text || ''}</ReactMarkdown>
              )
          }
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px', padding: isUser ? '0 4px 0 0' : '0 0 0 4px', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
          <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>{msg.time}</span>
          {!isUser && !msg.typing && (
            <button onClick={() => onSpeak(msg)}
              style={{ background: isSpeaking ? 'rgba(38,198,218,0.12)' : 'rgba(38,198,218,0.06)', border: `1px solid ${isSpeaking ? 'rgba(38,198,218,0.4)' : 'rgba(38,198,218,0.18)'}`, borderRadius: '16px', padding: '2px 7px', cursor: 'pointer', color: isSpeaking ? '#0891b2' : '#64748b', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', transition: 'all .2s' }}>
              {ttsLoading ? <SpinnerIcon size={10} /> : <SpeakerIcon size={11} filled={isSpeaking} />}
              <span>{isSpeaking ? 'stop' : 'speak'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Ceylena Side Character ─────────────────────────────────── */
// Image is 569×390 RGBA. Character occupies roughly the left 310px of width, full height.
// At display height 220px → auto width ≈ 321px. 170px-wide container shows 301px of original ≈ character edge.
function CeylenaPanel({ speaking, typing }: { speaking: boolean; typing: boolean }) {
  return (
    <div className="ceylena-panel" style={{
      width: '170px',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      position: 'relative',
    }}>

      {/* Soft crimson glow behind character matching saree */}
      <div style={{
        position: 'absolute', bottom: '10px', left: '15px',
        width: '140px', height: '140px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(160,25,45,0.28) 0%, rgba(38,198,218,0.04) 55%, transparent 75%)',
        filter: 'blur(20px)',
        animation: 'ceylenaGlow 4s ease-in-out infinite',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Character — 170px wide container clips right empty space of the PNG */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '170px',
        overflow: 'hidden',
        animation: 'ceylenaSlideUp 0.65s cubic-bezier(.34,1.56,.64,1) 0.1s both',
      }}>
        <img
          src="/images/AIChatbot.png"
          alt="Ceylena"
          style={{
            height: '220px',   // drive height; auto-width ≈ 321px → 170px container shows ~301px of original ≈ character edge
            width: 'auto',
            maxWidth: 'none',
            display: 'block',
            transition: 'filter 0.4s ease, transform 0.4s ease',
            filter: speaking
              ? 'drop-shadow(0 0 14px rgba(245,166,35,0.55))'
              : 'drop-shadow(0 4px 14px rgba(120,20,35,0.35))',
            animation: speaking ? 'ceylenaSpeak 0.85s ease-in-out infinite alternate' : 'none',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Main Popup ─────────────────────────────────────────────── */
export default function ChatbotPopup({ onClose }: { onClose: () => void }) {
  const [messages, setMessages]       = useState<Msg[]>([{ ...WELCOME_MSG, time: fmt() }]);
  const [inputText, setInputText]     = useState('');
  const [interimText, setInterimText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId]   = useState<number | null>(null);
  const [ttsLoading, setTtsLoading]   = useState(false);
  const [isTyping, setIsTyping]       = useState(false);
  const [micError, setMicError]       = useState('');
  const [ttsError, setTtsError]       = useState('');
  const [voiceConsent, setVoiceConsent] = useState<boolean | null>(null);

  const threadIdRef      = useRef<string | null>(null);
  const speakingMsgRef   = useRef<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef   = useRef<any>(null);
  const messagesEndRef   = useRef<HTMLDivElement>(null);
  const textareaRef      = useRef<HTMLTextAreaElement>(null);
  const nextId           = useRef(10);
  const interimTextRef   = useRef('');
  const welcomeSpokenRef = useRef(false);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, interimText]);

  // Stop all audio when popup unmounts (prevents audio continuing after popup closes)
  useEffect(() => {
    return () => { _stopAudio(); setSpeakingId(null); setTtsLoading(false); };
  }, []);

  const stopAudio = useCallback(() => {
    _stopAudio();
    speakingMsgRef.current = null;
    setSpeakingId(null);
    setTtsLoading(false);
  }, []);

  const speakMessage = useCallback(async (msg: Msg) => {
    if (_audioMsgId === msg.id) { stopAudio(); return; }
    stopAudio();
    if (_audioLock) return;
    _audioLock = true; speakingMsgRef.current = msg.id; _audioMsgId = msg.id;
    setTtsLoading(true); setTtsError('');
    try {
      const src = await fetchTTS(msg.text || '');
      if (!_audioLock || _audioMsgId !== msg.id) return;
      const audio = new Audio();
      audio.preload = 'auto';
      await new Promise<void>((resolve, reject) => {
        audio.oncanplaythrough = () => {
          _audio = audio; setSpeakingId(msg.id); setTtsLoading(false);
          audio.onended = () => { if (_audioMsgId === msg.id) { _stopAudio(); setSpeakingId(null); } };
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
    if (voiceConsent === null || !voiceConsent) return;
    if (welcomeSpokenRef.current) return;
    welcomeSpokenRef.current = true;
    const t = setTimeout(() => speakMessage({ ...WELCOME_MSG, time: fmt() }), 600);
    return () => clearTimeout(t);
  }, [speakMessage, voiceConsent]);

  const dispatch = useCallback(async (text: string, isVoice = false) => {
    const clean = isVoice ? correctVoice(text.trim()) : text.trim();
    if (!clean) return;
    setInterimText(''); setInputText('');
    if (textareaRef.current) { textareaRef.current.style.height = 'auto'; }
    const uid = nextId.current++, tid = nextId.current++;
    setMessages(prev => [...prev,
      { id: uid, role: 'user', text: clean, time: fmt() },
      { id: tid, role: 'bot', typing: true, time: fmt() },
    ]);
    setIsTyping(true);
    try {
      const { text: reply, threadId } = await getBotReply(clean, threadIdRef.current);
      threadIdRef.current = threadId;
      const botMsg: Msg = { id: tid, role: 'bot', text: reply, time: fmt() };
      setMessages(prev => prev.map(m => m.id === tid ? botMsg : m));
      setIsTyping(false);
      if (isVoice) speakMessage(botMsg);
    } catch (err) {
      const e = err as Error;
      setMessages(prev => prev.map(m => m.id === tid ? { id: tid, role: 'bot', text: `Sorry, I encountered an error: ${e.message}`, time: fmt() } : m));
      setIsTyping(false);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setMicError('Voice input not supported. Use Chrome, Edge, or Safari.'); return; }
    stopAudio();
    const rec = new SR();
    rec.continuous = true; rec.interimResults = true; rec.lang = 'en-US';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      let interim = '', final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t; else interim += t;
      }
      interimTextRef.current = interim; setInterimText(interim);
      if (final.trim()) setInputText(prev => correctVoice((prev + ' ' + final).trim()));
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onerror = (e: any) => {
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
    if (ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'; }
  };

  const canSend    = !!(inputText.trim() || interimText.trim());
  const isSpeaking = speakingId !== null;

  return (
    <>
      <style>{`
        @keyframes chatFadeUp   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes chatSpin     { to{transform:rotate(360deg)} }
        @keyframes chatDot      { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }
        @keyframes chatBlink    { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes backdropIn   { from{opacity:0} to{opacity:1} }

        /* Wrapper slides up + fades in */
        @keyframes popupIn {
          from { opacity:0; transform:translate(-50%,-50%) translateY(24px) scale(0.95); }
          to   { opacity:1; transform:translate(-50%,-50%) translateY(0)     scale(1);    }
        }

        /* Ceylena-specific */
        @keyframes ceylenaSlideUp {
          from { opacity:0; transform:translateY(60px) scale(0.95); }
          to   { opacity:1; transform:translateY(0)    scale(1);    }
        }
        @keyframes ceylenaFadeIn {
          from { opacity:0; transform:translateY(-10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes ceylenaGlow {
          0%,100% { opacity:0.6; transform:translateX(-50%) scale(1); }
          50%     { opacity:1;   transform:translateX(-50%) scale(1.15); }
        }
        @keyframes ceylenaDot {
          0%,100% { transform:scale(1); }
          50%     { transform:scale(1.4); }
        }
        @keyframes ceylenaSpeak {
          from { transform:scale(1) translateY(0); }
          to   { transform:scale(1.012) translateY(-3px); }
        }

        @keyframes siriH1    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes siriH2    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes siriGlowH { 0%,100%{opacity:0.5;transform:scale(0.9)} 50%{opacity:1;transform:scale(1.12)} }
        @keyframes siriBar   { from{height:3px} to{height:16px} }

        .chat-msgs::-webkit-scrollbar       { width: 3px; }
        .chat-msgs::-webkit-scrollbar-track { background: transparent; }
        .chat-msgs::-webkit-scrollbar-thumb { background: rgba(38,198,218,0.25); border-radius: 3px; }
        .chat-chip { transition: all .18s ease; }
        .chat-chip:hover { background: rgba(38,198,218,0.12) !important; border-color: rgba(38,198,218,0.45) !important; color: #26C6DA !important; transform: translateY(-1px); }
        .chat-send:not(:disabled):hover { transform: scale(1.08); filter: brightness(1.1); }
        .chat-textarea { scrollbar-width: none; }
        .chat-textarea::-webkit-scrollbar { display: none; }
        .chat-textarea:focus { outline: none; }
        .chat-textarea::placeholder { color: rgba(100,116,139,0.55); }

        /* Hide Ceylena on small screens */
        @media (max-width: 860px) {
          .ceylena-panel { display: none !important; }
        }
        /* When Ceylena is hidden, make full popup rounded */
        .chat-popup { border-radius: 1.75rem; }
        @media (min-width: 861px) {
          .chat-popup { border-radius: 1.75rem 0 0 1.75rem; }
        }
      `}</style>

      {/* Backdrop */}
      <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:9998, background:'rgba(4,10,22,0.7)', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)', animation:'backdropIn 0.25s ease' }} />

      {/* ── Outer wrapper: Ceylena + Popup side by side ─────────── */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'flex-end',
          animation: 'popupIn 0.4s cubic-bezier(.34,1.56,.64,1) forwards',
          // Drop shadow on the whole unit
          filter: 'drop-shadow(0 32px 80px rgba(0,0,0,0.75))',
        }}
      >

        {/* ── Main chat popup (left) ────────────────────────────── */}
        <div className="chat-popup" style={{
          width: 'clamp(300px, 60vw, 660px)',
          height: 'clamp(520px, 86vh, 780px)',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(160deg, #f0fcfb 0%, #f4fdf4 55%, #fbfcf0 100%)',
          border: '1px solid rgba(38,198,218,0.25)',
          borderLeft: '1px solid rgba(38,198,218,0.15)',
          overflow: 'hidden',
          position: 'relative',
        }}>

          {/* Watercolor accents */}
          <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, background:'radial-gradient(ellipse 60% 40% at 80% 0%, rgba(38,198,218,0.12) 0%, transparent 60%)' }} />
          <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, background:'radial-gradient(ellipse 50% 50% at 10% 90%, rgba(102,187,106,0.1) 0%, transparent 60%)' }} />

          {/* ── Voice consent overlay ──────────────────────────────── */}
          {voiceConsent === null && (
            <div style={{ position:'absolute', inset:0, zIndex:20, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(4,10,22,0.88)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', animation:'chatFadeUp 0.3s ease both' }}>
              <div style={{ textAlign:'center', padding:'2rem 2.2rem', maxWidth:'340px' }}>
                {/* Orb */}
                <div style={{ display:'flex', justifyContent:'center', marginBottom:'1.4rem' }}>
                  <div style={{ width:64, height:64, borderRadius:'50%', overflow:'hidden', boxShadow:'0 0 0 2px rgba(38,198,218,0.3), 0 0 32px rgba(38,198,218,0.3)', position:'relative' }}>
                    <div style={{ position:'absolute', inset:0, background:'#0a0f1e' }} />
                    <div style={{ position:'absolute', width:'150%', height:'130%', top:'-15%', left:'-15%', background:'conic-gradient(from 0deg at 38% 42%, #26C6DA 0deg, transparent 110deg, #66BB6A 200deg, transparent 310deg)', animation:'siriH1 4s linear infinite', opacity:0.9, filter:'blur(3px)' }} />
                    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <svg width="22" height="22" viewBox="0 0 32 32" style={{ opacity:0.9 }}>
                        <polygon points="16,3 17.5,13 16,15 14.5,13" fill="#F5A623"/>
                        <polygon points="16,29 17.5,19 16,17 14.5,19" fill="rgba(200,220,255,0.8)"/>
                        <polygon points="29,16 19,14.5 17,16 19,17.5" fill="rgba(200,220,255,0.6)"/>
                        <polygon points="3,16  13,14.5 15,16 13,17.5" fill="rgba(200,220,255,0.6)"/>
                        <circle cx="16" cy="16" r="2.8" fill="rgba(10,15,30,0.85)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
                        <circle cx="16" cy="16" r="1.4" fill="#26C6DA"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <p style={{ margin:'0 0 0.4rem', fontSize:'1rem', fontWeight:700, color:'#fff' }}>Enable Voice Assistant?</p>
                <p style={{ margin:'0 0 1.8rem', fontSize:'0.78rem', color:'rgba(255,255,255,0.45)', lineHeight:1.6 }}>
                  Ceylena can read responses aloud.<br/>Would you like to enable voice?
                </p>
                <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center' }}>
                  <button
                    onClick={() => setVoiceConsent(false)}
                    style={{ flex:1, padding:'0.6rem 0', borderRadius:'24px', border:'1px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.6)', fontSize:'0.82rem', fontWeight:600, cursor:'pointer', transition:'all .2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(255,255,255,0.12)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(255,255,255,0.06)'; }}
                  >
                    No, text only
                  </button>
                  <button
                    onClick={() => setVoiceConsent(true)}
                    style={{ flex:1, padding:'0.6rem 0', borderRadius:'24px', border:'none', background:'linear-gradient(135deg,#26C6DA,#0097A7)', color:'#fff', fontSize:'0.82rem', fontWeight:700, cursor:'pointer', boxShadow:'0 4px 18px rgba(38,198,218,0.35)', transition:'all .2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.filter='brightness(1.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.filter=''; }}
                  >
                    Yes, enable voice
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div style={{ position:'relative', zIndex:1, padding:'0.85rem 1.1rem', borderBottom:'1px solid rgba(38,198,218,0.2)', display:'flex', alignItems:'center', gap:'0.75rem', flexShrink:0, background:'rgba(255,255,255,0.88)', backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)' }}>
            <SiriOrbHeader listening={isListening} speaking={isSpeaking} />
            <div style={{ flex:1 }}>
              <p style={{ margin:0, fontSize:'0.82rem', fontWeight:700, color:'#0d1f35', letterSpacing:'0.02em' }}>Ceylinco Life AI Assistant</p>
              <p style={{ margin:'1px 0 0', fontSize:'0.62rem', color:'#1a9aaa', letterSpacing:'0.08em' }}>2025 Annual Report Guide</p>
            </div>
            <button onClick={onClose} style={{ background:'rgba(0,0,0,0.05)', border:'1px solid rgba(0,0,0,0.1)', borderRadius:'50%', width:'1.85rem', height:'1.85rem', cursor:'pointer', color:'#64748b', fontSize:'1.05rem', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s', flexShrink:0 }}>×</button>
          </div>

          {/* Messages */}
          <div className="chat-msgs" style={{ position:'relative', zIndex:1, flex:1, overflowY:'auto', padding:'1rem 1.1rem 0.5rem', display:'flex', flexDirection:'column', gap:'10px', background:'transparent' }}>
            {messages.map(msg => (
              <Bubble key={msg.id} msg={msg} onSpeak={speakMessage} isSpeaking={speakingId === msg.id} ttsLoading={ttsLoading && speakingMsgRef.current === msg.id} />
            ))}
            {interimText && (
              <div style={{ display:'flex', justifyContent:'flex-end' }}>
                <div style={{ maxWidth:'78%', padding:'9px 13px', borderRadius:'18px 18px 4px 18px', background:'rgba(38,198,218,0.08)', border:'1px dashed rgba(38,198,218,0.35)', color:'#26C6DA', fontSize:'13px', fontStyle:'italic', display:'flex', alignItems:'center', gap:'7px' }}>
                  <span style={{ animation:'chatBlink 1s infinite', fontSize:'8px' }}>●</span>{interimText}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Status strips */}
          {(isListening || isSpeaking) && (
            <div style={{ position:'relative', zIndex:1, padding:'0 1.1rem 0.4rem', display:'flex', flexDirection:'column', gap:'4px', flexShrink:0 }}>
              {isListening && (
                <div style={{ padding:'6px 12px', background:'rgba(38,198,218,0.08)', border:'1px solid rgba(38,198,218,0.22)', borderRadius:'10px', display:'flex', alignItems:'center', gap:'10px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'2px', height:'20px' }}>
                    {Array(10).fill(0).map((_,i) => <div key={i} style={{ width:'2.5px', borderRadius:'2px', background:'#26C6DA', height:'4px', animation:`siriBar ${0.5+i*0.06}s ${i*0.06}s ease-in-out infinite alternate` }} />)}
                  </div>
                  <span style={{ color:'#26C6DA', fontSize:'11px', fontWeight:500 }}>Listening…</span>
                  <button onClick={stopListening} style={{ marginLeft:'auto', background:'rgba(38,198,218,0.1)', border:'1px solid rgba(38,198,218,0.25)', borderRadius:'8px', padding:'2px 9px', color:'#26C6DA', fontSize:'10px', cursor:'pointer' }}>stop ■</button>
                </div>
              )}
              {isSpeaking && (
                <div style={{ padding:'6px 12px', background:'rgba(245,166,35,0.07)', border:'1px solid rgba(245,166,35,0.22)', borderRadius:'10px', display:'flex', alignItems:'center', gap:'10px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'2px', height:'20px' }}>
                    {[1,1.6,1,1.8,1,1.4,1].map((s,i) => <div key={i} style={{ width:'2.5px', borderRadius:'2px', background:'#F5A623', height:`${8*s}px`, animation:`siriBar ${0.5+i*0.07}s ${i*0.07}s ease-in-out infinite alternate` }} />)}
                  </div>
                  <span style={{ color:'#F5A623', fontSize:'11px', fontWeight:500 }}>Speaking…</span>
                  <button onClick={stopAudio} style={{ marginLeft:'auto', background:'rgba(245,166,35,0.1)', border:'1px solid rgba(245,166,35,0.25)', borderRadius:'8px', padding:'2px 9px', color:'#F5A623', fontSize:'10px', cursor:'pointer' }}>stop ■</button>
                </div>
              )}
            </div>
          )}

          {/* Suggestion chips */}
          <div style={{ position:'relative', zIndex:1, padding:'0.5rem 1.1rem', display:'flex', flexWrap:'wrap', gap:'0.35rem', flexShrink:0, borderTop:'1px solid rgba(38,198,218,0.15)' }}>
            {CHIPS.map(chip => (
              <button key={chip} className="chat-chip" onClick={() => dispatch(chip, false)}
                style={{ background:'rgba(255,255,255,0.85)', border:'1px solid rgba(38,198,218,0.22)', borderRadius:'20px', padding:'4px 12px', color:'#64748b', fontSize:'11px', cursor:'pointer', whiteSpace:'nowrap', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
                {chip}
              </button>
            ))}
          </div>

          {/* Error banners */}
          {(micError || ttsError) && (
            <div style={{ position:'relative', zIndex:1, padding:'0 1.1rem', display:'flex', flexDirection:'column', gap:'4px', flexShrink:0 }}>
              {micError && <div style={{ padding:'7px 12px', background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:'8px', color:'#dc2626', fontSize:'11px', display:'flex', alignItems:'center', gap:'6px' }}>⚠ {micError}<button onClick={() => setMicError('')} style={{ marginLeft:'auto', background:'none', border:'none', color:'#94a3b8', cursor:'pointer', fontSize:'13px' }}>✕</button></div>}
              {ttsError && <div style={{ padding:'7px 12px', background:'rgba(38,198,218,0.06)', border:'1px solid rgba(38,198,218,0.2)', borderRadius:'8px', color:'#0891b2', fontSize:'11px', display:'flex', alignItems:'center', gap:'6px' }}>⚠ {ttsError}<button onClick={() => setTtsError('')} style={{ marginLeft:'auto', background:'none', border:'none', color:'#94a3b8', cursor:'pointer', fontSize:'13px' }}>✕</button></div>}
            </div>
          )}

          {/* Input bar */}
          <div style={{ position:'relative', zIndex:1, padding:'0.65rem 1.1rem 0.9rem', borderTop:'1px solid rgba(38,198,218,0.18)', flexShrink:0, background:'rgba(255,255,255,0.75)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.95)', border:'1.5px solid rgba(38,198,218,0.28)', borderRadius:'24px', padding:'6px 8px 6px 16px', boxShadow:'0 2px 12px rgba(38,198,218,0.1), inset 0 1px 0 rgba(255,255,255,0.8)' }}>
              <textarea
                ref={textareaRef} rows={1} value={inputText}
                onChange={handleInput} onKeyDown={handleKey}
                placeholder="Ask about the 2025 Annual Report…"
                className="chat-textarea"
                style={{ flex:1, background:'none', border:'none', color:'#0d1f35', fontSize:'13px', fontFamily:'inherit', resize:'none', lineHeight:'1.55', maxHeight:'120px', overflowY:'auto', caretColor:'#26C6DA', minWidth:0, outline:'none', padding:'5px 0', display:'block' }}
              />
              {/* Mic */}
              <button onClick={toggleListening} title={isListening ? 'Stop' : 'Voice input'}
                style={{ width:'32px', height:'32px', borderRadius:'50%', border:`1.5px solid ${isListening ? 'rgba(38,198,218,0.5)' : 'rgba(38,198,218,0.25)'}`, background: isListening ? 'rgba(38,198,218,0.12)' : 'rgba(255,255,255,0.9)', color: isListening ? '#26C6DA' : '#64748b', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s', flexShrink:0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  {isListening
                    ? <rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor" stroke="none"/>
                    : <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>
                  }
                </svg>
              </button>
              {/* Send */}
              <button className="chat-send" onClick={handleSend} disabled={!canSend} title="Send (Enter)"
                style={{ width:'36px', height:'36px', borderRadius:'50%', border:'none', background: canSend ? 'linear-gradient(135deg, #26C6DA, #0097A7)' : 'rgba(255,255,255,0.07)', color: canSend ? '#fff' : 'rgba(255,255,255,0.2)', cursor: canSend ? 'pointer' : 'default', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s', boxShadow: canSend ? '0 3px 14px rgba(38,198,218,0.4)' : 'none', flexShrink:0 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
            <p style={{ margin:'0.35rem 0 0', textAlign:'center', fontSize:'10px', color:'#94a3b8' }}>
              Powered by <span style={{ color:'#1a9aaa', fontWeight:600 }}>Ceylinco Life Insurance</span>
            </p>
          </div>

        </div>{/* end chat popup */}

        {/* ── Ceylena character panel (right) ───────────────────── */}
        <CeylenaPanel speaking={isSpeaking} typing={isTyping} />

      </div>{/* end outer wrapper */}
    </>
  );
}
