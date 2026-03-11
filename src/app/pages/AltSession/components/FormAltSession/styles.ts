import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
justify-center
`;

export const FormCard = tw.div`
w-full
md:w-[85%]
p-4
flex
flex-col
gap-4
bg-white
rounded-2xl
border-2
border-mbr-blue-150
z-30

md:p-6
md:gap-6
`;

export const Header = tw.div`
w-full
flex
items-center
justify-between
`;

export const FormTitle = tw.h3`
text-mbr-blue-10
text-xl
font-bold

md:text-2xl
`;

export const Sections = tw.div`
w-full
flex
flex-col
gap-4

md:gap-6
`;

export const Section = tw.div`
w-full
flex
flex-col
gap-3
`;

export const SectionTitle = tw.h4`
text-mbr-blue-10
text-lg
font-semibold

md:text-xl
`;

export const Grid = tw.div`
w-full
grid
grid-cols-1
gap-3

md:grid-cols-2
`;

export const Label = tw.label`
w-full
flex
flex-col
gap-1
text-black
text-sm
font-medium

md:text-base
`;

export const Input = tw.input`
w-full
p-3
rounded-lg
bg-mbr-gray-10
text-black
text-sm

md:text-base
`;

export const Select = tw.select`
w-full
p-3
rounded-lg
bg-mbr-gray-10
border
border-mbr-gray-30
text-black
text-sm

md:text-base
`;

export const StatusSelect = tw.select<{ $status: string }>`
w-full
p-3
rounded-lg
bg-mbr-gray-10
text-black
text-sm
border-2

${({ $status }) => {
  if ($status === "aberta") return "border-blue-500";
  if ($status === "em_andamento") return "border-yellow-500";
  if ($status === "finalizada") return "border-green-500";
  if ($status === "cancelada") return "border-red-500";
  return "border-mbr-gray-30";
}}

md:text-base
`;

export const SearchWrapper = tw.div`
relative
w-full
`;

export const OptionsList = tw.div`
absolute
top-[105%]
left-0
z-50
w-full
max-h-52
overflow-auto
rounded-lg
border
border-mbr-gray-30
bg-white
shadow-lg
`;

export const OptionButton = tw.button`
w-full
text-left
px-3
py-2
text-sm
cursor-pointer

hover:bg-mbr-gray-10
`;

export const Footer = tw.div`
w-full
flex
items-center
justify-end
gap-2

md:gap-4
`;

export const Button = tw.button<{ $variant: "primary" | "secondary" }>`
px-4
py-2
rounded-lg
font-semibold
text-sm
cursor-pointer
disabled:cursor-not-allowed

${(props) =>
  props.$variant === "primary"
    ? "bg-mbr-green-30 text-white"
    : "bg-mbr-gray-50 text-white"}

md:text-base
md:px-6
md:py-3
`;

export const SkeletonCard = tw.div`
w-full
md:w-[85%]
p-4
rounded-2xl
border-2
border-mbr-blue-150
bg-white
animate-pulse
flex
flex-col
gap-3

md:p-6
`;

export const SkeletonLine = tw.div`
h-5
rounded-md
bg-mbr-gray-30
`;

export const SkeletonGrid = tw.div`
w-full
grid
grid-cols-1
gap-3

md:grid-cols-2
`;
