import { Classes } from "@/data/services";
import { useEffect, useState } from "react";
import { useToast, useMain } from "@/data/hooks";
import { ClassStudentService } from "@/data/models";

type useModalStudentProps = {
  classSelected: number;
  handleShowStudent: (open: boolean, id: number) => void;
  fetchData: () => Promise<void>;
}

export const useModalStudent = ({ handleShowStudent, classSelected, fetchData }: useModalStudentProps) => {
  const { toast } = useToast();
  const mainContext = useMain();
  const { deleteClassStudenById, getAllStudentByClass } = Classes();

  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const [students, setStudents] = useState<ClassStudentService.IClassStudentService[]>([]);
  const [dataToDelete, setDataToDelete] = useState<ClassStudentService.IClassStudentService | null>(null);

  const fetchStudents = async () => {
        try {
      mainContext.setLoad(true);

      const response = await getAllStudentByClass(classSelected);
      if (response) setStudents(response);

      mainContext.setLoad(false);
    } catch (error) {
      mainContext.setLoad(false);
    }
  };

  const handleDelete = (open: boolean, data: ClassStudentService.IClassStudentService | null) => {
    setShowDelete(open);
    setDataToDelete(data);
  };

  const handleCancel = () => {
    setShowDelete(false);
    setDataToDelete(null);
    setDisabledBtn(false);
  };

  const handleConfirmDelete = async () => {
    setDisabledBtn(true);

    const response = await deleteClassStudenById(dataToDelete!.id);
    if (response) {
      toast({ title: "Aluno(a)", description: "Aluno(a) removido do grupo com sucesso!", variant: "successful" });
      handleShowStudent(false, 0);
      setStudents([]);
      fetchData();
    }
  };

  useEffect(() => { fetchStudents(); }, [])

  return { showDelete, handleConfirmDelete, handleCancel, handleDelete, dataToDelete, disabledBtn, students };
}