import { createFileRoute } from "@tanstack/react-router";
import { CodeStartAuthPanel } from "@/components/auth/codestart-auth-panel";

export const Route = createFileRoute("/auth/register")({
  component: () => <CodeStartAuthPanel mode="register" />,
});
