import { Link } from "@tanstack/react-router";

const groups = [
  { title: "Platform", links: ["Courses", "Tracks", "Playground", "Leaderboard", "Community"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
  { title: "Support", links: ["Help Center", "Contact", "Privacy Policy", "Terms"] },
  { title: "Social", links: ["Facebook", "YouTube", "Discord", "LinkedIn"] },
];

export function CodeStartFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0F] px-6 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img src="/codestart-logo.svg" alt="CodeStart Academy" className="h-12 w-12 rounded-2xl shadow-lg shadow-blue-600/20" />
            <span className="font-mono text-2xl font-black">
              CodeStart Academy<span className="text-amber-400">.</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
            Where Egyptian students become engineers before university.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-bold text-white">{group.title}</h3>
              <div className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <a key={link} href="#" className="block text-sm text-white/55 transition hover:text-white">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/45">
        © 2025 CodeStart Academy. Built in Egypt.
      </div>
    </footer>
  );
}
