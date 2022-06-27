import React, {useState, createContext, useRef, useEffect} from 'react'
import DragResizer from '../DragResizer/DragResizer'
import Editor from '../Editor/Editor'
import Preview from '../Preview/Preview'
import cl from './MarkdownPreviewer.module.css'
import { marked } from 'marked'

marked.setOptions({
  breaks: true
})

export const markdownPreviewerContext = createContext();

export function MarkdownPreviewer() {
  const [primPaneSize, setPaneSize] = useState(null);
  const separatorPosition = useRef(null);
  const splitPaneRef = useRef();

  const editorValueDefault = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.
  
\`\`\`
// this is multi-line code:
  
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
   return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

  const [editorValue, setEditorValue] = useState(editorValueDefault);
  const onPointerDown = (e) => {
    separatorPosition.current = e.clientX;
  };

  const onPointerMove = (e) => {
    if (!separatorPosition.current) {
      return;
    }

    const newPrimSize = primPaneSize + e.clientX - separatorPosition.current;
    separatorPosition.current = e.clientX;

    const primWidthMax = splitPaneRef.current.clientWidth * 0.75;
    const primWidthMin = splitPaneRef.current.clientWidth * 0.25;

    if (newPrimSize >= primWidthMax) {
      return primPaneSize !== primWidthMax && setPaneSize(primWidthMax);
    } else if (newPrimSize <= primWidthMin) {
      return primPaneSize !== primWidthMin && setPaneSize(primWidthMin);
    }

    setPaneSize(newPrimSize);
  };

  const onPointerUp = () => {
    separatorPosition.current = null;
  };

  useEffect(() => {
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };
  });


  return (
    <div className={cl.previewer} ref={splitPaneRef}>
      <markdownPreviewerContext.Provider value={{ editorValue, setEditorValue , primPaneSize, setPaneSize }}>
        <Editor/> 
        <DragResizer onPointerDownHandler={onPointerDown}/>
        <Preview/>
      </markdownPreviewerContext.Provider>
    </div>
  )
}
