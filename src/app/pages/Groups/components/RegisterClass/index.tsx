import * as S from "./styles";
import { useRegisterClass } from "./hook";

export function RegisterClass() {
  const hook = useRegisterClass();

  return (
    <S.Container>
      <S.Form>
        <S.FormGrid>
          <S.Row>
            <S.FormField>
              <S.Label htmlFor="class_name">Grupo</S.Label>
              <S.Input 
                type="text" 
                id="class_name"
                value={hook.description}
                required
                placeholder="Nome do grupo"
                onChange={(e: any) => hook.setDescription(e.target.value)}
                tabIndex={0}
              />
            </S.FormField>

            <S.FormField>
              <S.Label htmlFor="code">Código</S.Label>
              <div className="flex gap-4 items-center">
                <S.Input 
                  type="text" 
                  id="code"
                  value={hook.code}
                  required
                  placeholder="Código"
                  disabled={true}
                  tabIndex={0}
                />
                <S.ButtonCode
                  onClick={hook.handleGenerateCode}
                  disabled={hook.disabledBtnCode}
                >Gerar código</S.ButtonCode>
              </div>
            </S.FormField>
          </S.Row>
        </S.FormGrid>

        <S.ButtonContainer>
          <S.ConfirmButton
            color="green"
            onClick={hook.handleSubmit}
            tabIndex={0}
            disabled={hook.disabledBtn}
          >Salvar</S.ConfirmButton>
        </S.ButtonContainer>
      </S.Form>
    </S.Container>
  )
} 