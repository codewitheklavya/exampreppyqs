import type { Paper } from "../types/Paper";
import { useAuth } from "../context/AuthContext";

type PaperCardProps = {
  paper: Paper;
};

function PaperCard({ paper }: PaperCardProps) {
  const { isGuest } = useAuth();

  const handleGuestDownload = () => {
    alert(
      "Please create an account to download papers."
    );
  };

  return (
    <div className="bg-white border rounded-xl p-5 shadow hover:shadow-lg transition">
      <h2 className="text-2xl font-bold mb-3">
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
            Branch:
          </span>{" "}
          {paper.branch}
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

      <div className="flex gap-3 mt-5">
        <a
          href={paper.pdf_url}
          target="_blank"
          rel="noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          View PDF
        </a>

        {isGuest ? (
          <button
            onClick={handleGuestDownload}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Download Locked 🔒
          </button>
        ) : (
          <a
            href={paper.pdf_url}
            download
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Download PDF
          </a>
        )}
      </div>
    </div>
  );
}

export default PaperCard;