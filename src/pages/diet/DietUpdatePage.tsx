import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DietInput } from '../../services/dietService/Diet.types';
import { HTTPClient } from '../../common/HTTPClient';
import Select from 'react-select';
import { DietService } from '../../services/dietService/DietService';
import { Alert } from '@mui/material';
import { dietStore } from './dietStore';
import { Observer } from 'mobx-react';
import { FoodService } from '../../services/foodService/FoodService';
import { DimensionService } from '../../services/dimensionService/DimensionService';
import { DietCharacteristicService } from '../../services/dietCharacteristicService/DietCharacteristicService';

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
const DietUpdatePage: React.FC = () => {
  const [formData, setFormData] = useState<DietInput>({
    count: dietStore.getCount(),
    time: dietStore.getTime(),
    dietCharacteristics: 0,
    food: '',
    dimension: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  interface Option {
    value: string;
    label: string;
  }

  const dietService = new DietService(HTTPClient.getInstance())
  const foodService = new FoodService(HTTPClient.getInstance())
  const dimensionService = new DimensionService(HTTPClient.getInstance())
  const dietCharacteristicService = new DietCharacteristicService(HTTPClient.getInstance())

  const [foodOptions, setFoodOptions] = useState<Option[]>([]);
  const [dimensionOptions, setDimensionOptions] = useState<Option[]>([]);
  const [dietCharacteristicsOptions, setDietCharacteristicOptions] = useState<Option[]>([]);

  const [responseStatus, setResponseStatus] = useState('')

  const [foodOption, setFoodOption] = useState<Option>();
  const [dimensionOption, setDimensionOption] = useState<Option>();
  const [dietCharacteristicsOption, setDietCharacteristicOption] = useState<Option>();

  const handleSelectChange = (selectedOption: Option | null, actionMeta: { name: string }) => {
    if (actionMeta.name === 'dietCharacteristics' && selectedOption !== null) setDietCharacteristicOption(selectedOption)
    if (actionMeta.name === 'food' && selectedOption !== null) setFoodOption(selectedOption)
    if (actionMeta.name === 'dimension' && selectedOption !== null) setDimensionOption(selectedOption)
    console.log(actionMeta.name)
    if (selectedOption) {
      setFormData((prev: any) => ({
        ...prev,
        [actionMeta.name]: selectedOption.value,
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [actionMeta.name]: '',
      }));
    }
  };

  const handleFilterChange = async () => {
      const list = await foodService.getList()
      const formattedOptions = (list || []).map(food => ({value: food.self, label: food.foodName}));
    
      const dimensionList = await dimensionService.getList()
      const dimensionFormattedOptions = (dimensionList || []).map(dimension => ({value: dimension.self, label: dimension.dimension}));
      
      const dietCharacteristiclist = await dietCharacteristicService.getList()
      const dietCharacteristicformattedOptions = (dietCharacteristiclist || []).map(dietCharacteristic => 
        ({value: dietCharacteristic.self, label: dietCharacteristic.self.split('/')[dietCharacteristic.self.split('/').length - 1]}));


      if (formattedOptions.length !== 0) {
        const a = formattedOptions.find(option => option.label === dietStore.getFood())
        const b = dimensionFormattedOptions.find(option => option.label === dietStore.getDimension())
        const c = dietCharacteristicformattedOptions.find(option => +option.label === dietStore.getDietCharacteristics())
     
        // @ts-ignore
        if (a !== undefined) handleSelectChange(a, { name: 'food' })
        
        // @ts-ignore
        if (b !== undefined) handleSelectChange(b, { name: 'dimension' })

        // @ts-ignore
        if (c !== undefined) handleSelectChange(c, { name: 'dietCharacteristics' })
      }

      setDietCharacteristicOptions(dietCharacteristicformattedOptions)
      setFoodOptions(formattedOptions)
      setDimensionOptions(dimensionFormattedOptions)
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const code = await dietService.update(formData, dietStore.getSelf())
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
          <Label htmlFor="count">Количество</Label>
          <Input
            type="number"
            id="count"
            name="count"
            value={formData.count}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="time">Время</Label>
          <Input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </FormGroup>


        <FormGroup>
          <Label htmlFor="dietCharacteristics">Характеристика</Label>
          <Select value={dietCharacteristicsOption} onChange={(option) => 
          handleSelectChange(option, { name: 'dietCharacteristics' })} name="dietCharacteristics" options={dietCharacteristicsOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
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
          <Label htmlFor="dimension">Размерность</Label>
          <Select value={dimensionOption} onChange={(option) => 
          handleSelectChange(option, { name: 'dimension' })} name="dimension" options={dimensionOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>
    
        <Button type="submit">Обновить рацион животному</Button>
      </Form>
      </Container>
    </>
    )}
    </Observer>
  );
};

export default DietUpdatePage;
