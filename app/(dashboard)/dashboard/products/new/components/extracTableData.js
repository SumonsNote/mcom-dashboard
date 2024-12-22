// export function extractTableData(htmlTable) {
//   const result = {};
//   const table = new DOMParser().parseFromString(htmlTable, "text/html");
//   let currentSection = "";

//   table.querySelectorAll("thead, tbody").forEach((section) => {
//     const heading = section.querySelector(".heading-row")?.textContent.trim();

//     if (heading) {
//       currentSection = heading;
//       result[currentSection] = {};
//     } else if (currentSection) {
//       const rows = section.querySelectorAll("tr");

//       rows.forEach((row) => {
//         const name = row.querySelector(".name")?.textContent.trim();
//         const value = row.querySelector(".value")?.textContent.trim();

//         if (name && value) {
//           result[currentSection][name] = value;
//         }
//       });
//     }
//   });

//   return result;
// }

export function extractTableDataFromSimpleTable(htmlTable) {
  const result = {};
  const table = new DOMParser().parseFromString(htmlTable, "text/html");

  table.querySelectorAll("tbody tr").forEach((row) => {
    const cells = row.querySelectorAll("td");
    if (cells.length === 2) {
      const key = cells[0]?.textContent.trim();
      const value = cells[1]?.textContent.trim();

      if (key && value) {
        result[key] = value;
      }
    }
  });

  return result;
}
export function extractTableData(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const result = {};

  const sections = doc.querySelectorAll("thead");
  sections.forEach((section) => {
    const sectionName = section.querySelector("th").textContent.trim();
    result[sectionName] = {};

    const rows = section.nextElementSibling.querySelectorAll("tr");
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      if (cells.length === 2) {
        const key = cells[0].textContent.trim();
        const value = cells[1].textContent.trim();
        result[sectionName][key] = value;
      }
    });
  });

  return result;
}
