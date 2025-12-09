import { useToast } from "@/data/hooks";
import { Student } from "@/data/services";
import { useStudents } from "../../../hook";
import { useEffect, useState } from "react";

export const userModalShow = () => {
  const { toast } = useToast();
  const { updateStudentByUserId, deleteStudentByUserId } = Student();
  const studentsContext = useStudents();
 
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, _] = useState<string>("12345678910");
  const [user, setUser] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [birth, setBirth] = useState<Date | undefined>(undefined);
  const [ableToEdit, setAbleToEdit] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const [disabledBtnDel, setDisabledBtnDel] = useState<boolean>(false);

  const fetchData = () => {
    setName(studentsContext.selectedData?.nome ?? "");
    setEmail(studentsContext.selectedData?.email ?? "");
    setUser(studentsContext.selectedData?.usuario ?? "");
    setUnit(studentsContext.selectedData?.descricao ?? "");

    const date = new Date(studentsContext.selectedData?.nascimento!);
    const formattedDate = date.toISOString().split("T")[0];
    setBirth(studentsContext.selectedData?.nascimento ? new Date(formattedDate) : undefined);
  };

  const handleSubmit = async () => {
    try {
      setDisabledBtn(true);

      if (name === studentsContext.selectedData?.nome && email === studentsContext.selectedData?.email && birth === undefined) return;

      const updatedData = {
        nome: name !== studentsContext.selectedData?.nome ? name : null,
        email: email !== studentsContext.selectedData?.email ? email : null,
        data_nascimento: birth ? new Date(birth).toISOString() : null,
      }

      const response = await updateStudentByUserId(studentsContext.selectedData?.id_usuario!, updatedData);
      if (response) {
        toast({ title: "Alunos", description: `Aluno(a) ${studentsContext.selectedData?.usuario} editado com sucesso`, variant: "successful" });
        studentsContext.handleShowData(false, null);
      }

      setDisabledBtn(false);
    } finally {
      setDisabledBtn(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDisabledBtnDel(true);

      const response = await deleteStudentByUserId(studentsContext.selectedData?.id_usuario!);
      if (response) {
        toast({ title: "Alunos", description: `Aluno(a) ${studentsContext.selectedData?.usuario} excluído com sucesso`, variant: "successful" });
        studentsContext.handleShowData(false, null);
      }
      setDisabledBtnDel(false);
    } finally {
      setDisabledBtnDel(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return { name, setName, email, disabledBtn, handleDelete, handleSubmit, disabledBtnDel, setEmail, user, setUser, birth, setBirth, unit, password, ableToEdit, setAbleToEdit, deleteData, setDeleteData };
};