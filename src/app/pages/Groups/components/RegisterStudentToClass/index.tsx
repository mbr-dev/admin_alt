import { FaCheck } from "react-icons/fa";
import { FinishClass } from "./components";
import { useRegisterTeacherToClass } from "./hook";
import * as S from "../RegisterTeacherToClass/styles";

export function RegisterStudentToClass() {
  const props = useRegisterTeacherToClass();

  return (
    <S.Container>
      {props.showClass ?
        <FinishClass {...props} />
        :
        <S.Main>
          <S.Form >
            <S.Header>
              <S.HeaderTxt>Nome</S.HeaderTxt>
              <S.HeaderTxtInfo>GERENCIAR ALUNOS</S.HeaderTxtInfo>
              {props.studentsSelecteds.length > 0 &&
                <S.HeaderTxt>{props.studentsSelecteds.length} {props.studentsSelecteds.length < 2 ? "Selecionado" : "Selecionados"}</S.HeaderTxt>}
            </S.Header>

            <S.FormMain>
              {props.students.map((data: any) => {
                return (
                  <S.Row key={data.id}>
                    <S.Radio onClick={() => props.handleGetStudents(data.id_admin!)}>
                      {props.studentsSelecteds.includes(data.id_admin!) && <FaCheck />}
                    </S.Radio>
                    <S.RowText>{data.nome}</S.RowText>
                  </S.Row>
                );
              })}
            </S.FormMain>
          </S.Form>

          <S.ConfirmButton onClick={() => props.onSetShowClass(true)}>Cadastrar em novo grupo</S.ConfirmButton>        
        </S.Main>
      }
    </S.Container>
  )
}