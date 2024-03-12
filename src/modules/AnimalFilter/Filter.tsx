import React, {useEffect, useState} from 'react'
import { Observer } from 'mobx-react'
import { Input } from '../../components/input/Input'
import { InputType } from '../../components/input/Input.type'
import { Variant } from '../../styles/tc/types'
import { Icon, SearchContainer } from '../../pages/Animals.styles'
import lupa from '../../assets/Лупа.svg'
import { Select } from '../../components/selector/Select'
import { Agregator } from '../../components/agregator/Agregator'
import { animalFilter } from './AnimalFilter'
import {Gender, GetAnimalListParameters, GetAnimalListParametersCount} from '../../services/animalService/Animal.types'
import { animalStore } from './AnimalStore'
import { AnimalService } from '../../services/animalService/AnimalService'
import { HTTPClient } from '../../common/HTTPClient'
import { preloaderStore } from '../../store/PreloaderStore'
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {staffFilter} from "../StaffFilter/StaffFilter";

export default function Filter() {

    const [s, setS] = useState(animalFilter.status)
    const [g, setG] = useState(animalFilter.gender)
    const [n, setN] = useState(animalFilter.nameOrder)
    const [p, setP] = useState(0)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        animalFilter.setPage(value - 1)
        setP(value - 1)
    };

    const handleFilterChange = async () => {
        const filters = animalFilter.getFilters()
        const options: GetAnimalListParameters = {
            ...filters,
            page: p,
            size: animalFilter.size
        }

        const options_: GetAnimalListParametersCount = {
            ...filters,
        }

        const animalDtos = await animalService.getListAnimals(options)
        const count = await animalService.getListAnimalsCount(options_)
        animalStore.setAnimalsDto(animalDtos)
        animalStore.setAnimalsCount(count)
    }

    useEffect(() => {
        preloaderStore.startLoading()
        handleFilterChange().then(() => preloaderStore.endLoading())
    }, [s, g, n, p])

    const genders = ['пол', 'мужской', 'женский']
    const statuses = ['статус', 'жив', 'не жив']
    const animalService = new AnimalService(HTTPClient.getInstance())

    const handleStatus = (value: string) => {
        staffFilter.setPage(0)
        animalFilter.setStatus(value)
        setP(0)
        setS(value)
    }

    const handleGender = (value: Gender) => {
        staffFilter.setPage(0)
        animalFilter.setGender(value)
        setP(0)
        setG(value)
    }

    const handleSort = (value: string) => {
        animalFilter.setNameOrder(value)
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
                        defaultValue={animalFilter.gender}
                        label=''
                        options={genders}
                        variant={Variant.SECONDARY}
                    />
                    <Select
                        action={handleStatus}
                        defaultValue={animalFilter.status}
                        label=''
                        options={statuses}
                        variant={Variant.SECONDARY}
                    />

                    <Agregator name={'имя'} action={handleSort}/>
                </SearchContainer>
                    <Pagination
                        count={Math.ceil(animalStore.animalsCount / animalFilter.size)}
                        onChange={handleChange}
                        defaultValue={animalFilter.page + 1}
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
