import React, { useState, useEffect } from 'react'

import { Container, Image, Text } from './styles'

import { AES, enc as ENCODING } from 'crypto-ts'
import { readFile, saveFile } from '../../utils/file'
import PasswordModal from '../Modal/Password'
import Panel from '../Panel'
import IContact from '../../type'

enum FILE_STATUS {
  LOADING = 'LOADING',
  FINISH_LOADING = 'FINISH_LOADING',
  NOT_EXIST = 'NOT_EXIST',
  CORRUPTED = 'CORRUPTED',
  CREATED = 'CREATED',
  DECRYPTED = 'DECRYPTED',
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD'
}

const Greetings: React.FC = () => {
  const [fileStatus, setFileStatus] = useState(FILE_STATUS.LOADING)
  const [encryptedData, setEncryptedData] = useState('')
  const [decryptedJson, setDecryptedJson] = useState({})
  const [modalOpened, setModalOpened] = useState(true)
  const [masterKey, setMasterKey] = useState('')
  const checkFileCorruption = (prefix: string) => {
    return prefix === 'RADIX'
  }

  if (fileStatus === FILE_STATUS.LOADING) {
    readFile(process.env.REACT_APP_FILE_PATH || '', (status, res) => {
      if (status && res) {
        const prefix = res?.substring(0, 5)
        if (checkFileCorruption(prefix)) {
          setFileStatus(FILE_STATUS.FINISH_LOADING)
          setEncryptedData(res?.substring(5, res.length))
        } else {
          setFileStatus(FILE_STATUS.CORRUPTED)
        }
      } else {
        setFileStatus(FILE_STATUS.NOT_EXIST)
      }
    })
  }

  const handlePassword = (password: string) => {
    setMasterKey(password)

    if (fileStatus === FILE_STATUS.NOT_EXIST || fileStatus === FILE_STATUS.CORRUPTED) {
      setFileStatus(FILE_STATUS.CREATED)
      setModalOpened(false)
      return
    }

    let decryptedMessage
    try {
      decryptedMessage = AES.decrypt(encryptedData, password).toString(
        ENCODING.Utf8
      )
    } catch (err) {
      setFileStatus(FILE_STATUS.INCORRECT_PASSWORD)
      return
    }
    // setDecryptedJson(JSON.parse(decryptedMessage))
    const data = JSON.parse(decryptedMessage || '{}')
    if (data) {
      setDecryptedJson(data)
      setFileStatus(FILE_STATUS.DECRYPTED)
    } else {
      setFileStatus(FILE_STATUS.INCORRECT_PASSWORD)
    }
    setModalOpened(false)
  }

  const handleSave = (contact: IContact, activeKey: string) => {
    const updatedJson = { ...(decryptedJson || {}), [activeKey]: contact }
    const encryptedData = `RADIX${AES.encrypt(JSON.stringify(updatedJson), masterKey).toString()}`
    saveFile(encryptedData, process.env.REACT_APP_FILE_PATH || '')
    setDecryptedJson(updatedJson)
  }
  useEffect(() => {
    if (fileStatus === FILE_STATUS.CORRUPTED || fileStatus === FILE_STATUS.NOT_EXIST) {
      setModalOpened(true)
    }
  }, [fileStatus])

  return (
    <Container>
      {fileStatus !== FILE_STATUS.LOADING &&
        fileStatus !== FILE_STATUS.CORRUPTED ? (
          <>
            <PasswordModal
              key={masterKey}
              open={modalOpened}
              onClose={(password) => handlePassword(password)}
              description={
                fileStatus === FILE_STATUS.FINISH_LOADING || fileStatus === FILE_STATUS.INCORRECT_PASSWORD
                  ? 'Please enter the password for \nyour contact file'
                  : 'Please enter the password for \nyour new contact file'
              }
            />
            {<Panel data={decryptedJson} onSave={(contact, activeKey) => handleSave(contact, activeKey)}/>}
          </>
        ) : (
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            alt="ReactJS logo"
          />
        )}
    </Container>)
}

export default Greetings
