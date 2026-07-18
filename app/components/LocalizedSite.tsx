import Link from "next/link";
import type { Locale } from "../i18n/config";
import { localizedHref } from "../i18n/config";
import {
  adminExperience,
  forms,
  getContent,
  type FormContent,
  type StandardPage,
} from "../i18n/content";
import Footer from "./Footer";
import Header from "./Header";
import PageLayout from "./PageLayout";
import SubmissionForm from "./SubmissionForm";
import AdminDraftWorkspace from "./AdminDraftWorkspace";
import PublishedCases from "./PublishedCases";
import PublicArchives from "./PublicArchives";
import AdministrativeOffice from "./AdministrativeOffice";
import AmateurOfficeCard from "./AmateurOfficeCard";
import InteractiveSuzieOffice from "./InteractiveSuzieOffice";
import GeographyGame from "./GeographyGame";
import InteractiveKitchen from "./InteractiveKitchen";
import RecipeBook from "./RecipeBook";
import InteractiveLibrary from "./InteractiveLibrary";
import JokeBook from "./JokeBook";
import ContentManager from "./ContentManager";

export default function LocalizedSite({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const site = getContent(locale);

  if (!slug) {
    return <Entrance locale={locale} />;
  }

  if (slug === "home") {
    return <Home locale={locale} />;
  }

  if (slug === "rooms") {
    return <Rooms locale={locale} />;
  }

  if (slug === "ask-cathy") {
    return (
      <FormPage
        locale={locale}
        kind="ask"
        content={forms[locale].ask}
      />
    );
  }

  if (slug === "submit-case") {
    return (
      <FormPage
        locale={locale}
        kind="case"
        content={forms[locale].submit}
      />
    );
  }

  if (slug === "admin") {
    return <AdminPage locale={locale} />;
  }

  if (slug === "confirmed-truths") {
    return (
      <PageLayout locale={locale}>
        <PublishedCases locale={locale} />
      </PageLayout>
    );
  }

  if (slug === "administrative-office") {
    return (
      <PageLayout locale={locale}>
        <AdministrativeOffice locale={locale} />
      </PageLayout>
    );
  }

  if (slug === "kitchen") {
    return (
      <PageLayout locale={locale}>
        <InteractiveKitchen />
      </PageLayout>
    );
  }

  if (slug === "kitchen/recipes") {
    return (
      <PageLayout locale={locale}>
        <RecipeBook />
      </PageLayout>
    );
  }

  if (slug === "library") {
    return (
      <PageLayout locale={locale}>
        <InteractiveLibrary />
      </PageLayout>
    );
  }

  if (slug === "library/jokes") {
    return (
      <PageLayout locale={locale}>
        <JokeBook />
      </PageLayout>
    );
  }

  if (slug === "office-suzie") {
    return (
      <PageLayout locale={locale}>
        <InteractiveSuzieOffice locale={locale} />
      </PageLayout>
    );
  }
if (slug === "geography-game")
  return (
    <PageLayout locale={locale}>
      <GeographyGame locale={locale} />
    </PageLayout>
  );
  const page = site.pages[slug];

  if (page) {
    return (
      <Standard
        locale={locale}
        page={page}
      />
    );
  }

  return (
    <PageLayout locale={locale}>
      <h1 style={titleStyle}>
        {site.common.notFoundTitle}
      </h1>

      <p style={bodyStyle}>
        {site.common.notFoundText}
      </p>
    </PageLayout>
  );
}

function AdminPage({
  locale,
}: {
  locale: Locale;
}) {
  const site = getContent(locale);
  const page = site.pages.admin;
  const t = adminExperience[locale];
  const valueIcons = ["😄", "💛", "🔎"];

  return (
    <PageLayout locale={locale}>
      <section style={adminHeroStyle}>
        <div
          style={adminDecorStyle}
          aria-hidden="true"
        >
          <span>📚</span>
          <span style={coffeeStyle}>☕</span>
          <span>📖</span>
        </div>

        <p style={adminEyebrowStyle}>
          {page.eyebrow}
        </p>

        <h1 style={adminTitleStyle}>
          {page.title}
        </h1>

        <p style={adminSubtitleStyle}>
          {page.subtitle}
        </p>

        <div style={thoughtStyle}>
          <span style={sparkleStyle}>✨</span>

          <div>
            <strong>{t.thoughtLabel}</strong>

            <p
              style={{
                margin: "8px 0 0",
                lineHeight: 1.7,
              }}
            >
              {t.thought}
            </p>
          </div>
        </div>

        <p style={coffeeNoteStyle}>
          ☕ {t.coffeeNote}
        </p>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2 style={sectionHeadingStyle}>
          {t.valuesTitle}
        </h2>

        <div style={valuesGridStyle}>
          {t.values.map((value, index) => (
            <article
              key={value.title}
              style={valueCardStyle}
            >
              <span style={valueIconStyle}>
                {valueIcons[index]}
              </span>

              <h3
                style={{
                  fontSize: "1.5rem",
                  margin: "8px 0",
                }}
              >
                {value.title}
              </h3>

              <p
                style={{
                  lineHeight: 1.7,
                  marginBottom: 0,
                }}
              >
                {value.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section style={reviewDeskStyle}>
        <div
          style={deskBooksStyle}
          aria-hidden="true"
        >
          📚
        </div>

        <div>
          <h2
            style={{
              fontSize: "2rem",
              margin: "0 0 10px",
            }}
          >
            {t.deskTitle}
          </h2>

          <p
            style={{
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {t.deskText}
          </p>
        </div>
      </section>

      <AdminDraftWorkspace locale={locale} />

      <ContentManager />
    </PageLayout>
  );
}

function Entrance({
  locale,
}: {
  locale: Locale;
}) {
  const t = getContent(locale).entrance;

  return (
    <main className="entrance">
      <section className="entranceContent">
        <p className="entranceEyebrow">
          {t.eyebrow}
        </p>

        <h1 className="entranceTitle">
          The Cathy Was Right
          <br />
          Research Center
        </h1>

        <p className="entranceValues">
          {t.values}
        </p>

        <Link
          href={localizedHref(locale, "home")}
          className="imageLink"
        >
          <img
            src="/images/facade.png"
            alt={t.alt}
            className="facade"
          />
        </Link>

        <p className="tagline">
          {t.tagline}
        </p>

        <Link
          href={localizedHref(locale, "home")}
          className="enterButton"
        >
          {t.enter}
        </Link>

        <div className="entranceLanguages">
          {(["fr", "en", "es"] as Locale[]).map(
            (language) => (
              <Link
                key={language}
                href={localizedHref(language)}
                aria-current={
                  language === locale
                    ? "page"
                    : undefined
                }
              >
                {language.toUpperCase()}
              </Link>
            ),
          )}
        </div>
      </section>

      <style>{entranceCss}</style>
    </main>
  );
}

function Home({
  locale,
}: {
  locale: Locale;
}) {
  const t = getContent(locale);

  return (
    <main style={pageStyle}>
      <Header locale={locale} />

      <section style={heroStyle}>
        <p style={eyebrowStyle}>
          {t.home.eyebrow}
        </p>

        <h1 style={homeTitleStyle}>
          {t.home.title}
        </h1>

        <p style={subtitleStyle}>
          {t.home.subtitle}
        </p>

        <div style={observationStyle}>
          <strong>
            {t.home.observationTitle}
          </strong>

          <p>{t.home.observation}</p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.2rem",
          }}
        >
          {t.home.explore}
        </h2>

        <div style={mapStyle}>
          {t.home.places.map((place) => (
            <Link
              key={place.href}
              href={localizedHref(
                locale,
                place.href,
              )}
              style={mapCardStyle}
            >
              <span style={emojiStyle}>
                {place.emoji}
              </span>

              <strong>{place.name}</strong>

              <span style={enterStyle}>
                {t.common.enter}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <AmateurOfficeCard locale={locale} />

      <PublicArchives locale={locale} />

      <section style={actionStyle}>
        {t.home.features.map((feature) => (
          <article
            key={feature.href}
            style={featureStyle}
          >
            <h2>{feature.title}</h2>

            <p style={{ lineHeight: 1.7 }}>
              {feature.text}
            </p>

            <Link
              href={localizedHref(
                locale,
                feature.href,
              )}
              style={lightButtonStyle}
            >
              {feature.button}
            </Link>
          </article>
        ))}
      </section>

      <Footer locale={locale} />
    </main>
  );
}

function Rooms({
  locale,
}: {
  locale: Locale;
}) {
  const t = getContent(locale);

  return (
    <PageLayout locale={locale}>
      <p style={eyebrowStyle}>
        {t.rooms.eyebrow}
      </p>

      <h1 style={titleStyle}>
        {t.rooms.title}
      </h1>

      <p style={subtitleStyle}>
        {t.rooms.subtitle}
      </p>

      <div style={roomsGridStyle}>
        {t.rooms.cards.map((room) => (
          <Link
            key={room.href}
            href={localizedHref(
              locale,
              room.href,
            )}
            style={roomCardStyle}
          >
            <img
              src={room.image}
              alt={room.title}
              style={roomImageStyle}
            />

            <div
              style={{
                padding: "0 22px 24px",
              }}
            >
              <h2>{room.title}</h2>

              <p style={{ lineHeight: 1.6 }}>
                {room.text}
              </p>

              <span style={smallButtonStyle}>
                {t.common.enter}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}

function Standard({
  locale,
  page,
}: {
  locale: Locale;
  page: StandardPage;
}) {
  return (
    <PageLayout locale={locale}>
      <p style={eyebrowStyle}>
        {page.eyebrow}
      </p>

      <h1 style={titleStyle}>
        {page.title}
      </h1>

      <p style={subtitleStyle}>
        {page.subtitle}
      </p>

      {page.image && (
        <img
          src={page.image}
          alt={page.imageAlt ?? page.title}
          style={pageImageStyle}
        />
      )}

      {page.paragraphs?.map(
        (paragraph, index) => (
          <p
            key={index}
            style={bodyStyle}
          >
            {paragraph}
          </p>
        ),
      )}

      {page.panels?.map((panel, index) => (
        <section
          key={index}
          style={
            panel.dark
              ? darkPanelStyle
              : panelStyle
          }
        >
          <h2 style={{ marginTop: 0 }}>
            {panel.title}
          </h2>

          {panel.text && (
            <p style={{ lineHeight: 1.7 }}>
              {panel.text}
            </p>
          )}

          {panel.items && (
            <ol style={{ lineHeight: 1.9 }}>
              {panel.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          )}
        </section>
      ))}

      {page.cards && (
        <div style={gridStyle}>
          {page.cards.map((card) => (
            <article
              key={card.title}
              style={cardStyle}
            >
              <h2 style={{ marginTop: 0 }}>
                {card.title}
              </h2>

              <p style={{ lineHeight: 1.7 }}>
                {card.text}
              </p>
            </article>
          ))}
        </div>
      )}
    </PageLayout>
  );
}

function FormPage({
  locale,
  kind,
  content,
}: {
  locale: Locale;
  kind: "ask" | "case";
  content: FormContent;
}) {
  return (
    <PageLayout locale={locale}>
      <p style={eyebrowStyle}>
        {content.eyebrow}
      </p>

      <h1 style={titleStyle}>
        {content.title}
      </h1>

      <p style={subtitleStyle}>
        {content.subtitle}
      </p>

      <SubmissionForm
        locale={locale}
        kind={kind}
        content={content}
      />
    </PageLayout>
  );
}

const entranceCss = `
.entrance{min-height:100vh;background:radial-gradient(circle at top,#f7f1e6 0%,#102a4c 100%);color:#f7f1e6;font-family:Georgia,serif;display:flex;align-items:center;justify-content:center;padding:40px;overflow:hidden}
.entranceContent{max-width:1180px;width:100%;text-align:center;animation:fadeIn 1.2s ease forwards}
.entranceEyebrow{letter-spacing:.22em;text-transform:uppercase;color:#d8c49a;font-size:.9rem;margin-bottom:14px}
.entranceTitle{font-size:clamp(2.7rem,7vw,6rem);line-height:.95;margin:0 0 16px;text-shadow:0 10px 30px rgba(0,0,0,.45)}
.entranceValues{font-size:1.25rem;margin-bottom:28px}
.imageLink{display:block}
.facade{width:100%;max-height:60vh;object-fit:cover;border-radius:28px;box-shadow:0 30px 80px rgba(0,0,0,.42);border:1px solid rgba(247,241,230,.5);transition:transform .8s ease,filter .8s ease}
.facade:hover{transform:scale(1.02);filter:brightness(1.08)}
.tagline{font-size:1.35rem;color:#d8c49a;margin:28px 0 22px}
.enterButton{display:inline-block;padding:16px 36px;border-radius:999px;background:#f7f1e6;color:#102a4c;text-decoration:none;font-weight:bold;font-size:1.1rem;box-shadow:0 16px 42px rgba(0,0,0,.32)}
.entranceLanguages{display:flex;justify-content:center;gap:10px;margin-top:22px}
.entranceLanguages a{color:#f7f1e6;border:1px solid #d8c49a;border-radius:999px;padding:7px 12px;text-decoration:none;font-weight:bold}
.entranceLanguages a[aria-current=page]{background:#d8c49a;color:#102a4c}
@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@media(max-width:600px){.entrance{padding:24px 14px}.entranceTitle{font-size:2.6rem}}
`;

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#F7F1E6",
  color: "#102A4C",
  fontFamily: "Georgia, serif",
};

const heroStyle = {
  maxWidth: "1200px",
  margin: "40px auto 0",
  padding: "56px 28px",
  textAlign: "center" as const,
  backgroundColor: "#FFFDF8",
  borderRadius: "28px",
  boxShadow:
    "0 20px 50px rgba(16,42,76,.15)",
};

const eyebrowStyle = {
  letterSpacing: ".18em",
  textTransform: "uppercase" as const,
  color: "#8A6A3D",
  fontSize: ".85rem",
};

const titleStyle = {
  fontSize: "clamp(2.5rem,6vw,5rem)",
  lineHeight: 1,
  margin: "12px 0",
};

const homeTitleStyle = {
  ...titleStyle,
  fontSize: "clamp(3rem,7vw,6rem)",
};

const subtitleStyle = {
  color: "#8A6A3D",
  fontSize: "1.5rem",
  lineHeight: 1.5,
};

const observationStyle = {
  margin: "32px auto 0",
  maxWidth: "720px",
  padding: "24px",
  borderRadius: "20px",
  backgroundColor: "#F7F1E6",
  borderLeft: "8px solid #8A6A3D",
  fontSize: "1.1rem",
};

const sectionStyle = {
  maxWidth: "1200px",
  margin: "40px auto 0",
  padding: "0 24px",
};

const mapStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
};

const mapCardStyle = {
  backgroundColor: "#FFFDF8",
  borderRadius: "22px",
  padding: "26px",
  textAlign: "center" as const,
  textDecoration: "none",
  color: "#102A4C",
  boxShadow:
    "0 12px 30px rgba(16,42,76,.12)",
  border:
    "1px solid rgba(138,106,61,.22)",
};

const emojiStyle = {
  display: "block",
  fontSize: "2.4rem",
  marginBottom: "12px",
};

const enterStyle = {
  display: "block",
  marginTop: "12px",
  color: "#8A6A3D",
  fontWeight: "bold",
};

const actionStyle = {
  maxWidth: "1200px",
  margin: "44px auto",
  padding: "0 24px",
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(280px,1fr))",
  gap: "24px",
};

const featureStyle = {
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  borderRadius: "22px",
  padding: "30px",
};

const lightButtonStyle = {
  display: "inline-block",
  marginTop: "14px",
  backgroundColor: "#F7F1E6",
  color: "#102A4C",
  padding: "14px 22px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
};

const bodyStyle = {
  fontSize: "1.15rem",
  lineHeight: 1.8,
  marginTop: "30px",
};

const pageImageStyle = {
  width: "100%",
  borderRadius: "20px",
  marginTop: "28px",
  boxShadow:
    "0 12px 30px rgba(16,42,76,.18)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(240px,1fr))",
  gap: "20px",
  marginTop: "32px",
};

const cardStyle = {
  backgroundColor: "#F7F1E6",
  borderRadius: "18px",
  padding: "24px",
  borderTop: "6px solid #8A6A3D",
};

const panelStyle = {
  marginTop: "32px",
  padding: "24px",
  borderRadius: "18px",
  backgroundColor: "#F7F1E6",
  borderLeft: "8px solid #8A6A3D",
};

const darkPanelStyle = {
  ...panelStyle,
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  borderLeft: "none",
};

const roomsGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(300px,1fr))",
  gap: "28px",
  marginTop: "40px",
};

const roomCardStyle = {
  backgroundColor: "#FFFDF8",
  borderRadius: "22px",
  overflow: "hidden",
  textDecoration: "none",
  color: "#102A4C",
  boxShadow:
    "0 12px 30px rgba(16,42,76,.12)",
};

const roomImageStyle = {
  width: "100%",
  height: "230px",
  objectFit: "cover" as const,
};

const smallButtonStyle = {
  display: "inline-block",
  marginTop: "10px",
  padding: "10px 18px",
  borderRadius: "999px",
  background: "#102A4C",
  color: "#F7F1E6",
  fontWeight: "bold",
};

const adminHeroStyle = {
  position: "relative" as const,
  overflow: "hidden",
  textAlign: "center" as const,
  background:
    "linear-gradient(145deg,#102A4C 0%,#193C68 68%,#8A6A3D 160%)",
  color: "#F7F1E6",
  borderRadius: "28px",
  padding: "48px 28px",
  boxShadow:
    "0 22px 50px rgba(16,42,76,.24)",
};

const adminDecorStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  gap: "18px",
  fontSize: "3.2rem",
  marginBottom: "18px",
};

const coffeeStyle = {
  fontSize: "4.8rem",
  filter:
    "drop-shadow(0 10px 10px rgba(0,0,0,.28))",
};

const adminEyebrowStyle = {
  ...eyebrowStyle,
  color: "#D8C49A",
};

const adminTitleStyle = {
  fontSize: "clamp(2.6rem,6vw,5rem)",
  lineHeight: 1,
  margin: "12px 0",
};

const adminSubtitleStyle = {
  fontSize: "1.35rem",
  color: "#F1DFC0",
  lineHeight: 1.5,
};

const thoughtStyle = {
  maxWidth: "760px",
  margin: "28px auto 0",
  display: "flex",
  gap: "16px",
  alignItems: "flex-start",
  textAlign: "left" as const,
  background:
    "rgba(255,253,248,.12)",
  border:
    "1px solid rgba(247,241,230,.3)",
  borderRadius: "18px",
  padding: "22px",
  backdropFilter: "blur(8px)",
};

const sparkleStyle = {
  fontSize: "1.8rem",
};

const coffeeNoteStyle = {
  display: "inline-block",
  margin: "20px 0 0",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "#D8C49A",
  color: "#102A4C",
  fontWeight: "bold",
  fontSize: ".9rem",
};

const sectionHeadingStyle = {
  textAlign: "center" as const,
  fontSize: "2rem",
  marginBottom: "24px",
};

const valuesGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
};

const valueCardStyle = {
  textAlign: "center" as const,
  background:
    "linear-gradient(180deg,#FFFDF8,#F7F1E6)",
  borderRadius: "20px",
  padding: "26px",
  border:
    "1px solid rgba(138,106,61,.25)",
  boxShadow:
    "0 10px 24px rgba(16,42,76,.09)",
};

const valueIconStyle = {
  fontSize: "2.4rem",
};

const reviewDeskStyle = {
  marginTop: "42px",
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: "22px",
  alignItems: "center",
  backgroundColor: "#F1E4CA",
  borderRadius: "22px",
  padding: "28px",
  borderLeft: "8px solid #8A6A3D",
};

const deskBooksStyle = {
  fontSize: "4rem",
};