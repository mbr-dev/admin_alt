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

export const SessionInfo = tw.div`
w-full
flex
flex-col
gap-1
text-sm
text-mbr-gray-80
`;

export const SessionInfoLine = tw.p`
m-0
`;

export const Sections = tw.div`
w-full
flex
flex-wrap
gap-4
items-stretch
`;

export const QuestionCard = tw.div`
w-full
rounded-xl
border
border-mbr-gray-30
bg-mbr-gray-10
p-3
flex
flex-col
gap-2
`;

/** Perguntas `input_number`: mesmo padrão visual de `QuestionCard`, só a largura muda no `md`. */
export const NumberQuestionCard = tw.div`
w-full
min-w-0
shrink-0
rounded-xl
border
border-mbr-gray-30
bg-mbr-gray-10
p-3
flex
flex-col
gap-2

md:w-[30%]
`;

export const QuestionLabel = tw.label`
w-full
text-md
font-bold
text-black
`;

export const Input = tw.input`
w-full
p-3
rounded-lg
bg-white
border
border-mbr-gray-30
text-black
text-sm
`;

export const NumberInput = tw.input`
w-full
min-w-0
p-3
rounded-lg
bg-white
border
border-mbr-gray-30
text-black
text-sm
`;

export const TextArea = tw.textarea`
w-full
p-3
rounded-lg
bg-white
border
border-mbr-gray-30
text-black
text-sm
resize-y
min-h-[100px]
`;

export const Select = tw.select`
w-full
p-3
rounded-lg
bg-white
border
border-mbr-gray-30
text-black
text-sm
`;

export const OptionsGroup = tw.div`
w-full
flex
flex-col
gap-2
`;

export const OptionLabel = tw.label`
w-full
flex
items-center
gap-2
text-sm
text-black
`;

export const OptionInput = tw.input`
w-4
h-4
cursor-pointer
`;

export const EmptyState = tw.div`
w-full
rounded-xl
border
border-dashed
border-mbr-gray-30
bg-white
p-4
text-sm
text-mbr-gray-80
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
