import { Classes } from "@/data/services";
import { useEffect, useState } from "react";
import { useToast, useMain } from "@/data/hooks";
import { ClassTeacherService } from "@/data/models";

type useModalTeacherProps = {
  classSelected: number;
  handleShowTeacher: (open: boolean, id: number) => void;
  fetchData: () => Promise<void>;
}

export const useModalTeacher = ({ classSelected, fetchData, handleShowTeacher }: useModalTeacherProps) => {
  const { toast } = useToast();
  const mainContext = useMain();
  const { getAllTeacherByClass, deleteClassTeacherById } = Classes();

  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const [dataToDelete, setDataToDelete] = useState<ClassTeacherService.IClassTeacherService | null>(null);
  const [teachers, setTeachers] = useState<ClassTeacherService.IClassTeacherService[]>([]);

  const fetchTeachersByClass = async () => {
    try {
      mainContext.setLoad(true);

      const response = await getAllTeacherByClass(classSelected);
      if (response) setTeachers(response);

      mainContext.setLoad(false);
    } catch (error) {
      mainContext.setLoad(false);
    }
  };

  const handleDelete = (open: boolean, data: ClassTeacherService.IClassTeacherService | null) => {
    setShowDelete(open);
    setDataToDelete(data);
  };

  const handleConfirmDelete = async () => {
    setDisabledBtn(true);
    const response = await deleteClassTeacherById(dataToDelete!.id);

    if (response) {
      toast({ title: "Professor(a)", description: "Professor(a) removido da turma com sucesso!", variant: "successful" });
      handleShowTeacher(false, 0);
      setTeachers([]);
      fetchData();
    }
  }

  const handleCancel = () => {
    setShowDelete(false);
    setDataToDelete(null);
    setDisabledBtn(false);
  };

  useEffect(() => { fetchTeachersByClass(); }, []);

  return { showDelete, disabledBtn, handleDelete, handleCancel, handleConfirmDelete, teachers, dataToDelete };
}