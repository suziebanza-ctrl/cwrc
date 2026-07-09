import Header from "./Header";
import Footer from "./Footer";
import NavigationButtons from "./NavigationButtons";

type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main style={pageStyle}>
      <Header />

      <section style={contentStyle}>
        {children}

        <NavigationButtons />
      </section>

      <Footer />
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#F7F1E6",
  color: "#102A4C",
  fontFamily: "Georgia, serif",
};

const contentStyle = {
  maxWidth: "1100px",
  margin: "48px auto",
  backgroundColor: "#FFFDF8",
  borderRadius: "24px",
  padding: "48px 32px",
  boxShadow: "0 20px 50px rgba(16, 42, 76, 0.15)",
};