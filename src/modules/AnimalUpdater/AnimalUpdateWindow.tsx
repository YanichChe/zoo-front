import {observer} from "mobx-react";
import {
    CenterContainer,
    DivLine, Image,
    MarginContainer,
    SizeImageContainer, SizePartContainer
} from "../../pages/Animals.styles";
import {HeaderText, PlainText} from "../../components/text/Text";
import {Variant} from "../../styles/tc/types";
import React, {useEffect, useState} from "react";
import {Gender} from "../../services/staffServiceService/Staff.types";
import {Button} from "../../components/button/Button";
import styled from "styled-components";
import Select from 'react-select';
import {AnimalService} from "../../services/animalService/AnimalService";
import {HTTPClient} from "../../common/HTTPClient";
import ImageUploading from 'react-images-uploading';
import {useNavigate} from "react-router-dom";
import {Alert} from "@mui/material";
import {animalUpdateStore} from "./AnimalUpdateStore";
import {animalStore} from "../AnimalFilter/AnimalStore";
import {buildImageUrl} from "../../common/buildImageUrl";

const genders = [
    {value: Gender.MALE, label: 'Мужской'},
    {value: Gender.FEMALE, label: 'Женский'},
];

const statuses = [
    {value: true, label: 'не жив'},
    {value: false, label: 'жив'},
];

export const AnimalUpdateWindow = observer(() => {

    const [name, setName] = useState(animalUpdateStore.animalDto === null ? '' : animalUpdateStore.animalDto.name)
    const [isAlive, setIsAlive] = useState(animalUpdateStore.animalDto?.isAlive === true ? statuses.at(1) : statuses.at(0))
    const [date, setDate] = useState(animalUpdateStore.animalDto === null ? '' : animalUpdateStore.animalDto?.date)
    const [gender, setGender] = useState(animalUpdateStore.animalDto?.gender === 'FEMALE' ? genders.at(1) : genders.at(0))
    const [height, setAnimalHeight] = useState(animalUpdateStore.animalDto === null ? 0 : animalUpdateStore.animalDto?.height)
    const [weight, setAnimalWeight] = useState(animalUpdateStore.animalDto === null ? 0 : animalUpdateStore.animalDto?.weight)
    const animalService = new AnimalService(HTTPClient.getInstance())
    const [responseStatus, setResponseStatus] = useState('ok')

    const [images, setImages] = React.useState([]);

    const navigate = useNavigate()
    const formattedOptions = (animalStore.getAnimalsTitleList() || []).map(title => ({value: title, label: title}));

    // @ts-ignore
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const [animalTitle, setAnimalTitle] = useState(formattedOptions.find(option => option.label === animalUpdateStore.animalDto?.animalAnimalTitle))

    useEffect(() => {

    }, [responseStatus])

    // @ts-ignore
    const handleGenderChange = (selectedOption) => {
        setGender(selectedOption)
    };

    // @ts-ignore
    const handleStatusChange = (selectedOption) => {
        setIsAlive(selectedOption)
    };

    // @ts-ignore
    const handleAnimalTitleChange = (selectedOption) => {
        setAnimalTitle(selectedOption)
    };

    // @ts-ignore
    const handleDateChange = (selectedOption) => {
        setDate(selectedOption)
    };

    const handleHeightChange = (value: number | string) => {
        if (typeof value === 'string') {
            value = parseFloat(value);
        }

        setAnimalHeight(value)
    };

    const handleWeightChange = (value: number | string) => {
        if (typeof value === 'string') {
            value = parseFloat(value);
        }

        setAnimalWeight(value)
    };

    const update = async () => {
        console.log(animalUpdateStore.getAnimal()?.id + ' ' + images  + ' ' + name + ' ' +
            animalTitle?.value  + ' ' +  isAlive?.value + ' ' +  date  + ' ' +  gender?.value  + ' ' +  height  + ' ' +  weight)
        const code = await animalService.update(animalUpdateStore.getAnimal()?.id, images, name,
            animalTitle?.value, isAlive?.value, date, gender?.value, height, weight)

        setResponseStatus(code)
        if (code === 'ok') navigate('/animals')
    }

    // @ts-ignore
    return (
        <>
            <div style={{
                position: 'absolute',
                zIndex: 999,
                left: '50%', /* расположение по центру */
                transform: 'translateX(-50%)', /* смещение влево на половину ширины */
                bottom: '30px',
            }}>
                {responseStatus !== 'ok' && (
                    <Alert severity="warning" onClose={() => {
                        setResponseStatus('ok')
                    }}>
                        {responseStatus}
                    </Alert>
                )}
            </div>
            <CenterContainer>
                <SizeImageContainer>
                    {animalUpdateStore.animalDto?.photoId && images.length===0
                    && <Image src={buildImageUrl(animalUpdateStore.animalDto?.photoId)}/>
                    }

                    <ImageUploading
                        value={images}
                        onChange={onChange}
                        dataURLKey="data_url"
                    >
                        {({
                              imageList,
                              onImageUpload,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps,
                          }) => (
                            <div className="upload__image-wrapper" style={{width: '100%', height: '100%'}}>
                                <button
                                    style={isDragging ? {color: 'red'} : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Нажмите или перетащите сюда
                                </button>
                                &nbsp;
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image['data_url']} alt="" height="90%" width="90%"/>
                                        <div className="image-item__btn-wrapper">
                                            <button onClick={() => onImageUpdate(index)}>Обновить</button>
                                            <button onClick={() => onImageRemove(index)}>Удалить</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                </SizeImageContainer>
                <SizePartContainer>
                    <DivLine>
                        <HeaderText
                            config={{
                                size: 24,
                                text: name,
                                bold: true,
                                variant: Variant.PRIMARY,
                                forcedSmallCase: true,
                            }}
                        />
                    </DivLine>

                    <PlainText
                        config={{
                            size: 16,
                            text: 'Животное: ',
                            bold: false,
                            variant: Variant.PRIMARY,
                            forcedSmallCase: true,
                        }}
                    />

                    <Select options={formattedOptions} menuPortalTarget={document.body}
                            value={animalTitle}
                            onChange={handleAnimalTitleChange}
                            styles={{
                                menuPortal: base => ({...base, zIndex: 99,}),
                                control: base => ({...base, width: '98%'})
                            }}/>

                    <PlainText
                        config={{
                            size: 16,
                            text: 'Статус: ',
                            bold: false,
                            variant: Variant.PRIMARY,
                            forcedSmallCase: true,
                        }}
                    />

                    <Select
                        value={isAlive}
                        onChange={handleStatusChange}
                        options={statuses}

                        menuPortalTarget={document.body}
                        styles={{
                            menuPortal: base => ({...base, zIndex: 99,}),
                            control: base => ({...base, width: '98%'})
                        }}
                    />

                    <PlainText
                        config={{
                            size: 16,
                            text: 'Дата рождения: ',
                            bold: false,
                            variant: Variant.PRIMARY,
                            forcedSmallCase: true,
                        }}
                    />

                    <Input
                        type="date"
                        value={date}
                        onChange={e => handleDateChange(e.target.value)}
                    />


                    <PlainText
                        config={{
                            size: 16,
                            text: 'Гендер: ',
                            bold: false,
                            variant: Variant.PRIMARY,
                            forcedSmallCase: true,
                        }}
                    />

                    <Select
                        value={gender}
                        onChange={handleGenderChange}
                        options={genders}

                        menuPortalTarget={document.body}
                        styles={{
                            menuPortal: base => ({...base, zIndex: 99,}),
                            control: base => ({...base, width: '98%'})
                        }}
                    />

                    <PlainText
                        config={{
                            size: 16,
                            text: 'Рост: ',
                            bold: false,
                            variant: Variant.PRIMARY,
                            forcedSmallCase: true,
                        }}
                    />
                    <Input
                        type="number"
                        min={0}
                        max={2000}
                        step={0.1}
                        value={height}
                        onChange={e => handleHeightChange(e.target.value)}
                    />

                    <PlainText
                        config={{
                            size: 16,
                            text: 'Вес: ',
                            bold: false,
                            variant: Variant.PRIMARY,
                            forcedSmallCase: true,
                        }}
                    />
                    <Input
                        type="number"
                        min={0}
                        max={2000}
                        step={0.1}
                        value={weight}
                        onChange={e => handleWeightChange(e.target.value)}
                    />
                    <MarginContainer>
                        <Button
                            config={{
                                fullWidth: false,
                                size: 12,
                                text: 'Сохранить',
                                variant: Variant.PRIMARY,
                                onClick: update
                            }}
                        />
                    </MarginContainer>
                </SizePartContainer>
            </CenterContainer>
        </>
    )
})
const Input = styled.input`
    border: 1px solid #cccccc;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    background: #ffffff !important;
    outline: none;
    margin: 0;
    height: 40px;
    width: 98%;
    font-size: 18px;
    font-family: Tahoma;
`
