import {useState } from "react";

const Item = (props: { estado: boolean, content: any, titulo: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.estado);

  return (
    <div className="rounded-md bg-white shadow-lg">
      <span onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full p-8 cursor-pointer">
        <h1 className="font-semibold text-gray-700">{props.titulo}</h1>
        {
          isOpen ? (<span className="text-gray-400 bg-gray-200 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                        </svg>
                    </span>) : (<span className="text-white bg-red-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </span>)
        }
      </span>


      <div className={!isOpen ? "hidden" : ""}>
        <hr className="border-gray-200" />
        {props.content}
      </div>
    </div>
  );
};

export default Item;