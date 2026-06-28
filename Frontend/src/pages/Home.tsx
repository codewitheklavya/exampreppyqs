import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Search, Download, BookOpen, ArrowRight, GraduationCap } from "lucide-react";

function Home() {
  const { user, isGuest } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero-gradient" style={{
        padding: '80px 24px 100px',
        textAlign: 'center',
        color: '#FFFFFF',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 500,
            marginBottom: '24px',
            backdropFilter: 'blur(8px)',
          }}>
            <GraduationCap size={16} />
            Your exam prep companion
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
          }}>
            Previous Year
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #93C5FD, #FFFFFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Question Bank
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            opacity: 0.85,
            maxWidth: '560px',
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}>
            Access all previous year question papers in one place.
            Search, browse, and download organized by course, subject & semester.
          </p>

          <div style={{
            display: 'flex',
            gap: '14px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {user || isGuest ? (
              <Link to="/dashboard" className="btn" style={{
                background: '#FFFFFF',
                color: '#1E40AF',
                fontWeight: 700,
                padding: '14px 32px',
                fontSize: '1rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}>
                Browse PYQs <ArrowRight size={18} />
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn" style={{
                  background: '#FFFFFF',
                  color: '#1E40AF',
                  fontWeight: 700,
                  padding: '14px 32px',
                  fontSize: '1rem',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}>
                  Get Started <ArrowRight size={18} />
                </Link>
                <Link to="/signup" className="btn" style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  padding: '14px 32px',
                  fontSize: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(8px)',
                }}>
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Decorative dots */}
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '60px',
          background: 'var(--bg-body)',
          borderRadius: '50%',
          transition: 'background-color 400ms',
        }} />
      </section>

      {/* Features Section */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '60px 24px 80px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '12px',
            transition: 'color 400ms',
          }}>
            Everything you need to ace your exams
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '500px',
            margin: '0 auto',
            transition: 'color 400ms',
          }}>
            Our platform makes finding and accessing previous year papers effortless.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }} className="stagger-children">
          <FeatureCard
            icon={<Search size={24} />}
            title="Smart Search"
            description="Find papers instantly by subject, course, semester, or year with our powerful search."
          />
          <FeatureCard
            icon={<Download size={24} />}
            title="Quick Download"
            description="Download PDFs with one click. All papers are ready to view and print."
          />
          <FeatureCard
            icon={<BookOpen size={24} />}
            title="Well Organized"
            description="Papers are neatly categorized by course, semester, and paper type for easy access."
          />
        </div>
      </section>

      {/* Stats banner */}
      <section style={{
        background: 'var(--color-primary-soft)',
        padding: '48px 24px',
        textAlign: 'center',
        transition: 'background-color 400ms',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
          flexWrap: 'wrap',
        }}>
          <StatItem value="100+" label="Question Papers" />
          <StatItem value="6" label="Semesters Covered" />
          <StatItem value="Free" label="For Everyone" />
        </div>
      </section>

      {/* Logged in status */}
      {(user || isGuest) && (
        <section style={{
          textAlign: 'center',
          padding: '32px 24px 0',
        }}>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            transition: 'color 400ms',
          }}>
            {user ? `Signed in as ${user.email}` : "Browsing as Guest"}
          </p>
        </section>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass-card" style={{
      padding: '32px 28px',
      textAlign: 'center',
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-primary-soft)',
        color: 'var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 18px',
        transition: 'background-color 400ms, color 400ms',
      }}>
        {icon}
      </div>
      <h3 style={{
        fontSize: '1.15rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '8px',
        transition: 'color 400ms',
      }}>
        {title}
      </h3>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.92rem',
        lineHeight: 1.6,
        transition: 'color 400ms',
      }}>
        {description}
      </p>
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p style={{
        fontSize: '2rem',
        fontWeight: 800,
        color: 'var(--color-primary)',
        transition: 'color 400ms',
      }}>
        {value}
      </p>
      <p style={{
        color: 'var(--text-secondary)',
        fontWeight: 500,
        fontSize: '0.9rem',
        transition: 'color 400ms',
      }}>
        {label}
      </p>
    </div>
  );
}

export default Home;