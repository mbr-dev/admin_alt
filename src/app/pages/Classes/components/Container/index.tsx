import * as S from "./styles";
import { Class, Login } from "@/data/services";
import { ClassService, ClassStudentService, ClassTeacherService, StudentService } from "@/data/models";
import { useMain, useStorage, useToast } from "@/data/hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ConfirmActionModal, FloatingAddButton, LabelSelect, Pagination } from "@/components/template";
import { UserRole } from "@/data/constants/user-roles";
import { Animations, ClassCard, FormClass, ListModal, QRCodeModal } from "..";

const CARDS_PER_PAGE = 8;

export function Container() {
  const { t } = useTranslation("classes");
  const { toast } = useToast();
  const { setLoad } = useMain();
  const { getData } = useStorage();
  const { getAllUnitByNetworkId } = Login();
  const { getAllClassByUnit, getAllStudentByClass, getAllTeachersByClass, deleteClassById, getClassById } = Class();

  const [units, setUnits] = useState<StudentService.IUnitsAll[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState<string>("");
  const [classes, setClasses] = useState<ClassService.IClassService[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [classToEdit, setClassToEdit] = useState<ClassService.IClassService | null>(null);
  const [classToDelete, setClassToDelete] = useState<ClassService.IClassService | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [students, setStudents] = useState<ClassStudentService.IClassStudentService[]>([]);
  const [teachers, setTeachers] = useState<ClassTeacherService.IClassTeacherService[]>([]);
  const [isMembersLoading, setIsMembersLoading] = useState<boolean>(false);
  const [showStudentsModal, setShowStudentsModal] = useState<boolean>(false);
  const [showTeachersModal, setShowTeachersModal] = useState<boolean>(false);
  const [classToShowQr, setClassToShowQr] = useState<ClassService.IClassService | null>(null);

  const hierarchy = Number(getData("hierarquia"));
  const isSecretary = hierarchy === UserRole.SECRETARY;
  const showUnitSelect = isSecretary && units.length > 1;
  const selectedUnitNumber = Number(selectedUnitId);

  const getDataRef = useRef(getData);
  const setLoadRef = useRef(setLoad);
  const getAllUnitByNetworkIdRef = useRef(getAllUnitByNetworkId);
  const getAllClassByUnitRef = useRef(getAllClassByUnit);
  const getAllStudentByClassRef = useRef(getAllStudentByClass);
  const getAllTeachersByClassRef = useRef(getAllTeachersByClass);
  const deleteClassByIdRef = useRef(deleteClassById);
  const getClassByIdRef = useRef(getClassById);

  const unitOptions = useMemo(
    () => units.map((unit) => ({ id: String(unit.id), label: unit.descricao })),
    [units]
  );

  const totalOfPages = Math.max(1, Math.ceil(classes.length / CARDS_PER_PAGE));
  const paginatedClasses = useMemo(() => {
    const start = (currentPage - 1) * CARDS_PER_PAGE;
    return classes.slice(start, start + CARDS_PER_PAGE);
  }, [classes, currentPage]);

  const studentItems = useMemo(
    () => students.map((student) => ({ id: student.id, name: student.nome, description: student.email })),
    [students]
  );

  const teacherItems = useMemo(
    () => teachers.map((teacher) => ({ id: teacher.id, name: teacher.nome })),
    [teachers]
  );

  useEffect(() => {
    getDataRef.current = getData;
    setLoadRef.current = setLoad;
    getAllUnitByNetworkIdRef.current = getAllUnitByNetworkId;
    getAllClassByUnitRef.current = getAllClassByUnit;
    getAllStudentByClassRef.current = getAllStudentByClass;
    getAllTeachersByClassRef.current = getAllTeachersByClass;
    deleteClassByIdRef.current = deleteClassById;
    getClassByIdRef.current = getClassById;
  }, [
    getData,
    setLoad,
    getAllUnitByNetworkId,
    getAllClassByUnit,
    getAllStudentByClass,
    getAllTeachersByClass,
    deleteClassById,
    getClassById,
  ]);

  const loadClasses = useCallback(async (unitId: number) => {
    if (!unitId) {
      setClasses([]);
      return;
    }

    setIsListLoading(true);
    try {
      const response = await getAllClassByUnitRef.current(unitId);
      setClasses(response ?? []);
    } finally {
      setIsListLoading(false);
    }
  }, []);

  const handleSelectUnit = useCallback(
    async (unitId: string) => {
      setSelectedUnitId(unitId);
      setCurrentPage(1);
      await loadClasses(Number(unitId));
    },
    [loadClasses]
  );

  const handleRefresh = useCallback(async () => {
    if (!selectedUnitNumber) return;
    await loadClasses(selectedUnitNumber);
  }, [loadClasses, selectedUnitNumber]);

  const handleOpenForm = async (classItem: ClassService.IClassService | null = null) => {
    if (!selectedUnitNumber) return;

    if (!classItem) {
      setClassToEdit(null);
      setIsFormLoading(false);
      setShowForm(true);
      return;
    }

    setClassToEdit(classItem);
    setShowForm(true);
    setIsFormLoading(true);

    try {
      const response = await getClassByIdRef.current(classItem.id);
      if (response) setClassToEdit(response);
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setClassToEdit(null);
    setIsFormLoading(false);
  };

  const handleViewStudents = async (classItem: ClassService.IClassService) => {
    setShowStudentsModal(true);
    setIsMembersLoading(true);
    setStudents([]);

    try {
      const response = await getAllStudentByClassRef.current(classItem.id);
      setStudents(response ?? []);
    } finally {
      setIsMembersLoading(false);
    }
  };

  const handleViewTeachers = async (classItem: ClassService.IClassService) => {
    setShowTeachersModal(true);
    setIsMembersLoading(true);
    setTeachers([]);

    try {
      const response = await getAllTeachersByClassRef.current(classItem.id);
      setTeachers(response ?? []);
    } finally {
      setIsMembersLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!classToDelete) return;

    try {
      setIsDeleting(true);
      const response = await deleteClassByIdRef.current(classToDelete.id);
      if (!response) return;

      toast({ title: t("title"), description: t("success_delete"), variant: "successful" });
      setClassToDelete(null);

      const nextClasses = classes.filter((item) => item.id !== classToDelete.id);
      const nextTotalPages = Math.max(1, Math.ceil(nextClasses.length / CARDS_PER_PAGE));
      if (currentPage > nextTotalPages) {
        setCurrentPage(nextTotalPages);
      }

      await handleRefresh();
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      try {
        setLoadRef.current(true);
        setIsListLoading(true);

        const currentHierarchy = Number(getDataRef.current("hierarquia"));
        if (currentHierarchy === UserRole.SECRETARY) {
          const networkId = Number(getDataRef.current("id_rede"));
          const responseUnits = await getAllUnitByNetworkIdRef.current(networkId);
          const nextUnits = responseUnits ?? [];
          setUnits(nextUnits);

          if (nextUnits.length === 1) {
            const unitId = String(nextUnits[0].id);
            setSelectedUnitId(unitId);
            const responseClasses = await getAllClassByUnitRef.current(nextUnits[0].id);
            setClasses(responseClasses ?? []);
          } else {
            setClasses([]);
          }
          return;
        }

        const unitId = Number(getDataRef.current("id_unidade"));
        if (!unitId) {
          setClasses([]);
          return;
        }

        setSelectedUnitId(String(unitId));
        const responseClasses = await getAllClassByUnitRef.current(unitId);
        setClasses(responseClasses ?? []);
      } finally {
        setIsListLoading(false);
        setLoadRef.current(false);
      }
    };

    void loadInitial();
  }, []);

  useEffect(() => {
    if (currentPage <= totalOfPages) return;
    setCurrentPage(totalOfPages);
  }, [currentPage, totalOfPages]);

  return (
    <S.Container>
      <Animations />

      <S.Main>
        {showForm ? (
          <FormClass
            classToEdit={classToEdit}
            unitId={selectedUnitNumber}
            isLoading={isFormLoading}
            onClose={handleCloseForm}
            onSuccess={handleRefresh}
          />
        ) : (
          <S.Content>
            {showUnitSelect && (
              <S.FilterBox>
                <LabelSelect
                  id="class-unit"
                  label={t("field_unit")}
                  value={selectedUnitId}
                  items={unitOptions}
                  placeholder={t("field_unit_placeholder")}
                  onChange={(value) => void handleSelectUnit(value)}
                />
              </S.FilterBox>
            )}

            {isListLoading ? (
              <S.CardsGrid>
                <S.SkeletonCard />
                <S.SkeletonCard />
                <S.SkeletonCard />
                <S.SkeletonCard />
                <S.SkeletonCard />
                <S.SkeletonCard />
                <S.SkeletonCard />
                <S.SkeletonCard />
              </S.CardsGrid>
            ) : isSecretary && units.length === 0 ? (
              <S.EmptyMessage>{t("empty_units")}</S.EmptyMessage>
            ) : !selectedUnitId ? (
              <S.EmptyMessage>{t("select_unit_first")}</S.EmptyMessage>
            ) : paginatedClasses.length === 0 ? (
              <S.EmptyMessage>{t("empty_classes")}</S.EmptyMessage>
            ) : (
              <>
                <S.CardsGrid>
                  {paginatedClasses.map((classItem) => (
                    <ClassCard
                      key={classItem.id}
                      data={classItem}
                      onViewStudents={(item) => void handleViewStudents(item)}
                      onViewTeachers={(item) => void handleViewTeachers(item)}
                      onViewQrCode={setClassToShowQr}
                      onEdit={(item) => void handleOpenForm(item)}
                      onDelete={setClassToDelete}
                    />
                  ))}
                </S.CardsGrid>

                {totalOfPages > 1 && (
                  <Pagination
                    numberOfPageButton={totalOfPages}
                    currentPage={currentPage}
                    onChangePage={setCurrentPage}
                  />
                )}
              </>
            )}
          </S.Content>
        )}
      </S.Main>

      {!showForm && selectedUnitId && (
        <FloatingAddButton onClick={() => void handleOpenForm()} ariaLabel={t("floating_add_aria")} />
      )}

      <ListModal
        isOpen={showStudentsModal}
        title={t("modal_students_title")}
        emptyMessage={t("empty_students")}
        closeLabel={t("modal_close")}
        isLoading={isMembersLoading}
        items={studentItems}
        onClose={() => setShowStudentsModal(false)}
      />

      <ListModal
        isOpen={showTeachersModal}
        title={t("modal_teachers_title")}
        emptyMessage={t("empty_teachers")}
        closeLabel={t("modal_close")}
        isLoading={isMembersLoading}
        items={teacherItems}
        onClose={() => setShowTeachersModal(false)}
      />

      <QRCodeModal
        isOpen={!!classToShowQr}
        classDescription={classToShowQr?.descricao ?? ""}
        code={classToShowQr?.codigo ?? ""}
        onClose={() => setClassToShowQr(null)}
      />

      <ConfirmActionModal
        isOpen={!!classToDelete}
        title={t("delete_title")}
        description={t("delete_description", { name: classToDelete?.descricao ?? "" })}
        cancelLabel={t("delete_cancel")}
        confirmLabel={t("delete_confirm")}
        onCancel={() => setClassToDelete(null)}
        onConfirm={() => {
          if (isDeleting) return;
          void handleConfirmDelete();
        }}
      />
    </S.Container>
  );
}
