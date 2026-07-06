export default function HallPage() {
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
          Official Archive
        </p>

        <h1
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            lineHeight: "1",
            margin: "0 0 18px",
          }}
        >
          Hall of Confirmed Truths
        </h1>

        <h2
          style={{
            color: "#8A6A3D",
            fontWeight: "normal",
            fontSize: "1.5rem",
            marginBottom: "32px",
          }}
        >
          Where conclusions are preserved after Cathy is proven right.
        </h2>

        <p style={{ fontSize: "1.15rem", lineHeight: "1.8" }}>
          The Hall of Confirmed Truths is the official archive of the CWRC. It
          preserves findings, verdicts and carefully documented moments where
          evidence eventually caught up with Cathy.
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
          <h3 style={{ marginTop: 0 }}>Archive status</h3>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
            The official archive is under construction. Confirmed truths will be
            added only after review by the CWRC team and final approval by
            Cathy.
          </p>
        </div>

        <div
          style={{
            marginTop: "36px",
            padding: "28px",
            borderRadius: "18px",
            backgroundColor: "#102A4C",
            color: "#F7F1E6",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Entry requirements</h3>

          <ol style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            <li>A claim, question or observation is submitted.</li>
            <li>The available facts are reviewed.</li>
            <li>GPT prepares the structured analysis.</li>
            <li>Suzie checks the documentation and tone.</li>
            <li>Cathy issues the final verdict.</li>
            <li>The truth is archived if confirmed.</li>
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
            <h3>Confirmed Truth 001</h3>
            <p>
              <strong>Status:</strong> Reserved
            </p>
            <p>
              This space awaits the first official archived conclusion of the
              CWRC.
            </p>
          </article>

          <article style={cardStyle}>
            <h3>Confirmed Truth 002</h3>
            <p>
              <strong>Status:</strong> Under future review
            </p>
            <p>
              Evidence has not yet arrived, but the Center remains prepared.
            </p>
          </article>

          <article style={cardStyle}>
            <h3>Confirmed Truth 003</h3>
            <p>
              <strong>Status:</strong> Watched by Ranger
            </p>
            <p>
              Access to the archive is supervised for intellectual and snack
              security.
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