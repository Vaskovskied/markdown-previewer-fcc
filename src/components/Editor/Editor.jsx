import React, { useContext } from "react";
import cl from "./Editor.module.css";
import { markdownPreviewerContext } from "../MarkdownPreviewer/MarkdownPreviewer";

export default function Editor() {
  const { editorValue, setEditorValue } = useContext(markdownPreviewerContext);

  const onChangeHandler = (e) => {
    setEditorValue(e.target.value);
  };
  return (
    <textarea
      name="editor"
      id="editor"
      className={cl.editor}
      value={editorValue}
      onChange={onChangeHandler}
    />
  );
}
