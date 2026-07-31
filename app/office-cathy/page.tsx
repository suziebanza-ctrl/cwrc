import Link from "next/link";
import ImmersiveRoomPage from "../components/ImmersiveRoomPage";
import PageLayout from "../components/PageLayout";
import { getContent } from "../i18n/content";

export default function CathyOfficePage() {
  return (
    <PageLayout locale="en">
      <ImmersiveRoomPage
        locale="en"
        roomKey="office-cathy"
        page={getContent("en").pages["office-cathy"]}
      />

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <Link
          href="/en/charisma-passage"
          style={{
            display: "inline-block",
            padding: "13px 22px",
            borderRadius: "999px",
            background: "#102a4c",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          🖼️ Open the secret passage of one hundred presences
        </Link>
      </div>
    </PageLayout>
  );
}
