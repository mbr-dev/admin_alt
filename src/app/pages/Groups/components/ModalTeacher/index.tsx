import * as S from "../ModalStudent/styles";
import { useModalTeacher } from "./hook";
import { IoClose } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { ClassTeacherService } from "@/data/models";

type ModalTeacherProps = {
  classSelected: number;
  handleShowTeacher: (open: boolean, id: number) => void;
  fetchData: () => Promise<void>;
}

export function ModalTeacher({ classSelected, fetchData, handleShowTeacher }: ModalTeacherProps) {
  const { disabledBtn, handleCancel, handleConfirmDelete, handleDelete, showDelete, teachers, dataToDelete } = useModalTeacher({
    classSelected, fetchData, handleShowTeacher
  });

  return (
    <S.Container>
      <div onClick={() => handleShowTeacher(false, 0)} className="w-full h-full fixed top-0 left-0 z-50 bg-mbr-bg-modal"></div>

      {teachers.length > 0 && (
        <S.Main>
          <S.Close onClick={() => handleShowTeacher(false, 0)}>
            <IoClose />
          </S.Close>

          {!showDelete ? (
            <>
              <S.Title>
                {teachers.length > 1 ? "Médicos" : "Médico"}
              </S.Title>
              <S.Form>
                {teachers.map((data: ClassTeacherService.IClassTeacherService) => {
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
