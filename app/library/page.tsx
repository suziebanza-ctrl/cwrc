import Link from "next/link";

const libraryItems = [
  {
    name: "Grand Reading Hall",
    text: "The central space where books, ideas and quiet suspicions gather.",
  },
  {
    name: "Secret Animal Passages",
    text: "Hidden doors allow Jenny, Capone and Niko to move through the library with official discretion.",
  },
  {
    name: "Jenny’s Section",
    text: "A calm area reserved for equine wisdom, patient observation and dignified silence.",
  },
  {
    name: "Historical References",
    text: "Shelves dedicated to history, philosophy and all moments where humanity should probably have listened sooner.",
  },
];

export default function LibraryPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={eyebrowStyle}>CWRC Knowledge Division</p>

        <h1 style={titleStyle}>The Grand Library</h1>

        <p style={subtitleStyle}>
          Where old books, quiet animals and inconvenient evidence meet.
        </p>

        <img
          src="/images/bibliotheque.png"
          alt="The Grand Library of the CWRC"
          style={imageStyle}
        />

        <p style={bodyStyle}>
          The Grand Library is the intellectual heart of the CWRC. It preserves
          books, references, research drafts, archives and the slow wisdom that
          comes from reading before speaking.
        </p>

        <p style={bodyStyle}>
          It is also home to Jenny, with secret passages for the animals and
          quiet corners where Capone and Niko may supervise knowledge from a
          comfortable distance.
        </p>

        <div style={gridStyle}>
          {libraryItems.map((item) => (
            <article key={item.name} style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>{item.name}</h2>
              <p style={{ lineHeight: "1.7" }}>{item.text}</p>
            </article>
          ))}
        </div>

        <div style={quoteStyle}>
          <h2 style={{ marginTop: 0 }}>Official Library Principle</h2>
          <p style={{ lineHeight: "1.8", marginBottom: 0 }}>
            “A library does not argue loudly. It waits patiently until someone
            is ready to learn.”
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