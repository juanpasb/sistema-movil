import React, { Fragment, useRef } from "react";
import { useOutsideAlerter } from "../element/useOutsideAlerter";

interface DesplegableProps {
  label: string;
  event: Function;
}

const Desplegable = (props: { data: DesplegableProps[] }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setOpen(false);
  });

  return (
    <Fragment>
      <div className="inline-block" ref={wrapperRef}>
        <button onClick={() => setOpen(!open)}
                className={(open ? "shadow bg-gray-200" : "") + " px-1 py-1 text-gray-500 rounded-md hover:shadow hover:bg-gray-200"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
               stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </button>

        <div
          className={(open ? "" : "hidden") + " border border-gray-100 absolute right-0 z-auto w-48  py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg"}>
          {
            props.data.map((item, index) => {
              return (
                <label key={index} onClick={() => {
                  item.event();
                  setOpen(false);
                }}
                       className="cursor-pointer hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700 transform">
                  {item.label}
                </label>
              );
            })
          }
        </div>
      </div>
    </Fragment>
  );
};

export default Desplegable;