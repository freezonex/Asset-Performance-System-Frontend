import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import modalStyles from '@/styles/modal/modal.module.scss';
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
import { message, Spin } from 'antd';
import AddDepartmentModal from '@/pageCont/components/AddModal';
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
  const [radioDisable, setRadioDisable] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [glbFileLoading, setGlbFileLoading] = useState(false);

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

  // 修改回显数据
  const setinitValue = () => {
    const { usedStatus, departmentId, status } = tableRowData;
    let obj = {...tableRowData}

    if (usedStatus === 1) {
      setRadioDisable(true);
    }
    if(!status){
      obj.status = ''
    }
    if(!departmentId){
      obj.departmentId = ''
    }
    setFormValues({
      ...obj,
    });
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
    setRadioDisable(false);
    setFileLoading(false);
    setGlbFileLoading(false);
    if (type === 'edit') {
      changeState({ editModalIsopen: false });
    } else {
      changeState({ createModalIsopen: false });
    }
  };

  // 提交
  const handleSubmit = (e) => {
    if (type === 'edit') {
      editAsset();
    } else {
      createAsset();
    }
  };

  // 创建数据
  const createAsset = async () => {
    let res = await addAsset(formValue);
    if (res?.data?.code == 200) {
      handleCancelClicked();
    } else {
      message.error('Failed to add Asset');
    }
  };

  // 修改数据
  const editAsset = async () => {
    const {
      assetName,
      sn,
      assetTypeId,
      status,
      departmentId,
      location,
      value,
      responsiblePerson,
      description,
      usedStatus,
      modelUrl,
      gblDir,
      gblFileName,
      attachmentDir,
      attachmentName,
    } = formValue;

    let filterFormValue = {
      assetName,
      sn,
      assetTypeId,
      status,
      departmentId,
      location,
      value,
      responsiblePerson,
      description,
      usedStatus,
      modelUrl,
      gblDir,
      gblFileName,
      attachmentDir,
      attachmentName,
    };

    const assetObj = assetTypeData.filter(
      (item) => item.id == assetTypeId,
    )?.[0];
    const departmentObj = departmentData.filter(
      (item) => item.id == departmentId,
    )?.[0];

    if (gblFileName === '') {
      filterFormValue.glbUrl = '';
    }

    const param = {
      ...tableRowData,
      ...filterFormValue,
      assetType: assetObj?.assetType || '',
      department: departmentObj?.departmentName || '',
    };
    let res = await assetUpdate(param);
    if (res?.data?.code == 200) {
      handleCancelClicked();
    } else {
      message.error('Failed to edit Asset');
    }
  };

  // 上传文件
  const uploadFile = async (file, dir, name) => {
    if (name === 'gblFileName') {
      setGlbFileLoading(true);
    }
    if (name === 'attachmentName') {
      setFileLoading(true);
    }
    const formData = new FormData();
    formData.append('file', file);
    let res = await addFile(formData);
    if (res?.data?.code == 200) {
      const { data } = res?.data;
      let obj = {
        [dir]: data.attachmentDir,
        [name]: data.attachmentName,
      };
      setFormValues((prevValues) => ({
        ...prevValues,
        ...obj,
      }));
      if (name === 'gblFileName') {
        setGlbFileLoading(false);
      }
      if (name === 'attachmentName') {
        setFileLoading(false);
      }
    } else {
      if (name === 'gblFileName') {
        setGlbFileLoading(false);
      }
      if (name === 'attachmentName') {
        setFileLoading(false);
      }
      message.error('Upload failure');
    }
  };

  return (
    <div
      className={classNames([modalStyles.ModalFromStyle, styles.createModal])}
    >
      {!addDepartmentModal && (
        <Modal
          open={createModalIsopen}
          modalHeading={type === 'edit' ? 'Edit' : 'Create a Asset'}
          primaryButtonText="Save"
          secondaryButtonText="Cancel"
          onRequestClose={handleCancelClicked}
          onRequestSubmit={handleSubmit}
          primaryButtonDisabled={fileLoading || glbFileLoading}
        >
          <Grid className="pl-0 pr-0">
            <Column sm={4} md={4} lg={8}>
              <TextInput
                className="mb-8"
                id="assetName"
                labelText="Asset Name"
                placeholder="Asset Name"
                required
                value={formValue.assetName}
                onChange={onFormValueChange}
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
                    <RadioButton labelText="Yes" value={1} id="radio-1" />
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
                <Spin tip="Loading..." spinning={glbFileLoading}>
                  <div style={{ width: '100%', position: 'relative' }}>
                    <FileUploaderDropContainer
                      accept=".glb" // 限制上传文件类型为 glb
                      labelText={
                        <div className={styles.uploadDocument}>
                          <AddAlt size={16} />
                          <span style={{ marginLeft: 10 }}>
                            Upload Document
                          </span>
                        </div>
                      }
                      multiple={false}
                      onAddFiles={(e) => {
                        // 调用上传接口
                        uploadFile(e.target.files[0], 'gblDir', 'gblFileName');
                      }}
                    />
                    <div className={styles.cds_label_description}>
                      <div>Supported Formats:</div>
                      <div className={styles.fileType}>Glb</div>
                    </div>
                  </div>
                </Spin>
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
                  status={'edit'}
                />
              )}
            </Column>
            <Column sm={4} md={8} lg={16}>
              <p className={styles.cds_file_label}>Attachments</p>
              {!formValue.attachmentName && (
                <Spin tip="Loading..." spinning={fileLoading}>
                  <div style={{ width: '100%', position: 'relative' }}>
                    <FileUploaderDropContainer
                      accept=".pdf,.docx" // 限制上传文件类型为 PDF 和 Word 文档
                      labelText={
                        <div className={styles.uploadDocument}>
                          <AddAlt size={16} />{' '}
                          <span style={{ marginLeft: 10 }}>
                            Upload Document
                          </span>
                        </div>
                      }
                      multiple={false}
                      onAddFiles={(e) => {
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
                </Spin>
              )}
              {formValue.attachmentName && (
                <FileUploaderItem
                  iconDescription="Delete file"
                  name={formValue.attachmentName}
                  onDelete={() => {
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      attachmentDir: '',
                      attachmentName: '',
                    }));
                  }}
                  size="md"
                  status={'edit'}
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
