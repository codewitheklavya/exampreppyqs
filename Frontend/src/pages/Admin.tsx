import { useState } from "react";
import { supabase } from "../lib/supabase";

function Admin() {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("BCA");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [paperType, setPaperType] = useState("");
  const [year, setYear] = useState("");

  const [pdfFile, setPdfFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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

      const uploadResponse =
        await fetch(
          "http://localhost:5000/api/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      const uploadResult =
        await uploadResponse.json();

      if (!uploadResult.success) {
        alert("Failed to upload PDF");
        return;
      }

      // Save paper details in Supabase
      const { error } = await supabase
        .from("papers")
        .insert([
          {
            title,
            course,
            semester: Number(semester),
            subject,
            subject_code: subjectCode,
            paper_type: paperType,
            year: Number(year),
            pdf_url:
              uploadResult.pdfUrl,
            uploaded_by:
              "codewitheklavya@gmail.com",
          },
        ]);

      if (error) {
        console.log(error);
        alert(
          "Failed to save paper"
        );
        return;
      }

      alert(
        "Paper uploaded successfully!"
      );

      setTitle("");
      setSubject("");
      setSubjectCode("");
      setPaperType("");
      setSemester("");
      setYear("");
      setPdfFile(null);
    } catch (error) {
      console.error(error);
      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="rounded-xl border bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Upload New Paper
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            placeholder="Paper Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            type="text"
            placeholder="Subject Name"
            value={subject}
            onChange={(e) =>
              setSubject(
                e.target.value.toUpperCase()
              )
            }
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            type="text"
            placeholder="Subject Code (Example: MDC-1)"
            value={subjectCode}
            onChange={(e) =>
              setSubjectCode(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
            required
          />

          <select
            value={paperType}
            onChange={(e) =>
              setPaperType(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">
              Select Paper Type
            </option>

            <option value="MDC">
              MDC
            </option>

            <option value="AEC">
              AEC
            </option>

            <option value="VAC">
              VAC
            </option>

            <option value="SEC">
              SEC
            </option>

            <option value="MJ">
              MJ
            </option>

            <option value="MN">
              MN
            </option>
          </select>

          
          <input
            type="text"
            placeholder="Course (Example: BCA)"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full rounded-lg border p-3"
            required
          />

          <select
            value={semester}
            onChange={(e) =>
              setSemester(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">
              Select Semester
            </option>

            {[1, 2, 3, 4, 5, 6].map(
              (sem) => (
                <option
                  key={sem}
                  value={sem}
                >
                  Semester {sem}
                </option>
              )
            )}
          </select>

          <input
            type="number"
            placeholder="Exam Year (Example: 2018)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              setPdfFile(
                e.target
                  .files?.[0] ??
                  null
              )
            }
            className="w-full rounded-lg border p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading
              ? "Uploading..."
              : "Upload Paper"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;