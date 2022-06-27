import React, {useContext} from 'react'
import cl from './Preview.module.css'
import { marked } from 'marked';
import { markdownPreviewerContext } from '../MarkdownPreviewer/MarkdownPreviewer';

const markdownRenderer = new marked.Renderer();

export default function Preview() {
  const { editorValue } = useContext(markdownPreviewerContext);
  return (
    <div id='preview' className={cl.preview} 
    dangerouslySetInnerHTML={{
        __html: marked(editorValue, {renderer: markdownRenderer})
    }}
    />
  )
}
