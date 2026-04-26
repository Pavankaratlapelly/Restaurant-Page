import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const dishes = [
    {
      name: 'Smoky Paneer Tikka',
      desc: 'Charred edges, mint chutney, lime + paprika.',
      price: '₹320',
      tag: 'Best seller',
      accent: 'mango',
    },
    {
      name: 'Truffle Mushroom Risotto',
      desc: 'Creamy, earthy, finished with parmesan snow.',
      price: '₹540',
      tag: 'Chef pick',
      accent: 'violet',
    },
    {
      name: 'Citrus Chili Prawns',
      desc: 'Zesty glaze, garlic butter, sesame crunch.',
      price: '₹690',
      tag: 'Spicy',
      accent: 'coral',
    },
  ]

  const perks = [
    {
      title: 'Fresh, local',
      desc: 'Seasonal ingredients sourced daily.',
      icon: IconLeaf,
    },
    {
      title: 'Open kitchen',
      desc: 'See the fire. Smell the spice.',
      icon: IconFlame,
    },
    {
      title: 'Fast reservations',
      desc: 'Book in seconds, confirm instantly.',
      icon: IconSpark,
    },
  ]

  const reviews = [
    {
      name: 'Aanya',
      quote:
        'The flavors are loud in the best way. The paneer tikka is unreal.',
    },
    {
      name: 'Rohit',
      quote: 'Colorful vibe, great music, and the risotto was perfectly creamy.',
    },
    {
      name: 'Meera',
      quote: 'Service was warm. Desserts are dangerously good.',
    },
  ]

  const [toast, setToast] = useState(null)

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'))

    if (elements.length === 0) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      for (const el of elements) el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { root: null, threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    )

    for (const el of elements) observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="topbar">
        <div className="container topbar-inner" data-reveal>
          <a className="brand" href="#home" aria-label="Saffron & Smoke home">
            <span className="brand-mark" aria-hidden="true">
              <IconFork />
            </span>
            <span className="brand-name">Saffron &amp; Smoke</span>
          </a>

          <nav className="nav" aria-label="Primary">
            <a href="#menu">Menu</a>
            <a href="#story">Story</a>
            <a href="#reviews">Reviews</a>
            <a href="#reserve" className="nav-cta">
              Reserve
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero">
          <div className="hero-bg" aria-hidden="true">
            <span className="blob b1" />
            <span className="blob b2" />
            <span className="blob b3" />
            <span className="grain" />
          </div>

          <div className="container hero-inner">
            <div className="hero-copy" data-reveal>
              <p className="pill">
                <span className="dot" aria-hidden="true" />
                Fire-kissed plates • Bright cocktails • Late-night vibes
              </p>
              <h1 className="hero-title">
                A <span className="grad">colorful</span> restaurant for big
                cravings.
              </h1>
              <p className="hero-sub">
                Bold Indian-inspired comfort with a modern twist — smoky grills,
                fresh herbs, and citrus heat.
              </p>

              <div className="hero-actions">
                <a className="btn primary" href="#reserve">
                  Book a table
                </a>
                <a className="btn ghost" href="#menu">
                  See the menu
                </a>
              </div>

              <div className="stats" data-reveal>
                <div className="stat">
                  <p className="stat-k">4.8</p>
                  <p className="stat-l">avg rating</p>
                </div>
                <div className="stat">
                  <p className="stat-k">12–12</p>
                  <p className="stat-l">open daily</p>
                </div>
                <div className="stat">
                  <p className="stat-k">15 min</p>
                  <p className="stat-l">to your table</p>
                </div>
              </div>
            </div>

            <div className="hero-art" data-reveal>
              <div className="dish">
                <img
                  src={heroImg}
                  alt="A vibrant plated dish"
                  width="440"
                  height="440"
                  loading="eager"
                />
              </div>
              <div className="float-card c1" aria-hidden="true">
                <p className="float-k">Today’s special</p>
                <p className="float-v">Saffron Butter Chicken</p>
              </div>
              <div className="float-card c2" aria-hidden="true">
                <p className="float-k">Mocktail</p>
                <p className="float-v">Mango Chili Fizz</p>
              </div>
            </div>
          </div>
        </section>

        <section className="perks">
          <div className="container">
            <div className="section-head" data-reveal>
              <h2>Why you’ll love it</h2>
              <p>Everything is built for flavor, speed, and vibes.</p>
            </div>
            <div className="grid three">
              {perks.map((p) => (
                <article className="card perk" key={p.title} data-reveal>
                  <div className="perk-ic" aria-hidden="true">
                    <p.icon />
                  </div>
                  <h3>{p.title}</h3>
                  <p className="muted">{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="menu" className="menu">
          <div className="container">
            <div className="section-head" data-reveal>
              <h2>Featured plates</h2>
              <p>Signature dishes that hit sweet, smoky, and spicy.</p>
            </div>
            <div className="grid three">
              {dishes.map((d) => (
                <article
                  className={`card dish-card accent-${d.accent}`}
                  key={d.name}
                  data-reveal
                >
                  <div className="dish-top">
                    <span className="tag">{d.tag}</span>
                    <span className="price">{d.price}</span>
                  </div>
                  <h3>{d.name}</h3>
                  <p className="muted">{d.desc}</p>
                  <div className="dish-actions">
                    <a className="link" href="#reserve">
                      Reserve to try
                    </a>
                    <span className="spark" aria-hidden="true">
                      <IconSpark />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="story" className="story">
          <div className="container story-inner">
            <div className="story-copy" data-reveal>
              <h2>Made on flames. Finished with color.</h2>
              <p className="muted">
                We grill over live fire, crush spices to order, and balance every
                plate with something bright — citrus, herbs, or a little heat.
              </p>
              <div className="story-list">
                <div className="story-item" data-reveal>
                  <span className="badge" aria-hidden="true">
                    <IconStar />
                  </span>
                  <div>
                    <p className="story-k">House spice blends</p>
                    <p className="muted">Roasted daily for deeper aroma.</p>
                  </div>
                </div>
                <div className="story-item" data-reveal>
                  <span className="badge" aria-hidden="true">
                    <IconBolt />
                  </span>
                  <div>
                    <p className="story-k">Fast service</p>
                    <p className="muted">Perfect for lunch or late dinners.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="story-panel" data-reveal>
              <div className="panel-top">
                <p className="panel-k">Tonight’s vibe</p>
                <p className="panel-v">Neon jazz • Open kitchen • 8pm rush</p>
              </div>
              <div className="panel-wave" aria-hidden="true" />
              <div className="panel-bottom">
                <div className="chip">
                  <IconLocation />
                  <span>Downtown • Near Metro</span>
                </div>
                <div className="chip">
                  <IconClock />
                  <span>12:00–00:00</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="reviews">
          <div className="container">
            <div className="section-head" data-reveal>
              <h2>People are obsessed</h2>
              <p>Real love, real feedback — and lots of repeat visits.</p>
            </div>
            <div className="grid three">
              {reviews.map((r) => (
                <figure className="card review" key={r.name} data-reveal>
                  <blockquote>“{r.quote}”</blockquote>
                  <figcaption>
                    <span className="avatar" aria-hidden="true">
                      {r.name.slice(0, 1)}
                    </span>
                    <span className="who">{r.name}</span>
                    <span className="stars" aria-hidden="true">
                      <IconStars />
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="reserve" className="reserve">
          <div className="container reserve-inner">
            <div className="reserve-copy" data-reveal>
              <h2>Reserve a table</h2>
              <p className="muted">
                Pick a time. Bring your crew. We’ll handle the rest.
              </p>
              <p className="small muted">
                Tip: Fridays fill up fast — reserve early.
              </p>
            </div>

            <form
              className="card form"
              data-reveal
              onSubmit={(e) => {
                e.preventDefault()
                setToast('Reservation request received — we’ll confirm shortly.')
                window.setTimeout(() => setToast(null), 3500)
              }}
            >
              <div className="form-grid">
                <label>
                  <span>Name</span>
                  <input name="name" required placeholder="Your name" />
                </label>
                <label>
                  <span>Phone</span>
                  <input name="phone" required placeholder="+91 98xxxxxx" />
                </label>
                <label>
                  <span>Date</span>
                  <input name="date" type="date" required />
                </label>
                <label>
                  <span>Time</span>
                  <input name="time" type="time" required />
                </label>
                <label>
                  <span>Guests</span>
                  <select name="guests" defaultValue="2">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </label>
              </div>

              <button className="btn primary wide" type="submit">
                Confirm request
              </button>
              <p className="small muted">
                This is a demo UI — no booking is actually stored.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner" data-reveal>
          <div>
            <p className="footer-brand">Saffron &amp; Smoke</p>
            <p className="muted small">Colorful plates. Warm nights.</p>
          </div>
          <div className="footer-links">
            <a href="#menu">Menu</a>
            <a href="#reserve">Reserve</a>
            <a href="#home">Back to top</a>
          </div>
        </div>
      </footer>

      {toast ? (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}
    </>
  )
}

export default App

function IconFork(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...props}>
      <path
        d="M7 2v8a3 3 0 1 1-2 0V2h2Zm12 0v8a3 3 0 1 1-2 0V2h2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 2v20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconSpark(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...props}>
      <path
        d="M12 2l1.3 6.2L20 12l-6.7 3.8L12 22l-1.3-6.2L4 12l6.7-3.8L12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconLeaf(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...props}>
      <path
        d="M20 4c-8 0-14 6-14 14 8 0 14-6 14-14Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M6 18c2-4 6-8 14-14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconFlame(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...props}>
      <path
        d="M12 22c4 0 7-3 7-7 0-3-2-5-3-7 0 3-2 4-3 5 0-5-4-6-4-11-3 3-5 7-5 11 0 4 3 9 8 9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconStar(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <path
        d="M12 2l2.7 6.7L22 9l-5 4.3 1.6 7.2L12 17l-6.6 3.5L7 13.3 2 9l7.3-.3L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconBolt(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <path
        d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconLocation(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
      <path
        d="M12 22s7-6.1 7-13a7 7 0 1 0-14 0c0 6.9 7 13 7 13Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 12.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  )
}

function IconClock(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
      <path
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconStars(props) {
  return (
    <svg viewBox="0 0 120 24" width="90" height="18" fill="none" {...props}>
      {[8, 32, 56, 80, 104].map((x) => (
        <path
          key={x}
          d={`M${x} 2l2.4 6 6.6.2-5.1 4 1.8 6.4L${x} 15.4l-5.7 3.2 1.8-6.4-5.1-4 6.6-.2L${x} 2Z`}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}
