import { StyledHeaderText, StyledPlainText } from './Text.styled'
import { TextConfig } from './Text.types'

export function PlainText({ config }: { config: TextConfig }) {
    return <StyledPlainText config={config} onClick={config.onClick} >{config.text}</StyledPlainText>
}

export function HeaderText({ config }: { config: TextConfig }) {
    return <StyledHeaderText config={config} onClick={config.onClick}>{config.text}</StyledHeaderText>
}