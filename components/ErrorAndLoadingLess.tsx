import {ImSpinner2} from "react-icons/im";
import React from "react";
import {AxiosError} from "axios";


interface ErrorAndLoadingLessProps {
    loading: boolean;
    error: unknown;
    height?: string;
    children: React.ReactNode;
}
const ErrorAndLoadingLess = ({loading, error, height, children}: ErrorAndLoadingLessProps) => {
  if (loading){
        return (<div className={"bg-gray-200 text-6xl text-blue-800 animate-pulse w-full flex items-center justify-center rounded-lg"} style={{height: height ?? "300px"}}>
          <ImSpinner2 className={"animate-spin"} />
      </div>)
  }

    if (error){
        return (<div className={"bg-red-200 text-6xl w-full flex items-center justify-center rounded-lg"} style={{height: height ?? "300px"}}>
            <p className={"text-red-900"}>Something went wrong!</p>
        </div>)
    }

    return (
        <>{children}</>
    )
}

export default ErrorAndLoadingLess;