import { createContext, useContext, useEffect, useState } from "react"
import { ArrowUpRight, Bell, Check, ChevronDown, Compass, Copy, FileText, Fingerprint, Heart, LockKeyhole, LogOut, Mail, MessageCircle, MessageSquare, Mic, Palette, Share2, ShieldAlert, Type, UserRound, X } from "lucide-react"
import { createBrowserRouter, Link, RouterProvider, useLocation, useNavigate, useParams } from "react-router"
import svgPaths from "@/imports/DivBgCard/svg-7ssjqf29zd"

// ─── theme tokens ─────────────────────────────────────────────────────────────
const T = {
  background: "var(--app-background)",
  text: "#FFFFFF",
  muted: "rgba(255,255,255,0.52)",
  card: "rgba(255,255,255,0.10)",
  cardHover: "rgba(255,255,255,0.15)",
  border: "rgba(255,255,255,0.18)",
  borderHover: "rgba(255,255,255,0.32)",
  input: "rgba(255,255,255,0.10)",
  green: "#1FDE9D",
  greenDim: "rgba(31,222,157,0.18)",
  greenText: "#0A3028",
  violet: "#C8DDD8",
  violetDim: "rgba(200,221,216,0.16)",
  violetText: "#E2EFEC",
  activeNav: "rgba(255,255,255,0.14)",
  activeNavFg: "#FFFFFF",
}

const THEME_PRESETS = [
  { id: "sage", name: "Sage", color: "#688E7F" },
  { id: "forest", name: "Forest", color: "#355E52" },
  { id: "slate", name: "Slate", color: "#3E5868" },
  { id: "plum", name: "Plum", color: "#51495F" },
  { id: "night", name: "Night", color: "#33424B" },
  { id: "moss", name: "Moss", color: "#505E47" },
  { id: "eucalyptus", name: "Eucalyptus", color: "#455E53" },
  { id: "pine", name: "Pine", color: "#11552F" },
  { id: "evergreen", name: "Evergreen", color: "#0B3C2D" },
  { id: "charcoal", name: "Charcoal", color: "#222222" },
  { id: "ink", name: "Ink", color: "#121212" },
  { id: "midnight", name: "Midnight", color: "#001F3F" },
  { id: "deep-navy", name: "Deep navy", color: "#0A1128" },
]

const FONT_PRESETS = [
  { id: "jost", name: "Jost", stack: '"Jost", sans-serif', available: true, note: "Default" },
  { id: "montserrat", name: "Montserrat", stack: '"Montserrat", sans-serif', available: true },
  { id: "futura", name: "Futura", stack: '"Futura LT", sans-serif', available: true, note: "Uploaded" },
  { id: "proxima-nova", name: "Proxima Nova", stack: '"Proxima Nova", sans-serif', available: false },
  { id: "lato", name: "Lato", stack: '"Lato", sans-serif', available: true },
  { id: "nexa", name: "Nexa", stack: '"Nexa", sans-serif', available: false },
  { id: "roboto", name: "Roboto", stack: '"Roboto", sans-serif', available: true },
  { id: "poppins", name: "Poppins", stack: '"Poppins", sans-serif', available: true },
  { id: "raleway", name: "Raleway", stack: '"Raleway", sans-serif', available: true },
  { id: "brandon-grotesque", name: "Brandon Grotesque", stack: '"Brandon Grotesque", sans-serif', available: false },
  { id: "rubik", name: "Rubik", stack: '"Rubik", sans-serif', available: true },
  { id: "ranade", name: "Ranade", stack: '"Ranade", sans-serif', available: false },
  { id: "neuton", name: "Neuton", stack: '"Neuton", serif', available: true },
  { id: "libre-baskerville", name: "Libre Baskerville", stack: '"Libre Baskerville", serif', available: true },
  { id: "manrope", name: "Manrope", stack: '"Manrope", sans-serif', available: true },
]

type ThemeContextValue = { themeId: string; setThemeId: (id: string) => void; fontId: string; setFontId: (id: string) => void }

const ThemeContext = createContext<ThemeContextValue | null>(null)

function useAppTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useAppTheme must be used within ThemeContext")
  return context
}

// ─── types ───────────────────────────────────────────────────────────────────

type NavItem = "start" | "conversations" | "signals" | "patterns" | "map" | "todo" | "stories" | "about"
type PublicNavItem = "home" | "how-it-works" | "stories" | "privacy"

// ─── brand SVGs ──────────────────────────────────────────────────────────────

function BrandIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 85 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.3806 0H56.3329C72.1544 0 85 12.8459 85 28.6677V49.4682C85 69.0797 69.0782 85 49.4689 85H2.90163C1.30035 85 0 83.6996 0 82.0965V35.3795C0 15.8534 15.8531 0 35.3806 0Z"
        fill="#3AAC7B"
      />
      <path
        d="M59.6674 16.9086H59.1212C56.7305 16.9086 54.7316 18.731 54.5124 21.1125L54.1911 24.6031C52.9316 38.2515 48.6757 49.0149 44.6837 48.647C40.6916 48.2792 38.4773 36.9176 39.7368 23.2693L39.8928 21.5806C40.125 19.0728 38.1503 16.9104 35.6332 16.9104H24.5283C20.3542 16.9104 16.9695 20.2951 16.9695 24.4693V46.6315C16.9695 60.2148 27.9816 71.2271 41.5647 71.2271H44.4366C56.084 71.2271 65.5245 61.7864 65.5245 50.1388V22.764C65.5245 19.5298 62.9015 16.9086 59.6674 16.9086Z"
        fill="white"
      />
    </svg>
  )
}

const LOGO_PATH =
  "M79.5342 144.816C77.2941 150.768 72.814 155.44 65.3262 155.44C61.3583 155.44 58.7979 154.032 58.7979 154.032L60.334 145.584C60.334 145.584 62.1907 146.544 64.3027 146.544C66.7343 146.544 68.27 145.776 69.2939 143.984L69.4219 143.792L68.5752 141.576H80.6641L79.5342 144.816ZM38.9121 111.408C46.3999 111.408 49.6641 116.784 49.6641 123.376V142H38.1436V126.32C38.1436 123.312 37.0556 121.456 34.4316 121.456C31.3599 121.456 30.5919 123.888 30.5918 126.512V142H19.0723V126.32C19.0723 123.312 17.9834 121.456 15.3594 121.456C12.2878 121.456 11.5196 123.888 11.5195 126.512V142H0V111.792L9.47168 111.472C10.1757 112.88 10.8154 115.952 10.8154 117.168H11.0078C12.3518 113.84 14.9119 111.408 19.8398 111.408C25.1518 111.408 28.2883 114.096 29.6963 118C30.9123 114.16 33.5362 111.408 38.9121 111.408ZM159.634 0C189.247 4.66884e-05 213.29 21.3961 213.29 47.749V82.3945C213.29 115.06 183.489 141.576 146.786 141.576H80.6641L91.0547 111.792H79.5342L75.6943 126.832C75.2463 128.496 75.1179 129.584 74.7979 131.44H74.542C74.286 129.584 74.0945 128.496 73.6465 126.832L69.3584 111.792H57.1982L68.5752 141.576H59.626C56.6292 141.576 54.1956 139.411 54.1953 136.74V58.9277C54.1956 26.4054 83.8676 0.000118275 120.417 0H159.634ZM346.073 36.7354C372.335 36.7354 393.121 57.2782 391.419 81.6348L390.854 89.999C389.725 106.381 375.036 119.175 357.273 119.175H321.001C317.552 119.175 314.767 116.457 315.004 113.216L319.536 48.6523C319.963 41.9511 326.006 36.7354 333.231 36.7354H346.073ZM164.853 28.1621C160.378 28.1621 156.636 31.1975 156.226 35.1641L155.624 40.9785C153.267 63.7109 145.301 81.6388 137.829 81.0264C130.358 80.4132 126.213 61.4894 128.57 38.7568L128.863 35.9443C129.297 31.7672 125.601 28.165 120.89 28.165H100.104C92.2919 28.1652 85.957 33.8033 85.957 40.7559V77.6689C85.9571 100.293 106.568 118.636 131.991 118.636H137.367C159.168 118.636 176.837 102.911 176.837 83.5107V37.915C176.837 32.5281 171.928 28.1621 165.874 28.1621H164.853ZM442.89 25.9824C469.089 25.9826 490.286 45.5978 490.195 69.7988V104.15C490.195 107.996 486.823 111.109 482.659 111.109H473.77C469 111.109 465.393 107.088 466.285 102.768C466.898 99.7871 467.457 96.6322 467.926 93.3516C470.737 74.037 469.944 58.0028 466.104 57.5273C463.383 57.1853 459.921 64.7452 457.115 76.0674C456.79 77.3588 457.585 78.6989 458.99 79.0898C463.201 80.3393 465.824 82.029 465.824 83.9277C465.824 86.1754 462.03 88.2064 456.277 89.4141C455.151 89.6304 454.267 90.4963 454.122 91.5781C453.464 96.1153 453.042 100.436 452.762 104.457C452.528 108.129 449.202 111.026 445.181 111.026H414.157C409.992 111.026 406.62 107.913 406.62 104.066V57.1367C406.62 39.9369 421.731 25.9826 440.356 25.9824H442.89ZM261.489 27.7754C287.75 27.7754 308.578 48.3597 306.832 72.6738L306.267 81.0381C305.138 97.4197 290.451 110.214 272.689 110.214H236.418C232.97 110.214 230.185 107.496 230.422 104.256L234.953 39.6914C235.38 32.9904 241.423 27.7756 248.648 27.7754H261.489ZM360.96 65.7344C357.037 64.0715 349.858 71.0346 344.853 81.2881C339.847 91.5343 338.947 101.172 342.823 102.793C346.745 104.456 353.924 97.4928 358.93 87.2393C363.89 76.9929 364.835 67.3973 360.96 65.7344ZM287.896 65.7529C284.211 55.0679 276.367 47.8359 270.37 49.5908C264.373 51.3883 262.481 61.5073 266.166 72.1924C269.851 82.8775 277.696 90.1104 283.692 88.3555C289.689 86.6074 291.58 76.438 287.896 65.7529Z"

function WordmarkLogo({ width = 88 }: { width?: number }) {
  const h = Math.round(width * (156 / 491))
  return (
    <svg
      width={width}
      height={h}
      viewBox="0 0 491 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={LOGO_PATH} fill="white" />
    </svg>
  )
}

// ─── nav icons ────────────────────────────────────────────────────────────────

function NavIcon({ item }: { item: NavItem }) {
  const s = 18
  const props = {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  switch (item) {
    case "start":
      return (
        <svg {...props}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    case "conversations":
      return (
        <svg {...props}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
    case "signals":
      return (
        <svg {...props}>
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      )
    case "patterns":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      )
    case "map":
      return (
        <svg {...props}>
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
      )
    case "todo":
      return (
        <svg {...props}>
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      )
    case "stories":
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    case "about":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      )
  }
}

// ─── sidebar ──────────────────────────────────────────────────────────────────

const NAV_ITEMS: { id: NavItem label: string }[] = [
  { id: "start", label: "Start" },
  { id: "conversations", label: "Conversations" },
  { id: "signals", label: "Signals" },
  { id: "patterns", label: "Patterns" },
  { id: "map", label: "Map of you" },
  { id: "todo", label: "To-do" },
  { id: "stories", label: "Stories" },
  { id: "about", label: "About" },
]

const PUBLIC_NAV_ITEMS: { id: PublicNavItem; label: string; href: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { id: "home", label: "Home", href: "/", icon: Compass },
  { id: "how-it-works", label: "How it works", href: "/#features", icon: MessageSquare },
  { id: "stories", label: "Stories", href: "/stories", icon: FileText },
  { id: "privacy", label: "Privacy & trust", href: "/#privacy", icon: LockKeyhole },
]

function PublicSidebar({ active, open, onClose }: { active: PublicNavItem; open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <button className="fixed inset-0 z-30 bg-black/35 sm:hidden" aria-label="Close menu" onClick={onClose} />}
      <aside
        className={`fixed sm:relative z-40 sm:z-auto flex h-full w-[270px] flex-shrink-0 flex-col border-r transition-transform duration-200 ease-in-out ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
        style={{ backgroundColor: T.background, borderColor: T.border }}
      >
        <div className="px-6 pb-8 pt-7 sm:px-5 sm:pt-6">
          <Link to="/" aria-label="myUDDA home" onClick={onClose}><WordmarkLogo width={92} /></Link>
          <p className="mt-5 max-w-[180px] text-xs leading-relaxed" style={{ color: T.muted }}>
            A place to hear yourself more clearly.
          </p>
        </div>

        <nav className="px-4" aria-label="Public site navigation">
          <p className="px-3 pb-2 text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: T.muted }}>Explore</p>
          <div className="space-y-1">
            {PUBLIC_NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = active === item.id
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
                  style={{ backgroundColor: isActive ? T.activeNav : "transparent", color: isActive ? T.text : T.muted }}
                >
                  <Icon size={17} strokeWidth={1.8} />
                  {item.label}
                </a>
              )
            })}
          </div>
        </nav>

        <div className="mt-auto border-t px-5 py-5" style={{ borderColor: T.border }}>
          <p className="text-xs" style={{ color: T.muted }}>Your private space is ready when you are.</p>
          <a href="/app/talks" className="mt-3 flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold transition-opacity hover:opacity-85" style={{ backgroundColor: T.green, color: T.greenText }}>
            Sign in to your space <ArrowUpRight size={16} />
          </a>
        </div>
      </aside>
    </>
  )
}

function Sidebar({
  active,
  onNavigate,
  onAccountOpen,
  open,
  onClose,
}: {
  active: NavItem | null
  onNavigate: (item: NavItem) => void
  onAccountOpen: () => void
  open: boolean
  onClose: () => void
}) {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 sm:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed sm:relative z-40 sm:z-auto h-full w-[260px] sm:w-[220px] flex-shrink-0 flex flex-col transition-transform duration-200 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
        style={{
          backgroundColor: T.background,
          borderRight: `1px solid ${T.border}`,
        }}
      >
        {/* logo */}
        <div className="px-6 pt-7 pb-6 sm:px-5 sm:pt-6 sm:pb-5">
          <WordmarkLogo width={90} />
        </div>

        {/* nav */}
        <nav className="flex-1 py-5 px-4 space-y-1 sm:py-4 sm:px-3 sm:space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id)
                  onClose()
                }}
                className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-150 text-left sm:gap-3 sm:px-3 sm:py-2.5 sm:text-sm"
                style={{
                  backgroundColor: isActive ? T.activeNav : "transparent",
                  color: isActive ? T.activeNavFg : T.muted,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = T.card
                    e.currentTarget.style.color = T.text
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent"
                    e.currentTarget.style.color = T.muted
                  }
                }}
              >
                <span>
                  <NavIcon item={item.id} />
                </span>
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* user pill */}
        <div className="relative px-4 py-5 sm:px-3 sm:py-4">
          {accountMenuOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 overflow-hidden rounded-xl border sm:left-3 sm:right-3" style={{ backgroundColor: T.background, borderColor: "white" }}>
              <button onClick={() => { setAccountMenuOpen(false); onAccountOpen() }} className="flex w-full items-center gap-2 px-3 py-3 text-left text-sm transition-colors hover:bg-white/10" style={{ color: T.text }}>
                <UserRound size={16} /> Account
              </button>
              <button className="flex w-full items-center gap-2 px-3 py-3 text-left text-sm transition-colors hover:bg-white/10" style={{ color: T.muted }}>
                <LogOut size={16} /> Sign out
              </button>
            </div>
          )}
          <button onClick={() => setAccountMenuOpen((value) => !value)} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-white/10 sm:px-3 sm:py-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-medium flex-shrink-0"
              style={{ backgroundColor: T.violetDim, color: T.violetText }}
            >
              JM
            </div>
            <span className="text-sm font-medium" style={{ color: T.text }}>
              Jordan M.
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}

// ─── top bar ─────────────────────────────────────────────────────────────────

function TopBar({
  onOpenDashboard,
  onMenuToggle,
}: {
  onOpenDashboard: () => void
  onMenuToggle: () => void
}) {
  return (
    <header
      className="flex items-center justify-between px-5 pt-5 pb-3.5 flex-shrink-0"
      style={{ backgroundColor: T.background, minHeight: "56px" }}
    >
      <div className="sm:hidden">
        <WordmarkLogo width={72} />
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <button
          onClick={onOpenDashboard}
          className="font-semibold text-sm px-4 py-2 rounded-full transition-all hover:opacity-90"
          style={{
            backgroundColor: T.card,
            border: `1px solid ${T.border}`,
            color: T.text,
          }}
        >
          Your space
        </button>
        <button
          className="sm:hidden p-1 rounded-lg"
          onClick={onMenuToggle}
          style={{ color: T.muted }}
          aria-label="Open menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  )
}

// ─── shared primitives ────────────────────────────────────────────────────────

function MicIcon({
  size = 24,
  color = "currentColor",
}: {
  size?: number
  color?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="9" y1="22" x2="15" y2="22" />
    </svg>
  )
}

function ChevronRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border ${className}`}
      style={{ backgroundColor: "transparent", borderColor: "white" }}
    >
      {children}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-mono text-xs uppercase tracking-widest"
      style={{ color: T.muted }}
    >
      {children}
    </p>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string color: string }> = {
    "In Progress": { bg: T.violetDim, color: T.violetText },
    Completed: { bg: T.greenDim, color: T.green },
    Paused: { bg: "rgba(255,255,255,0.07)", color: T.muted },
  }
  const s = styles[status] ?? { bg: T.card, color: T.muted }
  return (
    <span
      className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full"
      style={{ backgroundColor: s.bg, color: s.color }}
    >
      {status}
    </span>
  )
}

function ProgressBar({
  value,
  color = T.green,
}: {
  value: number
  color?: string
}) {
  return (
    <div
      className="h-1.5 rounded-full overflow-hidden"
      style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
    >
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  )
}

function DualAxisMeter({
  narrative,
  analysis,
}: {
  narrative: number
  analysis: number
}) {
  const axes = [
    {
      label: "Your narrative",
      value: narrative,
      color: "rgba(255,255,255,0.72)",
    },
    { label: "myUDDA analysis", value: analysis, color: T.green },
  ]

  return (
    <div
      className="space-y-2 pt-1"
      aria-label={`Your narrative score ${narrative * 10}. myUDDA analysis score ${analysis * 10}.`}
    >
      {axes.map((axis) => (
        <div
          key={axis.label}
          className="grid grid-cols-[112px_1fr_28px] items-center gap-2"
        >
          <span className="text-[10px] leading-none" style={{ color: T.muted }}>
            {axis.label}
          </span>
          <div
            className="h-1.5 rounded-full relative"
            style={{ backgroundColor: "rgba(255,255,255,0.16)" }}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${axis.value * 10}%`, backgroundColor: axis.color }}
            />
            <span
              className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full border"
              style={{
                left: `calc(${axis.value * 10}% - 4px)`,
                backgroundColor: T.background,
                borderColor: axis.color,
              }}
            />
          </div>
          <span className="text-[10px] text-right" style={{ color: axis.color }}>
            {axis.value * 10}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── voice widget (from DivBgCard import) ────────────────────────────────────

function UddaLogoMark({
  size = 32,
  fill = "white",
}: {
  size?: number
  fill?: string
}) {
  return (
    <svg fill="none" height={size} viewBox="0 0 32 32" width={size}>
      <path
        clipRule="evenodd"
        d={svgPaths.p3105d500}
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

function VoiceWidget({ onStart }: { onStart: () => void }) {
  const [active, setActive] = useState(false)
  const prompts = [
    "What felt hardest this week — and what surprised you about how you handled it?",
    "Help me untangle the thought I've been carrying around all day.",
    "Why do I keep putting off the thing that matters most to me?",
    "I had a difficult conversation. Can we make sense of it together?",
    "What would a kinder version of my inner voice say right now?",
    "Help me notice a pattern in how I've been feeling lately.",
    "I'm stuck between two choices. Can you help me hear what I already know?",
    "What is one small way I can take care of myself today?",
  ]
  const [promptIndex, setPromptIndex] = useState(0)
  const [typedLength, setTypedLength] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const barHeights = [4, 6.52, 11.08, 6.52, 4]
  const barScale = [0.58, 0.49, 0.42, 0.49, 0.58]
  const waveAnimations = [
    "voice-wave-edge",
    "voice-wave-inner",
    "voice-wave-center",
    "voice-wave-inner",
    "voice-wave-edge",
  ]
  const prompt = prompts[promptIndex]

  useEffect(() => {
    if (active) return

    if (!isDeleting && typedLength < prompt.length) {
      const timer = window.setTimeout(
        () => setTypedLength((length) => length + 1),
        18,
      )
      return () => window.clearTimeout(timer)
    }

    if (!isDeleting) {
      const timer = window.setTimeout(() => setIsDeleting(true), 1800)
      return () => window.clearTimeout(timer)
    }

    if (typedLength > 0) {
      const timer = window.setTimeout(
        () => setTypedLength((length) => length - 1),
        12,
      )
      return () => window.clearTimeout(timer)
    }

    const timer = window.setTimeout(() => {
      setPromptIndex((index) => (index + 1) % prompts.length)
      setIsDeleting(false)
    }, 180)
    return () => window.clearTimeout(timer)
  }, [active, isDeleting, prompt, prompts.length, typedLength])

  return (
    <div
      className="w-full rounded-[16px] border p-5 flex flex-col gap-3"
      style={{ maxWidth: "520px", borderColor: "rgba(216,211,202,0.4)" }}
    >
      {/* prompt text */}
      <div className="h-[78px] flex items-start overflow-hidden">
        <p style={{ fontSize: "16px", lineHeight: "26px", color: "white" }}>
          <span style={{ color: "rgba(255,255,255,0.75)" }}>
            {active ? "Listening… speak freely." : prompt.slice(0, typedLength)}
            {!active && (
              <span className="voice-type-cursor" aria-hidden="true">
                |
              </span>
            )}
          </span>
        </p>
      </div>

      {/* divider */}
      <div style={{ borderTop: "1px solid rgba(216,211,202,0.4)" }} />

      {/* bottom row */}
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col items-start justify-start gap-1 flex-shrink-0 sm:flex-row sm:items-start sm:gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActive((v) => !v)}
              className="flex items-center justify-center flex-shrink-0 w-8 h-8 transition-opacity hover:opacity-80"
              aria-label="Toggle mic"
            >
              <UddaLogoMark size={21} fill={active ? T.green : "white"} />
            </button>

            <div className="flex gap-[2px] items-end" style={{ height: "12px" }}>
              {barHeights.map((h, i) => (
                <div
                  key={i}
                  className="rounded-full flex-shrink-0"
                  style={{
                    width: "3px",
                    height: `${h * barScale[i] * 1.15 * 1.15}px`,
                    backgroundColor: "#bdfad0",
                    transition: `height ${0.15 + i * 0.05}s ease-in-out`,
                    transformOrigin: "bottom",
                    animation: `${waveAnimations[i]} ${
                      active ? 0.8 : 1.7 + i * 0.16
                    }s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </div>
          </div>

          <span className="text-xs sm:hidden" style={{ color: "white" }}>
            {active ? "Listening…" : "Tap the mic and say the word"}
          </span>
        </div>

        <div className="flex items-center justify-start gap-y-3 gap-x-5">
          <span className="hidden text-xs sm:block" style={{ color: "white" }}>
            {active ? "Listening…" : "Tap the mic and say the word"}
          </span>
          <button
            onClick={onStart}
            className="flex items-center gap-2 rounded-full px-4 py-2 flex-shrink-0 transition-opacity hover:opacity-80"
            style={{
              fontSize: "14px",
              fontWeight: 700,
              backgroundColor: "white",
              color: T.background,
            }}
          >
            <Mic size={14} strokeWidth={2} />
            Talk
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── landing ──────────────────────────────────────────────────────────────────

function LandingView({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-full">
      {/* hero */}
      <section className="px-8 pt-14 pb-20 max-w-4xl mx-auto">
        <h1
          className="font-[family-name:var(--font-display)] font-semibold text-3xl sm:text-[34px] leading-[1.1] tracking-tight mb-8"
          style={{ color: T.text, maxWidth: "520px" }}
        >
          <span className="block text-[0.58em] font-normal mb-1" style={{ color: T.violet }}>
            Welcome home to yourself
          </span>
          <span className="block">Personalized AI Voice Coaching</span>
        </h1>
        <VoiceWidget onStart={onStart} />
        <p className="mt-2 ml-5 text-xs" style={{ color: T.muted }}>
          Only Open Source models used. Hosted in EU.
        </p>
      </section>

      {/* features */}
      <section id="features" className="px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-[family-name:var(--font-display)] text-3xl mb-10"
            style={{ color: T.text }}
          >
            Speak, Reflect, Grow.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                num: "01",
                title: "Voice-First",
                body: "Just talk. No forms, no typing. Your AI coach listens and responds with empathy.",
                accent: T.violet,
              },
              {
                num: "02",
                title: "Track Progress",
                body: "Set goals that matter. Watch your momentum build with honest visual tracking.",
                accent: T.green,
              },
              {
                num: "03",
                title: "Reflect & Grow",
                body: "Every session distils into insights. Look back, see patterns, understand yourself.",
                accent: T.violet,
              },
              {
                num: "04",
                title: "Real Coaches",
                body: "When you need human support, we match you with vetted coaches matched to your journey.",
                accent: "rgba(255,255,255,0.5)",
              },
            ].map((f) => (
              <div
                key={f.num}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid white",
                }}
              >
                <p
                  className="font-mono text-2xl font-medium mb-3"
                  style={{ color: f.accent, opacity: 0.4 }}
                >
                  {f.num}
                </p>
                <h3
                  className="font-semibold mb-1.5 text-sm"
                  style={{ color: T.text }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: T.muted }}
                >
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section id="privacy" className="px-8 py-16">
        <div
          className="max-w-4xl mx-auto rounded-3xl p-10 text-center"
          style={{ backgroundColor: "transparent", border: "1px solid white" }}
        >
          <h2
            className="font-[family-name:var(--font-display)] text-4xl mb-5 leading-tight"
            style={{ color: T.text }}
          >
            You already know
            <br />
            <em className="not-italic" style={{ color: T.green }}>
              what needs to change.
            </em>
          </h2>
          <p
            className="mb-7 max-w-sm mx-auto text-sm"
            style={{ color: T.muted }}
          >
            The first session is free. No credit card. No sign-up form. Just you
            and your voice.
          </p>
          <button
            onClick={onStart}
            className="font-semibold text-base px-7 py-3.5 rounded-full hover:opacity-90 transition-all duration-200 hover:scale-[1.02]"
            style={{ backgroundColor: T.green, color: T.greenText }}
          >
            Start Your Journey →
          </button>
        </div>
      </section>

      {/* footer */}
      <footer className="px-8 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <WordmarkLogo width={64} />
          <div className="flex gap-6 text-sm" style={{ color: T.muted }}>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
          <span className="font-mono text-xs" style={{ color: T.muted }}>
            © 2026 UDDA
          </span>
        </div>
      </footer>
    </div>
  )
}

// ─── overview ─────────────────────────────────────────────────────────────────

function OverviewView({
  onMicClick,
  micActive,
}: {
  onMicClick: () => void
  micActive: boolean
}) {
  return (
    <div className="space-y-7">
      <div>
        <h2
          className="text-3xl font-[family-name:var(--font-display)] font-normal"
          style={{ color: T.text }}
        >
          Good morning, Jordan.
        </h2>
        <p className="mt-1 text-sm" style={{ color: T.muted }}>
          You have 2 active goals and a reflection waiting from last Thursday.
        </p>
      </div>

      {/* voice card */}
      <Card className="p-6 flex items-center gap-5">
        <button
          onClick={onMicClick}
          className="relative w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: T.green }}
        >
          {micActive && (
            <>
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: T.green, opacity: 0.35 }}
              />
              <span
                className="absolute rounded-full border-2 animate-ping"
                style={{
                  inset: "-8px",
                  borderColor: T.green,
                  opacity: 0.2,
                  animationDelay: "0.3s",
                }}
              />
            </>
          )}
          <MicIcon size={24} color={T.greenText} />
        </button>
        <div className="flex-1 min-w-0">
          <Label>Today&apos;s prompt</Label>
          <p
            className="font-[family-name:var(--font-display)] leading-snug mt-1"
            style={{ color: T.text }}
          >
            {micActive ? (
              <em style={{ color: T.green }}>Listening... speak freely.</em>
            ) : (
              "What felt hardest this week — and what surprised you about how you handled it?"
            )}
          </p>
          {!micActive && (
            <p className="text-xs mt-1" style={{ color: T.muted }}>
              Tap the mic when you&apos;re ready.
            </p>
          )}
        </div>
        {micActive && (
          <div className="flex items-end gap-0.5 h-7 flex-shrink-0">
            {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 1, 0.7, 0.4].map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-full"
                style={{
                  height: `${h * 26}px`,
                  backgroundColor: T.green,
                  animation: `wave ${0.55 + i * 0.08}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>
        )}
      </Card>

      {/* stat tiles */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Sessions",
            value: "24",
            sub: "this month",
            bg: T.violetDim,
            fg: T.violetText,
          },
          {
            label: "Active Goals",
            value: "2",
            sub: "of 4 total",
            bg: T.greenDim,
            fg: T.green,
          },
          {
            label: "Reflections",
            value: "17",
            sub: "entries logged",
            bg: T.card,
            fg: T.text,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-5 border"
            style={{ backgroundColor: s.bg, borderColor: T.border }}
          >
            <p
              className="font-mono text-[10px] uppercase tracking-widest mb-1.5"
              style={{ color: s.fg, opacity: 0.7 }}
            >
              {s.label}
            </p>
            <p
              className="text-4xl font-[family-name:var(--font-display)] font-semibold"
              style={{ color: s.fg }}
            >
              {s.value}
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: s.fg, opacity: 0.55 }}
            >
              {s.sub}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}

// ─── conversations ────────────────────────────────────────────────────────────

const REFLECTIONS = [
  {
    id: 1,
    date: "Sep 2, 2026",
    duration: "14 min",
    themes: ["Anxiety", "Work boundaries", "Self-worth"],
    excerpt:
      "You spoke about feeling stretched across multiple priorities. You noticed a pattern of saying yes when you mean no, especially with your manager. You identified that rest is productive — not indulgent.",
  },
  {
    id: 2,
    date: "Aug 30, 2026",
    duration: "9 min",
    themes: ["Morning routine", "Energy"],
    excerpt:
      "Short session focused on the morning. You reflected on how the first 20 minutes of your day set the tone. Decided to try a 5-minute voice check-in before opening any apps.",
  },
  {
    id: 3,
    date: "Aug 27, 2026",
    duration: "18 min",
    themes: ["Grief", "Change", "Resilience"],
    excerpt:
      "A harder session. You talked about the ending of a friendship and how change doesn't always feel like growth in the moment. You arrived at a meaningful reframe by the end.",
  },
  {
    id: 4,
    date: "Aug 24, 2026",
    duration: "11 min",
    themes: ["Career", "Identity", "Fear"],
    excerpt:
      "You questioned whether your job title defines you. Explored the gap between who you are at work and who you are at home. Left with a question to sit with: What would you do if no one was watching?",
  },
]

function ConversationsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl font-[family-name:var(--font-display)]"
          style={{ color: T.text }}
        >
          Conversations
        </h2>
        <p className="text-sm mt-0.5" style={{ color: T.muted }}>
          Your voice sessions, distilled.
        </p>
      </div>
      <div className="space-y-4">
        {REFLECTIONS.map((r) => (
          <Card key={r.id} className="p-5">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs" style={{ color: T.muted }}>
                  {r.date}
                </span>
                <span
                  className="font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: T.muted,
                  }}
                >
                  {r.duration}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {r.themes.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: T.violetDim,
                      color: T.violetText,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <p
              className="text-sm leading-relaxed font-[family-name:var(--font-display)] italic"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              &ldquo;{r.excerpt}&rdquo;
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}

const TALK_STARTERS = [
  {
    title: "Start here",
    body: "Get started with your first conversation and understand how the app works.",
    icon: Compass,
  },
  {
    title: "New chat",
    body: "Open a conversation about anything — you set the style and topic.",
    icon: MessageCircle,
  },
  {
    title: "No bullshit",
    body: "Radical honesty mode — no room for biased self-soothing narratives.",
    icon: ShieldAlert,
  },
  {
    title: "Is It True?",
    body: "Do the work — inquiry in the spirit of Byron Katie’s four questions.",
    icon: ArrowUpRight,
  },
  {
    title: "Who Am I Really",
    body: "What myUDDA sees — your values, fears, dreams, and patterns so far.",
    icon: Fingerprint,
  },
]

function TalksView() {
  const [selectedTalk, setSelectedTalk] = useState<string | null>(null)

  return (
    <div className="space-y-12">
      <section>
        <div className="mb-6">
          <h1 className="text-3xl font-[family-name:var(--font-display)]" style={{ color: T.text }}>
            Talks
          </h1>
          <p className="mt-1 text-sm" style={{ color: T.muted }}>
            Pick a door. The work starts when you say the first honest thing.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {TALK_STARTERS.map((talk, index) => {
            const Icon = talk.icon
            const selected = selectedTalk === talk.title
            return (
              <button
                key={talk.title}
                onClick={() => setSelectedTalk(talk.title)}
                className={`group relative min-h-[148px] rounded-2xl border p-5 text-left transition-colors ${index === 0 ? "sm:col-span-2" : ""}`}
                style={{
                  backgroundColor: selected ? T.greenDim : "transparent",
                  borderColor: selected ? T.green : "white",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[11px] uppercase tracking-[0.16em]" style={{ color: selected ? T.green : T.muted }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon size={18} strokeWidth={1.6} style={{ color: selected ? T.green : "rgba(255,255,255,0.68)" }} />
                </div>
                <h2 className="mt-7 text-lg font-medium" style={{ color: T.text }}>{talk.title}</h2>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed" style={{ color: T.muted }}>{talk.body}</p>
                {selected && <span className="absolute bottom-5 right-5 text-xs font-medium" style={{ color: T.green }}>Ready to talk</span>}
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-[family-name:var(--font-display)]" style={{ color: T.text }}>Conversation history</h2>
            <p className="mt-1 text-sm" style={{ color: T.muted }}>The threads you have already pulled.</p>
          </div>
          <span className="text-xs" style={{ color: T.muted }}>{REFLECTIONS.length} talks</span>
        </div>
        <div className="space-y-3">
          {REFLECTIONS.map((reflection) => (
            <Card key={reflection.id} className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium" style={{ color: T.text }}>{reflection.themes[0]}</p>
                  <p className="mt-1 text-xs" style={{ color: T.muted }}>{reflection.date} · {reflection.duration}</p>
                </div>
                <ArrowUpRight size={17} strokeWidth={1.6} style={{ color: T.muted }} />
              </div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.76)" }}>&ldquo;{reflection.excerpt}&rdquo;</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

// ─── signals ──────────────────────────────────────────────────────────────────

const SIGNALS = [
  {
    id: "boundary",
    kind: "A pattern worth testing",
    thread: "Work boundaries",
    text: "You often explain a no before anyone has asked for an explanation.",
    source: "From your Sep 2 conversation",
  },
  {
    id: "permission",
    kind: "Aha moment",
    thread: "Rest",
    text: "You called rest a reward — then noticed you only permit it after exhaustion.",
    source: "From your Aug 30 conversation",
  },
  {
    id: "identity",
    kind: "A pattern worth testing",
    thread: "Identity",
    text: "Your language gets smaller when you talk about the work you actually want to make.",
    source: "From your Aug 24 conversation",
  },
  {
    id: "certainty",
    kind: "Aha moment",
    thread: "Relationships",
    text: "You were waiting for certainty before saying what you needed. The conversation itself may be how you find it.",
    source: "From your Aug 27 conversation",
  },
]

function SignalsView() {
  const [decisions, setDecisions] = useState<Record<string, "accepted" | "rejected">>({})
  const [commentingOn, setCommentingOn] = useState<string | null>(null)
  const [comments, setComments] = useState<Record<string, string>>({})
  const [draft, setDraft] = useState("")

  function decide(id: string, decision: "accepted" | "rejected") {
    setDecisions((current) => ({ ...current, [id]: decision }))
    setCommentingOn(null)
  }

  function saveComment(id: string) {
    const trimmed = draft.trim()
    if (!trimmed) return
    setComments((current) => ({ ...current, [id]: trimmed }))
    setDraft("")
    setCommentingOn(null)
  }

  return (
    <div className="space-y-7">
      <div>
        <h2
          className="text-2xl font-[family-name:var(--font-display)]"
          style={{ color: T.text }}
        >
          Signals
        </h2>
        <p className="text-sm mt-0.5" style={{ color: T.muted }}>
          Things myUDDA noticed across your conversations. Keep what lands; leave the rest.
        </p>
      </div>

      <div className="space-y-4">
        {SIGNALS.map((signal) => {
          const decision = decisions[signal.id]
          const hasComment = Boolean(comments[signal.id])
          return (
            <Card key={signal.id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em]" style={{ color: T.green }}>{signal.kind}</p>
                  <h3 className="mt-2 text-lg font-medium" style={{ color: T.text }}>{signal.thread}</h3>
                </div>
                {decision && <span className="text-xs font-medium" style={{ color: decision === "accepted" ? T.green : T.muted }}>{decision === "accepted" ? "Kept" : "Let go"}</span>}
              </div>
              <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>&ldquo;{signal.text}&rdquo;</p>
              <p className="mt-3 text-xs" style={{ color: T.muted }}>{signal.source}</p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <button onClick={() => decide(signal.id, "accepted")} className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors" style={{ borderColor: decision === "accepted" ? T.green : "white", color: decision === "accepted" ? T.green : T.text }}>
                  <Check size={14} /> Accept
                </button>
                <button onClick={() => decide(signal.id, "rejected")} className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors" style={{ borderColor: decision === "rejected" ? "rgba(255,255,255,0.5)" : "white", color: T.muted }}>
                  <X size={14} /> Reject
                </button>
                <button onClick={() => { setCommentingOn(commentingOn === signal.id ? null : signal.id); setDraft(comments[signal.id] ?? "") }} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs" style={{ color: hasComment ? T.green : T.muted }}>
                  <MessageSquare size={14} /> {hasComment ? "Commented" : "Comment"}
                </button>
              </div>

              {commentingOn === signal.id && (
                <div className="mt-4 flex gap-2">
                  <input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") saveComment(signal.id) }} placeholder="Put words to it…" className="min-w-0 flex-1 rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:border-[#1FDE9D]" style={{ borderColor: "rgba(255,255,255,0.45)", color: T.text }} />
                  <button onClick={() => saveComment(signal.id)} className="rounded-lg px-3 text-xs font-medium" style={{ backgroundColor: T.green, color: T.greenText }}>Save</button>
                </div>
              )}
              {hasComment && commentingOn !== signal.id && <p className="mt-4 text-sm italic" style={{ color: T.muted }}>&ldquo;{comments[signal.id]}&rdquo;</p>}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// ─── patterns ─────────────────────────────────────────────────────────────────

function PatternsView() {
  const patterns = [
    { theme: "Boundary setting", frequency: 8, trend: "↑", color: T.violet, narrative: 8, analysis: 6 },
    { theme: "Anxiety around work", frequency: 6, trend: "↓", color: T.green, narrative: 4, analysis: 7 },
    {
      theme: "Identity & purpose",
      frequency: 5,
      trend: "→",
      color: T.violetText,
      narrative: 7,
      analysis: 5,
    },
    { theme: "Morning routine", frequency: 4, trend: "↑", color: T.green, narrative: 5, analysis: 6 },
    { theme: "Relationships", frequency: 3, trend: "→", color: T.muted, narrative: 6, analysis: 4 },
  ]

  return (
    <div className="space-y-7">
      <div>
        <h2
          className="text-2xl font-[family-name:var(--font-display)]"
          style={{ color: T.text }}
        >
          Patterns
        </h2>
        <p className="text-sm mt-0.5" style={{ color: T.muted }}>
          Recurring themes from your conversations.
        </p>
      </div>

      <Card className="p-6">
        <Label>Theme frequency · last 30 days</Label>
        <div className="space-y-4 mt-5">
          {patterns.map((p) => (
            <div key={p.theme} className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: T.text }}>
                  {p.theme}
                </span>
              </div>
              <DualAxisMeter narrative={p.narrative} analysis={p.analysis} />
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {patterns.map((p) => (
          <div
            key={p.theme}
            className="rounded-2xl p-4 border"
            style={{ backgroundColor: "transparent", borderColor: "white" }}
          >
            <p
              className="text-2xl font-[family-name:var(--font-display)] font-semibold mb-1"
              style={{ color: p.color }}
            >
              {p.frequency}
            </p>
            <p className="text-xs font-medium" style={{ color: T.text }}>
              {p.theme}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── map of you ───────────────────────────────────────────────────────────────

function MapView() {
  const nodes = [
    { label: "Self-worth", x: 50, y: 25, r: 38, color: T.violet, narrative: 8, analysis: 6 },
    { label: "Career", x: 78, y: 50, r: 30, color: T.green, narrative: 4, analysis: 7 },
    { label: "Relationships", x: 22, y: 55, r: 34, color: T.violetText, narrative: 7, analysis: 5 },
    { label: "Body & Health", x: 60, y: 78, r: 24, color: T.green, narrative: 5, analysis: 6 },
    { label: "Creativity", x: 30, y: 80, r: 20, color: T.muted, narrative: 6, analysis: 4 },
  ]

  return (
    <div className="space-y-7">
      <div>
        <h2
          className="text-2xl font-[family-name:var(--font-display)]"
          style={{ color: T.text }}
        >
          Map of you
        </h2>
        <p className="text-sm mt-0.5" style={{ color: T.muted }}>
          A living map of your inner landscape.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 pb-0">
          <Label>Weighted by conversation depth · 30 days</Label>
        </div>
        <div className="relative" style={{ height: "260px" }}>
          {nodes.map((n) => (
            <div
              key={n.label}
              className="absolute flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-105 cursor-default"
              style={{
                width: `${n.r * 2}px`,
                height: `${n.r * 2}px`,
                left: `calc(${n.x}% - ${n.r}px)`,
                top: `calc(${n.y}% - ${n.r}px)`,
                backgroundColor: `${n.color}18`,
                border: `1.5px solid ${n.color}40`,
              }}
            >
              <span
                className="text-xs font-medium text-center px-2 leading-tight"
                style={{ color: n.color }}
              >
                {n.label}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <Label>Depth by area</Label>
        <div className="space-y-3 mt-4">
          {nodes.map((n) => (
            <div key={n.label} className="space-y-1">
              <div
                className="flex justify-between text-xs"
                style={{ color: T.muted }}
              >
                <span>{n.label}</span>
              </div>
              <DualAxisMeter narrative={n.narrative} analysis={n.analysis} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ─── to-do ────────────────────────────────────────────────────────────────────

const GOALS = [
  {
    id: 1,
    title: "Establish a daily mindfulness practice",
    category: "Wellbeing",
    status: "In Progress",
    progress: 62,
    updated: "2 days ago",
  },
  {
    id: 2,
    title: "Navigate career transition to product leadership",
    category: "Career",
    status: "In Progress",
    progress: 38,
    updated: "5 days ago",
  },
  {
    id: 3,
    title: "Improve communication in close relationships",
    category: "Relationships",
    status: "Paused",
    progress: 20,
    updated: "2 weeks ago",
  },
  {
    id: 4,
    title: "Keep a regular reflection practice",
    category: "Habits",
    status: "Completed",
    progress: 100,
    updated: "1 week ago",
  },
]

function TodoView() {
  const [showForm, setShowForm] = useState(false)
  const [newGoal, setNewGoal] = useState("")
  const [category, setCategory] = useState("Wellbeing")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-2xl font-[family-name:var(--font-display)]"
            style={{ color: T.text }}
          >
            To-do
          </h2>
          <p className="text-sm mt-0.5" style={{ color: T.muted }}>
            Define what growth looks like for you.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="font-semibold text-sm px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
          style={{ backgroundColor: T.green, color: T.greenText }}
        >
          {showForm ? "Cancel" : "+ Add Goal"}
        </button>
      </div>

      {showForm && (
        <Card className="p-5 space-y-4">
          <Label>New goal</Label>
          <textarea
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Describe your goal in your own words..."
            className="w-full rounded-xl p-3 text-sm resize-none outline-none"
            style={{
              backgroundColor: T.input,
              color: T.text,
              border: `1px solid ${T.border}`,
            }}
            rows={3}
          />
          <div className="flex items-center gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm rounded-xl px-3 py-2 outline-none"
              style={{
                backgroundColor: T.input,
                color: T.text,
                border: `1px solid ${T.border}`,
              }}
            >
              {["Wellbeing", "Career", "Relationships", "Habits", "Health"].map(
                (c) => (
                  <option key={c}>{c}</option>
                ),
              )}
            </select>
            <button
              onClick={() => {
                setShowForm(false)
                setNewGoal("")
              }}
              className="ml-auto text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: T.card,
                border: `1px solid ${T.border}`,
                color: T.text,
              }}
            >
              Save Goal
            </button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {GOALS.map((goal) => (
          <Card key={goal.id} className="p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <p
                  className="font-medium leading-snug"
                  style={{ color: T.text }}
                >
                  {goal.title}
                </p>
                <p
                  className="text-xs mt-1 font-mono uppercase tracking-wider"
                  style={{ color: T.muted }}
                >
                  {goal.category} · Updated {goal.updated}
                </p>
              </div>
              <StatusBadge status={goal.status} />
            </div>
            <div className="space-y-1.5">
              <div
                className="text-xs"
                style={{ color: T.muted }}
              >
                <span>Progress</span>
              </div>
              <ProgressBar
                value={goal.progress}
                color={
                  goal.status === "Completed"
                    ? T.green
                    : goal.status === "Paused"
                      ? "rgba(255,255,255,0.2)"
                      : T.violet
                }
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─── about ────────────────────────────────────────────────────────────────────

function AboutView() {
  return (
    <div className="space-y-7">
      <div>
        <h2
          className="text-2xl font-[family-name:var(--font-display)]"
          style={{ color: T.text }}
        >
          About
        </h2>
        <p className="text-sm mt-0.5" style={{ color: T.muted }}>
          The people and thinking behind UDDA.
        </p>
      </div>

      <div
        className="rounded-2xl p-6 flex items-start gap-5"
        style={{
          backgroundColor: "transparent",
          border: "1px solid white",
        }}
      >
        <div>
          <WordmarkLogo width={100} />
          <p
            className="text-sm leading-relaxed mt-3"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            UDDA is a voice-first AI coaching platform built on the belief that
            the most powerful conversations you can have are the ones with
            yourself — with the right questions asked at the right moment.
          </p>
        </div>
      </div>

      <Card className="p-6 space-y-4">
        <Label>Our principles</Label>
        {[
          {
            title: "Voice before text",
            body: "Speaking unlocks things typing never does. We built the whole experience around this.",
          },
          {
            title: "Reflection over advice",
            body: "We don't tell you what to do. We help you hear what you already know.",
          },
          {
            title: "Human-ready",
            body: "AI gets you started. When you need a real person, we help you find the right one.",
          },
          {
            title: "Your data, yours",
            body: "Sessions are private by default. We never sell your voice data or reflections.",
          },
        ].map((p, i) => (
          <div key={i} className="flex gap-4">
            <div
              className="w-1.5 rounded-full flex-shrink-0 mt-1"
              style={{ backgroundColor: T.green, height: "18px" }}
            />
            <div>
              <p className="font-semibold text-sm" style={{ color: T.text }}>
                {p.title}
              </p>
              <p
                className="text-sm leading-relaxed mt-0.5"
                style={{ color: T.muted }}
              >
                {p.body}
              </p>
            </div>
          </div>
        ))}
      </Card>

      <Card className="p-5">
        <Label>Version</Label>
        <p className="font-mono text-sm mt-2" style={{ color: T.text }}>
          UDDA v0.9.2 · Beta
        </p>
        <p className="font-mono text-xs mt-1" style={{ color: T.muted }}>
          Built with care · September 2026
        </p>
      </Card>
    </div>
  )
}

function AccountView() {
  const { themeId, setThemeId, fontId, setFontId } = useAppTheme()
  const [name, setName] = useState("Jordan M.")
  const [email, setEmail] = useState("jordan@example.com")
  const [emailUpdates, setEmailUpdates] = useState(true)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-[family-name:var(--font-display)]" style={{ color: T.text }}>Account</h1>
        <p className="mt-1 text-sm" style={{ color: T.muted }}>The practical details. Nothing here changes the work.</p>
      </div>

      <Card className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <UserRound size={18} style={{ color: T.green }} />
          <h2 className="text-lg font-medium" style={{ color: T.text }}>Profile</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm" style={{ color: T.muted }}>
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[#1FDE9D]" style={{ borderColor: "rgba(255,255,255,0.45)", color: T.text }} />
          </label>
          <label className="block text-sm" style={{ color: T.muted }}>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[#1FDE9D]" style={{ borderColor: "rgba(255,255,255,0.45)", color: T.text }} />
          </label>
        </div>
        <button className="mt-5 rounded-full px-4 py-2 text-sm font-medium" style={{ backgroundColor: T.green, color: T.greenText }}>Save changes</button>
      </Card>

      <Card className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <Type size={18} style={{ color: T.green }} />
          <div>
            <h2 className="text-lg font-medium" style={{ color: T.text }}>Typography</h2>
            <p className="mt-0.5 text-sm" style={{ color: T.muted }}>Choose the voice of the room. Reading space stays deliberately generous.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {FONT_PRESETS.map((preset) => {
            const selected = preset.id === fontId
            return (
              <button
                key={preset.id}
                disabled={!preset.available}
                onClick={() => setFontId(preset.id)}
                aria-pressed={selected}
                className="rounded-xl border p-3 text-left transition-transform enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
                style={{ borderColor: selected ? T.green : "rgba(255,255,255,0.55)" }}
              >
                <span className="block text-2xl leading-none" style={{ color: T.text, fontFamily: preset.stack }}>Aa</span>
                <span className="mt-4 block text-sm" style={{ color: selected ? T.green : T.text, fontFamily: preset.stack }}>{preset.name}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.13em]" style={{ color: T.muted }}>
                  {selected ? "Selected" : preset.note ?? (preset.available ? "Available" : "Needs upload")}
                </span>
              </button>
            )
          })}
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <Palette size={18} style={{ color: T.green }} />
          <div>
            <h2 className="text-lg font-medium" style={{ color: T.text }}>Canvas color</h2>
            <p className="mt-0.5 text-sm" style={{ color: T.muted }}>Choose the room you want to return to.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {THEME_PRESETS.map((preset) => {
            const selected = preset.id === themeId
            return (
              <button key={preset.id} onClick={() => setThemeId(preset.id)} aria-pressed={selected} className="rounded-xl border p-2 text-left transition-transform hover:-translate-y-0.5" style={{ borderColor: selected ? T.green : "rgba(255,255,255,0.55)" }}>
                <div className="flex aspect-square flex-col justify-between rounded-lg p-3" style={{ backgroundColor: preset.color }}>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.68)" }}>Sample</span>
                  <span className="text-2xl font-medium" style={{ color: "white" }}>Aa</span>
                  <span className="text-xs" style={{ color: "white" }}>Your words</span>
                </div>
                <span className="mt-2 flex items-center justify-between px-1 text-xs" style={{ color: selected ? T.green : T.text }}>
                  {preset.name}<span>{selected ? "Selected" : preset.color}</span>
                </span>
              </button>
            )
          })}
        </div>
      </Card>

      <Card className="p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Bell size={18} style={{ color: T.green }} />
          <div className="flex-1">
            <h2 className="text-lg font-medium" style={{ color: T.text }}>Notifications</h2>
            <p className="mt-0.5 text-sm" style={{ color: T.muted }}>An occasional note when a thread is worth revisiting.</p>
          </div>
          <button onClick={() => setEmailUpdates((value) => !value)} aria-pressed={emailUpdates} className="relative h-6 w-11 rounded-full transition-colors" style={{ backgroundColor: emailUpdates ? T.green : "rgba(255,255,255,0.25)" }}>
            <span className="absolute top-1 size-4 rounded-full bg-white transition-transform" style={{ left: emailUpdates ? "24px" : "4px" }} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <LockKeyhole size={18} style={{ color: T.green }} />
          <div className="flex-1">
            <h2 className="text-lg font-medium" style={{ color: T.text }}>Password & security</h2>
            <p className="mt-0.5 text-sm" style={{ color: T.muted }}>Keep the room yours.</p>
          </div>
          <button className="rounded-full border px-3 py-1.5 text-xs" style={{ color: T.text, borderColor: "white" }}>Manage</button>
        </div>
      </Card>
    </div>
  )
}

// ─── stories ─────────────────────────────────────────────────────────────────

type Story = {
  slug: string
  title: string
  dek: string
  date: string
  readingTime: string
  category: string
  body: string[]
}

const STORIES: Story[] = [
  {
    slug: "the-cost-of-being-easygoing",
    title: "The cost of being easygoing",
    dek: "A yes that comes too quickly is sometimes a no you have not let yourself say yet.",
    date: "September 3, 2026",
    readingTime: "4 min read",
    category: "Boundaries",
    body: [
      "There is a version of easygoing that is generous. You make room. You do not turn every dinner plan into a referendum. You do not need the last word.",
      "And then there is the other version: the one that says yes before it has checked the cost. The one that smiles while a small, private resentment begins making itself at home.",
      "The problem is not that you are flexible. The problem is that your answer arrives before you do.",
      "Try this the next time someone asks for something: give yourself one breath before the agreeable answer. Notice whether the no is there. You do not have to obey it. But you might stop pretending it was never in the room.",
    ],
  },
  {
    slug: "certainty-is-not-the-price-of-speaking",
    title: "Certainty is not the price of speaking",
    dek: "You may not need a cleaner argument. You may need to say the unfinished thing out loud.",
    date: "August 29, 2026",
    readingTime: "3 min read",
    category: "Relationships",
    body: [
      "Some conversations get postponed because we tell ourselves we are still thinking. A month later, we are still thinking. The evidence is not accumulating. The courage is not either.",
      "Certainty is useful for choosing a mortgage. It is a strange requirement for telling someone that something hurt.",
      "You can say: I do not have this fully worked out, but I do not want to keep acting as if it is nothing. That is not an argument. It is an honest opening.",
    ],
  },
  {
    slug: "the-work-you-avoid-has-a-voice",
    title: "The work you avoid has a voice",
    dek: "Pay attention to the sentence you use when you walk away from the thing that matters.",
    date: "August 18, 2026",
    readingTime: "5 min read",
    category: "Work",
    body: [
      "Avoidance rarely announces itself as fear. It sounds more practical than that: I need to get organised first. I should read a little more. Today is not the day.",
      "Those sentences are not proof that you are lazy. They are usually proof that something is at stake.",
      "Ask the sentence what it is protecting. Not what you should do next. What it is protecting. The answer may be less flattering and more useful than another productivity system.",
    ],
  },
]

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement("meta")
    if (property) element.setAttribute("property", name)
    else element.name = name
    document.head.appendChild(element)
  }
  element.content = content
}

function useStorySeo({ title, description, path, schema }: { title: string; description: string; path: string; schema: Record<string, unknown> }) {
  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${path}`
    document.title = `${title} | myUDDA`
    setMeta("description", description)
    setMeta("og:title", `${title} | myUDDA`, true)
    setMeta("og:description", description, true)
    setMeta("og:type", path === "/stories" ? "website" : "article", true)
    setMeta("og:url", canonicalUrl, true)
    setMeta("twitter:card", "summary")
    setMeta("twitter:title", `${title} | myUDDA`)
    setMeta("twitter:description", description)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    let structuredData = document.getElementById("myudda-story-schema") as HTMLScriptElement | null
    if (!structuredData) {
      structuredData = document.createElement("script")
      structuredData.id = "myudda-story-schema"
      structuredData.type = "application/ld+json"
      document.head.appendChild(structuredData)
    }
    structuredData.text = JSON.stringify(schema)
  }, [description, path, schema, title])
}

function StoryActions({ story }: { story?: Story }) {
  const [liked, setLiked] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [askOpen, setAskOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState("")
  const path = story ? `/stories/${story.slug}` : "/stories"
  const url = `${window.location.origin}${path}`
  const markdownUrl = story ? `${window.location.origin}/stories/${story.slug}.md` : `${window.location.origin}/stories.md`
  const markdown = story
    ? `# ${story.title}\n\n${story.dek}\n\n${story.body.join("\n\n")}\n\n— myUDDA\n${url}`
    : `# Stories — myUDDA\n\n${STORIES.map((item) => `- [${item.title}](${window.location.origin}/stories/${item.slug})`).join("\n")}`
  const askPrompt = story ? `Read this myUDDA story and help me think about it honestly: ${story.title}\n\n${url}` : `Read these myUDDA stories and help me think about one honestly: ${url}`
  const askLinks = [
    { label: "Ask Claude", href: `https://claude.ai/new?q=${encodeURIComponent(askPrompt)}` },
    { label: "Ask ChatGPT", href: `https://chatgpt.com/?q=${encodeURIComponent(askPrompt)}` },
    { label: "Ask Gemini", href: `https://gemini.google.com/app?q=${encodeURIComponent(askPrompt)}` },
    { label: "Ask Grok", href: `https://grok.com/?q=${encodeURIComponent(askPrompt)}` },
    { label: "Ask Perplexity", href: `https://www.perplexity.ai/search?q=${encodeURIComponent(askPrompt)}` },
  ]

  async function copy(value: string, label: string) {
    await navigator.clipboard.writeText(value)
    setCopied(label)
    setMenuOpen(false)
    window.setTimeout(() => setCopied(""), 1600)
  }

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: story?.title ?? "myUDDA Stories", text: story?.dek ?? "Notes for when the usual answers stop working.", url })
    } else {
      await copy(url, "Link copied")
    }
    setShareOpen(false)
  }

  return (
    <div className="mt-5 flex items-center gap-2">
      <button onClick={() => setLiked((value) => !value)} aria-pressed={liked} className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors" style={{ borderColor: liked ? T.green : "white", color: liked ? T.green : T.text }}>
        <Heart size={14} fill={liked ? "currentColor" : "none"} /> {liked ? "Liked" : "Like"}
      </button>
      <div className="relative">
        <button onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: "white", color: T.text }}>
          <Copy size={14} /> Copy {story ? "story" : "archive"} <ChevronDown size={13} />
        </button>
        {menuOpen && (
          <div className="absolute left-0 z-20 mt-2 w-60 overflow-hidden rounded-xl border p-1" style={{ backgroundColor: T.background, borderColor: "white" }}>
            <button onClick={() => copy(url, "Link copied")} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs hover:bg-white/10" style={{ color: T.text }}><Copy size={13} /> Copy link</button>
            {story && <button onClick={() => copy(markdownUrl, "Markdown link copied")} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs hover:bg-white/10" style={{ color: T.text }}><FileText size={13} /> Copy link to markdown version</button>}
            <button onClick={() => copy(markdown, "Markdown copied")} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs hover:bg-white/10" style={{ color: T.text }}><FileText size={13} /> Copy Markdown</button>
          </div>
        )}
      </div>
      <div className="relative">
        <button onClick={() => setAskOpen((value) => !value)} aria-expanded={askOpen} className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: "white", color: T.text }}>
          Ask AI <ChevronDown size={13} />
        </button>
        {askOpen && <div className="absolute left-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border p-1" style={{ backgroundColor: T.background, borderColor: "white" }}>
          {askLinks.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer" onClick={() => setAskOpen(false)} className="flex items-center justify-between rounded-lg px-3 py-2 text-xs hover:bg-white/10" style={{ color: T.text }}>{item.label}<ArrowUpRight size={13} /></a>)}
        </div>}
      </div>
      <div className="relative">
        <button onClick={() => setShareOpen((value) => !value)} aria-label="Share story" aria-expanded={shareOpen} className="flex size-7 items-center justify-center rounded-full border transition-colors hover:bg-white/10" style={{ borderColor: "white", color: T.text }}>
          <Share2 size={14} />
        </button>
        {shareOpen && <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border p-1" style={{ backgroundColor: T.background, borderColor: "white" }}>
          <button onClick={share} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs hover:bg-white/10" style={{ color: T.text }}><Share2 size={13} /> Share via…</button>
          <a href={`mailto:?subject=${encodeURIComponent(story?.title ?? "myUDDA Stories")}&body=${encodeURIComponent(`${story?.dek ?? "A note from myUDDA"}\n\n${url}`)}`} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs hover:bg-white/10" style={{ color: T.text }}><Mail size={13} /> Email</a>
        </div>}
      </div>
      {copied && <span className="text-xs" style={{ color: T.green }}>{copied}</span>}
    </div>
  )
}

function StoryVoiceWidget({ story }: { story: Story }) {
  const [active, setActive] = useState(false)
  const bars = [0.42, 0.72, 1, 0.6, 0.88, 0.52, 0.78]

  return (
    <button onClick={() => setActive((value) => !value)} aria-pressed={active} className="mt-8 flex w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-colors hover:bg-white/[0.07]" style={{ borderColor: "rgba(255,255,255,0.4)", backgroundColor: active ? T.greenDim : "transparent" }}>
      <span className={`relative flex size-9 flex-shrink-0 items-center justify-center rounded-full ${active ? "pulse-ring" : ""}`} style={{ backgroundColor: active ? T.green : "rgba(255,255,255,0.12)" }}>
        <UddaLogoMark size={19} fill={active ? T.greenText : "white"} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-mono uppercase tracking-[0.15em]" style={{ color: active ? T.green : T.muted }}>{story.readingTime.replace(" read", " left")}</span>
        <span className="mt-0.5 block text-sm" style={{ color: T.text }}>{active ? "Listening. Say the first honest thing." : "Tap to discuss this story."}</span>
      </span>
      <span className="flex h-6 items-center gap-1" aria-hidden="true">
        {bars.map((height, index) => <span key={index} className="w-[3px] rounded-full" style={{ height: `${height * 22}px`, backgroundColor: active ? T.green : "rgba(255,255,255,0.6)", animation: `${["voice-wave-edge", "voice-wave-inner", "voice-wave-center", "voice-wave-inner", "voice-wave-edge", "voice-wave-inner", "voice-wave-edge"][index]} ${active ? 0.7 + index * 0.06 : 1.6 + index * 0.12}s ease-in-out infinite alternate` }} />)}
      </span>
    </button>
  )
}

function storyAsMarkdown(story: Story) {
  return `# ${story.title}\n\n${story.dek}\n\n${story.body.join("\n\n")}\n\n— myUDDA\n`
}

function StoriesHeader() {
  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-7 sm:px-8">
      <Link to="/" aria-label="myUDDA home"><WordmarkLogo width={90} /></Link>
      <a href="/app/talks" className="text-xs" style={{ color: T.muted }}>Open the app →</a>
    </header>
  )
}

function StoriesArchiveRoute() {
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "myUDDA Stories", description: "Notes on the work of becoming more honest with yourself.", url: `${window.location.origin}/stories`, mainEntity: { "@type": "ItemList", itemListElement: STORIES.map((story, index) => ({ "@type": "ListItem", position: index + 1, url: `${window.location.origin}/stories/${story.slug}`, name: story.title })) } }
  useStorySeo({ title: "Stories", description: "Notes on the work of becoming more honest with yourself.", path: "/stories", schema })
  return (
    <PublicShell active="stories">
      <div className="mx-auto min-h-full max-w-5xl px-6 pb-16 pt-16 sm:px-8 sm:pt-20">
        <section className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em]" style={{ color: T.green }}>myUDDA stories</p>
          <h1 className="mt-4 text-4xl leading-[1.03] sm:text-5xl" style={{ color: T.text }}>Notes for when the usual answers stop working</h1>
          <p className="mt-5 text-base leading-relaxed" style={{ color: T.muted }}>No prescriptions. No promises. Just a place to look at the thing with a little more honesty.</p>
          <StoryActions />
        </section>
        <section className="mt-14 grid gap-4 sm:grid-cols-2">
          {STORIES.map((story, index) => (
            <article key={story.slug} className={`rounded-2xl border p-6 ${index === 0 ? "sm:col-span-2" : ""}`} style={{ borderColor: "white" }}>
              <p className="text-xs uppercase tracking-[0.15em]" style={{ color: T.green }}>{story.category}</p>
              <h2 className="mt-5 text-2xl leading-tight" style={{ color: T.text }}><Link to={`/stories/${story.slug}`} className="hover:opacity-75">{story.title}</Link></h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: T.muted }}>{story.dek}</p>
              <p className="mt-6 text-xs" style={{ color: T.muted }}>{story.readingTime}</p>
            </article>
          ))}
        </section>
      </div>
    </PublicShell>
  )
}

function StoryArticleRoute() {
  const { slug } = useParams()
  const story = STORIES.find((item) => item.slug === slug)
  const fallback = STORIES[0]
  const activeStory = story ?? fallback
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: activeStory.title, description: activeStory.dek, datePublished: "2026-09-03", dateModified: "2026-09-03", author: { "@type": "Organization", name: "myUDDA" }, publisher: { "@type": "Organization", name: "myUDDA" }, mainEntityOfPage: `${window.location.origin}/stories/${activeStory.slug}`, articleBody: activeStory.body.join(" ") }
  useStorySeo({ title: activeStory.title, description: activeStory.dek, path: `/stories/${activeStory.slug}`, schema })
  return (
    <PublicShell active="stories">
      <div className="mx-auto min-h-full max-w-2xl px-6 pb-16 pt-16 sm:px-8 sm:pt-20">
        <Link to="/stories" className="text-xs" style={{ color: T.muted }}>← All stories</Link>
        <article className="mt-10">
          <p className="text-xs uppercase tracking-[0.18em]" style={{ color: T.green }}>{activeStory.category}</p>
          <h1 className="mt-4 text-4xl leading-[1.03] sm:text-5xl" style={{ color: T.text }}>{activeStory.title}</h1>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.74)" }}>{activeStory.dek}</p>
          <p className="mt-6 text-xs" style={{ color: T.muted }}>{activeStory.readingTime}</p>
          <StoryActions story={activeStory} />
          <StoryVoiceWidget story={activeStory} />
          <div className="mt-12 space-y-6 text-[17px] leading-[1.75]" style={{ color: "rgba(255,255,255,0.86)" }}>
            {activeStory.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      </div>
    </PublicShell>
  )
}

function StoryMarkdownRoute() {
  const { slug } = useParams()
  const story = STORIES.find((item) => item.slug === slug)

  if (!story) {
    return <pre className="min-h-full whitespace-pre-wrap p-6 font-mono text-sm" style={{ backgroundColor: T.background, color: T.text }}># Story not found</pre>
  }

  return <pre className="min-h-full whitespace-pre-wrap p-6 font-mono text-sm leading-relaxed" style={{ backgroundColor: T.background, color: T.text }}>{storyAsMarkdown(story)}</pre>
}

// ─── app shell ────────────────────────────────────────────────────────────────

const APP_PATHS: Record<NavItem, string> = {
  start: "/app",
  conversations: "/app/talks",
  signals: "/app/signals",
  patterns: "/app/patterns",
  map: "/app/map",
  todo: "/app/todo",
  stories: "/stories",
  about: "/app/about",
}

function PublicHomeRoute() {
  return (
    <PublicShell active="home">
      <LandingView onStart={() => window.location.assign("/app/talks")} />
    </PublicShell>
  )
}

function PublicTopBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  return (
    <header className="flex min-h-[64px] items-center justify-between border-b px-5 sm:hidden" style={{ borderColor: T.border }}>
      <Link to="/" aria-label="myUDDA home"><WordmarkLogo width={76} /></Link>
      <div className="flex items-center gap-3">
        <a href="/app/talks" className="text-sm font-medium" style={{ color: T.text }}>Sign in</a>
        <button onClick={onMenuToggle} className="rounded-lg p-1" style={{ color: T.muted }} aria-label="Open menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
      </div>
    </header>
  )
}

function PublicShell({ active, children }: { active: PublicNavItem; children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    window.setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 0)
  }, [location.hash, location.pathname])

  return (
    <div className="size-full flex overflow-hidden">
      <PublicSidebar active={active} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <PublicTopBar onMenuToggle={() => setSidebarOpen((value) => !value)} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

function SignedInShell({ active, children }: { active: NavItem; children: React.ReactNode }) {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleNavigate(item: NavItem) {
    if (item === "stories") {
      window.location.assign("/stories")
      return
    }
    navigate(APP_PATHS[item])
  }

  return (
    <div className="size-full flex overflow-hidden">
      <Sidebar
        active={active}
        onNavigate={handleNavigate}
        onAccountOpen={() => navigate("/app/account")}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopBar
          onOpenDashboard={() => navigate("/app")}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-8 sm:px-8 sm:py-10 max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  )
}

function TalksRoute() {
  return (
    <SignedInShell active="conversations">
      <TalksView />
    </SignedInShell>
  )
}

function AccountRoute() {
  return (
    <SignedInShell active="start">
      <AccountView />
    </SignedInShell>
  )
}

function AppSectionRoute() {
  const { section } = useParams()
  const [micActive, setMicActive] = useState(false)
  const content: Record<string, { active: NavItem; view: React.ReactNode }> = {
    signals: { active: "signals", view: <SignalsView /> },
    patterns: { active: "patterns", view: <PatternsView /> },
    map: { active: "map", view: <MapView /> },
    todo: { active: "todo", view: <TodoView /> },
    about: { active: "about", view: <AboutView /> },
  }
  const page = section ? content[section] : undefined

  return (
    <SignedInShell active={page?.active ?? "start"}>
      {page?.view ?? <OverviewView onMicClick={() => setMicActive((value) => !value)} micActive={micActive} />}
    </SignedInShell>
  )
}

const publicRouter = createBrowserRouter([
  { path: "/", Component: PublicHomeRoute },
  { path: "/stories", Component: StoriesArchiveRoute },
  { path: "/stories/:slug.md", Component: StoryMarkdownRoute },
  { path: "/stories/:slug", Component: StoryArticleRoute },
])

const appRouter = createBrowserRouter([
  { path: "/app", Component: AppSectionRoute },
  { path: "/app/talks", Component: TalksRoute },
  { path: "/app/account", Component: AccountRoute },
  { path: "/app/:section", Component: AppSectionRoute },
])

export default function App() {
  const [themeId, setThemeId] = useState(() => {
    const storedTheme = window.localStorage.getItem("myudda-theme")
    return THEME_PRESETS.some((preset) => preset.id === storedTheme)
      ? storedTheme
      : "sage"
  })
  const [fontId, setFontId] = useState(() => {
    const storedFont = window.localStorage.getItem("myudda-font")
    return FONT_PRESETS.some((preset) => preset.id === storedFont && preset.available)
      ? storedFont
      : "jost"
  })

  useEffect(() => {
    const selected = THEME_PRESETS.find((preset) => preset.id === themeId) ?? THEME_PRESETS[0]
    document.documentElement.style.setProperty("--app-background", selected.color)
    window.localStorage.setItem("myudda-theme", selected.id)
  }, [themeId])

  useEffect(() => {
    const selected = FONT_PRESETS.find((preset) => preset.id === fontId && preset.available) ?? FONT_PRESETS[0]
    document.documentElement.style.setProperty("--app-font", selected.stack)
    window.localStorage.setItem("myudda-font", selected.id)
  }, [fontId])

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, fontId, setFontId }}>
      <RouterProvider router={window.location.pathname.startsWith("/app") ? appRouter : publicRouter} />
    </ThemeContext.Provider>
  )
}
