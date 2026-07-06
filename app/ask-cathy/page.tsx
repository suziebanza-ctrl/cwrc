export default function AskCathyPage() {
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
          Public Inquiry Desk
        </p>

        <h1
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            lineHeight: "1",
            margin: "0 0 18px",
          }}
        >
          Ask Cathy
        </h1>

        <h2
          style={{
            color: "#8A6A3D",
            fontWeight: "normal",
            fontSize: "1.5rem",
            marginBottom: "32px",
          }}
        >
          Submit a question. Await the verdict. Remain calm.
        </h2>

        <p style={{ fontSize: "1.15rem", lineHeight: "1.8" }}>
          Visitors will eventually be able to ask Cathy questions through this
          page. GPT may help prepare an organized response, but Cathy keeps the
          final word.
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
          <h3 style={{ marginTop: 0 }}>Current status</h3>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
            The official question form is not active yet. For now, this page is
            a public placeholder for the future Cathy Inquiry System.
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
          <h3 style={{ marginTop: 0 }}>Future process</h3>

          <ol style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            <li>A visitor submits a question.</li>
            <li>GPT prepares a first structured analysis.</li>
            <li>Suzie reviews clarity, kindness and documentation.</li>
            <li>Cathy gives the final verdict.</li>
            <li>The answer may be published in the CWRC archives.</li>
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
            <h3>Accepted questions</h3>
            <p>
              Everyday mysteries, practical disagreements, historical
              suspicions, horse-related matters and claims requiring calm
              investigation.
            </p>
          </article>

          <article style={cardStyle}>
            <h3>Rejected questions</h3>
            <p>
              Questions intended to humiliate, attack, shame or start family
              drama without proper coffee supervision.
            </p>
          </article>

          <article style={cardStyle}>
            <h3>Official reminder</h3>
            <p>
              The CWRC laughs with people, not at people. Evidence may be firm;
              tone must remain kind.
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