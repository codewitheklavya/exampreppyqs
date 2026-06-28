import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Paper } from "../types/Paper";
import PaperCard from "../components/PaperCard";
import { Search, BookOpen, Filter, FileText } from "lucide-react";

function Dashboard() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPapers() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("papers")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

        if (error) {
          console.error(error);
          return;
        }

        setPapers(data as Paper[]);
      } finally {
        setLoading(false);
      }
    }

    getPapers();
  }, []);

  const filteredPapers = useMemo(() => {
    const value = search.toLowerCase().trim();

    return papers.filter((paper) => {
      return (
        (paper.title ?? "").toLowerCase().includes(value) ||
        (paper.subject ?? "").toLowerCase().includes(value) ||
        (paper.subject_code ?? "").toLowerCase().includes(value) ||
        (paper.course ?? "").toLowerCase().includes(value) ||
        (paper.paper_type ?? "").toLowerCase().includes(value) ||
        String(paper.year ?? "").includes(value)
      );
    });
  }, [papers, search]);

  return (
    <div className="animate-fade-in" style={{ minHeight: "calc(100vh - 140px)" }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--bg-hero-from), var(--bg-hero-to))",
          padding: "48px 24px",
          color: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--border-color)",
          transition: "background-color 400ms, border-color 400ms",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "8px" }}>
            Welcome 👋
          </h2>
          <p style={{ opacity: 0.9, marginBottom: "24px", fontSize: "1rem" }}>
            Browse and download all previous year question papers.
          </p>

          {/* Search Box */}
          <div
            style={{
              position: "relative",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <Search
              size={20}
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            />
            <input
              type="text"
              placeholder="Search by title, subject, code, course, year..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: "48px",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-md)",
                height: "50px",
                fontSize: "1rem",
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
        {/* Stats and Filter Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                background: "var(--color-primary-soft)",
                color: "var(--color-primary)",
                width: "48px",
                height: "48px",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 400ms, color 400ms",
              }}
            >
              <FileText size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, transition: "color 400ms" }}>
                Total Papers
              </h3>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "var(--color-primary)",
                  transition: "color 400ms",
                  lineHeight: 1,
                }}
              >
                {loading ? "..." : filteredPapers.length}
              </p>
            </div>
          </div>

          {search && (
            <div
              className="badge badge-blue"
              style={{ padding: "6px 12px", fontSize: "0.85rem", gap: "6px" }}
            >
              <Filter size={14} /> Filtered: {filteredPapers.length} results
            </div>
          )}
        </div>

        {/* Papers Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <span
              className="spinner"
              style={{
                width: "40px",
                height: "40px",
                borderWidth: "3px",
                borderTopColor: "var(--color-primary)",
                display: "inline-block",
              }}
            />
            <p style={{ marginTop: "16px", color: "var(--text-muted)" }}>Loading papers...</p>
          </div>
        ) : filteredPapers.length === 0 ? (
          <div
            className="glass-card"
            style={{
              padding: "60px 24px",
              textAlign: "center",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "var(--color-primary-soft)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "var(--color-primary)",
                transition: "background-color 400ms, color 400ms",
              }}
            >
              <BookOpen size={30} />
            </div>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "8px",
                transition: "color 400ms",
              }}
            >
              No Papers Found
            </h2>
            <p style={{ color: "var(--text-secondary)", transition: "color 400ms" }}>
              We couldn't find any papers matching your search. Try adjusting your search query.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "24px",
            }}
            className="stagger-children"
          >
            {filteredPapers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;