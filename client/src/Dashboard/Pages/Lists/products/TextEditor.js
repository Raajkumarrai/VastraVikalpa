import React, { useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const TextEditor = ({ initialData, setDescriptionData }) => {
  const handleChange = (value) => {
    setDescriptionData(value);
  };

  const modules = {
    toolbar: [
      [
        { header: "1" },
        { header: "2" },
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        { "code-block": true },
      ],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "image",
    "align",
    "code-block",
  ];

  return (
    <ReactQuill
      style={{ height: "110px" }}
      placeholder="Add description."
      value={initialData}
      onChange={handleChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default TextEditor;
