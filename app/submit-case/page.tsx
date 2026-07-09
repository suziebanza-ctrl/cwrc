import PageLayout from "../components/PageLayout";

export default function SubmitCasePage() {
  return (
    <PageLayout>
      <p style={eyebrowStyle}>Case Submission Office</p>

      <h1 style={titleStyle}>Submit a Case</h1>

      <p style={subtitleStyle}>
        For claims, suspicions and statements requiring official CWRC review.
      </p>

      <div style={noticeStyle}>
        <strong>Status:</strong> This form is a visual prototype. It does not send
        information yet.
      </div>

      <form style={formStyle}>
        <label style={labelStyle}>
          Your name
          <input type="text" placeholder="Optional" style={inputStyle} />
        </label>

        <label style={labelStyle}>
          Your email
          <input type="email" placeholder="Optional" style={inputStyle} />
        </label>

        <label style={labelStyle}>
          Case category
          <select style={inputStyle}>
            <option>Common Sense</option>
            <option>Nutrition</option>
            <option>History</option>
            <option>Mechanics</option>
            <option>Horses</option>
            <option>Plants</option>
            <option>Family Debate</option>
            <option>Other</option>
          </select>
        </label>

        <label style={labelStyle}>
          Statement to investigate
          <input
            type="text"
            placeholder="Example: Cathy said this would happen..."
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Context and evidence
          <textarea
            placeholder="Describe the situation, what happened, and why the CWRC should investigate."
            rows={8}
            style={textareaStyle}
          />
        </label>

        <label style={labelStyle}>
          Desired verdict type
          <select style={inputStyle}>
            <option>Was Cathy right?</option>
            <option>Needs investigation</option>
            <option>Possibly true</option>
            <option>Common sense review</option>
            <option>Animal supervision required</option>
          </select>
        </label>

        <button type="button" style={submitStyle}>
          Submit case
        </button>
      </form>
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

const formStyle = {
  marginTop: "32px",
  display: "grid",
  gap: "22px",
};

const labelStyle = {
  display: "grid",
  gap: "8px",
  fontWeight: "bold",
};

const inputStyle = {
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(16,42,76,.25)",
  fontSize: "1rem",
  fontFamily: "Georgia, serif",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical" as const,
};

const submitStyle = {
  justifySelf: "start",
  padding: "14px 26px",
  borderRadius: "999px",
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
};