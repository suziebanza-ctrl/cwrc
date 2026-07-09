import PageLayout from "../components/PageLayout";

const items = [
  {
    name: "Plant Collections",
    text: "A living collection of plants observed with patience, curiosity and proper labels.",
  },
  {
    name: "French, English and Latin Labels",
    text: "Every plant should eventually be identified in three languages.",
  },
  {
    name: "Research Tables",
    text: "Used for notes, observations, botanical references and quiet discoveries.",
  },
  {
    name: "Sunlight",
    text: "The official assistant director of growth and good thinking.",
  },
];

export default function GreenhousePage() {
  return (
    <PageLayout>
      <p style={eyebrowStyle}>CWRC Botanical Division</p>

      <h1 style={titleStyle}>The Grand Greenhouse</h1>

      <p style={subtitleStyle}>
        Where plants, patience and common sense grow together.
      </p>

      <img
        src="/images/greenhouse.png"
        alt="CWRC Greenhouse"
        style={imageStyle}
      />

      <p style={bodyStyle}>
        The CWRC greenhouse is a magnificent botanical space filled with plants,
        research notes and quiet light. It is used for observation,
        environmental thinking and learning to let ideas grow at their own pace.
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