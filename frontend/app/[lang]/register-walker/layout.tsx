import React from 'react'
import { Footer, Header, container } from '@/app/common'
import { LocaleFooter, LocaleHeader, Locales } from '@/app/types/locales'
import { getLocales } from '@/app/utils/getLocales'

interface Props {
    children: React.ReactNode
    params: { lang: Locales }
}

export default async function page({ children, params: { lang } }: Props) {
    const headerText = await getLocales<LocaleHeader>('header', lang)
    const footerText = await getLocales<LocaleFooter>('footer', lang)

    return (
        <div>
            <Header lang={lang} text={headerText} />
            <section className={container.section}>{children}</section>
            <Footer lang={lang} text={footerText} />
        </div>
    )
}
