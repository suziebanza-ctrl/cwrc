import ImmersiveRoomPage from "../components/ImmersiveRoomPage";
import PageLayout from "../components/PageLayout";
import { getContent } from "../i18n/content";

export default function LaboratoryPage() {
  return (
    <PageLayout locale="en">
      <ImmersiveRoomPage
        locale="en"
        roomKey="laboratory"
        page={getContent("en").pages.laboratory}
      />
    </PageLayout>
  );
}
