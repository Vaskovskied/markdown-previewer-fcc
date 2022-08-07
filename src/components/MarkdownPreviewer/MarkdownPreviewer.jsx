import React, { useState, createContext } from "react";
import Editor from "../Editor/Editor";
import Preview from "../Preview/Preview";
import cl from "./MarkdownPreviewer.module.css";
import { marked } from "marked";
import { editorValueDefault } from "../../static/static";
marked.setOptions({
  breaks: true,
});

export const markdownPreviewerContext = createContext();

export default function MarkdownPreviewer() {
  const [editorValue, setEditorValue] = useState(editorValueDefault);
  return (
    <div className={cl.previewer}>
      <markdownPreviewerContext.Provider
        value={{ editorValue, setEditorValue }}
      >
        <Editor />
        <Preview />
      </markdownPreviewerContext.Provider>
    </div>
  );
}
