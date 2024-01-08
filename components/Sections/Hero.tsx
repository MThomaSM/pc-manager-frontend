import {FC, ReactNode} from "react";

interface HeroProps {
    title: string;
    subTitle?: string;
    children?: ReactNode;
}

const Hero: FC<HeroProps> = ({title, subTitle, children}) => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-800 flex flex-col items-center justify-center">
            <div className="container py-16 flex flex-col items-center justify-center px-3 md:px-0">
                <h1 className="text-4xl md:text-6xl font-bold text-white  md:w-1/2 text-center !leading-snug">{title}</h1>

                {subTitle ?
                    <small className="text-white pt-6">
                        {subTitle}
                    </small>
                : null}

                {children ?
                    <div className="flex flex-row items-center gap-4 pt-6">
                        {children}
                    </div>
                : null}
            </div>
        </div>
    )
}

export default Hero;