import { Variant } from '../../styles/tc/types'

export type ButtonUIConfig = {
    disabled?: boolean
    fullWidth?: boolean
    variant?: Variant
}

export type ButtonTextUIConfig = {
    size: number
    variant?: Variant
}

export type ButtonConfig = {
    disabled?: boolean
    fullWidth?: boolean
    onClick?: any
    size: number
    text: string
    variant?: Variant
}