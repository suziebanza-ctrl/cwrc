import ImmersiveRoomPage from "../components/ImmersiveRoomPage";
import PageLayout from "../components/PageLayout";
import { getContent } from "../i18n/content";

export default function GreenhousePage() {
  return (
    <PageLayout locale="en">
      <ImmersiveRoomPage
        locale="en"
        roomKey="greenhouse"
        page={getContent("en").pages.greenhouse}
      />
    </PageLayout>
  );
}
