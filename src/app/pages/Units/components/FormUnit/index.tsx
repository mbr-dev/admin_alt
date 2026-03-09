import * as S from "./styles";
import { UnitService } from "@/data/models";
import { useFormUnit } from "./hook";
import { ChangeEvent } from "react";

interface IFormUnit {
  unitToEdit: UnitService.IUnitById | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  isLoading?: boolean;
}

export function FormUnit({ unitToEdit, onClose, onSuccess, isLoading = false }: IFormUnit) {
  const props = useFormUnit({ unitToEdit, onClose, onSuccess });

  const handleInputChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const handleTextAreaChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLTextAreaElement>) => {
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
          </S.SkeletonGrid>
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
              <S.Label htmlFor="unit-descricao">
                {props.t("field_descricao")}
                <S.Input id="unit-descricao" value={props.descricao} onChange={handleInputChange(props.setDescricao)} />
              </S.Label>

              <S.Label htmlFor="unit-cnpj">
                {props.t("field_cnpj")}
                <S.Input id="unit-cnpj" value={props.cnpj} onChange={handleInputChange(props.setCnpj)} />
              </S.Label>

              <S.Label htmlFor="unit-email">
                {props.t("field_email")}
                <S.Input id="unit-email" type="email" value={props.email} onChange={handleInputChange(props.setEmail)} />
              </S.Label>

              <S.Label htmlFor="unit-telefone">
                {props.t("field_telefone")}
                <S.Input id="unit-telefone" value={props.telefone} onChange={handleInputChange(props.setTelefone)} />
              </S.Label>
            </S.Grid>
          </S.Section>

          <S.Section>
            <S.SectionTitle>{props.t("section_address")}</S.SectionTitle>
            <S.Grid>
              <S.Label htmlFor="unit-cep">
                {props.t("field_cep")}
                <S.Input id="unit-cep" value={props.cep} onChange={handleInputChange(props.setCep)} onBlur={props.handleCepBlur} />
              </S.Label>

              <S.Label htmlFor="unit-logradouro">
                {props.t("field_logradouro")}
                <S.Input id="unit-logradouro" value={props.logradouro} onChange={handleInputChange(props.setLogradouro)} />
              </S.Label>

              <S.Label htmlFor="unit-numero">
                {props.t("field_numero")}
                <S.Input id="unit-numero" value={props.numero} onChange={handleInputChange(props.setNumero)} />
              </S.Label>

              <S.Label htmlFor="unit-bairro">
                {props.t("field_bairro")}
                <S.Input id="unit-bairro" value={props.bairro} onChange={handleInputChange(props.setBairro)} />
              </S.Label>

              <S.Label htmlFor="unit-regiao">
                {props.t("field_regiao")}
                <S.Input id="unit-regiao" value={props.regiao} onChange={handleInputChange(props.setRegiao)} />
              </S.Label>

              <S.Label htmlFor="unit-cidade">
                {props.t("field_cidade")}
                <S.Input id="unit-cidade" value={props.cidade} onChange={handleInputChange(props.setCidade)} />
              </S.Label>

              <S.Label htmlFor="unit-estado">
                {props.t("field_estado")}
                <S.Input id="unit-estado" value={props.estado} onChange={handleInputChange(props.setEstado)} />
              </S.Label>

              <S.FullWidth>
                <S.Label htmlFor="unit-observacao">
                  {props.t("field_observacao")}
                  <S.TextArea id="unit-observacao" value={props.observacao} onChange={handleTextAreaChange(props.setObservacao)} />
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
