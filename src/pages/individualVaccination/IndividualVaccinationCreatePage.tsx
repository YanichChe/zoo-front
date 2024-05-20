import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IndividualService } from '../../services/individualService/IndividualService';
import { HTTPClient } from '../../common/HTTPClient';
import Select from 'react-select';
import { StaffService } from '../../services/staffService/StaffService';
import { Alert } from '@mui/material';
import { Observer } from 'mobx-react';
import { IndividualsVaccinationInput } from '../../services/individualsVaccinationService/IndividualVaccination.types';
import { IndividualsVaccinationService } from '../../services/individualsVaccinationService/IndividualVaccinationService';
import { VaccinationService } from '../../services/vaccinationService/VaccinationService';

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
const IndividualsVaccinationCreatePage: React.FC = () => {
  const [formData, setFormData] = useState<IndividualsVaccinationInput>({
    individual: '',
    vaccination: '',
    date: '',
    staff: '',
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

  const individualService = new IndividualService(HTTPClient.getInstance())
  const staffService = new StaffService(HTTPClient.getInstance())
  const vaccinationService = new VaccinationService(HTTPClient.getInstance())
  const individualsVaccinationService = new IndividualsVaccinationService(HTTPClient.getInstance())

  const [staffOptions, setStaffOptions] = useState<Option[]>([]);
  const [vaccinationOptions, setVaccinationOptions] = useState<Option[]>([]);
  const [individuals, setIndividuals] = useState<Option[]>([]);

  const [responseStatus, setResponseStatus] = useState('')

  const[staffOption, setStaffOption] = useState<Option>();
  const[individualOption, setIndividualOption] = useState<Option>();
  const [vaccinationOption, setVaccinationOption] = useState<Option>();

  const handleSelectChange = (selectedOption: Option | null, actionMeta: { name: string }) => {
    if (actionMeta.name === 'individual' && selectedOption !== null) setIndividualOption(selectedOption)
    if (actionMeta.name === 'staff' && selectedOption !== null) setStaffOption(selectedOption)
    if (actionMeta.name === 'vaccination' && selectedOption !== null) setVaccinationOption(selectedOption)

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
      
      const staffList = await staffService.getList()
      const staffFormattedOptions = (staffList || []).map(staff => 
        ({value: staff.self, label: staff.surname + ' ' + staff.name + ' ' + staff.middleName}));

      const vaccinationList = await vaccinationService.getList()
      const vaccinationFormattedOptions = (vaccinationList || []).map(vaccination => ({value: vaccination.self, label: vaccination.vaccinationName}));  

      setIndividuals(formattedOptions)
      setStaffOptions(staffFormattedOptions)
      setVaccinationOptions(vaccinationFormattedOptions)
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const code = await individualsVaccinationService.createindividualsVaccination(formData)
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
          <Label htmlFor="date">Дата</Label>
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
          <Label htmlFor="individual">Особь</Label>
          <Select value={individualOption} onChange={(option) => 
          handleSelectChange(option, { name: 'individual' })} name="individual" options={individuals} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="staff">Сотрудник</Label>
          <Select value={staffOption} onChange={(option) => 
          handleSelectChange(option, { name: 'staff' })} options={staffOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="vaccination">Вакцина</Label>
          <Select value={vaccinationOption} onChange={(option) => 
          handleSelectChange(option, { name: 'vaccination' })} options={vaccinationOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>

        <Button type="submit">Создать вакцинацию животному</Button>
      </Form>
      </Container>
    </>
    )}
    </Observer>
  );
};

export default IndividualsVaccinationCreatePage;
