import tw from "tailwind-styled-components";
import { Table } from "@/components/ui";

export const Wrapper = tw.div`
w-full
overflow-auto
rounded-2xl
border
border-mbr-gray-30
bg-white
`;

export const Head = tw(Table.TableHead)<{ $isLast?: boolean }>`
text-mbr-blue-10
font-bold
text-sm
border-b-2
${(props) => (props.$isLast ? "border-r-transparent" : "border-r-2")}

md:text-base

landscape:lg:text-base
`;

export const Cell = tw(Table.TableCell)<{ $isLast?: boolean }>`
text-black
text-sm
font-medium
border-b-2
${(props) => (props.$isLast ? "border-r-transparent" : "border-r-2")}

md:text-base

landscape:lg:text-base
`;

export const EmptyCell = tw(Table.TableCell)`
text-center
text-mbr-gray-50
text-sm
font-medium
border-b-2
py-8
`;
