import { useEffect, useMemo, useRef, useState } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

const DISHES = [
  {
    id: 'paneer-tikka',
    name: 'Smoky Paneer Tikka',
    desc: 'Charred edges, mint chutney, lime, paprika.',
    price: 'Rs 320',
    tag: 'Best seller',
    accent: 'mango',
    category: 'Veg',
    spice: 2,
    minutes: 18,
    details: ['live-fire grill', 'mint + lime', 'house masala'],
  },
  {
    id: 'mushroom-risotto',
    name: 'Truffle Mushroom Risotto',
    desc: 'Creamy, earthy, finished with parmesan snow.',
    price: 'Rs 540',
    tag: 'Chef pick',
    accent: 'violet',
    category: 'Veg',
    spice: 1,
    minutes: 22,
    details: ['truffle butter', 'wild mushrooms', 'parmesan'],
  },
  {
    id: 'chili-prawns',
    name: 'Citrus Chili Prawns',
    desc: 'Zesty glaze, garlic butter, sesame crunch.',
    price: 'Rs 690',
    tag: 'Spicy',
    accent: 'coral',
    category: 'Seafood',
    spice: 4,
    minutes: 16,
    details: ['citrus reduction', 'garlic butter', 'sesame'],
  },
  {
    id: 'lamb-kebabs',
    name: 'Pepper Lamb Kebabs',
    desc: 'Juicy skewers, charred onion, pepper smoke.',
    price: 'Rs 740',
    tag: 'Smoky',
    accent: 'teal',
    category: 'Non-veg',
    spice: 3,
    minutes: 20,
    details: ['black pepper rub', 'charred onion', 'yogurt dip'],
  },
  {
    id: 'mango-fizz',
    name: 'Mango Chili Fizz',
    desc: 'Sparkling mocktail, chili salt rim, bright mango.',
    price: 'Rs 260',
    tag: 'Mocktail',
    accent: 'sun',
    category: 'Drinks',
    spice: 1,
    minutes: 6,
    details: ['fresh mango', 'soda', 'chili salt rim'],
  },
  {
    id: 'choco-lava',
    name: 'Dark Cocoa Lava',
    desc: 'Warm center, berry glaze, vanilla cloud.',
    price: 'Rs 310',
    tag: 'Dessert',
    accent: 'berry',
    category: 'Dessert',
    spice: 0,
    minutes: 14,
    details: ['dark cocoa', 'berry glaze', 'vanilla'],
  },
]

const PERKS = [
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

const REVIEWS = [
  {
    name: 'Aanya',
    quote: 'The flavors are loud in the best way. Paneer tikka is unreal.',
  },
  {
    name: 'Rohit',
    quote: 'Colorful vibe, great music, and the risotto was perfectly creamy.',
  },
  {
    name: 'Meera',
    quote: 'Warm service. Desserts are dangerously good.',
  },
]

const THEME_KEY = 'saffron-theme'
const FAV_KEY = 'saffron-favs'
const MARQUEE = [
  'fresh herbs',
  'smoky grills',
  'citrus heat',
  'neon desserts',
  'craft mocktails',
  'open kitchen',
]

function App() {
  const heroRef = useRef(null)
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const [toast, setToast] = useState(null)
  const [theme, setTheme] = useState(getInitialTheme)
  const [activeCategory, setActiveCategory] = useState('All')
  const [maxSpice, setMaxSpice] = useState(4)
  const [selectedDish, setSelectedDish] = useState(null)
  const [favorites, setFavorites] = useState(getInitialFavorites)
  const [cartCount, setCartCount] = useState(0)
  const [scrollPct, setScrollPct] = useState(0)

  const categories = useMemo(() => {
    const set = new Set(DISHES.map((d) => d.category))
    return ['All', ...Array.from(set)]
  }, [])

  const filtered = useMemo(() => {
    return DISHES.filter((d) => {
      const categoryOk = activeCategory === 'All' || d.category === activeCategory
      const spiceOk = d.spice <= maxSpice
      return categoryOk && spiceOk
    })
  }, [activeCategory, maxSpice])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme

    localStorage.setItem(THEME_KEY, theme)

    if (reduceMotion) return
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 260)
  }, [theme, reduceMotion])

  useEffect(() => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(Array.from(favorites)))
    } catch {
      // ignore
    }
  }, [favorites])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'))
    if (elements.length === 0) return

    if (reduceMotion) {
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
  }, [reduceMotion])        

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        const doc = document.documentElement
        const max = Math.max(1, doc.scrollHeight - doc.clientHeight)
        setScrollPct((doc.scrollTop / max) * 100)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!selectedDish) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedDish(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedDish])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || reduceMotion) return

    let raf = 0
    const onMove = (e) => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        const rect = hero.getBoundingClientRect()
        const x = (e.clientX - rect.left) / Math.max(1, rect.width)
        const y = (e.clientY - rect.top) / Math.max(1, rect.height)
        hero.style.setProperty('--mx', `${Math.max(0, Math.min(1, x))}`)
        hero.style.setProperty('--my', `${Math.max(0, Math.min(1, y))}`)
      })
    }

    hero.addEventListener('pointermove', onMove)
    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      hero.removeEventListener('pointermove', onMove)
    }
  }, [reduceMotion])

  const toggleFavorite = (dishId) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(dishId)) next.delete(dishId)
      else next.add(dishId)
      return next
    })
  }

  const addToOrder = (dish) => {
    setCartCount((c) => c + 1)
    setToast(`Added to order: ${dish.name}`)
    window.setTimeout(() => setToast(null), 2600)
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="topbar">
        <div className="progress" style={{ '--p': `${scrollPct}%` }} />

        <div className="container topbar-inner" data-reveal>
          <a className="brand" href="#home" aria-label="Saffron and Smoke home">
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

          <div className="nav-tools">
            <button
              type="button"
              className="icon-btn"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Theme: ${theme}`}
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>

            <div className="pill-count" title="Favorites">
              <IconHeart />
              <span>{favorites.size}</span>
            </div>

            <div className="pill-count" title="Order items">
              <IconCart />
              <span>{cartCount}</span>
            </div>
          </div>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero" ref={heroRef}>
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
                Live-fire plates - bright cocktails - late-night vibes
              </p>

              <h1 className="hero-title">
                A kitchen with <span className="grad">soul</span> and serious
                color.
              </h1>
              <p className="hero-sub">
                Indian-inspired comfort with modern heat. Smoke, citrus, herbs -
                tuned loud.
              </p>

              <div className="hero-actions">
                <a className="btn primary" href="#reserve">
                  Book a table
                </a>
                <a className="btn ghost" href="#menu">
                  Explore the menu
                </a>
              </div>

              <div className="stats" data-reveal>
                <div className="stat">
                  <p className="stat-k">4.8</p>
                  <p className="stat-l">avg rating</p>
                </div>
                <div className="stat">
                  <p className="stat-k">12:00-00:00</p>
                  <p className="stat-l">open daily</p>
                </div>
                <div className="stat">
                  <p className="stat-k">15 min</p>
                  <p className="stat-l">to your table</p>
                </div>
              </div>

              <div className="marquee" aria-hidden="true">
                <div className="marquee-track">
                  {[0, 1].map((copy) => (
                    <span className="marquee-copy" key={copy}>
                      {MARQUEE.map((t) => (
                        <span key={`${copy}-${t}`} className="marquee-item">
                          {t}
                          <span className="sep" />
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-art" data-reveal>
              <div className="dish" role="img" aria-label="A vibrant plated dish">
                <img
                  src={heroImg}
                  alt=""
                  width="440"
                  height="440"
                  loading="eager"
                />
              </div>
              <div className="float-card c1" aria-hidden="true">
                <p className="float-k">Tonight's special</p>
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
              <h2>Why you'll love it</h2>
              <p>Flavor first. Fast service. Loud vibe.</p>
            </div>
            <div className="grid three">
              {PERKS.map((p) => (
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
            <div className="menu-head" data-reveal>
              <div className="section-head">
                <h2>Tap a dish. Make it yours.</h2>
                <p>Filter by category and spice. Save favorites. Build an order.</p>
              </div>

              <div className="controls">
                <div className="tabs" role="tablist" aria-label="Menu categories">
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`tab ${activeCategory === c ? 'is-active' : ''}`}
                      onClick={() => setActiveCategory(c)}
                      role="tab"
                      aria-selected={activeCategory === c}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <label className="slider" title="Max spice level">
                  <span className="slider-k">
                    Spice max: <b>{maxSpice}</b>
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    step="1"
                    value={maxSpice}
                    onChange={(e) => setMaxSpice(Number(e.target.value))}
                    aria-label="Max spice level"
                  />
                </label>
              </div>
            </div>

            <div className="grid three">
              {filtered.map((d) => (
                <article
                  key={d.id}
                  className={`card dish-card accent-${d.accent}`}
                  data-reveal
                  onClick={() => setSelectedDish(d)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedDish(d)
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open details for ${d.name}`}
                >
                  <div className="dish-top">
                    <span className="tag">{d.tag}</span>
                    <span className="price">{d.price}</span>
                  </div>
                  <h3>{d.name}</h3>
                  <p className="muted">{d.desc}</p>

                  <div className="dish-meta">
                    <span className="meta">
                      <IconClock />
                      {d.minutes} min
                    </span>
                    <span className="meta">
                      <IconFlameSmall />
                      {renderSpice(d.spice)}
                    </span>
                  </div>

                  <div className="dish-actions">
                    <button
                      type="button"
                      className={`icon-btn heart ${favorites.has(d.id) ? 'is-on' : ''}`}
                      aria-label={
                        favorites.has(d.id) ? 'Remove favorite' : 'Add favorite'
                      }
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(d.id)
                      }}
                    >
                      <IconHeart />
                    </button>
                    <button
                      type="button"
                      className="btn mini"
                      onClick={(e) => {
                        e.stopPropagation()
                        addToOrder(d)
                      }}
                    >
                      Add
                    </button>
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
                plate with something bright - citrus, herbs, or a little heat.
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
                <p className="panel-k">Tonight's vibe</p>
                <p className="panel-v">Neon jazz - open kitchen - 8pm rush</p>
              </div>
              <div className="panel-wave" aria-hidden="true" />
              <div className="panel-bottom">
                <div className="chip">
                  <IconLocation />
                  <span>Downtown - near metro</span>
                </div>
                <div className="chip">
                  <IconClock />
                  <span>12:00-00:00</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="reviews">
          <div className="container">
            <div className="section-head" data-reveal>
              <h2>Real reviews. Real cravings.</h2>
              <p>Tap a dish and build your perfect night.</p>
            </div>
            <div className="grid three">
              {REVIEWS.map((r) => (
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
                Pick a time. Bring your crew. We'll handle the rest.
              </p>
              <p className="small muted">
                Tip: Fridays fill up fast - reserve early.
              </p>
            </div>

            <form
              className="card form"
              data-reveal
              onSubmit={(e) => {
                e.preventDefault()
                setToast("Reservation request received - we'll confirm shortly.")
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
                Demo UI only - bookings are not actually stored.
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

      <button
        type="button"
        className={`to-top ${scrollPct > 18 ? 'is-on' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        title="Back to top"
      >
        <IconUp />
      </button>

      {selectedDish ? (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedDish(null)
          }}
        >
          <div
            className="modal card"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedDish.name} details`}
          >
            <div className="modal-head">
              <div>
                <p className="modal-tag">{selectedDish.category}</p>
                <h3 className="modal-title">{selectedDish.name}</h3>
                <p className="muted">{selectedDish.desc}</p>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setSelectedDish(null)}
                aria-label="Close"
              >
                <IconClose />
              </button>
            </div>

            <div className="modal-grid">
              <div className="modal-block">
                <p className="modal-k">Quick facts</p>
                <div className="facts">
                  <span className="meta">
                    <IconClock /> {selectedDish.minutes} min
                  </span>
                  <span className="meta">
                    <IconFlameSmall /> {renderSpice(selectedDish.spice)}
                  </span>
                  <span className="meta">
                    <IconPrice /> {selectedDish.price}
                  </span>
                </div>
              </div>

              <div className="modal-block">
                <p className="modal-k">What's inside</p>
                <ul className="bullets">
                  {selectedDish.details.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className={`btn ghost ${favorites.has(selectedDish.id) ? 'is-on' : ''}`}
                onClick={() => toggleFavorite(selectedDish.id)}
              >
                <IconHeart />
                {favorites.has(selectedDish.id) ? 'Saved' : 'Save'}
              </button>
              <button
                type="button"
                className="btn primary"
                onClick={() => addToOrder(selectedDish)}
              >
                <IconCart />
                Add to order
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}
    </>
  )
}

export default App

function getInitialTheme() {
  try {
    const stored = window.localStorage?.getItem(THEME_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    // ignore
  }
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

function getInitialFavorites() {
  try {
    const raw = window.localStorage?.getItem(FAV_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((v) => typeof v === 'string'))
  } catch {
    return new Set()
  }
}

function renderSpice(level) {
  const max = 4
  const on = Math.max(0, Math.min(max, level))
  return (
    <span className="spice" aria-label={`Spice level ${on} of ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`pep ${i < on ? 'on' : ''}`} aria-hidden="true" />
      ))}
    </span>
  )
}

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

function IconFlameSmall(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
      <path
        d="M12 22c4 0 7-3 7-7 0-3-2-5-3-7 0 3-2 4-3 5 0-5-4-6-4-11-3 3-5 7-5 11 0 4 3 9 8 9Z"
        stroke="currentColor"
        strokeWidth="1.7"
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

function IconMoon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <path
        d="M21 14.7A8.3 8.3 0 0 1 9.3 3a7.2 7.2 0 1 0 11.7 11.7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconSun(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <path
        d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconHeart(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <path
        d="M12 21s-8-4.8-8-11a4.6 4.6 0 0 1 8-2.9A4.6 4.6 0 0 1 20 10c0 6.2-8 11-8 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconCart(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <path
        d="M6 6h15l-2 9H8L6 6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M6 6 5 3H2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconClose(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconUp(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <path
        d="M12 5v14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6 11l6-6 6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconPrice(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
      <path
        d="M7 7h10M7 12h10M7 17h6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}
