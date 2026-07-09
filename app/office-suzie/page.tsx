import PageLayout from "../components/PageLayout";

const items = [
  {
    name: "Quality Desk",
    text: "Where structure, clarity and continuous improvement are carefully protected.",
  },
  {
    name: "Diploma Wall",
    text: "Université Laval, ÉTS and Cégep de Sainte-Foy are proudly represented.",
  },
  {
    name: "Gaspésie Photos",
    text: "A reminder that landscapes, memory and calm thinking belong in the same office.",
  },
  {
    name: "Lilo",
    text: "Resident research companion, emotional intelligence specialist and quiet supervisor.",
  },
];

export default function OfficeSuziePage() {
  return (
    <PageLayout>
      <p style={eyebrowStyle}>CWRC Operations Division</p>

      <h1 style={titleStyle}>Suzie’s Office</h1>

      <p style={subtitleStyle}>
        Where quality, structure and continuous improvement protect creativity
        from chaos.
      </p>

      <img
        src="/images/bureau-suzie.png"
        alt="Suzie's Office at the CWRC"
        style={imageStyle}
      />

      <p style={bodyStyle}>
        Suzie’s office is modern, organized and calm. It is the place where the
        CWRC’s documents, methods, development logs and quality principles are
        kept in order.
      </p>

      <p style={bodyStyle}>
        The room reflects her professional world: health and safety, quality,
        environment, continuous improvement, philosophy, history and the quiet
        discipline of good documentation.
      </p>

      <div style={gridStyle}>
        {items.map((item) => (
          <article key={item.name} style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>{item.name}</h2>
            <p style={{ lineHeight: "1.7" }}>{item.text}</p>
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