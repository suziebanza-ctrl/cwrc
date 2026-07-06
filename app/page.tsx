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
            maxWidth: "1200px",
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
          maxWidth: "1100px",
          margin: "48px auto 0",
          backgroundColor: "#FFFDF8",
          borderRadius: "24px",
          padding: "56px 32px",
          textAlign: "center",
          boxShadow: "0 20px 50px rgba(16, 42, 76, 0.15)",
        }}
      >
        <p
          style={{
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8A6A3D",
            fontSize: "0.85rem",
            marginBottom: "20px",
          }}
        >
          Official Research Institute
        </p>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: "1",
            margin: "0 0 18px",
          }}
        >
          The Cathy Was Right Research Center
        </h1>

        <h2
          style={{
            color: "#8A6A3D",
            fontWeight: "normal",
            fontSize: "1.6rem",
            marginBottom: "32px",
          }}
        >
          Where evidence catches up with Cathy.
        </h2>

        <p style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
          Welcome to the official headquarters of the CWRC.
        </p>

        <p style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
          Research is currently underway.
        </p>

        <p style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
          Please excuse the coffee cups, clipboards and dogs wandering through
          the building.
        </p>

        <div
          style={{
            marginTop: "36px",
            display: "inline-block",
            padding: "16px 28px",
            borderRadius: "999px",
            backgroundColor: "#102A4C",
            color: "#F7F1E6",
            fontWeight: "bold",
          }}
        >
          Version 0.6 - Real pages connected
        </div>
      </section>

      <section
        style={{
          maxWidth: "1100px",
          margin: "32px auto 0",
          padding: "0 24px",
        }}
      >
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
            <article
              key={person.name}
              style={{
                backgroundColor: "#FFFDF8",
                borderRadius: "18px",
                padding: "24px",
                boxShadow: "0 12px 30px rgba(16, 42, 76, 0.12)",
              }}
            >
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

      <section
        style={{
          maxWidth: "1100px",
          margin: "40px auto 48px",
          padding: "0 24px",
        }}
      >
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
                backgroundColor: "#FFFDF8",
                borderRadius: "18px",
                padding: "24px",
                boxShadow: "0 12px 30px rgba(16, 42, 76, 0.12)",
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
    </main>
  );
}