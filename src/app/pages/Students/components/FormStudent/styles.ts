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
border-[#ec5691]/40
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
text-[#f21a6f]
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
text-[#f21a6f]
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
bg-[#ec5691]
text-white

md:text-base
`;

export const Footer = tw.div`
w-full
flex
items-center
justify-between
gap-2

md:gap-4
`;

export const FooterActions = tw.div`
flex
items-center
justify-end
gap-2
ml-auto

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

export const CidListContainer = tw.div`
w-full
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

export const CidAccordion = tw.div`
w-full
flex
flex-col
rounded-xl
border
border-mbr-gray-30
bg-white
overflow-hidden
`;

export const CidAccordionToggle = tw.button`
w-full
flex
items-center
justify-between
gap-3
px-4
py-3
text-left
bg-white
transition-colors
cursor-pointer

hover:bg-[#ec5691]/5
`;

export const CidAccordionTitleWrap = tw.span`
flex
items-center
gap-3
min-w-0
flex-1
`;

export const CidGroupIcon = tw.span`
shrink-0
flex
items-center
justify-center
w-9
h-9
rounded-lg
bg-[#ec5691]/10
text-[#f21a6f]
text-lg
`;

export const CidAccordionTitle = tw.span`
text-base
font-semibold
text-[#f21a6f]
min-w-0
`;

export const CidAccordionMeta = tw.span`
shrink-0
flex
items-center
gap-2
`;

export const CidSelectionCounter = tw.span<{ $hasSelection?: boolean }>`
text-xs
font-semibold
px-2
py-1
rounded-full
whitespace-nowrap

${(props) =>
  props.$hasSelection
    ? "bg-mbr-green-30/15 text-mbr-green-30"
    : "bg-mbr-gray-20 text-mbr-gray-60"}

md:text-sm
`;

export const CidAccordionIcon = tw.span`
shrink-0
flex
items-center
justify-center
text-[#f21a6f]
`;

export const CidAccordionPanel = tw.div`
w-full
flex
flex-col
gap-3
px-4
pb-4
border-t
border-mbr-gray-30
bg-white
`;

export const CidSubAccordion = tw.div`
w-full
flex
flex-col
rounded-lg
border
border-mbr-gray-30
overflow-hidden
`;

export const CidSubAccordionToggle = tw.button`
w-full
flex
items-center
justify-between
gap-3
px-3
py-2
text-left
text-sm
font-medium
text-mbr-gray-80
bg-white
transition-colors
cursor-pointer

hover:bg-[#ec5691]/5
`;

export const CidSubAccordionPanel = tw.div`
w-full
p-3
border-t
border-mbr-gray-30
`;

export const CidGroupTitle = tw.h5`
text-base
font-semibold
text-[#f21a6f]
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
gap-2
rounded-lg
border
border-mbr-gray-30
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
text-[#f21a6f]

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
bg-[#ec5691]
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
rounded-xl
border
border-mbr-gray-30
bg-white
p-4
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
border-[#ec5691]/40
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

export const StepProgress = tw.div`
w-full
flex
flex-col
gap-2
`;

export const StepProgressText = tw.p`
text-sm
text-mbr-gray-80
font-medium

md:text-base
`;

export const StepsList = tw.ol`
w-full
flex
items-center
gap-1
overflow-x-auto
pb-1

md:gap-2
`;

export const StepItem = tw.li<{ $active?: boolean; $completed?: boolean }>`
flex
items-center
gap-1
shrink-0

${(props) => (props.$active || props.$completed ? "text-[#f21a6f]" : "text-mbr-gray-60")}
`;

export const StepCircle = tw.span<{ $active?: boolean; $completed?: boolean }>`
w-7
h-7
rounded-full
flex
items-center
justify-center
text-xs
font-semibold
border-2

${(props) =>
  props.$active
    ? "bg-[#ec5691] text-white border-[#ec5691]"
    : props.$completed
      ? "bg-mbr-green-30 text-white border-mbr-green-30"
      : "bg-white text-mbr-gray-60 border-mbr-gray-40"}

md:w-8
md:h-8
md:text-sm
`;

export const StepLabel = tw.span`
hidden
text-xs
font-medium
whitespace-nowrap

sm:inline
md:text-sm
`;

export const StepConnector = tw.span<{ $completed?: boolean }>`
hidden
w-4
h-0.5
shrink-0

${(props) => (props.$completed ? "bg-mbr-green-30" : "bg-mbr-gray-40")}

sm:block
md:w-6
`;