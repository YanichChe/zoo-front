import { Variant } from '../../styles/tc/types'

export enum TextAlign {
    CENTER = 'center',
    LEFT = 'left',
}

export type TextUIConfig = {
    align?: TextAlign
    hover?: boolean,
    bold?: boolean
    size: number
    underlined?: boolean
    variant?: Variant,
    isOnClick?: boolean,
    forcedSmallCase?: boolean,

}

export type TextConfig = {
    align?: TextAlign
    bold?: boolean
    hover?: boolean,
    onClick?: any
    size: number
    text: string
    underlined?: boolean
    variant?: Variant
    forcedSmallCase?: boolean,
    isOnClick?: boolean,
}