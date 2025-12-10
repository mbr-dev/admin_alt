import * as S from "./styles";
import { useModalStudent } from "./hook";
import { IoClose } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { ClassStudentService } from "@/data/models";

type ModalStudentProps = {
  classSelected: number;
  handleShowStudent: (open: boolean, id: number) => void;
  fetchData: () => Promise<void>;
}

export function ModalStudent({ handleShowStudent, classSelected, fetchData }: ModalStudentProps) {
  const { handleCancel, handleConfirmDelete, handleDelete, showDelete, dataToDelete, disabledBtn, students } = useModalStudent({
    handleShowStudent,
    classSelected,
    fetchData
  });

  return (
    <S.Container>
      <div onClick={() => handleShowStudent(false, 0)} className="w-full h-full fixed top-0 left-0 z-40 bg-mbr-bg-modal"></div>

      {students.length > 0 && (
        <S.Main>
          <S.Close onClick={() => handleShowStudent(false, 0)}>
            <IoClose />
          </S.Close>

          {!showDelete ? (
            <>
              <S.Title>
                {students.length > 1 ? "Alunos" : "Aluno"}
              </S.Title>
              <S.Form>
                {students.map((data: ClassStudentService.IClassStudentService) => {
                  return (
                    <S.List key={data.id}>
                      {data.nome}
                        <S.ButtonDelete onClick={() => handleDelete(true, data)}>
                          <FaRegTrashAlt />
                        </S.ButtonDelete>
                      
                    </S.List>
                  );
                })}
              </S.Form>
            </>
          ) : (
            <S.Delete>
              <S.Div>
                <S.TextDelete>Deseja mesmo remover:</S.TextDelete>
                <S.Title>{dataToDelete?.nome}</S.Title>
                <S.TextDelete>do grupo: {dataToDelete?.descricao}</S.TextDelete>
              </S.Div>

              <S.ButtonArea>
                <S.Button color="default" onClick={handleCancel} disabled={disabledBtn}>
                  Não
                </S.Button>
                <S.Button color="green" onClick={handleConfirmDelete} disabled={disabledBtn}>
                  Sim
                </S.Button>
              </S.ButtonArea>
            </S.Delete>
          )}
        </S.Main>
      )}
    </S.Container>
  );
}