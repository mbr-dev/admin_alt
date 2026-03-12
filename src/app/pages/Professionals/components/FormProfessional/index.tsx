import * as S from "./styles";
import { useFormProfessional } from "./hook";
import { ChangeEvent } from "react";
import { ProfessionalsService } from "@/data/models";

interface IFormProfessional {
  professionalToEdit: ProfessionalsService.IProfessionalByUserId | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  isLoading?: boolean;
}

export function FormProfessional({ professionalToEdit, onClose, onSuccess, isLoading = false }: IFormProfessional) {
  const props = useFormProfessional({ professionalToEdit, onClose, onSuccess });

  const handleInputChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const handleTextAreaChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    setter(e.target.value);
  };

  const handleSelectChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLSelectElement>) => {
    setter(e.target.value);
  };

  if (isLoading || props.isLoading) {
    return (
      <S.Container>
        <S.SkeletonCard>
          <S.SkeletonLine $size="md" />
          <S.SkeletonLine $size="sm" />
          <S.SkeletonGrid>
            <S.SkeletonInput />
            <S.SkeletonInput />
            <S.SkeletonInput />
          </S.SkeletonGrid>
          <S.SkeletonLine $size="sm" />
          <S.SkeletonGrid>
            <S.SkeletonInput />
            <S.SkeletonInput />
            <S.SkeletonInput />
          </S.SkeletonGrid>
          <S.SkeletonLine $size="sm" />
          <S.SkeletonGrid>
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
            <S.SectionTitle>{props.t("section_user_info")}</S.SectionTitle>
            <S.Grid>
              <S.Label htmlFor="professional-user">
                {props.t("field_user")}
                <S.Input
                  id="professional-user"
                  value={props.usuario}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    props.setUsuario(e.target.value);
                    props.setIsUserAvailable(null);
                  }}
                  onBlur={props.handleBlurUser}
                />
              </S.Label>

              <S.Label htmlFor="professional-password">
                {props.t("field_password")}
                <S.Input id="professional-password" type="password" value={props.senha} onChange={handleInputChange(props.setSenha)} />
              </S.Label>

              <S.Label htmlFor="professional-unit">
                {props.t("field_unit")}
                <S.Select
                  id="professional-unit"
                  value={props.selectedUnitId}
                  onChange={handleSelectChange(props.setSelectedUnitId)}
                >
                  <option value="">{props.t("field_unit_placeholder")}</option>
                  {props.units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.descricao}
                    </option>
                  ))}
                </S.Select>
              </S.Label>
            </S.Grid>
          </S.Section>

          <S.Section>
            <S.SectionTitle>{props.t("section_personal_info")}</S.SectionTitle>
            <S.Grid>
              <S.Label htmlFor="professional-name">
                {props.t("field_name")}
                <S.Input id="professional-name" value={props.nome} onChange={handleInputChange(props.setNome)} />
              </S.Label>

              <S.Label htmlFor="professional-cpf-cnpj">
                {props.t("field_cpf_cnpj")}
                <S.Input id="professional-cpf-cnpj" value={props.cpfCnpj} onChange={handleInputChange(props.setCpfCnpj)} />
              </S.Label>

              <S.Label htmlFor="professional-email">
                {props.t("field_email")}
                <S.Input id="professional-email" type="email" value={props.email} onChange={handleInputChange(props.setEmail)} />
              </S.Label>
            </S.Grid>
          </S.Section>

          <S.Section>
            <S.SectionTitle>{props.t("section_professional_info")}</S.SectionTitle>
            <S.Grid>
              <S.FullWidth>
                <S.Label htmlFor="professional-speciality">
                  {props.t("field_speciality")}
                  <S.TextArea
                    id="professional-speciality"
                    rows={3}
                    value={props.especialidade}
                    onChange={handleTextAreaChange(props.setEspecialidade)}
                  />
                </S.Label>
              </S.FullWidth>

              <S.FullWidth>
                <S.Label htmlFor="professional-register">
                  {props.t("field_professional_register")}
                  <S.TextArea
                    id="professional-register"
                    rows={3}
                    value={props.registroProfissional}
                    onChange={handleTextAreaChange(props.setRegistroProfissional)}
                  />
                </S.Label>
              </S.FullWidth>
            </S.Grid>
          </S.Section>
        </S.Sections>

        <S.Footer>
          <S.Button type="button" $variant="secondary" onClick={onClose}>
            {props.t("button_cancel")}
          </S.Button>
          <S.Button type="button" $variant="primary" onClick={props.handleSubmit} disabled={props.disabledBtn}>
            {props.isEditMode ? props.t("button_update") : props.t("button_save")}
          </S.Button>
        </S.Footer>
      </S.FormCard>
    </S.Container>
  );
}
