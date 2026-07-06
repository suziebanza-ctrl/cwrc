export default function DepartmentsPage() {
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
          CWRC Official Division
        </p>

        <h1
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            lineHeight: "1",
            margin: "0 0 18px",
          }}
        >
          Departments
        </h1>

        <h2
          style={{
            color: "#8A6A3D",
            fontWeight: "normal",
            fontSize: "1.5rem",
            marginBottom: "32px",
          }}
        >
          Where serious research meets deeply suspicious common sense.
        </h2>

        <p style={{ fontSize: "1.15rem", lineHeight: "1.8" }}>
          The Cathy Was Right Research Center is organized into departments.
          Each department studies one area where Cathy may already have reached
          the correct conclusion before the evidence arrived.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginTop: "36px",
          }}
        >
          <article style={cardStyle}>
            <h3>Coffee Sciences</h3>
            <p>
              Studies the role of coffee in decision-making, patience and
              emergency research meetings.
            </p>
          </article>

          <article style={cardStyle}>
            <h3>Equine Sciences</h3>
            <p>
              Led with quiet authority by Jenny. Focuses on horses, intuition
              and long-distance judgment.
            </p>
          </article>

          <article style={cardStyle}>
            <h3>Nutrition</h3>
            <p>
              Examines food, health, common sense and the eternal question:
              “Did Cathy say this already?”
            </p>
          </article>

          <article style={cardStyle}>
            <h3>History</h3>
            <p>
              Investigates the past to confirm that people have been ignoring
              good advice for centuries.
            </p>
          </article>

          <article style={cardStyle}>
            <h3>Mechanics</h3>
            <p>
              Dedicated to practical reasoning, things that make noise and
              problems that were “probably obvious.”
            </p>
          </article>

          <article style={cardStyle}>
            <h3>Common Sense</h3>
            <p>
              The central department of the CWRC. Frequently consulted. Rarely
              surprised.
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