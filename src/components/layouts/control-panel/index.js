import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { logout } from '../../../store/reducer/auth/actions';
import { searchContacts } from '../../contacts/actions';

import './index.scss';

const ControlPanel = ({ showModal }) => {
  const [searchValue, setSearchValue] = useState(null);
  const dispatch = useDispatch();

  const onSearch = (value) => {
    setSearchValue(value);
    dispatch(searchContacts(value));
  };

  const clearSearch = () => onSearch(null);

  return (
    <div className="control-panel">
      <div className="search-input">
        <Input.Search
          placeholder="Поиск контакта"
          onSearch={onSearch}
          onChange={({ target: { value } }) => setSearchValue(value)}
          value={searchValue}
        />
        {!!searchValue && (<Button type="primary" icon={<CloseCircleOutlined />} onClick={clearSearch}>Очистить</Button>)}
      </div>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal} />
      <Button onClick={() => dispatch(logout())}>Выйти</Button>
    </div>
  );
};

export default ControlPanel;
