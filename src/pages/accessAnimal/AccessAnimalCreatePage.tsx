import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AccessAnimalInput } from '../../services/accessAnimalService/AccessAnimal.types';
import { IndividualService } from '../../services/individualService/IndividualService';
import { HTTPClient } from '../../common/HTTPClient';
import Select from 'react-select';
import { StaffService } from '../../services/staffService/StaffService';
import { AccessAnimalService } from '../../services/accessAnimalService/AccessAnimalService';
import { Alert } from '@mui/material';

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
const AccessAnimalCreatePage: React.FC = () => {
  const [formData, setFormData] = useState<AccessAnimalInput>({
    dateStart: '',
    dateEnd: null,
    individual: '',
    staff: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(formData);
  };

  interface Option {
    value: string;
    label: string;
  }


  const individualService = new IndividualService(HTTPClient.getInstance())
  const staffService = new StaffService(HTTPClient.getInstance())
  const accessAnimalService = new AccessAnimalService(HTTPClient.getInstance())

  const [options, setOptions] = useState<Option[]>([]);
  const [staffOptions, setStaffOptions] = useState<Option[]>([]);

  const [responseStatus, setResponseStatus] = useState('')

  const handleFilterChange = async () => {
      const list = await individualService.getList()
      const formattedOptions = (list || []).map(individual => ({value: individual.self, label: individual.name}));
      
      const staffList = await staffService.getList()
      const staffFormattedOptions = (staffList || []).map(staff => 
        ({value: staff.self, label: staff.surname + ' ' + staff.name + ' ' + staff.middleName}));
      setOptions(formattedOptions)
      setStaffOptions(staffFormattedOptions)
    
  }

  const handleSelectChange = (selectedOption: Option | null, actionMeta: { name: string }) => {
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

    console.log(formData);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const code = await accessAnimalService.createAccessAnimal(formData)
    setResponseStatus(code)
    console.log(code)
  };

  useEffect(() => {
    handleFilterChange()
}, [])

  return (
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
          <Label htmlFor="dateStart">Дата начало</Label>
          <Input
            type="date"
            id="dateStart"
            name="dateStart"
            value={formData.dateStart}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="dateEnd">Дата конец</Label>
          <Input
            type="date"
            id="dateEnd"
            name="dateEnd"
            value={formData.dateEnd || ''}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="individual">Особь</Label>
          <Select onChange={(option) => 
          handleSelectChange(option, { name: 'individual' })} name="individual" options={options} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="staff">Сотрудник</Label>
          <Select   onChange={(option) => 
          handleSelectChange(option, { name: 'staff' })} options={staffOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>
        <Button type="submit">Добавить доступ к животному</Button>
      </Form>
      </Container>
    </>
  );
};

export default AccessAnimalCreatePage;