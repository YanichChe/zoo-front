import styled from 'styled-components'

import {Color} from '../../styles/tc/colors'
import {Variant} from '../../styles/tc/types'
import {TextAlign, TextUIConfig} from './Text.types'

function getPlainTextColorByVariant(variant?: Variant): string {
    const defaultColor = Color.PLAIN_TEXT_PRIMARY

    const colorMap: Map<Variant, Color> = new Map<Variant, Color>([
        [Variant.PRIMARY, Color.PLAIN_TEXT_PRIMARY],
        [Variant.SECONDARY, Color.PLAIN_TEXT_SECONDARY],
    ])

    return variant && colorMap.has(variant) ? colorMap.get(variant) || defaultColor : defaultColor
}

function getHeaderTextColorByVariant(variant?: Variant): string {
    const defaultColor = Color.HEADER_TEXT_PRIMARY

    const colorMap: Map<Variant, Color> = new Map<Variant, Color>([
        [Variant.PRIMARY, Color.HEADER_TEXT_PRIMARY],
        [Variant.SECONDARY, Color.HEADER_TEXT_SECONDARY],
    ])

    return variant && colorMap.has(variant) ? colorMap.get(variant) || defaultColor : defaultColor
}

const StyledText = styled.span<{ config: TextUIConfig }>`
    position: relative;
    z-index: 1;
    font-size: ${(props) => `${props.config.size}px`};
    line-height: ${(props) => `${props.config.size + 5}px`};
    font-weight: ${(props) => (props.config.bold ? 700 : 400)};
    text-decoration: ${(props) => (props.config.underlined ? 'underline' : 'none')};
    text-underline-offset: 0;
    text-underline-position: under;
    text-transform: ${(props) =>
            (props.config.forcedSmallCase ? ('uppercase') : ('none'))};
    text-decoration-thickness: ${(props) =>
            (props.config.bold ? (props.config.size > 20 ? '4px' : '2px') : props.config.size > 20 ? '2px' : '1px')};
    word-wrap: break-word;
    overflow-wrap: break-word;
    text-align: ${(props) => props.config.align || TextAlign.LEFT};
`

export const StyledPlainText = styled(StyledText)`
    color: ${(props) => getPlainTextColorByVariant(props.config.variant)};
    text-decoration-color: ${(props) => getPlainTextColorByVariant(props.config.variant)};
    cursor: ${(props) => (props.config.isOnClick ? 'pointer' : 'auto')};
`

export const StyledHeaderText = styled(StyledText)`
    color: ${(props) => getHeaderTextColorByVariant(props.config.variant)};
    text-decoration-color: ${(props) => getHeaderTextColorByVariant(props.config.variant)};
`