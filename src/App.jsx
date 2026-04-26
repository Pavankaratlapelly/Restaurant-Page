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
    { title: 'Fresh, local', desc: 'Seasonal ingredients sourced daily.', icon: IconLeaf },
    { title: 'Open kitchen', desc: 'See the fire. Smell the spice.', icon: IconFlame },
    { title: 'Fast reservations', desc: 'Book in seconds, confirm instantly.', icon: IconSpark },
  ]

  const reviews = [
    { name: 'Aanya', quote: 'The flavors are loud in the best way. The paneer tikka is unreal.' },
    { name: 'Rohit', quote: 'Colorful vibe, great music, and the risotto was perfectly creamy.' },
    { name: 'Meera', quote: 'Service was warm. Desserts are dangerously good.' },
  ]

  const [toast, setToast] = useState(null)

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'))
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="app-wrapper">
      <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="#home">
            <span className="brand-mark"><IconFork /></span>
            <span className="brand-name">Saffron &amp; Smoke</span>
          </a>
          <nav className="nav">
            <a href="#menu">Menu</a>
            <a href="#story">Story</a>
            <a href="#reviews">Reviews</a>
            <a href="#reserve" className="nav-cta">Reserve</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero">
          <div className="hero-bg">
            <span className="blob b1" />
            <span className="blob b2" />
            <span className="grain" />
          </div>

          <div className="container hero-inner">
            <div className="hero-copy" data-reveal>
              <p className="pill">
                <span className="dot" />
                Fire-kissed plates • Late-night vibes
              </p>
              <h1 className="hero-title">
                A <span className="grad">colorful</span> kitchen for big cravings.
              </h1>
              <p className="hero-sub">
                Bold Indian-inspired comfort with a modern twist — smoky grills and citrus heat.
              </p>

              <div className="hero-actions">
                <a className="btn primary" href="#reserve">Book a table</a>
                <a className="btn ghost" href="#menu">See the menu</a>
              </div>

              <div className="stats">
                <div className="stat"><h3>4.8</h3><p>avg rating</p></div>
                <div className="stat"><h3>12–12</h3><p>open daily</p></div>
              </div>
            </div>

            <div className="hero-art" data-reveal>
              <div className="dish-main">
                <img src={heroImg} alt="Plated dish" />
              </div>
              <div className="float-card c1">
                <p className="float-k">Special</p>
                <p className="float-v">Saffron Butter Chicken</p>
              </div>
            </div>
          </div>
        </section>

        <section id="menu" className="menu">
          <div className="container">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Our Menu</span>
              <h2>Featured Plates</h2>
            </div>
            <div className="grid three">
              {dishes.map((d, i) => (
                <article 
                  className={`card dish-card accent-${d.accent}`} 
                  key={d.name} 
                  data-reveal 
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  <div className="dish-top">
                    <span className="tag">{d.tag}</span>
                    <span className="price">{d.price}</span>
                  </div>
                  <h3>{d.name}</h3>
                  <p className="muted">{d.desc}</p>
                  <a className="link-arrow" href="#reserve">Reserve to try →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reserve" className="reserve">
          <div className="container reserve-inner">
            <div className="reserve-copy" data-reveal>
              <h2>Join the table</h2>
              <p className="muted">Fridays fill up fast — secure your spot now.</p>
            </div>

            <form className="card glass-form" data-reveal
              onSubmit={(e) => {
                e.preventDefault()
                setToast('Reservation sent! See you soon.')
                setTimeout(() => setToast(null), 4000)
              }}
            >
              <div className="form-grid">
                <input placeholder="Name" required />
                <input placeholder="Phone" required />
                <input type="date" required />
                <select defaultValue="2">
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guests</option>)}
                </select>
              </div>
              <button className="btn primary wide" type="submit">Confirm Request</button>
            </form>
          </div>
        </section>
      </main>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

export default App

// Icons remain same as your original provided SVG components
function IconFork(props) { return ( <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...props}> <path d="M7 2v8a3 3 0 1 1-2 0V2h2Zm12 0v8a3 3 0 1 1-2 0V2h2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> <path d="M12 2v20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> </svg> ) }
function IconSpark(props) { return ( <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...props}> <path d="M12 2l1.3 6.2L20 12l-6.7 3.8L12 22l-1.3-6.2L4 12l6.7-3.8L12 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /> </svg> ) }
function IconLeaf(props) { return ( <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...props}> <path d="M20 4c-8 0-14 6-14 14 8 0 14-6 14-14Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /> <path d="M6 18c2-4 6-8 14-14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> </svg> ) }
function IconFlame(props) { return ( <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...props}> <path d="M12 22c4 0 7-3 7-7 0-3-2-5-3-7 0 3-2 4-3 5 0-5-4-6-4-11-3 3-5 7-5 11 0 4 3 9 8 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /> </svg> ) }