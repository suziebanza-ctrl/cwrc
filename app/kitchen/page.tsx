import Link from "next/link";

const kitchenItems = [
  {
    name: "Coffee Station",
    text: "The unofficial engine of research, patience and diplomatic conversations.",
  },
  {
    name: "Nutrition Notes",
    text: "Where food, health, pleasure and common sense are studied without guilt.",
  },
  {
    name: "Yellow Walls",
    text: "Chosen for warmth, joy and the scientific belief that kitchens should feel alive.",
  },
  {
    name: "Good Company Table",
    text: "Dedicated to the principle that one of life’s greatest pleasures is eating together.",
  },
];

export default function KitchenPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <p style={eyebrowStyle}>CWRC Nutrition & Coffee Division</p>

        <h1 style={titleStyle}>The Kitchen</h1>

        <p style={subtitleStyle}>
          Where nutrition, coffee and practical wisdom meet.
        </p>

        <img
          src="/images/cuisine.png"
          alt="The CWRC Kitchen"
          style={imageStyle}
        />

        <p style={bodyStyle}>
          The CWRC kitchen is a warm yellow room dedicated to nutrition,
          conversation, hospitality and the serious study of good meals shared
          in good company.
        </p>

        <p style={bodyStyle}>
          It is also the official place where research pauses become better
          ideas, especially when coffee is involved.
        </p>

        <div style={gridStyle}>
          {kitchenItems.map((item) => (
            <article key={item.name} style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>{item.name}</h2>
              <p style={{ lineHeight: "1.7" }}>{item.text}</p>
            </article>
          ))}
        </div>

        <div style={quoteStyle}>
          <h2 style={{ marginTop: 0 }}>Official CWRC Kitchen Principle</h2>
          <p style={{ lineHeight: "1.8", marginBottom: 0 }}>
            “A good meal does not only feed the body. It can also repair a day.”
          </p>
        </div>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/rooms" style={buttonStyle}>
            ← Back to Rooms
          </Link>

          <Link href="/" style={buttonStyle}>
            Return Home
          </Link>
        </div>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#F7F1E6",
  color: "#102A4C",
  fontFamily: "Georgia, serif",
  padding: "48px 24px",
};

const heroStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  backgroundColor: "#FFFDF8",
  borderRadius: "24px",
  padding: "48px 32px",
  boxShadow: "0 20px 50px rgba(16, 42, 76, 0.15)",
};

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

const quoteStyle = {
  marginTop: "40px",
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  padding: "28px",
  borderRadius: "18px",
};

const buttonStyle = {
  display: "inline-block",
  padding: "14px 24px",
  borderRadius: "999px",
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  textDecoration: "none",
  fontWeight: "bold",
};