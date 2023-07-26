import React from 'react'

type propTypes = {
    onClick: () => void
    children: string
    background?: string
    hoverBackground?: string
    hoverColor?: string
    color?: string
    isTailwind?: boolean
    disabled?: boolean
    px?: number
    py?: number
    mt?: number
    mb?: number
    ml?:number
    mr?:number
    fontSize?: string
    className?:string

}
const Button = ({ onClick, children, background, color, disabled, isTailwind, hoverBackground, hoverColor, px, py, mt, mb, fontSize, ml, mr, className }: propTypes) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`rounded-md ml-${ml} mr-${mr} px-${px} py-${py} mt-${mt} mb-${mb} text-${fontSize} transition-all ease-in-out duration-300  text-${color} ${isTailwind ? `bg-${background}` : `bg-[${background}]`} cursor-pointer ${className}`}>
            {children}
        </button>
    )
}

export default Button
