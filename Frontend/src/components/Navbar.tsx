import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Menu, X, LogOut, Shield } from "lucide-react";

function Navbar() {
  const { user, logout, isGuest } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = user?.email === "codewitheklavya@gmail.com";

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
    navigate("/login");
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-navbar)',
      transition: 'background-color 400ms, border-color 400ms',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 24px',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }} onClick={closeMobile}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'var(--color-primary)',
            letterSpacing: '-0.02em',
            transition: 'color 400ms',
          }}>
            📚 PYQSBank
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }} className="desktop-nav">
          <Link to="/" style={navLinkStyle}>Home</Link>
          <Link to="/dashboard" style={navLinkStyle}>PYQs</Link>

          {isGuest && (
            <span className="badge badge-amber">Guest</span>
          )}

          {user && (
            <span style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              maxWidth: '160px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {user.email}
            </span>
          )}

          {isAdmin && (
            <Link to="/admin" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem', gap: '6px' }}>
              <Shield size={14} />
              Admin
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              transition: 'all 250ms ease',
              cursor: 'pointer',
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {!isGuest ? (
            user && (
              <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '8px 16px', fontSize: '0.85rem', gap: '6px' }}>
                <LogOut size={14} />
                Logout
              </button>
            )
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Login
            </Link>
          )}
        </div>

        {/* Mobile: Theme + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="mobile-controls">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              transition: 'all 250ms ease',
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              transition: 'all 250ms ease',
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="animate-slide-down" style={{
          borderTop: '1px solid var(--border-color)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          background: 'var(--bg-card)',
        }}>
          <Link to="/" onClick={closeMobile} style={mobileLinkStyle}>Home</Link>
          <Link to="/dashboard" onClick={closeMobile} style={mobileLinkStyle}>PYQs</Link>

          {isGuest && (
            <span className="badge badge-amber" style={{ alignSelf: 'flex-start' }}>Guest Mode</span>
          )}

          {user && (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{user.email}</span>
          )}

          {isAdmin && (
            <Link to="/admin" onClick={closeMobile} className="btn btn-primary" style={{ padding: '10px', fontSize: '0.9rem', width: '100%' }}>
              <Shield size={16} /> Admin Panel
            </Link>
          )}

          {!isGuest ? (
            user && (
              <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '10px', fontSize: '0.9rem', width: '100%' }}>
                <LogOut size={16} /> Logout
              </button>
            )
          ) : (
            <Link to="/login" onClick={closeMobile} className="btn btn-primary" style={{ padding: '10px', fontSize: '0.9rem', width: '100%', textAlign: 'center' }}>
              Login
            </Link>
          )}
        </div>
      )}

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-controls { display: none !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

const navLinkStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-secondary)',
  fontWeight: 500,
  fontSize: '0.9rem',
  transition: 'all 200ms ease',
  textDecoration: 'none',
};

const mobileLinkStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-primary)',
  fontWeight: 500,
  fontSize: '0.95rem',
  transition: 'all 200ms ease',
  textDecoration: 'none',
  background: 'var(--bg-card-hover)',
};

export default Navbar;