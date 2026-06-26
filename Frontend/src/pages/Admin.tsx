import { useState } from "react";
import { supabase } from "../lib/supabase";

function Admin() {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("BCA");
  const [branch, setBranch] = useState("BCA");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [paperType, setPaperType] = useState("");
  const [year, setYear] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const { error } = await supabase
      .from("papers")
      .insert([
        {
          title,
          course,
          branch,
          semester: Number(semester),
          subject,
          subject_code: subjectCode,
          paper_type: paperType,
          year: Number(year),
          pdf_url: pdfUrl,
          uploaded_by: "codewitheklavya@gmail.com",
        },
      ]);

    if (error) {
      console.log(error);
      alert("Failed to add paper");
      return;
    }

    alert("Paper Added Successfully");

    setTitle("");
    setSemester("");
    setSubject("");
    setSubjectCode("");
    setPaperType("");
    setYear("");
    setPdfUrl("");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-lg border p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Upload New Paper
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Title */}

          <input
            type="text"
            placeholder="Paper Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border rounded-lg p-3"
            required
          />

          {/* Subject */}

          <input
            type="text"
            placeholder="Subject Name"
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            className="w-full border rounded-lg p-3"
            required
          />

          {/* Subject Code */}

          <input
            type="text"
            placeholder="Subject Code (Example: MDC-1)"
            value={subjectCode}
            onChange={(e) =>
              setSubjectCode(e.target.value)
            }
            className="w-full border rounded-lg p-3"
            required
          />

          {/* Paper Type */}

          <select
            value={paperType}
            onChange={(e) =>
              setPaperType(e.target.value)
            }
            className="w-full border rounded-lg p-3"
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

          {/* Course */}

          <select
            value={course}
            onChange={(e) =>
              setCourse(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="BCA">
              BCA
            </option>
          </select>

          {/* Branch */}

          <select
            value={branch}
            onChange={(e) =>
              setBranch(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="BCA">
              BCA
            </option>
          </select>

          {/* Semester */}

          <select
            value={semester}
            onChange={(e) =>
              setSemester(e.target.value)
            }
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">
              Select Semester
            </option>

            <option value="1">
              Semester 1
            </option>

            <option value="2">
              Semester 2
            </option>

            <option value="3">
              Semester 3
            </option>

            <option value="4">
              Semester 4
            </option>

            <option value="5">
              Semester 5
            </option>

            <option value="6">
              Semester 6
            </option>
          </select>

          {/* Year */}

          <select
            value={year}
            onChange={(e) =>
              setYear(e.target.value)
            }
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">
              Select Year
            </option>

            <option value="2022">
              2022
            </option>

            <option value="2023">
              2023
            </option>

            <option value="2024">
              2024
            </option>

            <option value="2025">
              2025
            </option>
          </select>

          {/* Temporary PDF URL */}

          <input
            type="text"
            placeholder="Paste ImageKit PDF URL"
            value={pdfUrl}
            onChange={(e) =>
              setPdfUrl(e.target.value)
            }
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg p-3"
          >
            Upload Paper
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;