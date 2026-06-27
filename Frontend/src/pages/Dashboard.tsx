import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Paper } from "../types/Paper";
import PaperCard from "../components/PaperCard";

function Dashboard() {
  const [papers, setPapers] =
  useState<Paper[]>([]);

  const [search, setSearch] =
  useState("");

  useEffect(() => {
    async function getPapers() {
      const { data, error } = await supabase
        .from("papers")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.log(error);
        return;
      }

      setPapers(data as Paper[]);
    }

    getPapers();
  }, []);

 const filteredPapers = useMemo(() => {
  const value = search.toLowerCase().trim();

  return papers.filter((paper) => {
    return (
      (paper.title ?? "")
        .toLowerCase()
        .includes(value) ||

      (paper.subject ?? "")
        .toLowerCase()
        .includes(value) ||

      (paper.subject_code ?? "")
        .toLowerCase()
        .includes(value) ||

      (paper.course ?? "")
        .toLowerCase()
        .includes(value) ||

      (paper.paper_type ?? "")
        .toLowerCase()
        .includes(value) ||

      String(paper.year ?? "").includes(value)
    );
  });
}, [papers, search]);


  return (
    <div className="min-h-screen bg-blue-50">


      {/* Main */}

      <div className="mx-auto max-w-7xl p-6">

        {/* Header */}

        <div className="mb-8 rounded-xl bg-white p-6 shadow">

          <h2 className="text-2xl font-bold text-gray-800">
            Welcome 👋
          </h2>

          <p className="mt-2 text-gray-500">
            Browse all previous year question papers.
          </p>

          <div className="mt-5">

            <input
              type="text"
              placeholder="Search by title, subject, code, course, year..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
            />

          </div>

        </div>

        {/* Stats */}

        <div className="mb-8">

          <div className="rounded-xl bg-blue-600 p-5 text-white shadow">

            <h3 className="text-lg">
              Total Papers
            </h3>

            <p className="mt-2 text-4xl font-bold">
              {filteredPapers.length}
            </p>

          </div>

        </div>

        {/* Papers */}

        {filteredPapers.length === 0 ? (

          <div className="rounded-xl bg-white p-10 text-center shadow">

            <h2 className="text-2xl font-semibold text-gray-700">
              No Papers Found
            </h2>

            <p className="mt-3 text-gray-500">
              Try searching with another keyword.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

            {filteredPapers.map((paper) => (
              <PaperCard
                key={paper.id}
                paper={paper}
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;