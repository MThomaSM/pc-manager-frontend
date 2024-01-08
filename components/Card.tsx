import React, {ReactNode} from "react";

interface CardProps {
    title: string;
    titleClasses?: string;
    children : ReactNode;
    footer?: ReactNode
}

const Card: React.FC<CardProps> = ({title, titleClasses, children, footer }) => {
  return (
      <div className="bg-gray-200 flex flex-col justify-start items-start h-full rounded-lg hover:scale-[1.025] transition-all w-full">
          <div className={`flex flex-row justify-between items-center w-full rounded-t-lg overflow-clip ${titleClasses ? titleClasses : 'bg-gradient-to-r from-blue-600 to-blue-800'}`}>
              <h4 className="font-semibold text-2xl p-4 uppercase text-white">{title}</h4>
          </div>
          <div className="p-4 w-full">{children}</div>
          {footer}
      </div>
  )
}

export default Card;