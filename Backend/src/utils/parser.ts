type ParsedPaper = {
  title: string;
  subject: string;
  subject_code: string;
  paper_type: string;
  set_number: number | null;
  course: string;
  semester: number;
  year: number;
};

function formatSubject(
  subject: string
): string {
  const upperWords = [
    "cpp",
    "c",
    "ui",
    "evs",
    "os",
    "coa",
    "dbms",
    "dsa",
    "ai",
    "ml",
    "iot",
    "cn",
    "wt",
    "html",
    "css",
    "js",
    "sql",
    "oops",
    "java",
    "python",
  ];

  return subject
    .split(" ")
    .map((word) => {
      if (
        upperWords.includes(
          word.toLowerCase()
        )
      ) {
        return word.toUpperCase();
      }

      return (
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
      );
    })
    .join(" ");
}

export function parseFile(
  filePath: string
): ParsedPaper {
  // Expected:
  // /PYQS/BCA/SEM6/2025/CPP MJ-02 Set-1 2023.pdf

  const parts = filePath
    .split("/")
    .filter(Boolean);

  if (parts.length !== 5) {
    throw new Error(
      `Invalid file path: ${filePath}`
    );
  }

  const course = parts[1].trim();

  const semester = Number(
    parts[2]
      .replace(/SEM/i, "")
      .replace("-", "")
      .trim()
  );

  if (
    isNaN(semester) ||
    semester < 1 ||
    semester > 8
  ) {
    throw new Error(
      `Invalid semester: ${filePath}`
    );
  }

  const year = Number(parts[3]);

  if (isNaN(year)) {
    throw new Error(
      `Invalid year: ${filePath}`
    );
  }

  let fileName = parts[4]
    .replace(/\.pdf$/i, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const title = fileName;

  // Remove year from filename
  fileName = fileName
    .replace(/\b20\d{2}$/, "")
    .trim();

  // Detect Set Number
  let setNumber: number | null = null;

  const setMatch = fileName.match(
    /\bset[- ]?(\d+)\b/i
  );

  if (setMatch) {
    setNumber = Number(setMatch[1]);

    fileName = fileName
      .replace(/\bset[- ]?\d+\b/i, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Detect Subject Code
  const subjectCodeMatch =
    fileName.match(
      /\b([A-Z]{2,5}-[A-Za-z0-9]+)\b/i
    );

  if (!subjectCodeMatch) {
    throw new Error(
      `Subject code missing: ${fileName}`
    );
  }

  const subjectCode =
    subjectCodeMatch[1].toUpperCase();

  const paperType =
    subjectCode.split("-")[0];

  // Extract Subject
  let subject = fileName
    .replace(subjectCodeMatch[0], "")
    .replace(/\s+/g, " ")
    .trim();

  subject = formatSubject(subject);

  return {
    title,
    subject,
    subject_code: subjectCode,
    paper_type: paperType,
    set_number: setNumber,
    course: course.toUpperCase(),
    semester,
    year,
  };
}