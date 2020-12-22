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
          {/* <Item>Contact 1</Item>
          <Item active>Contact 2</Item>
          <Item>Contact 3</Item>
          <Item>Contact 4</Item>
          <Item>Contact 5</Item> */}
        </Sidebar>
        <PanelMain>
          {activeKey !== '' &&
            <>
              <PanelContent>
                <ContentTitle>Contact 1</ContentTitle>
                <ContentItem>Phone: 079 999999</ContentItem>
                <ContentItem>Email: abc@def.com</ContentItem>
                <br/>
                <ContentItem>Address:<br/>ABC DEF 1,<br/>Hello World</ContentItem>
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
