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

const ModalPages = ({ createModalIsopen, changeState,createModaType,tableData}) => {
  const [fieldValidation, setFieldValidation] = useState({
    orderNameInvalid: false,
    workOrderIdInvalid: false,
    assetIdInvalid: false,
  });
  const [formValue, setFormValues] = useState({
    order_name: '',
    workOrder_id: '',
    asset_id: '',
    workOrder_type: '',
    status: '',
    priority: '',
    creation_time: '',
    due_time: '',
    assigned_to: '',
    created_by: '',
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
      order_name: '',
      workOrder_id: '',
      asset_id: '',
      workOrder_type: '',
      status: '',
      priority: '',
      creation_time: '',
      due_time: '',
      assigned_to: '',
      created_by: '',
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


  // 决定弹窗 header
  const getModalHeading=()=>{
    if(createModaType == 'edit'){
      return  `Work Order - ${tableData?.work_order}`
    }
    if(createModaType == 'create'){
      return 'Create a New Asset'
    }
  }
  return (
    <div className={styles.ModalFromStyle}>
      <Modal
        open={createModalIsopen}
        modalHeading={getModalHeading()}
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onRequestClose={handleCancelClicked}
        onRequestSubmit={handleSubmit}
      >
        <Grid className="pl-0 pr-0">
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-8"
              id="order_name"
              labelText="Order Name"
              placeholder="Order Name"
              required
              invalid={fieldValidation.orderNameInvalid}
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
              id="workOrder_id"
              labelText="work Order Id"
              placeholder="house#1"
              required
              invalid={fieldValidation.workOrderIdInvalid}
              invalidText="This field cannot be empty"
              value={formValue.workOrder_id}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-8"
              id="asset_id"
              labelText="Asset Id"
              placeholder="Asset Id"
              required
              invalid={fieldValidation.assetIdInvalid}
              invalidText="This field cannot be empty"
              value={formValue.asset_id}
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
              id="workOrder_type"
              labelText="Work Order Type"
              placeholder="Work Order Type"
              value={formValue.workOrder_type}
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
              <SelectItem value="department-1" text="department 1" />
              <SelectItem value="department-2" text="department 2" />
              <SelectItem value="LSG" text="LSG" />
            </Select>
          </Column>
          <Column sm={2} md={4} lg={8}>
            <Select
              className="mb-8"
              id="priority"
              labelText="Priority"
              value={formValue.priority}
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
          <DatePicker
              className="mb-8"
              datePickerType="single"
              onChange={onDateChange}
            >
              <DatePickerInput
                id="installation_date"
                labelText="Creation Time"
                placeholder="mm/dd/yyyy"
              />
            </DatePicker>
          </Column>
          <Column sm={2} md={4} lg={8}>
          <DatePicker
              className="mb-8"
              datePickerType="single"
              onChange={onDateChange}
            >
              <DatePickerInput
                id="installation_date"
                labelText="Due Time"
                placeholder="mm/dd/yyyy"
              />
            </DatePicker>
          </Column>
          <Column sm={2} md={4} lg={8}>
            <Select
              className="mb-8"
              id="assigned_to"
              labelText="Assigned To"
              value={formValue.assigned_to}
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
            <Select
              className="mb-8"
              id="created_by"
              labelText="Created By"
              value={formValue.created_by}
              // placeholder="Choose an option"
              onChange={onFormValueChange}
            >
              <SelectItem value="" text="Choose an option" />
              <SelectItem value="department-1" text="department 1" />
              <SelectItem value="department-2" text="department 2" />
              <SelectItem value="LSG" text="LSG" />
            </Select>
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
