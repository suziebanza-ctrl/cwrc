"use client";

import {
  FormEvent,
  useRef,
  useState,
} from "react";
import type { Locale } from "../i18n/config";
import DiningRoomPublicReplies from "./DiningRoomPublicReplies";
type ResponsePreference =
  | "private"
  | "public"
  | "none";

const copy = {
  fr: {
    roomTitle: "La Salle à manger",
    roomSubtitle:
      "Deux places vous attendent à la table du CWRC.",
    music: "Musique douce",
    play: "Écouter",
    pause: "Arrêter",
    volume: "Volume",
    formTitle: "De quoi aimeriez-vous parler?",
    formIntro:
      "Nous sommes à votre écoute. Que ce soit pour une suggestion de recette, une blague, la soumission d’une œuvre, une idée, ou tout simplement pour nous parler de vous ou de votre région.",
    responseIntro:
      "Si vous désirez une réponse privée, vous pouvez laisser votre courriel. Pour une réponse publique, votre nom et votre courriel ne sont pas obligatoires. Vous pouvez également choisir de ne recevoir aucune réponse.",
    specialMoment:
      "Nous prenons ce temps spécial pour partager un moment avec vous.",
    category: "Sujet",
    categoryPlaceholder: "Choisissez un sujet",
    categories: {
      recipe: "Suggestion de recette",
      joke: "Une blague",
      artwork: "Soumission d’une œuvre",
      idea: "Une idée",
      region: "Ma région",
      about: "Parler de moi",
      other: "Autre",
    },
    message: "Votre message",
    messagePlaceholder:
      "Prenez place à notre table et racontez-nous…",
    responseChoice: "Souhaitez-vous une réponse?",
    privateResponse: "Oui, une réponse privée",
    privateHelp:
      "Votre courriel sera requis et ne sera jamais publié.",
    publicResponse: "Oui, une réponse publique",
    publicHelp:
      "Votre message pourra être publié seulement après approbation de Cathy ou Suzie.",
    noResponse: "Non, aucune réponse",
    noResponseHelp:
      "Votre message sera tout de même lu avec attention.",
    name: "Votre nom ou pseudonyme",
    optional: "facultatif",
    email: "Votre courriel",
    emailRequired: "requis pour une réponse privée",
    publishName:
      "Si une réponse publique est publiée, j’autorise l’affichage de mon nom ou pseudonyme.",
    privacy:
      "Votre courriel restera privé. Aucun message ni aucune réponse ne sera publié automatiquement.",
    send: "Envoyer à la table du CWRC",
    sending: "Amateur apporte votre message…",
    success:
      "Votre message est arrivé à notre table. Cathy, Suzie et toute l’équipe du CWRC vous remercient d’avoir partagé ce moment avec nous. 💜",
    error:
      "Amateur semble avoir déposé le message dans le mauvais classeur. Veuillez réessayer.",
    configuration:
      "La connexion sécurisée à Supabase n’est pas encore configurée.",
    emailMissing:
      "Veuillez inscrire votre courriel pour recevoir une réponse privée.",
  },

  en: {
    roomTitle: "The Dining Room",
    roomSubtitle:
      "Two places are waiting for you at the CWRC table.",
    music: "Soft music",
    play: "Listen",
    pause: "Stop",
    volume: "Volume",
    formTitle: "What would you like to talk about?",
    formIntro:
      "We are listening. You may suggest a recipe, share a joke, submit a work of art or an idea, or simply tell us about yourself or your region.",
    responseIntro:
      "If you would like a private reply, you may leave your email. For a public reply, your name and email are optional. You may also choose not to receive a reply.",
    specialMoment:
      "We are taking this special time to share a moment with you.",
    category: "Subject",
    categoryPlaceholder: "Choose a subject",
    categories: {
      recipe: "Recipe suggestion",
      joke: "A joke",
      artwork: "Submit a work of art",
      idea: "An idea",
      region: "My region",
      about: "Tell you about myself",
      other: "Other",
    },
    message: "Your message",
    messagePlaceholder:
      "Take a seat at our table and tell us…",
    responseChoice: "Would you like a reply?",
    privateResponse: "Yes, a private reply",
    privateHelp:
      "Your email will be required and will never be published.",
    publicResponse: "Yes, a public reply",
    publicHelp:
      "Your message may be published only after approval by Cathy or Suzie.",
    noResponse: "No reply",
    noResponseHelp:
      "Your message will still be read with care.",
    name: "Your name or nickname",
    optional: "optional",
    email: "Your email",
    emailRequired: "required for a private reply",
    publishName:
      "If a public reply is published, I authorize the display of my name or nickname.",
    privacy:
      "Your email will remain private. No message or reply will ever be published automatically.",
    send: "Send to the CWRC table",
    sending: "Amateur is carrying your message…",
    success:
      "Your message has arrived at our table. Cathy, Suzie and the entire CWRC team thank you for sharing this moment with us. 💜",
    error:
      "Amateur seems to have filed the message in the wrong cabinet. Please try again.",
    configuration:
      "The secure Supabase connection is not configured yet.",
    emailMissing:
      "Please enter your email to receive a private reply.",
  },

  es: {
    roomTitle: "El Comedor",
    roomSubtitle:
      "Dos lugares le esperan en la mesa del CWRC.",
    music: "Música suave",
    play: "Escuchar",
    pause: "Detener",
    volume: "Volumen",
    formTitle: "¿De qué le gustaría hablar hablar?",
    formIntro:
      "Estamos aquí para escucharle. Puede sugerir una receta, compartir un chiste, presentar una obra o una idea, o simplemente hablarnos de usted o de su región.",
    responseIntro:
      "Si desea una respuesta privada, puede dejar su correo. Para una respuesta pública, su nombre y correo son opcionales. También puede elegir no recibir respuesta.",
    specialMoment:
      "Dedicamos este momento especial a compartir con usted.",
    category: "Tema",
    categoryPlaceholder: "Elija un tema",
    categories: {
      recipe: "Sugerencia de receta",
      joke: "Un chiste",
      artwork: "Presentar una obra",
      idea: "Una idea",
      region: "Mi región",
      about: "Hablar de mí",
      other: "Otro",
    },
    message: "Su mensaje",
    messagePlaceholder:
      "Tome asiento en nuestra mesa y cuéntenos…",
    responseChoice: "¿Desea una respuesta?",
    privateResponse: "Sí, una respuesta privada",
    privateHelp:
      "Su correo será obligatorio y nunca se publicará.",
    publicResponse: "Sí, una respuesta pública",
    publicHelp:
      "Su mensaje solo podrá publicarse después de la aprobación de Cathy o Suzie.",
    noResponse: "No deseo respuesta",
    noResponseHelp:
      "Aun así, leeremos su mensaje con atención.",
    name: "Su nombre o seudónimo",
    optional: "opcional",
    email: "Su correo",
    emailRequired:
      "obligatorio para una respuesta privada",
    publishName:
      "Si se publica una respuesta, autorizo que aparezca mi nombre o seudónimo.",
    privacy:
      "Su correo permanecerá privado. Ningún mensaje ni respuesta se publicará automáticamente.",
    send: "Enviar a la mesa del CWRC",
    sending: "Amateur lleva su mensaje…",
    success:
      "Su mensaje ha llegado a nuestra mesa. Cathy, Suzie y todo el equipo del CWRC le agradecen haber compartido este momento con nosotros. 💜",
    error:
      "Parece que Amateur archivó el mensaje en el cajón equivocado. Inténtelo de nuevo.",
    configuration:
      "La conexión segura con Supabase aún no está configurada.",
    emailMissing:
      "Escriba su correo para recibir una respuesta privada.",
  },
} as const;

export default function DiningRoomPage({
  locale,
}: {
  locale: Locale;
}) {
  const t = copy[locale];
  const audioRef = useRef<HTMLAudioElement | null>(
    null,
  );

  const [playing, setPlaying] = useState(false);
  const [responsePreference, setResponsePreference] =
    useState<ResponsePreference>("none");
  const [state, setState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] =
    useState("");

  async function toggleMusic() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  function changeVolume(value: string) {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = Number(value);
    }
  }

  async function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (state === "sending") {
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    if (
      String(data.get("company") ?? "").trim()
    ) {
      setState("success");
      setStatusMessage(t.success);
      form.reset();
      setResponsePreference("none");
      return;
    }

    const email = String(
      data.get("visitor_email") ?? "",
    ).trim();

    if (
      responsePreference === "private" &&
      !email
    ) {
      setState("error");
      setStatusMessage(t.emailMissing);
      return;
    }

    const url =
      process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env
        .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
      setState("error");
      setStatusMessage(t.configuration);
      return;
    }

    const visitorName = String(
      data.get("visitor_name") ?? "",
    ).trim();

    const payload = {
      locale,
      visitor_name: visitorName || null,
      visitor_email: email || null,
      subject_type: String(
        data.get("subject_type") ?? "",
      ),
      message: String(
        data.get("message") ?? "",
      ).trim(),
      response_preference: responsePreference,
      publish_name:
        responsePreference === "public" &&
        Boolean(data.get("publish_name")) &&
        Boolean(visitorName),
      status: "new",
    };

    setState("sending");
    setStatusMessage("");

    try {
      const response = await fetch(
        `${url}/rest/v1/dining_room_messages`,
        {
          method: "POST",
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Supabase returned ${response.status}`,
        );
      }

      form.reset();
      setResponsePreference("none");
      setState("success");
      setStatusMessage(t.success);
    } catch (error) {
      console.error(
        "CWRC dining-room submission failed",
        error,
      );
      setState("error");
      setStatusMessage(t.error);
    }
  }

  return (
    <main className="diningRoom">
      <header className="roomHeader">
        <p className="eyebrow">CWRC</p>
        <h1>{t.roomTitle}</h1>
        <p>{t.roomSubtitle}</p>
      </header>

      <section className="imageFrame">
        <img
          src="/images/salle-manger.png"
          alt={t.roomTitle}
          className="roomImage"
        />
      </section>

      <section
        className="musicPanel"
        aria-label={t.music}
      >
        <audio
          ref={audioRef}
          src="/audio/cwrc-classical.mp3"
          loop
          preload="metadata"
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
        />

        <div>
          <p className="musicLabel">
            🎼 {t.music}
          </p>

          <button
            type="button"
            className="musicButton"
            onClick={toggleMusic}
          >
            {playing ? `⏸ ${t.pause}` : `▶ ${t.play}`}
          </button>
        </div>

        <label className="volumeControl">
          {t.volume}

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            defaultValue="0.3"
            aria-label={t.volume}
            onChange={(event) =>
              changeVolume(event.target.value)
            }
          />
        </label>
      </section>

      <section className="conversationSection">
        <div className="invitation">
          <p className="eyebrow">
            💌 CWRC
          </p>

          <h2>{t.formTitle}</h2>

          <p>{t.formIntro}</p>
          <p>{t.responseIntro}</p>

          <p className="specialMoment">
            {t.specialMoment}
          </p>
        </div>

        <form
          className="conversationForm"
          onSubmit={submit}
        >
          <label
            className="honeypot"
            aria-hidden="true"
          >
            Company
            <input
              name="company"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>

          <label className="field">
            {t.category}

            <select
              name="subject_type"
              required
              defaultValue=""
            >
              <option value="" disabled>
                {t.categoryPlaceholder}
              </option>

              {Object.entries(t.categories).map(
                ([value, label]) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {label}
                  </option>
                ),
              )}
            </select>
          </label>

          <label className="field">
            {t.message}

            <textarea
              name="message"
              rows={8}
              required
              minLength={5}
              placeholder={t.messagePlaceholder}
            />
          </label>

          <fieldset className="responseChoices">
            <legend>{t.responseChoice}</legend>

            <label className="responseCard">
              <input
                type="radio"
                name="response_preference"
                value="private"
                checked={
                  responsePreference === "private"
                }
                onChange={() =>
                  setResponsePreference("private")
                }
              />

              <span>
                <strong>{t.privateResponse}</strong>
                <small>{t.privateHelp}</small>
              </span>
            </label>

            <label className="responseCard">
              <input
                type="radio"
                name="response_preference"
                value="public"
                checked={
                  responsePreference === "public"
                }
                onChange={() =>
                  setResponsePreference("public")
                }
              />

              <span>
                <strong>{t.publicResponse}</strong>
                <small>{t.publicHelp}</small>
              </span>
            </label>

            <label className="responseCard">
              <input
                type="radio"
                name="response_preference"
                value="none"
                checked={
                  responsePreference === "none"
                }
                onChange={() =>
                  setResponsePreference("none")
                }
              />

              <span>
                <strong>{t.noResponse}</strong>
                <small>{t.noResponseHelp}</small>
              </span>
            </label>
          </fieldset>

          <div className="twoColumns">
            <label className="field">
              <span>
                {t.name}{" "}
                <small>({t.optional})</small>
              </span>

              <input
                name="visitor_name"
                type="text"
                autoComplete="name"
              />
            </label>

            <label className="field">
              <span>
                {t.email}{" "}
                <small>
                  (
                  {responsePreference === "private"
                    ? t.emailRequired
                    : t.optional}
                  )
                </small>
              </span>

              <input
                name="visitor_email"
                type="email"
                autoComplete="email"
                required={
                  responsePreference === "private"
                }
              />
            </label>
          </div>

          {responsePreference === "public" && (
            <label className="publishChoice">
              <input
                name="publish_name"
                type="checkbox"
              />

              <span>{t.publishName}</span>
            </label>
          )}

          <p className="privacy">
            🔒 {t.privacy}
          </p>

          <button
            type="submit"
            className="submitButton"
            disabled={state === "sending"}
          >
            {state === "sending"
              ? t.sending
              : t.send}
          </button>

          {statusMessage && (
            <div
              role="status"
              className={
                state === "success"
                  ? "status success"
                  : "status error"
              }
            >
              {statusMessage}
            </div>
          )}
        </form>
      </section>
      <DiningRoomPublicReplies locale={locale} />
      <style jsx>{`
        .diningRoom {
          width: 100%;
          color: #33253b;
        }

        .roomHeader {
          max-width: 850px;
          margin: 0 auto 24px;
          text-align: center;
        }

        .roomHeader h1,
        .invitation h2 {
          margin: 6px 0 12px;
          color: #5d315f;
          font-family: Georgia, "Times New Roman",
            serif;
        }

        .roomHeader h1 {
          font-size: clamp(2.2rem, 6vw, 4rem);
        }

        .roomHeader p {
          font-size: 1.08rem;
        }

        .eyebrow {
          margin: 0;
          color: #9a7228;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .imageFrame {
          width: 100%;
          max-width: 1672px;
          margin: 0 auto;
          overflow: hidden;
          border: 5px solid #482d32;
          border-radius: 18px;
          background: #2c181d;
          box-shadow:
            0 24px 60px rgba(50, 24, 39, 0.3),
            0 0 0 2px #b89454;
        }

        .roomImage {
          display: block;
          width: 100%;
          height: auto;
        }

        .musicPanel {
          display: flex;
          max-width: 760px;
          margin: 26px auto 0;
          padding: 18px 22px;
          align-items: center;
          justify-content: space-between;
          gap: 22px;
          border: 1px solid rgba(93, 49, 95, 0.25);
          border-radius: 18px;
          background: #f8f0f7;
          box-shadow: 0 10px 25px
            rgba(74, 42, 75, 0.1);
        }

        .musicLabel {
          margin: 0 0 9px;
          color: #5d315f;
          font-weight: 800;
        }

        .musicButton,
        .submitButton {
          cursor: pointer;
          border: 0;
          border-radius: 999px;
          background: #5d315f;
          color: white;
          font-weight: 800;
        }

        .musicButton {
          padding: 9px 18px;
        }

        .volumeControl {
          display: grid;
          min-width: 180px;
          gap: 6px;
          color: #604c62;
          font-size: 0.88rem;
          font-weight: 700;
        }

        .volumeControl input {
          accent-color: #6f3e70;
        }

        .conversationSection {
          display: grid;
          max-width: 1050px;
          margin: 42px auto 0;
          padding: 34px;
          grid-template-columns:
            minmax(0, 0.82fr) minmax(0, 1.18fr);
          gap: 42px;
          border: 1px solid
            rgba(154, 114, 40, 0.32);
          border-radius: 26px;
          background:
            linear-gradient(
              135deg,
              rgba(250, 244, 235, 0.98),
              rgba(245, 232, 244, 0.98)
            );
          box-shadow: 0 18px 45px
            rgba(74, 42, 75, 0.14);
        }

        .invitation h2 {
          font-size: clamp(2rem, 5vw, 3rem);
        }

        .invitation p {
          line-height: 1.75;
        }

        .specialMoment {
          padding: 16px;
          border-left: 4px solid #b89454;
          border-radius: 0 12px 12px 0;
          background: rgba(255, 255, 255, 0.62);
          color: #5d315f;
          font-family: Georgia, "Times New Roman",
            serif;
          font-size: 1.08rem;
          font-style: italic;
          font-weight: 700;
        }

        .conversationForm {
          position: relative;
          display: grid;
          gap: 21px;
        }

        .field {
          display: grid;
          gap: 8px;
          font-weight: 800;
        }

        .field small {
          color: #766277;
          font-weight: 400;
        }

        select,
        input,
        textarea {
          box-sizing: border-box;
          width: 100%;
          padding: 13px 15px;
          border: 1px solid
            rgba(75, 44, 77, 0.28);
          border-radius: 12px;
          background: white;
          color: #33253b;
          font-family: Georgia, "Times New Roman",
            serif;
          font-size: 1rem;
        }

        textarea {
          resize: vertical;
          line-height: 1.55;
        }

        select:focus,
        input:focus,
        textarea:focus {
          border-color: #7b477d;
          outline: 3px solid
            rgba(123, 71, 125, 0.14);
        }

        .responseChoices {
          display: grid;
          margin: 0;
          padding: 0;
          gap: 10px;
          border: 0;
        }

        .responseChoices legend {
          margin-bottom: 10px;
          font-weight: 800;
        }

        .responseCard {
          display: flex;
          padding: 13px 14px;
          align-items: flex-start;
          gap: 11px;
          cursor: pointer;
          border: 1px solid
            rgba(93, 49, 95, 0.22);
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.7);
        }

        .responseCard:has(input:checked) {
          border-color: #7b477d;
          background: #f1e1f0;
          box-shadow: 0 0 0 2px
            rgba(123, 71, 125, 0.1);
        }

        .responseCard input,
        .publishChoice input {
          width: auto;
          margin-top: 3px;
          accent-color: #6f3e70;
        }

        .responseCard span {
          display: grid;
          gap: 4px;
        }

        .responseCard small {
          color: #6f6070;
          line-height: 1.45;
        }

        .twoColumns {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .publishChoice {
          display: flex;
          padding: 14px;
          align-items: flex-start;
          gap: 10px;
          border-radius: 12px;
          background: #f1e1f0;
          line-height: 1.5;
        }

        .privacy {
          margin: 0;
          padding: 14px 16px;
          border-radius: 12px;
          background: #f7f1e6;
          color: #6e5b3f;
          font-size: 0.93rem;
          line-height: 1.6;
        }

        .submitButton {
          justify-self: start;
          padding: 14px 25px;
          font-size: 1rem;
          transition:
            transform 160ms ease,
            background 160ms ease;
        }

        .submitButton:hover:not(:disabled),
        .submitButton:focus-visible {
          transform: translateY(-2px);
          background: #764878;
        }

        .submitButton:disabled {
          cursor: wait;
          opacity: 0.62;
        }

        .status {
          padding: 17px;
          border-radius: 13px;
          font-weight: 700;
          line-height: 1.6;
        }

        .success {
          border: 1px solid #77a984;
          background: #e4f4e8;
          color: #244c2d;
        }

        .error {
          border: 1px solid #c77a6c;
          background: #fff0ed;
          color: #74372c;
        }

        .honeypot {
          position: absolute;
          left: -10000px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }

        @media (max-width: 820px) {
          .conversationSection {
            padding: 24px 18px;
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .musicPanel {
            align-items: stretch;
            flex-direction: column;
          }

          .volumeControl {
            min-width: 0;
          }

          .twoColumns {
            grid-template-columns: 1fr;
          }

          .imageFrame {
            border-width: 3px;
            border-radius: 10px;
          }
        }
      `}</style>
    </main>
  );
}