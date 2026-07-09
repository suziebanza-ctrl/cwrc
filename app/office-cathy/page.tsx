import PageLayout from "../components/PageLayout";

const items = [
  {
    name: "The Main Desk",
    text: "Covered with books, notes, photographs, mysterious objects and ongoing investigations.",
  },
  {
    name: "Antique Collection",
    text: "A carefully accumulated collection of historical objects, curiosities and beautiful old things.",
  },
  {
    name: "Hall of Confirmed Truths",
    text: "The place where evidence eventually catches up with Cathy.",
  },
  {
    name: "Annie",
    text: "Chief of Joy and Chaos, responsible for unexpected interruptions and excellent company.",
  },
];

export default function OfficeCathyPage() {
  return (
    <PageLayout>
      <p style={eyebrowStyle}>CWRC Executive Research Division</p>

      <h1 style={titleStyle}>Dr. Cathy’s Office</h1>

      <p style={subtitleStyle}>
        Where curiosity, experience and a little chaos work together.
      </p>

      <img
        src="/images/bureau-cathy.png"
        alt="Dr. Cathy's Office"
        style={imageStyle}
      />

      <p style={bodyStyle}>
        Dr. Cathy’s office is a fascinating mixture of books, research,
        memories, historical objects and ongoing investigations. It is not
        perfectly organized, but every object seems to have a story.
      </p>

      <p style={bodyStyle}>
        This is where ideas are born, observations become theories and theories
        occasionally become confirmed truths.
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