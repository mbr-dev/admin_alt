import { useStorage } from "@/data/hooks";
import { Indicators } from "@/data/services";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SelectClass({ ...props }) {
  const { getAllClassByUnit } = Indicators();
  const { getData } = useStorage();

  const [datas, setDatas] = useState<any[]>([]);

  const fetchData = async () => {
    const response = await getAllClassByUnit(Number(getData("id_unidade")));

    if (response) {
      setDatas(
        response.map((item: any) => ({
          id: item.id,
          label: item.descricao,
          value: item.id,
        }))
      );
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <Select onValueChange={(value) => props.setSelectedClass(value)}>
      <SelectTrigger className="w-[280px] landscape:w-[300px] md:w[300px] border-2 border-mbr-red-20 rounded-2xl text-base font-semibold h-[50px]" tabIndex={0}>
        <SelectValue placeholder="Selecione um grupo" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {datas.map((data) => {
            return (
              <SelectItem key={data.id} value={JSON.stringify(data.value)}>
                {data.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}