import Link from "next/link";

const rooms = [
  {
    title: "The CWRC Estate",
    image: "/images/facade.png",
    description:
      "The official headquarters of the Center, home to the research team and animal staff.",
    link: "/",
  },
  {
    title: "The Laboratory",
    image: "/images/laboratoire.png",
    description: "Where claims are tested and evidence is gathered.",
    link: "/laboratory",
  },
  {
    title: "The Greenhouse",
    image: "/images/greenhouse.png",
    description: "A botanical sanctuary where ideas and plants grow together.",
    link: "/greenhouse",
  },
  {
    title: "The CWRC Kitchen",
    image: "/images/cuisine.png",
    description: "Nutrition, coffee and common sense under one roof.",
    link: "/kitchen",
  },
  {
    title: "Suzie's Office",
    image: "/images/bureau-suzie.png",
    description: "Organization, quality and continuous improvement.",
    link: "/office-suzie",
  },
  {
    title: "GPT's Technical Studio",
    image: "/images/bureau-gpt.png",
    description: "Technology, coding and the occasional dad joke.",
    link: "/office-gpt",
  },
  {
    title: "Dr. Cathy's Office",
    image: "/images/bureau-cathy.png",
    description: "A beautiful chaos of books, notes and confirmed truths.",
    link: "/office-cathy",
  },
  {
    title: "The Grand Library",
    image: "/images/bibliotheque.png",
    description: "The heart of knowledge, with secret passages for the animals.",
    link: "/library",
  },
];

export default function RoomsPage() {
  return (
    <main
      style={{
        padding: "60px",
        backgroundColor: "#ECE6DB",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
          color: "#102A4C",
          marginBottom: "20px",
        }}
      >
        Rooms of the Center
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#8A6A3D",
          fontSize: "1.2rem",
          marginBottom: "50px",
        }}
      >
        Explore the places where evidence catches up with Cathy.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "40px",
        }}
      >
        {rooms.map((room) => (
          <Link
            key={room.title}
            href={room.link}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFDFA",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                height: "100%",
              }}
            >
              <img
                src={room.image}
                alt={room.title}
                style={{
                  width: "100%",
                  display: "block",
                }}
              />

              <div style={{ padding: "25px" }}>
                <h2
                  style={{
                    color: "#102A4C",
                    marginBottom: "15px",
                  }}
                >
                  {room.title}
                </h2>

                <p
                  style={{
                    lineHeight: "1.7",
                    color: "#333",
                  }}
                >
                  {room.description}
                </p>

                <p
                  style={{
                    marginTop: "18px",
                    color: "#8A6A3D",
                    fontWeight: "bold",
                  }}
                >
                  Enter →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <Link href="/">
          <button
            style={{
              backgroundColor: "#102A4C",
              color: "white",
              border: "none",
              padding: "16px 30px",
              borderRadius: "999px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Return to the Center
          </button>
        </Link>
      </div>
    </main>
  );
}