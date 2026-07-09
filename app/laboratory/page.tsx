import PageLayout from "../components/PageLayout";

const objects = [
  {
    name: "Universal Testing Machine",
    text: "Used to test the strength of claims before they are allowed into the Hall of Confirmed Truths.",
  },
  {
    name: "Microscope",
    text: "For looking closer when someone says, “It’s obvious.”",
  },
  {
    name: "Daily Lab Checklist",
    text: "Calibrate. Document. Double-check. Challenge bias. Publish truth.",
  },
  {
    name: "Lilo",
    text: "Chief Morale Officer. Present for emotional intelligence, quiet supervision and scientific calm.",
  },
];

export default function LaboratoryPage() {
  return (
    <PageLayout>
      <p style={eyebrowStyle}>CWRC Experimental Division</p>

      <h1 style={titleStyle}>The Laboratory</h1>

      <p style={subtitleStyle}>
        Where claims are tested before they become official truths.
      </p>

      <img
        src="/images/laboratoire.png"
        alt="CWRC Laboratory with Suzie and Lilo"
        style={imageStyle}
      />

      <p style={bodyStyle}>
        The CWRC laboratory is a bright, modern research space where evidence is
        examined with care, methods are documented and conclusions are not
        allowed to skip the line.
      </p>

      <div style={gridStyle}>
        {objects.map((object) => (
          <article key={object.name} style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>{object.name}</h2>
            <p style={{ lineHeight: "1.7" }}>{object.text}</p>
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