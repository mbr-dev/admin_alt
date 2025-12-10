import * as S from "./styles";
import { format } from "date-fns";
import { useGroups } from "../../hook";
import { FaEye } from "react-icons/fa";

export const ListClasses = () => {
  const groupsContext = useGroups();

  return (
    <S.Container>
      <S.TableContainer>
        <S.TableHeader>
          <S.TableHRow>
            <S.TableHead>Group</S.TableHead>
            <S.TableHead>Total Alunos</S.TableHead>
            <S.TableHead>Total Médicos</S.TableHead>
            <S.TableHead>Código</S.TableHead>
            <S.TableHead>Data</S.TableHead>
          </S.TableHRow>
        </S.TableHeader>

        <S.TableBody>
          {groupsContext?.classes.length > 0 && groupsContext.classes.map((item, index) => (
            <S.TableBRow key={index}>
              <S.TableCell>{item.descricao}</S.TableCell>
              <S.TableCell>
                <S.Div>
                  {item.total_alunos}
                  <S.Button onClick={() => groupsContext.handleShowStudent(true, item.id)}>
                    <FaEye />
                  </S.Button>
                </S.Div>
              </S.TableCell>
              <S.TableCell>
                <S.Div>
                  {item.total_professores}
                  <S.Button onClick={() => groupsContext.handleShowTeacher(true, item.id)}>
                    <FaEye />
                  </S.Button>
                </S.Div>
              </S.TableCell>
              <S.TableCell>{item.codigo}</S.TableCell>
              <S.TableCell>{format(new Date(item.data_cadastro), "dd/MM/yyyy HH:mm")}</S.TableCell>
            </S.TableBRow>
          ))}
        </S.TableBody>
      </S.TableContainer>
    </S.Container>
  )
}