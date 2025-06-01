import * as React from "react";

export interface CustomModalType {
  status: boolean;
  children: React.ReactNode;
  bgColor: string;
}

export function Modal(props: CustomModalType) {
  const [open] = React.useState(props.status);

  return open ? (
    <div className="h-[100%] w-[100%] z-50 overflow-visible top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] fixed flex justify-center items-center">
      <div
        className={`z-[1000000] flex flex-col ${props.bgColor} bg-[#161525] justify-start items-center  rounded-2xl p-1 max-sm:w-[90%] max-md:w-[70%] max-lg:w-[40%] lg:w-[28%] `}
      >
        {props.children}
      </div>
    </div>
  ) : (
    <></>
  );
}
