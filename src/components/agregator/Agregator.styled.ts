import styled from 'styled-components'
import { Variant } from '../../styles/tc/types'
import { Color } from "../../styles/tc/colors";

function getColorByVariant(variant: Variant): string {
    const defaultColor = Color.INPUT_BACKGROUND_PRIMARY
    const colorsMap: Map<Variant, string> = new Map([
        [Variant.EXTRA, Color.SELECT],
        [Variant.PRIMARY, Color.SELECT],
        [Variant.SECONDARY, Color.SELECT],
    ])

    return colorsMap.get(variant) || defaultColor
}

export const AgregatorIcon = styled.img`
    height: 19px;
    margin-left: 10px;
    padding: 0;
`

export const StyledAgregator = styled.div<{ }>`
    position: relative;
    display: inline-flex;
    align-items: center;
    height: fit-content;
    border-radius: 20px;
    width: fit-content;
    box-sizing: border-box;
    padding-top: 11px;
    padding-bottom: 11px;
    padding-left: 14px;
    padding-right: 14px;
    font-size: 10px;
    margin: 0px 10px;
    line-height: 20px;
    font-weight: 300;
    letter-spacing: 0.48px;
    color: ${(props) => getColorByVariant(Variant.EXTRA)};
    border: 1px solid ${(props) => getColorByVariant(Variant.EXTRA)};
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-shadow: 0px 2px ${Color.SHADOW};
    &:focus {
        outline: none;
    }
`