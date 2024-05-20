import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HTTPClient } from '../../common/HTTPClient';
import Select from 'react-select';
import { Alert } from '@mui/material';
import { Observer } from 'mobx-react';
import { OffspringFactorInput } from '../../services/offspringFactorService/OffspringFactor.types';
import { AnimalService } from '../../services/animalService/AnimalService';
import { PhysicalStateService } from '../../services/physicalState/PhysicalStateService';
import { offspringFactorsStore } from './offspringFactorsStore';
import { OffspringFactorService } from '../../services/offspringFactorService/OffspringFactorService';

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
const OffspringFactorsUpdatePage: React.FC = () => {
  const [formData, setFormData] = useState<OffspringFactorInput>({
    animal: '',
    physicalState:'',
    ageStart: offspringFactorsStore.getAgeStart(),
    ageEnd : offspringFactorsStore.getAgeEnd()
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

  const animalService = new AnimalService(HTTPClient.getInstance())
  const physicalStateService = new PhysicalStateService(HTTPClient.getInstance())
  const offspringFactorService = new OffspringFactorService(HTTPClient.getInstance())
  
  const [animalOptions, setAnimalOptions] = useState<Option[]>([]);
  const [physicalStatesOptions, setphysicalStatesOptions] = useState<Option[]>([]);
  
  const [responseStatus, setResponseStatus] = useState('')

  const [animalOption, setAnimalOption] = useState<Option>();
  const [physicalStatesOption, setphysicalStatesOption] = useState<Option>();


  const handleSelectChange = (selectedOption: Option | null, actionMeta: { name: string }) => {
    if (actionMeta.name === 'animal' && selectedOption !== null) setAnimalOption(selectedOption)
    else if (actionMeta.name === 'physicalState' && selectedOption !== null) setphysicalStatesOption(selectedOption)
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
      const animalList = await animalService.getList()
      const animalFormattedOptions = (animalList || []).map(animal => ({value: animal.self, label: animal.animalTitle}));

      const physicalStatesList = await physicalStateService.getList()
      const physicalStatesFormattedOptions = (physicalStatesList || []).map(physicalState => ({value: physicalState.self, label: physicalState.state}));
 
      if (animalFormattedOptions.length !== 0) {
        const animal = animalFormattedOptions.find(option => option.label === offspringFactorsStore.getAnimalId())
        const physicalState = physicalStatesFormattedOptions.find(option => option.label === offspringFactorsStore.getPhysicalStateId())
    
        // @ts-ignore
        if (animal !== undefined) handleSelectChange(animal, { name: 'animal' })
        
        // @ts-ignore
        if (physicalState !== undefined) handleSelectChange(physicalState, { name: 'physicalState' })

        setAnimalOptions(animalFormattedOptions)
        setphysicalStatesOptions(physicalStatesFormattedOptions)

        setAnimalOption(animal)
        setphysicalStatesOption(physicalState)
      }

  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const code = await offspringFactorService.update(formData, offspringFactorsStore.getSelf())
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
          <Label htmlFor="ageStart">Возраст начало</Label>
          <Input
            type="number"
            id="ageStart"
            name="ageStart"
            value={formData.ageStart}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="ageEnd">Возраст конец</Label>
          <Input
            type="number"
            id="ageEnd"
            name="ageEnd"
            value={formData.ageEnd}
            onChange={handleChange}
            required
          />
        </FormGroup>


        <FormGroup>
          <Label htmlFor="animal">Особь</Label>
          <Select value={animalOption} onChange={(option) => 
          handleSelectChange(option, { name: 'animal' })} name="animal" options={animalOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="physicalState">Состояние</Label>
          <Select value={physicalStatesOption} onChange={(option) => 
          handleSelectChange(option, { name: 'physicalState' })} options={physicalStatesOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>

        <Button type="submit">Обновить фактор размножения особи</Button>
      </Form>
      </Container>
    </>
    )}
    </Observer>
  );
};

export default OffspringFactorsUpdatePage;
