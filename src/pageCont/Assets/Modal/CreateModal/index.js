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

const ModalPages = ({ createModalIsopen, changeState }) => {
  const [fieldValidation, setFieldValidation] = useState({
    assetNameInvalid: false,
    assetIdInvalid: false,
    snInvalid: false,
  });
  const [formValue, setFormValues] = useState({
    asset_name: '',
    asset_id: '',
    sn: '',
    asset_type: '',
    status: '',
    department: '',
    location: '',
    installation_date: '',
    value: '',
    responsible_person: '',
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
      installation_date: moment(e[0]).format(),
    }));
  };

  
  const handleCancelClicked = () => {
    setFormValues({
      asset_name: '',
      asset_id: '',
      sn: '',
      asset_type: '',
      status: '',
      department: '',
      location: '',
      installation_date: '',
      value: '',
      responsible_person: '',
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
      assetNameInvalid: !formValue.asset_name || formValue.asset_name === '',
      assetIdInvalid: !formValue.asset_id || formValue.asset_id === '',
      snInvalid: !formValue.sn || formValue.sn === '',
    };
    setFieldValidation(newValidation);

    if (Object.values(fieldValidation).some((v) => v)) {
      setFieldValidation(newValidation);
      return;
    }
  };

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
              id="asset_name"
              labelText="Asset Name"
              placeholder="Asset name"
              required
              invalid={fieldValidation.assetNameInvalid}
              invalidText="This field cannot be empty"
              value={formValue.asset_name}
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
              id="asset_id"
              labelText="Asset Id"
              placeholder="house#1"
              required
              invalid={fieldValidation.assetIdInvalid}
              invalidText="This field cannot be empty"
              value={formValue.asset_id}
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
              value={formValue.type}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-8"
              id="asset_type"
              labelText="Asset Type"
              placeholder="Asset Type"
              value={formValue.asset_type}
              onChange={onFormValueChange}
            />
          </Column>

          <Column sm={2} md={4} lg={8}>
            <Select
              className="mb-8"
              id="status"
              labelText="status"
              value={formValue.status}
              // placeholder="Choose an option"
              onChange={onFormValueChange}
            >
              <SelectItem value="" text="Choose an option" />
              <SelectItem value="department-1" text="department 1" />
              <SelectItem value="department-2" text="department 2" />
              <SelectItem value="LSG" text="LSG" />
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
                id="installation_date"
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
              id="responsible_person"
              labelText="Responsible Person"
              placeholder="Responsible Person"
              value={formValue.responsible_person}
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
