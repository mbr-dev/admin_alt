import tw from "tailwind-styled-components";
import { Table } from "@/components/ui";

export const Container = tw.div`
w-full
flex
flex-col
items-center
justify-center
gap-2
py-2
px-4
z-50
rounded-xl
shadow-xl
bg-white

[&>h2]:text-lg
[&>h2]:font-bold

md:gap-4
md:[&>h2]:text-2xl
`;

export const Main = tw.div`
w-full
flex
items-center
justify-center
overflow-x-auto
`;

export const Head = tw(Table.TableHead)`
text-sm
font-bold
text-black
text-center
whitespace-nowrap

md:text-base
`;

export const Cell = tw(Table.TableCell)`
text-sm
font-semibold
text-mbr-gray-30
text-center
whitespace-nowrap

md:text-base
`;

export const MediaRow = tw(Table.TableRow)`
bg-[#f7789f]
hover:bg-[#f7789f]
`;

export const MediaCell = tw(Table.TableCell)`
text-sm
font-bold
text-white
text-center
whitespace-nowrap

md:text-base
`;

export const Status = tw.p<{ $status: string }>`
w-[100px]
h-[24px]
mx-auto
flex
items-center
justify-center
text-sm
font-semibold
text-mbr-gray-30
text-center
rounded-md

${({ $status }) =>
  $status === "growth"
    ? "bg-mbr-green-60"
    : $status === "fall"
      ? "bg-mbr-red-60"
      : "bg-mbr-yellow-50"}

md:w-[120px]
md:text-base
`;

export const Skeleton = tw.div`
w-full
h-[220px]
rounded-xl
bg-mbr-gray-40
animate-pulse
`;
