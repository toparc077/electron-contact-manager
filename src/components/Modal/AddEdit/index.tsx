import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import 'yup-phone'
import {
  ModalMask,
  ModalContainer,
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  TextInput,
  TextArea,
  ErrorMessage
} from './styles'
import IContact from '../../../type'
interface IFormModal {
  open: boolean,
  contact?: IContact;
  onClose: () => void;
  onSave: (
    data: IContact
  ) => void;
}

const FormModal: FC<IFormModal> = ({ open, contact, onClose, onSave }) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is a required field'),
    email: yup.string().required('Email is a required field').email('Email has not the valid format'),
    phone: yup.string().required('Phone number is a required field').phone(undefined, undefined, 'Phone has not the valid format'),
    address: yup.string().required('Address is a required field')
  })
  const { handleSubmit, register, errors } = useForm({ validationSchema })
  const onSubmit = (data: any) => {
    onSave(data)
  }
  const handleClose = () => {
    onClose()
  }
  return (
    <ModalMask open={open}>
      <ModalContainer open={open}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
          Add Contact
          </ModalHeader>
          <ModalContent>
            <TextInput
              type="text"
              placeholder="Name"
              name="name"
              ref={register}
              defaultValue={contact?.name || ''}
            />
            <ErrorMessage open={errors.name}>
              {errors.name?.message || ''}
            </ErrorMessage>
            <TextInput
              type="text"
              placeholder="Email"
              name="email"
              ref={register}
              defaultValue={contact?.email || ''}
            />
            <ErrorMessage open={errors.email}>
              {errors.email?.message || ''}
            </ErrorMessage>
            <TextInput
              type="text"
              name="phone"
              placeholder="Phone number"
              ref={register}
              defaultValue={contact?.phone || ''}
            />
            <ErrorMessage open={errors.phone}>
              {errors.phone?.message || ''}
            </ErrorMessage>
            <TextArea
              placeholder="Address"
              name="address"
              ref={register}
              defaultValue={contact?.address || ''}
            />
            <ErrorMessage open={errors.address}>
              {errors.address?.message || ''}
            </ErrorMessage>
          </ModalContent>
          <ModalActions>
            <Button onClick={handleClose}>Close</Button>
            <Button type="submit">OK</Button>
          </ModalActions>
        </form>
      </ModalContainer>
    </ModalMask>
  )
}

export default FormModal
