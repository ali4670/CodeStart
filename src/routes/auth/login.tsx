import { createFileRoute } from "@tanstack/react-router";
import { CodeStartAuthPanel } from "@/components/auth/codestart-auth-panel";

export const Route = createFileRoute("/auth/login")({
  component: () => <CodeStartAuthPanel mode="login" />,
});
