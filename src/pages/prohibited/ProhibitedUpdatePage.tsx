import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HTTPClient } from '../../common/HTTPClient';
import Select from 'react-select';
import { Alert } from '@mui/material';
import { Observer } from 'mobx-react';
import { ProhibitedInput } from '../../services/prohibitedCombinationsSettlement/Prohibited.types';
import { AnimalService } from '../../services/animalService/AnimalService';
import { ProhibitedCombinationsSettlementService } from '../../services/prohibitedCombinationsSettlement/ProhibitedService';
import { prohibitedStore } from './prohibitedStore';

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
const ProhibitedUpdatePage: React.FC = () => {
  const [formData, setFormData] = useState<ProhibitedInput>({
    animalId1: '',
    animalId2: ''
  });

  interface Option {
    value: string;
    label: string;
  }

  const animalService = new AnimalService(HTTPClient.getInstance())
  const prohibitedService = new ProhibitedCombinationsSettlementService(HTTPClient.getInstance())

  const [options, setOptions] = useState<Option[]>([]);
  const [responseStatus, setResponseStatus] = useState('')

  const[animalId1Option, setAnimalId1Option] = useState<Option>();
  const[animalId2Option, setAnimalId2Option] = useState<Option>();

  const handleSelectChange = (selectedOption: Option | null, actionMeta: { name: string }) => {
    if (actionMeta.name === 'animalId1' && selectedOption !== null) setAnimalId1Option(selectedOption)
    if (actionMeta.name === 'animalId2' && selectedOption !== null) setAnimalId2Option(selectedOption)

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
      const formattedOptions = (list || []).map(individual => ({value: individual.self, label: individual.animalTitle}));
     
      if (formattedOptions.length !== 0) {
        const a = formattedOptions.find(option => option.label === prohibitedStore.getAnimal1())
        const b = formattedOptions.find(option => option.label === prohibitedStore.getAnimal2())
        setAnimalId1Option(a)
        setAnimalId1Option(b)
        // @ts-ignore
        if (a !== undefined) handleSelectChange(a, { name: 'animalId1' })
        
        // @ts-ignore
        if (b !== undefined) handleSelectChange(b, { name: 'animalId2' })
      }

      setOptions(formattedOptions)
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const code = await prohibitedService.update(formData, prohibitedStore.getSelf())
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
          <Label htmlFor="animalId1">Животное 1</Label>
          <Select value={animalId1Option} onChange={(option) => 
          handleSelectChange(option, { name: 'animalId1' })} name="individual" options={options} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="animalId2">Животное 2</Label>
          <Select value={animalId2Option} onChange={(option) => 
          handleSelectChange(option, { name: 'animalId2' })} options={options} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>
        <Button type="submit">Добавить запрещенное расселения</Button>
      </Form>
      </Container>
    </>
    )}
    </Observer>
  );
};

export default ProhibitedUpdatePage;
