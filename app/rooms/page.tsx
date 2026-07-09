import Link from "next/link";
import PageLayout from "../components/PageLayout";

const rooms = [
  {
    title: "The Laboratory",
    image: "/images/laboratoire.png",
    description: "Where evidence is tested before becoming official truth.",
    link: "/laboratory",
  },
  {
    title: "The Grand Greenhouse",
    image: "/images/greenhouse.png",
    description: "A botanical sanctuary dedicated to learning and discovery.",
    link: "/greenhouse",
  },
  {
    title: "The Kitchen",
    image: "/images/cuisine.png",
    description: "Where nutrition, coffee and good conversations meet.",
    link: "/kitchen",
  },
  {
    title: "The Grand Library",
    image: "/images/bibliotheque.png",
    description: "The intellectual heart of the CWRC.",
    link: "/library",
  },
  {
    title: "Dr. Cathy's Office",
    image: "/images/bureau-cathy.png",
    description: "Research, intuition and organized chaos.",
    link: "/office-cathy",
  },
  {
    title: "GPT Technical Studio",
    image: "/images/Bureau-gpt.png",
    description: "Software, architecture and imagination.",
    link: "/office-gpt",
  },
  {
    title: "Suzie's Office",
    image: "/images/bureau-suzie.png",
    description: "Quality, organization and continuous improvement.",
    link: "/office-suzie",
  },
];

export default function RoomsPage() {
  return (
    <PageLayout>
      <p style={eyebrowStyle}>CWRC Estate</p>

      <h1 style={titleStyle}>Rooms Directory</h1>

      <p style={subtitleStyle}>
        Every room has its own personality. Choose a door and begin your visit.
      </p>

      <div style={gridStyle}>
        {rooms.map((room) => (
          <Link
            key={room.title}
            href={room.link}
            style={cardStyle}
          >
            <img
              src={room.image}
              alt={room.title}
              style={imageStyle}
            />

            <h2>{room.title}</h2>

            <p>{room.description}</p>

            <span style={buttonStyle}>
              Enter →
            </span>
          </Link>
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

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))",
  gap: "28px",
  marginTop: "40px",
};

const cardStyle = {
  backgroundColor: "#FFFDF8",
  borderRadius: "22px",
  overflow: "hidden",
  textDecoration: "none",
  color: "#102A4C",
  boxShadow: "0 12px 30px rgba(16,42,76,.12)",
  transition: "transform .25s",
};

const imageStyle = {
  width: "100%",
  height: "230px",
  objectFit: "cover" as const,
};

const buttonStyle = {
  display: "inline-block",
  margin: "18px",
  padding: "10px 18px",
  borderRadius: "999px",
  background: "#102A4C",
  color: "#F7F1E6",
  fontWeight: "bold",
};