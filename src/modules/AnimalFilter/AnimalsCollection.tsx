import { observer } from "mobx-react";
import { animalStore } from "./AnimalStore";
import React from "react";
import {Container, DivLine, Icon, Image, ImageContainer, PartContainer} from "../../pages/Animals.styles";
import { HeaderText, PlainText } from "../../components/text/Text";
import { Variant } from "../../styles/tc/types";
import { buildImageUrl } from "../../common/buildImageUrl";
import { Empty } from "../../components/empty/Empty";
import { preloaderStore } from "../../store/PreloaderStore";
import { Loading } from "../../components/loading/Loading";
import pencil from "../../assets/pencil.svg"
import { useNavigate } from "react-router-dom";
import { animalUpdateStore } from "../AnimalUpdater/AnimalUpdateStore";

export const AnimalsCollection = observer(() => {

    const navigate = useNavigate()

    const handleClick = (index: number) => {
        // @ts-ignore
        animalUpdateStore.setAnimalDto(animalStore.getAnimals().at(index))
        navigate('/animals/update')
    }

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
                        <DivLine>
                            <HeaderText
                                config={{
                                    size: 24,
                                    text: animal.name.toString(),
                                    bold: true,
                                    variant: Variant.PRIMARY,
                                    forcedSmallCase: true,
                                }}
                            />

                            <Icon src={pencil} onClick={() => {
                                handleClick(index)
                            }}/>
                        </DivLine>

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