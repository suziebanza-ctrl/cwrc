import PageLayout from "../components/PageLayout";

export default function AskCathyPage() {
  return (
    <PageLayout>
      <p style={eyebrowStyle}>Public Inquiry Desk</p>

      <h1 style={titleStyle}>Ask Cathy</h1>

      <p style={subtitleStyle}>
        Submit a question. GPT may organize the draft, but Cathy keeps the final word.
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
          Question category
          <select style={inputStyle}>
            <option>Common Sense</option>
            <option>Nutrition</option>
            <option>History</option>
            <option>Mechanics</option>
            <option>Horses</option>
            <option>Plants</option>
            <option>Other mystery</option>
          </select>
        </label>

        <label style={labelStyle}>
          Your question for Cathy
          <textarea
            placeholder="Write your question here..."
            rows={8}
            style={textareaStyle}
          />
        </label>

        <button type="button" style={submitStyle}>
          Submit question
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