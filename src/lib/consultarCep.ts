export interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export async function consultarCep(cep: string): Promise<CepResponse | null> {
  try {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      throw new Error("CEP inválido");
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

    if (!response.ok) {
      throw new Error("Erro ao consultar CEP");
    }

    const data = await response.json();

    if (data.erro) {
      return null;
    }

    return data as CepResponse;
  } catch (error) {
    console.error("Erro na consulta de CEP:", error);
    return null;
  }
}
