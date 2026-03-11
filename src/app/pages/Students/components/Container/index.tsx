import * as S from "./styles";
import { Animations, FormStudent, ModalShow } from "..";
import { useStudents } from "../../hook";
import { StudentService } from "@/data/models";
import { useMemo, useState } from "react";
import { FaMagnifyingGlass, FaPencil } from "react-icons/fa6";
import { DataTable, FloatingAddButton, Pagination } from "@/components/template";

export function Container() {
  const studentsContext = useStudents();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [studentToEdit, setStudentToEdit] = useState<StudentService.IStudent | null>(null);
  const [searchName, setSearchName] = useState<string>("");

  const formatBirthDate = (birthDate: string | null | undefined) => {
    if (!birthDate) return "-";

    const date = new Date(birthDate);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("pt-BR");
  };

  const columns = useMemo(
    () => [
      { key: "nome", label: "Nome" },
      {
        key: "data_nascimento",
        label: "Data de nascimento",
        render: (row: StudentService.IStudent) => formatBirthDate(row.nascimento),
      },
      {
        key: "status",
        label: "Status",
        render: (row: StudentService.IStudent) => {
          const isActive = row.status === 1;
          return <S.StatusTag $active={isActive}>{isActive ? "Ativo" : "Inativo"}</S.StatusTag>;
        },
      },
      {
        key: "editar",
        label: "",
        render: (row: StudentService.IStudent) => (
          <S.EditCell>
            <S.EditButton type="button" aria-label={`Editar ${row.nome}`} onClick={() => handleOpenForm(row)}>
              <FaPencil />
            </S.EditButton>
          </S.EditCell>
        ),
      },
    ],
    [studentsContext]
  );

  const handleSearch = () => {
    studentsContext.setFilterName(searchName);
    studentsContext.setCurrentPage(1);
  };

  const handleOpenForm = (student: StudentService.IStudent | null = null) => {
    setStudentToEdit(student);
    setShowForm(true);
  };

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
                onChange={(e) => setSearchName(e.target.value)}
                onKeyDown={(e) => {
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
                <S.SkeletonHeader />
                <S.SkeletonRow>
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                </S.SkeletonRow>
                <S.SkeletonRow>
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                </S.SkeletonRow>
                <S.SkeletonRow>
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                </S.SkeletonRow>
              </S.TableSkeleton>
            ) : (
              <>
                <DataTable columns={columns} rows={studentsContext.students} getRowKey={(row) => row.id} emptyMessage="Nenhum aluno encontrado." />

                {studentsContext.totalOfPages > 1 && (
                  <Pagination
                    numberOfPageButton={studentsContext.totalOfPages}
                    currentPage={studentsContext.currentPage}
                    onChangePage={studentsContext.setCurrentPage}
                  />
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