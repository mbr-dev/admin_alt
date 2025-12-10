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
  //Busca os aluno da turma
  const fetchStudents = async () => {
    try {
      mainContext.setLoad(true);

      const response = await getAllStudentByClass(classSelected);
      if (response) setStudents(response);

      mainContext.setLoad(false);
    } finally {
      mainContext.setLoad(false);
    }
  };
  //Pega o aluno para deletar da turma
  const handleDelete = (open: boolean, data: ClassStudentService.IClassStudentService | null) => {
    setShowDelete(open);
    setDataToDelete(data);
  };
  //Limpa os campos
  const handleCancel = () => {
    setShowDelete(false);
    setDataToDelete(null);
    setDisabledBtn(false);
  };
  //Confirma a deleção do aluno da turma
  const handleConfirmDelete = async () => {
    try {
      mainContext.setLoad(true);
      setDisabledBtn(true);

      const response = await deleteClassStudenById(dataToDelete!.id);
      if (response) {
        toast({ title: "Aluno(a)", description: "Aluno(a) removido do grupo com sucesso!", variant: "successful" });
        handleShowStudent(false, 0);
        setStudents([]);
        fetchData();
      }

      setDisabledBtn(false);
      mainContext.setLoad(false);
    } finally {
      mainContext.setLoad(false);
    }
  };

  useEffect(() => { fetchStudents(); }, [])

  return { showDelete, handleConfirmDelete, handleCancel, handleDelete, dataToDelete, disabledBtn, students };
}