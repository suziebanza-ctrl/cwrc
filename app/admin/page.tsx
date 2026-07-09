import PageLayout from "../components/PageLayout";

const adminSections = [
  {
    title: "Public Questions",
    description:
      "Questions submitted through Ask Cathy will eventually appear here for review.",
    status: "Prototype",
  },
  {
    title: "Submitted Cases",
    description:
      "Cases submitted by visitors will be organized here before investigation.",
    status: "Prototype",
  },
  {
    title: "Draft Responses",
    description:
      "GPT may prepare draft responses for Cathy and Suzie to review.",
    status: "Future",
  },
  {
    title: "Approvals",
    description:
      "Cathy and Suzie will approve what can be published publicly.",
    status: "Future",
  },
  {
    title: "Hall of Confirmed Truths",
    description:
      "Approved conclusions may be published into the official archive.",
    status: "Future",
  },
  {
    title: "Translations",
    description:
      "French, English and Spanish versions will eventually be managed here.",
    status: "Future",
  },
];

export default function AdminPage() {
  return (
    <PageLayout>
      <p style={eyebrowStyle}>Private Administrative Wing</p>

      <h1 style={titleStyle}>CWRC Admin Portal</h1>

      <p style={subtitleStyle}>
        A future private workspace for Cathy and Suzie.
      </p>

      <div style={noticeStyle}>
        <strong>Status:</strong> This is a visual prototype. No private data is
        stored here yet, and there is no login system at this stage.
      </div>

      <div style={gridStyle}>
        {adminSections.map((section) => (
          <article key={section.title} style={cardStyle}>
            <p style={statusStyle}>{section.status}</p>
            <h2 style={{ marginTop: 0 }}>{section.title}</h2>
            <p style={{ lineHeight: "1.7" }}>{section.description}</p>
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

const noticeStyle = {
  marginTop: "28px",
  backgroundColor: "#F7F1E6",
  borderLeft: "8px solid #8A6A3D",
  borderRadius: "16px",
  padding: "20px",
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

const statusStyle = {
  color: "#8A6A3D",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  fontSize: "0.8rem",
};