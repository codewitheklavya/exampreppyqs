import type { Paper } from "../types/Paper";
import { useAuth } from "../context/AuthContext";
import { Eye, Download, Calendar } from "lucide-react";

type PaperCardProps = {
  paper: Paper;
};

function PaperCard({ paper }: PaperCardProps) {
  const { isGuest } = useAuth();

  const handleGuestDownload = () => {
    alert("Please create an account to download papers.");
  };

  return (
    <div
      className="glass-card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px",
        height: "100%",
      }}
    >
      <div>
        {/* Title */}
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            marginBottom: "16px",
            lineHeight: 1.4,
            transition: "color 400ms",
          }}
        >
          {paper.title}
        </h2>

        {/* Badges Info */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          {paper.course && (
            <span className="badge badge-blue">
              {paper.course}
            </span>
          )}
          {paper.paper_type && (
            <span className="badge badge-purple">
              {paper.paper_type}
            </span>
          )}
          {paper.semester && (
            <span className="badge badge-amber">
              Sem {paper.semester}
            </span>
          )}
          {paper.year && (
            <span className="badge badge-green" style={{ gap: "4px" }}>
              <Calendar size={12} /> {paper.year}
            </span>
          )}
        </div>

        {/* Text Details */}
        <div
          style={{
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "24px",
            transition: "color 400ms",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <span style={{ fontWeight: 600, color: "var(--text-primary)", minWidth: "100px" }}>Subject:</span>
            <span>{paper.subject}</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <span style={{ fontWeight: 600, color: "var(--text-primary)", minWidth: "100px" }}>Code:</span>
            <span style={{ fontFamily: "monospace", letterSpacing: "0.05em" }}>{paper.subject_code}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "10px", width: "100%" }}>
        <a
          href={paper.pdf_url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "0.85rem",
            gap: "6px",
            textDecoration: "none",
          }}
        >
          <Eye size={15} />
          View PDF
        </a>

        {isGuest ? (
          <button
            onClick={handleGuestDownload}
            className="btn btn-primary"
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "0.85rem",
              gap: "6px",
              background: "var(--text-muted)",
              cursor: "pointer",
            }}
          >
            <Download size={15} />
            Download 🔒
          </button>
        ) : (
          <a
            href={paper.pdf_url}
            download
            className="btn btn-primary"
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "0.85rem",
              gap: "6px",
              textDecoration: "none",
            }}
          >
            <Download size={15} />
            Download
          </a>
        )}
      </div>
    </div>
  );
}

export default PaperCard;