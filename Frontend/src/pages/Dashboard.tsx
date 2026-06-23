import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Paper } from "../types/Paper";
import PaperCard from "../components/PaperCard";

function Dashboard() {
  const [papers, setPapers] = useState<Paper[]>([]);

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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {papers.length === 0 ? (
        <p>No papers found.</p>
      ) : (
        <div className="grid gap-4">
          {papers.map((paper) => (
            <PaperCard
              key={paper.id}
              paper={paper}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;