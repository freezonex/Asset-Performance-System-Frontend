import React, { useEffect, useState,useContext } from 'react';
import { Context } from '../../context';
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
import moment from 'moment';
import { message } from 'antd';
import modalStyles from '@/styles/modal/modal.module.scss';
import AddAssetTypeModal from '../AddAssetTypeModal';
import styles from './index.module.scss';
import { getAssetTypeList } from '@/api/assets';
import { createAssetTypeName, createInventory } from '@/api/common';

const ModalPages = ({ createModalIsopen, changeState }) => {
  const store = useContext(Context); //全局上下文
  const [assetTypeData, setAssetTypeData] = useState([]);
  const [addAssetTypeNameDataModal, setAddAssetTypeNameDataModall] =
    useState(false); // 添加 department 弹窗
  const [isPrimaryButtonDisabled, setIsPrimaryButtonDisabled] = useState(false);
  const [formValue, setFormValues] = useState({
    assetTypeId: '',
    expectedDate: '',
    expectedQuantity: '',
  });

  useEffect(() => {
    getAssetTypeData();
  }, [createModalIsopen]);

  // 获取assetTypeData
  const getAssetTypeData = async () => {
    let res = await getAssetTypeList();
    if (res?.data?.code == 200) {
      const { data } = res?.data;
      setAssetTypeData(data);
    }
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
      assetTypeId: '',
      expectedDate: '',
      expectedQuantity: '',
    });
    changeState({ createModalIsopen: false });
    setIsPrimaryButtonDisabled(false);
  };

  //添加 asset type name
  const addAssetTypeName = async (data) => {
    console.log(data);
    let res = await createAssetTypeName(data);
    if (res?.data?.code == 200) {
      setAddAssetTypeNameDataModall(false);
      changeState({ createModalIsopen: true });
    }
  };

  // 提交
  const handleSubmit = (e) => {
    setIsPrimaryButtonDisabled(true);
    addInventory();
  };
  // 提交接口
  const addInventory = async () => {
    let res = await createInventory(formValue);
    if (res.data?.code == 200) {
      handleCancelClicked();
      const {controller:{
        Table,RightList,Chart}} = store;
      // 刷新页面
      Table.getList({ pageNum:1, pageSize:10});
      Table.setState({unfoldMap:{}})
      RightList.getList();
      Chart.allList();
    } else {
      message.error('Creation failure');
    }
    setIsPrimaryButtonDisabled(false);
  };

  return (
    <div
      className={classNames([modalStyles.ModalFromStyle, styles.createModal])}
    >
      {/* <Toast /> */}
      {
        <Modal
          open={createModalIsopen}
          modalHeading="Asset Type"
          primaryButtonText="Save"
          secondaryButtonText="Cancel"
          onRequestClose={handleCancelClicked}
          onRequestSubmit={handleSubmit}
          primaryButtonDisabled={isPrimaryButtonDisabled}
        >
          <Grid className="pl-0 pr-0">
            <Column sm={4} md={4} lg={8}>
              <Select
                className="mb-8"
                id="assetTypeId"
                labelText={
                  <div
                    style={{ display: 'flex' }}
                    onClick={() => {
                      changeState({ createModalIsopen: false });
                      setAddAssetTypeNameDataModall(true);
                    }}
                  >
                    <span className="mr-1">Asset Type Name</span>
                    <AddAlt />
                  </div>
                }
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
              <DatePicker
                className="mb-8"
                datePickerType="single"
                value={moment(formValue.expectedDate, 'YYYY-MM-DD').valueOf()}
                onChange={(e) => {
                  let obj = {
                    ...formValue,
                    expectedDate: moment(e[0]).format('YYYY-MM-DD'),
                  };
                  setFormValues(obj);
                }}
              >
                <DatePickerInput
                  id="expectedDate"
                  labelText="Expected Date"
                  placeholder="mm/dd/yyyy"
                />
              </DatePicker>
            </Column>

            <Column sm={4} md={4} lg={8}>
              <TextInput
                id="expectedQuantity"
                labelText="Expected Quantity"
                placeholder="Expected Quantity"
                value={formValue.expectedQuantity}
                onChange={onFormValueChange}
              />
            </Column>
          </Grid>
        </Modal>
      }
      <AddAssetTypeModal
        addModal={addAssetTypeNameDataModal}
        modalTitle={'Asset Type Name'}
        changeModalOpen={(data) => {
          changeState({ createModalIsopen: true });
          setAddAssetTypeNameDataModall(false);
        }}
        addConfirm={async (data) => {
          await addAssetTypeName(data);
        }}
      />
    </div>
  );
};

export default ModalPages;
