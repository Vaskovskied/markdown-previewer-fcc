import React, { useContext, useRef, useEffect} from 'react'
import cl from "./Editor.module.css"
import { markdownPreviewerContext } from '../MarkdownPreviewer/MarkdownPreviewer'

export default function Editor(props) {
  const primPaneRef = useRef();
  const { primPaneSize, setPaneSize, editorValue, setEditorValue } = useContext(markdownPreviewerContext);

  useEffect(() => {
    if (!primPaneSize) {
      // const propertyToSet = document.documentElement.clientWidth > 860 ? primPaneRef.current.clientWidth : primPaneRef.current.clientHeight;
      setPaneSize(primPaneRef.current.clientWidth);
      primPaneRef.current.style.flex = "none";
      return;
    }
    primPaneRef.current.style.width = `${primPaneSize}px`
    // if (document.documentElement.clientWidth > 860) {
    //   primPaneRef.current.style.width = `${primPaneSize}px`
    //   primPaneRef.current.style.height = `100%`
    // } else {
    //   primPaneRef.current.style.height = `${primPaneSize}px`
    //   primPaneRef.current.style.width = `100%`
    // }
   
  }, [primPaneSize]);

  const onChangeHandler = (e) => {
    setEditorValue(e.target.value)
    console.log(editorValue)
  };
  return (
    <textarea name='editor' id="editor" className={cl.textarea} ref={primPaneRef}  value={editorValue} onChange={onChangeHandler} />
  )
}
