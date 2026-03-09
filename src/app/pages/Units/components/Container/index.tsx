import * as S from "./styles";
import { Unit } from "@/data/services";
import { UnitService } from "@/data/models";
import { useMain, useStorage } from "@/data/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { DataTable, FloatingAddButton, Pagination } from "@/components/template";
import { useTranslation } from "react-i18next";
import { Animations, FormUnit } from "..";

export function Container() {
  const { t } = useTranslation("units");
  const { setLoad } = useMain();
  const { getData } = useStorage();
  const { getAllUnitByNetworkIdPaged, getUnitById } = Unit();

  const [units, setUnits] = useState<UnitService.IUnitByNetworkPg[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalOfPages, setTotalOfPages] = useState<number>(1);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [unitToEdit, setUnitToEdit] = useState<UnitService.IUnitById | null>(null);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const getDataRef = useRef(getData);
  const getAllUnitByNetworkIdPagedRef = useRef(getAllUnitByNetworkIdPaged);
  const getUnitByIdRef = useRef(getUnitById);
  const setLoadRef = useRef(setLoad);

  const columns = useMemo(
    () => [
      { key: "descricao", label: t("table_institution") },
      { key: "cep", label: t("table_cep") },
      {
        key: "localizacao",
        label: t("table_location"),
        render: (row: UnitService.IUnitByNetworkPg) => `${row.cidade} - ${row.estado}`,
      },
      { key: "total_alunos", label: t("table_students") },
      { key: "total_coordenadores", label: t("table_professionals") },
      {
        key: "editar",
        label: "",
        render: (row: UnitService.IUnitByNetworkPg) => (
          <S.EditCell>
            <S.EditButton type="button" aria-label={`${t("table_edit_aria")} ${row.descricao}`} onClick={() => void handleOpenForm(row)}>
              <FaPencil />
            </S.EditButton>
          </S.EditCell>
        ),
      },
    ],
    [t]
  );

  const normalizeResponse = (response: UnitService.IUnitByNetworkPg[] | UnitService.IUnitByNetworkPgResponse | null) => {
    if (!response) {
      setUnits([]);
      setTotalOfPages(1);
      return;
    }

    if (Array.isArray(response)) {
      setUnits(response);
      setTotalOfPages(1);
      return;
    }

    setUnits(response.data ?? []);
    setTotalOfPages(response.totalPages > 0 ? response.totalPages : 1);
  };

  const handleOpenForm = async (unit: UnitService.IUnitByNetworkPg | null = null) => {
    if (!unit) {
      setUnitToEdit(null);
      setShowForm(true);
      setIsFormLoading(false);
      return;
    }

    setShowForm(true);
    setIsFormLoading(true);

    try {
      const response = await getUnitByIdRef.current(unit.id);
      setUnitToEdit(response);
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setUnitToEdit(null);
  };

  useEffect(() => {
    getDataRef.current = getData;
    getAllUnitByNetworkIdPagedRef.current = getAllUnitByNetworkIdPaged;
    getUnitByIdRef.current = getUnitById;
    setLoadRef.current = setLoad;
  }, [getData, getAllUnitByNetworkIdPaged, getUnitById, setLoad]);

  const handleRefresh = async () => {
    try {
      setLoadRef.current(true);
      setIsTableLoading(true);

      const networkId = Number(getDataRef.current("id_rede"));
      const response = await getAllUnitByNetworkIdPagedRef.current(networkId, currentPage);
      normalizeResponse(response);
    } finally {
      setIsTableLoading(false);
      setLoadRef.current(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadRef.current(true);
        setIsTableLoading(true);

        const networkId = Number(getDataRef.current("id_rede"));
        const response = await getAllUnitByNetworkIdPagedRef.current(networkId, currentPage);
        normalizeResponse(response);
      } finally {
        setIsTableLoading(false);
        setLoadRef.current(false);
      }
    };

    loadData();
  }, [currentPage]);

  return (
    <S.Container>
      <Animations />

      <S.Main>
        {showForm ? (
          <FormUnit unitToEdit={unitToEdit} isLoading={isFormLoading} onClose={handleCloseForm} onSuccess={handleRefresh} />
        ) : (
          <S.TableArea>
            {isTableLoading ? (
              <S.TableSkeleton>
                <S.SkeletonHeader />
                <S.SkeletonRow>
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                </S.SkeletonRow>
                <S.SkeletonRow>
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                </S.SkeletonRow>
                <S.SkeletonRow>
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                </S.SkeletonRow>
              </S.TableSkeleton>
            ) : (
              <>
                <DataTable
                  columns={columns}
                  rows={units}
                  getRowKey={(row) => row.id}
                  emptyMessage={t("empty_units")}
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

      {!showForm && <FloatingAddButton onClick={() => void handleOpenForm()} ariaLabel={t("floating_add_aria")} />}
    </S.Container>
  );
}
