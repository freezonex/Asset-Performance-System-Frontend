import React, { useState, useEffect } from 'react';
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
import { AddAlt } from '@carbon/icons-react';
import moment from 'moment';
import {message} from 'antd';
import { addDepartmentItem, getDepartmentList } from '@/api/assets';
import { addWorkOrder } from '@/api/workOrder';
import AddassignedToModal from '@/pageCont/components/AddModal';
import styles from '@/styles/modal/modal.module.scss';

const ModalPages = ({
  createModalIsopen,
  changeState,
  createModaType,
  tableData,
}) => {
  const [assignedToData, setAssignedToData] = useState([]); // assigned to  data
  const [addassignedToModal, setAddassignedToModal] = useState(false); // 添加 Assigned to 弹窗
  const [modalSaveIsDisablee, setModalSaveIsDisablee] = useState(false); // 弹窗保存按钮是否禁用
  const statusList = [
    {
      label: 'Open',
      type: 'green',
    },
    {
      label: 'In Progress',
      type: 'blue',
    },
    {
      label: 'Review',
      type: 'purple',
    },
    {
      label: 'Dued',
      type: 'magenta',
    },
    {
      label: 'Closed',
      type: 'red',
    },
  ];
  const [fieldValidation, setFieldValidation] = useState({
    orderNameInvalid: false,
    orderIdInvalid: false,
    assetIdInvalid: false,
  });
  const [formValue, setFormValues] = useState({
    orderName: '',
    orderId: '',
    assetId: '',
    orderType: '',
    status: '',
    priority: '',
    creationTime: '',
    dueTime: '',
    assignedTo: '',
    created_by: '',
    description: '',
  });

  useEffect(() => {
    getAssignedToData();
  }, [createModalIsopen]);

  const onFormValueChange = (e) => {
    const { id, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  

  const handleCancelClicked = () => {
    setFormValues({
      orderName: '',
      orderId: '',
      assetId: '',
      orderType: '',
      status: '',
      priority: '',
      creationTime: '',
      dueTime: '',
      assignedTo: '',
      created_by: '',
      description: '',
    });
    setFieldValidation({
      assetNameInvalid: false,
      assetIdInvalid: false,
      snInvalid: false,
    });
    setModalSaveIsDisablee(false)
    // onClose();
    changeState({ createModalIsopen: false });
  };

  // 获取 assigned to 数据
  const getAssignedToData = async () => {
    let res = await getDepartmentList();
    if (res?.data?.code == 200) {
      const { data } = res?.data;
      setAssignedToData(data);
    }
  };

  //添加assigned to
  const handleAddAssignedTo = async (data) => {
    let reqObj = {
      departmentName: data.text,
    };
    let res = await addDepartmentItem(reqObj);
    if (res?.data?.code == 200) {
      await getAssignedToData();
    } else {
      message.error('Failed to add Assigned To');
    }
    setAddassignedToModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newValidation = {
      orderNameInvalid: !formValue.orderName || formValue.orderName === '',
      orderIdInvalid: !formValue.orderId || formValue.orderId === '',
      assetIdInvalid: !formValue.assetId || formValue.assetId === '',
    };
    setFieldValidation(newValidation);

    // 所有必填项都已经填写
    if (!Object.values(newValidation).some((v) => v)) {
      setModalSaveIsDisablee(true)
      handleCreateWorkOrder(formValue);
      return;
    }
  };

  // 决定弹窗 header
  const getModalHeading = () => {
    if (createModaType == 'edit') {
      return `Work Order - ${tableData?.work_order}`;
    }
    if (createModaType == 'create') {
      return 'Create a New Work Order';
    }
  };

  // 创建 workOrder
  const handleCreateWorkOrder = async () => {
    let res =await addWorkOrder(formValue );
    if(res?.data?.code == 200){
      handleCancelClicked();
    }else{
      message.error('Failed to create Work Order');
    }
    setModalSaveIsDisablee(false)
  };

  return (
    <div className={styles.ModalFromStyle}>
      {!addassignedToModal && (
        <Modal
          open={createModalIsopen}
          modalHeading={getModalHeading()}
          primaryButtonText="Save"
          secondaryButtonText="Cancel"
          onRequestClose={handleCancelClicked}
          onRequestSubmit={handleSubmit}
          primaryButtonDisabled={modalSaveIsDisablee}
        >
          <Grid className="pl-0 pr-0">
            <Column sm={4} md={4} lg={8}>
              <TextInput
                className="mb-8"
                id="orderName"
                labelText="Order Name"
                placeholder="Order Name"
                required
                invalid={fieldValidation.orderNameInvalid}
                invalidText="This field cannot be empty"
                value={formValue.orderName}
                onChange={onFormValueChange}
                onFocus={(e) => {
                  // 可以自定义正则校验
                  // 校验不成功，可以修改fieldValidation 为true
                  // console.log('e: ', e.target.value);
                }}
              />
            </Column>
            <Column sm={4} md={4} lg={8}>
              <TextInput
                className="mb-8"
                id="orderId"
                labelText="Work Order Id"
                placeholder="house#1"
                required
                invalid={fieldValidation.orderIdInvalid}
                invalidText="This field cannot be empty"
                value={formValue.orderId}
                onChange={onFormValueChange}
              />
            </Column>
            <Column sm={4} md={4} lg={8}>
              <TextInput
                className="mb-8"
                id="assetId"
                labelText="Asset Id"
                placeholder="Asset Id"
                required
                invalid={fieldValidation.assetIdInvalid}
                invalidText="This field cannot be empty"
                value={formValue.assetId}
                onChange={onFormValueChange}
                onFocus={(e) => {
                  // 可以自定义正则校验
                  // 校验不成功，可以修改fieldValidation 为true
                  // console.log('e: ', e.target.value);
                }}
              />
            </Column>
            <Column sm={4} md={4} lg={8}>
              <TextInput
                className="mb-8"
                id="orderType"
                labelText="Work Order Type"
                placeholder="Work Order Type"
                value={formValue.orderType}
                onChange={onFormValueChange}
              />
            </Column>
            <Column sm={4} md={4} lg={8}>
              <Select
                className="mb-8"
                id="status"
                labelText="Status"
                value={formValue.status}
                // placeholder="Choose an option"
                onChange={onFormValueChange}
              >
                <SelectItem value="" text="Choose an option" />
                {statusList.map((item, ind) => {
                  return <SelectItem key={ind} value={ind + 1} text={item.label} />;
                })}
              </Select>
            </Column>
            <Column sm={4} md={4} lg={8}>
              <Select
                className="mb-8"
                id="priority"
                labelText="Priority"
                value={formValue.priority}
                // placeholder="Choose an option"
                onChange={onFormValueChange}
              >
                {/* 暂时写死 123 */}
                <SelectItem value="" text="Choose an option" />
                <SelectItem value="1" text="1" />
                <SelectItem value="2" text="2" />
                <SelectItem value="3" text="3" />
              </Select>
            </Column>
            <Column sm={4} md={4} lg={8}>
              <DatePicker
                className="mb-8"
                datePickerType="single"
                onChange={(e) => {
                  let obj ={...formValue,creationTime:moment(e[0]).format('YYYY-MM-DD')}
                  setFormValues(obj)
                }}
              >
                <DatePickerInput
                  id='creationTime'
                  labelText="Creation Time"
                  placeholder="mm/dd/yyyy"
                />
              </DatePicker>
            </Column>
            <Column sm={4} md={4} lg={8}>
              <DatePicker
                className="mb-8"
                datePickerType="single"
                onChange={(e)=>{
                  let obj ={...formValue,dueTime:moment(e[0]).format('YYYY-MM-DD')}
                  setFormValues(obj)
                }}
              >
                <DatePickerInput
                  id='dueTime'
                  labelText="Due Time"
                  placeholder="mm/dd/yyyy"
                />
              </DatePicker>
            </Column>
            <Column sm={4} md={4} lg={8}>
              <Select
                className="mb-8"
                id="assignedTo"
                labelText={
                  <div
                    style={{ display: 'flex' }}
                    onClick={() => {
                      setAddassignedToModal(true);
                    }}
                  >
                    <span className="mr-1">Assigned To</span>
                    <AddAlt />
                  </div>
                }
                value={formValue.assignedTo}
                // placeholder="Choose an option"
                onChange={onFormValueChange}
              >
                <SelectItem value="" text="Choose an option" />
                {assignedToData.map((item, ind) => {
                  return (
                    <SelectItem
                      key={ind}
                      value={item.id}
                      text={item.departmentName}
                    />
                  );
                })}
              </Select>
            </Column>
            <Column sm={4} md={4} lg={16}>
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
      )}

      <AddassignedToModal
        addModal={addassignedToModal}
        modalTitle={'Assigned To'}
        changeModalOpen={(data) => {
          setAddassignedToModal(false);
        }}
        addConfirm={async (data) => {
          await handleAddAssignedTo(data);
        }}
      />
    </div>
  );
};

export default ModalPages;
