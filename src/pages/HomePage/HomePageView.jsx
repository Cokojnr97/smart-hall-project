import { Link } from 'react-router-dom'

const homeLinks = [
  {
    icon: '⌕',
    title: 'Explore learning resources',
    description: 'Browse books, texts, audio, and videos for English levels A1 to C1.',
    href: '/browse',
    action: 'Explore resources',
  },
  {
    icon: '＋',
    title: 'Share a resource',
    description: 'Add a useful learning resource and keep it in your personal library.',
    href: '/create-resource',
    action: 'Create a resource',
  },
  {
    icon: '☆',
    title: 'Continue your learning',
    description: 'Visit your saved resources and find the materials you want to revisit.',
    href: '/bookmarks',
    action: 'View bookmarks',
  },
]

export default function HomePageView({ welcomeMessage }) {
  return (
    <div className="space-y-8">
      <section
        className="relative isolate min-h-[22rem] overflow-hidden rounded-3xl border border-[var(--color-line)] bg-gradient-to-br from-fuchsia-900 via-purple-950 to-slate-950 px-6 py-10 text-white shadow-2xl sm:min-h-[27rem] sm:px-12 sm:py-14"
        aria-labelledby="home-welcome-title"
      >
        <div className="absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full bg-pink-400/25 blur-3xl" />
        <div className="absolute -bottom-36 left-1/3 -z-10 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="flex min-h-[18rem] max-w-3xl flex-col justify-center sm:min-h-[20rem]">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-200">
            Smart Class Hall
          </p>
          <h1
            className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-6xl"
            id="home-welcome-title"
          >
            {welcomeMessage}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Welcome to your English learning space. Find something interesting to read,
            watch, or listen to today.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="button rounded-full bg-white px-6 text-slate-950 no-underline hover:bg-pink-100"
              to="/browse"
            >
              Explore resources
            </Link>
            <Link
              className="button rounded-full border border-white/40 bg-white/10 px-6 text-white no-underline hover:bg-white/20"
              to="/create-resource"
            >
              Share a resource
            </Link>
          </div>
        </div>
        <p className="absolute bottom-5 right-6 text-6xl font-black text-white/10 sm:bottom-8 sm:right-10 sm:text-8xl" aria-hidden="true">
          EN
        </p>
      </section>

      <section aria-labelledby="home-discover-title">
        <div className="section-heading !px-0">
          <div>
            <p className="eyebrow">Make today count</p>
            <h2 id="home-discover-title">Your learning starts here</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {homeLinks.map(({ icon, title, description, href, action }) => (
            <article className="panel panel-interactive p-5" key={title}>
              <span
                className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--color-panel-soft)] text-xl text-[var(--color-pink)]"
                aria-hidden="true"
              >
                {icon}
              </span>
              <h3 className="mt-4 text-base font-bold">{title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-[var(--color-muted)]">
                {description}
              </p>
              <Link
                className="mt-4 inline-flex text-sm font-semibold text-[var(--color-pink)] no-underline hover:underline"
                to={href}
              >
                {action} <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
