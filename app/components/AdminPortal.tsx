"use client";

import {
  FormEvent,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import type { Locale } from "../i18n/config";

export type AdminQuestion = {
  id: string;
  created_at: string;
  visitor_name: string | null;
  visitor_email: string | null;
  category: string;
  category_en: string | null;
  category_es: string | null;
  question: string;
  question_en: string | null;
  question_es: string | null;
  response: string | null;
  response_en: string | null;
  response_es: string | null;
  answered_at: string | null;
  answered_by: string | null;
  status: string;
};

type SubmittedCase = {
  id: string;
  created_at: string;
  visitor_name: string | null;
  visitor_email: string | null;
  category: string;
  statement: string;
  context_and_evidence: string;
  desired_verdict: string;
  status: string;
};

type AdminPortalProps = {
  locale: Locale;
  selectedQuestionId?: string;
  onSelectQuestion?: (question: AdminQuestion) => void;
};

const copy = {
  fr: {
    title: "Le courrier arrivé",
    intro:
      "Connexion réservée à Cathy et Suzie — même le hibou administratif doit montrer patte blanche.",
    email: "Courriel",
    password: "Mot de passe",
    login: "Entrer dans le bureau",
    loading: "Ouverture des archives…",
    logout: "Déconnexion",
    questions: "Questions pour Cathy",
    cases: "Cas soumis",
    empty:
      "Rien à examiner pour l’instant. Le café peut respirer.",
    error:
      "Connexion impossible. Vérifiez le courriel et le mot de passe.",
    loadError:
      "Les archives refusent de s’ouvrir. Veuillez vous reconnecter.",
    from: "De",
    anonymous: "Visiteur anonyme",
    received: "Reçu le",
    context: "Contexte et éléments",
    verdict: "Décision souhaitée",
    examine: "Examiner cette question",
    selected: "Question sélectionnée",
  },

  en: {
    title: "Incoming correspondence",
    intro:
      "Sign-in is reserved for Cathy and Suzie — even the administrative owl must show identification.",
    email: "Email",
    password: "Password",
    login: "Enter the office",
    loading: "Opening the archives…",
    logout: "Sign out",
    questions: "Questions for Cathy",
    cases: "Submitted cases",
    empty:
      "Nothing to review yet. The coffee may relax.",
    error:
      "Unable to sign in. Check the email and password.",
    loadError:
      "The archives refuse to open. Please sign in again.",
    from: "From",
    anonymous: "Anonymous visitor",
    received: "Received",
    context: "Context and evidence",
    verdict: "Desired verdict",
    examine: "Review this question",
    selected: "Selected question",
  },

  es: {
    title: "Correspondencia recibida",
    intro:
      "El acceso está reservado a Cathy y Suzie; incluso el búho administrativo debe identificarse.",
    email: "Correo",
    password: "Contraseña",
    login: "Entrar en la oficina",
    loading: "Abriendo los archivos…",
    logout: "Cerrar sesión",
    questions: "Preguntas para Cathy",
    cases: "Casos presentados",
    empty:
      "Nada que revisar por ahora. El café puede descansar.",
    error:
      "No se pudo iniciar sesión. Comprueba el correo y la contraseña.",
    loadError:
      "Los archivos se niegan a abrirse. Vuelve a iniciar sesión.",
    from: "De",
    anonymous: "Visitante anónimo",
    received: "Recibido",
    context: "Contexto y elementos",
    verdict: "Decisión deseada",
    examine: "Examinar esta pregunta",
    selected: "Pregunta seleccionada",
  },
} as const;

export default function AdminPortal({
  locale,
  selectedQuestionId,
  onSelectQuestion,
}: AdminPortalProps) {
  const t = copy[locale];

  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);
  const [cases, setCases] = useState<SubmittedCase[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  useEffect(() => {
    const saved = sessionStorage.getItem("cwrc_admin_token");

    if (saved) {
      setToken(saved);
    }
  }, []);

  useEffect(() => {
    if (!token || !url || !key) {
      return;
    }

    void loadData(token);
  }, [token]);

  async function loadData(accessToken: string) {
    setBusy(true);
    setMessage("");

    try {
      const headers = {
        apikey: key!,
        Authorization: `Bearer ${accessToken}`,
      };

      const [questionResponse, caseResponse] =
        await Promise.all([
          fetch(
            `${url}/rest/v1/ask_cathy_questions?select=*&order=created_at.desc`,
            { headers },
          ),
          fetch(
            `${url}/rest/v1/submitted_cases?select=*&order=created_at.desc`,
            { headers },
          ),
        ]);

      if (!questionResponse.ok || !caseResponse.ok) {
        throw new Error("read failed");
      }

      setQuestions(await questionResponse.json());
      setCases(await caseResponse.json());
    } catch {
      setMessage(t.loadError);
      sessionStorage.removeItem("cwrc_admin_token");
      setToken("");
    } finally {
      setBusy(false);
    }
  }

  async function login(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!url || !key) {
      return;
    }

    setBusy(true);
    setMessage("");

    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch(
        `${url}/auth/v1/token?grant_type=password`,
        {
          method: "POST",
          headers: {
            apikey: key,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: String(data.get("email")),
            password: String(data.get("password")),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("login failed");
      }

      const result = await response.json();
      const administratorEmail = String(
        data.get("email"),
      );

      sessionStorage.setItem(
        "cwrc_admin_token",
        result.access_token,
      );

      setEmail(administratorEmail);
      setToken(result.access_token);
    } catch {
      setMessage(t.error);
      setBusy(false);
    }
  }

  async function logout() {
    if (url && key && token) {
      await fetch(`${url}/auth/v1/logout`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${token}`,
        },
      }).catch(() => undefined);
    }

    sessionStorage.removeItem("cwrc_admin_token");
    setToken("");
    setQuestions([]);
    setCases([]);
    setMessage("");
  }

  function selectQuestion(question: AdminQuestion) {
    onSelectQuestion?.(question);

    window.setTimeout(() => {
      document
        .getElementById("cwrc-draft-workspace")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  }

  return (
    <section style={portalStyle}>
      <div style={portalHeaderStyle}>
        <div>
          <p style={labelStyle}>🔐 ADMIN</p>

          <h2
            style={{
              margin: "4px 0",
              fontSize: "2rem",
            }}
          >
            {t.title}
          </h2>

          <p
            style={{
              margin: "8px 0 0",
              lineHeight: 1.6,
            }}
          >
            {t.intro}
          </p>
        </div>

        {token && (
          <button
            onClick={logout}
            style={outlineButtonStyle}
          >
            {t.logout}
          </button>
        )}
      </div>

      {!token ? (
        <form onSubmit={login} style={loginStyle}>
          <label style={fieldStyle}>
            {t.email}

            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              style={inputStyle}
            />
          </label>

          <label style={fieldStyle}>
            {t.password}

            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              style={inputStyle}
            />
          </label>

          <button disabled={busy} style={buttonStyle}>
            {busy ? t.loading : t.login}
          </button>
        </form>
      ) : busy ? (
        <p style={noticeStyle}>☕ {t.loading}</p>
      ) : (
        <div style={columnsStyle}>
          <div>
            <h3 style={listTitleStyle}>
              {t.questions}{" "}
              <span style={countStyle}>
                {questions.length}
              </span>
            </h3>

            {questions.length === 0 ? (
              <p style={noticeStyle}>{t.empty}</p>
            ) : (
              <div style={listStyle}>
                {questions.map((item) => {
                  const isSelected =
                    item.id === selectedQuestionId;

                  return (
                    <article
                      key={item.id}
                      style={{
                        ...itemStyle,
                        ...(isSelected
                          ? selectedItemStyle
                          : {}),
                      }}
                    >
                      <Meta item={item} t={t} />

                      <h4 style={itemTitleStyle}>
                        {item.category}
                      </h4>

                      <p style={textStyle}>
                        {item.question}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          selectQuestion(item)
                        }
                        style={
                          isSelected
                            ? selectedButtonStyle
                            : buttonStyle
                        }
                      >
                        {isSelected
                          ? `✓ ${t.selected}`
                          : t.examine}
                      </button>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          <AdminList
            title={t.cases}
            items={cases}
            empty={t.empty}
          >
            {(item) => (
              <>
                <Meta item={item} t={t} />

                <h4 style={itemTitleStyle}>
                  {item.category}
                </h4>

                <p style={textStyle}>
                  <strong>{item.statement}</strong>
                </p>

                <p style={textStyle}>
                  <strong>{t.context}:</strong>{" "}
                  {item.context_and_evidence}
                </p>

                <p style={textStyle}>
                  <strong>{t.verdict}:</strong>{" "}
                  {item.desired_verdict}
                </p>
              </>
            )}
          </AdminList>
        </div>
      )}

      {message && (
        <p role="alert" style={errorStyle}>
          {message}
        </p>
      )}

      {email && token && (
        <p
          style={{
            fontSize: ".82rem",
            color: "#6E5B3F",
            marginBottom: 0,
          }}
        >
          ✓ {email}
        </p>
      )}
    </section>
  );
}

function AdminList<T extends { id: string }>({
  title,
  items,
  empty,
  children,
}: {
  title: string;
  items: T[];
  empty: string;
  children: (item: T) => ReactNode;
}) {
  return (
    <div>
      <h3 style={listTitleStyle}>
        {title}{" "}
        <span style={countStyle}>{items.length}</span>
      </h3>

      {items.length === 0 ? (
        <p style={noticeStyle}>{empty}</p>
      ) : (
        <div style={listStyle}>
          {items.map((item) => (
            <article key={item.id} style={itemStyle}>
              {children(item)}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function Meta({
  item,
  t,
}: {
  item: AdminQuestion | SubmittedCase;
  t: (typeof copy)[Locale];
}) {
  return (
    <div style={metaStyle}>
      <span>
        {t.from}: {item.visitor_name || t.anonymous}
      </span>

      <span>
        {t.received}:{" "}
        {new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(item.created_at))}
      </span>

      <span style={statusStyle}>{item.status}</span>
    </div>
  );
}

const portalStyle = {
  marginTop: "42px",
  padding: "28px",
  borderRadius: "24px",
  backgroundColor: "#FFF9EE",
  border: "1px solid rgba(138,106,61,.3)",
  boxShadow: "0 14px 35px rgba(16,42,76,.1)",
};

const portalHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
  flexWrap: "wrap" as const,
};

const labelStyle = {
  margin: 0,
  letterSpacing: ".15em",
  fontSize: ".78rem",
  fontWeight: "bold",
  color: "#8A6A3D",
};

const loginStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "18px",
  alignItems: "end",
  marginTop: "26px",
};

const fieldStyle = {
  display: "grid",
  gap: "7px",
  fontWeight: "bold",
};

const inputStyle = {
  padding: "13px 15px",
  border: "1px solid rgba(16,42,76,.28)",
  borderRadius: "11px",
  fontSize: "1rem",
  background: "white",
  color: "#102A4C",
};

const buttonStyle = {
  padding: "12px 18px",
  border: 0,
  borderRadius: "999px",
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  fontWeight: "bold",
  cursor: "pointer",
};

const selectedButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#D8C49A",
  color: "#102A4C",
};

const outlineButtonStyle = {
  ...buttonStyle,
  backgroundColor: "transparent",
  color: "#102A4C",
  border: "1px solid #102A4C",
};

const columnsStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(320px,1fr))",
  gap: "28px",
  marginTop: "30px",
};

const listTitleStyle = {
  fontSize: "1.4rem",
  borderBottom: "2px solid #D8C49A",
  paddingBottom: "10px",
};

const countStyle = {
  display: "inline-grid",
  placeItems: "center",
  minWidth: "28px",
  height: "28px",
  borderRadius: "999px",
  backgroundColor: "#102A4C",
  color: "white",
  fontSize: ".82rem",
};

const listStyle = {
  display: "grid",
  gap: "14px",
  maxHeight: "620px",
  overflowY: "auto" as const,
  paddingRight: "5px",
};

const itemStyle = {
  padding: "18px",
  borderRadius: "15px",
  backgroundColor: "white",
  border: "2px solid transparent",
  borderLeft: "5px solid #8A6A3D",
  transition: "border-color .2s, transform .2s",
};

const selectedItemStyle = {
  border: "2px solid #102A4C",
  borderLeft: "7px solid #102A4C",
  transform: "translateY(-2px)",
  boxShadow: "0 10px 24px rgba(16,42,76,.14)",
};

const metaStyle = {
  display: "flex",
  gap: "8px 14px",
  flexWrap: "wrap" as const,
  fontSize: ".78rem",
  color: "#6E5B3F",
};

const statusStyle = {
  padding: "2px 8px",
  borderRadius: "999px",
  backgroundColor: "#F1E4CA",
  fontWeight: "bold",
};

const itemTitleStyle = {
  margin: "13px 0 7px",
  fontSize: "1.1rem",
};

const textStyle = {
  lineHeight: 1.6,
  whiteSpace: "pre-wrap" as const,
};

const noticeStyle = {
  padding: "18px",
  borderRadius: "12px",
  backgroundColor: "#F7F1E6",
  lineHeight: 1.6,
};

const errorStyle = {
  ...noticeStyle,
  backgroundColor: "#FFF0ED",
  color: "#74372C",
  border: "1px solid #C77A6C",
};