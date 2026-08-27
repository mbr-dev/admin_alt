import * as S from "./styles";
import { useFormAltSession } from "./hook";
import { ChangeEvent } from "react";
import { AltSessionService, ProfessionalsService } from "@/data/models";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { translateClinicaProfissaoById, translateTipoAtendimento, translateTipoAtendimentoById } from "@/lib/i18n/tables/lookup";

interface IFormAltSession {
  onClose: () => void;
  onSuccess: () => Promise<void>;
  sessionToEdit?: AltSessionService.IAltSession | null;
  isLoading?: boolean;
}

export function FormAltSession({ onClose, onSuccess, sessionToEdit = null, isLoading = false }: IFormAltSession) {
  const { t, i18n } = useTranslation("altSession");
  const props = useFormAltSession({ onClose, onSuccess, sessionToEdit });

  const translateSessionTypeLabel = (value: string) => {
    const raw = value.trim();
    if (!raw) return value;
    return translateTipoAtendimento(raw, i18n.language, raw);
  };

  const getClinicProfessionOptionLabel = (item: ProfessionalsService.IClinicProfession) => {
    const raw = (item.tipo_atendimento ?? item.descricao ?? "").trim();
    if (item.tipo_atendimento?.trim()) {
      return translateTipoAtendimentoById(item.id, i18n.language, raw);
    }
    return translateClinicaProfissaoById(item.id, i18n.language, raw);
  };

  const stylesWithExtras = S as typeof S & {
    SearchWrapper: typeof S.Container;
    OptionsList: typeof S.Container;
    OptionButton: typeof S.Button;
    StatusSelect: typeof S.Select;
  };
  const SearchWrapper = stylesWithExtras.SearchWrapper;
  const OptionsList = stylesWithExtras.OptionsList;
  const OptionButton = stylesWithExtras.OptionButton;
  const StatusSelect = stylesWithExtras.StatusSelect;

  const handleInputChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  if (isLoading || props.isLoadingOptions) {
    return (
      <S.Container>
        <S.SkeletonCard>
          <S.SkeletonLine />
          <S.SkeletonLine />
          <S.SkeletonGrid>
            <S.SkeletonLine />
            <S.SkeletonLine />
            <S.SkeletonLine />
            <S.SkeletonLine />
          </S.SkeletonGrid>
          <S.SkeletonGrid>
            <S.SkeletonLine />
            <S.SkeletonLine />
          </S.SkeletonGrid>
        </S.SkeletonCard>
      </S.Container>
    );
  }

  return (
    <>
    <S.Container>
      <S.FormCard>
        <S.Header>
          <S.FormTitle>{props.isEditMode ? t("form_edit_title") : t("form_create_title")}</S.FormTitle>
        </S.Header>

        <S.Sections>
          <S.Section>
            <S.SectionTitle>{t("form_section_session")}</S.SectionTitle>
            <S.Grid>
            <S.Label htmlFor="session-type">
                {t("field_session_type")}
                <S.Select id="session-type" value={props.sessionType} onChange={(e: ChangeEvent<HTMLSelectElement>) => props.setSessionType(e.target.value)}>
                  <option value="">{t("field_session_type_placeholder")}</option>
                  {props.sessionType.trim() &&
                    !props.sessionTypeOptions.some(
                      (item) => (item.tipo_atendimento ?? item.descricao ?? "").trim() === props.sessionType.trim()
                    ) && (
                      <option value={props.sessionType}>{translateSessionTypeLabel(props.sessionType)}</option>
                    )}
                  {props.sessionTypeOptions.map((item) => {
                    const value = (item.tipo_atendimento ?? item.descricao ?? "").trim();
                    return (
                      <option key={item.id} value={value}>
                        {getClinicProfessionOptionLabel(item)}
                      </option>
                    );
                  })}
                </S.Select>
              </S.Label>
              <S.Label htmlFor="session-status">
                {t("field_status")}
                <StatusSelect
                  id="session-status"
                  value={props.status}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => props.setStatus(e.target.value)}
                  $status={props.status}
                >
                  <option value="aberta">{t("status_open")}</option>
                  <option value="em_andamento">{t("status_in_progress")}</option>
                  <option value="finalizada">{t("status_finished")}</option>
                  <option value="cancelada">{t("status_cancelled")}</option>
                </StatusSelect>
              </S.Label>
              <S.Label htmlFor="session-patient-id">
                {t("field_patient")}
                <SearchWrapper>
                  <S.Input
                    id="session-patient-id"
                    value={props.patientName}
                    onChange={handleInputChange(props.setPatientName)}
                    placeholder={props.isLoadingOptions ? t("placeholder_loading_patients") : t("placeholder_filter")}
                  />
                  {props.patientName && !props.idPatient && props.filteredStudents.length > 0 && (
                    <OptionsList>
                      {props.filteredStudents.map((item) => (
                        <OptionButton type="button" key={item.id_usuario} onMouseDown={() => props.handleSelectPatient(item)}>
                          {item.nome}
                        </OptionButton>
                      ))}
                    </OptionsList>
                  )}
                </SearchWrapper>
              </S.Label>
              <S.Label htmlFor="session-professional-id">
                {t("field_professional")}
                <SearchWrapper>
                  <S.Input
                    id="session-professional-id"
                    value={props.professionalName}
                    onChange={handleInputChange(props.setProfessionalName)}
                    placeholder={props.isLoadingOptions ? t("placeholder_loading_professionals") : t("placeholder_filter")}
                  />
                  {props.professionalName && !props.idProfessional && props.filteredProfessionals.length > 0 && (
                    <OptionsList>
                      {props.filteredProfessionals.map((item) => (
                        <OptionButton type="button" key={`${item.id_usuario}-${item.nome}`} onMouseDown={() => props.handleSelectProfessional(item)}>
                          {item.nome}
                        </OptionButton>
                      ))}
                    </OptionsList>
                  )}
                </SearchWrapper>
              </S.Label>

              <S.Label htmlFor="session-start">
                {t("field_start")}
                <S.Input
                  id="session-start"
                  type="datetime-local"
                  value={props.startDate}
                  onChange={handleInputChange(props.setStartDate)}
                />
              </S.Label>

              <S.Label htmlFor="session-end">
                {t("field_end")}
                <S.Input
                  id="session-end"
                  type="datetime-local"
                  value={props.endDate}
                  onChange={handleInputChange(props.setEndDate)}
                />
              </S.Label>
            </S.Grid>
          </S.Section>
        </S.Sections>

        <S.Footer>
          <S.Button type="button" $variant="secondary" onClick={onClose}>
            {t("button_back")}
          </S.Button>
          <S.Button type="button" $variant="primary" onClick={props.handleSubmit} disabled={props.disabledBtn}>
            {props.isEditMode ? t("button_update") : t("button_confirm")}
          </S.Button>
        </S.Footer>
      </S.FormCard>
    </S.Container>

    <Dialog open={props.showProfessionMismatchDialog} onOpenChange={props.handleMismatchDialogOpenChange}>
      <DialogContent
        className="sm:max-w-md [&>button:last-child]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("mismatch_title")}</DialogTitle>
          <DialogDescription>
            {t("mismatch_description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={() => props.setShowProfessionMismatchDialog(false)}>
            {t("mismatch_no")}
          </Button>
          <Button type="button" onClick={() => void props.handleMismatchDialogYes()}>
            {t("mismatch_yes")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}
