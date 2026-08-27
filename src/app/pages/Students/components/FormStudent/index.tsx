import * as S from "./styles";
import { useFormStudent } from "./hook";
import { getCidGroupIcon, getCidGroupSelectedCount } from "./helpers/cidGroup";
import { ChangeEvent, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { StudentService } from "@/data/models";
import { useTranslation } from "react-i18next";
import {
  translateCidById,
  translateCidCategoriaByTitulo,
  translateCidSubcategoriaByTitulo,
} from "@/lib/i18n/tables/lookup";

interface IFormStudentProps {
  studentToEdit?: StudentService.IStudent | null;
  onClose?: () => void;
  onSuccess?: () => Promise<void> | void;
}

export function FormStudent({ onClose, onSuccess, studentToEdit = null }: IFormStudentProps) {
  const { t, i18n } = useTranslation("students");
  const props = useFormStudent({ onClose, onSuccess, studentToEdit });
  const [expandedCidSections, setExpandedCidSections] = useState<Record<string, boolean>>({});
  const stylesWithCid = S as typeof S & {
    CidListContainer: typeof S.Container;
    CidEmpty: typeof S.FormTitle;
    CidSubcategory: typeof S.Container;
    CidList: typeof S.Container;
    CidItem: typeof S.Container;
    CidCheckLabel: typeof S.Label;
    CidSkeleton: typeof S.Container;
    CidSkeletonLine: typeof S.Container;
  };
  const CidListContainer = stylesWithCid.CidListContainer;
  const CidEmpty = stylesWithCid.CidEmpty;
  const CidSubcategory = stylesWithCid.CidSubcategory;
  const CidList = stylesWithCid.CidList;
  const CidItem = stylesWithCid.CidItem;
  const CidCheckLabel = stylesWithCid.CidCheckLabel;
  const CidSkeleton = stylesWithCid.CidSkeleton;
  const CidSkeletonLine = stylesWithCid.CidSkeletonLine;

  const handleInputChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const toggleCidSection = (sectionKey: string) => {
    setExpandedCidSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const currentStepData = props.formSteps[props.currentStep];

  const renderStudentStep = () => (
    <S.Section>
      <S.SectionTitle>{t("section_student")}</S.SectionTitle>
      <S.Grid>
        <S.Label htmlFor="student-name">
          {t("field_name")}
          <S.Input id="student-name" value={props.studentName} onChange={handleInputChange(props.setStudentName)} />
        </S.Label>

        <S.Label htmlFor="student-email">
          {t("field_email")}
          <S.Input id="student-email" type="email" value={props.studentEmail} onChange={handleInputChange(props.setStudentEmail)} />
        </S.Label>

        <S.Label htmlFor="student-birth">
          {t("field_birth")}
          <S.Input
            id="student-birth"
            type="date"
            max={new Date().toISOString().split("T")[0]}
            value={props.studentBirth}
            onChange={handleInputChange(props.setStudentBirth)}
          />
        </S.Label>

        <S.Label htmlFor="student-sex">
          {t("field_sex")}
          <S.Select
            id="student-sex"
            value={props.studentSex}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => props.setStudentSex(e.target.value)}
          >
            <option value="">{t("field_sex_placeholder")}</option>
            <option value="masculino">{t("sex_male")}</option>
            <option value="feminino">{t("sex_female")}</option>
            <option value="nao_binario">{t("sex_non_binary")}</option>
          </S.Select>
        </S.Label>
      </S.Grid>
    </S.Section>
  );

  const renderAccessStep = () => (
    <S.Section>
      <S.SectionTitle>{t("section_access")}</S.SectionTitle>
      <S.Grid>
        <S.Label htmlFor="student-user">
          {t("field_user")}
          <S.Input
            id="student-user"
            value={props.user}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.generateUser(e.target.value)}
            onBlur={props.verifyIfUserExists}
            disabled={!!studentToEdit}
          />
        </S.Label>

        <S.Label htmlFor="student-password">
          {t("field_password")}
          <S.Input id="student-password" type="password" value={props.password} onChange={handleInputChange(props.setPassword)} />
        </S.Label>

        <S.Label htmlFor="student-unit">
          {t("field_unit")}
          <S.Select
            id="student-unit"
            value={props.selectedUnitId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => props.setSelectedUnitId(e.target.value)}
            disabled={props.hasSingleUnit}
          >
            {props.units.length === 0 && <option value="">{t("empty_units")}</option>}
            {props.hasSingleUnit ? (
              <option value={props.units[0]?.id}>{props.units[0]?.descricao ?? t("empty_units")}</option>
            ) : (
              props.units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.descricao}
                </option>
              ))
            )}
          </S.Select>
        </S.Label>
      </S.Grid>
    </S.Section>
  );

  const renderCidStep = () => (
    <S.Section>
      <S.SectionTitle>{t("section_cid")}</S.SectionTitle>
      <CidListContainer>
        {props.isCidLoading ? (
          <>
            <CidSkeleton>
              <CidSkeletonLine />
              <CidSkeletonLine />
              <CidSkeletonLine />
            </CidSkeleton>
            <CidSkeleton>
              <CidSkeletonLine />
              <CidSkeletonLine />
              <CidSkeletonLine />
            </CidSkeleton>
          </>
        ) : (
          <>
            {props.cidGroups.length === 0 && <CidEmpty>{t("empty_cid")}</CidEmpty>}

            {props.cidGroups.map((group) => {
              const groupKey = `group-${group.titulo}`;
              const isGroupOpen = !!expandedCidSections[groupKey];
              const GroupIcon = getCidGroupIcon(group.titulo);
              const selectedCount = getCidGroupSelectedCount(group, props.selectedCidIds);
              const hasSelection = selectedCount > 0;
              const groupTitle = translateCidCategoriaByTitulo(
                group.titulo,
                i18n.language,
                group.titulo
              );

              return (
                <S.CidAccordion key={group.titulo}>
                  <S.CidAccordionToggle
                    type="button"
                    onClick={() => toggleCidSection(groupKey)}
                    aria-expanded={isGroupOpen}
                  >
                    <S.CidAccordionTitleWrap>
                      <S.CidGroupIcon aria-hidden>
                        <GroupIcon />
                      </S.CidGroupIcon>
                      <S.CidAccordionTitle>{groupTitle}</S.CidAccordionTitle>
                    </S.CidAccordionTitleWrap>

                    <S.CidAccordionMeta>
                      <S.CidSelectionCounter $hasSelection={hasSelection}>
                        {t(selectedCount === 1 ? "cid_selected_one" : "cid_selected_other", {
                          count: selectedCount,
                        })}
                      </S.CidSelectionCounter>
                      <S.CidAccordionIcon aria-hidden>
                        {isGroupOpen ? <FaChevronUp /> : <FaChevronDown />}
                      </S.CidAccordionIcon>
                    </S.CidAccordionMeta>
                  </S.CidAccordionToggle>

                  {isGroupOpen ? (
                    <S.CidAccordionPanel>
                      {group.subcategoria.map((subcategory) => {
                        const subcategoryKey = `sub-${group.titulo}-${subcategory.titulo || "default"}`;
                        const hasSubcategoryTitle = !!subcategory.titulo;
                        const isSubcategoryOpen = hasSubcategoryTitle ? !!expandedCidSections[subcategoryKey] : true;
                        const subcategoryTitle = translateCidSubcategoriaByTitulo(
                          subcategory.titulo,
                          i18n.language,
                          subcategory.titulo
                        );

                        const cidList = (
                          <CidList>
                            {subcategory.siglas.map((sigla) => (
                              <CidItem key={sigla.id}>
                                <CidCheckLabel>
                                  <input
                                    type="checkbox"
                                    checked={props.selectedCidIds.includes(sigla.id)}
                                    onChange={() => props.toggleCidSelection(sigla.id)}
                                  />
                                  <span>
                                    {sigla.sigla} -{" "}
                                    {translateCidById(sigla.id, i18n.language, sigla.descricao)}
                                  </span>
                                </CidCheckLabel>
                              </CidItem>
                            ))}
                          </CidList>
                        );

                        if (!hasSubcategoryTitle) {
                          return <CidSubcategory key={subcategoryKey}>{cidList}</CidSubcategory>;
                        }

                        return (
                          <S.CidSubAccordion key={subcategoryKey}>
                            <S.CidSubAccordionToggle
                              type="button"
                              onClick={() => toggleCidSection(subcategoryKey)}
                              aria-expanded={isSubcategoryOpen}
                            >
                              <span>{subcategoryTitle}</span>
                              <S.CidAccordionIcon aria-hidden>
                                {isSubcategoryOpen ? <FaChevronUp /> : <FaChevronDown />}
                              </S.CidAccordionIcon>
                            </S.CidSubAccordionToggle>

                            {isSubcategoryOpen ? <S.CidSubAccordionPanel>{cidList}</S.CidSubAccordionPanel> : null}
                          </S.CidSubAccordion>
                        );
                      })}
                    </S.CidAccordionPanel>
                  ) : null}
                </S.CidAccordion>
              );
            })}
          </>
        )}
      </CidListContainer>
    </S.Section>
  );

  const renderGuardianStep = () => (
    <S.Section>
      <S.SectionTitle>{t("section_guardian")}</S.SectionTitle>
      <S.Grid>
        <S.Label htmlFor="guardian-name">
          {t("field_name")}
          <S.Input id="guardian-name" value={props.guardianName} onChange={handleInputChange(props.setGuardianName)} />
        </S.Label>

        <S.Label htmlFor="guardian-email">
          {t("field_email")}
          <S.Input id="guardian-email" type="email" value={props.guardianEmail} onChange={handleInputChange(props.setGuardianEmail)} />
        </S.Label>

        <S.Label htmlFor="guardian-birth">
          {t("field_birth")}
          <S.Input
            id="guardian-birth"
            type="date"
            max={new Date().toISOString().split("T")[0]}
            value={props.guardianBirth}
            onChange={handleInputChange(props.setGuardianBirth)}
          />
        </S.Label>

        <S.Label htmlFor="guardian-cpf-cnpj">
          {t("field_cpf_cnpj")}
          <S.Input id="guardian-cpf-cnpj" value={props.guardianCpfCnpj} onChange={handleInputChange(props.setGuardianCpfCnpj)} />
        </S.Label>

        <S.Label htmlFor="guardian-kinship">
          {t("field_kinship")}
          <S.Input id="guardian-kinship" value={props.guardianKinship} onChange={handleInputChange(props.setGuardianKinship)} />
        </S.Label>
      </S.Grid>
    </S.Section>
  );

  const renderAddressStep = () => (
    <S.Section>
      <S.SectionTitle>{t("section_address")}</S.SectionTitle>
      <S.Grid>
        <S.Label htmlFor="address-cep">
          {t("field_cep")}
          <S.Input id="address-cep" value={props.addressCep} onChange={handleInputChange(props.setAddressCep)} onBlur={props.handleCepBlur} />
        </S.Label>

        <S.Label htmlFor="address-street">
          {t("field_street")}
          <S.Input id="address-street" value={props.addressStreet} onChange={handleInputChange(props.setAddressStreet)} />
        </S.Label>

        <S.Label htmlFor="address-number">
          {t("field_number")}
          <S.Input id="address-number" value={props.addressNumber} onChange={handleInputChange(props.setAddressNumber)} />
        </S.Label>

        <S.Label htmlFor="address-complement">
          {t("field_complement")}
          <S.Input id="address-complement" value={props.addressComplement} onChange={handleInputChange(props.setAddressComplement)} />
        </S.Label>

        <S.Label htmlFor="address-district">
          {t("field_district")}
          <S.Input id="address-district" value={props.addressDistrict} onChange={handleInputChange(props.setAddressDistrict)} />
        </S.Label>

        <S.Label htmlFor="address-region">
          {t("field_region")}
          <S.Input id="address-region" value={props.addressRegion} onChange={handleInputChange(props.setAddressRegion)} />
        </S.Label>

        <S.Label htmlFor="address-type">
          {t("field_type")}
          <S.Select
            id="address-type"
            value={props.addressType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => props.setAddressType(e.target.value)}
          >
            <option value="residencial">{t("type_residential")}</option>
            <option value="trabalho">{t("type_work")}</option>
            <option value="outro">{t("type_other")}</option>
          </S.Select>
        </S.Label>
      </S.Grid>
    </S.Section>
  );

  const renderContactStep = () => (
    <S.Section>
      <S.SectionTitle>{t("section_contact")}</S.SectionTitle>
      <S.Grid>
        <S.Label htmlFor="contact-name">
          {t("field_contact_name")}
          <S.Input id="contact-name" value={props.contactGuardianName} onChange={handleInputChange(props.setContactGuardianName)} />
        </S.Label>

        <S.Label htmlFor="contact-value">
          {t("field_contact")}
          <S.Input id="contact-value" value={props.contactValue} onChange={handleInputChange(props.setContactValue)} />
        </S.Label>

        <S.Label htmlFor="contact-type">
          {t("field_type")}
          <S.Select
            id="contact-type"
            value={props.contactType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => props.setContactType(e.target.value)}
          >
            <option value="residencial">{t("type_residential")}</option>
            <option value="trabalho">{t("type_work")}</option>
            <option value="outro">{t("type_other")}</option>
          </S.Select>
        </S.Label>
      </S.Grid>
    </S.Section>
  );

  const renderCurrentStep = () => {
    const stepKey = currentStepData?.key;

    if (stepKey === "student") return renderStudentStep();
    if (stepKey === "access") return renderAccessStep();
    if (stepKey === "cid") return renderCidStep();
    if (stepKey === "guardian") return renderGuardianStep();
    if (stepKey === "address") return renderAddressStep();
    if (stepKey === "contact") return renderContactStep();

    return null;
  };

  if (props.isFormLoading) {
    return (
      <S.Container>
        <S.FormSkeletonCard>
          <S.FormSkeletonLine />
          <S.FormSkeletonLine />
          <S.FormSkeletonGrid>
            <S.FormSkeletonLine />
            <S.FormSkeletonLine />
            <S.FormSkeletonLine />
            <S.FormSkeletonLine />
          </S.FormSkeletonGrid>
          <S.FormSkeletonGrid>
            <S.FormSkeletonLine />
            <S.FormSkeletonLine />
            <S.FormSkeletonLine />
            <S.FormSkeletonLine />
          </S.FormSkeletonGrid>
        </S.FormSkeletonCard>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.FormCard>
        <S.Header>
          <S.FormTitle>{studentToEdit ? t("form_edit_title") : t("form_create_title")}</S.FormTitle>
        </S.Header>

        <S.StepProgress>
          <S.StepProgressText>
            {t("step_progress", {
              current: props.currentStep + 1,
              total: props.totalSteps,
              label: currentStepData?.label,
            })}
          </S.StepProgressText>

          <S.StepsList aria-label={t("step_progress_aria")}>
            {props.formSteps.map((step, index) => {
              const isActive = index === props.currentStep;
              const isCompleted = index < props.currentStep;

              return (
                <S.StepItem key={step.key} $active={isActive} $completed={isCompleted}>
                  <S.StepCircle $active={isActive} $completed={isCompleted} aria-current={isActive ? "step" : undefined}>
                    {index + 1}
                  </S.StepCircle>
                  <S.StepLabel>{step.label}</S.StepLabel>
                  {index < props.formSteps.length - 1 && <S.StepConnector $completed={isCompleted} />}
                </S.StepItem>
              );
            })}
          </S.StepsList>
        </S.StepProgress>

        <S.Sections>{renderCurrentStep()}</S.Sections>

        <S.Footer>
          {onClose ? (
            <S.Button type="button" $variant="secondary" onClick={onClose}>
              {t("button_cancel")}
            </S.Button>
          ) : null}

          <S.FooterActions>
            {!props.isFirstStep ? (
              <S.Button type="button" $variant="secondary" onClick={props.goToPreviousStep}>
                {t("button_previous")}
              </S.Button>
            ) : null}

            {props.isLastStep ? (
              <S.Button type="button" $variant="primary" onClick={props.handleSubmit} disabled={props.disabledBtn}>
                {t("button_confirm")}
              </S.Button>
            ) : (
              <S.Button type="button" $variant="primary" onClick={props.goToNextStep}>
                {t("button_next")}
              </S.Button>
            )}
          </S.FooterActions>
        </S.Footer>
      </S.FormCard>
    </S.Container>
  );
}
