import { observer } from "mobx-react";
import { animalStore } from "./AnimalStore";
import React, {useEffect} from "react";
import {Container, DivLine, Icon, Image, ImageContainer, PartContainer} from "../../pages/Animals.styles";
import { HeaderText, PlainText } from "../../components/text/Text";
import { Variant } from "../../styles/tc/types";
import { buildImageUrl } from "../../common/buildImageUrl";
import { Empty } from "../../components/empty/Empty";
import { preloaderStore } from "../../store/PreloaderStore";
import { Loading } from "../../components/loading/Loading";
import pencil from "../../assets/pencil.svg"
import bin from "../../assets/bin.svg"
import { useNavigate } from "react-router-dom";
import { animalUpdateStore } from "../AnimalUpdater/AnimalUpdateStore";
import {Button, Alert} from "@mui/material";
import {AnimalService} from "../../services/animalService/AnimalService";
import {HTTPClient} from "../../common/HTTPClient";

export const AnimalsCollection = observer(() => {

    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const animalService = new AnimalService(HTTPClient.getInstance())

    const handleClick = (index: number) => {
        // @ts-ignore
        animalUpdateStore.setAnimalDto(animalStore.getAnimals().at(index))
        navigate('/animals/update')
    }

    const handleDeleteClick = (index: number) => {
        // @ts-ignore
        animalUpdateStore.setAnimalDto(animalStore.getAnimals().at(index))
        setOpen(true)
    }

    if (preloaderStore.isLoading) return (
        <Loading />
    );

    if (animalStore.getAnimals().length === 0) return (
        <Empty />
    );

    const handleClose = () => {
        setOpen(false)
    };

    const handleYes = () => {
        animalService.delete(animalUpdateStore.getAnimal()?.id).then(() => {
            handleClose();
            window.location.reload();
        })
            .catch(error => {
                handleClose();
                console.error('Ошибка при удалении объекта:', error);
            });
    };

    const handleNo = () => {
        handleClose();
    };

    return (
        <>
            <div style={{
                position: 'absolute',
                zIndex: 999,
                left: '50%', /* расположение по центру */
                transform: 'translateX(-50%)', /* смещение влево на половину ширины */
                bottom: '30px',
            }}>
                {open && (
                    <Alert severity="info" onClose={() => {
                        handleClose()
                    }}>
                        Вы действительно хотите удалить объект?
                        <div style={{marginTop: '10px', textAlign: 'center'}}>
                            <Button onClick={handleYes} variant="contained" color="primary"
                                    style={{marginRight: '10px'}}>
                                Да
                            </Button>
                            <Button onClick={handleNo} variant="contained" color="secondary">
                                Нет
                            </Button>
                        </div>

                    </Alert>
                )}
            </div>

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

                            <Icon src={bin} onClick={() => {
                                handleDeleteClick(index)
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
                                text: 'Статус: ' + (animal.isAlive ? 'живой' : 'не живой'),
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