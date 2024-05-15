import React, { useEffect, useState } from 'react';
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
import classNames from 'classnames';
import { message } from 'antd';
import modalStyles from '@/styles/modal/modal.module.scss';
// import AddDepartmentModal from '@/pageCont/components/AddModal';
import styles from './index.module.scss';
import {
  addAsset,
  addFile,
  getAssetTypeList,
  getDepartmentList,
  addDepartmentItem,
} from '@/api/assets';

const ModalPages = ({ createModalIsopen, changeState }) => {
  const [assetTypeData, setAssetTypeData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [addDepartmentModal, setAddDepartmentModal] = useState(false); // 添加 department 弹窗
  const [isUploading, setIsUploading] = useState(false);
  const [formValue, setFormValues] = useState({
    assetName: '',
    assetId: '',
    sn: '',
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    getAssetTypeData();
    getDepartmentData();
  }, [createModalIsopen]);

  // 获取assetTypeData
  const getAssetTypeData = async () => {
    let res = await getAssetTypeList();
    if (res?.data?.code == 200) {
      const { data } = res?.data;
      setAssetTypeData(data);
    }
  };
  // 获取departmentData
  const getDepartmentData = async () => {
    let res = await getDepartmentList();
    if (res?.data?.code == 200) {
      const { data } = res?.data;
      setDepartmentData(data);
    }
  };

  //添加departmentData
  const handleAddDepartment = async (data) => {
    let reqObj = {
      departmentName: data.text,
    };
    let res = await addDepartmentItem(reqObj);
    if (res?.data?.code == 200) {
      await getDepartmentData();
    } else {
      message.error('Failed to add Department');
    }
    setAddDepartmentModal(false);
  };

  const onFormValueChange = (e) => {
    const { id, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  // 初始化数据
  const handleCancelClicked = () => {
    setFormValues({
      assetName: '',
      assetId: '',
      sn: '',
      
    });
    changeState({ createModalIsopen: false });
    setIsUploading(false);
  };

  // 提交
  const handleSubmit = (e) => {
    e.preventDefault();
    const newValidation = {
      assetNameInvalid: !formValue.assetName || formValue.assetName === '',
      assetIdInvalid: !formValue.assetId || formValue.assetId === '',
      snInvalid: !formValue.sn || formValue.sn === '',
    };
    setFieldValidation(newValidation);
    // 所有必填项都已经填写
    if (!Object.values(newValidation).some((v) => v)) {
      createAsset(formValue);
      return;
    }
  };
  // 提交接口
  const createAsset = async () => {
    let res = await addAsset(formValue);
    if (res.data?.code == 200) {
      handleCancelClicked();
    }
  };

  // 上传文件
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    let res = await addFile(formData);
    if (res?.data?.code == 200) {
      const { data } = res?.data;
      let obj = {
        attachmentDir: data.attachmentDir,
        attachmentName: data.attachmentName,
      };
      setFormValues({ ...formValue, ...obj });
      setIsUploading(true);
    } else {
      setFile(null);
      message.error('Upload failure');
    }
  };

  return (
    <div
      className={classNames([modalStyles.ModalFromStyle, styles.createModal])}
    >
      {/* <Toast /> */}
      {!addDepartmentModal && (
        <Modal
          open={createModalIsopen}
          modalHeading="Asset Type"
          primaryButtonText="Save"
          secondaryButtonText="Cancel"
          onRequestClose={handleCancelClicked}
          onRequestSubmit={handleSubmit}
          primaryButtonDisabled={!isUploading}
        >
          <Grid className="pl-0 pr-0">
            <Column sm={2} md={4} lg={8}>
              <Select
                className="mb-8"
                id="assetName"
                labelText={
                  <div
                    style={{ display: 'flex' }}
                    onClick={() => {
                      setAddDepartmentModal(true);
                    }}
                  >
                    <span className="mr-1">Asset Type Name</span>
                    <AddAlt />
                  </div>
                }
                value={formValue.assetName}
                onChange={onFormValueChange}
              >
                <SelectItem value="" text="Choose an option" />
                {assetTypeData.map((item, ind) => {
                  return (
                    <SelectItem
                      key={item.id}
                      value={item.id}
                      text={item.assetType}
                    />
                  );
                })}
              </Select>
            </Column>

            <Column sm={2} md={4} lg={8}>
              <DatePicker
                className="mb-8"
                datePickerType="single"
                onChange={(e) => {
                  let obj = {
                    ...formValue,
                    creationTime: moment(e[0]).format('YYYY-MM-DD'),
                  };
                  setFormValues(obj);
                }}
              >
                <DatePickerInput
                  labelText="Expected Date"
                  placeholder="mm/dd/yyyy"
                />
              </DatePicker>
            </Column>

            <Column sm={2} md={4} lg={8}>
              <TextInput
                id="sn"
                labelText="Ecpected Quantity"
                placeholder="Ecpected Quantity"
                value={formValue.sn}
                onChange={onFormValueChange}
              />
            </Column>
          </Grid>
        </Modal>
      )}
      {/* <AddDepartmentModal
        addModal={addDepartmentModal}
        modalTitle={'Department'}
        changeModalOpen={(data) => {
          setAddDepartmentModal(false);
        }}
        addConfirm={async (data) => {
          await handleAddDepartment(data);
        }}
      /> */}
    </div>
  );
};

export default ModalPages;
