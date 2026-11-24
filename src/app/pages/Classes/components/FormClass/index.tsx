import * as S from "./styles";
import { ClassService } from "@/data/models";
import { useFormClass } from "./hook";
import { ChangeEvent } from "react";

interface IFormClass {
  classToEdit: ClassService.IClassService | null;
  unitId: number;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  isLoading?: boolean;
}

export function FormClass({ classToEdit, unitId, onClose, onSuccess, isLoading = false }: IFormClass) {
  const props = useFormClass({ classToEdit, unitId, onClose, onSuccess });

  const handleInputChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const handleSelectChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLSelectElement>) => {
    setter(e.target.value);
  };

  if (isLoading) {
    return (
      <S.Container>
        <S.SkeletonCard>
          <S.SkeletonLine $size="md" />
          <S.SkeletonLine $size="sm" />
          <S.SkeletonGrid>
            <S.SkeletonInput />
            <S.SkeletonInput />
            <S.SkeletonInput />
            <S.SkeletonInput />
            <S.SkeletonInput />
            <S.SkeletonInput />
          </S.SkeletonGrid>
        </S.SkeletonCard>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.FormCard>
        <S.Header>
          <S.FormTitle>{props.isEditMode ? props.t("form_edit_title") : props.t("form_create_title")}</S.FormTitle>
        </S.Header>

        <S.Sections>
          <S.Section>
            <S.SectionTitle>{props.t("section_main_info")}</S.SectionTitle>
            <S.Grid>
              <S.FullWidth>
                <S.Label htmlFor="class-name">
                  {props.t("field_name")}
                  <S.Input id="class-name" value={props.descricao} onChange={handleInputChange(props.setDescricao)} />
                </S.Label>
              </S.FullWidth>

              <S.Label htmlFor="class-codigo">
                {props.t("field_codigo")}
                <S.CodeRow>
                  <S.CodeInput id="class-codigo" value={props.codigo} readOnly />
                  <S.GenerateButton
                    type="button"
                    onClick={() => void props.handleGenerateCode()}
                    disabled={props.disabledBtnCode}
                    aria-label={props.t("button_generate_code")}
                  >
                    {props.disabledBtnCode ? props.t("button_generating_code") : props.t("button_generate_code")}
                  </S.GenerateButton>
                </S.CodeRow>
              </S.Label>

              <S.Label htmlFor="class-type">
                {props.t("field_type")}
                <S.Select id="class-type" value={props.tipoTurma} onChange={handleSelectChange(props.setTipoTurma)}>
                  <option value="">{props.t("field_type_placeholder")}</option>
                  {props.classTypes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </S.Select>
              </S.Label>

              <S.Label htmlFor="class-cycle">
                {props.t("field_cycle")}
                <S.Select id="class-cycle" value={props.tipoCiclo} onChange={handleSelectChange(props.setTipoCiclo)}>
                  {props.classCycles.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </S.Select>
              </S.Label>

              <S.Label htmlFor="class-school-year">
                {props.t("field_school_year")}
                <S.Input
                  id="class-school-year"
                  type="number"
                  min={2000}
                  value={props.anoLetivo}
                  onChange={handleInputChange(props.setAnoLetivo)}
                />
              </S.Label>

              <S.Label htmlFor="class-year">
                {props.t("field_class_year")}
                <S.Input
                  id="class-year"
                  type="number"
                  min={1}
                  value={props.numSerie}
                  onChange={handleInputChange(props.setNumSerie)}
                />
              </S.Label>

              <S.Label htmlFor="class-start-date">
                {props.t("field_start_date")}
                <S.Input
                  id="class-start-date"
                  type="date"
                  value={props.dataInicio}
                  onChange={handleInputChange(props.setDataInicio)}
                />
              </S.Label>

              <S.Label htmlFor="class-end-date">
                {props.t("field_end_date")}
                <S.Input
                  id="class-end-date"
                  type="date"
                  value={props.dataFim}
                  onChange={handleInputChange(props.setDataFim)}
                />
              </S.Label>

              <S.Label htmlFor="class-status">
                {props.t("field_status")}
                <S.Select id="class-status" value={props.status} onChange={handleSelectChange(props.setStatus)}>
                  <option value="1">{props.t("status_active")}</option>
                  <option value="0">{props.t("status_inactive")}</option>
                </S.Select>
              </S.Label>
            </S.Grid>
          </S.Section>
        </S.Sections>

        <S.Footer>
          <S.Button type="button" $variant="secondary" onClick={onClose}>
            {props.t("button_cancel")}
          </S.Button>
          <S.Button type="button" $variant="primary" onClick={props.handleSubmit} disabled={props.disabledBtn || props.disabledBtnCode}>
            {props.isEditMode ? props.t("button_update") : props.t("button_save")}
          </S.Button>
        </S.Footer>
      </S.FormCard>
    </S.Container>
  );
}
