import * as S from "./styles";
import { Professionals } from "@/data/services";
import { ProfessionalsService } from "@/data/models";
import { useMain, useStorage } from "@/data/hooks";
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaMagnifyingGlass, FaPencil } from "react-icons/fa6";
import { DataTable, FloatingAddButton, Pagination } from "@/components/template";
import { Animations, FormProfessional } from "..";

export function Container() {
  const { t } = useTranslation("professionals");
  const { setLoad } = useMain();
  const { getData } = useStorage();
  const { getClinicProfessionalsByNetwork } = Professionals();

  const [professionals, setProfessionals] = useState<ProfessionalsService.IProfessionalByNetwork[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalOfPages, setTotalOfPages] = useState<number>(1);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>("");
  const [appliedSearchName, setAppliedSearchName] = useState<string>("");

  const getDataRef = useRef(getData);
  const setLoadRef = useRef(setLoad);
  const getClinicProfessionalsByNetworkRef = useRef(getClinicProfessionalsByNetwork);

  const columns = useMemo(
    () => [
      { key: "nome", label: t("table_name") },
      { key: "especialidade", label: t("table_speciality") },
      {
        key: "status",
        label: t("table_status"),
        render: (row: ProfessionalsService.IProfessionalByNetwork) => {
          const isActive = row.status === 1;
          return <S.StatusTag $active={isActive}>{isActive ? t("status_active") : t("status_inactive")}</S.StatusTag>;
        },
      },
      {
        key: "editar",
        label: "",
        render: (row: ProfessionalsService.IProfessionalByNetwork) => (
          <S.EditCell>
            <S.EditButton type="button" aria-label={`${t("table_edit_aria")} ${row.nome ?? ""}`}>
              <FaPencil />
            </S.EditButton>
          </S.EditCell>
        ),
      },
    ],
    [t]
  );

  const filteredProfessionals = useMemo(() => {
    const nameToFilter = appliedSearchName.trim().toLowerCase();
    if (!nameToFilter) return professionals;

    return professionals.filter((professional) => (professional.nome ?? "").toLowerCase().includes(nameToFilter));
  }, [appliedSearchName, professionals]);

  const handleSearch = () => {
    setAppliedSearchName(searchName);
    setCurrentPage(1);
  };

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleRefresh = async () => {
    try {
      setLoadRef.current(true);
      setIsTableLoading(true);

      const networkId = Number(getDataRef.current("id_rede"));
      const response = await getClinicProfessionalsByNetworkRef.current(networkId, currentPage);

      if (!response) {
        setProfessionals([]);
        setTotalOfPages(1);
        return;
      }

      setProfessionals(response.data ?? []);
      setTotalOfPages(response.totalPages > 0 ? response.totalPages : 1);
    } finally {
      setIsTableLoading(false);
      setLoadRef.current(false);
    }
  };

  useEffect(() => {
    getDataRef.current = getData;
    setLoadRef.current = setLoad;
    getClinicProfessionalsByNetworkRef.current = getClinicProfessionalsByNetwork;
  }, [getData, setLoad, getClinicProfessionalsByNetwork]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadRef.current(true);
        setIsTableLoading(true);

        const networkId = Number(getDataRef.current("id_rede"));
        const response = await getClinicProfessionalsByNetworkRef.current(networkId, currentPage);

        if (!response) {
          setProfessionals([]);
          setTotalOfPages(1);
          return;
        }

        setProfessionals(response.data ?? []);
        setTotalOfPages(response.totalPages > 0 ? response.totalPages : 1);
      } finally {
        setIsTableLoading(false);
        setLoadRef.current(false);
      }
    };

    void loadData();
  }, [currentPage]);

  return (
    <S.Container>
      <Animations />

      <S.Main>
        {showForm ? (
          <FormProfessional onClose={handleCloseForm} onSuccess={handleRefresh} />
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
                placeholder={t("filter_name_placeholder")}
                aria-label={t("filter_name_placeholder")}
              />
              <S.SearchButton type="button" aria-label={t("button_search_aria")} onClick={handleSearch}>
                <FaMagnifyingGlass />
              </S.SearchButton>
            </S.FilterBox>

            {isTableLoading ? (
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
                <DataTable
                  columns={columns}
                  rows={filteredProfessionals}
                  getRowKey={(row, index) => row.id_usuario ?? `${row.usuario ?? "professional"}-${index}`}
                  emptyMessage={t("empty_professionals")}
                />

                {totalOfPages > 1 && (
                  <Pagination
                    numberOfPageButton={totalOfPages}
                    currentPage={currentPage}
                    onChangePage={setCurrentPage}
                  />
                )}
              </>
            )}
          </S.TableArea>
        )}
      </S.Main>

      {!showForm && <FloatingAddButton onClick={handleOpenForm} ariaLabel={t("floating_add_aria")} />}
    </S.Container>
  );
}
