import { observer } from "mobx-react";
import React from "react";
import { Container, DivLine, Icon, Image, ImageContainer, PartContainer } from "../../pages/Animals.styles";
import { HeaderText, PlainText } from "../../components/text/Text";
import { Variant } from "../../styles/tc/types";
import { buildImageUrl } from "../../common/buildImageUrl";
import { staffStore } from "./StaffStore";
import { preloaderStore } from "../../store/PreloaderStore";
import { Loading } from "../../components/loading/Loading";
import { Empty } from "../../components/empty/Empty";
import { staffUpdateStore } from "../StaffUpdater/StaffUpdateStore";
import { useNavigate } from "react-router-dom";
import pencil from "../../assets/pencil.svg";
import bin from "../../assets/bin.svg";
import { Alert, Button } from "@mui/material";
import { StaffService } from "../../services/staffServiceService/StaffService";
import { HTTPClient } from "../../common/HTTPClient";

export const StaffCollection = observer(() => {

    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const staffService =  new StaffService(HTTPClient.getInstance())
    if (preloaderStore.isLoading) return (
        <Loading/>
    );

    if (staffStore.getStaffs().length === 0) return (
        <Empty/>
    );

    const handleClick = (index: number) => {
        // @ts-ignore
        staffUpdateStore.setStaffDto(staffStore.getStaffs().at(index))
        navigate('/staffs/update')
    }

    const handleDeleteClick = (index: number) => {
        // @ts-ignore
        staffUpdateStore.setStaffDto(staffStore.getStaffs().at(index))
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    };

    const handleYes = () => {
        console.log(staffUpdateStore.getStaff()?.id)
        staffService.delete(staffUpdateStore.getStaff()?.id).then(() => {
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

            {staffStore.getStaffs().map((staff, index) => (
                <Container key={index}>
                    <ImageContainer>
                        <Image src={buildImageUrl(staff.photoId)}/>
                    </ImageContainer>
                    <PartContainer>
                        <DivLine>
                            <HeaderText
                                config={{
                                    size: 24,
                                    text: staff.surname.toString() + ' ' + staff.name.toString() + ' ' + staff.middleName.toString(),
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
                                text: 'Дата рождения: ' + staff.birthday.toString(),
                                bold: false,
                                variant: Variant.PRIMARY,
                                forcedSmallCase: true,
                            }}
                        />

                        <PlainText
                            config={{
                                size: 16,
                                text: 'Гендер: ' + (staff.gender === 'MALE' ? 'мужской' : 'женский'),
                                bold: false,
                                variant: Variant.PRIMARY,
                                forcedSmallCase: true,
                            }}
                        />

                        <PlainText
                            config={{
                                size: 16,
                                text: 'Категория сотрудника: ' + (staff.staffType === null ? 'Неизвестно' : staff.staffType),
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