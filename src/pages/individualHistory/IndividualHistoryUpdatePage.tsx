import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HTTPClient } from '../../common/HTTPClient';
import Select from 'react-select';
import { Alert } from '@mui/material';
import { Observer } from 'mobx-react';
import { IndividualHistoryInput } from '../../services/individualHistoryService/IndividualHistory.types';
import { individualHistoryStore } from './individualHistoryStore';
import { IndividualHistoryService } from '../../services/individualHistoryService/IndividualHistoryService';
import { IndividualService } from '../../services/individualService/IndividualService';
import { IndividualReceiptStatusService } from '../../services/individualReceiptStatusService/IndividualReceiptStatusService';
import { ZooService } from '../../services/zooService/ZooService';

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
const IndividualHistoryUpdatePage: React.FC = () => {
  const [formData, setFormData] = useState<IndividualHistoryInput>({
    receiptDate: individualHistoryStore.getReceiptDate(),
    individual: '',
    individualStatus: '',
    zoo: '',
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
  const individualHistoryService = new IndividualHistoryService(HTTPClient.getInstance())
  const individualReceiptService = new IndividualReceiptStatusService(HTTPClient.getInstance())
  const zooService = new ZooService(HTTPClient.getInstance())


  const [individualsOptions, setIndividualOptions] = useState<Option[]>([]);
  const [individualReceiptOptions, setIndividualReceiptOptions] = useState<Option[]>([]);
  const [zooOptions, setZooOptions] = useState<Option[]>([]);

  const [responseStatus, setResponseStatus] = useState('')

  const [individualOption, setIndividualOption] = useState<Option>();
  const [individualReceiptOption, setIndividualReceiptOption] = useState<Option>();
  const [zooOption, setZooOption] = useState<Option>();

  const handleSelectChange = (selectedOption: Option | null, actionMeta: { name: string }) => {
    if (actionMeta.name === 'individual' && selectedOption !== null) setIndividualOption(selectedOption)
    else if (actionMeta.name === 'individualStatus' && selectedOption !== null) setIndividualReceiptOption(selectedOption)
    else if (actionMeta.name === 'zoo' && selectedOption !== null) setZooOption(selectedOption)
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
      const individualList = await individualService.getList()
      const individualFormattedOptions = (individualList || []).map(individual => ({value: individual.self, label: individual.name}));

      const zooList = await zooService.getList()
      const zooFormattedOptions = (zooList || []).map(zoo => ({value: zoo.self, label: zoo.name}));
      
      const individualReceiptList = await individualReceiptService.getList()
      const individualReceiptFormattedOptions = (individualReceiptList || []).map(individual => ({value: individual.self, label: individual.statusName}));

      if (individualFormattedOptions.length !== 0) {
        const individual = individualFormattedOptions.find(option => option.label === individualHistoryStore.getIndividual())
        const zoo = zooFormattedOptions.find(option => option.label === individualHistoryStore.getZoo())
        const individualReceipt = individualReceiptFormattedOptions.find(option => option.label === individualHistoryStore.getIndividualStatus())
    
        // @ts-ignore
        if (individual !== undefined) handleSelectChange(individual, { name: 'individual' })
        
        // @ts-ignore
        if (zoo !== undefined) handleSelectChange(zoo, { name: 'zoo' })

        // @ts-ignore
        if (individualReceipt !== undefined) handleSelectChange(individualReceipt, { name: 'individualStatus' })

        setIndividualOption(individual)
        setZooOption(zoo)
        setIndividualReceiptOption(individualReceipt)

        setIndividualOptions(individualFormattedOptions)
        setZooOptions(zooFormattedOptions)
        setIndividualReceiptOptions(individualReceiptFormattedOptions)
      }

  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const code = await individualHistoryService.update(formData, individualHistoryStore.getSelf())
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
            id="receipDate"
            name="receipDate"
            value={formData.receiptDate}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="individual">Особь</Label>
          <Select value={individualOption} onChange={(option) => 
          handleSelectChange(option, { name: 'individual' })} name="individual" options={individualsOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="zoo">Зоопарк</Label>
          <Select value={zooOption} onChange={(option) => 
          handleSelectChange(option, { name: 'zoo' })} options={zooOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="individualStatus">Статус</Label>
          <Select value={individualReceiptOption} onChange={(option) => 
          handleSelectChange(option, { name: 'individualStatus' })} options={individualReceiptOptions} menuPortalTarget={document.body}
                              styles={{
                                  menuPortal: base => ({...base, zIndex: 99,}),
                                  control: base => ({...base, width: '98%'})
                              }}/>
        </FormGroup>

        <Button type="submit">Обновить историю особи</Button>
      </Form>
      </Container>
    </>
    )}
    </Observer>
  );
};

export default IndividualHistoryUpdatePage;
