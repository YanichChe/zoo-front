import { useState } from 'react'

import { Color } from '../../styles/tc/colors'
import { PlainText } from '../text/Text'
import { DivLine, FormDiv, Img, StyledInput, getErrorVariantByVariant, getLabelVariantByVariant } from './Input.styled'
import { InputConfig, InputType, InputWithLabelAndErrorConfig, InputWithLabelConfig } from './Input.type'

export function Input({ config }: { config: InputConfig }) {
    const [changedType, setChangedType] = useState(config?.type || InputType.TEXT)
    const handleChangeType = () => setChangedType(changedType === InputType.PASSWORD ? InputType.TEXT : InputType.PASSWORD)

    return (
        <DivLine color={Color.INPUT_BACKGROUND_PRIMARY}>
            <StyledInput
                config={config}
                onBlur={config.onBlur}
                onChange={config.onChange}
                onFocus={config.onFocus}
                type={changedType}
                value={config.value}
            />
        </DivLine>
    )
}

export function InputWithLabel({ config }: { config: InputWithLabelConfig }) {
    return (
        <FormDiv>
            <PlainText
                config={{
                    size: config.labelSize,
                    text: config.label,
                    variant: getLabelVariantByVariant(config.variant),
                }}
            />
            <Input config={config} />
        </FormDiv>
    )
}

export function InputWithLabelAndError({ config }: { config: InputWithLabelAndErrorConfig }) {
    return (
        <FormDiv>
            <PlainText
                config={{
                    size: config.labelSize,
                    text: config.label,
                    variant: getLabelVariantByVariant(config.variant),
                }}
            />
            <Input config={config} />
            {config.error?.length > 0 && (
                <DivLine color={'transparent'}>
                    <PlainText
                        config={{
                            size: config.errorSize,
                            text: config.error,
                            variant: getErrorVariantByVariant(config.variant),
                        }}
                    />
                </DivLine>
            )}
        </FormDiv>
    )
}