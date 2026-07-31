import ImmersiveRoomPage from "../components/ImmersiveRoomPage";
import PageLayout from "../components/PageLayout";
import { getContent } from "../i18n/content";

export default function GptOfficePage() {
  return (
    <PageLayout locale="en">
      <ImmersiveRoomPage
        locale="en"
        roomKey="office-gpt"
        page={getContent("en").pages["office-gpt"]}
      />
    </PageLayout>
  );
}
