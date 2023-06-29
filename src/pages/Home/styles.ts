import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const BaseCountDownButton = styled.button`
  width: 100%;
  border: none;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: ${(props) => props.theme['gray-100']};

  font-weight: bold;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountDownButton = styled(BaseCountDownButton)`
  background-color: ${(props) => props.theme['green-500']};

  &:not(:disabled)hover {
    background-color: ${(props) => props.theme['green-700']};
    transition: 0.5s;
  }
`
export const StopCountDownButton = styled(BaseCountDownButton)`
  background-color: ${(props) => props.theme['red-500']};

  &:not(:disabled)hover {
    background-color: ${(props) => props.theme['red-700']};
    transition: 0.5s;
  }
`
