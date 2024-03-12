import {Observer} from 'mobx-react'
import {useEffect, useState} from 'react'
import {SelectLabel, SelectWrapper, StyledSelect} from './Select.styled'
import {Variant} from '../../styles/tc/types'

// eslint-disable-next-line max-len
export function Select({
                           action,
                           defaultValue,
                           label,
                           options,
                           variant,
                       }: {
    action: any
    defaultValue?: string
    label: string
    options: string[]
    variant: Variant
}) {
    const [selectedOption, setSelectedOption] = useState(defaultValue || undefined)
    const notChoice = Variant.EXTRA
    const choice = Variant.SECONDARY

    useEffect(() => {
        if (!defaultValue) {
            return
        }
        setSelectedOption(defaultValue)
    }, [])

    const getTextColor = () => {
        if (selectedOption === 'не определен') {
            return notChoice
        }
        return choice
    }

    const onSelectedOption = (value: string) => {
        action(value)
        setSelectedOption(value)
    }

    return (
        <Observer>
            {() => (
                <SelectWrapper>
                    <SelectLabel variant={variant}>{label}</SelectLabel>
                    <StyledSelect
                        onChange={(event) => onSelectedOption(event.target.value)}
                        textColor={getTextColor()}
                        value={selectedOption}
                        variant={variant}

                    >
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </StyledSelect>
                </SelectWrapper>
            )}
        </Observer>
    )
}
