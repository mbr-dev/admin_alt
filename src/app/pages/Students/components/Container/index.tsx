import * as S from "./styles";
import { Animations, FormStudent, ModalShow } from "..";
import { useStudents } from "../../hook";
import { StudentService } from "@/data/models";
import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { FaChartSimple, FaMagnifyingGlass, FaPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FloatingAddButton, Pagination } from "@/components/template";
import { encryptJS } from "@/lib/utils";

/** Primeira letra do nome + primeira letra do segundo termo (ex.: João Santos → JS; Maria Castro Alves → MC). */
function getStudentInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0];
  if (parts.length === 1) return `${first}`.toUpperCase();
  return `${first}${parts[1][0]}`.toUpperCase();
}

function getStudentAgeYears(birthDate: string | null | undefined): number | null {
  if (!birthDate) return null;
  const [ys, ms, ds] = birthDate.split("T")[0].split("-");
  const year = Number(ys);
  const month = Number(ms);
  const day = Number(ds);
  if (!year || !month || !day) return null;

  const today = new Date();
  let age = today.getFullYear() - year;
  if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
    age -= 1;
  }
  return age;
}

export function Container() {
  const navigate = useNavigate();
  const studentsContext = useStudents();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [studentToEdit, setStudentToEdit] = useState<StudentService.IStudent | null>(null);
  const [searchName, setSearchName] = useState<string>("");

  const handleSearch = () => {
    studentsContext.setFilterName(searchName);
    studentsContext.setCurrentPage(1);
  };

  const handleOpenForm = useCallback((student: StudentService.IStudent | null = null) => {
    setStudentToEdit(student);
    setShowForm(true);
  }, []);

  const handleCloseForm = () => {
    setStudentToEdit(null);
    setShowForm(false);
  };

  const handleFormSuccess = async () => {
    await studentsContext.fetchData();
    setStudentToEdit(null);
    setShowForm(false);
  };

  return (
    <S.Container>
      {studentsContext.showData && <ModalShow />}
      <Animations />

      <S.Main>
        {showForm ? (
          <FormStudent studentToEdit={studentToEdit} onClose={handleCloseForm} onSuccess={handleFormSuccess} />
        ) : (
          <S.TableArea>
            <S.FilterBox>
              <S.FilterInput
                value={searchName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Buscar por nome"
                aria-label="Buscar por nome"
              />
              <S.SearchButton type="button" aria-label="Pesquisar aluno por nome" onClick={handleSearch}>
                <FaMagnifyingGlass />
              </S.SearchButton>
            </S.FilterBox>

            {studentsContext.isTableLoading ? (
              <S.TableSkeleton>
                {Array.from({ length: 10 }).map((_, i) => (
                  <S.CardSkeleton key={i}>
                    <S.SkeletonAvatar />
                    <S.SkeletonLine />
                    <S.SkeletonLineShort />
                    <S.SkeletonLineShort />
                  </S.CardSkeleton>
                ))}
              </S.TableSkeleton>
            ) : studentsContext.students.length === 0 ? (
              <S.EmptyState>Nenhum aluno encontrado.</S.EmptyState>
            ) : (
              <>
                <S.CardsGrid>
                  {studentsContext.students.map((student) => {
                    const age = getStudentAgeYears(student.data_nascimento ?? student.nascimento);
                    return (
                      <S.StudentCard key={student.id}>
                        <S.InitialsCircle aria-hidden>{getStudentInitials(student.nome)}</S.InitialsCircle>
                        <S.CardName>{student.nome}</S.CardName>
                        <S.CardAge>{age !== null ? `${age} anos` : "Idade não informada"}</S.CardAge>
                        <S.CardSessions>Total de sessões: 0</S.CardSessions>
                        <S.CardActions>
                          <S.CardActionButton
                            type="button"
                            aria-label={`Editar informações de ${student.nome}`}
                            onClick={() => handleOpenForm(student)}
                          >
                            <FaPenToSquare aria-hidden />
                            Editar Informações
                          </S.CardActionButton>
                          <S.CardActionButton
                            type="button"
                            aria-label={`Ver relatório de ${student.nome}`}
                            onClick={() =>
                              navigate(`/report-student?id=${encodeURIComponent(encryptJS(String(student.id_usuario)))}`)
                            }
                          >
                            <FaChartSimple aria-hidden />
                            Ver Relatório
                          </S.CardActionButton>
                        </S.CardActions>
                      </S.StudentCard>
                    );
                  })}
                </S.CardsGrid>

                {studentsContext.totalOfPages > 1 && (
                  <S.PaginationWrap>
                    <Pagination
                      numberOfPageButton={studentsContext.totalOfPages}
                      currentPage={studentsContext.currentPage}
                      onChangePage={studentsContext.setCurrentPage}
                    />
                  </S.PaginationWrap>
                )}
              </>
            )}
          </S.TableArea>
        )}
      </S.Main>

      {!showForm && <FloatingAddButton onClick={() => handleOpenForm()} ariaLabel="Cadastrar aluno" />}
    </S.Container>
  );
}
