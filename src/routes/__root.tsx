import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useLocation,
} from "@tanstack/react-router";
import { useState } from "react";
import {
  User as UserIcon,
  LogOut,
  Shield,
  Menu,
  Moon,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";
import { LanguageProvider, useLanguage } from "../lib/LanguageContext";
import { AuthProvider, useAuth } from "../hooks/use-auth";
import { AuthModal } from "../components/AuthModal";
import { ProfileEdit } from "../components/ProfileEdit";
import { HeroButton } from "../funs/HeroButton";
import { Button } from "../components/ui/button";
import { CodeStartFooter } from "../components/layout/footer";

const gatewayLinks = [
  { label: "Courses", to: "/courses" },
  { label: "Tracks", to: "/tracks" },
  { label: "Playground", to: "/playground" },
  { label: "Community", to: "/community" },
  { label: "Pricing", to: "/pricing" },
];

function Header() {
  const { language, setLanguage, isAr } = useLanguage();
  const { user, profile, signOut, isModerator } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[100] border-b border-white/10 bg-[#0A0A0F]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-3 text-white">
            <img src="/codestart-logo.svg" alt="CodeStart Academy" className="h-9 w-9 rounded-xl shadow-lg shadow-blue-600/20" />
            <span className="font-mono text-xl font-black tracking-tight md:text-2xl">
              CodeStart<span className="text-amber-400">.</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {gatewayLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                className="text-sm font-medium text-white/65 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="hidden h-9 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 transition-all hover:bg-white/10 sm:flex"
          >
            <span
              className={`text-[9px] font-black transition-colors ${language === "en" ? "text-amber-300" : "text-white/20"}`}
            >
              EN
            </span>
            <div className="w-7 h-3.5 rounded-full bg-black/40 border border-white/10 relative">
              <motion.div
                animate={{ x: language === "ar" ? (isAr ? -14 : 14) : 0 }}
                className="absolute left-0.5 top-0.5 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
              />
            </div>
            <span
              className={`text-[9px] font-black transition-colors ${language === "ar" ? "text-amber-300" : "text-white/20"}`}
            >
              AR
            </span>
          </button>
          <Button variant="ghost" size="icon" className="hidden text-white hover:bg-white/10 md:inline-flex">
            <Moon className="size-4" />
          </Button>
          {user ? (
            <div
              className={`flex items-center gap-4 ${isAr ? "flex-row-reverse" : ""}`}
            >
              <div className="flex items-center gap-2">
                {profile?.role === "parent" && (
                  <Link to="/parent-dashboard">
                    <HeroButton
                      size="sm"
                      variant="outline"
                      className="px-4 border-purple-500/20 text-purple-400 hover:bg-purple-500/20"
                    >
                      <UserIcon className="w-4 h-4 mr-2" />
                      {isAr ? "لوحة أولياء الأمور" : "Parent Dashboard"}
                    </HeroButton>
                  </Link>
                )}
                {isModerator && (
                  <Link to="/moderator">
                    <HeroButton
                      size="sm"
                      variant="outline"
                      className="px-4 border-blue-500/20 text-blue-300 hover:bg-blue-500/20"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      {isAr ? "لوحة التحكم" : "Moderator Panel"}
                    </HeroButton>
                  </Link>
                )}
                <HeroButton
                  onClick={() => setIsProfileEditOpen(true)}
                  size="sm"
                  variant="outline"
                  className="w-11 h-11 p-0 rounded-full overflow-hidden border-2 border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.18)]"
                >
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-black text-white">
                      {(profile?.username || user.email?.split("@")[0] || "?")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                </HeroButton>
                <HeroButton
                  onClick={() => signOut()}
                  size="sm"
                  variant="outline"
                  className="w-10 h-10 p-0 rounded-xl border-red-500/20 text-red-500 hover:bg-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                </HeroButton>
              </div>
            </div>
          ) : (
            <HeroButton onClick={() => setIsAuthModalOpen(true)} size="md" variant="primary">
              <UserIcon className="w-3.5 h-3.5" />
              {isAr ? "ابدأ مجانا" : "Start Free"}
            </HeroButton>
          )}
          <button className="text-white md:hidden" onClick={() => setIsMobileOpen((value) => !value)} aria-label="Toggle menu">
            {isMobileOpen ? <X /> : <Menu />}
          </button>
        </div>
        </div>
        <div className={`grid transition-[grid-template-rows] duration-300 md:hidden ${isMobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <nav className="mx-4 mb-4 rounded-2xl border border-white/10 bg-white/5 p-3">
              {gatewayLinks.map((link) => (
                <Link key={link.label} to={link.to} hash={link.hash} className="block rounded-xl px-3 py-3 text-sm text-white/75 hover:bg-white/10 hover:text-white" onClick={() => setIsMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <ProfileEdit
        isOpen={isProfileEditOpen}
        onClose={() => setIsProfileEditOpen(false)}
      />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <AnimatePresence mode="wait">
              <motion.main
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-screen pt-16"
              >
                <Outlet />
              </motion.main>
            </AnimatePresence>
            <CodeStartFooter />
          </div>
          <Toaster position="bottom-right" theme="dark" richColors />
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootComponent,
    errorComponent: ({ error }) => <div>Error: {error.message}</div>,
  },
);
