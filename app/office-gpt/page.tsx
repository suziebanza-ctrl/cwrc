import Link from "next/link";

const studioItems = [
  {
    name: "Code Desk",
    text: "Where pages, structures and technical ideas are drafted before Suzie tests them with great courage.",
  },
  {
    name: "GPT Tablet",
    text: "Marked with the custom GPT label for public use. No official OpenAI logo is used here.",
  },
  {
    name: "Ranger",
    text: "Chief of Security, stationed in GPT’s studio to supervise digital safety and suspicious snacks.",
  },
  {
    name: "Dad Joke Console",
    text: "A high-risk device. Use only under adult supervision and after coffee.",
  },
];

export default function OfficeGPTPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={eyebrowStyle}>CWRC Technical Division</p>

        <h1 style={titleStyle}>GPT’s Technical Studio</h1>

        <p style={subtitleStyle}>
          Where code, drafts and questionable jokes are produced.
        </p>

        <img
          src="/images/bureau-gpt.png"
          alt="GPT Technical Studio"
          style={imageStyle}
        />

        <p style={bodyStyle}>
          GPT’s Technical Studio is the digital workshop of the CWRC. It is
          where ideas become structure, pages become code and technical problems
          are approached with patience, logic and occasional dramatic
          over-explanation.
        </p>

        <p style={bodyStyle}>
          GPT assists the Center by drafting, organizing, translating and
          building. It proposes. Humans decide. Ranger supervises the perimeter.
        </p>

        <div style={gridStyle}>
          {studioItems.map((item) => (
            <article key={item.name} style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>{item.name}</h2>
              <p style={{ lineHeight: "1.7" }}>{item.text}</p>
            </article>
          ))}
        </div>

        <div style={quoteStyle}>
          <h2 style={{ marginTop: 0 }}>Official Technical Principle</h2>

          <p style={{ lineHeight: "1.8", marginBottom: 0 }}>
            “The best technology disappears into the work and leaves the humans
            more capable than before.”
          </p>
        </div>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/rooms" style={buttonStyle}>
            ← Back to Rooms
          </Link>

          <Link href="/" style={buttonStyle}>
            Return Home
          </Link>
        </div>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#F7F1E6",
  color: "#102A4C",
  fontFamily: "Georgia, serif",
  padding: "48px 24px",
};

const heroStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  backgroundColor: "#FFFDF8",
  borderRadius: "24px",
  padding: "48px 32px",
  boxShadow: "0 20px 50px rgba(16, 42, 76, 0.15)",
};

const eyebrowStyle = {
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "#8A6A3D",
  fontSize: "0.85rem",
};

const titleStyle = {
  fontSize: "clamp(2.5rem, 6vw, 5rem)",
  lineHeight: "1",
  margin: "12px 0",
};

const subtitleStyle = {
  color: "#8A6A3D",
  fontSize: "1.5rem",
  lineHeight: "1.5",
};

const imageStyle = {
  width: "100%",
  borderRadius: "20px",
  marginTop: "28px",
  boxShadow: "0 12px 30px rgba(16, 42, 76, 0.18)",
};

const bodyStyle = {
  fontSize: "1.15rem",
  lineHeight: "1.8",
  marginTop: "30px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
  marginTop: "32px",
};

const cardStyle = {
  backgroundColor: "#F7F1E6",
  borderRadius: "18px",
  padding: "24px",
  borderTop: "6px solid #8A6A3D",
};

const quoteStyle = {
  marginTop: "40px",
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  padding: "28px",
  borderRadius: "18px",
};

const buttonStyle = {
  display: "inline-block",
  padding: "14px 24px",
  borderRadius: "999px",
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  textDecoration: "none",
  fontWeight: "bold",
};