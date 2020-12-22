import React, { FC, useState } from 'react'
import FormModal from '../Modal/AddEdit'
import { PanelContainer, PanelContent, PanelMain, PanelActions, ContentTitle, ContentItem, Sidebar, Item, Button } from './styles'

interface IPanelProps {
  data: any;
}
const Panel:FC<IPanelProps> = ({ data }) => {
  const [modalOpened, setModalOpened] = useState(false)
  const [activeKey, setActiveKey] = useState('')

  return (
    <>
      <FormModal open={modalOpened} onClose={() => setModalOpened(false)} />
      <PanelContainer>
        <Sidebar>
          {
            Object.keys(data).map((key, index) => {
              return <Item
                onClick={() => setActiveKey(key)}
                active={activeKey === key}
                key={index}
              >{key}</Item>
            })
          }
        </Sidebar>
        <PanelMain>
          {activeKey !== '' &&
            <>
              <PanelContent>
                <ContentTitle>{activeKey}</ContentTitle>
                <ContentItem>Phone: {data[activeKey].phone}</ContentItem>
                <ContentItem>Email: {data[activeKey].email}</ContentItem>
                <br/>
                <ContentItem>Address: <br />{data[activeKey].address}</ContentItem>
              </PanelContent>
              <PanelActions>
                <Button onClick={() => setModalOpened(true)}>Add</Button>
                <Button>Edit</Button>
              </PanelActions>
            </>
          }
        </PanelMain>
      </PanelContainer>
    </>
  )
}

export default Panel
