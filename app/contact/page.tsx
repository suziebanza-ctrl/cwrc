export default function ContactPage() {
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
          Administrative Office
        </p>

        <h1
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            lineHeight: "1",
            margin: "0 0 18px",
          }}
        >
          Contact
        </h1>

        <h2
          style={{
            color: "#8A6A3D",
            fontWeight: "normal",
            fontSize: "1.5rem",
            marginBottom: "32px",
          }}
        >
          For official inquiries, gentle questions and suspiciously accurate
          observations.
        </h2>

        <p style={{ fontSize: "1.15rem", lineHeight: "1.8" }}>
          The CWRC contact office is not open yet. In a future version, visitors
          will be able to send questions, submit cases and reach the Center
          through simple public forms.
        </p>

        <p style={{ fontSize: "1.15rem", lineHeight: "1.8" }}>
          For now, this page confirms that the Contact department exists and is
          waiting for proper administrative supervision.
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
            Contact forms are not active yet. No visitor information is being
            collected at this stage.
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
          <h3 style={{ marginTop: 0 }}>Future contact options</h3>

          <ul style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            <li>Ask Cathy a question.</li>
            <li>Submit a case for investigation.</li>
            <li>Contact the CWRC administrative office.</li>
            <li>Access the private admin portal for Cathy and Suzie.</li>
          </ul>
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
            <h3>Public visitors</h3>
            <p>
              Visitors will be able to read, laugh, think and eventually submit
              questions without needing an account.
            </p>
          </article>

          <article style={cardStyle}>
            <h3>Cathy and Suzie</h3>
            <p>
              Only Cathy and Suzie will have publishing and administrative
              access to the Center.
            </p>
          </article>

          <article style={cardStyle}>
            <h3>GPT</h3>
            <p>
              GPT may help draft, structure and organize content, but it does
              not make final publishing decisions.
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