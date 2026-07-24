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

const tracks: Record<Scene, string> = {
  hall: "/audio/cwrc-jazz.mp3",
  library: "/audio/cwrc-classical.mp3",
  passage: "/audio/cwrc-classical.mp3",
  garden: "/audio/cwrc-garden-birds.mp3",
  kitchen: "/audio/cwrc-country.mp3",
  lounge: "/audio/cwrc-jazz.mp3",
  laboratory: "/audio/cwrc-reggae.mp3",
  greenhouse: "/audio/cwrc-garden-birds.mp3",
  cathy: "/audio/cwrc-classical.mp3",
  suzie: "/audio/cwrc-whales.mp3",
  gpt: "/audio/cwrc-jazz.mp3",
  amateur: "/audio/cwrc-classical.mp3",
  quiet: "/audio/cwrc-classical.mp3",
};

const labels = {
  fr: {
    music: "Ambiance du CWRC",
    play: "Activer l’ambiance sonore",
    stop: "Couper l’ambiance sonore",
    volume: "Volume",
    scenes: {
      hall: "Jazz du Grand Hall",
      library: "Classique à la bibliothèque",
      passage: "Classique dans le passage secret",
      garden: "Vrais oiseaux du jardin",
      kitchen: "Country dans la cuisine",
      lounge: "Jazz du Grand Salon",
      laboratory: "Reggae au laboratoire",
      greenhouse: "Oiseaux dans la serre",
      cathy: "Classique chez Cathy",
      suzie: "Chants de baleines chez Suzie",
      gpt: "Jazz au Studio de GPT",
      amateur: "Classique chez Amateur",
      quiet: "Ambiance classique",
    },
  },
  en: {
    music: "CWRC ambience",
    play: "Turn on the soundscape",
    stop: "Turn off the soundscape",
    volume: "Volume",
    scenes: {
      hall: "Grand Hall jazz",
      library: "Classical music in the library",
      passage: "Classical secret passage",
      garden: "Real garden birds",
      kitchen: "Country in the kitchen",
      lounge: "Grand Lounge jazz",
      laboratory: "Reggae in the laboratory",
      greenhouse: "Birds in the greenhouse",
      cathy: "Classical music in Cathy’s office",
      suzie: "Whale songs in Suzie’s office",
      gpt: "Jazz in the GPT Studio",
      amateur: "Classical music in Amateur’s office",
      quiet: "Classical ambience",
    },
  },
  es: {
    music: "Ambiente del CWRC",
    play: "Activar el paisaje sonoro",
    stop: "Desactivar el paisaje sonoro",
    volume: "Volumen",
    scenes: {
      hall: "Jazz del Gran Salón",
      library: "Música clásica en la biblioteca",
      passage: "Música clásica en el pasaje secreto",
      garden: "Pájaros reales del jardín",
      kitchen: "Country en la cocina",
      lounge: "Jazz del salón de descanso",
      laboratory: "Reggae en el laboratorio",
      greenhouse: "Pájaros en el invernadero",
      cathy: "Música clásica en la oficina de Cathy",
      suzie: "Cantos de ballenas en la oficina de Suzie",
      gpt: "Jazz en el estudio de GPT",
      amateur: "Música clásica en la oficina de Amateur",
      quiet: "Ambiente clásico",
    },
  },
} as const;

function sceneFromPath(pathname: string): Scene {
  if (/gardens?|greenhouse/.test(pathname)) {
    return pathname.includes("greenhouse") ? "greenhouse" : "garden";
  }
  if (
    pathname.includes("secret-passage") ||
    pathname.includes("charisma-passage")
  ) {
    return "passage";
  }
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

export default function AmbientSoundscape() {
  const pathname = usePathname();
  const locale = pathname.match(/^\/(fr|en|es)(?=\/|$)/)?.[1] as
    | "fr"
    | "en"
    | "es"
    | undefined;
  const language = locale ?? "fr";
  const t = labels[language];
  const scene = useMemo(() => sceneFromPath(pathname), [pathname]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(48);

  useEffect(() => {
    const stored = window.localStorage.getItem("cwrc-real-audio-volume");
    if (!stored) return;

    const parsed = Number(stored);
    if (Number.isFinite(parsed)) {
      setVolume(Math.min(80, Math.max(0, parsed)));
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume / 100;
    window.localStorage.setItem("cwrc-real-audio-volume", String(volume));
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (scene === "lounge") {
      audio.pause();
      setEnabled(false);
      return;
    }

    if (!enabled) return;

    audio.load();
    audio.volume = volume / 100;
    void audio.play().catch(() => setEnabled(false));
  }, [enabled, scene, volume]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (enabled) {
      audio.pause();
      setEnabled(false);
      return;
    }

    audio.volume = volume / 100;

    try {
      await audio.play();
      setEnabled(true);
    } catch {
      setEnabled(false);
    }
  };

  if (scene === "lounge") {
    return null;
  }

  return (
    <aside
      className={`soundscape ${enabled ? "playing" : ""}`}
      aria-label={t.music}
    >
      <audio ref={audioRef} src={tracks[scene]} loop preload="metadata" />

      <button
        type="button"
        className="soundButton"
        onClick={toggle}
        aria-pressed={enabled}
        title={enabled ? t.stop : t.play}
      >
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
            max="80"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
        </label>
      )}

      <style jsx>{`
        .soundscape{position:fixed;right:16px;bottom:16px;z-index:3000;display:flex;align-items:center;gap:12px;padding:7px;border:1px solid rgba(218,188,121,.78);border-radius:18px;background:rgba(16,42,76,.95);color:#fff;box-shadow:0 10px 30px rgba(0,0,0,.3);backdrop-filter:blur(10px)}.soundscape.playing{box-shadow:0 10px 30px rgba(0,0,0,.3),0 0 0 3px rgba(215,182,109,.25)}.soundButton{display:flex;align-items:center;gap:9px;padding:5px 8px;cursor:pointer;border:0;background:transparent;color:#fff;text-align:left}.soundButton>span:first-child{font-size:1.35rem}.soundButton>span:last-child{display:grid}.soundButton strong{font:800 .75rem/1.2 system-ui,sans-serif}.soundButton small{color:#e2c985;font:600 .67rem/1.2 system-ui,sans-serif}.soundscape label{display:grid;gap:2px;padding-right:7px;color:#e9d8aa;font:700 .62rem system-ui,sans-serif}.soundscape input{width:110px;accent-color:#d7b66d}@media(max-width:640px){.soundscape{right:9px;bottom:9px}.soundButton strong{display:none}.soundscape input{width:78px}}@media(prefers-reduced-motion:reduce){.soundscape{backdrop-filter:none}}
      `}</style>
    </aside>
  );
}