import PageLayout from "../components/PageLayout";

const items = [
  {
    name: "Artificial Intelligence Console",
    text: "The central workstation where software architecture, writing and creative solutions are developed.",
  },
  {
    name: "Development Dashboard",
    text: "Tracks the progress of every CWRC project, from new rooms to future applications.",
  },
  {
    name: "Ranger",
    text: "Official guardian of the office. Ranger ensures that every visitor arrives with good intentions and occasionally requests a well-deserved break.",
  },
  {
    name: "Innovation Wall",
    text: "Filled with sketches, future ideas, diagrams and ambitious plans for the evolution of the CWRC.",
  },
];

export default function OfficeGPTPage() {
  return (
    <PageLayout>
      <p style={eyebrowStyle}>CWRC Technology Division</p>

      <h1 style={titleStyle}>GPT Technical Studio</h1>

      <p style={subtitleStyle}>
        Where ideas become software and imagination becomes reality.
      </p>

      <img
        src="/images/Bureau-gpt.png"
        alt="GPT Technical Studio"
        style={imageStyle}
      />

      <p style={bodyStyle}>
        The GPT Technical Studio is the engineering heart of the CWRC. Here,
        architecture, programming, writing and design come together to create
        tools that make knowledge more accessible, enjoyable and useful.
      </p>

      <p style={bodyStyle}>
        Ranger quietly supervises the office while new projects are imagined,
        tested and refined before joining the rest of the Center.
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