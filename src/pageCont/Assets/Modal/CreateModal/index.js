import React, { useEffect, useState } from 'react';
import {
  Modal,
  TextInput,
  Select,
  SelectItem,
  Column,
  Grid,
  FileUploaderDropContainer,
  FileUploaderItem,
} from '@carbon/react';
import { AddAlt } from '@carbon/icons-react';
import classNames from 'classnames';
import { message } from 'antd';
import modalStyles from '@/styles/modal/modal.module.scss';
import AddDepartmentModal from '@/pageCont/components/AddModal';
import styles from './index.module.scss';
import { addAsset, addFile, getAssetTypeList ,getDepartmentList ,addDepartmentItem} from '@/api/assets';

const ModalPages = ({ createModalIsopen, changeState }) => {
  const [assetTypeData, setAssetTypeData] = useState([]); 
  const [departmentData,setDepartmentData] = useState([])
  const [addDepartmentModal, setAddDepartmentModal] = useState(false); // 添加 department 弹窗
  const [isUploading, setIsUploading] = useState(false);
  const [fieldValidation, setFieldValidation] = useState({
    assetNameInvalid: false,
    assetIdInvalid: false,
    snInvalid: false,
  });
  const [formValue, setFormValues] = useState({
    assetName: '',
    assetId: '',
    sn: '',
    assetTypeId: '',
    status: '',
    departmentId: '',
    location: '',
    value: '',
    responsiblePerson: '',
    description: '',
    attachmentDir: '', //文件上传
    attachmentName: '', //文件上传
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
    if(res?.data?.code == 200){
      const {data} = res?.data;
      setDepartmentData(data);
    }
  }

  //添加departmentData
  const handleAddDepartment = async (data) => {
    let reqObj = {
      departmentName:data.text
    }
    let res =await addDepartmentItem(reqObj)
    if(res?.data?.code == 200){
      await getDepartmentData();
    }else{
      message.error('Failed to add Department')
    }
    setAddDepartmentModal(false)
  }

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
      assetTypeId: '',
      status: '',
      departmentId: '',
      location: '',
      installationDate: '',
      value: '',
      responsiblePerson: '',
      description: '',
      attachmentDir: '', //文件上传
      attachmentName: '', //文件上传
    });
    setFieldValidation({
      assetNameInvalid: false,
      assetIdInvalid: false,
      snInvalid: false,
    });
    setFile(null);
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
          modalHeading="Create a New Asset"
          primaryButtonText="Save"
          secondaryButtonText="Cancel"
          onRequestClose={handleCancelClicked}
          onRequestSubmit={handleSubmit}
          primaryButtonDisabled={!isUploading}
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
              <Select
                className="mb-8"
                id="assetTypeId"
                labelText="Asset Type"
                value={formValue.assetTypeId}
                // placeholder="Choose an option"
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
              <Select
                className="mb-8"
                id="departmentId"
                labelText={
                  <div
                    style={{ display: 'flex' }}
                    onClick={() => {
                      setAddDepartmentModal(true);
                    }}
                  >
                    <span className="mr-1">Department</span>
                    <AddAlt />
                  </div>
                }
                value={formValue.departmentId}
                // placeholder="Choose an option"
                onChange={onFormValueChange}
              >
                <SelectItem value="" text="Choose an option" />
                {departmentData.map((item,ind)=>{
                  return <SelectItem key={ind} value={item.id} text={item.departmentName} />
                })}
              </Select>
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
            <Column sm={2} md={4} lg={8}>
              <TextInput
                className="mb-8"
                id="description"
                labelText="Responsible PersonDescription"
                placeholder="Responsible PersonDescription"
                value={formValue.description}
                onChange={onFormValueChange}
              />
            </Column>
            <Column sm={2} md={4} lg={16}>
              <p className={styles.cds_file_label}>Upload files</p>
              {file == null && (
                <div style={{ width: '100%', position: 'relative' }}>
                  <FileUploaderDropContainer
                    accept=".pdf,.docx" // 限制上传文件类型为 PDF 和 Word 文档
                    labelText={
                      <div className={styles.uploadDocument}>
                        <AddAlt size={16} />{' '}
                        <span style={{ marginLeft: 10 }}>Upload Document</span>
                      </div>
                    }
                    multiple={false}
                    onAddFiles={(e) => {
                      setFile(e.target.files);
                      // 调用上传接口
                      uploadFile(e.target.files[0]);
                    }}
                  />
                  <div className={styles.cds_label_description}>
                    <div>Supported Formats:</div>
                    <div className={styles.fileType}>PDF</div>
                    <div className={styles.fileType}>Word</div>
                  </div>
                </div>
              )}
              {file?.length > 0 && (
                <FileUploaderItem
                  iconDescription="Delete file"
                  name={file[0].name}
                  onDelete={() => {
                    setFile(null);
                  }}
                  size="md"
                  status={isUploading ? 'edit' : 'uploading'}
                />
              )}
            </Column>
          </Grid>
        </Modal>
      )}
      <AddDepartmentModal
        addModal={addDepartmentModal}
        modalTitle={'Department'}
        changeModalOpen={(data) => {
          setAddDepartmentModal(false);
        }}
        addConfirm={async(data) => {
          await handleAddDepartment(data)
        }}
      />
    </div>
  );
};

export default ModalPages;
