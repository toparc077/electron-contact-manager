import React, { useState, useEffect } from 'react'

import { Container, Image, Text } from './styles'

import { AES, enc as ENCODING } from 'crypto-ts'
import { readFile } from '../../utils/file'
import Modal from '../Modal'

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
  const [decryptedJson, setDecryptedJson] = useState(undefined)
  const [modalOpened, setModalOpened] = useState(true)
  const [key, setKey] = useState('')
  const checkFileCorruption = (prefix: string) => {
    return prefix === 'RADIX'
  }

  if (fileStatus === FILE_STATUS.LOADING) {
    readFile('/Volumes/Work/CryptoData/1.cr1y', (status, res) => {
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
    if (fileStatus === FILE_STATUS.NOT_EXIST || fileStatus === FILE_STATUS.CORRUPTED) {
      setKey(password)
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
      console.log(data)
      setDecryptedJson(data)
      setFileStatus(FILE_STATUS.DECRYPTED)
    } else {
      setFileStatus(FILE_STATUS.INCORRECT_PASSWORD)
    }
    setModalOpened(false)
  }

  useEffect(() => {
    console.log(fileStatus)
    if (fileStatus === FILE_STATUS.CORRUPTED || fileStatus === FILE_STATUS.NOT_EXIST) {
      setModalOpened(true)
    }
  }, [fileStatus])

  return (
    <Container>
      {fileStatus !== FILE_STATUS.LOADING &&
        fileStatus !== FILE_STATUS.CORRUPTED ? (
          <>
            <Modal
              open={modalOpened}
              onClose={(password) => handlePassword(password)}
              description={
                fileStatus === FILE_STATUS.FINISH_LOADING || fileStatus === FILE_STATUS.INCORRECT_PASSWORD
                  ? 'Please enter the password for \nyour contact file'
                  : 'Please enter the password for \nyour new contact file'
              }
            />
            {decryptedJson !== undefined && <div>asdf</div>}
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
