import type { Paper } from "../types/Paper";
import { useAuth } from "../context/AuthContext";

type PaperCardProps = {
  paper: Paper;
};

function PaperCard({
  paper,
}: PaperCardProps) {
  const { isGuest } = useAuth();

  const handleGuestDownload = () => {
    alert(
      "Please create an account to download papers."
    );
  };

  return (
    <div className="rounded-xl border bg-white p-5 shadow transition hover:shadow-lg">
      <h2 className="mb-3 text-2xl font-bold">
        {paper.title}
      </h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">
            Subject:
          </span>{" "}
          {paper.subject}
        </p>

        <p>
          <span className="font-semibold">
            Subject Code:
          </span>{" "}
          {paper.subject_code}
        </p>

        <p>
          <span className="font-semibold">
            Course:
          </span>{" "}
          {paper.course}
        </p>

        <p>
          <span className="font-semibold">
            Paper Type:
          </span>{" "}
          {paper.paper_type}
        </p>

        <p>
          <span className="font-semibold">
            Semester:
          </span>{" "}
          {paper.semester}
        </p>

        <p>
          <span className="font-semibold">
            Year:
          </span>{" "}
          {paper.year}
        </p>
      </div>

      <div className="mt-5 flex gap-3">
        <a
          href={paper.pdf_url}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          View PDF
        </a>

        {isGuest ? (
          <button
            onClick={handleGuestDownload}
            className="cursor-pointer rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Download 🔒
          </button>
        ) : (
          <a
            href={paper.pdf_url}
            download
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Download PDF
          </a>
        )}
      </div>
    </div>
  );
}

export default PaperCard;