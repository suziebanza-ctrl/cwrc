import Link from "next/link";

const officeItems = [
  {
    name: "The Main Desk",
    text: "Covered with books, notes, photographs, mysterious objects and ongoing investigations.",
  },
  {
    name: "Antique Collection",
    text: "A carefully accumulated collection of historical objects, curiosities and beautiful old things.",
  },
  {
    name: "Hall of Confirmed Truths",
    text: "The place where evidence eventually catches up with Cathy.",
  },
  {
    name: "Annie",
    text: "Chief of Joy and Chaos, responsible for unexpected interruptions and excellent company.",
  },
];

export default function OfficeCathyPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={eyebrowStyle}>CWRC Executive Research Division</p>

        <h1 style={titleStyle}>Dr. Cathy's Office</h1>

        <p style={subtitleStyle}>
          Where curiosity, experience and a little chaos work together.
        </p>

        <img
          src="/images/bureau-cathy.png"
          alt="Dr. Cathy's Office"
          style={imageStyle}
        />

        <p style={bodyStyle}>
          Dr. Cathy's office is a fascinating mixture of books, research,
          memories, historical objects and ongoing investigations. It is not
          perfectly organized, but every object seems to have a story.
        </p>

        <p style={bodyStyle}>
          This is where ideas are born, observations become theories and
          theories occasionally become confirmed truths.
        </p>

        <div style={gridStyle}>
          {officeItems.map((item) => (
            <article key={item.name} style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>{item.name}</h2>
              <p style={{ lineHeight: "1.7" }}>{item.text}</p>
            </article>
          ))}
        </div>

        <div style={quoteStyle}>
          <h2 style={{ marginTop: 0 }}>Official Office Principle</h2>

          <p style={{ lineHeight: "1.8", marginBottom: 0 }}>
            "Evidence is welcome here. It just sometimes arrives a little late."
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