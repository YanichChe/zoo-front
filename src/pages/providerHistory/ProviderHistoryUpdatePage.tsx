import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HTTPClient } from '../../common/HTTPClient';
import Select from 'react-select';
import { Alert } from '@mui/material';
import { Observer } from 'mobx-react';
import { ProviderHistoryInput } from '../../services/providerHistoryService/ProviderHistory.types';
import { providerHistoryStore } from './providerHistoryStore';
import { FoodProviderService } from '../../services/foodProviderService/FoodProviderService';
import { ProviderHistoryService } from '../../services/providerHistoryService/ProviderHistoryService';
import { FoodService } from '../../services/foodService/FoodService';
import { DimensionService } from '../../services/dimensionService/DimensionService';

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
const ProviderHistoryUpdatePage: React.FC = () => {
  const [formData, setFormData] = useState<ProviderHistoryInput>({
    date: providerHistoryStore.getDate(),
    number: providerHistoryStore.getNumber(),
    price: providerHistoryStore.getPrice(),
    food: '',
    provider: '',
    dimension: '',
    self: '',
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

  const providerService = new FoodProviderService(HTTPClient.getInstance())
  const providerHistoryService = new ProviderHistoryService(HTTPClient.getInstance())
  const foodService = new FoodService(HTTPClient.getInstance())
  const dimensionService = new DimensionService(HTTPClient.getInstance())

  const [providersOptions, setProviderOptions] = useState<Option[]>([]);
  const [foodOptions, setfoodOptions] = useState<Option[]>([]);
  const [dimensionOptions, setdimensionOptions] = useState<Option[]>([]);

  const [responseStatus, setResponseStatus] = useState('')

  const [providersOption, setProviderOption] = useState<Option>();
  const [foodOption, setfoodOption] = useState<Option>();
  const [dimensionOption, setdimensionOption] = useState<Option>();


  const handleSelectChange = (selectedOption: Option | null, actionMeta: { name: string }) => {
    if (actionMeta.name === 'provider' && selectedOption !== null) setProviderOption(selectedOption)
    else if (actionMeta.name === 'food' && selectedOption !== null) setfoodOption(selectedOption)
    else if (actionMeta.name === 'dimension' && selectedOption !== null) setdimensionOption(selectedOption)

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
      const providerList = await providerService.getList()
      const providerFormattedOptions = (providerList || []).map(provider => ({value: provider.self, label: provider.provider}));

      const foodList = await foodService.getList()
      const foodFormattedOptions = (foodList || []).map(food => ({value: food.self, label: food.foodName}));
      
      const dimensionList = await dimensionService.getList()
      const dimensionProviderFormattedOptions = (dimensionList || []).map(dimension => ({value: dimension.self, label: dimension.dimension}));

      if (providerFormattedOptions.length !== 0) {
        const provider = providerFormattedOptions.find(option => option.label === providerHistoryStore.getProvider())
        const food = foodFormattedOptions.find(option => option.label === providerHistoryStore.getFood())
        const dimension = dimensionProviderFormattedOptions.find(option => option.label === providerHistoryStore.getDimension())
    
        // @ts-ignore
        if (provider !== undefined) handleSelectChange(provider, { name: 'provider' })
        
        // @ts-ignore
        if (food !== undefined) handleSelectChange(food, { name: 'food' })

        // @ts-ignore
        if (dimension !== undefined) handleSelectChange(dimension, { name: 'dimension' })


        setProviderOption(provider)
        setdimensionOption(dimension)
        setfoodOption(food)

        setProviderOptions(providerFormattedOptions)
        setfoodOptions(foodFormattedOptions)
        setdimensionOptions(dimensionProviderFormattedOptions)
             
      }

  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const code = await providerHistoryService.update(formData, providerHistoryStore.getSelf())
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
          <Label htmlFor="date">Дата поставки</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="price">Цена</Label>
        <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="number">Количество</Label>
        <Input
            type="number"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
         </FormGroup>

        <FormGroup>
          <Label htmlFor="food">Еда</Label>
          <Select value={foodOption} onChange={(option) => 
          handleSelectChange(option, { name: 'food' })} name="food" options={foodOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="provider">Провайдер</Label>
          <Select value={providersOption} onChange={(option) => 
          handleSelectChange(option, { name: 'provider' })} name="provider" options={providersOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="dimension">Размерность</Label>
          <Select value={dimensionOption} onChange={(option) => 
          handleSelectChange(option, { name: 'dimension' })} name="dimension" options={dimensionOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>

        <Button type="submit">Обновить историю поставки</Button>
      </Form>
      </Container>
    </>
    )}
    </Observer>
  );
};

export default ProviderHistoryUpdatePage;
