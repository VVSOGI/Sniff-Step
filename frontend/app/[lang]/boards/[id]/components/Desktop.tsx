import React from 'react'
import { container } from '@/app/common'
import { Locales } from '@/app/types/locales'
import { FaThumbsUp } from 'react-icons/fa6'
import { changeDayToKorean, changeTimeToKorean } from '@/app/utils/changeDateUtils'
import { Board } from '@/app/types/board'
import Link from 'next/link'

interface Props {
    lang: Locales
    board: Board
    dates: string[]
}

export function Desktop({ lang, board, dates }: Props) {
    const {
        title, //
        nickname,
        address,
        description,
        imageUrl,
        profileUrl,
        availableDate,
        availableTime,
        ownerSatisfaction,
        createdAt
    } = board

    return (
        <div className={container.main.desktop}>
            <div>
                <div className="w-full h-[500px] flex justify-center items-center mb-4 rounded-lg">
                    <img className="w-[500px] h-full object-cover rounded-lg" src={imageUrl} alt={imageUrl} />
                </div>
                <div className="w-full flex justify-between mb-8 pb-4 border-b select-none">
                    <div className="flex items-center gap-4">
                        <img className="w-[48px] h-[48px] border rounded-full" src={profileUrl || '/logo1-removebg-preview.png'} />
                        <div>
                            <div className="text-[18px] font-[600]">{nickname}</div>
                            <div className="text-[14px]">{address}</div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`
                                hover:bg-gray-100
                                active:bg-gray-200
                                flex gap-4 items-center px-4 py-2 border rounded-md cursor-pointer`}
                        >
                            <div className="flex gap-2 items-center cursor-pointer">
                                <FaThumbsUp />
                                {ownerSatisfaction}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-8">
                    <div className="text-[32px] font-[500]">{title}</div>
                    <div className="text-[14px] text-gray-400">{createdAt}</div>
                </div>
                <div className="flex items-center gap-4 mb-12">
                    <div className="text-[24px] font-[500]">1. 활동할 주소)</div>
                    <div className="text-[24px] font-[500] mt-[4px] border-b-2 border-red-600 leading-7">{address}</div>
                </div>
                <div className="flex flex-col gap-4 mb-12">
                    <div className="flex gap-4 items-center ">
                        <div className="text-[24px] font-[500]">2. 산책 가능한 시간대)</div>
                        <div className="text-[24px] font-[500] mt-[4px] border-b-2 border-red-600 leading-7">
                            {changeTimeToKorean(lang, availableTime)}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        {dates.map((date) => {
                            return (
                                <div className="flex items-center" key={date}>
                                    <input type="checkbox" defaultChecked={availableDate.includes(date)} disabled />
                                    <div>{changeDayToKorean(lang, date)}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="mb-12">
                    <div className="flex items-center justify-between text-[18px] font-[500] mb-4">
                        <div className="text-[24px] font-[500]">3. 견주님들께 산책에 대한 경험 및 자세한 플랜을 설명해보세요!</div>
                    </div>
                    <div className="w-full h-full min-h-[300px] p-4 border rounded-md resize-none outline-none whitespace-pre-wrap">
                        {description}
                    </div>
                </div>
            </div>
            <Link
                href={`/${lang}/boards`}
                className={`
                            hover:bg-gray-100
                            active:bg-gray-200
                            w-full flex gap-4 items-center justify-center py-4 border rounded-md cursor-pointer
                        `}
            >
                <div className="flex gap-2 items-center cursor-pointer font-[700]">목록으로 돌아가기</div>
            </Link>
        </div>
    )
}
