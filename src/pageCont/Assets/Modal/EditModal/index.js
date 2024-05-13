import React, { useState } from 'react';
import {
  Modal,
  TextInput,
  Select,
  SelectItem,
  Column,
  Grid,
  DatePickerInput,
  DatePicker,
} from '@carbon/react';
import moment from 'moment';
import styles from '@/styles/modal/modal.module.scss';
import {addAsset} from '@/api/assets'
const ModalPages = ({ createModalIsopen, changeState }) => {
  const [fieldValidation, setFieldValidation] = useState({
    assetNameInvalid: false,
    assetIdInvalid: false,
    snInvalid: false,
  });
  const [formValue, setFormValues] = useState({
    assetName: '',
    assetId: '',
    sn: '',
    assetType: '',
    status: '',
    department: '',
    location: '',
    installationDate: '',
    value: '',
    responsiblePerson: '',
    description: '',
  });

  const onFormValueChange = (e) => {
    const { id, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const onDateChange = (e) => {
    if (!e) {
      return;
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      installationDate: moment(e[0]).format(),
    }));
  };

  
  const handleCancelClicked = () => {
    setFormValues({
      assetName: '',
      assetId: '',
      sn: '',
      assetType: '',
      status: '',
      department: '',
      location: '',
      installationDate: '',
      value: '',
      responsiblePerson: '',
      description: '',
    });
    setFieldValidation({
      assetNameInvalid: false,
      assetIdInvalid: false,
      snInvalid: false,
    });
    // onClose();
    changeState({ createModalIsopen: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newValidation = {
      assetNameInvalid: !formValue.assetName || formValue.assetName === '',
      assetIdInvalid: !formValue.assetId || formValue.assetId === '',
      snInvalid: !formValue.sn || formValue.sn === '',
    };
    setFieldValidation(newValidation);
    console.log('Object ', Object.values(newValidation).some((v) => v));
    // 所有必填项都已经填写
    if (!Object.values(newValidation).some((v) => v)) {
      createAsset()
      return;
    }
   
  };
  const createAsset = async()=>{
    let res = await addAsset(formValue);
    if(res.data?.code == 200){
      handleCancelClicked();
    }
  }

  return (
    <div className={styles.ModalFromStyle}>
      <Modal
        open={createModalIsopen}
        modalHeading="Create a New Asset"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onRequestClose={handleCancelClicked}
        onRequestSubmit={handleSubmit}
      >
        <Grid className="pl-0 pr-0">
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-8"
              id="assetName"
              labelText="Asset Name"
              placeholder="Asset Name"
              required
              invalid={fieldValidation.assetNameInvalid}
              invalidText="This field cannot be empty"
              value={formValue.assetName}
              onChange={onFormValueChange}
              onFocus={(e) => {
                // 可以自定义正则校验
                // 校验不成功，可以修改fieldValidation 为true
                // console.log('e: ', e.target.value);
              }}
            />
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-8"
              id="assetId"
              labelText="Asset Id"
              placeholder="house#1"
              required
              invalid={fieldValidation.assetIdInvalid}
              invalidText="This field cannot be empty"
              value={formValue.assetId}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-8"
              id="sn"
              labelText="SN"
              placeholder="SN"
              required
              invalid={fieldValidation.snInvalid}
              invalidText="This field cannot be empty"
              value={formValue.sn}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-8"
              id="assetType"
              labelText="Asset Type"
              placeholder="Asset Type"
              value={formValue.assetType}
              onChange={onFormValueChange}
            />
          </Column>

          <Column sm={2} md={4} lg={8}>
            <Select
              className="mb-8"
              id="status"
              labelText="Status"
              value={formValue.status}
              // placeholder="Choose an option"
              onChange={onFormValueChange}
            >
              <SelectItem value="" text="Choose an option" />
              <SelectItem value="1" text="Running" />
              <SelectItem value="2" text="Maintaining" />
              <SelectItem value="3" text="Halt" />
              <SelectItem value="4" text="Scheduled Stop" />
            </Select>
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-8"
              id="department"
              labelText="Department"
              placeholder="Enter Department"
              type="Department"
              value={formValue.department}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-8"
              id="location"
              labelText="Location"
              placeholder="Location"
              value={formValue.location}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={8}>
            <DatePicker
              className="mb-8"
              datePickerType="single"
              onChange={onDateChange}
            >
              <DatePickerInput
                id="installationDate"
                labelText="Installation Date"
                placeholder="mm/dd/yyyy"
              />
            </DatePicker>
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-8"
              id="value"
              labelText="Value"
              placeholder="Value"
              value={formValue.value}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-8"
              id="responsiblePerson"
              labelText="Responsible Person"
              placeholder="Responsible Person"
              value={formValue.responsiblePerson}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={16}>
            <TextInput
              id="description"
              labelText="Description"
              placeholder="Description"
              value={formValue.description}
              onChange={onFormValueChange}
            />
          </Column>
        </Grid>
      </Modal>
    </div>
  );
};

export default ModalPages;
