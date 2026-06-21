import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef, useCallback } from "react";
import type { ChangeEvent, ComponentType } from "react";
import {
  ArrowLeft,
  Code2,
  FileUp,
  Link2,
  Loader2,
  MessageSquare,
  Radio,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "../../../lib/supabase-code";
import { useAuth } from "../../../hooks/use-auth";
import { useLanguage } from "../../../lib/LanguageContext";

export const Route = createFileRoute("/levels/classroom/$levelId")({
  component: LevelClassroomPage,
});

interface ChatMessage {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
  profiles?: {
    username?: string;
    avatar_url?: string | null;
    role?: string;
  } | null;
}

function LevelClassroomPage() {
  const { levelId } = Route.useParams();
  const { isAr } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [levelTitle, setLevelTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasAccessToLevel, setHasAccessToLevel] = useState(false);

  const fetchLevelDetailsAndAccess = useCallback(async () => {
    if (!user) {
      toast.error(isAr ? "سجل الدخول أولاً" : "Please log in");
      navigate({ to: "/levels" });
      return;
    }

    setLoading(true);
    try {
      const levelRes = await supabase
        .from("levels")
        .select("title")
        .eq("id", levelId)
        .single();

      if (levelRes.error) throw levelRes.error;

      setLevelTitle(levelRes.data?.title || "Unknown Level");
      setHasAccessToLevel(true);
    } catch (error) {
      console.error("DEBUG: Failed to fetch level details:", error);
      navigate({ to: "/levels" });
    } finally {
      setLoading(false);
    }
  }, [isAr, levelId, user, navigate]);

  useEffect(() => {
    fetchLevelDetailsAndAccess();
  }, [fetchLevelDetailsAndAccess]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0F]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!hasAccessToLevel) return null;

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#0A0A0F] px-4 py-8 text-white md:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/levels" })}
              className="mb-6 w-fit rounded-xl border-white/15 bg-white/[0.04] text-zinc-300 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="size-4" />
              {isAr ? "العودة للمسار" : "Back to path"}
            </Button>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
              <Radio className="size-4" />
              {isAr ? "غرفة الصف المباشرة" : "Live classroom"}
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              {levelTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
              {isAr
                ? "اسأل، شارك حلولك، ارفع ملفاتك، وراجع أفكار زملائك داخل نفس مستوى التعلم."
                : "Ask questions, share solutions, upload files, and review class thinking without leaving the learning path."}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-[520px]">
            <ClassroomMetric icon={Users} label={isAr ? "المجتمع" : "Room"} value={isAr ? "نشط" : "Active"} />
            <ClassroomMetric icon={Code2} label={isAr ? "الصيغ" : "Formats"} value="Text, code, files" />
            <ClassroomMetric icon={ShieldCheck} label={isAr ? "الوصول" : "Access"} value={isAr ? "مستوى فقط" : "Level only"} />
          </div>
        </div>

        <div className="mb-5 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">
                  {isAr ? "بروتوكول الفصل" : "Classroom protocol"}
                </p>
                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  {isAr
                    ? "اكتب السؤال بوضوح، أرفق المحاولة، ثم شارك ما تعلمته بعد الحل."
                    : "Post the question clearly, attach your attempt, then share what changed after solving it."}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-zinc-300">
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5">Question</span>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5">Attempt</span>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5">Review</span>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-amber-400/20 bg-amber-500/10 p-5">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 size-5 shrink-0 text-amber-200" />
              <p className="text-sm leading-6 text-amber-50/85">
                {isAr
                  ? "أفضل الرسائل تحتوي على الخطأ، الكود، وما توقعته من الناتج."
                  : "Best messages include the error, the code, and what output you expected."}
              </p>
            </div>
          </div>
        </div>

        <div className="min-h-[640px] flex-1">
          <LevelChat levelId={levelId} isAr={isAr} />
        </div>
      </div>
    </main>
  );
}

function ClassroomMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-xl shadow-black/10">
      <Icon className="mb-3 size-5 text-blue-300" />
      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-zinc-100">{value}</p>
    </div>
  );
}

function LevelChat({ levelId, isAr }: { levelId: string; isAr: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { profile, isAdmin } = useAuth();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messageMode, setMessageMode] = useState<"text" | "code" | "link">("text");

  const fetchMessages = useCallback(async () => {
    const { data } = await supabase
      .from("level_chats")
      .select("*, profiles(username, avatar_url, role)")
      .eq("level_id", levelId)
      .order("created_at", { ascending: true });

    if (data) setMessages(data as ChatMessage[]);
  }, [levelId]);

  useEffect(() => {
    fetchMessages();
    const subscription = supabase
      .channel(`level:${levelId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "level_chats",
          filter: `level_id=eq.${levelId}`,
        },
        () => {
          fetchMessages();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [levelId, fetchMessages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !profile) return;

    const formattedContent =
      messageMode === "code"
        ? `CODE_BLOCK\n${newMessage}`
        : messageMode === "link"
          ? `LINK_SHARE\n${newMessage}`
          : newMessage;

    const { error } = await supabase.from("level_chats").insert([
      {
        level_id: levelId,
        sender_id: profile.id,
        content: formattedContent,
      },
    ]);

    if (error) {
      toast.error(isAr ? "فشل إرسال الرسالة" : "Failed to send message");
      return;
    }

    setNewMessage("");
  };

  const deleteMessage = async (messageId: string) => {
    const { error } = await supabase.from("level_chats").delete().eq("id", messageId);
    if (error) {
      toast.error(isAr ? "فشل حذف الرسالة" : "Failed to delete message");
      return;
    }

    toast.success(isAr ? "تم حذف الرسالة" : "Message deleted");
    fetchMessages();
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !profile) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${profile.id}/classroom/${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage
        .from("course_files")
        .upload(fileName, file);
      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("course_files").getPublicUrl(fileName);

      const { error: insertError } = await supabase.from("level_chats").insert([
        {
          level_id: levelId,
          sender_id: profile.id,
          content: `FILE_SHARE\n${file.name}\n${publicUrl}`,
        },
      ]);
      if (insertError) throw insertError;

      toast.success(isAr ? "تم رفع الملف" : "File uploaded to classroom");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
      if (event.target) event.target.value = "";
    }
  };

  const renderMessageContent = (content: string) => {
    if (content.startsWith("FILE_SHARE\n")) {
      const [, fileName, url] = content.split("\n");
      return (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="block rounded-2xl border border-blue-400/25 bg-blue-500/10 p-4 transition-colors hover:bg-blue-500/15"
        >
          <div className="flex items-center gap-3 text-blue-200">
            <FileUp className="size-4" />
            <span className="text-sm font-bold">{fileName}</span>
          </div>
          <p className="mt-2 break-all text-xs text-zinc-500">{url}</p>
        </a>
      );
    }

    if (content.startsWith("LINK_SHARE\n")) {
      const url = content.replace("LINK_SHARE\n", "");
      return (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 break-all text-blue-200 underline underline-offset-4"
        >
          <Link2 className="size-4" />
          {url}
        </a>
      );
    }

    if (content.startsWith("CODE_BLOCK\n")) {
      const code = content.replace("CODE_BLOCK\n", "");
      return (
        <pre className="overflow-x-auto rounded-2xl border border-emerald-400/20 bg-black/50 p-4 text-xs leading-6 text-emerald-200">
          <code>{code}</code>
        </pre>
      );
    }

    return <p className="whitespace-pre-wrap text-sm leading-relaxed">{content}</p>;
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0D0E15]/95 shadow-2xl shadow-black/30">
      <header className="flex flex-col gap-4 border-b border-white/10 bg-white/[0.035] p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div className="flex items-center gap-4">
          <div className="flex size-11 items-center justify-center rounded-2xl border border-blue-400/25 bg-blue-500/10 text-blue-200">
            <MessageSquare className="size-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.22em] text-white">
              {isAr ? "غرفة محادثة المستوى" : "Level comm-link"}
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              {messages.length} {isAr ? "رسالة" : messages.length === 1 ? "message" : "messages"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
          <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.85)]" />
          {isAr ? "مزامنة مباشرة" : "Live sync"}
        </div>
      </header>

      <div
        ref={chatContainerRef}
        className="custom-scrollbar flex-1 space-y-6 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_34%)] p-4 md:p-8"
      >
        {messages.map((message, index) => {
          const isOwn = message.sender_id === profile?.id;
          return (
            <div key={message.id ?? index} className={cn("flex gap-4", isOwn && "flex-row-reverse")}>
              <div className="size-11 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
                {message.profiles?.avatar_url ? (
                  <img src={message.profiles.avatar_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-black text-zinc-500">
                    {message.profiles?.username?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
              </div>

              <div className={cn("max-w-[82%]", isOwn && "text-right")}>
                <div className={cn("mb-2 flex flex-wrap items-center gap-2", isOwn && "justify-end")}>
                  <span className="text-xs font-black uppercase tracking-tight text-white">
                    {message.profiles?.username || "Student"}
                  </span>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[9px] font-black uppercase",
                      message.profiles?.role === "admin"
                        ? "border-red-400/30 bg-red-500/15 text-red-200"
                        : message.profiles?.role === "moderator"
                          ? "border-blue-400/30 bg-blue-500/15 text-blue-200"
                          : "border-white/10 bg-white/[0.05] text-zinc-400",
                    )}
                  >
                    {message.profiles?.role || "student"}
                  </span>
                  <span className="text-[9px] font-bold uppercase text-zinc-600">
                    {new Date(message.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {(isAdmin || isOwn) && (
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="rounded-full border border-red-400/20 bg-red-500/10 p-1 text-red-300 transition-colors hover:bg-red-500 hover:text-white"
                      aria-label="Delete message"
                    >
                      <Trash2 className="size-3" />
                    </button>
                  )}
                </div>

                <div
                  className={cn(
                    "rounded-3xl p-5 text-sm leading-relaxed shadow-lg shadow-black/10",
                    isOwn
                      ? "rounded-tr-md border border-blue-400/25 bg-blue-500/12 text-blue-50"
                      : "rounded-tl-md border border-white/10 bg-white/[0.055] text-zinc-200",
                  )}
                >
                  {renderMessageContent(message.content)}
                </div>
              </div>
            </div>
          );
        })}

        {messages.length === 0 && (
          <div className="flex h-full min-h-[360px] flex-col items-center justify-center space-y-4 text-center text-zinc-500">
            <div className="flex size-20 items-center justify-center rounded-[1.75rem] border border-white/10 bg-white/[0.04]">
              <MessageSquare className="size-9" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.32em]">
              {isAr ? "ابدأ أول نقاش" : "Start the first transmission"}
            </p>
            <p className="max-w-md text-sm leading-6 text-zinc-600">
              {isAr
                ? "اطرح سؤالا أو شارك محاولة حل ليستفيد منها باقي الفصل."
                : "Ask a question or share a solution attempt so the room has a useful starting point."}
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 bg-[#10121A]/95 p-4 backdrop-blur md:p-6">
        <div className="mx-auto max-w-5xl space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["text", "link", "code"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setMessageMode(mode)}
                className={cn(
                  "rounded-2xl px-4 py-2 text-[10px] font-black uppercase tracking-widest transition",
                  messageMode === mode
                    ? "bg-blue-600 text-white"
                    : "bg-white/[0.05] text-zinc-500 hover:bg-white/[0.08] hover:text-zinc-300",
                )}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && sendMessage()}
              placeholder={
                messageMode === "code"
                  ? isAr
                    ? "ألصق الكود أو الحل هنا..."
                    : "Paste code or solution here..."
                  : messageMode === "link"
                    ? isAr
                      ? "ألصق الرابط هنا..."
                      : "Paste a useful link here..."
                    : isAr
                      ? "أرسل تحديثات، ملاحظات، أو أسئلة..."
                      : "Share updates, notes, or questions..."
              }
              className={cn(
                "w-full rounded-3xl border border-white/10 bg-black/30 py-6 pl-6 font-semibold text-white transition-all placeholder:text-zinc-600 focus:border-blue-400/60 focus:bg-black/45 focus:outline-none",
                isAr ? "pr-24 text-right" : "pr-24",
              )}
            />
            <button
              onClick={sendMessage}
              disabled={isUploading}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 rounded-2xl bg-blue-600 p-4 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105 hover:bg-blue-500 active:scale-95 disabled:opacity-50",
                isAr ? "left-3" : "right-3",
              )}
              aria-label="Send message"
            >
              <Send className={cn("size-5", isAr && "rotate-180")} />
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,video/*,.pdf,.doc,.docx,.zip,.txt,.py,.js,.cpp"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className={cn(
                "absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-zinc-400 transition-all hover:bg-white/[0.1] hover:text-white disabled:opacity-50",
                isAr ? "left-20" : "right-20",
              )}
              aria-label="Upload file"
            >
              {isUploading ? (
                <Loader2 className="size-5 animate-spin text-blue-300" />
              ) : (
                <FileUp className="size-5" />
              )}
            </button>
          </div>

          <p className="text-xs leading-5 text-zinc-500">
            {isAr
              ? "يمكن لأي مستخدم مشارك رفع ملف، مشاركة رابط، أو لصق كود داخل غرفة الكورس."
              : "Any enrolled user can share a file, useful link, plain message, or code snippet in this course classroom."}
          </p>
        </div>
      </div>
    </div>
  );
}
