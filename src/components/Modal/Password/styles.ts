import styled from 'styled-components'

interface IModalProps {
  open: boolean
}

export const ModalMask = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
  opacity: 1;
  pointer-events: initial;

  ${(props: IModalProps) =>
    !props.open &&
    `
    opacity: 0;
    pointer-events: none;
  `}
`

export const ModalContainer = styled.div`
  width: 400px;
  height: 360px;
  background: rgba(60, 60, 60, 0.8);
  border: 1px solid #4a4a4a;
  border-radius: 6px;
  transition: all 0.3s;
  transform: translateY(0);

  ${(props: IModalProps) =>
    !props.open &&
    `
    opacity: 0;
    transform: translateY(-20px);
  `}
`
export const ModalHeader = styled.section`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  height: 100px;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 22px;
  line-height: 28px;
  color: #f3f3f3;
  font-weight: 400;
  border-bottom: 1px solid #4a4a4a;
`
export const ModalContent = styled.section`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  height: 185px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 48px;
`

export const ModalActions = styled.section`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  height: 75px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0px 67px;
`

export const ModalDescription = styled.span`
  font-size: 18px;
  line-height: 28px;
  color: #e5e5e5;
  letter-spacing: 0.7px;
  text-align: center;
  font-weight: 300;
`

export const TextInput = styled.input`
  width: 87%;
  height: 36px;
  padding: 8px;
  font-size: 20px;
  border-radius: 6px;
  border: 1px solid #4a4a4a;
  outline: none;
  background: rgba(255, 255, 255, 0.1);
  color: #f3f3f3;
  margin-top: 30px;
  transition: all 0.3s;

  &:hover {
    border-color: #666;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.15);
    border-color: #666;
  }
`

export const Button = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #666;
  font-size: 16px;
  outline: none;
  background: rgba(255, 255, 255, 0.1);
  color: #f3f3f3;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.27);
  }

  &:active {
    border: 1px solid rgba(255, 255, 255, 0.09);
    background: rgba(189, 189, 189, 0.28);
  }
`
