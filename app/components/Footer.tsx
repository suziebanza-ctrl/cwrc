export default function Footer() {
  return (
    <footer style={footerStyle}>
      <p style={missionStyle}>
        The Cathy Was Right Research Center™
      </p>

      <p style={valuesStyle}>
        Humour • Kindness • Curiosity
      </p>

      <p style={copyrightStyle}>
        © 2025-2026 The Cathy Was Right Research Center™. All rights reserved.
      </p>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  textAlign: "center" as const,
  padding: "28px 20px",
  marginTop: "60px",
};

const missionStyle = {
  fontWeight: "bold",
  fontSize: "1.1rem",
  margin: "0 0 8px",
};

const valuesStyle = {
  color: "#D8C49A",
  margin: "0 0 8px",
};

const copyrightStyle = {
  margin: 0,
  fontSize: "0.9rem",
};