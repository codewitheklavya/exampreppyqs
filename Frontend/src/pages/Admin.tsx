import { useState } from "react";
import { supabase } from "../lib/supabase";

function Admin() {
  const [title, setTitle] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
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
          branch,
          semester: Number(semester),
          subject,
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
    setBranch("");
    setSemester("");
    setSubject("");
    setYear("");
    setPdfUrl("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Admin Panel
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="border p-3 rounded"
        />

        <input
          type="number"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-3 rounded"
        />

        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-3 rounded"
        />

        <input
          type="text"
          placeholder="PDF URL"
          value={pdfUrl}
          onChange={(e) => setPdfUrl(e.target.value)}
          className="border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded"
        >
          Add Paper
        </button>
      </form>
    </div>
  );
}

export default Admin;