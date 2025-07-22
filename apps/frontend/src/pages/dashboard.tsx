import { CameraInterface } from "../components/dashboard/camera-interface";
import { ChatSidebar } from "../components/dashboard/camera-sidebar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-background">
      <ChatSidebar />
      <CameraInterface />
    </div>
  );
}
