import * as S from "./styles";
import { FaCheck } from "react-icons/fa";
import { FinishClass } from "./components";
import { useRegisterTeacherToClass } from "./hook";

export function RegisterTeacherToClass() {
  const hook = useRegisterTeacherToClass();

  return (
    <S.Container>
      {hook.showClass ?
        <FinishClass {...hook} />
        :
        <S.Main>
          <S.Form >
            <S.Header>
              <S.HeaderTxt>Nome</S.HeaderTxt>
              <S.HeaderTxtInfo>GERENCIAR MÉDICOS</S.HeaderTxtInfo>
              {hook.teachersSelecteds.length > 0 &&
                <S.HeaderTxt>{hook.teachersSelecteds.length} {hook.teachersSelecteds.length < 2 ? "Selecionado" : "Selecionados"}</S.HeaderTxt>}
            </S.Header>

            <S.FormMain>
              {hook.teachers.map((data: any) => {
                return (
                  <S.Row key={data.id}>
                    <S.Radio onClick={() => hook.handleGetTeachers(data.id_admin!)}>
                      {hook.teachersSelecteds.includes(data.id_admin!) && <FaCheck />}
                    </S.Radio>
                    <S.RowText>{data.nome}</S.RowText>
                  </S.Row>
                );
              })}
            </S.FormMain>
          </S.Form>

          <S.ConfirmButton onClick={() => hook.onSetShowClass(true)}>Cadastrar em novo grupo</S.ConfirmButton>        
        </S.Main>
      }
    </S.Container>
  )
}