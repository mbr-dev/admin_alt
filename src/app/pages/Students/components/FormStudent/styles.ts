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
text-black
text-sm

md:text-base
`;

export const ActionRow = tw.div`
w-full
flex
justify-end
`;

export const VerifyButton = tw.button`
px-4
py-2
rounded-lg
font-semibold
text-sm
cursor-pointer
bg-mbr-blue-10
text-white

md:text-base
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

export const CidContainer = tw.div`
w-full
rounded-xl
border
border-mbr-gray-30
bg-mbr-gray-10
p-3
flex
flex-col
gap-3
`;

export const CidEmpty = tw.p`
text-sm
text-mbr-gray-80
`;

export const CidGroup = tw.div`
w-full
flex
flex-col
gap-2
`;

export const CidGroupTitle = tw.h5`
text-base
font-semibold
text-mbr-blue-10
`;

export const CidSubcategory = tw.div`
w-full
flex
flex-col
gap-2
`;

export const CidSubTitle = tw.p`
text-sm
font-medium
text-mbr-gray-80
`;

export const CidList = tw.div`
w-full
grid
grid-cols-1
gap-2

md:grid-cols-2
`;

export const CidItem = tw.div`
w-full
flex
items-center
justify-between
gap-2
rounded-lg
bg-white
p-2
`;

export const CidCheckLabel = tw.label`
flex
items-center
gap-2
text-sm
text-black
cursor-pointer
`;

export const InfoButton = tw.button`
w-7
h-7
rounded-md
flex
items-center
justify-center
cursor-pointer
text-mbr-blue-10

hover:bg-mbr-gray-20
`;

export const InfoTooltipWrap = tw.div`
relative
inline-flex
items-center
`;

export const InfoTooltipText = tw.span`
absolute
bottom-[120%]
right-0
z-50
hidden
min-w-[200px]
max-w-[320px]
rounded-md
bg-mbr-blue-10
px-2
py-1
text-xs
text-white
shadow-md
group-hover:block
group-focus-within:block
`;

export const CidSkeleton = tw.div`
w-full
rounded-lg
border
border-mbr-gray-30
bg-white
p-3
animate-pulse
flex
flex-col
gap-2
`;

export const CidSkeletonLine = tw.div`
h-4
rounded-md
bg-mbr-gray-30
`;

export const FormSkeletonCard = tw.div`
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

export const FormSkeletonLine = tw.div`
h-5
rounded-md
bg-mbr-gray-30
`;

export const FormSkeletonGrid = tw.div`
w-full
grid
grid-cols-1
gap-3

md:grid-cols-2
`;