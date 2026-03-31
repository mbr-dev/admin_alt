import * as S from "./styles";
import { useFormAltSession } from "./hook";
import { ChangeEvent } from "react";
import { AltSessionService } from "@/data/models";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface IFormAltSession {
  onClose: () => void;
  onSuccess: () => Promise<void>;
  sessionToEdit?: AltSessionService.IAltSession | null;
  isLoading?: boolean;
}

export function FormAltSession({ onClose, onSuccess, sessionToEdit = null, isLoading = false }: IFormAltSession) {
  const props = useFormAltSession({ onClose, onSuccess, sessionToEdit });
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
          <S.FormTitle>{props.isEditMode ? "Editar sessão ALT" : "Cadastro de sessão ALT"}</S.FormTitle>
        </S.Header>

        <S.Sections>
          <S.Section>
            <S.SectionTitle>Dados da sessão</S.SectionTitle>
            <S.Grid>
            <S.Label htmlFor="session-type">
                Tipo da sessão
                <S.Select id="session-type" value={props.sessionType} onChange={(e: ChangeEvent<HTMLSelectElement>) => props.setSessionType(e.target.value)}>
                  <option value="">Selecione o tipo</option>
                  {props.sessionType.trim() &&
                    !props.sessionTypeOptions.some(
                      (item) => (item.tipo_atendimento ?? item.descricao ?? "").trim() === props.sessionType.trim()
                    ) && (
                      <option value={props.sessionType}>{props.sessionType}</option>
                    )}
                  {props.sessionTypeOptions.map((item) => {
                    const label = (item.tipo_atendimento ?? item.descricao ?? "").trim();
                    return (
                      <option key={item.id} value={label}>
                        {label}
                      </option>
                    );
                  })}
                </S.Select>
              </S.Label>
              <S.Label htmlFor="session-status">
                Status
                <StatusSelect
                  id="session-status"
                  value={props.status}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => props.setStatus(e.target.value)}
                  $status={props.status}
                >
                  <option value="aberta">aberta</option>
                  <option value="em_andamento">em andamento</option>
                  <option value="finalizada">finalizada</option>
                  <option value="cancelada">cancelada</option>
                </StatusSelect>
              </S.Label>
              <S.Label htmlFor="session-patient-id">
                Paciente
                <SearchWrapper>
                  <S.Input
                    id="session-patient-id"
                    value={props.patientName}
                    onChange={handleInputChange(props.setPatientName)}
                    placeholder={props.isLoadingOptions ? "Carregando pacientes..." : "Digite para filtrar"}
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
                Profissional
                <SearchWrapper>
                  <S.Input
                    id="session-professional-id"
                    value={props.professionalName}
                    onChange={handleInputChange(props.setProfessionalName)}
                    placeholder={props.isLoadingOptions ? "Carregando profissionais..." : "Digite para filtrar"}
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
                Data/Hora início
                <S.Input
                  id="session-start"
                  type="datetime-local"
                  value={props.startDate}
                  onChange={handleInputChange(props.setStartDate)}
                />
              </S.Label>

              <S.Label htmlFor="session-end">
                Data/Hora final
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
            Voltar
          </S.Button>
          <S.Button type="button" $variant="primary" onClick={props.handleSubmit} disabled={props.disabledBtn}>
            {props.isEditMode ? "Atualizar" : "Confirmar"}
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
          <DialogTitle>Tipo da sessão</DialogTitle>
          <DialogDescription>
            Este profissional não possui a especialização selecionada no tipo da sessão, deseja realmente continuar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={() => props.setShowProfessionMismatchDialog(false)}>
            Não
          </Button>
          <Button type="button" onClick={() => void props.handleMismatchDialogYes()}>
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}
