export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#F7F1E6",
        color: "#102A4C",
        fontFamily: "Georgia, serif",
        padding: "48px 24px",
      }}
    >
      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          backgroundColor: "#FFFDF8",
          borderRadius: "24px",
          padding: "56px 32px",
          boxShadow: "0 20px 50px rgba(16, 42, 76, 0.15)",
        }}
      >
        <p
          style={{
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8A6A3D",
            fontSize: "0.85rem",
            marginBottom: "20px",
          }}
        >
          About the Center
        </p>

        <h1
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            lineHeight: "1",
            margin: "0 0 18px",
          }}
        >
          About Us
        </h1>

        <h2
          style={{
            color: "#8A6A3D",
            fontWeight: "normal",
            fontSize: "1.5rem",
            marginBottom: "32px",
          }}
        >
          A fictional research institute dedicated to one recurring phenomenon:
          Cathy was right.
        </h2>

        <p style={{ fontSize: "1.15rem", lineHeight: "1.8" }}>
          The Cathy Was Right Research Center is a public, free and benevolent
          research universe built around curiosity, humor, animals, evidence and
          the strange frequency with which Cathy’s observations become correct.
        </p>

        <p style={{ fontSize: "1.15rem", lineHeight: "1.8" }}>
          The Center does not sell attention. It does not use ads. It does not
          require subscriptions. It exists to make people read, smile, think and
          occasionally admit that Cathy had already mentioned the answer.
        </p>

        <div
          style={{
            marginTop: "36px",
            padding: "28px",
            borderRadius: "18px",
            backgroundColor: "#F7F1E6",
            borderLeft: "8px solid #8A6A3D",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Official principle</h3>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
            We laugh with Cathy, never at Cathy.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginTop: "36px",
          }}
        >
          <article style={cardStyle}>
            <h3>Cathy</h3>
            <p>
              Founder of the Center, final authority on confirmed truths and
              frequent early detector of reality.
            </p>
          </article>

          <article style={cardStyle}>
            <h3>Suzie</h3>
            <p>
              Guardian of structure, quality, documentation, continuous
              improvement and the official development journey.
            </p>
          </article>

          <article style={cardStyle}>
            <h3>GPT</h3>
            <p>
              Creative and technical collaborator. GPT proposes, organizes,
              drafts and codes. Humans decide.
            </p>
          </article>
        </div>

        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: "40px",
            padding: "14px 24px",
            borderRadius: "999px",
            backgroundColor: "#102A4C",
            color: "#F7F1E6",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ← Back to CWRC Home
        </a>
      </section>
    </main>
  );
}

const cardStyle = {
  backgroundColor: "#F7F1E6",
  borderRadius: "18px",
  padding: "24px",
  borderTop: "6px solid #8A6A3D",
  boxShadow: "0 10px 24px rgba(16, 42, 76, 0.10)",
};