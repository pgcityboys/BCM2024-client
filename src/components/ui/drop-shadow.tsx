import { ReactNode } from "react"


export const DropShadow = ({color, children}: {
  color?: string,
  children: ReactNode
}) => {
  return (
    <div className="grid">
      <div className="relative group my-4">
        <div className={`absolute bg-violet-500 -inset-0.5 blur-xl group-hover:bg-violet-100 opacity-45`}/>
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  )
}
