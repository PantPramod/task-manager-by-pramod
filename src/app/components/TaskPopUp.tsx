import React, { Children, ReactNode } from 'react'
import { AiOutlineClose } from "react-icons/ai";

type propTypes = {
    show: boolean,
    setShow: (value: boolean) => void,
    children: ReactNode,
    background?: string,
    className?: string
}
const TaskPopUp = ({ show, setShow, children, background, className }: propTypes) => {
    return (
        <>
            {show ?
                <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'
                    onClick={() => setShow(false)}
                >
                    <div className={`${background ? `bg-${background}` : ""}   rounded-md text-black ${className}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className=''>
                            <AiOutlineClose
                                onClick={() => setShow(false)}
                                cursor={"pointer"}
                                className='ml-auto'
                                color={background==="black"?"white":"white"}
                            />
                        </div>
                        {children}


                    </div>
                </div> :
                <></>}
        </>
    )
}

export default TaskPopUp
