import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FamilyRelationshipsInput } from '../../services/familyRelationshipService/FamilyRelationship.types';
import { IndividualService } from '../../services/individualService/IndividualService';
import { HTTPClient } from '../../common/HTTPClient';
import Select from 'react-select';
import { FamilyRelationshipsService } from '../../services/familyRelationshipService/FamilyRelationshipService';
import { Alert } from '@mui/material';
import { familyRelationshipsStore } from './familyRelationshipsStore';
import { Observer } from 'mobx-react';
import { TypeRelationshipService } from '../../services/typeRelationshipService/TypeRelatitionshipService';

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
const FamilyRelationshipsUpdatePage: React.FC = () => {
  const [formData, setFormData] = useState<FamilyRelationshipsInput>({
    individualId1: '',
    individualId2: '',
    typeRelationship: ''
  });

  interface Option {
    value: string;
    label: string;
  }

  const individualService = new IndividualService(HTTPClient.getInstance())
  const familyRelationshipService = new FamilyRelationshipsService(HTTPClient.getInstance())
  const typeRelationshipService = new TypeRelationshipService(HTTPClient.getInstance())

  const [individual1Options, setIndividual1Options] = useState<Option[]>([]);
  const [individual2Options, setIndividual2Options] = useState<Option[]>([]);
  const [typeRelationshipOptions, setTypeRelationshipOptions] = useState<Option[]>([]);

  const [responseStatus, setResponseStatus] = useState('')

  const [individual1Option, setIndividual1Option] = useState<Option>();
  const [individual2Option, setIndividual2Option] = useState<Option>();
  const [typeRelationshipOption, setTypeRelationshipOption] = useState<Option>();

  const handleSelectChange = (selectedOption: Option | null, actionMeta: { name: string }) => {
    if (actionMeta.name === 'individualId1' && selectedOption !== null) setIndividual1Option(selectedOption)
    if (actionMeta.name === 'individualId2' && selectedOption !== null) setIndividual2Option(selectedOption)
    if (actionMeta.name === 'typeRelationship' && selectedOption !== null) setTypeRelationshipOption(selectedOption)

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
      const list = await individualService.getList()
      const formattedOptions = (list || []).map(individual => ({value: individual.self, label: individual.name}));

      const typeList = await typeRelationshipService.getList()
      const typeFormattedOptions = (typeList || []).map(type => ({value: type.self, label: type.relationship}));

      if (formattedOptions.length !== 0) {
        const a = formattedOptions.find(option => option.label === familyRelationshipsStore.getIndividualId1())
        const b = formattedOptions.find(option => option.label === familyRelationshipsStore.getIndividualId2())
        const c = typeFormattedOptions.find(option => option.label === familyRelationshipsStore.getTypeRelationship())

        setIndividual1Option(a)
        setIndividual2Option(b)
        setTypeRelationshipOption(c)

        // @ts-ignore
        if (a !== undefined) handleSelectChange(a, { name: 'individualId1' })
        
        // @ts-ignore
        if (b !== undefined) handleSelectChange(b, { name: 'individualId2' })

        // @ts-ignore
        if (c !== undefined) handleSelectChange(c, { name: 'typeRelationship' })
      }

      console.log(formData.individualId1, formData.individualId2, formData.typeRelationship)
      setIndividual1Options(formattedOptions)
      setIndividual2Options(formattedOptions)
      setTypeRelationshipOptions(typeFormattedOptions)
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    const code = await familyRelationshipService.update(formData, familyRelationshipsStore.getSelf())
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
          <Label htmlFor="individualId1">Особь 1</Label>
          <Select value={individual1Option} onChange={(option) => 
          handleSelectChange(option, { name: 'individualId1' })} name="individualId1" options={individual1Options} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="individualId2">Особь 2</Label>
          <Select value={individual2Option} onChange={(option) => 
          handleSelectChange(option, { name: 'individualId2' })} name="individualId2" options={individual2Options} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>


        <FormGroup>
          <Label htmlFor="typeRelationship">Тип</Label>
          <Select value={typeRelationshipOption} onChange={(option) => 
          handleSelectChange(option, { name: 'typeRelationship' })} name="typeRelationship" options={typeRelationshipOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>
        <Button type="submit">Обновить семейные отношения</Button>
      </Form>
      </Container>
    </>
    )}
    </Observer>
  );
};

export default FamilyRelationshipsUpdatePage;
