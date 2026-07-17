import { useCallback } from "react";
import { useApi, useToast } from "@/data/hooks";
import { ALTDevelopmentNetworkService } from "@/data/models";

export function ALTDevelopmentNetwork() {
  const { api, get_error } = useApi();
  const { toast } = useToast();

  const getStatisticNetwork = useCallback(
    async (
      params: ALTDevelopmentNetworkService.IALTDevelopmentNetworkQueryParams
    ): Promise<ALTDevelopmentNetworkService.IGetStatisticNetworkResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_rede", String(params.id_rede));
        searchParams.set("filter", String(params.filter));

        const { data } = await api.get(
          `altDevelopmentNetwork/getStatisticNetwork?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ALTDevelopmentNetworkService.IGetStatisticNetworkResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({
          title: "Rede de Desenvolvimento",
          description: errorMessage,
          variant: "destructive",
        });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getNumbersNetwork = useCallback(
    async (
      params: ALTDevelopmentNetworkService.IALTDevelopmentNetworkQueryParams
    ): Promise<ALTDevelopmentNetworkService.IGetNumbersNetworkResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_rede", String(params.id_rede));
        searchParams.set("filter", String(params.filter));

        const { data } = await api.get(
          `altDevelopmentNetwork/getNumbersNetwork?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ALTDevelopmentNetworkService.IGetNumbersNetworkResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({
          title: "Rede de Desenvolvimento",
          description: errorMessage,
          variant: "destructive",
        });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getSkillsDeveloped = useCallback(
    async (
      params: ALTDevelopmentNetworkService.IALTDevelopmentNetworkQueryParams
    ): Promise<ALTDevelopmentNetworkService.IGetSkillsDevelopedResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_rede", String(params.id_rede));
        searchParams.set("filter", String(params.filter));

        const { data } = await api.get(
          `altDevelopmentNetwork/getSkillsDeveloped?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ALTDevelopmentNetworkService.IGetSkillsDevelopedResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({
          title: "Rede de Desenvolvimento",
          description: errorMessage,
          variant: "destructive",
        });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getUnitCompare = useCallback(
    async (
      params: ALTDevelopmentNetworkService.IALTDevelopmentNetworkQueryParams
    ): Promise<ALTDevelopmentNetworkService.IGetUnitCompareResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_rede", String(params.id_rede));
        searchParams.set("filter", String(params.filter));

        const { data } = await api.get(
          `altDevelopmentNetwork/getUnitCompare?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ALTDevelopmentNetworkService.IGetUnitCompareResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({
          title: "Rede de Desenvolvimento",
          description: errorMessage,
          variant: "destructive",
        });
        return null;
      }
    },
    [api, get_error, toast]
  );

  return {
    getStatisticNetwork,
    getNumbersNetwork,
    getSkillsDeveloped,
    getUnitCompare,
  };
}
