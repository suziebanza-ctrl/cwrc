import PageLayout from "../components/PageLayout";

const logs = [
  {
    number: "0001",
    title: "Foundation of the CWRC",
    text: "The foundations of the Center were declared solid enough to begin construction.",
  },
  {
    number: "0011",
    title: "First Official Page",
    text: "The default Next.js page was replaced by the first official CWRC page.",
  },
  {
    number: "0015",
    title: "Real Pages Connected",
    text: "The CWRC became a building with doors: About Us, Departments, Research, Ask Cathy, Submit a Case, Hall of Truths and Contact.",
  },
  {
    number: "0019",
    title: "Immersive Rooms Completed",
    text: "The main rooms of the Center were created and connected with official images.",
  },
  {
    number: "0021",
    title: "The Center’s Purpose",
    text: "The official values of the CWRC became clear: humour, kindness and curiosity.",
  },
];

export default function DevelopmentLogPage() {
  return (
    <PageLayout>
      <p style={eyebrowStyle}>CWRC Archives</p>

      <h1 style={titleStyle}>Development Log</h1>

      <p style={subtitleStyle}>
        The official memory of the Center’s creation.
      </p>

      <p style={bodyStyle}>
        The Development Log preserves the history of the CWRC: technical
        decisions, creative milestones, successful breakthroughs and the gradual
        birth of a fictional research center built with humour, kindness and
        curiosity.
      </p>

      <div style={gridStyle}>
        {logs.map((log) => (
          <article key={log.number} style={cardStyle}>
            <p style={logNumberStyle}>Development Log #{log.number}</p>
            <h2 style={{ marginTop: 0 }}>{log.title}</h2>
            <p style={{ lineHeight: "1.7" }}>{log.text}</p>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}

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

const bodyStyle = {
  fontSize: "1.15rem",
  lineHeight: "1.8",
  marginTop: "30px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
  marginTop: "32px",
};

const cardStyle = {
  backgroundColor: "#F7F1E6",
  borderRadius: "18px",
  padding: "24px",
  borderTop: "6px solid #8A6A3D",
};

const logNumberStyle = {
  color: "#8A6A3D",
  fontWeight: "bold",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  fontSize: "0.8rem",
};