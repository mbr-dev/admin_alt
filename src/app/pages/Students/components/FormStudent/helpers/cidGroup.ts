import { CidService } from "@/data/models";
import {
  LuAccessibility,
  LuBed,
  LuBrain,
  LuBrainCircuit,
  LuBrainCog,
  LuClipboardList,
  LuEye,
  LuMessagesSquare,
  LuSmile,
  LuUtensilsCrossed,
} from "react-icons/lu";
import { IconType } from "react-icons";

function normalizeCidTitle(title: string) {
  return title
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .trim()
    .toLowerCase();
}

const CID_GROUP_ICON_MATCHERS: { match: (title: string) => boolean; Icon: IconType }[] = [
  { match: (title) => title.includes("neurodesenvolvimento"), Icon: LuBrain },
  { match: (title) => title.includes("deficiência intelectual") || title.includes("deficiencia intelectual"), Icon: LuBrainCircuit },
  { match: (title) => title.includes("emocionais e comportamentais"), Icon: LuSmile },
  { match: (title) => title.includes("deficiências sensoriais") || title.includes("deficiencias sensoriais"), Icon: LuEye },
  { match: (title) => title.includes("condições neurológicas") || title.includes("condicoes neurologicas"), Icon: LuBrainCog },
  { match: (title) => title.includes("comunicação e fluência") || title.includes("comunicacao e fluencia"), Icon: LuMessagesSquare },
  { match: (title) => title.includes("comportamento alimentar"), Icon: LuUtensilsCrossed },
  { match: (title) => title.includes("transtornos do sono"), Icon: LuBed },
  { match: (title) => title.includes("condições motoras") || title.includes("condicoes motoras"), Icon: LuAccessibility },
  { match: (title) => title.includes("outras condições") || title.includes("outras condicoes"), Icon: LuClipboardList },
];

export function getCidGroupIcon(title: string): IconType {
  const normalizedTitle = normalizeCidTitle(title);
  const matcher = CID_GROUP_ICON_MATCHERS.find(({ match }) => match(normalizedTitle));
  return matcher?.Icon ?? LuClipboardList;
}

export function getCidGroupSelectedCount(group: CidService.ICidGrupo, selectedCidIds: number[]) {
  const groupIds = group.subcategoria.flatMap((subcategory) => subcategory.siglas.map((sigla) => sigla.id));
  return groupIds.filter((id) => selectedCidIds.includes(id)).length;
}
