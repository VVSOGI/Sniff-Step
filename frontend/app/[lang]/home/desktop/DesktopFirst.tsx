'use client'

import React, { useEffect, useState } from 'react'
import { LocaleHome, Locales } from '@/app/types/locales'
import Link from 'next/link'

interface Props {
    lang: Locales
    text: LocaleHome
}

export function DesktopFirst({ lang, text }: Props) {
    const [loading, setLoading] = useState(true)

    function opacityChange(element: HTMLElement | null, opacity: string, time: number) {
        setTimeout(() => {
            if (element) {
                element.style.opacity = opacity
            }
        }, time)
    }

    useEffect(() => {
        setLoading(false)
        opacityChange(document.getElementById('poppy-foot1'), '0.4', 400)
        opacityChange(document.getElementById('poppy-foot2'), '0.5', 600)
        opacityChange(document.getElementById('poppy-foot3'), '0.7', 800)
        opacityChange(document.getElementById('poppy-foot4'), '0.8', 1000)
        opacityChange(document.getElementById('poppy-foot5'), '0.9', 1200)
        opacityChange(document.getElementById('poppy-foot6'), '1', 1400)
    }, [])

    return (
        <div className={`xl:flex max-w-[1230px] mx-auto hidden relative h-[calc(100vh-93px)] gap-[100px] select-none`}>
            <div className="relative flex-1">
                <div>
                    <img
                        id="poppy-foot1"
                        className={`
                        2xl:w-[50px] 2xl:bottom-[28%]
                        absolute bottom-[22%] right-[5%] -rotate-[73deg] w-[30px] object-contain opacity-[0] duration-500`}
                        src="/images/poppy-foot.png"
                        alt=""
                    />
                    <img
                        id="poppy-foot2"
                        className={`
                        2xl:w-[50px] 2xl:bottom-[23%]
                        absolute bottom-[18%] right-[20%] -rotate-[105deg] w-[30px] object-contain opacity-[0] duration-500`}
                        src="/images/poppy-foot.png"
                        alt=""
                    />
                    <img
                        id="poppy-foot3"
                        className={`
                        2xl:w-[50px] 2xl:bottom-[28%]
                        absolute bottom-[22%] right-[40%] -rotate-[73deg] w-[30px] object-contain opacity-[0] duration-500`}
                        src="/images/poppy-foot.png"
                        alt=""
                    />
                    <img
                        id="poppy-foot4"
                        className={`
                        2xl:w-[50px] 2xl:bottom-[23%]
                        absolute bottom-[18%] right-[55%] -rotate-[105deg] w-[30px] object-contain opacity-[0] duration-500`}
                        src="/images/poppy-foot.png"
                        alt=""
                    />
                    <img
                        id="poppy-foot5"
                        className={`
                        2xl:w-[50px] 2xl:bottom-[28%]
                        absolute bottom-[22%] left-[20%] -rotate-[70deg] w-[30px] object-contain opacity-[0] duration-500`}
                        src="/images/poppy-foot.png"
                        alt=""
                    />
                    <img
                        id="poppy-foot6"
                        className={`
                        2xl:w-[50px] 2xl:bottom-[23%]
                        absolute bottom-[18%] left-[5%] -rotate-[102deg] w-[30px] object-contain opacity-[0] duration-500`}
                        src="/images/poppy-foot.png"
                        alt=""
                    />
                </div>
                <div
                    style={{
                        opacity: loading ? 0 : 1,
                        transform: loading ? 'translateY(20px)' : 'translateY(0)'
                    }}
                    className={`
                    2xl:text-[52px]
                    h-full flex justify-center flex-col gap-2 pb-[150px] text-[40px] font-[800] z-10 transition-all duration-500 whitespace-pre`}
                >
                    <div>{text.section1.catchPhrase1}</div>
                    <div>{text.section1.catchPhrase2}</div>
                    <Link
                        href={`/${lang}/boards`}
                        className={`
                                hover:bg-green-600 hover:text-gray-100
                                active:bg-green-700
                                2xl:text-[20px]
                                py-4 mt-4 bg-[#10b94e] rounded-lg font-[500] text-[18px] text-center text-white
                        `}
                    >
                        {text.Link}
                    </Link>
                </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
                <img className="object-contain" src="/images/main/1-section.png" alt="1-section" />
            </div>
        </div>
    )
}
