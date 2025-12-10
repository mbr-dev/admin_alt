import * as S from "./styles";
import { SelectClass } from "..";

export function FinishClass({ ...props }) {
  return (
    <S.Container>
      <S.Title>Em qual grupo deseja cadastrar {props.teachersSelecteds.length < 2 ? "o médico selecionado" : "os médicos selecionados"}?</S.Title>

      <S.FormField>
        <S.Label>Grupo</S.Label>
        <SelectClass {...props} />
      </S.FormField>

       <S.ButtonArea>
          <S.Button color="default" onClick={() => props.onSetShowClass(false)} disabled={props.disabledBtn}>Cancelar</S.Button>
          <S.Button color="green" onClick={props.handleRegisterTeachers} disabled={props.disabledBtn}>Cadastrar</S.Button>
        </S.ButtonArea>
    </S.Container>
  )
}