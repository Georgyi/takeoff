import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import getId from 'uniqid';

import './index.scss';

const initialValue = { id: getId(), firstName: null, lastName: null, phone: null };

const ContactModalForm = ({ title, isShowModal, addContact, onCancel, contact, updateContact }) => {
  const [fieldsValues, setFieldsValues] = useState({...initialValue});

  useEffect(() => {
    if(contact) {
      setFieldsValues(contact);
    } else {
      setFieldsValues({...initialValue});
    }
  }, [contact]);

  const resetFieldsValues = () => setFieldsValues({...initialValue});

  const changeFieldValue = (fieldName, value) => {
    setFieldsValues({ ...fieldsValues, [fieldName]: value });
  };

  const isValidForm = () => {
    const keys = Object.keys(fieldsValues);
    const values = Object.values(fieldsValues);

    return keys.length === values.filter(Boolean).length;
  };

  const onSubmit = () => {
    if (isValidForm()) {
      contact ? updateContact(fieldsValues) : addContact(fieldsValues);
      resetFieldsValues();
    }
  };

  const onPressEnter = ({ key }) => key === 'Enter' ? onSubmit() : null;

  const renderInput = (inputName) => {
    const prefixIconByInputName = {
      firstName: (<UserOutlined className="prefix-form-icon" />),
      lastName: (<UserOutlined className="prefix-form-icon" />),
      phone: (<PhoneOutlined className="prefix-form-icon" />),
    };

    const placeholderByInputName = { firstName: "Имя", lastName: "Фамилия", phone: "Телефон" };

    return (
      <Input
        prefix={prefixIconByInputName[inputName]}
        placeholder={placeholderByInputName[inputName]}
        className="form-input"
        onChange={({ target: { value } }) => changeFieldValue(inputName, value )}
        value={fieldsValues[inputName]}
        onKeyPress={onPressEnter}
      />
    )
  };

  return (
    <Modal
      className="contact-modal-form"
      title={title}
      visible={isShowModal}
      onOk={onSubmit}
      onCancel={() => {
        onCancel();
        resetFieldsValues();
      }}
      okButtonProps={{ disabled: !isValidForm() }}
    >
      {renderInput('firstName')}
      {renderInput('lastName')}
      {renderInput('phone')}
    </Modal>
  );
};

export default ContactModalForm;
