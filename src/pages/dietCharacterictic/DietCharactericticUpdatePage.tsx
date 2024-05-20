import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DietCharacteristicInput } from '../../services/dietCharacteristicService/DietCharacteristic.types';
import { HTTPClient } from '../../common/HTTPClient';
import Select from 'react-select';
import { DietCharacteristicService } from '../../services/dietCharacteristicService/DietCharacteristicService';
import { Alert } from '@mui/material';
import { dietCharacteristicStore } from './dietCharactericticStore';
import { Observer } from 'mobx-react';
import { PhysicalStateService } from '../../services/physicalState/PhysicalStateService';
import { AnimalService } from '../../services/animalService/AnimalService';
import { SeasonService } from '../../services/seasonService/SeasonService';

const Form = styled.form`
  margin: auto auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 50%;
  background-color: #f9f9f9;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Container = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const DietCharacteristicUpdatePage: React.FC = () => {
  const [formData, setFormData] = useState<DietCharacteristicInput>({
    age: dietCharacteristicStore.getAge(),
    physicalState: '',
    season: '',
    animal: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  interface Option {
    value: string;
    label: string;
  }

  const physicalStateService = new PhysicalStateService(HTTPClient.getInstance())
  const animalService = new AnimalService(HTTPClient.getInstance())
  const seasonService = new SeasonService(HTTPClient.getInstance())
  const dietCharacteristicService = new DietCharacteristicService(HTTPClient.getInstance())

  const [physicalStateOptions, setOptions] = useState<Option[]>([]);
  const [animalOptions, setAnimalOptions] = useState<Option[]>([]);
  const [seasonOptions, setSeasonOptions] = useState<Option[]>([]);

  const [responseStatus, setResponseStatus] = useState('')

  const [physicalStateOption, setOption] = useState<Option>();
  const [animalOption, setAnimalOption] = useState<Option>();
  const [seasonOption, setSeasonOption] = useState<Option>();


  const handleSelectChange = (selectedOption: Option | null, actionMeta: { name: string }) => {
    if (actionMeta.name === 'physicalState' && selectedOption !== null) setOption(selectedOption)
    if (actionMeta.name === 'animal' && selectedOption !== null) setAnimalOption(selectedOption)
    if (actionMeta.name === 'season' && selectedOption !== null) setSeasonOption(selectedOption)
    console.log(actionMeta.name)
    if (selectedOption) {
      setFormData((prev) => ({
        ...prev,
        [actionMeta.name]: selectedOption.value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [actionMeta.name]: '',
      }));
    }
  };

  const handleFilterChange = async () => {
      const list = await animalService.getList()
      const formattedOptions = (list || []).map(animal => ({value: animal.self, label: animal.animalTitle}));

      const seasonList = await seasonService.getList()
      const seasonFormattedOptions = (seasonList || []).map(season => ({value: season.self, label: season.season}));

      const physicalStatelist = await physicalStateService.getList()
      const physicalStateFormattedOptions = (physicalStatelist || []).map(physicalState => ({value: physicalState.self, label: physicalState.state}));
     


      if (formattedOptions.length !== 0) {
        const a = formattedOptions.find(option => option.label === dietCharacteristicStore.getAnimal())
        const b = seasonFormattedOptions.find(option => option.label === dietCharacteristicStore.getSeason())
        const c = physicalStateFormattedOptions.find(option => option.label === dietCharacteristicStore.getPhysicalState())

        setAnimalOption(a)
        setSeasonOption(b)
        setOption(c)
        // @ts-ignore
        if (a !== undefined) handleSelectChange(a, { name: 'animal' })
        
        // @ts-ignore
        if (b !== undefined) handleSelectChange(b, { name: 'season' })

        // @ts-ignore
        if (c !== undefined) handleSelectChange(c, { name: 'physicalState' })
      }

      setAnimalOptions(formattedOptions)
      setSeasonOptions(seasonFormattedOptions)
      setOptions(physicalStateFormattedOptions)
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const code = await dietCharacteristicService.update(formData, dietCharacteristicStore.getSelf())
    setResponseStatus(code)
  };

  useEffect(() => {
    handleFilterChange();
  }, []);

  return (
    <Observer>
    {() => (
    <>
     <div style={{
                position: 'absolute',
                zIndex: 999,
                left: '50%', /* расположение по центру */
                transform: 'translateX(-50%)', /* смещение влево на половину ширины */
                bottom: '30px',
            }}>
                {responseStatus !== '' && responseStatus !== 'ok'  && (
                    <Alert severity="warning" onClose={() => {
                        setResponseStatus('')
                    }}>
                        {responseStatus}
                    </Alert>
                )}
            </div>

            <div style={{
                position: 'absolute',
                zIndex: 999,
                left: '50%', /* расположение по центру */
                transform: 'translateX(-50%)', /* смещение влево на половину ширины */
                bottom: '30px',
            }}>
                {responseStatus === 'ok' && (
                    <Alert severity="success" onClose={() => {
                        setResponseStatus('')
                    }}>
                        {responseStatus}
                    </Alert>
                )}
            </div>
      <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="dateEnd">Возраст</Label>
          <Input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="physicalState">Состояние</Label>
          <Select value={physicalStateOption} onChange={(option) => 
          handleSelectChange(option, { name: 'physicalState' })} name="physicalState" options={physicalStateOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="season">Сезон</Label>
          <Select value={seasonOption} onChange={(option) => 
          handleSelectChange(option, { name: 'season' })} options={seasonOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="animal">Животное</Label>
          <Select value={animalOption} onChange={(option) => 
          handleSelectChange(option, { name: 'animal' })} options={animalOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>
        <Button type="submit">Обновить характеристику</Button>
      </Form>
      </Container>
    </>
    )}
    </Observer>
  );
};

export default DietCharacteristicUpdatePage;
