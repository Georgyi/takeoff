import React, { Component } from 'react';
import { Button, Table } from 'antd';
import { connect } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import ControlPanel from '../layouts/control-panel';
import ContactModalForm from './components/contact-modal-form';
import { addContact, removeContact, updateContact } from './actions';

import './index.scss';

const renderCellValue = (text) => {
  const LSSearch = localStorage.getItem('search');

  if (!LSSearch) return text;

  const splitText = text.split(LSSearch);

  if (!splitText.length) return (<span className="search-value">{LSSearch}</span>);

  const jsx = [];

  splitText.forEach((text, i) => {
    if (i === splitText.length - 1) {
      jsx.push(text);
    } else {
      jsx.push(text);
      jsx.push(<span key={`${text}-${LSSearch}`} className="search-value">{LSSearch}</span>);
    }
  });

  return jsx;
};

const columns = [
  {
    title: 'Имя',
    dataIndex: 'firstName',
    key: 'firstName',
    render: renderCellValue,
  },
  {
    title: 'Фамилия',
    dataIndex: 'lastName',
    key: 'lastName',
    render: renderCellValue,
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone',
    render: renderCellValue,
  },
  {
    title: 'Действия',
    dataIndex: 'actions',
    key: 'actions',
  }
];

class Contacts extends Component {
  state = {
    isShowModal: false,
    initialContact: null,
  };

  showModal = (contact = null) => this.setState({ isShowModal: true, initialContact: contact });

  handleOk = (contact) => {
    this.props.addContact(contact);
    this.setState({ isShowModal: false, initialContact: null });
  };

  handleCancel = () => this.setState({ isShowModal: false, initialContact: null });

  getActions = (contact) => (
    <>
      <Button type="primary" icon={<EditOutlined />} onClick={() => this.showModal(contact)} />
      <Button className="remove-btn" type="danger" icon={<DeleteOutlined />} onClick={() => this.props.removeContact(contact.id)} />
    </>
  );

  getContactsRow = () => {
    return this.props.contacts.map((contact) => {
      return { key: contact.id, ...contact, actions: this.getActions(contact) };
    });
  };

  updateContact = (contact) => {
    this.props.updateContact(contact);
    this.handleCancel();
  };

  render() {
    const { isShowModal, initialContact } = this.state;

    const modalTitle = initialContact ? 'Отредактировать контакт' : 'Создать контакт';

    return (
      <div className="contacts-page">
        <ControlPanel showModal={() => this.showModal()} />
        <Table dataSource={this.getContactsRow()} columns={columns} pagination={false} />
        <ContactModalForm
          title={modalTitle}
          isShowModal={isShowModal}
          addContact={this.handleOk}
          onCancel={this.handleCancel}
          contact={initialContact}
          updateContact={this.updateContact}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ contacts: { contacts } }) => ({ contacts });

export default connect(mapStateToProps, { addContact, updateContact, removeContact })(Contacts);
