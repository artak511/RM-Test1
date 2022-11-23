import React from 'react';
import { Paths } from 'constant';
import { useNavigate } from 'react-router';
import { PageTitle } from 'components/common/pageTitle';
import { Pagination } from 'components/common/pagination';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Table, Popconfirm, Row, Col, Input } from 'antd';
import { useSources } from 'components/pages/source/hooks/useSources';
import 'components/pages/source/sources.css';
import moment from 'moment';

const { Search } = Input;

export const Source = React.memo(() => {
  const { sources, onPageChange, paginationData, onDelete, setSearch } = useSources();
  const navigate = useNavigate();

  const columns: any = [
    { key: 'ipAddress', title: 'IP Address', dataIndex: 'ipAddress' },
    { key: 'name', title: 'Name', dataIndex: 'name' },
    {
      key: 'tags', title: 'Tags', dataIndex: 'tags',
      render: (tags: string[]) => {
        return tags?.join(', ')
      }
    },
    {
      key: 'createdAt', title: 'created Date', dataIndex: 'createdAt',
      render: (date: Date) => {
        return moment(date).format('DD-MM-YYYY')
      }
    },
    {
      key: 'updatedAt', title: 'updated Date', dataIndex: 'updatedAt',
      render: (date: Date) => {
        return moment(date).format('DD-MM-YYYY')
      }
    },
    {
      key: 'id', title: '', dataIndex: 'id', align: 'right',
      render: (id: number) => {
        return <div className={'actions'}>
          <Button
            title={'Edit source'}
            onClick={() => navigate(Paths.source.addEdit.replace(':id', `${id}`))}
            className={'warning'}
            icon={<EditOutlined />} />
          <Popconfirm
            placement="top"
            title={'Are you sure you want to delete?'}
            onConfirm={() => onDelete(id)}
            okText="Yes"
            cancelText="No">
            <Button title={'Delete source'} type="primary" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </div>
      }
    }
  ];

  return (
    <>
      <PageTitle>
        Source List
      </PageTitle>
      <div className={'sources'}>
        <div className={'panel'}>
          <Row justify={'space-between'}>
            <Col>
              <Search
                placeholder="Search ..."
                onSearch={(e) => setSearch(e)}
                style={{ width: 350 }}
              />
            </Col>
            <Col>
              <Button
                type={'primary'}
                onClick={() => navigate(Paths.source.addEdit.replace(':id', 'add'))}>
                + Add Source
              </Button>
            </Col>
          </Row>
          <Table
            pagination={false}
            columns={columns}
            rowKey={(record) => `${record.id}`}
            dataSource={sources} />
          {
            paginationData.count !== 0
            &&
            <Pagination
              activePage={paginationData.page}
              pagesCount={paginationData.count / paginationData.perPage}
              onPageClick={onPageChange}
            />
          }
        </div>
      </div>
    </>
  );
})