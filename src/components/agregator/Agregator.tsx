import { Observer } from "mobx-react";
import { AgregatorIcon, StyledAgregator } from "./Agregator.styled";
import {agregatorStore } from "./AgregatorStore";
import { PlainText } from "../text/Text";
import { Variant } from "../../styles/tc/types";
import React from "react";

export function Agregator({ name, action }: { name: string, action: any }) {

    const handleClick = () => {
        agregatorStore.switch()
        action(agregatorStore.sort)
    }

    return (
        <Observer>
            {() => (
                <StyledAgregator onClick={(event) => handleClick()
                }>
                    <PlainText
                        config={{
                            size: 22,
                            text: name,
                            bold: false,
                            variant: Variant.SECONDARY,
                            isOnClick: true
                        }}
                    />
                    <AgregatorIcon src={agregatorStore.agregatorIcon}/>
                </StyledAgregator>
            )}
        </Observer>
    )
}