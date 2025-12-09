import * as S from "./styles";
import { cn } from "@/lib/utils";
import { userModalShow } from "./hook";
import { useStudents } from "../../hook";
import { useStorage } from "@/data/hooks";
import { IoClose } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { UserRole } from "../../../../../data/constants/user-roles";

export function ModalShow() {
  const hook = userModalShow();
  const { getData } = useStorage();
  const studentContext = useStudents();

  return (
    <S.Container>
      <div onClick={() => studentContext.handleShowData(false, null)} className="w-full h-full fixed top-0 left-0 z-50 bg-mbr-bg-modal"></div>

      <S.Main>
        <S.Close onClick={() => studentContext.handleShowData(false, null)}>
          <IoClose />
        </S.Close>

        {(Number(getData("hierarquia")) === UserRole.COORDINATOR || Number(getData("hierarquia")) === UserRole.SECRETARY) &&
          <S.UpdateAndDelete>
            <S.ButtonUpDel
              onClick={() => hook.setAbleToEdit(!hook.ableToEdit)}
              className={cn(hook.ableToEdit && "text-white bg-mbr-red-20")}
              disabled={hook.deleteData}
              >
              <S.Icon><MdOutlineEdit /></S.Icon>
              Editar
            </S.ButtonUpDel>

            <S.ButtonUpDel
              onClick={() => hook.setDeleteData(!hook.deleteData)}
              className={cn(hook.deleteData && "text-white bg-mbr-red-20")}
              disabled={hook.ableToEdit}
            >
              <S.Icon><FaRegTrashCan /></S.Icon>
              Deletar
            </S.ButtonUpDel>
          </S.UpdateAndDelete>}
        
        {hook.deleteData ? (
          <S.Delete>
            <p className="text-2xl">Excluir</p>
            <h2 className="text-3xl font-medium">{hook.name}</h2>

            <S.ButtonContainer>
              <S.ButtonDel color="default" onClick={() => hook.setDeleteData(false)}>Não</S.ButtonDel>
              <S.ButtonDel color="green" onClick={hook.handleDelete} disabled={hook.disabledBtnDel}>Sim</S.ButtonDel>
            </S.ButtonContainer>
          </S.Delete>
        ) : (
          <S.Form>
            <S.Row>
              <S.Label htmlFor="name-user">
                Nome
                <S.Input 
                  type="text" 
                  id="name-user"
                  className={cn(hook.ableToEdit && "border-mbr-red-30")}
                  disabled={!hook.ableToEdit}
                  value={hook.name || ""}
                  onChange={(e: any) => hook.setName(e.target.value)}
                  tabIndex={0}
                />
              </S.Label>

              <S.Label htmlFor="email-user">
                E-mail
                <S.Input 
                  type="email"
                  id="email-user"
                  className={cn(hook.ableToEdit && "border-mbr-red-30")}
                  value={hook.email || ""}
                  disabled={!hook.ableToEdit}
                  onChange={(e: any) => hook.setEmail(e.target.value)}
                  tabIndex={0}
                />
              </S.Label>

              <S.Label htmlFor="birthDate">
                Aniversário
                <S.Input 
                  type="date" 
                  id="birthDate"
                  className={cn(hook.ableToEdit && "border-mbr-red-30")}
                  disabled={!hook.ableToEdit}
                  max={new Date().toISOString().split('T')[0]}
                  value={hook.birth ? hook.birth.toISOString().split('T')[0] : ""}
                  onChange={(e: any) => {
                    const selectedDate = e.target.value 
                      ? new Date(`${e.target.value}T00:00:00.000Z`)
                      : undefined;
                    hook.setBirth(selectedDate);
                  }}
                  name="birthDate"
                />
              </S.Label>
            </S.Row>

            <S.Row>
              <S.Label>
                Unidade
                <S.Input type="email" disabled value={hook.unit || ""} />
              </S.Label>
          
              <S.Label htmlFor="user">
                Usuário
                <S.Input 
                  type="text" 
                  id="user"
                  disabled
                  value={hook.user || ""}
                  onChange={(e: any) => hook.setUser(e.target.value)}
                  tabIndex={0}
                />
              </S.Label>

              <S.Label>
                Senha
                <S.Input type="password" disabled value={hook.password} />
              </S.Label>
            </S.Row>

            {hook.ableToEdit && <S.Button onClick={hook.handleSubmit} disabled={hook.disabledBtn}>{hook.disabledBtn ? "Carregando" : "Confirmar"}</S.Button>}
          </S.Form>
        )}
      </S.Main>
    </S.Container>
  );
}
