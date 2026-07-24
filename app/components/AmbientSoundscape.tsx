"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import {usePathname} from "next/navigation";

type Scene =
  | "hall"
  | "library"
  | "passage"
  | "garden"
  | "kitchen"
  | "lounge"
  | "laboratory"
  | "greenhouse"
  | "cathy"
  | "suzie"
  | "gpt"
  | "amateur"
  | "quiet";

const labels = {
  fr: {
    music: "Ambiance du CWRC",
    play: "Activer l’ambiance sonore",
    stop: "Couper l’ambiance sonore",
    volume: "Volume",
    scenes: {
      hall: "Grand Hall",
      library: "Bibliothèque",
      passage: "Passage secret",
      garden: "Jardins et oiseaux",
      kitchen: "Cuisine",
      lounge: "Grand Salon",
      laboratory: "Laboratoire",
      greenhouse: "Serre",
      cathy: "Bureau de Cathy",
      suzie: "Bureau de Suzie",
      gpt: "Studio de GPT",
      amateur: "Bureau d’Amateur",
      quiet: "Ambiance feutrée",
    },
  },
  en: {
    music: "CWRC ambience",
    play: "Turn on the soundscape",
    stop: "Turn off the soundscape",
    volume: "Volume",
    scenes: {
      hall: "Grand Hall",
      library: "Library",
      passage: "Secret passage",
      garden: "Gardens and birds",
      kitchen: "Kitchen",
      lounge: "Grand Lounge",
      laboratory: "Laboratory",
      greenhouse: "Greenhouse",
      cathy: "Cathy’s office",
      suzie: "Suzie’s office",
      gpt: "GPT Studio",
      amateur: "Amateur’s office",
      quiet: "Quiet ambience",
    },
  },
  es: {
    music: "Ambiente del CWRC",
    play: "Activar el paisaje sonoro",
    stop: "Desactivar el paisaje sonoro",
    volume: "Volumen",
    scenes: {
      hall: "Gran Salón",
      library: "Biblioteca",
      passage: "Pasaje secreto",
      garden: "Jardines y pájaros",
      kitchen: "Cocina",
      lounge: "Salón de descanso",
      laboratory: "Laboratorio",
      greenhouse: "Invernadero",
      cathy: "Oficina de Cathy",
      suzie: "Oficina de Suzie",
      gpt: "Estudio de GPT",
      amateur: "Oficina de Amateur",
      quiet: "Ambiente tranquilo",
    },
  },
} as const;

function sceneFromPath(pathname: string): Scene {
  if (/gardens?|greenhouse/.test(pathname)) {
    return pathname.includes("greenhouse") ? "greenhouse" : "garden";
  }
  if (pathname.includes("secret-passage") || pathname.includes("charisma-passage")) return "passage";
  if (pathname.includes("library")) return "library";
  if (pathname.includes("kitchen")) return "kitchen";
  if (pathname.includes("grand-salon")) return "lounge";
  if (pathname.includes("laboratory")) return "laboratory";
  if (pathname.includes("office-cathy")) return "cathy";
  if (pathname.includes("office-suzie")) return "suzie";
  if (pathname.includes("office-gpt")) return "gpt";
  if (pathname.includes("administrative-office")) return "amateur";
  if (/\/(home|rooms)?$/.test(pathname) || pathname === "/") return "hall";
  return "quiet";
}

function startScene(
  context: AudioContext,
  destination: AudioNode,
  scene: Scene,
) {
  const activeNodes: AudioScheduledSourceNode[] = [];
  const timers: number[] = [];

  const tone = (
    frequency: number,
    delay: number,
    duration: number,
    level: number,
    type: OscillatorType = "sine",
  ) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime + delay;
    const end = start + duration;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(level, start + Math.min(0.08, duration / 4));
    gain.gain.exponentialRampToValueAtTime(0.0001, end);
    oscillator.connect(gain);
    gain.connect(destination);
    oscillator.start(start);
    oscillator.stop(end + 0.05);
    activeNodes.push(oscillator);
  };

  const chord = (
    notes: number[],
    duration = 3.5,
    level = 0.018,
    type: OscillatorType = "sine",
  ) => notes.forEach((note, index) => tone(note, index * 0.06, duration, level, type));

  const repeat = (callback: () => void, milliseconds: number) => {
    callback();
    timers.push(window.setInterval(callback, milliseconds));
  };

  const noise = (level: number, cutoff: number) => {
    const length = context.sampleRate * 3;
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const values = buffer.getChannelData(0);
    let last = 0;

    for (let index = 0; index < length; index += 1) {
      const white = Math.random() * 2 - 1;
      last = last * 0.985 + white * 0.015;
      values[index] = last;
    }

    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    source.buffer = buffer;
    source.loop = true;
    filter.type = "lowpass";
    filter.frequency.value = cutoff;
    gain.gain.value = level;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(destination);
    source.start();
    activeNodes.push(source);
  };

  const bird = () => {
    const base = 1700 + Math.random() * 1200;
    tone(base, 0, 0.16, 0.035);
    tone(base * 1.18, 0.18, 0.14, 0.03);
    if (Math.random() > 0.45) tone(base * 0.92, 0.37, 0.12, 0.026);
  };

  switch (scene) {
    case "garden":
      noise(0.16, 1250);
      repeat(bird, 2600);
      break;
    case "greenhouse":
      noise(0.075, 900);
      repeat(() => {
        bird();
        tone(523.25, 0.55, 1.4, 0.012);
      }, 4800);
      break;
    case "library":
      chord([130.81, 196, 261.63], 7, 0.012);
      repeat(() => chord([196, 246.94, 329.63], 6, 0.011), 7200);
      break;
    case "passage":
      noise(0.035, 420);
      repeat(() => {
        chord([110, 164.81, 220], 5.5, 0.012);
        tone(659.25, 1.2, 1.8, 0.012);
      }, 6200);
      break;
    case "kitchen":
      repeat(() => chord([261.63, 329.63, 392], 2.7, 0.015, "triangle"), 3300);
      break;
    case "lounge":
      repeat(() => chord([196, 246.94, 293.66], 6.8, 0.014, "triangle"), 7000);
      break;
    case "laboratory":
      repeat(() => {
        tone(440, 0, 1.2, 0.018);
        tone(554.37, 0.35, 1.4, 0.016);
        tone(659.25, 0.75, 1.7, 0.014);
      }, 5200);
      break;
    case "cathy":
      repeat(() => {
        [261.63, 329.63, 392, 523.25].forEach((note, index) =>
          tone(note, index * 0.32, 1.25, 0.018, "triangle"),
        );
      }, 4100);
      break;
    case "suzie":
      repeat(() => {
        [220, 277.18, 329.63, 440].forEach((note, index) =>
          tone(note, index * 0.28, 0.85, 0.017, "sine"),
        );
      }, 3600);
      break;
    case "gpt":
      repeat(() => {
        [220, 330, 440, 660].forEach((note, index) =>
          tone(note, index * 0.22, 0.95, 0.014, index % 2 ? "sine" : "triangle"),
        );
      }, 3900);
      break;
    case "amateur":
      repeat(() => {
        tone(196, 0, 1.3, 0.017, "triangle");
        tone(293.66, 0.25, 1.1, 0.017, "triangle");
        tone(392, 0.55, 1.5, 0.014, "triangle");
      }, 4700);
      break;
    case "hall":
      repeat(() => chord([130.81, 196, 261.63, 329.63], 6.5, 0.013, "triangle"), 6800);
      break;
    default:
      repeat(() => chord([174.61, 220, 261.63], 7.5, 0.009), 7800);
  }

  return () => {
    timers.forEach((timer) => window.clearInterval(timer));
    activeNodes.forEach((node) => {
      try {
        node.stop();
      } catch {
        // The node may already have finished naturally.
      }
      node.disconnect();
    });
  };
}

export default function AmbientSoundscape() {
  const pathname = usePathname();
  const locale = pathname.match(/^\/(fr|en|es)(?=\/|$)/)?.[1] as "fr" | "en" | "es" | undefined;
  const language = locale ?? "fr";
  const t = labels[language];
  const scene = useMemo(() => sceneFromPath(pathname), [pathname]);
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(18);
  const contextRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("cwrc-ambient-volume");
    if (stored) {
      const parsed = Number(stored);
      if (Number.isFinite(parsed)) setVolume(Math.min(35, Math.max(0, parsed)));
    }
  }, []);

  useEffect(() => {
    const master = masterRef.current;
    const context = contextRef.current;
    if (!master || !context) return;
    master.gain.setTargetAtTime(volume / 100, context.currentTime, 0.08);
    window.localStorage.setItem("cwrc-ambient-volume", String(volume));
  }, [volume]);

  useEffect(() => {
    const context = contextRef.current;
    const master = masterRef.current;
    if (!enabled || !context || !master) return;

    void context.resume();
    const stop = startScene(context, master, scene);
    return stop;
  }, [enabled, scene]);

  const toggle = async () => {
    if (enabled) {
      setEnabled(false);
      return;
    }

    if (!contextRef.current) {
      const AudioContextConstructor =
        window.AudioContext ??
        (window as typeof window & {webkitAudioContext?: typeof AudioContext}).webkitAudioContext;
      if (!AudioContextConstructor) return;

      const context = new AudioContextConstructor();
      const master = context.createGain();
      master.gain.value = volume / 100;
      master.connect(context.destination);
      contextRef.current = context;
      masterRef.current = master;
    }

    await contextRef.current.resume();
    setEnabled(true);
  };

  return (
    <aside className={`soundscape ${enabled ? "playing" : ""}`} aria-label={t.music}>
      <button type="button" className="soundButton" onClick={toggle} aria-pressed={enabled} title={enabled ? t.stop : t.play}>
        <span aria-hidden="true">{enabled ? "🔊" : "🔇"}</span>
        <span>
          <strong>{t.music}</strong>
          <small>{t.scenes[scene]}</small>
        </span>
      </button>
      {enabled && (
        <label>
          <span>{t.volume}</span>
          <input
            type="range"
            min="0"
            max="35"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
        </label>
      )}
      <style jsx>{`
        .soundscape{position:fixed;right:16px;bottom:16px;z-index:3000;display:flex;align-items:center;gap:12px;padding:7px;border:1px solid rgba(218,188,121,.78);border-radius:18px;background:rgba(16,42,76,.95);color:#fff;box-shadow:0 10px 30px rgba(0,0,0,.3);backdrop-filter:blur(10px)}.soundscape.playing{box-shadow:0 10px 30px rgba(0,0,0,.3),0 0 0 3px rgba(215,182,109,.25)}.soundButton{display:flex;align-items:center;gap:9px;padding:5px 8px;cursor:pointer;border:0;background:transparent;color:#fff;text-align:left}.soundButton>span:first-child{font-size:1.35rem}.soundButton>span:last-child{display:grid}.soundButton strong{font:800 .75rem/1.2 system-ui,sans-serif}.soundButton small{color:#e2c985;font:600 .67rem/1.2 system-ui,sans-serif}.soundscape label{display:grid;gap:2px;padding-right:7px;color:#e9d8aa;font:700 .62rem system-ui,sans-serif}.soundscape input{width:90px;accent-color:#d7b66d}@media(max-width:640px){.soundscape{right:9px;bottom:9px}.soundButton strong{display:none}.soundscape input{width:72px}}@media(prefers-reduced-motion:reduce){.soundscape{backdrop-filter:none}}
      `}</style>
    </aside>
  );
}
