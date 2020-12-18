import { ipcRenderer } from 'electron'
import React, { FC, useState } from 'react'
import {
  ModalMask,
  ModalContainer,
  ModalHeader,
  ModalContent,
  ModalDescription,
  ModalActions,
  Button,
  TextInput
} from './styles'

interface IModal {
  description: string
  open: boolean
  onClose: (password: string) => void
}

const Modal: FC<IModal> = ({ description, open, onClose }) => {
  const [password, setPassword] = useState('')
  const handleOk = () => {
    console.log(password)
    onClose(password)
  }
  const handleClose = () => {
    ipcRenderer.send('quitWindow')
  }
  return (
    <ModalMask open={open}>
      <ModalContainer open={open}>
        <ModalHeader>
          Welcome to
          <br />
          Simple Secure Contact Manager
        </ModalHeader>
        <ModalContent>
          <ModalDescription>{description}</ModalDescription>
          <TextInput
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </ModalContent>
        <ModalActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleOk}>OK</Button>
        </ModalActions>
      </ModalContainer>
    </ModalMask>
  )
}

export default Modal
