import ImageKit from "imagekit";
import { supabase } from "../config/supabase";
import { parseFile } from "../utils/parser";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export const syncImageKitFiles = async () => {
  const files = await imagekit.listFiles({});

  const papersToInsert: any[] = [];
  const failed: any[] = [];
  let skipped = 0;

  for (const file of files) {
    // Ignore folders
    if (file.type !== "file") continue;

    try {
      const parsed = parseFile(file.filePath);

      // Duplicate Check
      let query = supabase
        .from("papers")
        .select("id")
        .eq("course", parsed.course)
        .eq("semester", parsed.semester)
        .eq("year", parsed.year)
        .eq("subject_code", parsed.subject_code);

      if (parsed.set_number === null) {
        query = query.is("set_number", null);
      } else {
        query = query.eq("set_number", parsed.set_number);
      }

      const { data: existingPaper, error } =
        await query.maybeSingle();

      if (error) {
        throw error;
      }

      if (existingPaper) {
        skipped++;
        continue;
      }

      papersToInsert.push({
        title: parsed.title,
        subject: parsed.subject,
        subject_code: parsed.subject_code,
        paper_type: parsed.paper_type,

        set_number:
          parsed.set_number === null
            ? null
            : parsed.set_number,

        course: parsed.course,
        semester: parsed.semester,
        year: parsed.year,
        pdf_url: file.url,
        uploaded_by: "codewitheklavya@gmail.com",
      });
    } catch (error: any) {
      failed.push({
        file: file.name,
        reason: error.message,
      });
    }
  }

  console.log("Ready To Insert:", papersToInsert.length);
  console.log("Skipped:", skipped);
  console.log("Failed:", failed.length);

  if (papersToInsert.length > 0) {
  const { error } = await supabase
    .from("papers")
    .insert(papersToInsert);

  if (error) {
    throw error;
  }
}

  return {
    papersToInsert,
    skipped,
    failed,
  };
};