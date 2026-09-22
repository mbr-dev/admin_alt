import * as S from "./styles";
import { ClassService } from "@/data/models";
import { useTranslation } from "react-i18next";
import { FaQrcode } from "react-icons/fa";
import { FaChalkboardUser, FaPencil, FaTrash, FaUsers } from "react-icons/fa6";

interface IClassCard {
  data: ClassService.IClassService;
  onViewStudents: (classItem: ClassService.IClassService) => void;
  onViewTeachers: (classItem: ClassService.IClassService) => void;
  onViewQrCode: (classItem: ClassService.IClassService) => void;
  onEdit: (classItem: ClassService.IClassService) => void;
  onDelete: (classItem: ClassService.IClassService) => void;
}

export function ClassCard({ data, onViewStudents, onViewTeachers, onViewQrCode, onEdit, onDelete }: IClassCard) {
  const { t } = useTranslation("classes");
  const isActive = data.status === 1;

  return (
    <S.Card>
      <S.Header>
        <S.Title title={data.descricao}>{data.descricao}</S.Title>
        <S.Status $active={isActive}>{isActive ? t("status_active") : t("status_inactive")}</S.Status>
      </S.Header>

      <S.Infos>
        <S.Info>
          <S.InfoLabel>{t("card_code")}</S.InfoLabel>
          <S.InfoValue>{data.codigo}</S.InfoValue>
        </S.Info>
        <S.Info>
          <S.InfoLabel>{t("card_series")}</S.InfoLabel>
          <S.InfoValue>{data.num_serie}</S.InfoValue>
        </S.Info>
        <S.Info>
          <S.InfoLabel>{t("card_students")}</S.InfoLabel>
          <S.InfoValue>{data.total_alunos ?? 0}</S.InfoValue>
        </S.Info>
        <S.Info>
          <S.InfoLabel>{t("card_teachers")}</S.InfoLabel>
          <S.InfoValue>{data.total_professores ?? 0}</S.InfoValue>
        </S.Info>
      </S.Infos>

      <S.Actions>
        <S.ActionButton
          type="button"
          $variant="students"
          aria-label={`${t("button_view_students")} ${data.descricao}`}
          onClick={() => onViewStudents(data)}
        >
          <FaUsers />
        </S.ActionButton>
        <S.ActionButton
          type="button"
          $variant="teachers"
          aria-label={`${t("button_view_teachers")} ${data.descricao}`}
          onClick={() => onViewTeachers(data)}
        >
          <FaChalkboardUser />
        </S.ActionButton>
        <S.ActionButton
          type="button"
          $variant="qrcode"
          aria-label={`${t("button_qrcode")} ${data.descricao}`}
          onClick={() => onViewQrCode(data)}
        >
          <FaQrcode />
        </S.ActionButton>
        <S.ActionButton
          type="button"
          $variant="edit"
          aria-label={`${t("button_edit")} ${data.descricao}`}
          onClick={() => onEdit(data)}
        >
          <FaPencil />
        </S.ActionButton>
        <S.ActionButton
          type="button"
          $variant="delete"
          aria-label={`${t("button_delete")} ${data.descricao}`}
          onClick={() => onDelete(data)}
        >
          <FaTrash />
        </S.ActionButton>
      </S.Actions>
    </S.Card>
  );
}
