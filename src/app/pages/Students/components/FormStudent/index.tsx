import * as S from "./styles";
import { useFormStudent } from "./hook";

export function FormStudent() {
  const props = useFormStudent();

  return (
    <S.Container>
      <S.Form>
        <S.Row>
          <S.Label htmlFor="name-user">
            Nome
            <S.Input 
              type="text" 
              id="name-user"
              placeholder="Nome"
              value={props.name}
              onChange={(e: any) => props.setName(e.target.value)}
              tabIndex={0}
            />
          </S.Label>

          <S.Label htmlFor="email-user">
            E-mail
            <S.Input 
              type="email"
              id="email-user"
              placeholder="E-mail"
              value={props.email}
              onChange={(e: any) => props.setEmail(e.target.value)}
              tabIndex={0}
            />
          </S.Label>
        </S.Row>

        <S.Row>
          <S.Label>
            Unidade
            <S.Input type="email" placeholder="Unidade"
              disabled value={props.unit} />
          </S.Label>

          <S.Label htmlFor="birthDate">
            Aniversário
            <S.Input 
              type="date" 
              id="birthDate"
              max={new Date().toISOString().split('T')[0]}
              value={props.birth ? props.birth.toISOString().split('T')[0] : ''} 
              onChange={(e: any) => {
                const selectedDate = e.target.value 
                  ? new Date(`${e.target.value}T00:00:00.000Z`)
                  : undefined;
                props.setBirth(selectedDate);
              }}
              name="birthDate"
            />
          </S.Label>
        </S.Row>

        <S.Label htmlFor="user">
          Usuário
          <S.Div>
            <S.Input 
              type="text" 
              id="user"
              placeholder="Usuário"
              value={props.user}
              onChange={(e: any) => props.generateUser(e.target.value)}
              tabIndex={0}
            />
            <S.ButtonUser onClick={props.verifyIfUserExists}>Verificar</S.ButtonUser>
          </S.Div>
        </S.Label>

        {/*
        <S.Label>
          {t("password")}
          <S.Input type="text" disabled value={props.password} />
        </S.Label>
        */}

        <S.Button onClick={props.handleSubmit} disabled={props.disabledBtn}>Confirmar</S.Button>
      </S.Form>
    </S.Container>
  )
} 