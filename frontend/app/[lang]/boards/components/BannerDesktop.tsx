import React from 'react'
import { D2CodingBold, D2CodingLight } from '@/app/fonts'

export function BannerDesktop() {
    return (
        <div className="xl:flex relative w-full h-[350px] justify-center px-[300px] bg-[#69d28c] overflow-hidden hidden">
            <div className="relative w-[904px] h-full select-none">
                <div className={`absolute left-[70px] top-[50%] -translate-y-1/2 z-30 py-12`}>
                    <div className={`text-[38px] font-[800] text-white`}>동네에서 만나는</div>
                    <div className={`text-[34px] font-[800] text-white`}>나만의 반려견 산책인</div>
                    <div className="mt-[20px] text-[18px]">
                        <div className={`text-[18px] font-[500] text-white`}>우리 반려견들에게 필요한 산책인들과</div>
                        <div className={`text-[18px] font-[500] text-white`}>다양한 커넥션을 만들어보세요</div>
                    </div>
                </div>
                <img className="absolute top-[150px] right-[230px] w-[100px] z-10" src="/dog.png" alt="" />
                <img className="absolute top-[40px] right-[50px] w-[200px] -rotate-12 z-10" src="/leg.png" alt="" />
                <div className="absolute top-[10px] right-[30px] w-[230px] h-[230px] bg-[#d08a64] rounded-full" />
                <div className="absolute top-[20px] right-[50px] w-[900px] h-[900px] bg-[#3d8345] rounded-full" />
                <div className="absolute top-[10px] right-[240px] w-[200px] h-[200px] bg-[#dcfbde] rounded-full" />
                <div className="absolute top-[80px] right-[0px] w-[420px] h-[400px] bg-[#32ac40] rounded-full" />
                <div className="absolute top-[230px] right-[50px] w-[300px] h-[100px] bg-[#1b5c23] rounded-[50%]" />
            </div>
        </div>
    )
}
