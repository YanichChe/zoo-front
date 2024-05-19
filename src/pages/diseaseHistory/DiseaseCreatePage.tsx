import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IndividualService } from '../../services/individualService/IndividualService';
import { HTTPClient } from '../../common/HTTPClient';
import Select from 'react-select';
import { Alert } from '@mui/material';
import { Observer } from 'mobx-react';
import { DiseaseHistoryInput } from '../../services/diseaseHistoryService/DiseaseHistory.types';
import { DiseaseService } from '../../services/diseaseService/DiseaseService';
import { DiseaseHistoryService } from '../../services/diseaseHistoryService/DiseaseHistoryService';

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
const DiseaseHistoryCreatePage: React.FC = () => {
  const [formData, setFormData] = useState<DiseaseHistoryInput>({
    dateStart: '',
    dateEnd: null,
    individual: '',
    disease: '',
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
  const diseaseService = new DiseaseService(HTTPClient.getInstance())
  const diseaseHistoryService = new DiseaseHistoryService(HTTPClient.getInstance())

  const[individualsOption, setIndividualsOption] = useState<Option[]>([]);
  const [diseasesOptions, setDiseasesOptions] = useState<Option[]>([]);

  const[individualOption, setIndividualOption] = useState<Option>();
  const [diseaseOptions, setDiseaseOptions] = useState<Option>();
  const [responseStatus, setResponseStatus] = useState('')
  

  const handleSelectChange = (selectedOption: Option | null, actionMeta: { name: string }) => {
    if (actionMeta.name === 'individual' && selectedOption !== null) setIndividualOption(selectedOption)
    if (actionMeta.name === 'disease' && selectedOption !== null) setDiseaseOptions(selectedOption)
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
     
      const diseaseList = await diseaseService.getList()
      const diseaseFormattedOptions = (diseaseList || []).map(disease => 
        ({value: disease.self, label: disease.diseaseName}));

      setDiseasesOptions(diseaseFormattedOptions)
      setIndividualsOption(formattedOptions)
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const code = await diseaseHistoryService.createDiseaseHistory(formData)
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
          <Select value={individualOption} onChange={(option) => 
          handleSelectChange(option, { name: 'individual' })} name="individual" options={individualsOption} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="staff">Болезнь</Label>
          <Select value={diseaseOptions} onChange={(option) => 
          handleSelectChange(option, { name: 'disease' })} options={diseasesOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>
        <Button type="submit">Создать историю болезни</Button>
      </Form>
      </Container>
    </>
    )}
    </Observer>
  );
};

export default DiseaseHistoryCreatePage;
