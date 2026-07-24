"use client";

import {useEffect, useRef, useState} from "react";
import type {Locale} from "../i18n/config";

type CategoryId =
  | "spanish"
  | "portuguese"
  | "english"
  | "quebec"
  | "jazz"
  | "classical"
  | "african";

type Track = {
  id: string;
  category: CategoryId;
  title: string;
  artist: string;
  file: string;
  source: string;
  license: string;
};

const tracks: Track[] = [
  {id: "es-01", category: "spanish", title: "No Puedes Conmigo", artist: "María Isabel García López", file: "espagnol-01.mp3", source: "https://pixabay.com/music/search/spanish%20songs/", license: "Licence Pixabay"},
  {id: "es-02", category: "spanish", title: "Colores Brillan", artist: "BusinessStar", file: "espagnol-02.mp3", source: "https://pixabay.com/music/search/spanish%20songs/", license: "Licence Pixabay"},
  {id: "es-03", category: "spanish", title: "Estás en Mis Venas", artist: "Chris Photography", file: "espagnol-03.mp3", source: "https://pixabay.com/music/search/spanish%20songs/", license: "Licence Pixabay"},
  {id: "es-04", category: "spanish", title: "Pulso en la Oscuridad", artist: "Susan Lu", file: "espagnol-04.mp3", source: "https://pixabay.com/music/search/spanish%20songs/", license: "Licence Pixabay"},
  {id: "es-05", category: "spanish", title: "Eterno Amor", artist: "Carvit56", file: "espagnol-05.mp3", source: "https://pixabay.com/music/search/spanish%20songs/", license: "Licence Pixabay"},

  {id: "pt-01", category: "portuguese", title: "Sede Sem Fim V1", artist: "BorischCK", file: "portugais-01.mp3", source: "https://pixabay.com/music/search/portuguese/", license: "Licence Pixabay"},
  {id: "pt-02", category: "portuguese", title: "Filhos do Atlântico", artist: "J3zi3l", file: "portugais-02.mp3", source: "https://pixabay.com/music/search/portuguese/", license: "Licence Pixabay"},
  {id: "pt-03", category: "portuguese", title: "Maré", artist: "Biancabealla", file: "portugais-03.mp3", source: "https://pixabay.com/music/search/portuguese/", license: "Licence Pixabay"},
  {id: "pt-04", category: "portuguese", title: "Fado da Voz Habitante", artist: "Djovan", file: "portugais-04.mp3", source: "https://pixabay.com/music/search/portuguese/", license: "Licence Pixabay"},
  {id: "pt-05", category: "portuguese", title: "Noite de Saudade", artist: "Djovan", file: "portugais-05.mp3", source: "https://pixabay.com/music/search/portuguese/", license: "Licence Pixabay"},

  {id: "en-01", category: "english", title: "With All Due Disrespect", artist: "MoonpetalMedia", file: "anglais-01.mp3", source: "https://pixabay.com/music/vocal-with-all-due-disrespect-female-vocals-504652/", license: "Licence Pixabay"},
  {id: "en-02", category: "english", title: "Ruin Me", artist: "MoonpetalMedia", file: "anglais-02.mp3", source: "https://pixabay.com/music/vocal-ruin-me-female-vocals-501159/", license: "Licence Pixabay"},
  {id: "en-03", category: "english", title: "Me & Mr. Almost", artist: "MoonpetalMedia", file: "anglais-03.mp3", source: "https://pixabay.com/music/pop-me-amp-mr-almost-soulful-neo-soul-female-vocals-ballad-512145/", license: "Licence Pixabay"},
  {id: "en-04", category: "english", title: "Just This Time", artist: "MoonpetalMedia", file: "anglais-04.mp3", source: "https://pixabay.com/music/pop-just-this-time-emotional-indie-ballad-female-vocals-521141/", license: "Licence Pixabay"},
  {id: "en-05", category: "english", title: "Shelter in the Hay", artist: "Kaazoom", file: "anglais-05.mp3", source: "https://pixabay.com/music/vocal-shelter-in-the-hay-1940x27s-style-crooning-song-male-vocals-511337/", license: "Licence Pixabay"},
  {id: "en-06", category: "english", title: "Sunlit Dust", artist: "Djovan", file: "anglais-06.mp3", source: "https://pixabay.com/music/vocal-sunlit-dust-454967/", license: "Licence Pixabay"},
  {id: "en-07", category: "english", title: "Ghost Story", artist: "DrebdDroneFish", file: "anglais-07.mp3", source: "https://pixabay.com/music/vocal-ghost-story-170651/", license: "Licence Pixabay"},
  {id: "en-08", category: "english", title: "Happy", artist: "Omar Hakeem feat. Fajr John", file: "anglais-08.mp3", source: "https://pixabay.com/music/vocal-omar-hakeem-ft-fajr-john-happy-vocals-only-129997/", license: "Licence Pixabay"},
  {id: "en-09", category: "english", title: "Move Over Beethoven", artist: "MoonpetalMedia", file: "anglais-09.mp3", source: "https://pixabay.com/music/move-over-beethoven-cinematic-pop-female-vocals-511359/", license: "Licence Pixabay"},
  {id: "en-10", category: "english", title: "Rain in My City", artist: "MoonpetalMedia", file: "anglais-10.mp3", source: "https://pixabay.com/music/pop-rain-in-my-city-female-vocals-spanish-acoustic-mood-512147/", license: "Licence Pixabay"},

  {id: "qc-01", category: "quebec", title: "Un Canadien errant", artist: "Chant traditionnel québécois", file: "quebec-01.mp3", source: "https://commons.wikimedia.org/wiki/Category:Audio_files_of_Quebec", license: "Œuvre du domaine public — enregistrement libre à confirmer"},
  {id: "qc-02", category: "quebec", title: "À la claire fontaine", artist: "Chant traditionnel québécois", file: "quebec-02.mp3", source: "https://commons.wikimedia.org/wiki/Category:%C3%80_la_claire_fontaine", license: "Œuvre du domaine public — enregistrement libre à confirmer"},
  {id: "qc-03", category: "quebec", title: "Alouette", artist: "Chant traditionnel québécois", file: "quebec-03.mp3", source: "https://commons.wikimedia.org/wiki/Category:Alouette_(song)", license: "Œuvre du domaine public — enregistrement libre à confirmer"},
  {id: "qc-04", category: "quebec", title: "Vive la Canadienne", artist: "Chant traditionnel québécois", file: "quebec-04.mp3", source: "https://commons.wikimedia.org/", license: "Œuvre du domaine public — enregistrement libre à confirmer"},
  {id: "qc-05", category: "quebec", title: "C’est l’aviron", artist: "Chant traditionnel québécois", file: "quebec-05.mp3", source: "https://commons.wikimedia.org/", license: "Œuvre du domaine public — enregistrement libre à confirmer"},

  {id: "jz-01", category: "jazz", title: "Smooth Jazz Lounge – Relaxing Evening", artist: "Alex Morgan", file: "jazz-01.mp3", source: "https://pixabay.com/music/bossa-nova-smooth-jazz-lounge-relaxing-evening-537465/", license: "Licence Pixabay"},
  {id: "jz-02", category: "jazz", title: "Jazz Lounge", artist: "Alex Grohl", file: "jazz-02.mp3", source: "https://pixabay.com/music/smooth-jazz-jazz-lounge-516757/", license: "Licence Pixabay"},
  {id: "jz-03", category: "jazz", title: "Smooth Lounge", artist: "Sonican", file: "jazz-03.mp3", source: "https://pixabay.com/music/smooth-jazz-smooth-lounge-382656/", license: "Licence Pixabay"},
  {id: "jz-04", category: "jazz", title: "Amber Reflections", artist: "AudioCoffee", file: "jazz-04.mp3", source: "https://pixabay.com/music/smooth-jazz-royalty-free-jazz-amber-reflections-355583/", license: "Licence Pixabay"},
  {id: "jz-05", category: "jazz", title: "Tonight I’m Yours", artist: "Sonican", file: "jazz-05.mp3", source: "https://pixabay.com/music/smooth-jazz-tonight-ix27m-yours-1-min-edit-smooth-lounge-jazz-413636/", license: "Licence Pixabay"},

  {id: "cl-01", category: "classical", title: "Chopinistic View", artist: "Trygve Larsen / Nesrality", file: "classique-01.mp3", source: "https://pixabay.com/music/classical-piano-trygve-larsen-chopinistic-view-chopin-classical-piano-style-12245/", license: "Licence Pixabay"},
  {id: "cl-02", category: "classical", title: "Warm Memories", artist: "Tunetank", file: "classique-02.mp3", source: "https://pixabay.com/music/classical-piano-warm-memories-350061/", license: "Licence Pixabay"},
  {id: "cl-03", category: "classical", title: "Moonlit Night", artist: "Clavier Music", file: "classique-03.mp3", source: "https://pixabay.com/music/classical-piano-moonlit-night-relaxing-piano-241542/", license: "Licence Pixabay"},
  {id: "cl-04", category: "classical", title: "Classical Sentimental Piano Music", artist: "Tunetank", file: "classique-04.mp3", source: "https://pixabay.com/music/classical-piano-classical-sentimental-piano-music-347285/", license: "Licence Pixabay"},
  {id: "cl-05", category: "classical", title: "Beethoven Concert No. 3", artist: "Clavier Music", file: "classique-05.mp3", source: "https://pixabay.com/music/classical-piano-beethoven-concert-nr3-relaxing-classical-piano-216328/", license: "Licence Pixabay"},

  {id: "af-01", category: "african", title: "African Village Life", artist: "Geoff Harvey", file: "afrique-01.mp3", source: "https://pixabay.com/music/world-african-village-life-362406/", license: "Licence Pixabay"},
  {id: "af-02", category: "african", title: "Bounding African Hip Hop", artist: "Catch22Music", file: "afrique-02.mp3", source: "https://pixabay.com/music/beats-bounding-african-hip-hop-full-366130/", license: "Licence Pixabay"},
  {id: "af-03", category: "african", title: "Uplifting Africa", artist: "Umbrella", file: "afrique-03.mp3", source: "https://pixabay.com/music/upbeat-uplifting-africa-84075/", license: "Licence Pixabay"},
  {id: "af-04", category: "african", title: "African Paradise", artist: "StartMusick", file: "afrique-04.mp3", source: "https://pixabay.com/music/afrobeat-african-paradise-216689/", license: "Licence Pixabay"},
  {id: "af-05", category: "african", title: "The Soul of Africa", artist: "Music Unlimited", file: "afrique-05.mp3", source: "https://pixabay.com/music/adventure-the-soul-of-africa-african-cinematic-ethnic-115225/", license: "Licence Pixabay"},
];

const categoryIcons: Record<CategoryId, string> = {
  spanish: "🇪🇸",
  portuguese: "🇵🇹",
  english: "🇬🇧",
  quebec: "⚜️",
  jazz: "🎷",
  classical: "🎻",
  african: "🌍",
};

const copy = {
  fr: {
    title: "Le gramophone du Grand Salon",
    intro: "Choisissez une catégorie, puis une pièce. Rien ne démarre sans votre clic et aucune pièce ne joue en boucle.",
    categories: {spanish: "Chansons espagnoles", portuguese: "Chansons portugaises", english: "Chansons anglaises", quebec: "Musique québécoise", jazz: "Jazz", classical: "Classique", african: "Musiques africaines"} as Record<CategoryId, string>,
    back: "Catégories",
    close: "Fermer",
    play: "Écouter",
    pause: "Pause",
    resume: "Reprendre",
    stop: "Arrêter",
    nowPlaying: "À l’écoute",
    credit: "Crédit et licence",
    missing: "Cette piste sera disponible dès que son fichier audio aura été ajouté.",
  },
  en: {
    title: "The Grand Lounge Gramophone",
    intro: "Choose a category, then a track. Nothing starts without your click, and no track loops.",
    categories: {spanish: "Spanish songs", portuguese: "Portuguese songs", english: "English songs", quebec: "Québec music", jazz: "Jazz", classical: "Classical", african: "African music"} as Record<CategoryId, string>,
    back: "Categories",
    close: "Close",
    play: "Listen",
    pause: "Pause",
    resume: "Resume",
    stop: "Stop",
    nowPlaying: "Now playing",
    credit: "Credit and licence",
    missing: "This track will be available once its audio file has been added.",
  },
  es: {
    title: "El gramófono del Gran Salón",
    intro: "Elige una categoría y luego una pista. Nada comienza sin tu clic y ninguna pista se repite.",
    categories: {spanish: "Canciones españolas", portuguese: "Canciones portuguesas", english: "Canciones inglesas", quebec: "Música quebequense", jazz: "Jazz", classical: "Clásica", african: "Músicas africanas"} as Record<CategoryId, string>,
    back: "Categorías",
    close: "Cerrar",
    play: "Escuchar",
    pause: "Pausa",
    resume: "Continuar",
    stop: "Detener",
    nowPlaying: "Reproduciendo",
    credit: "Crédito y licencia",
    missing: "Esta pista estará disponible cuando se añada su archivo de audio.",
  },
};

export default function GrandSalonGramophone({
  locale,
  onClose,
}: {
  locale: Locale;
  onClose: () => void;
}) {
  const text = copy[locale];
  const audioRef = useRef<HTMLAudioElement>(null);
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [current, setCurrent] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState("");

  const stop = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlaying(false);
  };

  const close = () => {
    stop();
    onClose();
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const chooseTrack = async (track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;
    setMessage("");
    setCurrent(track);
    audio.src = `/audio/gramophone/${track.file}`;
    audio.load();
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
      setMessage(text.missing);
    }
  };

  const togglePause = async () => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
        setMessage("");
      } catch {
        setMessage(text.missing);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const visibleTracks = category
    ? tracks.filter((track) => track.category === category)
    : [];

  return (
    <div className="backdrop" role="presentation" onClick={close}>
      <section
        className="player"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gramophone-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="close" type="button" onClick={close} aria-label={text.close}>×</button>
        <header>
          <span aria-hidden="true">♬</span>
          <h2 id="gramophone-title">{text.title}</h2>
          <p>{text.intro}</p>
        </header>

        {!category ? (
          <div className="categories">
            {(Object.keys(text.categories) as CategoryId[]).map((id) => {
              const count = tracks.filter((track) => track.category === id).length;
              return (
                <button key={id} type="button" onClick={() => setCategory(id)}>
                  <span className="categoryIcon" aria-hidden="true">{categoryIcons[id]}</span>
                  <strong>{text.categories[id]}</strong>
                  <small>{count}</small>
                </button>
              );
            })}
          </div>
        ) : (
          <>
            <button className="back" type="button" onClick={() => setCategory(null)}>← {text.back}</button>
            <h3>{categoryIcons[category]} {text.categories[category]}</h3>
            <div className="tracks">
              {visibleTracks.map((track) => (
                <article className={current?.id === track.id ? "track active" : "track"} key={track.id}>
                  <div>
                    <strong>{track.title}</strong>
                    <span>{track.artist}</span>
                    <a href={track.source} target="_blank" rel="noreferrer">{text.credit}: {track.license}</a>
                  </div>
                  <button type="button" onClick={() => chooseTrack(track)} aria-label={`${text.play}: ${track.title}`}>▶ {text.play}</button>
                </article>
              ))}
            </div>
          </>
        )}

        {current && (
          <footer>
            <div>
              <small>{text.nowPlaying}</small>
              <strong>{current.title}</strong>
              <span>{current.artist}</span>
            </div>
            <div className="controls">
              <button type="button" onClick={togglePause}>{playing ? `Ⅱ ${text.pause}` : `▶ ${text.resume}`}</button>
              <button type="button" onClick={stop}>■ {text.stop}</button>
            </div>
            {message && <p role="status">{message}</p>}
          </footer>
        )}

        <audio
          ref={audioRef}
          preload="none"
          loop={false}
          onEnded={() => setPlaying(false)}
          onError={() => {
            setPlaying(false);
            setMessage(text.missing);
          }}
        />
      </section>

      <style jsx>{`
        .backdrop{position:fixed;z-index:1300;inset:0;display:grid;place-items:center;padding:20px;background:rgba(18,12,8,.78);backdrop-filter:blur(6px)}
        .player{position:relative;width:min(920px,100%);max-height:min(88vh,850px);overflow:auto;padding:32px;border:3px solid #d4a94f;border-radius:24px;color:#332014;background:linear-gradient(145deg,#fffaf0,#ead8b7);box-shadow:0 30px 90px #0009}
        .close{position:absolute;z-index:2;top:10px;right:14px;width:44px;height:44px;border:0;cursor:pointer;color:#54371f;background:transparent;font-size:2rem}
        header{text-align:center}
        header>span{display:block;color:#9b6b23;font-size:2.2rem}
        h2,h3{font-family:Georgia,"Times New Roman",serif;color:#56391f}
        h2{margin:4px 44px 8px;font-size:clamp(1.7rem,4vw,2.65rem)}
        header p{max-width:680px;margin:0 auto 24px;line-height:1.55}
        .categories{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px}
        .categories button{position:relative;display:grid;min-height:130px;place-items:center;padding:18px;cursor:pointer;border:1px solid #b98b41;border-radius:18px;color:#49301d;background:#fffaf0;box-shadow:0 8px 20px #4b2e1518}
        .categories button:hover,.categories button:focus-visible{transform:translateY(-2px);outline:3px solid #173a62}
        .categoryIcon{font-size:2rem}.categories strong{font-family:Georgia,"Times New Roman",serif;font-size:1.06rem}
        .categories small{position:absolute;right:10px;top:10px;display:grid;width:27px;height:27px;place-items:center;border-radius:50%;color:#fff;background:#173a62;font-weight:800}
        .back{padding:9px 14px;cursor:pointer;border:1px solid #9b7138;border-radius:999px;color:#54371f;background:#fff8e9;font-weight:800}
        h3{margin:18px 0 13px;font-size:1.55rem}
        .tracks{display:grid;gap:10px}
        .track{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:15px;border:1px solid #c9a56c;border-radius:15px;background:#fffaf3}
        .track.active{border-color:#173a62;box-shadow:inset 5px 0 #173a62}
        .track>div{display:grid;gap:4px}.track strong{font-family:Georgia,"Times New Roman",serif;font-size:1.05rem}.track span{color:#68482c}.track a{color:#164f86;font-size:.78rem}
        .track>button,.controls button{min-width:105px;padding:10px 13px;cursor:pointer;border:0;border-radius:999px;color:#fff;background:#173a62;font-weight:800}
        footer{position:sticky;bottom:-32px;display:flex;align-items:center;justify-content:space-between;gap:18px;margin:22px -32px -32px;padding:17px 32px;border-top:2px solid #d4a94f;background:#3f2919;color:#fff}
        footer>div:first-child{display:grid;gap:2px}footer small{color:#ebcb87;text-transform:uppercase;letter-spacing:.1em}footer span{color:#f5dfbb}
        .controls{display:flex;gap:9px}.controls button{background:#c28d35}.controls button:last-child{background:#78512f}
        footer p{width:100%;margin:0;color:#ffd8a6;font-size:.85rem}
        @media(max-width:650px){.backdrop{padding:8px;align-items:end}.player{max-height:92vh;padding:25px 16px;border-radius:20px 20px 10px 10px}.categories{grid-template-columns:1fr 1fr}.categories button{min-height:112px}.track{align-items:flex-start;flex-direction:column}.track>button{width:100%}footer{bottom:-25px;flex-direction:column;align-items:stretch;margin:18px -16px -25px;padding:14px 16px}.controls button{flex:1}}
      `}</style>
    </div>
  );
}