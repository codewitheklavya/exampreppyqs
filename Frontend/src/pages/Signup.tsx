import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, UserPlus } from "lucide-react";
import { supabase } from "../lib/supabase";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simple password strength
  const getPasswordStrength = (): { label: string; color: string; width: string } => {
    if (!password) return { label: '', color: 'transparent', width: '0%' };
    if (password.length < 4) return { label: 'Weak', color: 'var(--color-danger)', width: '25%' };
    if (password.length < 6) return { label: 'Fair', color: 'var(--badge-amber-text)', width: '50%' };
    if (password.length < 8) return { label: 'Good', color: 'var(--color-primary)', width: '75%' };
    return { label: 'Strong', color: 'var(--color-success)', width: '100%' };
  };

  const strength = getPasswordStrength();

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);

    console.log("Signup Data:", data);
    console.log("Signup Error:", error);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Account created successfully!\n\nPlease check your email inbox and click the verification link before logging in.\n\nIf you don't see the email, check your Spam or Promotions folder."
    );
    navigate("/dashboard");
  };

  return (
    <div className="animate-fade-in" style={{
      minHeight: 'calc(100vh - 70px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '440px', width: '100%' }}>
        <div className="glass-card" style={{ padding: '40px 32px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--badge-green-bg)',
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              transition: 'background-color 400ms, color 400ms',
            }}>
              <UserPlus size={24} />
            </div>
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '6px',
              letterSpacing: '-0.02em',
              transition: 'color 400ms',
            }}>
              Create Account
            </h1>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              transition: 'color 400ms',
            }}>
              Join to download and access all papers
            </p>
          </div>

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Email */}
            <div>
              <label className="form-label">Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '40px' }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '40px', paddingRight: '44px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 200ms',
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password Strength */}
              {password && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{
                    height: '4px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--border-color)',
                    overflow: 'hidden',
                    transition: 'background-color 400ms',
                  }}>
                    <div style={{
                      height: '100%',
                      width: strength.width,
                      background: strength.color,
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 300ms ease, background-color 300ms ease',
                    }} />
                  </div>
                  <p style={{
                    fontSize: '0.75rem',
                    color: strength.color,
                    marginTop: '4px',
                    fontWeight: 500,
                    transition: 'color 300ms',
                  }}>
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="form-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '40px' }}
                />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-danger)',
                  marginTop: '6px',
                  fontWeight: 500,
                }}>
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={handleSignup}
              disabled={loading}
              className={`btn btn-success ${loading ? 'btn-disabled' : ''}`}
              style={{ width: '100%', padding: '13px', marginTop: '4px' }}
            >
              {loading ? <span className="spinner" /> : <UserPlus size={16} />}
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          {/* Footer */}
          <p style={{
            textAlign: 'center',
            marginTop: '24px',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            transition: 'color 400ms',
          }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: 'var(--color-primary)',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'color 400ms',
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;