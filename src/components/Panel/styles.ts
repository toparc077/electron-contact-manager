import styled from 'styled-components'

interface IItemProps {
  active?: boolean
}

export const PanelContainer = styled.div`
  width: 600px;
  height: 400px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.13);
  align-items: center;
  background: rgba(80, 80, 80, 0.39);
  border-radius: 6px;
  z-index: 10;
`

export const Sidebar = styled.ul`
  width: 200px;
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid rgba(255, 255, 255, 0.13); 
  overflow: auto;
`

export const PanelMain = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export const PanelContent = styled.section`
  width: 400px;
  height: 340px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`
export const ContentTitle = styled.div`
  width: 100%;
  display: block;
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 20px;
  text-align: center;
`

export const ContentItem = styled.div`
  width: 100%;
  display: block;
  font-size: 16px;
  line-height: 24px;
  white-space: pre-line;
`

export const PanelActions = styled.section`
  position: absolute;
  bottom: 0;
  width: 400px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 10px;
`

export const Item = styled.li`
  display: flex;
  width: 100%;
  height: 40px;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  transition: all .3s;
  user-select: none;
  cursor: pointer;

  &:nth-of-type(even) {
    background: transparent;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.13);
  }

  ${(props: IItemProps) =>
    props.active &&
    `
    background: rgba(255, 255, 255, 0.79) !important;
    color: #333;
  `}
`

export const Button = styled.button`
  width: 80px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  font-size: 14px;
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

  &:first-child {
    margin-right: 10px;
  }
`
