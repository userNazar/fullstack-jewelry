import SearchingTitle from '@/components/search/SearchingTitle';
import React, { ReactNode } from 'react'

interface TemplateProps {
    children: ReactNode;
}

const Template = ({ children }: TemplateProps) => {
    return (
        <>
            <SearchingTitle />
            {children}
        </>
    )
}

export default Template