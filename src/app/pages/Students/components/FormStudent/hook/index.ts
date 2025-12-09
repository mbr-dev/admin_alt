import { Student } from "@/data/services";
import { useEffect, useState } from "react";
import { useStorage, useToast, useMain } from "@/data/hooks";

export const useFormStudent = () => {
  const { toast } = useToast();
  const { setLoad } = useMain();
  const { registerStudent, verifyUser, getUnitById } = Student();
  const { getData } = useStorage();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, _] = useState<string>("123456");
  const [user, setUser] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [birth, setBirth] = useState<Date | undefined>(undefined);
  const [verified, setVerified] = useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

  const fetchData = async () => {
    const response = await getUnitById(Number(getData("id_unidade")));
    if (response) setUnit(response.descricao);
  };

  const generateUser = (value: string) => {  
    const formattedName = value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_");
  
    setUser(formattedName);
  };

  const verifyIfUserExists = async () => {
    if (user === "") return;

    const response = await verifyUser(user);
    if (!response) {
      toast({ title: "Usuário", description: `Usuário válido ${user}!`, variant: "successful" });
      setVerified(true);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoad(true);
      setDisabledBtn(true);

      if (!verifyData()) return;

      const dataToSend = {
        nome: name.trim(),
        usuario: user.trim(),
        email: email,
        senha: password,
        id_unidade: Number(getData("id_unidade")),
        data_nascimento: birth ? new Date(birth).toISOString() : null,
        alt: 1
      };

      const response = await registerStudent(dataToSend);

      if (response) {
        toast({ title: "Alunos", description: `Aluno ${user} cadastrado com sucesso`, variant: "successful" });
        cleanData();
      }

      setDisabledBtn(false);
      setLoad(false);
    } finally {
      setDisabledBtn(false);
      setLoad(false);
    }
  };

  const verifyData = () => {
    let result = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (name === "") {
      toast({ title: "Alunos", description: "Informe o nome!", variant: "destructive" });
      result = false;
    } else if (email === "") {
      toast({ title: "Alunos", description: "Informe o e-mail!", variant: "destructive" });
      result = false;
    } else if (!emailRegex.test(email)) {
      toast({ title: "Alunos", description: "E-mail inválido!", variant: "destructive" });
      result = false;
    } else if (user === "") {
      toast({ title: "Alunos", description: "Informe o usuário!", variant: "destructive" });
      result = false;
    } else if (!verified) {
      toast({ title: "Alunos", description: "Precisa verificar o usuário primeiro!", variant: "destructive" });
      result = false;
    }

    return result;
  };

  const cleanData = () => {
    setName("");
    setEmail("");
    setUser("");
    setBirth(undefined);
    setVerified(false);
  };

  useEffect(() => { fetchData(); }, []);

  return { handleSubmit, name, setName, verified, verifyIfUserExists, generateUser, email, setEmail, disabledBtn, birth, setBirth, password, setUser, user, unit };
};
