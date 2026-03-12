import * as S from "./styles";
import { useFormStudent } from "./hook";
import { ChangeEvent } from "react";
import { StudentService } from "@/data/models";

interface IFormStudentProps {
  studentToEdit?: StudentService.IStudent | null;
  onClose?: () => void;
  onSuccess?: () => Promise<void> | void;
}

export function FormStudent({ onClose, onSuccess, studentToEdit = null }: IFormStudentProps) {
  const props = useFormStudent({ onClose, onSuccess, studentToEdit });
  const stylesWithCid = S as typeof S & {
    CidContainer: typeof S.Container;
    CidEmpty: typeof S.FormTitle;
    CidGroup: typeof S.Container;
    CidGroupTitle: typeof S.FormTitle;
    CidSubcategory: typeof S.Container;
    CidSubTitle: typeof S.FormTitle;
    CidList: typeof S.Container;
    CidItem: typeof S.Container;
    CidCheckLabel: typeof S.Label;
    InfoButton: typeof S.Button;
    InfoTooltipWrap: typeof S.Container;
    InfoTooltipText: typeof S.FormTitle;
    CidSkeleton: typeof S.Container;
    CidSkeletonLine: typeof S.Container;
  };
  const CidContainer = stylesWithCid.CidContainer;
  const CidEmpty = stylesWithCid.CidEmpty;
  const CidGroup = stylesWithCid.CidGroup;
  const CidGroupTitle = stylesWithCid.CidGroupTitle;
  const CidSubcategory = stylesWithCid.CidSubcategory;
  const CidSubTitle = stylesWithCid.CidSubTitle;
  const CidList = stylesWithCid.CidList;
  const CidItem = stylesWithCid.CidItem;
  const CidCheckLabel = stylesWithCid.CidCheckLabel;
  const CidSkeleton = stylesWithCid.CidSkeleton;
  const CidSkeletonLine = stylesWithCid.CidSkeletonLine;

  const handleInputChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
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
          <S.FormTitle>Cadastro de aluno</S.FormTitle>
        </S.Header>

          <S.Section>
            <S.SectionTitle>Dados do aluno</S.SectionTitle>
            <S.Grid>
              <S.Label htmlFor="student-name">
                Nome
                <S.Input id="student-name" value={props.studentName} onChange={handleInputChange(props.setStudentName)} />
              </S.Label>

              <S.Label htmlFor="student-email">
                E-mail
                <S.Input id="student-email" type="email" value={props.studentEmail} onChange={handleInputChange(props.setStudentEmail)} />
              </S.Label>

              <S.Label htmlFor="student-birth">
                Data de nascimento
                <S.Input
                  id="student-birth"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  value={props.studentBirth}
                  onChange={handleInputChange(props.setStudentBirth)}
                />
              </S.Label>

              <S.Label htmlFor="student-sex">
                Sexo
                <S.Select
                  id="student-sex"
                  value={props.studentSex}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => props.setStudentSex(e.target.value)}
                >
                  <option value="">Selecione o sexo</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="nao_binario">Não binário</option>
                </S.Select>
              </S.Label>
            </S.Grid>
          </S.Section>
      
          <S.Sections>
          <S.Section>
            <S.SectionTitle>Acesso</S.SectionTitle>
            <S.Grid>
              <S.Label htmlFor="student-user">
                Usuário
                <S.Input
                  id="student-user"
                  value={props.user}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => props.generateUser(e.target.value)}
                  onBlur={props.verifyIfUserExists}
                  disabled={!!studentToEdit}
                />
              </S.Label>

              <S.Label htmlFor="student-password">
                Senha
                <S.Input id="student-password" type="password" value={props.password} onChange={handleInputChange(props.setPassword)} />
              </S.Label>

              <S.Label htmlFor="student-unit">
                Unidade
                <S.Select
                  id="student-unit"
                  value={props.selectedUnitId}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => props.setSelectedUnitId(e.target.value)}
                  disabled={props.hasSingleUnit}
                >
                  {props.units.length === 0 && <option value="">Nenhuma unidade encontrada</option>}
                  {props.hasSingleUnit ? (
                    <option value={props.units[0]?.id}>{props.units[0]?.descricao ?? "Nenhuma unidade encontrada"}</option>
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
          <S.Section>
            <S.SectionTitle>Diagnóstico e Classificação CID</S.SectionTitle>
            <CidContainer>
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
                  {props.cidGroups.length === 0 && <CidEmpty>Nenhum CID encontrado.</CidEmpty>}

                  {props.cidGroups.map((group) => (
                    <CidGroup key={group.titulo}>
                      <CidGroupTitle>{group.titulo}</CidGroupTitle>

                      {group.subcategoria.map((subcategory) => (
                        <CidSubcategory key={`${group.titulo}-${subcategory.titulo}`}>
                          {subcategory.titulo && <CidSubTitle>{subcategory.titulo}</CidSubTitle>}

                          <CidList>
                            {subcategory.siglas.map((sigla) => (
                              <CidItem key={sigla.id}>
                                <CidCheckLabel>
                                  <input
                                    type="checkbox"
                                    checked={props.selectedCidIds.includes(sigla.id)}
                                    onChange={() => props.toggleCidSelection(sigla.id)}
                                  />
                                  <span>{sigla.sigla} - {sigla.descricao}</span>
                                </CidCheckLabel>
                              </CidItem>
                            ))}
                          </CidList>
                        </CidSubcategory>
                      ))}
                    </CidGroup>
                  ))}
                </>
              )}
            </CidContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Dados do responsável</S.SectionTitle>
            <S.Grid>
              <S.Label htmlFor="guardian-name">
                Nome
                <S.Input id="guardian-name" value={props.guardianName} onChange={handleInputChange(props.setGuardianName)} />
              </S.Label>

              <S.Label htmlFor="guardian-email">
                E-mail
                <S.Input id="guardian-email" type="email" value={props.guardianEmail} onChange={handleInputChange(props.setGuardianEmail)} />
              </S.Label>

              <S.Label htmlFor="guardian-birth">
                Data de nascimento
                <S.Input
                  id="guardian-birth"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  value={props.guardianBirth}
                  onChange={handleInputChange(props.setGuardianBirth)}
                />
              </S.Label>

              <S.Label htmlFor="guardian-cpf-cnpj">
                CPF/CNPJ
                <S.Input id="guardian-cpf-cnpj" value={props.guardianCpfCnpj} onChange={handleInputChange(props.setGuardianCpfCnpj)} />
              </S.Label>

              <S.Label htmlFor="guardian-kinship">
                Parentesco
                <S.Input id="guardian-kinship" value={props.guardianKinship} onChange={handleInputChange(props.setGuardianKinship)} />
              </S.Label>
            </S.Grid>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Endereço do responsável</S.SectionTitle>
            <S.Grid>
              <S.Label htmlFor="address-cep">
                CEP
                <S.Input id="address-cep" value={props.addressCep} onChange={handleInputChange(props.setAddressCep)} onBlur={props.handleCepBlur} />
              </S.Label>

              <S.Label htmlFor="address-street">
                Logradouro
                <S.Input id="address-street" value={props.addressStreet} onChange={handleInputChange(props.setAddressStreet)} />
              </S.Label>

              <S.Label htmlFor="address-number">
                Número
                <S.Input id="address-number" value={props.addressNumber} onChange={handleInputChange(props.setAddressNumber)} />
              </S.Label>

              <S.Label htmlFor="address-complement">
                Complemento
                <S.Input id="address-complement" value={props.addressComplement} onChange={handleInputChange(props.setAddressComplement)} />
              </S.Label>

              <S.Label htmlFor="address-district">
                Bairro
                <S.Input id="address-district" value={props.addressDistrict} onChange={handleInputChange(props.setAddressDistrict)} />
              </S.Label>

              <S.Label htmlFor="address-region">
                Região
                <S.Input id="address-region" value={props.addressRegion} onChange={handleInputChange(props.setAddressRegion)} />
              </S.Label>

              <S.Label htmlFor="address-type">
                Tipo
                <S.Select
                  id="address-type"
                  value={props.addressType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => props.setAddressType(e.target.value)}
                >
                  <option value="residencial">Residencial</option>
                  <option value="trabalho">Trabalho</option>
                  <option value="outro">Outro</option>
                </S.Select>
              </S.Label>
            </S.Grid>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Contato do responsável</S.SectionTitle>
            <S.Grid>
              <S.Label htmlFor="contact-name">
                Nome do responsável
                <S.Input id="contact-name" value={props.contactGuardianName} onChange={handleInputChange(props.setContactGuardianName)} />
              </S.Label>

              <S.Label htmlFor="contact-value">
                Contato
                <S.Input id="contact-value" value={props.contactValue} onChange={handleInputChange(props.setContactValue)} />
              </S.Label>

              <S.Label htmlFor="contact-type">
                Tipo
                <S.Select
                  id="contact-type"
                  value={props.contactType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => props.setContactType(e.target.value)}
                >
                  <option value="residencial">Residencial</option>
                  <option value="trabalho">Trabalho</option>
                  <option value="outro">Outro</option>
                </S.Select>
              </S.Label>
            </S.Grid>
          </S.Section>
        </S.Sections>

        <S.Footer>
          {onClose && (
            <S.Button type="button" $variant="secondary" onClick={onClose}>
              Voltar
            </S.Button>
          )}
          <S.Button type="button" $variant="primary" onClick={props.handleSubmit} disabled={props.disabledBtn}>
            Confirmar
          </S.Button>
        </S.Footer>
      </S.FormCard>
    </S.Container>
  )
} 