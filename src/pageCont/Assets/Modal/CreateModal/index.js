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
  RadioButtonGroup,
  RadioButton,
} from '@carbon/react';
import { AddAlt } from '@carbon/icons-react';
import classNames from 'classnames';
import { message } from 'antd';
import modalStyles from '@/styles/modal/modal.module.scss';
import AddDepartmentModal from '@/pageCont/components/AddModal';
import styles from './index.module.scss';
import {
  addAsset,
  addFile,
  getAssetTypeList,
  getDepartmentList,
  addDepartmentItem,
  assetUpdate,
} from '@/api/assets';

const ModalPages = ({ createModalIsopen, changeState, type, tableRowData }) => {
  const [assetTypeData, setAssetTypeData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
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
    usedStatus: '',
    modelUrl: '',
    gblDir: '',
    gblFileName: '',
  });
  const [file, setFile] = useState(null);
  const [glbFile, setGlbFile] = useState(null);
  const [radioDisable, setRadioDisable] = useState(false);

  useEffect(() => {
    getAssetTypeData();
    getDepartmentData();

    if (type === 'edit') {
      setRadioDisable(false);
      setinitValue();
    }
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

  const setinitValue = () => {
    const { usedStatus } = tableRowData;
    if (usedStatus === 1) {
      setRadioDisable(true);
    }
    setFormValues({
      ...tableRowData,
    });
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
      assetTypeId: '',
      status: '',
      departmentId: '',
      location: '',
      value: '',
      responsiblePerson: '',
      description: '',
      attachmentDir: '', //文件上传
      attachmentName: '', //文件上传
      usedStatus: '',
      modelUrl: '',
      gblDir: '',
      gblFileName: '',
    });
    setFieldValidation({
      assetNameInvalid: false,
      assetIdInvalid: false,
      snInvalid: false,
    });
    setFile(null);
    setGlbFile(null);
    setIsUploading(false);
    if (type === 'edit') {
      changeState({ editModalIsopen: false });
    } else {
      changeState({ createModalIsopen: false });
    }
  };

  // 提交
  const handleSubmit = (e) => {
    // e.preventDefault();
    // const newValidation = {
    //   assetNameInvalid: !formValue.assetName || formValue.assetName === '',
    //   assetIdInvalid: !formValue.assetId || formValue.assetId === '',
    //   snInvalid: !formValue.sn || formValue.sn === '',
    // };
    // setFieldValidation(newValidation);
    // // 所有必填项都已经填写
    // if (!Object.values(newValidation).some((v) => v)) {
    // createAsset(formValue);
    //   return;
    // }

    if (type === 'edit') {
      editAsset();
    } else {
      createAsset();
    }
  };

  // 创建数据
  const createAsset = async () => {
    let res = await addAsset(formValue);
    if (res.data?.code == 200) {
      handleCancelClicked();
    } else {
      message.error('Failed to add Asset');
    }
  };

  // 修改数据
  const editAsset = async () => {
    let filterFormValue = {};
    Object.keys(formValue).forEach((key) => {
      if (formValue[key]) {
        filterFormValue[key] = formValue[key];
      }
    });

    const {assetTypeId, departmentId } = filterFormValue
    const assetObj = assetTypeData.filter((item)=>item.id == assetTypeId)[0]
    const departmentObj = departmentData.filter((item)=>item.id == departmentId)[0]

    const param = {
      ...tableRowData,
      ...filterFormValue,
      assetType: assetObj.assetType,
      department: departmentObj.departmentName

    };
    let res = await assetUpdate(param);
    if (res.data?.code == 200) {
      handleCancelClicked();
    } else {
      message.error('Failed to edit Asset');
    }
  };

  // 上传文件
  const uploadFile = async (file, dir, name) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    let res = await addFile(formData);
    if (res?.data?.code == 200) {
      const { data } = res?.data;
      let obj = {
        [dir]: data.attachmentDir,
        [name]: data.attachmentName,
      };
      setFormValues({ ...formValue, ...obj });
      setIsUploading(false);
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
          modalHeading={type === 'edit' ? 'Edit' : 'Create a Asset'}
          primaryButtonText="Save"
          secondaryButtonText="Cancel"
          onRequestClose={handleCancelClicked}
          onRequestSubmit={handleSubmit}
          primaryButtonDisabled={isUploading}
        >
          <Grid className="pl-0 pr-0">
            <Column sm={4} md={4} lg={8}>
              <TextInput
                className="mb-8"
                id="assetName"
                labelText="Asset Name"
                placeholder="Asset Name"
                required
                // invalid={fieldValidation.assetNameInvalid}
                // invalidText="This field cannot be empty"
                value={formValue.assetName}
                onChange={onFormValueChange}
                onFocus={(e) => {
                  // 可以自定义正则校验
                  // 校验不成功，可以修改fieldValidation 为true
                  // console.log('e: ', e.target.value);
                }}
              />
            </Column>
            {type !== 'edit' && (
              <Column sm={4} md={4} lg={8}>
                <TextInput
                  className="mb-8"
                  id="assetId"
                  labelText="Asset ID"
                  placeholder="house#1"
                  required
                  // invalid={fieldValidation.assetIdInvalid}
                  // invalidText="This field cannot be empty"
                  value={formValue.assetId}
                  onChange={onFormValueChange}
                />
              </Column>
            )}
            <Column sm={4} md={4} lg={8}>
              <TextInput
                className="mb-8"
                id="sn"
                labelText="SN"
                placeholder="SN"
                required
                // invalid={fieldValidation.snInvalid}
                // invalidText="This field cannot be empty"
                value={formValue.sn}
                onChange={onFormValueChange}
              />
            </Column>
            <Column sm={4} md={4} lg={8}>
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
                <SelectItem value="1" text="Running" />
                <SelectItem value="2" text="Maintaining" />
                <SelectItem value="3" text="Halt" />
                <SelectItem value="4" text="Stop" />
              </Select>
            </Column>
            <Column sm={4} md={4} lg={8}>
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
                {departmentData.map((item, ind) => {
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
            <Column sm={4} md={4} lg={8}>
              <TextInput
                className="mb-8"
                id="location"
                labelText="Location"
                placeholder="Location"
                value={formValue.location}
                onChange={onFormValueChange}
              />
            </Column>
            <Column sm={4} md={4} lg={8}>
              <TextInput
                className="mb-8"
                id="value"
                labelText="Value"
                placeholder="Value"
                value={formValue.value}
                onChange={onFormValueChange}
              />
            </Column>
            {type === 'edit' && (
              <Column sm={4} md={4} lg={8}>
                <TextInput
                  className="mb-8"
                  id="responsiblePerson"
                  labelText="Responsible Person"
                  placeholder="Responsible Person"
                  value={formValue.responsiblePerson}
                  onChange={onFormValueChange}
                />
              </Column>
            )}
            <Column sm={4} md={8} lg={16}>
              <TextInput
                className="mb-8"
                id="description"
                labelText="Description"
                placeholder="Description"
                value={formValue.description}
                onChange={onFormValueChange}
              />
            </Column>
            {type !== 'edit' && (
              <Column sm={4} md={4} lg={8}>
                <TextInput
                  className="mb-8"
                  id="responsiblePerson"
                  labelText="Responsible Person"
                  placeholder="Responsible Person"
                  value={formValue.responsiblePerson}
                  onChange={onFormValueChange}
                />
              </Column>
            )}
            {type === 'edit' && (
              <Column sm={4} md={4} lg={8}>
                <div style={{ height: '64px', marginBottom: '32px' }}>
                  <RadioButtonGroup
                    legendText="Has the Asset been used?"
                    name="radio-button-group"
                    valueSelected={formValue.usedStatus}
                    onChange={(v) => {
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        usedStatus: v,
                      }));
                    }}
                    id="usedStatus"
                    disabled={radioDisable}
                  >
                    <RadioButton labelText="Yes" value={1} id="radio-1"/>
                    <RadioButton labelText="No" value={0} id="radio-2" />
                  </RadioButtonGroup>
                </div>
              </Column>
            )}
            <Column sm={4} md={4} lg={8}>
              <TextInput
                className="mb-8"
                id="modelUrl"
                labelText="3D-URL"
                placeholder="3D-URL"
                value={formValue.modelUrl}
                onChange={onFormValueChange}
              />
            </Column>
            <Column sm={4} md={8} lg={16} style={{ marginBottom: '16px' }}>
              <p className={styles.cds_file_label}>3D-Glb</p>
              {!formValue.gblFileName && (
                <div style={{ width: '100%', position: 'relative' }}>
                  <FileUploaderDropContainer
                    accept=".glb" // 限制上传文件类型为 glb
                    labelText={
                      <div className={styles.uploadDocument}>
                        <AddAlt size={16} />
                        <span style={{ marginLeft: 10 }}>Upload Document</span>
                      </div>
                    }
                    multiple={false}
                    onAddFiles={(e) => {
                      setGlbFile(e.target.files);
                      // 调用上传接口
                      uploadFile(e.target.files[0], 'gblDir', 'gblFileName');
                    }}
                  />
                  <div className={styles.cds_label_description}>
                    <div>Supported Formats:</div>
                    <div className={styles.fileType}>Glb</div>
                  </div>
                </div>
              )}
              {formValue.gblFileName && (
                <FileUploaderItem
                  iconDescription="Delete file"
                  name={formValue.gblFileName}
                  onDelete={() => {
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      gblFileName: '',
                      gblDir: '',
                    }));
                  }}
                  size="md"
                  status={isUploading ? 'uploading' : 'edit'}
                />
              )}
            </Column>
            <Column sm={4} md={4} lg={16}>
              <p className={styles.cds_file_label}>Attachments</p>
              {!formValue.attachmentName && (
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
                      uploadFile(
                        e.target.files[0],
                        'attachmentDir',
                        'attachmentName',
                      );
                    }}
                  />
                  <div className={styles.cds_label_description}>
                    <div>Supported Formats:</div>
                    <div className={styles.fileType}>PDF</div>
                    <div className={styles.fileType}>Word</div>
                  </div>
                </div>
              )}
              {formValue.attachmentName && (
                <FileUploaderItem
                  iconDescription="Delete file"
                  name={formValue.attachmentName}
                  onDelete={() => {
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      attachmentName: '',
                      attachmentName: '',
                    }));
                  }}
                  size="md"
                  status={isUploading ? 'uploading' : 'edit'}
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
        addConfirm={async (data) => {
          await handleAddDepartment(data);
        }}
      />
    </div>
  );
};

export default ModalPages;
