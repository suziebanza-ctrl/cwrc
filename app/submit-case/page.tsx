export default function SubmitCasePage() {
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
          Case Submission Office
        </p>

        <h1
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            lineHeight: "1",
            margin: "0 0 18px",
          }}
        >
          Submit a Case
        </h1>

        <h2
          style={{
            color: "#8A6A3D",
            fontWeight: "normal",
            fontSize: "1.5rem",
            marginBottom: "32px",
          }}
        >
          For claims, suspicions and statements requiring official CWRC review.
        </h2>

        <p style={{ fontSize: "1.15rem", lineHeight: "1.8" }}>
          This page will eventually allow visitors to submit a case for
          investigation. A case may be a claim, an observation, a long-standing
          debate or a situation where Cathy may have been right earlier than
          anyone expected.
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
            The case submission form is not active yet. The official review
            protocol is being prepared by Suzie, observed by Ranger and quietly
            questioned by Capone.
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
          <h3 style={{ marginTop: 0 }}>Future case review process</h3>

          <ol style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            <li>The visitor submits a statement or situation.</li>
            <li>The CWRC identifies the central claim.</li>
            <li>GPT organizes the facts and prepares a draft analysis.</li>
            <li>Suzie checks tone, clarity and documentation.</li>
            <li>Cathy reviews the case and issues the verdict.</li>
            <li>The result may enter the Hall of Confirmed Truths.</li>
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
            <h3>Suitable cases</h3>
            <p>
              Everyday mysteries, practical disagreements, historical claims,
              animal observations and situations where common sense was ignored.
            </p>
          </article>

          <article style={cardStyle}>
            <h3>Cases requiring caution</h3>
            <p>
              Sensitive personal matters, accusations, private conflicts and
              anything that should remain respectful, factual and kind.
            </p>
          </article>

          <article style={cardStyle}>
            <h3>Official standard</h3>
            <p>
              The CWRC may investigate firmly, but it does not humiliate people.
              Humor must remain benevolent.
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