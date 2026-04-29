import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  MessageCircle,
  Calendar,
  Shield,
  Heart,
  Smile,
  Sparkles,
  Award,
  Users,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: FamilyDentalCentre,
})

// ─── Scroll reveal hook ────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) =>
      observer.observe(el)
    )
    return () => observer.disconnect()
  }, [])
}

// ─── Navbar scroll effect ──────────────────────────────────────────────────
function useNavbarScroll(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      if (window.scrollY > 60) {
        ref.current.classList.add('navbar-scrolled')
      } else {
        ref.current.classList.remove('navbar-scrolled')
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])
}

// ─── Form encode ───────────────────────────────────────────────────────────
function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

// ─── Services data ─────────────────────────────────────────────────────────
const services = [
  {
    icon: <Smile size={26} />,
    title: 'General Dentistry & Teeth Cleaning',
    desc: 'Comprehensive check-ups, professional cleaning, and preventive care to keep your smile healthy year-round.',
  },
  {
    icon: <Shield size={26} />,
    title: 'Root Canal Treatment',
    desc: 'Gentle and precise endodontic therapy to save infected teeth and relieve pain with lasting comfort.',
  },
  {
    icon: <Sparkles size={26} />,
    title: 'Dental Implants',
    desc: 'Permanent, natural-looking tooth replacements anchored with expert precision by our on-site implantologist.',
  },
  {
    icon: <Heart size={26} />,
    title: 'Tooth Extraction',
    desc: 'Minimally invasive extractions performed with care, ensuring a smooth experience and fast recovery.',
  },
  {
    icon: <Users size={26} />,
    title: 'Dentures',
    desc: 'Custom-fitted full and partial dentures that restore function and confidence to your everyday life.',
  },
  {
    icon: <Star size={26} />,
    title: 'Cosmetic Dentistry',
    desc: 'Veneers, whitening, and smile makeovers tailored to reveal your most radiant, confident smile.',
  },
]

// ─── Why us data ───────────────────────────────────────────────────────────
const whyUs = [
  {
    icon: <Award size={28} />,
    title: 'Specialty Practice Approach',
    desc: 'Each case is assessed with specialist-level thoroughness — no one-size-fits-all dentistry here.',
  },
  {
    icon: <Heart size={28} />,
    title: 'Welcoming & Caring Staff',
    desc: 'Our warmth is mentioned in 66+ patient reviews. From the first call to post-treatment follow-up, you are family.',
  },
  {
    icon: <CheckCircle size={28} />,
    title: 'Clear Explanations Always',
    desc: 'Cited in 27+ reviews — we walk you through every step so you leave informed, never anxious.',
  },
  {
    icon: <Sparkles size={28} />,
    title: 'Expert Implantologist On-Site',
    desc: 'No referrals needed. Our resident implant specialist handles complex cases in-house with world-class precision.',
  },
  {
    icon: <Clock size={28} />,
    title: 'Evening Hours Until 10 PM',
    desc: 'Life is busy. We stay open late daily so your dental health fits your schedule, not the other way around.',
  },
  {
    icon: <Star size={28} />,
    title: '4.9 Star Rating — 663+ Reviews',
    desc: 'Consistently rated the top dental clinic in Sharjah — by the patients who matter most.',
  },
]

// ─── FAQ data ─────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Do I need an appointment, or do you accept walk-ins?',
    a: 'We recommend booking in advance to guarantee your preferred time slot, but walk-ins are welcome based on availability. Call or WhatsApp us to check.',
  },
  {
    q: 'What are your opening hours?',
    a: 'We are open every day until 10 PM, including weekends and public holidays, so you can always find a time that works for you.',
  },
  {
    q: 'Is dental implant surgery painful?',
    a: 'The procedure is performed under local anaesthesia, so you will feel minimal discomfort. Most patients are pleasantly surprised. Our implantologist uses minimally invasive techniques for fast recovery.',
  },
  {
    q: 'How long does a teeth cleaning appointment take?',
    a: 'A standard professional cleaning and check-up takes about 45–60 minutes. We take our time to be thorough — never rushed.',
  },
  {
    q: 'Do you treat children as well as adults?',
    a: 'Absolutely! "Family" is in our name. Our gentle team is experienced with patients of all ages, making every child\'s visit calm and positive.',
  },
  {
    q: 'Which payment methods do you accept?',
    a: 'We accept cash, credit and debit cards, and most insurance networks. Contact us to verify your specific coverage.',
  },
]

// ─── Main component ────────────────────────────────────────────────────────
function FamilyDentalCentre() {
  useReveal()
  const navRef = useRef<HTMLElement>(null)
  useNavbarScroll(navRef)

  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState(false)

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormState({ ...formState, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'appointment', ...formState }),
      })
      setFormSubmitted(true)
    } catch {
      setFormError(true)
    }
  }

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <div style={{ background: 'var(--color-cream)' }}>
      {/* ─── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'transparent',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
          padding: '0 1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          {/* Logo */}
          <a href="#top" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ToothIcon size={20} color="white" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  color: 'white',
                  lineHeight: 1.2,
                  letterSpacing: '0.01em',
                }}
              >
                Family Dental
              </div>
              <div
                style={{
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                Centre · Sharjah
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: 'rgba(255,255,255,0.88)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  padding: '0.5rem 0.85rem',
                  borderRadius: '6px',
                  transition: 'color 0.2s, background 0.2s',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={(e) => {
                  ;(e.target as HTMLElement).style.color = 'white'
                  ;(e.target as HTMLElement).style.background = 'rgba(255,255,255,0.1)'
                }}
                onMouseLeave={(e) => {
                  ;(e.target as HTMLElement).style.color = 'rgba(255,255,255,0.88)'
                  ;(e.target as HTMLElement).style.background = 'transparent'
                }}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary" style={{ marginLeft: '0.5rem', padding: '0.625rem 1.375rem', fontSize: '0.875rem' }}>
              Book Now
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="show-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              background: 'var(--color-teal-dark)',
              padding: '1rem 1.5rem 1.5rem',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary"
              style={{ marginTop: '1rem', display: 'block', textAlign: 'center' }}
            >
              Book Appointment
            </a>
          </div>
        )}
      </nav>

      {/* ─── HERO ───────────────────────────────────────────────────────── */}
      <section
        id="top"
        style={{
          background: 'linear-gradient(145deg, var(--color-teal-dark) 0%, var(--color-teal) 55%, #1a7a98 100%)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background circles */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,122,152,0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-8%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184,146,90,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div className="noise-overlay" />

        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '7rem 1.5rem 4rem',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left: text */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Trust badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '50px',
                padding: '0.45rem 1rem',
                marginBottom: '1.75rem',
              }}
            >
              <span style={{ color: '#f5b800', fontSize: '0.875rem' }}>★★★★★</span>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.8125rem', fontWeight: 600 }}>
                4.9 Rating · 663+ Reviews
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(2.6rem, 5vw, 4rem)',
                color: 'white',
                lineHeight: 1.18,
                marginBottom: '1.25rem',
                letterSpacing: '-0.01em',
              }}
            >
              Your Smile Is Our{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  background: 'linear-gradient(90deg, var(--color-gold-light), #e8c98a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Priority
              </em>
            </h1>

            <p
              style={{
                color: 'rgba(255,255,255,0.78)',
                fontSize: '1.0625rem',
                lineHeight: 1.72,
                marginBottom: '2.25rem',
                maxWidth: '480px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Premium dental care for the whole family in Sharjah. From routine
              cleans to complex implants — delivered with warmth, expertise, and
              evenings that work around your life.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <a href="#contact" className="btn-primary">
                <Calendar size={17} />
                Book Appointment
              </a>
              <a href="tel:+971555777126" className="btn-outline">
                <Phone size={17} />
                Call Now
              </a>
            </div>

            {/* Trust pills */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                { icon: <Shield size={14} />, label: 'Expert Implantologist' },
                { icon: <Clock size={14} />, label: 'Open Until 10 PM' },
                { icon: <Heart size={14} />, label: 'Family Friendly' },
              ].map((pill) => (
                <div
                  key={pill.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  <span style={{ color: 'var(--color-gold-light)' }}>{pill.icon}</span>
                  {pill.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
            <div
              style={{
                position: 'relative',
                width: '380px',
                maxWidth: '100%',
              }}
            >
              {/* Main card */}
              <div
                className="float-anim"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <LargeTooth />
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    color: 'white',
                    fontWeight: 500,
                    marginBottom: '0.5rem',
                  }}
                >
                  Family Dental Centre
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                  Buhairah Corniche St, Sharjah
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  {[
                    { num: '4.9', label: 'Rating' },
                    { num: '663+', label: 'Reviews' },
                    { num: '10PM', label: 'Open Until' },
                  ].map((stat) => (
                    <div key={stat.label} style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: '1.5rem',
                          color: 'var(--color-gold-light)',
                          lineHeight: 1,
                        }}
                      >
                        {stat.num}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '-16px',
                  right: '-16px',
                  background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
                  borderRadius: '14px',
                  padding: '0.75rem 1rem',
                  boxShadow: '0 8px 24px rgba(184,146,90,0.4)',
                }}
              >
                <div style={{ color: 'white', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Google</div>
                <div style={{ color: 'white', fontSize: '1.125rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>★ 4.9</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.4)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <span>Scroll</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* ─── SERVICES ───────────────────────────────────────────────────── */}
      <section id="services" style={{ padding: '6rem 1.5rem', background: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">What We Offer</span>
            <div className="gold-divider" />
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: 'var(--color-teal)',
                marginBottom: '1rem',
              }}
            >
              Our Dental Services
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                maxWidth: '520px',
                margin: '0 auto',
                lineHeight: 1.72,
                fontSize: '1.0625rem',
              }}
            >
              Comprehensive care under one roof — from your first check-up to
              full smile transformations.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`reveal service-card delay-${i + 1}`}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '2rem',
                  border: '1px solid rgba(10,74,94,0.08)',
                  cursor: 'default',
                }}
              >
                <div
                  className="service-icon-wrap"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    color: 'var(--color-teal)',
                  }}
                >
                  {s.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: 'var(--color-teal)',
                    marginBottom: '0.625rem',
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.68, fontSize: '0.9375rem' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ──────────────────────────────────────────────── */}
      <section
        id="why-us"
        className="dot-pattern"
        style={{ padding: '6rem 1.5rem', background: 'var(--color-mint)' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }} className="two-col">
            {/* Left */}
            <div className="reveal-left">
              <span className="section-tag">Our Difference</span>
              <div className="gold-divider-left" />
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 2.85rem)',
                  fontWeight: 600,
                  color: 'var(--color-teal)',
                  lineHeight: 1.25,
                  marginBottom: '1.25rem',
                }}
              >
                Why Families Trust Us
              </h2>
              <p
                style={{
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.75,
                  fontSize: '1.0625rem',
                  marginBottom: '2rem',
                }}
              >
                Family Dental Centre has earned a reputation as Sharjah's most
                trusted dental clinic — not through advertising, but through
                genuine care and exceptional outcomes for every patient.
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '2rem',
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '14px',
                  border: '1px solid rgba(10,74,94,0.1)',
                }}
              >
                {[
                  { num: '4.9★', label: 'Google Rating' },
                  { num: '663+', label: 'Happy Patients' },
                  { num: '10 PM', label: 'Closing Time' },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: 'center', flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.6rem',
                        fontWeight: 700,
                        color: 'var(--color-teal)',
                      }}
                    >
                      {s.num}
                    </div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', marginTop: '0.2rem' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: grid of reasons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {whyUs.map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal delay-${i + 1}`}
                  style={{
                    background: 'white',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    border: '1px solid rgba(10,74,94,0.07)',
                    transition: 'box-shadow 0.3s',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(10,74,94,0.1)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = 'none')}
                >
                  <div style={{ color: 'var(--color-teal)', marginBottom: '0.625rem' }}>{item.icon}</div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--color-teal)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {item.title}
                  </h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MEET OUR DOCTORS ───────────────────────────────────────────── */}
      <section id="doctors" style={{ padding: '6rem 1.5rem', background: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">Our Specialists</span>
            <div className="gold-divider" />
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: 'var(--color-teal)',
              }}
            >
              Meet Our Doctors
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Dr. Ajmal */}
            <div
              className="reveal-left doctor-card"
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(10,74,94,0.09)',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-light))',
                  height: '240px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <DoctorAvatar initials="AM" />
              </div>
              <div style={{ padding: '1.75rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--color-teal)',
                    marginBottom: '0.25rem',
                  }}
                >
                  Dr. Ajmal Muhammad
                </h3>
                <div
                  style={{
                    color: 'var(--color-gold)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  Senior Dental Specialist
                </div>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.9375rem' }}>
                  A senior specialist with expertise spanning the full spectrum of dental
                  care — from precision extractions and denture fitting to complex
                  restorative treatments. Dr. Ajmal's thoroughness and clear communication
                  are cited by patients time and again.
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: '1.25rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {['Implants', 'Extractions', 'Dentures', 'Root Canal'].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: 'var(--color-mint)',
                        color: 'var(--color-teal)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.3rem 0.75rem',
                        borderRadius: '50px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Dr. Ariana */}
            <div
              className="reveal-right doctor-card"
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(10,74,94,0.09)',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, #1a7a98, #2d9bbf)',
                  height: '240px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <DoctorAvatar initials="Dr" accent />
              </div>
              <div style={{ padding: '1.75rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--color-teal)',
                    marginBottom: '0.25rem',
                  }}
                >
                  Dr. Ariana
                </h3>
                <div
                  style={{
                    color: 'var(--color-gold)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  Dental Specialist
                </div>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.9375rem' }}>
                  Celebrated for her light-handed, patient-first approach, Dr. Ariana has
                  made even the most anxious patients feel completely at ease. Her warmth,
                  precision, and gentle technique have earned her an outstanding following
                  among Sharjah's dental community.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                  {['Cosmetic', 'Cleaning', 'Gentle Care', 'Family'].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: 'var(--color-mint)',
                        color: 'var(--color-teal)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.3rem 0.75rem',
                        borderRadius: '50px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────────────────────────────── */}
      <section
        id="testimonials"
        style={{
          padding: '6rem 1.5rem',
          background: 'var(--color-teal)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ ...{}, color: 'var(--color-gold-light)' }} className="section-tag">
              Patient Stories
            </span>
            <div className="gold-divider" />
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: 'white',
              }}
            >
              What Our Patients Say
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                text: '"The service is amazing! Doc Ariana is very light-handed, friendly and meticulously handled my teeth concern. Highly recommended!"',
                name: 'Daziel G.',
                stars: 5,
                label: 'Verified Patient',
              },
              {
                text: '"Started with teeth cleaning, then extraction, then dentures. Dr. Ajmal Muhammad handled everything with exceptional care. I felt in safe hands throughout."',
                name: 'Elvie A.',
                stars: 5,
                label: 'Verified Patient',
              },
              {
                text: '"Truly impressed with the experience. Dr. Ajmal Muhammad handled the treatment with exceptional skill. The entire team made me feel comfortable from start to finish."',
                name: 'Verified Patient',
                stars: 5,
                label: 'Google Review',
              },
            ].map((t, i) => (
              <div
                key={t.name}
                className={`testimonial-card reveal delay-${i + 1}`}
                style={{ padding: '2rem' }}
              >
                <div style={{ color: '#f5b800', fontSize: '1rem', marginBottom: '1rem', letterSpacing: '2px' }}>
                  {'★'.repeat(t.stars)}
                </div>
                <p
                  style={{
                    color: '#374a55',
                    lineHeight: 1.75,
                    fontSize: '0.9375rem',
                    marginBottom: '1.5rem',
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.0625rem',
                  } as React.CSSProperties}
                >
                  {t.text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-light))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-teal)', fontSize: '0.9375rem' }}>{t.name}</div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>{t.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY PLACEHOLDER ────────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-tag">Our Clinic</span>
            <div className="gold-divider" />
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 600,
                color: 'var(--color-teal)',
              }}
            >
              Before & After Gallery
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
            className="gallery-grid"
          >
            {['Smile Makeover', 'Dental Implant', 'Teeth Whitening'].map((label, i) => (
              <div
                key={label}
                className="reveal"
                style={{
                  background: `linear-gradient(145deg, ${['#d4eaf0', '#c5e0d8', '#dae8f0'][i]}, ${['#b8d8e8', '#a8ccbf', '#c0d8e8'][i]})`,
                  height: '240px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Smile size={36} color="var(--color-teal)" style={{ opacity: 0.4 }} />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-teal)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    opacity: 0.6,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    right: '0.75rem',
                    background: 'rgba(255,255,255,0.5)',
                    borderRadius: '6px',
                    padding: '0.25rem 0.625rem',
                    fontSize: '0.7rem',
                    color: 'var(--color-teal)',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                  }}
                >
                  COMING SOON
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        style={{ padding: '5rem 1.5rem', background: 'var(--color-mint)' }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">Common Questions</span>
            <div className="gold-divider" />
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 600,
                color: 'var(--color-teal)',
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  border: '1px solid rgba(10,74,94,0.09)',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.2s',
                  boxShadow: openFaq === i ? '0 4px 20px rgba(10,74,94,0.1)' : 'none',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '1.0625rem',
                      color: 'var(--color-teal)',
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.q}
                  </span>
                  <span style={{ color: 'var(--color-gold)', flexShrink: 0 }}>
                    {openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>
                <div
                  className={`faq-answer ${openFaq === i ? 'open' : ''}`}
                  style={{ padding: openFaq === i ? '0 1.5rem 1.25rem' : '0 1.5rem' }}
                >
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.72, fontSize: '0.9375rem' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOOK APPOINTMENT ───────────────────────────────────────────── */}
      <section id="contact" style={{ padding: '6rem 1.5rem', background: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'start',
            }}
            className="two-col"
          >
            {/* Left: contact info */}
            <div className="reveal-left">
              <span className="section-tag">Get In Touch</span>
              <div className="gold-divider-left" />
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  fontWeight: 600,
                  color: 'var(--color-teal)',
                  marginBottom: '1.25rem',
                  lineHeight: 1.25,
                }}
              >
                Book Your Appointment
              </h2>
              <p
                style={{
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.75,
                  marginBottom: '2rem',
                  fontSize: '1.0625rem',
                }}
              >
                Ready for your best smile? Fill in the form and we'll confirm
                your appointment. Or reach us directly — we're always happy to chat.
              </p>

              {/* Contact details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {[
                  {
                    icon: <Phone size={20} />,
                    label: 'Phone',
                    value: '+971 55 577 7126',
                    href: 'tel:+971555777126',
                  },
                  {
                    icon: <MapPin size={20} />,
                    label: 'Address',
                    value: 'Flat #106, opposite Marbella Resort, Next to Crystal Plaza, Buhairah Corniche St, Sharjah, UAE',
                    href: 'https://maps.google.com/?q=Family+Dental+Centre+Sharjah',
                  },
                  {
                    icon: <Clock size={20} />,
                    label: 'Hours',
                    value: 'Open daily until 10:00 PM',
                    href: undefined,
                  },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'var(--color-mint)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-teal)',
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          style={{
                            color: 'var(--color-teal)',
                            fontWeight: 600,
                            textDecoration: 'none',
                            fontSize: '0.9375rem',
                            lineHeight: 1.5,
                          }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span style={{ color: 'var(--color-teal)', fontWeight: 600, fontSize: '0.9375rem' }}>
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp button */}
              <a
                href="https://wa.me/971555777126"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  background: '#25d366',
                  color: 'white',
                  fontWeight: 700,
                  padding: '0.875rem 1.75rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(37,211,102,0.4)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Right: appointment form */}
            <div className="reveal-right">
              <div
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  border: '1px solid rgba(10,74,94,0.09)',
                  boxShadow: '0 8px 32px rgba(10,74,94,0.07)',
                }}
              >
                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'var(--color-mint)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.25rem',
                        color: 'var(--color-teal)',
                      }}
                    >
                      <CheckCircle size={30} />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        color: 'var(--color-teal)',
                        marginBottom: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      Request Received!
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                      Thank you! We'll confirm your appointment shortly. For urgent
                      queries, please call or WhatsApp us directly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} **name="appointment"data-netlify="true">
                    {/* Honeypot */}
                    <input type="text" name="bot-field" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.4rem',
                        fontWeight: 600,
                        color: 'var(--color-teal)',
                        marginBottom: '1.5rem',
                      }}
                    >
                      Request an Appointment
                    </h3>

                    {formError && (
                      <div
                        style={{
                          background: '#fef2f2',
                          border: '1px solid #fca5a5',
                          borderRadius: '8px',
                          padding: '0.75rem 1rem',
                          marginBottom: '1rem',
                          color: '#b91c1c',
                          fontSize: '0.875rem',
                        }}
                      >
                        Something went wrong. Please call us directly at +971 55 577 7126.
                      </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-teal)', marginBottom: '0.4rem' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-input"
                          placeholder="Your full name"
                          value={formState.name}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-teal)', marginBottom: '0.4rem' }}>
                            Phone *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            className="form-input"
                            placeholder="+971 50 000 0000"
                            value={formState.phone}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-teal)', marginBottom: '0.4rem' }}>
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="email@example.com"
                            value={formState.email}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-teal)', marginBottom: '0.4rem' }}>
                          Service Needed
                        </label>
                        <select
                          name="service"
                          className="form-input"
                          value={formState.service}
                          onChange={handleFormChange}
                          style={{ appearance: 'none', cursor: 'pointer' }}
                        >
                          <option value="">Select a service...</option>
                          <option>General Check-up & Cleaning</option>
                          <option>Root Canal Treatment</option>
                          <option>Dental Implants</option>
                          <option>Tooth Extraction</option>
                          <option>Dentures</option>
                          <option>Cosmetic Dentistry</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-teal)', marginBottom: '0.4rem' }}>
                          Message
                        </label>
                        <textarea
                          name="message"
                          className="form-input"
                          placeholder="Any details or questions..."
                          value={formState.message}
                          onChange={handleFormChange}
                          rows={3}
                          style={{ resize: 'vertical' }}
                        />
                      </div>
                      <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                        <Calendar size={18} />
                        Book Appointment
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOCATION MAP ───────────────────────────────────────────────── */}
      <section style={{ padding: '0 1.5rem 5rem', background: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            className="reveal map-placeholder"
            style={{ height: '380px', position: 'relative' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.6!2d55.389!3d25.347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zFamily+Dental+Centre!5e0!3m2!1sen!2sae!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '16px', filter: 'saturate(0.85)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Family Dental Centre location"
            />
            <a
              href="https://maps.google.com/?q=Family+Dental+Centre,Buhairah+Corniche+St,Sharjah,UAE"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                background: 'var(--color-teal)',
                color: 'white',
                padding: '0.625rem 1.125rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '0.8125rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 16px rgba(10,74,94,0.3)',
              }}
            >
              <MapPin size={14} />
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: 'var(--color-teal-dark)',
          color: 'rgba(255,255,255,0.75)',
          padding: '4rem 1.5rem 2rem',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2.5rem',
              marginBottom: '3rem',
            }}
          >
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ToothIcon size={18} color="white" />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    color: 'white',
                    fontWeight: 600,
                  }}
                >
                  Family Dental Centre
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '240px' }}>
                Premium dental care for the whole family in Sharjah, UAE.
                Your smile is our priority.
              </p>
              <div style={{ display: 'flex', gap: '0.625rem', marginTop: '1.25rem' }}>
                {['f', 'in', 'ig'].map((icon) => (
                  <div
                    key={icon}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.14)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)')}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'white',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  fontSize: '1rem',
                }}
              >
                Quick Links
              </h4>
              {['Services', 'Why Choose Us', 'Meet Our Doctors', 'Testimonials', 'FAQ', 'Book Appointment'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/ /g, '-').replace('why-choose-us', 'why-us').replace('meet-our-doctors', 'doctors').replace('book-appointment', 'contact')}`}
                  style={{
                    display: 'block',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    padding: '0.3rem 0',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.95)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)')}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Services */}
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'white',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  fontSize: '1rem',
                }}
              >
                Our Services
              </h4>
              {['General Dentistry', 'Root Canal Treatment', 'Dental Implants', 'Tooth Extraction', 'Dentures', 'Cosmetic Dentistry'].map((s) => (
                <div key={s} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', padding: '0.3rem 0' }}>
                  {s}
                </div>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'white',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  fontSize: '1rem',
                }}
              >
                Contact Us
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href="tel:+971555777126"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                  }}
                >
                  <Phone size={15} style={{ marginTop: '2px', flexShrink: 0, color: 'var(--color-gold-light)' }} />
                  +971 55 577 7126
                </a>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.875rem',
                  }}
                >
                  <MapPin size={15} style={{ marginTop: '2px', flexShrink: 0, color: 'var(--color-gold-light)' }} />
                  Flat #106, Buhairah Corniche St, Sharjah, UAE
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                  <Clock size={15} style={{ marginTop: '2px', flexShrink: 0, color: 'var(--color-gold-light)' }} />
                  Open Daily Until 10:00 PM
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
              © {new Date().getFullYear()} Family Dental Centre, Sharjah, UAE. All rights reserved.
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.8125rem' }}>
              <span className="stars" style={{ fontSize: '0.75rem' }}>★★★★★</span>
              4.9 on Google · 663+ Reviews
            </div>
          </div>
        </div>
      </footer>

      {/* ─── FLOATING WHATSAPP ──────────────────────────────────────────── */}
      <a
        href="https://wa.me/971555777126?text=Hello!%20I%27d%20like%20to%20book%20an%20appointment%20at%20Family%20Dental%20Centre."
        target="_blank"
        rel="noopener noreferrer"
        className="pulse-ring"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 200,
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: '#25d366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 24px rgba(37,211,102,0.45)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(37,211,102,0.55)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(37,211,102,0.45)'
        }}
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </a>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none; }
          .two-col { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .gallery-grid { grid-template-columns: 1fr !important; }
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </div>
  )
}

// ─── SVG Icons ────────────────────────────────────────────────────────────

function ToothIcon({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C9.5 2 7.5 3.5 6.5 5.5C5.5 4.5 4 4 3 5C1.5 6.5 2.5 9 3.5 10.5C3.5 10.5 3 15 4.5 18.5C5.5 21 7 22 8 22C9 22 9.5 20.5 10 19C10.5 20.5 11 22 12 22C13 22 13.5 20.5 14 19C14.5 20.5 15 22 16 22C17 22 18.5 21 19.5 18.5C21 15 20.5 10.5 20.5 10.5C21.5 9 22.5 6.5 21 5C20 4 18.5 4.5 17.5 5.5C16.5 3.5 14.5 2 12 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function LargeTooth() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      <path
        d="M40 14C33.5 14 28.5 18 26 23C23.5 20.5 20 19 17.5 21.5C14.5 24.5 16.5 30 18.5 33C18.5 33 17 45 20.5 53C23 60 27 63 30 63C33 63 34 59 35.5 55.5C37 59 38 63 40 63C42 63 43 59 44.5 55.5C46 59 47 63 50 63C53 63 57 60 59.5 53C63 45 61.5 33 61.5 33C63.5 30 65.5 24.5 62.5 21.5C60 19 56.5 20.5 54 23C51.5 18 46.5 14 40 14Z"
        stroke="rgba(255,255,255,0.8)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(255,255,255,0.07)"
      />
    </svg>
  )
}

function DoctorAvatar({ initials, accent = false }: { initials: string; accent?: boolean }) {
  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: accent
          ? 'rgba(255,255,255,0.15)'
          : 'rgba(255,255,255,0.12)',
        border: '3px solid rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        {initials}
      </span>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.123 1.528 5.855L.057 23.886a.5.5 0 00.613.612l6.098-1.457A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.948 0-3.77-.518-5.341-1.423l-.383-.226-3.964.946.976-3.875-.248-.4A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  )
}
