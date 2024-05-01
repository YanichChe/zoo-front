import { observer } from "mobx-react";
import React from "react";
import { Container, Image, ImageContainer, PartContainer } from "../../pages/Animals.styles";
import { HeaderText, PlainText } from "../../components/text/Text";
import { Variant } from "../../styles/tc/types";
import { buildImageUrl } from "../../common/buildImageUrl";
import { staffStore } from "./StaffStore";
import { preloaderStore } from "../../store/PreloaderStore";
import { Loading} from "../../components/loading/Loading";
import { Empty } from "../../components/empty/Empty";

export const StaffCollection = observer(() => {

    if (preloaderStore.isLoading) return (
        <Loading />
    );

    if (staffStore.getStaffs().length === 0) return (
        <Empty />
    );

    return (
        <>
            {staffStore.getStaffs().map((staff, index) => (
                <Container key={index}>
                    <ImageContainer>
                        <Image src={buildImageUrl(staff.photoId)}/>
                    </ImageContainer>
                    <PartContainer>
                        <HeaderText
                            config={{
                                size: 24,
                                text: staff.surname.toString() + ' ' + staff.name.toString() + ' ' + staff.middleName.toString() ,
                                bold: true,
                                variant: Variant.PRIMARY,
                                forcedSmallCase: true,
                            }}
                        />
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
                                text: 'Категория сотрудника: ' + staff.staffType,
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