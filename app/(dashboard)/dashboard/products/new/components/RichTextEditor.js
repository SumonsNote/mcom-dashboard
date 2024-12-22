import React, { forwardRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const CodeEditor = forwardRef(({ content, onChange = () => {} }, ref) => {
  const handleEditorChange = () => {
    // Get content using ref
    const newContent = ref.current.getContent();
    onChange(newContent);
  };

  return (
    <div className="p-4 text-sm">
      <div>
        <Editor
          apiKey="kjr1pavnntv2tghdo5mksaour54cikv0wqpbgg5f24jgngdl"
          onInit={(evt, editor) => (ref.current = editor)}
          initialValue={content}
          init={{
            height: 400,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
              "codesample code",
              "emoticons",
            ],
            codesample_languages: [
              { text: "HTML/XML", value: "markup" },
              { text: "JavaScript", value: "javascript" },
              { text: "CSS", value: "css" },
              { text: "PHP", value: "php" },
            ],
            toolbar: [
              "undo redo | bold italic underline | blocks |forecolor backcolor",
              "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
              "link image media | table | codesample code | preview fullscreen | help",
            ].join(" "),
            table_toolbar: "tableprops cell row column deletetable",
            table_default_attributes: {
              border: "1",
            },
            table_default_styles: {
              width: "100%",
              borderCollapse: "collapse",
            },
            table_class_list: [
              { title: "None", value: "" },
              { title: "Striped Rows", value: "table-striped" },
              { title: "Bordered Table", value: "table-bordered" },
            ],
            content_style: `
              body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; }
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ccc; padding: 8px; }
              .table-striped tr:nth-child(even) { background-color: #f2f2f2; }
              .table-bordered { border: 1px solid #333; }
            `,
            skin: "oxide-dark",
            content_css: "light",
            setup: (editor) => {
              editor.on("keydown", (event) => {
                if (
                  event.key === "Enter" &&
                  editor.selection.getNode().nodeName === "TD"
                ) {
                  event.preventDefault(); // Prevent default Enter behavior
                  editor.execCommand("InsertLineBreak"); // Insert <br> instead
                }
              });
            },
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
    </div>
  );
});

CodeEditor.displayName = "CodeEditor";
export default CodeEditor;
