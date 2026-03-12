import { Student } from "@/data/services";
import { Unit } from "@/data/services";
import { CID } from "@/data/services";
import { CidService, StudentService, UnitService } from "@/data/models";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStorage, useToast, useMain } from "@/data/hooks";
import { consultarCep } from "@/lib/consultarCep";

interface IUseFormStudent {
  onSuccess?: () => Promise<void> | void;
  onClose?: () => void;
  studentToEdit?: StudentService.IStudent | null;
}

export const useFormStudent = ({ onSuccess, onClose, studentToEdit }: IUseFormStudent = {}) => {
  const { toast } = useToast();
  const { setLoad } = useMain();
  const { createClinicStudent, updateClinicStudentByUserId, verifyUser, getClinicStudentByUserId } = Student();
  const { getAllUnitByNetworkIdPaged } = Unit();
  const { getAllCidGrouped } = CID();
  const { getData } = useStorage();

  const [studentName, setStudentName] = useState<string>("");
  const [studentEmail, setStudentEmail] = useState<string>("");
  const [studentBirth, setStudentBirth] = useState<string>("");
  const [studentSex, setStudentSex] = useState<string>("M");

  const [guardianName, setGuardianName] = useState<string>("");
  const [guardianEmail, setGuardianEmail] = useState<string>("");
  const [guardianBirth, setGuardianBirth] = useState<string>("");
  const [guardianCpfCnpj, setGuardianCpfCnpj] = useState<string>("");
  const [guardianKinship, setGuardianKinship] = useState<string>("");

  const [addressStreet, setAddressStreet] = useState<string>("");
  const [addressNumber, setAddressNumber] = useState<string>("");
  const [addressComplement, setAddressComplement] = useState<string>("");
  const [addressCep, setAddressCep] = useState<string>("");
  const [addressDistrict, setAddressDistrict] = useState<string>("");
  const [addressRegion, setAddressRegion] = useState<string>("");
  const [addressType, setAddressType] = useState<string>("RESIDENCIAL");

  const [contactGuardianName, setContactGuardianName] = useState<string>("");
  const [contactValue, setContactValue] = useState<string>("");
  const [contactType, setContactType] = useState<string>("CELULAR");

  const [user, setUser] = useState<string>("");
  const [validatedUser, setValidatedUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [units, setUnits] = useState<UnitService.IUnitByNetworkPg[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState<string>("");
  const [cidGroups, setCidGroups] = useState<CidService.ICidGrupo[]>([]);
  const [selectedCidIds, setSelectedCidIds] = useState<number[]>([]);
  const [isCidLoading, setIsCidLoading] = useState<boolean>(false);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const isEditMode = !!studentToEdit;
  const previousUserPrefixRef = useRef<string>("");

  const fetchData = async (studentToEditData?: StudentService.IStudent | null) => {
    try {
      setIsFormLoading(true);
      setIsCidLoading(true);
      const [unitsResponse, cidsResponse] = await Promise.all([
        getAllUnitByNetworkIdPaged(Number(getData("id_rede")), 1),
        getAllCidGrouped(),
      ]);

      let unitsList: UnitService.IUnitByNetworkPg[] = [];
      if (!unitsResponse) {
        setUnits([]);
        setSelectedUnitId("");
      } else {
        unitsList = Array.isArray(unitsResponse) ? unitsResponse : unitsResponse.data ?? [];
        setUnits(unitsList);
        if (unitsList.length > 0) {
          setSelectedUnitId(String(unitsList[0].id));
        } else {
          setSelectedUnitId("");
        }
      }

      setCidGroups(cidsResponse?.data ?? []);

      if (studentToEditData?.id_usuario) {
        const clinicStudent = await getClinicStudentByUserId(studentToEditData.id_usuario);
        if (clinicStudent) {
          const userValue = clinicStudent.usuario?.usuario ?? studentToEditData.usuario ?? "";
          setUser(userValue);
          setValidatedUser(userValue);
          setVerified(true);
          setPassword("");
          setSelectedUnitId(String(clinicStudent.usuario?.unidade ?? unitsList[0]?.id ?? ""));

          setStudentName(clinicStudent.aluno?.nome ?? "");
          setStudentEmail(clinicStudent.aluno?.email ?? "");
          setStudentBirth(clinicStudent.aluno?.data_nascimento?.split("T")[0] ?? "");
          setStudentSex(clinicStudent.aluno?.sexo ?? "M");

          setGuardianName(clinicStudent.responsavel?.nome ?? "");
          setGuardianEmail(clinicStudent.responsavel?.email ?? "");
          setGuardianBirth(clinicStudent.responsavel?.data_nascimento?.split("T")[0] ?? "");
          setGuardianCpfCnpj(clinicStudent.responsavel?.cpf_cnpj ?? "");
          setGuardianKinship(clinicStudent.responsavel?.parentesco ?? "");

          setAddressStreet(clinicStudent.responsavel_endereco?.logradouro ?? "");
          setAddressNumber(clinicStudent.responsavel_endereco?.numero ?? "");
          setAddressComplement(clinicStudent.responsavel_endereco?.complemento ?? "");
          setAddressCep(clinicStudent.responsavel_endereco?.cep ?? "");
          setAddressDistrict(clinicStudent.responsavel_endereco?.bairro ?? "");
          setAddressRegion(clinicStudent.responsavel_endereco?.regiao ?? "");
          setAddressType(clinicStudent.responsavel_endereco?.tipo ?? "RESIDENCIAL");

          setContactGuardianName(clinicStudent.responsavel_contato?.nome_responsavel ?? "");
          setContactValue(clinicStudent.responsavel_contato?.contato ?? "");
          setContactType(clinicStudent.responsavel_contato?.tipo ?? "CELULAR");

          const cidResponse = clinicStudent.cid_usuario as unknown;
          const normalizedCidIds = Array.isArray(cidResponse)
            ? cidResponse
                .map((item) => {
                  if (typeof item === "number") return item;
                  if (item && typeof item === "object" && "id_cid" in item) return Number((item as { id_cid: number }).id_cid);
                  return null;
                })
                .filter((id): id is number => typeof id === "number" && !Number.isNaN(id))
            : [];

          setSelectedCidIds(normalizedCidIds);
        }
      }
    } finally {
      setIsCidLoading(false);
      setIsFormLoading(false);
    }
  };

  const generateUser = (value: string) => {  
    const valueWithoutPrefix = userPrefix && value.startsWith(userPrefix) ? value.slice(userPrefix.length) : value;
    const formattedName = valueWithoutPrefix
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_");
  
    const userToSet = !isEditMode && userPrefix ? `${userPrefix}${formattedName}` : formattedName;
    setUser(userToSet);
    setValidatedUser("");
    setVerified(false);
  };

  const selectedUnit = useMemo(
    () => units.find((unit) => String(unit.id) === selectedUnitId) ?? null,
    [selectedUnitId, units]
  );

  const hasSingleUnit = units.length === 1;

  const buildUserPrefix = (unitDescription: string) => {
    const words = unitDescription
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean);

    if (words.length === 0) return "";
    if (words.length >= 3) return `${words[0][0]}${words[1][0]}${words[2][0]}_`;
    if (words.length === 2) return `${words[0][0]}${words[1].slice(0, 2)}_`;
    return `${words[0].slice(0, 3)}_`;
  };

  const userPrefix = !isEditMode && selectedUnit?.descricao ? buildUserPrefix(selectedUnit.descricao) : "";

  useEffect(() => {
    if (isEditMode) return;
    if (!hasSingleUnit) return;
    setSelectedUnitId(String(units[0].id));
  }, [hasSingleUnit, isEditMode, units]);

  useEffect(() => {
    if (isEditMode) return;

    const previousPrefix = previousUserPrefixRef.current;
    if (!userPrefix) {
      previousUserPrefixRef.current = "";
      return;
    }

    setUser((prevValue) => {
      const baseSuffix =
        previousPrefix && prevValue.startsWith(previousPrefix) ? prevValue.slice(previousPrefix.length) : prevValue;
      return `${userPrefix}${baseSuffix}`;
    });
    setValidatedUser("");
    setVerified(false);
    previousUserPrefixRef.current = userPrefix;
  }, [isEditMode, userPrefix]);

  const verifyIfUserExists = async () => {
    if (user === "") return;

    const response = await verifyUser(user);
    if (response) {
      setValidatedUser("");
      setVerified(false);
      return;
    }

    if (!response) {
      toast({ title: "Usuário", description: `Usuário válido ${user}!`, variant: "successful" });
      setValidatedUser(user.trim());
      setVerified(true);
    }
  };

  const toggleCidSelection = (cidId: number) => {
    setSelectedCidIds((prev) => (prev.includes(cidId) ? prev.filter((id) => id !== cidId) : [...prev, cidId]));
  };

  const handleCepBlur = async () => {
    if (!addressCep.trim()) return;

    const data = await consultarCep(addressCep);
    if (!data) return;

    setAddressStreet(data.logradouro ?? "");
    setAddressDistrict(data.bairro ?? "");
    setAddressRegion(data.localidade ?? "");
  };

  const handleSubmit = async () => {
    try {
      setLoad(true);
      setDisabledBtn(true);

      if (!verifyData()) return;

      const dataToSend = {
        usuario: {
          usuario: user.trim(),
          senha: isEditMode ? (password.trim() ? password.trim() : null) : password.trim(),
          unidade: Number(selectedUnitId),
        },
        aluno: {
          nome: studentName.trim(),
          email: studentEmail.trim(),
          data_nascimento: new Date(`${studentBirth}T00:00:00`).toISOString(),
          sexo: studentSex,
        },
        responsavel: {
          nome: guardianName.trim(),
          email: guardianEmail.trim(),
          data_nascimento: new Date(`${guardianBirth}T00:00:00`).toISOString(),
          cpf_cnpj: guardianCpfCnpj.trim(),
          parentesco: guardianKinship.trim(),
        },
        responsavel_endereco: {
          logradouro: addressStreet.trim(),
          numero: addressNumber.trim(),
          complemento: addressComplement.trim() || undefined,
          cep: addressCep.trim(),
          bairro: addressDistrict.trim(),
          regiao: addressRegion.trim(),
          tipo: addressType.trim(),
        },
        responsavel_contato: {
          nome_responsavel: contactGuardianName.trim(),
          contato: contactValue.trim(),
          tipo: contactType.trim(),
        },
        cid_usuario: selectedCidIds,
      };

      if (isEditMode && studentToEdit?.id_usuario) {
        const response = await updateClinicStudentByUserId(studentToEdit.id_usuario, dataToSend);
        if (response) {
          toast({ title: "Alunos", description: `Aluno ${user} atualizado com sucesso`, variant: "successful" });
          cleanData();
          if (onSuccess) await onSuccess();
          if (onClose) onClose();
        }
        return;
      }

      const response = await createClinicStudent(dataToSend);

      if (response) {
        toast({ title: "Alunos", description: `Aluno ${user} cadastrado com sucesso`, variant: "successful" });
        cleanData();
        if (onSuccess) await onSuccess();
        if (onClose) onClose();
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

    if (!studentName.trim()) {
      toast({ title: "Alunos", description: "Informe o nome!", variant: "destructive" });
      result = false;
    } else if (!studentEmail.trim()) {
      toast({ title: "Alunos", description: "Informe o e-mail!", variant: "destructive" });
      result = false;
    } else if (!emailRegex.test(studentEmail.trim())) {
      toast({ title: "Alunos", description: "E-mail inválido!", variant: "destructive" });
      result = false;
    } else if (!studentBirth) {
      toast({ title: "Alunos", description: "Informe a data de nascimento do aluno!", variant: "destructive" });
      result = false;
    } else if (!guardianName.trim()) {
      toast({ title: "Alunos", description: "Informe o nome do responsável!", variant: "destructive" });
      result = false;
    } else if (!guardianEmail.trim()) {
      toast({ title: "Alunos", description: "Informe o e-mail do responsável!", variant: "destructive" });
      result = false;
    } else if (!emailRegex.test(guardianEmail.trim())) {
      toast({ title: "Alunos", description: "E-mail do responsável inválido!", variant: "destructive" });
      result = false;
    } else if (!guardianBirth) {
      toast({ title: "Alunos", description: "Informe a data de nascimento do responsável!", variant: "destructive" });
      result = false;
    } else if (!guardianCpfCnpj.trim()) {
      toast({ title: "Alunos", description: "Informe o CPF/CNPJ do responsável!", variant: "destructive" });
      result = false;
    } else if (!guardianKinship.trim()) {
      toast({ title: "Alunos", description: "Informe o parentesco do responsável!", variant: "destructive" });
      result = false;
    } else if (!addressStreet.trim() || !addressNumber.trim() || !addressCep.trim() || !addressDistrict.trim() || !addressRegion.trim()) {
      toast({ title: "Alunos", description: "Preencha os dados obrigatórios de endereço!", variant: "destructive" });
      result = false;
    } else if (!contactGuardianName.trim() || !contactValue.trim()) {
      toast({ title: "Alunos", description: "Preencha os dados obrigatórios de contato!", variant: "destructive" });
      result = false;
    } else if (user === "") {
      toast({ title: "Alunos", description: "Informe o usuário!", variant: "destructive" });
      result = false;
    } else if (!isEditMode && !password.trim()) {
      toast({ title: "Alunos", description: "Informe a senha!", variant: "destructive" });
      result = false;
    } else if (!selectedUnitId) {
      toast({ title: "Alunos", description: "Selecione a unidade!", variant: "destructive" });
      result = false;
    } else if (!isEditMode && !verified) {
      toast({ title: "Alunos", description: "Precisa verificar o usuário primeiro!", variant: "destructive" });
      result = false;
    } else if (!isEditMode && validatedUser !== user.trim()) {
      toast({ title: "Alunos", description: "Usuário alterado. Verifique novamente antes de cadastrar!", variant: "destructive" });
      result = false;
    } else if (selectedCidIds.length === 0) {
      toast({ title: "Alunos", description: "Selecione ao menos um CID!", variant: "destructive" });
      result = false;
    }

    return result;
  };

  const cleanData = () => {
    setStudentName("");
    setStudentEmail("");
    setStudentBirth("");
    setStudentSex("M");
    setGuardianName("");
    setGuardianEmail("");
    setGuardianBirth("");
    setGuardianCpfCnpj("");
    setGuardianKinship("");
    setAddressStreet("");
    setAddressNumber("");
    setAddressComplement("");
    setAddressCep("");
    setAddressDistrict("");
    setAddressRegion("");
    setAddressType("residencial");
    setContactGuardianName("");
    setContactValue("");
    setContactType("CELULAR");
    setUser("");
    setValidatedUser("");
    setPassword("");
    if (units.length > 0) {
      setSelectedUnitId(String(units[0].id));
    } else {
      setSelectedUnitId("");
    }
    setSelectedCidIds([]);
    setVerified(false);
  };

  useEffect(() => {
    void fetchData(studentToEdit);
    // Dispara somente quando muda o id em edição (ou entra/sai do modo edição)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentToEdit?.id_usuario]);

  return {
    handleSubmit,
    verified,
    verifyIfUserExists,
    generateUser,
    disabledBtn,
    user,
    setUser,
    password,
    setPassword,
    units,
    hasSingleUnit,
    selectedUnitId,
    setSelectedUnitId,
    isFormLoading,
    isCidLoading,
    cidGroups,
    selectedCidIds,
    toggleCidSelection,
    handleCepBlur,
    studentName,
    setStudentName,
    studentEmail,
    setStudentEmail,
    studentBirth,
    setStudentBirth,
    studentSex,
    setStudentSex,
    guardianName,
    setGuardianName,
    guardianEmail,
    setGuardianEmail,
    guardianBirth,
    setGuardianBirth,
    guardianCpfCnpj,
    setGuardianCpfCnpj,
    guardianKinship,
    setGuardianKinship,
    addressStreet,
    setAddressStreet,
    addressNumber,
    setAddressNumber,
    addressComplement,
    setAddressComplement,
    addressCep,
    setAddressCep,
    addressDistrict,
    setAddressDistrict,
    addressRegion,
    setAddressRegion,
    addressType,
    setAddressType,
    contactGuardianName,
    setContactGuardianName,
    contactValue,
    setContactValue,
    contactType,
    setContactType,
  };
};
