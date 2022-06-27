import React from 'react'
import cl from './DragResizer.module.css'
export default function DragResizer({onPointerDownHandler, ...props}) {
  return (
    <div className={cl.resizer} onPointerDown={onPointerDownHandler} >
      <div></div>
    </div>
  )
}
