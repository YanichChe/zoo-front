import React, {useEffect, useState} from 'react'
import { Observer } from 'mobx-react'
import { Input } from '../../components/input/Input'
import { InputType } from '../../components/input/Input.type'
import { Variant } from '../../styles/tc/types'
import { Icon, SearchContainer } from '../../pages/Animals.styles'
import lupa from '../../assets/Лупа.svg'
import { Select } from '../../components/selector/Select'
import { Agregator } from '../../components/agregator/Agregator'
import { HTTPClient } from '../../common/HTTPClient'
import { preloaderStore } from '../../store/PreloaderStore'
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { staffFilter } from "./StaffFilter";
import { StaffService } from "../../services/staffService/StaffService";
import { staffStore } from "./StaffStore";
import { Gender, GetStaffListParameters, GetStaffListParametersCount } from "../../services/staffService/Staff.types";
import { animalFilter } from "../AnimalFilter/AnimalFilter";

export default function Filter() {
    
    const [g, setG] = useState(staffFilter.gender)
    const [n, setN] = useState(staffFilter.nameOrder)
    const [p, setP] = useState(0)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        staffFilter.setPage(value - 1)
        setP(value - 1)
    };

    const handleFilterChange = async () => {
        const filters = staffFilter.getFilters()
        const options: GetStaffListParameters = {
            ...filters,
            page: p,
            size: staffFilter.size
        }

        const options_: GetStaffListParametersCount = {
            ...filters,
        }

        const animalDtos = await staffService.getListStaffs(options)
        const count = await staffService.getListStaffsCount(options_)

        staffStore.setStaffsCount(count)
        staffStore.setStaffsDto(animalDtos)
    }

    useEffect(() => {
        preloaderStore.startLoading()
        handleFilterChange().then(() => preloaderStore.endLoading())
    }, [g, n, p])

    const genders = ['пол', 'мужской', 'женский']
    const staffService = new StaffService(HTTPClient.getInstance())
    
    const handleGender = (value: Gender) => {
        staffFilter.setGender(value)
        staffFilter.setPage(0)
        setG(value)
        setP(0)
    }

    const handleSort = (value: string) => {
        staffFilter.setNameOrder(value)
        staffFilter.setPage(0)
        setN(value)
        setP(0)
    }

    return (
        <Observer>
            {() => (
                <>
                    <SearchContainer>
                        <Input
                            config={{
                                inputSize: 18,
                                type: InputType.TEXT,
                                variant: Variant.PRIMARY,
                            }}
                        />
                        <Icon src={lupa} onClick={console.log}/>
                        <Select
                            action={handleGender}
                            // @ts-ignore
                            defaultValue={staffFilter.gender}
                            label=''
                            options={genders}
                            variant={Variant.SECONDARY}
                        />

                        <Agregator name={'имя'} action={handleSort}/>
                    </SearchContainer>
                    <Pagination
                        count={Math.ceil(staffStore.animalsCount / animalFilter.size)}
                        onChange={handleChange}
                        defaultValue={p}
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{previous: ArrowBackIcon, next: ArrowForwardIcon}}
                                {...item}
                            />
                        )}
                    />
                </>
            )}
        </Observer>
    )}
