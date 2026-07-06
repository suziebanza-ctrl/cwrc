export default function ResearchPage() {
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
          CWRC Publications Division
        </p>

        <h1
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            lineHeight: "1",
            margin: "0 0 18px",
          }}
        >
          Research Papers
        </h1>

        <h2
          style={{
            color: "#8A6A3D",
            fontWeight: "normal",
            fontSize: "1.5rem",
            marginBottom: "32px",
          }}
        >
          Formal investigations into situations where Cathy may have already
          been correct.
        </h2>

        <p style={{ fontSize: "1.15rem", lineHeight: "1.8" }}>
          CWRC research papers begin with a question, examine the available
          evidence and end with an official verdict. Some conclusions are
          scientific. Some are practical. Some involve coffee.
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
          <h3 style={{ marginTop: 0 }}>Standard research format</h3>

          <ol style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            <li>The question is submitted.</li>
            <li>GPT prepares a structured draft.</li>
            <li>Suzie reviews clarity, tone and documentation.</li>
            <li>Cathy issues the final verdict.</li>
            <li>The Center archives the conclusion for future reference.</li>
          </ol>
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
            <h3>Paper 001</h3>
            <p>
              <strong>Status:</strong> In preparation
            </p>
            <p>
              Preliminary title: “Was Cathy Right About This Before Everyone
              Else?”
            </p>
          </article>

          <article style={cardStyle}>
            <h3>Paper 002</h3>
            <p>
              <strong>Status:</strong> Awaiting evidence
            </p>
            <p>
              Preliminary title: “The Predictive Power of Common Sense Under
              Coffee Conditions.”
            </p>
          </article>

          <article style={cardStyle}>
            <h3>Paper 003</h3>
            <p>
              <strong>Status:</strong> Under animal review
            </p>
            <p>
              Preliminary title: “Can Ranger Detect Suspicious Conclusions?”
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