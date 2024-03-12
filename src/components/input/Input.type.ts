import React from 'react'

import { Variant } from '../../styles/tc/types'

export enum InputType {
    PASSWORD = 'password',
    TEXT = 'text',
}

export type InputUIConfig = {
    inputSize: number
    variant?: Variant
}

export type InputConfig = {
    inputSize: number
    name?: string
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void
    type?: InputType
    value?: string
    variant?: Variant
}

export type InputWithLabelConfig = {
    inputSize: number
    label: string
    labelSize: number
    name?: string
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void
    type?: InputType
    value?: string
    variant?: Variant
}

export type InputWithLabelAndErrorConfig = {
    error: string
    errorSize: number
    inputSize: number
    label: string
    labelSize: number
    name?: string
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void
    type?: InputType
    value?: string
    variant?: Variant
}