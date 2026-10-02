import tw from "tailwind-styled-components";

export {
  Container,
  Wave,
  Guys,
  Main,
  Form,
  Logo,
  BgMain,
} from "@/app/pages/Login/components/Container/styles";

export const Feedback = tw.div`
absolute
inset-0
z-40
flex
items-center
justify-center
px-6
`;

export const Card = tw.div`
flex
flex-col
items-center
justify-center
gap-4
min-w-[220px]
px-8
py-7
rounded-2xl
bg-white/95
shadow-lg
`;

export const Spinner = tw.span`
block
w-14
h-14
rounded-full
border-4
border-[#ED598D]
border-t-transparent
animate-spin
`;

export const SuccessIcon = tw.div`
text-emerald-500
[&>svg]:h-14
[&>svg]:w-14
`;

export const ErrorIcon = tw.div`
text-red-500
[&>svg]:h-14
[&>svg]:w-14
`;

export const Message = tw.p`
text-center
text-xl
font-semibold
text-[#ED598D]

md:text-2xl
`;
