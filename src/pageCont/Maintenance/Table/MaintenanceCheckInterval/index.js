import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import moment from 'moment';
import classNames from 'classnames';
import tableStyles from '@/styles/table/table.module.scss';

import {
  Pagination,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  DataTable,
  ExpandableSearch,
  TextInput,
  DatePicker,
  DatePickerInput,
  RadioButton,
} from '@carbon/react';
import { AddAlt } from '@carbon/icons-react';
import { message } from 'antd';
import {
  getMaintenancelist,
  createMaintenance,
  completedMaintenance,
} from '@/api/maintenance';

function HistoricalMaintenanceLog(props) {
  const { selectedProduct, changeState } = props;

  const headers = [
    { key: 'scheduledDate', header: 'Date' },
    { key: 'content', header: 'Maintenance Content' },
  ];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const [addList, setAddList] = useState([]);
  const [addIndex, setAddIndex] = useState(1);
  const [disable, setDisAble] = useState(false);

  useEffect(() => {
    getTableList(page, pageSize, search);
  }, [selectedProduct]);

  const getTableList = async (num, size, search, deletAddId) => {
    setDisAble(true);

    let params = {
      searchContent: search,
      assetTypeId: selectedProduct,
      pageNum: num,
      pageSize: size,
      status: 0,
    };

    let res = await getMaintenancelist(params);

    if (res?.data?.code == 200) {
      const { list, total } = res?.data?.data;

      if (deletAddId) {
        let newAddList = addList.filter((item) => item.id !== deletAddId);

        setAddList(newAddList);
        setRows([...newAddList, ...list]);
      } else {
        setRows([...addList, ...list]);
      }
      setTotal(total);
      setPage(num);
      setPageSize(size);
    }

    setDisAble(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    getTableList(page, pageSize, value);
  };

  const showAdd = () => {
    if(disable){
      return;
    }

    let obj = {
      id: `add-${addIndex}`,
      scheduledDate: '',
      content: '',
    };

    let newAddList = [...addList];
    let newRow = [...rows];

    newAddList.unshift(obj);
    newRow.unshift(obj);

    setAddIndex(addIndex + 1);
    setAddList(newAddList);
    setRows(newRow);
  };

  const onFormValueChange = (value, key, id) => {
    let newRows = [...rows]?.map((item) => {
      if (item.id === id) {
        return { ...item, [key]: value };
      }
      return item;
    });
    let newAddList = [...addList]?.map((item) => {
      if (item.id === id) {
        return { ...item, [key]: value };
      }
      return item;
    });

    setRows(newRows);
    setAddList(newAddList);
  };

  const handleSubmit = (id) => {
    if(disable){
      return;
    }

    const obj = rows?.filter((item) => item.id === id)?.[0];

    if (!obj.scheduledDate || obj.scheduledDate === '') {
      message.error('Date cannot be empty');
      return;
    }
    if (!obj.content || obj.content === '') {
      message.error('Maintenance Content cannot be empty');
      return;
    }
    handleCreateMaintenance(id);
  };

  const handleCreateMaintenance = async (id) => {
    setDisAble(true)

    const obj = rows?.filter((item) => item.id === id)?.[0];

    let params = {
      assetTypeId: selectedProduct,
      scheduledDate: obj.scheduledDate,
      content: obj.content,
    };

    let res = await createMaintenance(params);

    if (res?.data?.code == 200) {
      getTableList(page, pageSize, search, id);
    } else {
      message.error('Operation Failed');
    }

    setDisAble(false)
  };

  const handleCancel = (id) => {
    if(disable){
      return;
    }

    setAddList(addList.filter((item) => item.id !== id));
    setRows(rows.filter((item) => item.id !== id));
  };

  const handleCompletedMaintenance = async (id) => {
    setDisAble(true);

    let params = {
      id,
    };

    let res = await completedMaintenance(params);

    if (res?.data?.code == 200) {
      getTableList(page, pageSize, search, id);
      changeState({
        logTableReload: true,
      });
    } else {
      message.error('Operation Failed');
    }

    setDisAble(false)
  };

  return (
    <div className={classNames(tableStyles.tableStyle)}>
      <div className={styles.title}>
        <div className={styles.titleName}>Maintenance Check Interval</div>
        <div className={styles.titleAction}>
          <div className={styles.search}>
            <ExpandableSearch
              size="sm"
              labelText="Search"
              closeButtonLabelText="Clear search input"
              id="search-expandable-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.keyCode === 13) {
                  handleSearch(e);
                }
              }}
              onBlur={(e) => {
                handleSearch(e);
              }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              disabled={disable}
            />
          </div>
          {rows?.length > 0 && (
            <div style={{ cursor: disable ? 'not-allowed' : 'pointer' }}>
              <AddAlt onClick={showAdd} />
            </div>
          )}
        </div>
      </div>

      {rows?.length > 0 ? (
        <div className={styles.table}>
          <DataTable rows={rows} headers={headers} radio>
            {({
              rows,
              headers,
              getHeaderProps,
              getRowProps,
              getSelectionProps,
              getTableProps,
              getTableContainerProps,
            }) => (
              <TableContainer {...getTableContainerProps()}>
                <Table {...getTableProps()} aria-label="sample table">
                  <TableHead>
                    <TableRow>
                      <TableHeader style={{ borderRight:'none' }}/>
                      {headers.map((header, i) => (
                        <TableHeader
                          key={i}
                          {...getHeaderProps({
                            header,
                          })}
                        >
                          {header.header}
                        </TableHeader>
                      ))}
                      {/* <th scope="col" style={{ width: '150px' }} /> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, i) => {
                      return (
                        <TableRow
                          key={i}
                          {...getRowProps({
                            row,
                          })}
                        >
                          {(row.id + '').includes('add') ? (
                            <>
                              <td style={{ width: '48px', borderRight:'none' }}></td>
                              {row.cells.map((cell) => {
                                if (cell.id.includes('scheduledDate')) {
                                  return (
                                    <TableCell key={cell.id}>
                                      <DatePicker
                                        readOnly={disable}
                                        datePickerType="single"
                                        onChange={(e) => {
                                          onFormValueChange(
                                            moment(e[0]).format('YYYY-MM-DD'),
                                            'scheduledDate',
                                            row.id,
                                          );
                                        }}
                                      >
                                        <DatePickerInput
                                          id={cell.id}
                                          placeholder="mm/dd/yyyy"
                                        />
                                      </DatePicker>
                                    </TableCell>
                                  );
                                }
                                if (cell.id.includes('content')) {
                                  return (
                                    <TableCell key={cell.id}>
                                      <div className={styles.addMaintenanceInput}>
                                      <TextInput
                                        disabled={disable}
                                        id={cell.id}
                                        onChange={(e) => {
                                          onFormValueChange(
                                            e.target.value,
                                            'content',
                                            row.id,
                                          );
                                        }}
                                      />
                                      <div className={styles.actions}>
                                        <span
                                          className={styles.save}
                                          onClick={() => handleSubmit(row.id)}
                                          style={{ cursor: disable ? 'not-allowed' : 'pointer' }}
                                        >
                                          Save
                                        </span>
                                        <span
                                          className={styles.cancel}
                                          onClick={() => handleCancel(row.id)}
                                          style={{ cursor: disable ? 'not-allowed' : 'pointer' }}
                                        >
                                          Cancel
                                        </span>
                                      </div>
                                      </div>
                                      
                                    </TableCell>
                                  );
                                }
                                // return (
                                //   <TableCell key={cell.id}>
                                //     {cell.value}
                                //   </TableCell>
                                // );
                              })}
                              {/* <td style={{ width: '150px' }}>
                                
                              </td> */}
                            </>
                          ) : (
                            <>
                              <td style={{ width: '48px', borderRight:'none'}}>
                                <RadioButton
                                  disabled={disable}
                                  onClick={() =>
                                    handleCompletedMaintenance(row.id)
                                  }
                                />
                              </td>
                              {row.cells.map((cell) => (
                                <TableCell key={cell.id}>
                                  {cell.value}
                                </TableCell>
                              ))}
                              {/* <td style={{ width: '150px' }}></td> */}
                            </>
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
          <Pagination
            backwardText="Previous page"
            forwardText="Next page"
            itemsPerPageText=""
            page={page}
            pageNumberText="Page Number"
            pageSize={pageSize}
            pageSizes={[10, 20, 30, 40, 50]}
            totalItems={total}
            onChange={({ page, pageSize }) => {
              getTableList(page, pageSize, search);
            }}
            disabled={disable}
          />
        </div>
      ) : (
        <div className={styles.addArea}  style={{ cursor: disable ? 'not-allowed' : 'pointer' }}>
          <AddAlt className={styles.icon} onClick={showAdd} />
        </div>
      )}
    </div>
  );
}

export default HistoricalMaintenanceLog;
