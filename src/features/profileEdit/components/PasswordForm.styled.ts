import styled from 'styled-components';
import { ErrorMessage } from '@/styles/components/ErrorMessage';
import { FormButton } from '@/styles/components/FormButton';
import { InputLabel } from '@/styles/components/InputLabel';
import { InputText } from '@/styles/components/InputText';

export const WrapperMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  padding: 3rem;
  border-right: 1px solid ${({ theme }) => theme.color.main_border};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-wrap: break-word;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledInputLabel = styled(InputLabel)`
  font-size: 1rem;
  font-size: 0.9rem;
`;

export const StyledInputText = styled(InputText)`
  min-width: 300px;
  text-align: start;

  &:focus {
    outline: none;
    box-shadow: 0 0 1em rgb(0 0 0 / 0.3);
  }
`;

export const StyledErrorMessage = styled(ErrorMessage)``;

export const SaveButton = styled(FormButton)`
  align-self: flex-end;

  padding-left: 3rem;
  padding-right: 3rem;
`;