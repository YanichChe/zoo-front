import { StyledButton, StyledButtonText } from './Button.styles'
import { ButtonConfig } from './Button.types'

export function Button({ config }: { config: ButtonConfig }) {
    return (
        <StyledButton config={config} disabled={config.disabled} onClick={config.onClick}>
            <StyledButtonText config={config}>{config.text}</StyledButtonText>
        </StyledButton>
    )
}