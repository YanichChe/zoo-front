import { observer } from "mobx-react";
import {
    CenterContainer,
    Image,
    MarginContainer,
    SizeImageContainer,
    SizePartContainer
} from "../../pages/Animals.styles";
import { PlainText } from "../../components/text/Text";
import { Variant } from "../../styles/tc/types";
import React, { useEffect, useState } from "react";
import { Gender } from "../../services/staffService/Staff.types";
import { Button } from "../../components/button/Button";
import styled from "styled-components";
import Select from 'react-select';
import { HTTPClient } from "../../common/HTTPClient";
import ImageUploading from 'react-images-uploading';
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { StaffService } from "../../services/staffService/StaffService";
import { staffUpdateStore } from "./StaffUpdateStore";
import { buildImageUrl } from "../../common/buildImageUrl";

const genders = [
    {value: Gender.MALE, label: 'Мужской'},
    {value: Gender.FEMALE, label: 'Женский'},
    {value: null, label: 'Пол'},
];

export const StaffUpdateWindow = observer(() => {
    const [name, setName] =
        useState(staffUpdateStore.staffDto === null ? '' : staffUpdateStore.staffDto.name)
    const [middleName, setMiddleName] =
        useState(staffUpdateStore.staffDto === null ? '' : staffUpdateStore.staffDto.middleName)
    const [surname, setSurname] =
        useState(staffUpdateStore.staffDto === null ? '' : staffUpdateStore.staffDto.surname)

    const [date, setDate] =
        useState(staffUpdateStore.staffDto === null ? '' : staffUpdateStore.staffDto.birthday)

    const [gender, setGender] =
        useState(staffUpdateStore.staffDto?.gender === 'FEMALE' ? genders.at(1) : genders.at(0))

    const staffService = new StaffService(HTTPClient.getInstance())
    const [responseStatus, setResponseStatus] = useState('ok')

    const [images, setImages] = React.useState([]);

    const navigate = useNavigate()

    // @ts-ignore
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    useEffect(() => {
    }, [responseStatus])

    // @ts-ignore
    const handleGenderChange = (selectedOption) => {
        setGender(selectedOption)
    };

    // @ts-ignore
    const handleChageName = (selectedOption) => {
        setName(selectedOption)
    };

    // @ts-ignore
    const handleChageMiddleName = (selectedOption) => {
        setMiddleName(selectedOption)
    };

    // @ts-ignore
    const handleChageSurname = (selectedOption) => {
        setSurname(selectedOption)
    };


    // @ts-ignore
    const handleDateChange = (selectedOption) => {
        setDate(selectedOption)
    };


    const update = async () => {
        const code = await staffService.update(staffUpdateStore.getStaff()?.id, images, name, middleName, surname,
           date, gender?.value === Gender.MALE? 'мужской' : gender?.value === Gender.FEMALE? 'женский' : '')

        setResponseStatus(code)
        if (code === 'ok') navigate('/staffs')
    }


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
                    {staffUpdateStore.staffDto?.photoId && images.length===0
                        && <Image src={buildImageUrl(staffUpdateStore.staffDto?.photoId)}/>
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
                    <PlainText
                        config={{
                            size: 16,
                            text: 'Имя',
                            bold: false,
                            variant: Variant.PRIMARY,
                            forcedSmallCase: true,
                        }}
                    />

                    <Input
                        type="text"
                        value={name}
                        onChange={e => handleChageName(e.target.value)}
                    />

                    <PlainText
                        config={{
                            size: 16,
                            text: 'Фамилия',
                            bold: false,
                            variant: Variant.PRIMARY,
                            forcedSmallCase: true,
                        }}
                    />

                    <Input
                        type="text"
                        value={surname}
                        onChange={e => handleChageSurname(e.target.value)}
                    />

                    <PlainText
                        config={{
                            size: 16,
                            text: 'Отчество',
                            bold: false,
                            variant: Variant.PRIMARY,
                            forcedSmallCase: true,
                        }}
                    />

                    <Input
                        type="text"
                        value={middleName}
                        onChange={e => handleChageMiddleName(e.target.value)}
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
