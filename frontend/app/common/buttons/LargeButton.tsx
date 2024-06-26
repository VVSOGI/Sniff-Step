import React from 'react'
import { D2CodingBold } from '@/app/fonts'

interface Props {
    theme?: 'light' | 'dark'
    children: React.ReactNode
    className?: string
    onClick: () => void
}

export function LargeButton({ theme = 'light', children, className, onClick }: Props) {
    return (
        <button
            style={{
                color: theme === 'light' ? '#000' : '#fff',
                border: theme === 'light' ? '1px solid #d1d5db' : 'none'
            }}
            className={`
                    xl:text-[16px]
                    ${D2CodingBold.className}
                    ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}
                    ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'}
                    w-full flex gap-4 justify-center items-center mb-4 p-4 rounded-[100px] text-[14px] select-none shadow-sm
                    ${className}
                `}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
