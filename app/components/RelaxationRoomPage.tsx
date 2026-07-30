"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import type { Locale } from "../i18n/config";

type TrackId =
  | "classical"
  | "ocean"
  | "serenity";

type RelaxationTrack = {
  id: TrackId;
  src: string;
  icon: string;
};

const tracks: RelaxationTrack[] = [
  {
    id: "classical",
    src: "/audio/cwrc-classical.mp3",
    icon: "🎻",
  },
  {
    id: "ocean",
    src: "/audio/cwrc-whales.mp3",
    icon: "🌊",
  },
  {
    id: "serenity",
    src: "/audio/gramophone/classique-01.mp3",
    icon: "✨",
  },
];

const copy = {
  fr: {
    title: "Salle de repos",
    subtitle:
      "Un endroit où même les vérités confirmées peuvent prendre une pause.",
    noAutomaticSound:
      "Aucun son ne démarre automatiquement.",
    aquariumTitle: "L’aquarium vivant",
    aquariumText:
      "Ouvrez un aquarium réaliste en grand écran et laissez les poissons ralentir le temps.",
    openAquarium: "Ouvrir l’aquarium",
    closeAquarium: "Fermer l’aquarium",
    aquariumLabel:
      "Aquarium réaliste du CWRC",
    musicTitle: "Musiques de détente",
    musicText:
      "Choisissez une ambiance. Une seule musique jouera à la fois.",
    play: "Écouter",
    pause: "Arrêter",
    volume: "Volume",
    trackNames: {
      classical: "Douceur classique",
      ocean: "Océan et baleines",
      serenity: "Sérénité instrumentale",
    },
    fountainTitle: "La fontaine intérieure",
    fountainText:
      "Activez un léger murmure d’eau lorsque vous le désirez.",
    fountainOn: "Écouter l’eau",
    fountainOff: "Arrêter l’eau",
    meditationTitle: "Méditation guidée",
    meditationText:
      "Installez-vous confortablement. Une courte méditation sera lue dans la langue du site.",
    meditationStart: "Commencer la méditation",
    meditationStop: "Arrêter la méditation",
    meditationUnavailable:
      "La lecture vocale n’est pas disponible dans ce navigateur.",
    breathingTitle: "Cohérence cardiaque",
    breathingText:
      "Inspirez pendant cinq secondes, puis expirez pendant cinq secondes. L’exercice dure cinq minutes.",
    breathingStart: "Commencer l’exercice",
    breathingStop: "Arrêter l’exercice",
    inhale: "Inspirez",
    exhale: "Expirez",
    ready: "Prête?",
    finished:
      "Exercice terminé. Prenez un instant avant de reprendre votre journée.",
    minutes: "minutes",
    seconds: "secondes",
    lilo:
      "Lilo supervise le calme depuis son coussin.",
    meditationScript:
      "Bienvenue dans la Salle de repos du Centre Cathy avait raison. Installez-vous confortablement. Relâchez doucement les épaules. Laissez vos mains se déposer sans effort. Fermez les yeux si cela vous convient. Prenez une inspiration lente par le nez. Puis expirez doucement. Encore une fois, inspirez le calme. Expirez les tensions de la journée. Imaginez la lumière douce des lanternes, le mouvement paisible de l’eau et les poissons qui avancent sans se presser. Rien ne vous demande d’aller plus vite en ce moment. Vos pensées peuvent passer comme de petits nuages. Vous n’avez pas besoin de les retenir. Respirez simplement. Sentez le sol qui vous soutient. Votre corps peut se reposer. Votre esprit peut faire de la place. Prenez une dernière inspiration profonde. Expirez lentement. Lorsque vous serez prête, ouvrez doucement les yeux. Le Centre sera encore là, et Lilo aussi.",
  },

  en: {
    title: "Relaxation Room",
    subtitle:
      "A place where even confirmed truths may take a break.",
    noAutomaticSound:
      "No sound starts automatically.",
    aquariumTitle: "The Living Aquarium",
    aquariumText:
      "Open a realistic full-screen aquarium and let the fish slow down time.",
    openAquarium: "Open the aquarium",
    closeAquarium: "Close the aquarium",
    aquariumLabel:
      "CWRC realistic aquarium",
    musicTitle: "Relaxation Music",
    musicText:
      "Choose an atmosphere. Only one track will play at a time.",
    play: "Listen",
    pause: "Stop",
    volume: "Volume",
    trackNames: {
      classical: "Classical softness",
      ocean: "Ocean and whales",
      serenity: "Instrumental serenity",
    },
    fountainTitle: "The Indoor Fountain",
    fountainText:
      "Turn on a gentle murmur of water whenever you wish.",
    fountainOn: "Listen to the water",
    fountainOff: "Stop the water",
    meditationTitle: "Guided Meditation",
    meditationText:
      "Make yourself comfortable. A short meditation will be read in the site language.",
    meditationStart: "Begin meditation",
    meditationStop: "Stop meditation",
    meditationUnavailable:
      "Voice playback is not available in this browser.",
    breathingTitle: "Cardiac Coherence",
    breathingText:
      "Breathe in for five seconds, then breathe out for five seconds. The exercise lasts five minutes.",
    breathingStart: "Begin exercise",
    breathingStop: "Stop exercise",
    inhale: "Breathe in",
    exhale: "Breathe out",
    ready: "Ready?",
    finished:
      "Exercise complete. Take a moment before returning to your day.",
    minutes: "minutes",
    seconds: "seconds",
    lilo:
      "Lilo supervises the calm from her cushion.",
    meditationScript:
      "Welcome to the Cathy Was Right Research Center Relaxation Room. Make yourself comfortable. Gently release your shoulders. Let your hands rest without effort. Close your eyes if that feels right. Take a slow breath in through your nose. Then breathe out gently. Once more, breathe in calm. Breathe out the tension of the day. Imagine the soft lantern light, the peaceful movement of water, and fish swimming without hurry. Nothing is asking you to move faster right now. Your thoughts may pass like small clouds. You do not need to hold onto them. Simply breathe. Feel the floor supporting you. Your body may rest. Your mind may make space. Take one final deep breath. Exhale slowly. When you are ready, gently open your eyes. The Center will still be here, and so will Lilo.",
  },

  es: {
    title: "Sala de relajación",
    subtitle:
      "Un lugar donde incluso las verdades confirmadas pueden descansar.",
    noAutomaticSound:
      "Ningún sonido comienza automáticamente.",
    aquariumTitle: "El acuario vivo",
    aquariumText:
      "Abra un acuario realista a pantalla completa y deje que los peces ralenticen el tiempo.",
    openAquarium: "Abrir el acuario",
    closeAquarium: "Cerrar el acuario",
    aquariumLabel:
      "Acuario realista del CWRC",
    musicTitle: "Música de relajación",
    musicText:
      "Elija un ambiente. Solo se reproducirá una pista a la vez.",
    play: "Escuchar",
    pause: "Detener",
    volume: "Volumen",
    trackNames: {
      classical: "Suavidad clásica",
      ocean: "Océano y ballenas",
      serenity: "Serenidad instrumental",
    },
    fountainTitle: "La fuente interior",
    fountainText:
      "Active un suave murmullo de agua cuando lo desee.",
    fountainOn: "Escuchar el agua",
    fountainOff: "Detener el agua",
    meditationTitle: "Meditación guiada",
    meditationText:
      "Póngase cómodo. Se leerá una breve meditación en el idioma del sitio.",
    meditationStart: "Comenzar la meditación",
    meditationStop: "Detener la meditación",
    meditationUnavailable:
      "La reproducción de voz no está disponible en este navegador.",
    breathingTitle: "Coherencia cardíaca",
    breathingText:
      "Inhale durante cinco segundos y exhale durante cinco segundos. El ejercicio dura cinco minutos.",
    breathingStart: "Comenzar el ejercicio",
    breathingStop: "Detener el ejercicio",
    inhale: "Inhale",
    exhale: "Exhale",
    ready: "¿Preparado?",
    finished:
      "Ejercicio terminado. Tómese un momento antes de continuar con su día.",
    minutes: "minutos",
    seconds: "segundos",
    lilo:
      "Lilo supervisa la calma desde su cojín.",
    meditationScript:
      "Bienvenido a la Sala de relajación del Centro de Investigación Cathy tenía razón. Póngase cómodo. Relaje suavemente los hombros. Deje que sus manos descansen sin esfuerzo. Cierre los ojos si lo desea. Inspire lentamente por la nariz. Luego exhale suavemente. Una vez más, inspire calma. Exhale las tensiones del día. Imagine la luz suave de las lámparas, el movimiento tranquilo del agua y los peces que avanzan sin prisa. Nada le pide que vaya más rápido en este momento. Sus pensamientos pueden pasar como pequeñas nubes. No necesita retenerlos. Simplemente respire. Sienta el suelo que le sostiene. Su cuerpo puede descansar. Su mente puede abrir espacio. Tome una última respiración profunda. Exhale lentamente. Cuando esté preparado, abra suavemente los ojos. El Centro seguirá aquí, y Lilo también.",
  },
} as const;

export default function RelaxationRoomPage({
  locale,
}: {
  locale: Locale;
}) {
  const t = copy[locale];

  const musicRef =
    useRef<HTMLAudioElement | null>(null);
  const aquariumVideoRef =
    useRef<HTMLVideoElement | null>(null);
  const fountainAudioRef =
  useRef<HTMLAudioElement | null>(null);  

  const fountainContextRef =
    useRef<AudioContext | null>(null);
  const fountainSourceRef =
    useRef<AudioBufferSourceNode | null>(null);

  const [aquariumOpen, setAquariumOpen] =
    useState(false);
  const [selectedTrack, setSelectedTrack] =
    useState<RelaxationTrack | null>(null);
  const [musicPlaying, setMusicPlaying] =
    useState(false);
  const [fountainPlaying, setFountainPlaying] =
    useState(false);
  const [meditationPlaying, setMeditationPlaying] =
    useState(false);
  const [meditationNotice, setMeditationNotice] =
    useState("");
  const [breathingActive, setBreathingActive] =
    useState(false);
  const [secondsRemaining, setSecondsRemaining] =
    useState(300);
  const [breathingFinished, setBreathingFinished] =
    useState(false);

  useEffect(() => {
    if (!selectedTrack || !musicRef.current) {
      return;
    }

    const audio = musicRef.current;
    audio.load();
    audio.volume = 0.3;

    void audio
      .play()
      .then(() => setMusicPlaying(true))
      .catch(() => setMusicPlaying(false));
  }, [selectedTrack]);

  useEffect(() => {
    if (!breathingActive) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setBreathingActive(false);
          setBreathingFinished(true);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [breathingActive]);

  useEffect(() => {
    function closeWithEscape(
      event: KeyboardEvent,
    ) {
      if (
        event.key === "Escape" &&
        aquariumOpen
      ) {
        closeAquarium();
      }
    }

    window.addEventListener(
      "keydown",
      closeWithEscape,
    );

    return () =>
      window.removeEventListener(
        "keydown",
        closeWithEscape,
      );
  }, [aquariumOpen]);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();

      fountainSourceRef.current?.stop();

      void fountainContextRef.current?.close();

      musicRef.current?.pause();
      aquariumVideoRef.current?.pause();
    };
  }, []);

  function toggleTrack(track: RelaxationTrack) {
    const audio = musicRef.current;

    if (
      selectedTrack?.id === track.id &&
      audio
    ) {
      if (audio.paused) {
        void audio
          .play()
          .then(() => setMusicPlaying(true))
          .catch(() =>
            setMusicPlaying(false),
          );
      } else {
        audio.pause();
        setMusicPlaying(false);
      }

      return;
    }

    setSelectedTrack(track);
  }

  function changeMusicVolume(value: string) {
    if (musicRef.current) {
      musicRef.current.volume =
        Number(value);
    }
  }

  async function toggleFountain() {
  const audio = fountainAudioRef.current;

  if (!audio) {
    return;
  }

  if (audio.paused) {
    audio.volume = 0.7;

    try {
      await audio.play();
      setFountainPlaying(true);
    } catch {
      setFountainPlaying(false);
    }
  } else {
    audio.pause();
    setFountainPlaying(false);
  }
}
    


  function toggleMeditation() {
    if (
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    ) {
      setMeditationNotice(
        t.meditationUnavailable,
      );
      return;
    }

    if (meditationPlaying) {
      window.speechSynthesis.cancel();
      setMeditationPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        t.meditationScript,
      );

    utterance.lang =
      locale === "fr"
        ? "fr-CA"
        : locale === "es"
          ? "es-ES"
          : "en-CA";

    utterance.rate = 0.78;
    utterance.pitch = 0.92;
    utterance.volume = 0.85;

    const voices =
      window.speechSynthesis.getVoices();

    const preferredVoice = voices.find(
      (voice) =>
        voice.lang
          .toLowerCase()
          .startsWith(locale),
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () =>
      setMeditationPlaying(false);

    utterance.onerror = () =>
      setMeditationPlaying(false);

    setMeditationNotice("");
    setMeditationPlaying(true);
    window.speechSynthesis.speak(utterance);
  }

  function toggleBreathing() {
    if (breathingActive) {
      setBreathingActive(false);
      return;
    }

    setSecondsRemaining(300);
    setBreathingFinished(false);
    setBreathingActive(true);
  }

  function openAquarium() {
    setAquariumOpen(true);
    document.body.style.overflow = "hidden";

    window.setTimeout(() => {
      if (aquariumVideoRef.current) {
        aquariumVideoRef.current.muted = true;

        void aquariumVideoRef.current.play();
      }
    }, 50);
  }

  function closeAquarium() {
    aquariumVideoRef.current?.pause();
    setAquariumOpen(false);
    document.body.style.overflow = "";
  }

  const elapsedSeconds =
    300 - secondsRemaining;

  const breathingPhase =
    Math.floor(elapsedSeconds / 5) % 2 === 0
      ? "inhale"
      : "exhale";

  const displayedMinutes = Math.floor(
    secondsRemaining / 60,
  );

  const displayedSeconds =
    secondsRemaining % 60;

  return (
    <main className="relaxationRoom">
      <header className="roomHeader">
        <p className="eyebrow">CWRC</p>

        <h1>{t.title}</h1>

        <p className="subtitle">
          {t.subtitle}
        </p>

        <p className="silentNotice">
          🔇 {t.noAutomaticSound}
        </p>
      </header>

      <section className="roomFrame">
        <img
          src="/images/salle-detente.png"
          alt={t.title}
          className="roomImage"
        />
      </section>

      <p className="liloNote">
        🐩 {t.lilo}
      </p>

      <section className="aquariumCard">
        <div className="cardIcon">🐠</div>

        <div className="cardText">
          <h2>{t.aquariumTitle}</h2>
          <p>{t.aquariumText}</p>
        </div>

        <button
          type="button"
          className="primaryButton"
          onClick={openAquarium}
        >
          {t.openAquarium}
        </button>
      </section>

      <section className="controlsGrid">
        <article className="controlCard musicCard">
          <div className="cardIcon">🎼</div>

          <h2>{t.musicTitle}</h2>
          <p>{t.musicText}</p>
          <div className="youtubeTracks">
  <a
    href="https://www.youtube.com/watch?v=xEv2_YqDWyc"
    target="_blank"
    rel="noopener noreferrer"
    className="youtubeButton"
  >
    🎋{" "}
    {locale === "fr"
      ? "Bambou, eau et musique relaxante"
      : locale === "en"
        ? "Bamboo, water and relaxing music"
        : "Bambú, agua y música relajante"}
  </a>

  <a
    href="https://www.youtube.com/watch?v=F_-RF5wKPnQ"
    target="_blank"
    rel="noopener noreferrer"
    className="youtubeButton"
  >
    🔔{" "}
    {locale === "fr"
      ? "Sons tibétains de relaxation"
      : locale === "en"
        ? "Tibetan relaxation sounds"
        : "Sonidos tibetanos de relajación"}
  </a>
</div>

          <audio
            ref={musicRef}
            src={selectedTrack?.src}
            loop
            preload="metadata"
            onPlay={() =>
              setMusicPlaying(true)
            }
            onPause={() =>
              setMusicPlaying(false)
            }
          />

          <div className="trackList">
            {tracks.map((track) => {
              const selected =
                selectedTrack?.id === track.id;

              return (
                <button
                  key={track.id}
                  type="button"
                  className={
                    selected
                      ? "trackButton selected"
                      : "trackButton"
                  }
                  onClick={() =>
                    toggleTrack(track)
                  }
                >
                  <span>{track.icon}</span>

                  <span>
                    {t.trackNames[track.id]}
                  </span>

                  <span>
                    {selected && musicPlaying
                      ? "⏸"
                      : "▶"}
                  </span>
                </button>
              );
            })}
          </div>

          <label className="volumeControl">
            {t.volume}

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              defaultValue="0.3"
              onChange={(event) =>
                changeMusicVolume(
                  event.target.value,
                )
              }
            />
          </label>
        </article>

        <article className="controlCard">
          <div className="cardIcon">⛲</div>

          <h2>{t.fountainTitle}</h2>
          <p>{t.fountainText}</p>
          <audio
  ref={fountainAudioRef}
  src="/audio/fontaine.mp3"
  loop
  preload="metadata"
  onPlay={() => setFountainPlaying(true)}
  onPause={() => setFountainPlaying(false)}
/>

          <div
            className={
              fountainPlaying
                ? "waterVisual active"
                : "waterVisual"
            }
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </div>

          <button
            type="button"
            className="primaryButton"
            onClick={toggleFountain}
          >
            {fountainPlaying
              ? `⏹ ${t.fountainOff}`
              : `▶ ${t.fountainOn}`}
          </button>
        </article>

        <article className="controlCard">
          <div className="cardIcon">🧘</div>

          <h2>{t.meditationTitle}</h2>
          <p>{t.meditationText}</p>

          <div
            className={
              meditationPlaying
                ? "meditationOrb active"
                : "meditationOrb"
            }
            aria-hidden="true"
          />

          <button
            type="button"
            className="primaryButton"
            onClick={toggleMeditation}
          >
            {meditationPlaying
              ? `⏹ ${t.meditationStop}`
              : `▶ ${t.meditationStart}`}
          </button>

          {meditationNotice && (
            <p className="notice">
              {meditationNotice}
            </p>
          )}
        </article>

        <article className="controlCard breathingCard">
          <div className="cardIcon">🫁</div>

          <h2>{t.breathingTitle}</h2>
          <p>{t.breathingText}</p>

          <div
            className={
              breathingActive
                ? `breathingCircle ${breathingPhase}`
                : "breathingCircle"
            }
          >
            <span>
              {breathingActive
                ? breathingPhase === "inhale"
                  ? t.inhale
                  : t.exhale
                : t.ready}
            </span>
          </div>

          <p className="timer">
            {displayedMinutes
              .toString()
              .padStart(2, "0")}
            :
            {displayedSeconds
              .toString()
              .padStart(2, "0")}
          </p>

          <button
            type="button"
            className="primaryButton"
            onClick={toggleBreathing}
          >
            {breathingActive
              ? t.breathingStop
              : t.breathingStart}
          </button>

          {breathingFinished && (
            <p className="finishedMessage">
              {t.finished}
            </p>
          )}
        </article>
      </section>

      {aquariumOpen && (
        <div
          className="aquariumModal"
          role="dialog"
          aria-modal="true"
          aria-label={t.aquariumLabel}
        >
          <video
            ref={aquariumVideoRef}
            className="aquariumVideo"
            src="/videos/aquarium.mp4"
            loop
            muted
            playsInline
            controls
          />

          <button
            type="button"
            className="closeAquarium"
            onClick={closeAquarium}
          >
            ✕ {t.closeAquarium}
          </button>
        </div>
      )}

      <style jsx>{`
        .relaxationRoom {
          width: 100%;
          color: #3f352a;
        }

        .roomHeader {
          max-width: 850px;
          margin: 0 auto 24px;
          text-align: center;
        }

        .eyebrow {
          margin: 0;
          color: #a07838;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .roomHeader h1 {
          margin: 6px 0 10px;
          color: #66543c;
          font-family: Georgia, serif;
          font-size: clamp(2.2rem, 6vw, 4rem);
        }

        .subtitle {
          font-size: 1.08rem;
          line-height: 1.6;
        }

        .silentNotice {
          display: inline-block;
          margin: 6px 0 0;
          padding: 7px 13px;
          border: 1px solid
            rgba(102, 84, 60, 0.25);
          border-radius: 999px;
          background: #f7f0e4;
          color: #6b5b47;
          font-size: 0.88rem;
          font-weight: 700;
        }

        .roomFrame {
          width: 100%;
          max-width: 1672px;
          margin: 0 auto;
          overflow: hidden;
          border: 5px solid #4c3b29;
          border-radius: 17px;
          background: #231d18;
          box-shadow:
            0 22px 58px
              rgba(57, 43, 29, 0.3),
            0 0 0 2px #b08a4e;
        }

        .roomImage {
          display: block;
          width: 100%;
          height: auto;
        }

        .liloNote {
          margin: 18px auto 0;
          color: #695a47;
          text-align: center;
          font-family: Georgia, serif;
          font-style: italic;
        }

        .aquariumCard {
          display: grid;
          max-width: 1050px;
          margin: 34px auto 0;
          padding: 24px;
          grid-template-columns:
            auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 20px;
          border: 1px solid
            rgba(43, 111, 124, 0.3);
          border-radius: 20px;
          background:
            linear-gradient(
              135deg,
              #eff9f7,
              #e6f3f6
            );
          box-shadow: 0 14px 32px
            rgba(36, 91, 103, 0.13);
        }

        .cardText h2,
        .controlCard h2 {
          margin: 0 0 9px;
          color: #5d503d;
          font-family: Georgia, serif;
        }

        .cardText p,
        .controlCard p {
          margin: 0;
          line-height: 1.65;
        }

        .cardIcon {
          font-size: 2.3rem;
        }

        .primaryButton {
          padding: 11px 18px;
          cursor: pointer;
          border: 0;
          border-radius: 999px;
          background: #536f67;
          color: white;
          font-weight: 800;
          transition:
            transform 160ms ease,
            background 160ms ease;
        }

        .primaryButton:hover,
        .primaryButton:focus-visible {
          transform: translateY(-2px);
          background: #3f5d55;
          outline: none;
        }

        .controlsGrid {
          display: grid;
          max-width: 1050px;
          margin: 28px auto 0;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .controlCard {
          display: grid;
          padding: 25px;
          align-content: start;
          gap: 15px;
          border: 1px solid
            rgba(102, 84, 60, 0.23);
          border-radius: 20px;
          background: #faf7ef;
          box-shadow: 0 13px 30px
            rgba(75, 60, 42, 0.09);
        }

        .musicCard {
          background:
            linear-gradient(
              145deg,
              #faf7ef,
              #f2ecf6
            );
        }
        .youtubeTracks {
  display: grid;
  gap: 10px;
}

.youtubeButton {
  display: block;
  padding: 13px 15px;
  border: 1px solid rgba(83, 111, 103, 0.3);
  border-radius: 12px;
  background: white;
  color: #3f514b;
  text-decoration: none;
  font-weight: 800;
  line-height: 1.45;
}

.youtubeButton:hover,
.youtubeButton:focus-visible {
  border-color: #536f67;
  background: #e6f0ed;
  outline: none;
}

.trackList,
.volumeControl {
  display: none;
}    

        .trackList {
          display: grid;
          gap: 9px;
        }

        .trackButton {
          display: grid;
          width: 100%;
          padding: 11px 13px;
          grid-template-columns:
            auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          border: 1px solid
            rgba(83, 111, 103, 0.25);
          border-radius: 12px;
          background: white;
          color: #40382e;
          text-align: left;
          font-weight: 700;
        }

        .trackButton.selected {
          border-color: #536f67;
          background: #e6f0ed;
          box-shadow: 0 0 0 2px
            rgba(83, 111, 103, 0.11);
        }

        .volumeControl {
          display: grid;
          gap: 7px;
          color: #665a4b;
          font-size: 0.88rem;
          font-weight: 700;
        }

        .volumeControl input {
          accent-color: #536f67;
        }

        .waterVisual {
          display: flex;
          height: 75px;
          align-items: flex-end;
          justify-content: center;
          gap: 11px;
        }

        .waterVisual span {
          width: 8px;
          height: 24px;
          border-radius: 999px;
          background: #70aeba;
          opacity: 0.45;
        }

        .waterVisual.active span {
          animation: waterFlow 1.45s
            ease-in-out infinite;
        }

        .waterVisual.active span:nth-child(2) {
          animation-delay: 0.25s;
        }

        .waterVisual.active span:nth-child(3) {
          animation-delay: 0.5s;
        }

        .meditationOrb {
          width: 100px;
          height: 100px;
          margin: 8px auto;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              #fff8d8 0%,
              #d2b16a 45%,
              rgba(210, 177, 106, 0) 72%
            );
          opacity: 0.6;
        }

        .meditationOrb.active {
          animation: meditationGlow 5s
            ease-in-out infinite;
        }

        .breathingCard {
          text-align: center;
        }

        .breathingCard > .cardIcon,
        .breathingCard h2,
        .breathingCard > p {
          text-align: left;
        }

        .breathingCircle {
          display: grid;
          width: 155px;
          height: 155px;
          margin: 10px auto;
          place-items: center;
          border: 3px solid #87a89d;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              #edf7f3,
              #c8ddd5
            );
          color: #3e5d54;
          font-size: 1.2rem;
          font-weight: 800;
          box-shadow: 0 0 24px
            rgba(102, 151, 137, 0.22);
        }

        .breathingCircle.inhale {
          animation: inhale 5s linear forwards;
        }

        .breathingCircle.exhale {
          animation: exhale 5s linear forwards;
        }

        .timer {
          font-family: ui-monospace, monospace;
          font-size: 1.45rem;
          font-weight: 800;
        }

        .finishedMessage,
        .notice {
          padding: 12px;
          border-radius: 11px;
          background: #e8f3ec;
          color: #355b43;
          font-weight: 700;
          line-height: 1.55;
        }

        .aquariumModal {
          position: fixed;
          z-index: 2000;
          inset: 0;
          display: grid;
          padding: 20px;
          place-items: center;
          background: #030b0e;
        }

        .aquariumVideo {
          display: block;
          width: min(1500px, 100%);
          max-height: calc(100vh - 40px);
          border: 3px solid #9bc4c8;
          border-radius: 14px;
          background: black;
          box-shadow: 0 0 55px
            rgba(71, 181, 197, 0.35);
        }

        .closeAquarium {
          position: fixed;
          z-index: 2001;
          top: 18px;
          right: 20px;
          padding: 10px 16px;
          cursor: pointer;
          border: 1px solid
            rgba(255, 255, 255, 0.7);
          border-radius: 999px;
          background: rgba(3, 16, 21, 0.78);
          color: white;
          font-weight: 800;
          backdrop-filter: blur(6px);
        }

        @keyframes waterFlow {
          0%,
          100% {
            height: 22px;
            opacity: 0.35;
          }

          50% {
            height: 66px;
            opacity: 0.9;
          }
        }

        @keyframes meditationGlow {
          0%,
          100% {
            transform: scale(0.9);
            opacity: 0.45;
          }

          50% {
            transform: scale(1.14);
            opacity: 0.95;
          }
        }

        @keyframes inhale {
          from {
            transform: scale(0.72);
            background: #eaf4f0;
          }

          to {
            transform: scale(1.12);
            background: #c1ded5;
          }
        }

        @keyframes exhale {
          from {
            transform: scale(1.12);
            background: #c1ded5;
          }

          to {
            transform: scale(0.72);
            background: #eaf4f0;
          }
        }

        @media (max-width: 780px) {
          .roomFrame {
            border-width: 3px;
            border-radius: 10px;
          }

          .aquariumCard {
            padding: 20px;
            grid-template-columns: auto 1fr;
          }

          .aquariumCard .primaryButton {
            grid-column: 1 / -1;
            justify-self: start;
          }

          .controlsGrid {
            grid-template-columns: 1fr;
          }

          .controlCard {
            padding: 21px;
          }

          .aquariumModal {
            padding: 0;
          }

          .aquariumVideo {
            width: 100%;
            border: 0;
            border-radius: 0;
          }

          .closeAquarium {
            top: 10px;
            right: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .waterVisual.active span,
          .meditationOrb.active,
          .breathingCircle.inhale,
          .breathingCircle.exhale {
            animation: none;
          }

          .primaryButton {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}