import { observer } from "mobx-react";
import { animalStore } from "./AnimalStore";
import React from "react";
import { Container, Image, ImageContainer, PartContainer } from "../../pages/Animals.styles";
import { HeaderText, PlainText } from "../../components/text/Text";
import { Variant } from "../../styles/tc/types";
import { buildImageUrl } from "../../common/buildImageUrl";
import { Empty } from "../../components/empty/Empty";
import { preloaderStore } from "../../store/PreloaderStore";
import {Loading} from "../../components/loading/Loading";

export const AnimalsCollection = observer(() => {

    if (preloaderStore.isLoading) return (
        <Loading />
    );

    if (animalStore.getAnimals().length === 0) return (
        <Empty />
    );
    return (
        <>
            {animalStore.getAnimals().map((animal, index) => (
                <Container key={index}>
                    <ImageContainer>
                        <Image src={buildImageUrl(animal.photoId)}/>
                    </ImageContainer>
                    <PartContainer>
                        <HeaderText
                            config={{
                                size: 24,
                                text: animal.name.toString(),
                                bold: true,
                                variant: Variant.PRIMARY,
                                forcedSmallCase: true,
                            }}
                        />

                        <PlainText
                            config={{
                                size: 16,
                                text: 'Животное: ' + animal.animalAnimalTitle,
                                bold: false,
                                variant: Variant.PRIMARY,
                                forcedSmallCase: true,
                            }}
                        />
                        <PlainText
                            config={{
                                size: 16,
                                text: 'Статус: ' + (animal.isAlive? 'живой' : 'не живой'),
                                bold: false,
                                variant: Variant.PRIMARY,
                                forcedSmallCase: true,
                            }}
                        />
                        <PlainText
                            config={{
                                size: 16,
                                text: 'Дата рождения: ' + animal.date.toString(),
                                bold: false,
                                variant: Variant.PRIMARY,
                                forcedSmallCase: true,
                            }}
                        />

                        <PlainText
                            config={{
                                size: 16,
                                text: 'Гендер: ' + (animal.gender === 'MALE' ? 'мужской' : 'женский'),
                                bold: false,
                                variant: Variant.PRIMARY,
                                forcedSmallCase: true,
                            }}
                        />
                        <PlainText
                            config={{
                                size: 16,
                                text: 'Рост: ' + animal.height.toString(),
                                bold: false,
                                variant: Variant.PRIMARY,
                                forcedSmallCase: true,
                            }}
                        />
                        <PlainText
                            config={{
                                size: 16,
                                text: 'Вес: ' + animal.weight.toString(),
                                bold: false,
                                variant: Variant.PRIMARY,
                                forcedSmallCase: true,
                            }}
                        />
                    </PartContainer>
                </Container>
            ))}
        </>
    );
})