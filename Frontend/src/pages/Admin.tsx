import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Upload, FileText, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Admin() {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("BCA");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [paperType, setPaperType] = useState("");
  const [year, setYear] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!pdfFile) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      // Upload PDF to backend
      const formData = new FormData();
      formData.append("pdf", pdfFile);

      const uploadResponse = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

      const uploadResult = await uploadResponse.json();

      if (!uploadResult.success) {
        alert("Failed to upload PDF");
        return;
      }

      // Save paper details in Supabase
      const { error } = await supabase.from("papers").insert([
        {
          title,
          course,
          semester: Number(semester),
          subject,
          subject_code: subjectCode,
          paper_type: paperType,
          year: Number(year),
          pdf_url: uploadResult.pdfUrl,
          uploaded_by: "codewitheklavya@gmail.com",
        },
      ]);

      if (error) {
        console.error(error);
        alert("Failed to save paper");
        return;
      }

      alert("Paper uploaded successfully!");

      setTitle("");
      setSubject("");
      setSubjectCode("");
      setPaperType("");
      setSemester("");
      setYear("");
      setPdfFile(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: "40px 24px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Header link back to dashboard */}
      <div style={{ marginBottom: "24px" }}>
        <Link to="/dashboard" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--text-secondary)",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "0.9rem",
          transition: "color 200ms",
        }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>

      <div className="glass-card" style={{ padding: "40px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            width: "56px",
            height: "56px",
            background: "var(--color-primary-soft)",
            color: "var(--color-primary)",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            transition: "background-color 400ms, color 400ms",
          }}>
            <Upload size={24} />
          </div>
          <h1 style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            marginBottom: "6px",
            letterSpacing: "-0.02em",
            transition: "color 400ms",
          }}>
            Upload New Paper
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", transition: "color 400ms" }}>
            Add previous year questions to the public repository
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Paper Title */}
          <div>
            <label className="form-label">Paper Title</label>
            <input
              type="text"
              placeholder="e.g. End Semester Exam Nov 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}>
            {/* Subject Name */}
            <div>
              <label className="form-label">Subject Name</label>
              <input
                type="text"
                placeholder="e.g. COMPUTER NETWORKS"
                value={subject}
                onChange={(e) => setSubject(e.target.value.toUpperCase())}
                className="form-input"
                required
              />
            </div>

            {/* Subject Code */}
            <div>
              <label className="form-label">Subject Code</label>
              <input
                type="text"
                placeholder="e.g. MDC-1 or BCS-301"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}>
            {/* Paper Type */}
            <div>
              <label className="form-label">Paper Type</label>
              <select
                value={paperType}
                onChange={(e) => setPaperType(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Select Paper Type</option>
                <option value="MDC">MDC</option>
                <option value="AEC">AEC</option>
                <option value="VAC">VAC</option>
                <option value="SEC">SEC</option>
                <option value="MJ">MJ</option>
                <option value="MN">MN</option>
              </select>
            </div>

            {/* Course */}
            <div>
              <label className="form-label">Course</label>
              <input
                type="text"
                placeholder="e.g. BCA or B.Sc"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}>
            {/* Semester */}
            <div>
              <label className="form-label">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* Exam Year */}
            <div>
              <label className="form-label">Exam Year</label>
              <input
                type="number"
                placeholder="e.g. 2024"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          {/* File Upload Area */}
          <div>
            <label className="form-label">PDF Question Paper</label>
            <div style={{
              border: pdfFile ? "2px solid var(--color-success)" : "2px dashed var(--border-input)",
              borderRadius: "var(--radius-md)",
              padding: "24px",
              textAlign: "center",
              cursor: "pointer",
              background: "var(--bg-input)",
              position: "relative",
              transition: "all 200ms ease",
            }}>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
                required
              />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                {pdfFile ? (
                  <>
                    <CheckCircle size={32} style={{ color: "var(--color-success)" }} />
                    <p style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.95rem" }}>
                      {pdfFile.name}
                    </p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                      Click or drag to replace
                    </p>
                  </>
                ) : (
                  <>
                    <FileText size={32} style={{ color: "var(--text-muted)" }} />
                    <p style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: "0.95rem" }}>
                      Choose file or drag & drop here
                    </p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                      Only PDF documents are allowed
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
            style={{ width: "100%", padding: "13px", marginTop: "12px", gap: "10px" }}
          >
            {loading ? <span className="spinner" /> : <Upload size={16} />}
            {loading ? "Uploading Paper..." : "Upload Paper"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;