import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
items-center
justify-center
px-4
py-[44px]
relative

md:py-[64px]

landscape:lg:py-[100px]
`;

export const Main = tw.div`
w-full
flex
flex-col
items-center
justify-center
gap-4

md:gap-10

landscape:lg:gap-10

landscape:xl:gap-20
`;

export const Infos = tw.div`
w-full
max-w-[1200px]
flex
flex-col
gap-2
z-10

[&>h2]:text-white
[&>h2]:text-xl
[&>h2]:pl-1
[&>h2]:font-bold

md:gap-4
md:[&>h2]:text-3xl

landscape:lg:[&>h2]:text-3xl
`;

export const LoadingBox = tw.div`
w-full
rounded-2xl
border
border-mbr-gray-30
bg-white
p-6
text-sm
text-mbr-gray-80
`;

export const SkeletonBox = tw.div`
w-full
flex
flex-col
gap-3
`;

export const SkeletonCard = tw.div`
w-full
rounded-2xl
border
border-mbr-gray-20
bg-white/80
p-4
animate-pulse
`;

export const SkeletonRow = tw.div`
w-full
grid
grid-cols-1
gap-3

md:grid-cols-2
xl:grid-cols-3
2xl:grid-cols-6
`;

export const SkeletonCell = tw.div`
h-12
rounded-lg
bg-mbr-gray-20
`;

export const SessionsBox = tw.div`
w-full
flex
flex-col
gap-3
`;

export const EmptyBox = tw.div`
w-full
rounded-2xl
border
border-mbr-gray-30
bg-white
p-6
text-sm
text-mbr-gray-80
`;

export const SessionCard = tw.div<{ $status: string }>`
w-full
rounded-2xl
border
border-white/40
p-4

${({ $status }) => {
  if ($status === "aberta") return "bg-blue-100 text-blue-700";
  if ($status === "em andamento" || $status === "em_andamento") return "bg-yellow-100 text-yellow-700";
  if ($status === "finalizada") return "bg-green-100 text-green-700";
  if ($status === "cancelada") return "bg-red-100 text-red-700";
  return "bg-mbr-gray-20 text-mbr-gray-80";
}}
`;

export const SessionRow = tw.div`
w-full
grid
grid-cols-1
gap-3

md:grid-cols-2
xl:grid-cols-3
2xl:grid-cols-6
`;

export const SessionItem = tw.div`
flex
flex-col
`;

export const ItemLabel = tw.span`
text-xs
font-semibold
opacity-90
`;

export const ItemValue = tw.span`
text-sm
font-medium
break-words
`;

export const Actions = tw.div`
w-full
flex
justify-end
`;

export const ViewMoreButton = tw.button`
h-10
px-4
rounded-xl
bg-mbr-blue-10
text-white
font-semibold
text-sm
cursor-pointer

hover:opacity-90
`;