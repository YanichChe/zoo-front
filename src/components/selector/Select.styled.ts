import styled from 'styled-components'
import { Variant } from '../../styles/tc/types'
import arrowDownIcon from '../../assets/arrow-down.svg'
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

export const StyledSelect = styled.select<{ textColor: Variant; variant: Variant }>`
    position: relative;
    display: inline-flex;
    align-items: center;
    height: fit-content;
    border-radius: 20px;
    width: fit-content;
    min-width: 200px;
    box-sizing: border-box;
    padding-top: 14px;
    padding-bottom: 14px;
    padding-left: 14px;
    font-size: 22px;
    margin: 0px 10px;
    line-height: 20px;
    font-weight: 300;
    letter-spacing: 0.48px;
    color: ${(props) => getColorByVariant(props.textColor || Variant.EXTRA)};
    border: 1px solid ${(props) => getColorByVariant(props.variant || Variant.EXTRA)};
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-shadow: 0px 2px ${Color.SHADOW};
    
    background-image: url(${arrowDownIcon});
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 20px;
    background-color: white;

    &:focus {
        outline: none;
    }
`

export const SelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: fit-content;
`

export const SelectLabel = styled.label<{ variant: Variant }>`
    font-size: 22px;
    color: ${(props) => getColorByVariant(props.variant)};
`

