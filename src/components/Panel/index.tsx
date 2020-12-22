import React, { FC, useState } from 'react'
import FormModal from '../Modal/AddEdit'
import { PanelContainer, PanelContent, PanelMain, PanelActions, ContentTitle, ContentItem, Sidebar, Item, Button } from './styles'
import IContact from '../../type'

interface IPanelProps {
  data: any;
  onSave: (
    data: IContact,
    activeKey: string
  ) => void;
}

const Panel:FC<IPanelProps> = ({ data, onSave }) => {
  const [modalOpened, setModalOpened] = useState(0) // 0: Close 1: Add Modal 2: Edit Modal
  const [activeKey, setActiveKey] = useState('')
  const dataLength = Object.keys(data).length

  const handleSave = (contact: IContact) => {
    if (modalOpened === 2) {
      onSave(contact, activeKey)
    } else if (modalOpened === 1) {
      onSave(contact, `Contact ${dataLength + 1}`)
    }
    setModalOpened(0)
  }

  return (
    <>
      <FormModal
        open={modalOpened > 0}
        contact={modalOpened === 2 ? data[activeKey] : undefined}
        onClose={() => setModalOpened(0)}
        onSave={(contact) => handleSave(contact)}
      />
      <PanelContainer>
        <Sidebar>
          { dataLength > 0 && Object.keys(data).map((key, index) => {
            return <Item
              onClick={() => setActiveKey(key)}
              active={activeKey === key}
              key={index}
            >{key}</Item>
          })}
        </Sidebar>
        <PanelMain>
          {activeKey !== '' &&
            <>
              <PanelContent>
                <ContentTitle>{activeKey}</ContentTitle>
                <ContentItem>Name: {data[activeKey].name}</ContentItem>
                <ContentItem>Phone: {data[activeKey].phone}</ContentItem>
                <ContentItem>Email: {data[activeKey].email}</ContentItem>
                <br/>
                <ContentItem>Address: <br />{data[activeKey].address}</ContentItem>
              </PanelContent>
            </>
          }
          <PanelActions>
            <Button onClick={() => setModalOpened(1)}>Add</Button>
            {activeKey !== '' && <Button onClick={() => setModalOpened(2)}>Edit</Button> }
          </PanelActions>
        </PanelMain>
      </PanelContainer>
    </>
  )
}

export default Panel
