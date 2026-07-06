const people = [
  {
    name: "Dr. Cathy",
    role: "Chief Research Officer",
    description:
      "Founder of the Center and final authority on all confirmed truths.",
    specialty:
      "Specialties: horses, nutrition, mechanics, history and common sense.",
  },
  {
    name: "Suzie",
    role: "Director of Research Operations",
    description:
      "Guardian of quality, structure, continuous improvement and good documentation.",
    specialty:
      "Inspired by Deming, Seneca, Marcus Aurelius and well-organized tables.",
  },
  {
    name: "GPT",
    role: "Chief Creative & Technical Officer",
    description:
      "Builds the website, prepares drafts, organizes ideas and tells questionable dad jokes.",
    specialty: "Official policy: GPT proposes. Cathy decides.",
  },
];

const animals = [
  {
    name: "Jenny",
    role: "Head of Equine Relations",
    description:
      "A blonde mare with calm authority, deep patience and silent judgment.",
  },
  {
    name: "Ranger",
    role: "Chief of Security",
    description:
      "A blonde Labrador responsible for safety, snack control and perimeter patrols.",
  },
  {
    name: "Lilo",
    role: "Research Companion",
    description:
      "A black standard poodle with a small white patch on her chest and excellent emotional intelligence.",
  },
  {
    name: "Annie",
    role: "Chief of Joy and Chaos",
    description:
      "A white fluffy dog, cheerful, clumsy and naturally gifted in comic timing.",
  },
  {
    name: "Capone",
    role: "Senior Feline Analyst",
    description:
      "A grey and black tabby cat with one slightly cut ear and a strong interest in boxes.",
  },
  {
    name: "Niko",
    role: "Junior Feline Analyst",
    description:
      "A blonde cat specializing in curiosity, sunshine, keyboard walks and optimism.",
  },
];

const navigation = [
  { label: "About Us", href: "/about" },
  { label: "Departments", href: "/departments" },
  { label: "Research Papers", href: "/research" },
  { label: "Ask Cathy", href: "/ask-cathy" },
  { label: "Submit a Case", href: "/submit-case" },
  { label: "Hall of Confirmed Truths", href: "/hall" },
  { label: "Contact", href: "/contact" },
];

const statistics = [
  { label: "Research Papers Published", value: "0" },
  { label: "Questions Answered", value: "0" },
  { label: "Cases Under Investigation", value: "7" },
  { label: "Coffee Consumed", value: "∞" },
  { label: "Times Cathy Was Wrong", value: "0" },
  { label: "Truths Confirmed", value: "Pending" },
];

const methods = [
  "Observe",
  "Question",
  "Research",
  "Analyze",
  "Cathy Decides",
  "Publish Truth",
];

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#F7F1E6",
        color: "#102A4C",
        fontFamily: "Georgia, serif",
      }}
    >
      <header
        style={{
          backgroundColor: "#102A4C",
          color: "#F7F1E6",
          padding: "14px 24px",
          position: "sticky",
          top: 0,
          zIndex: 10,
          boxShadow: "0 6px 18px rgba(16, 42, 76, 0.25)",
        }}
      >
        <nav
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/"
            style={{
              color: "#F7F1E6",
              textDecoration: "none",
              fontWeight: "bold",
              letterSpacing: "0.12em",
            }}
          >
            CWRC
          </a>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
              fontSize: "0.95rem",
            }}
          >
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  color: "#F7F1E6",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", gap: "12px", fontWeight: "bold" }}>
            <a href="#" style={{ color: "#F7F1E6", textDecoration: "none" }}>
              Français
            </a>
            <span>|</span>
            <a href="#" style={{ color: "#F7F1E6", textDecoration: "none" }}>
              English
            </a>
          </div>
        </nav>
      </header>

      <section
        style={{
          maxWidth: "1300px",
          margin: "32px auto 0",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFDF8",
            borderRadius: "24px",
            padding: "42px 32px",
            textAlign: "center",
            boxShadow: "0 20px 50px rgba(16, 42, 76, 0.15)",
            border: "1px solid rgba(138, 106, 61, 0.25)",
          }}
        >
          <p
            style={{
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#8A6A3D",
              fontSize: "0.85rem",
              marginBottom: "16px",
            }}
          >
            Official Research Institute
          </p>

          <h1
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.8rem)",
              lineHeight: "0.95",
              margin: "0 0 18px",
            }}
          >
            The Cathy Was Right
            <br />
            Research Center
          </h1>

          <h2
            style={{
              color: "#8A6A3D",
              fontWeight: "normal",
              fontSize: "1.7rem",
              marginBottom: "28px",
            }}
          >
            Where evidence catches up with Cathy.
          </h2>

          <p style={{ fontSize: "1.2rem", lineHeight: "1.8", margin: 0 }}>
            Curiosity. Kindness. Coffee.
          </p>

          <div
            style={{
              marginTop: "34px",
              display: "inline-block",
              padding: "16px 28px",
              borderRadius: "999px",
              backgroundColor: "#102A4C",
              color: "#F7F1E6",
              fontWeight: "bold",
            }}
          >
            Version 0.7 - Home page enriched
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1300px",
          margin: "28px auto 0",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 300px",
          gap: "24px",
        }}
      >
        <div>
          <section>
            <h2
              style={{
                textAlign: "center",
                fontSize: "2rem",
                marginBottom: "20px",
              }}
            >
              Founding Research Team
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "20px",
              }}
            >
              {people.map((person) => (
                <article key={person.name} style={cardStyle}>
                  <h3 style={{ marginTop: 0 }}>{person.name}</h3>

                  <p style={{ color: "#8A6A3D", fontWeight: "bold" }}>
                    {person.role}
                  </p>

                  <p>{person.description}</p>

                  <p>
                    <em>{person.specialty}</em>
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section style={{ marginTop: "40px" }}>
            <h2
              style={{
                textAlign: "center",
                fontSize: "2rem",
                marginBottom: "8px",
              }}
            >
              Our Official Animal Team
            </h2>

            <p
              style={{
                textAlign: "center",
                color: "#8A6A3D",
                fontSize: "1.1rem",
                marginBottom: "24px",
              }}
            >
              Not mascots. Colleagues.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
              }}
            >
              {animals.map((animal) => (
                <article
                  key={animal.name}
                  style={{
                    ...cardStyle,
                    borderTop: "6px solid #8A6A3D",
                  }}
                >
                  <h3 style={{ marginTop: 0 }}>{animal.name}</h3>

                  <p style={{ color: "#8A6A3D", fontWeight: "bold" }}>
                    {animal.role}
                  </p>

                  <p>{animal.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            style={{
              marginTop: "40px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            <article style={featureStyle}>
              <h2>Our Mission</h2>
              <p>
                To investigate the mysteries of everyday life with scientific
                rigor, intellectual curiosity and the growing suspicion that
                Cathy was right all along.
              </p>
            </article>

            <article style={featureStyle}>
              <h2>Our Methods</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "12px",
                  marginTop: "18px",
                }}
              >
                {methods.map((method) => (
                  <div
                    key={method}
                    style={{
                      backgroundColor: "#F7F1E6",
                      borderRadius: "999px",
                      padding: "12px 14px",
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#102A4C",
                    }}
                  >
                    {method}
                  </div>
                ))}
              </div>
            </article>
          </section>
        </div>

        <aside
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <section style={sidebarBoxStyle}>
            <h2
              style={{
                marginTop: 0,
                backgroundColor: "#102A4C",
                color: "#F7F1E6",
                padding: "14px 18px",
                borderRadius: "14px 14px 0 0",
                fontSize: "1.2rem",
              }}
            >
              Center Statistics
            </h2>

            <div style={{ padding: "8px 18px 18px" }}>
              {statistics.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    borderBottom: "1px solid rgba(138, 106, 61, 0.25)",
                    padding: "12px 0",
                    fontSize: "0.95rem",
                  }}
                >
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section style={sidebarBoxStyle}>
            <h2
              style={{
                marginTop: 0,
                backgroundColor: "#102A4C",
                color: "#F7F1E6",
                padding: "14px 18px",
                borderRadius: "14px 14px 0 0",
                fontSize: "1.2rem",
              }}
            >
              Today’s Official Finding
            </h2>

            <div style={{ padding: "18px" }}>
              <p style={{ lineHeight: "1.7" }}>
                Common sense is not that common. Use it daily.
              </p>

              <p style={{ color: "#8A6A3D", fontWeight: "bold" }}>
                — Verified by Cathy
              </p>
            </div>
          </section>

          <section style={sidebarBoxStyle}>
            <h2
              style={{
                marginTop: 0,
                backgroundColor: "#102A4C",
                color: "#F7F1E6",
                padding: "14px 18px",
                borderRadius: "14px 14px 0 0",
                fontSize: "1.2rem",
              }}
            >
              Submit a Case
            </h2>

            <div style={{ padding: "18px" }}>
              <p style={{ lineHeight: "1.7" }}>
                Do you have a question, an affirmation or a mystery that needs
                official CWRC review?
              </p>

              <a
                href="/submit-case"
                style={{
                  display: "inline-block",
                  marginTop: "12px",
                  padding: "12px 18px",
                  borderRadius: "999px",
                  backgroundColor: "#102A4C",
                  color: "#F7F1E6",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Submit your case
              </a>
            </div>
          </section>
        </aside>
      </section>

      <footer
        style={{
          marginTop: "48px",
          backgroundColor: "#102A4C",
          color: "#F7F1E6",
          textAlign: "center",
          padding: "24px",
          fontSize: "0.95rem",
        }}
      >
        Science. Experience. Common Sense. Coffee. Sometimes in that order.
      </footer>
    </main>
  );
}

const cardStyle = {
  backgroundColor: "#FFFDF8",
  borderRadius: "18px",
  padding: "24px",
  boxShadow: "0 12px 30px rgba(16, 42, 76, 0.12)",
  border: "1px solid rgba(138, 106, 61, 0.18)",
};

const featureStyle = {
  backgroundColor: "#FFFDF8",
  borderRadius: "18px",
  padding: "28px",
  boxShadow: "0 12px 30px rgba(16, 42, 76, 0.12)",
  borderLeft: "8px solid #8A6A3D",
};

const sidebarBoxStyle = {
  backgroundColor: "#FFFDF8",
  borderRadius: "16px",
  boxShadow: "0 12px 30px rgba(16, 42, 76, 0.12)",
  border: "1px solid rgba(138, 106, 61, 0.22)",
  overflow: "hidden",
};