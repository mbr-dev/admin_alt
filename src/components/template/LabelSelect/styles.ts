import tw from "tailwind-styled-components";

export const Container = tw.label`
flex
flex-col

[&>p]:text-lg
[&>p]:pl-2
[&>p]:font-semibold

md:[&>p]:text-xl
md:[&>p]:pl-3

landscape:lg:[&>p]:text-xl
landscape:lg:[&>p]:pl-3
`;