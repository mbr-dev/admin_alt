import tw from "tailwind-styled-components";

export const Overlay = tw.div`
fixed
inset-0
z-50
flex
items-center
justify-center
bg-mbr-bg-modal
p-4
`;

export const Dialog = tw.div`
w-full
max-w-lg
flex
flex-col
gap-4
p-4
bg-white
rounded-2xl
border-2
border-[#ec5691]/40

md:p-6
md:gap-5
`;

export const Title = tw.h3`
text-[#f21a6f]
text-xl
font-bold

md:text-2xl
`;

export const StudentName = tw.p`
text-sm
font-medium
text-black

md:text-base
`;

export const Hint = tw.p`
text-mbr-gray-50
text-xs
font-normal

md:text-sm
`;

export const Options = tw.fieldset`
w-full
flex
flex-col
gap-3
border-0
p-0
m-0
`;

export const Legend = tw.legend`
sr-only
`;

export const Option = tw.label<{ $selected?: boolean }>`
w-full
flex
items-start
gap-3
p-3
rounded-lg
border-2
cursor-pointer
text-black

${(props) => (props.$selected ? "border-[#ec5691] bg-[#ec5691]/10" : "border-mbr-gray-30 bg-mbr-gray-10")}
`;

export const Radio = tw.input`
mt-1
w-4
h-4
shrink-0
accent-[#ec5691]
`;

export const OptionText = tw.span`
flex
flex-col
gap-1
`;

export const OptionTitle = tw.span`
text-sm
font-semibold

md:text-base
`;

export const Actions = tw.div`
w-full
flex
flex-col-reverse
gap-2

sm:flex-row
sm:justify-end
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
