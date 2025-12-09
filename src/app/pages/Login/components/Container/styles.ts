import tw from "tailwind-styled-components";

export const Container = tw.div`
flex-1
w-dvw
h-dvh
flex
justify-center
items-center
bg-center
bg-no-repeat
bg-cover
relative


landscape:lg:justify-end
`;

export const Wave = tw.div`
hidden
absolute
top-0
right-0
z-10

[&>img]:w-full
[&>img]:h-full
[&>img]:object-cover

landscape:flex

landscape:lg:h-full
`;

export const Guys = tw.div`
w-[320px]
absolute
bottom-10
-left-1/5
translate-x-1/5
z-30

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:left-4

md:w-[500px]
md:bottom-20

landscape:lg:w-[580px]
landscape:lg:bottom-[150px]

landscape:xl:w-[800px]
landscape:xl:bottom-[100px]
landscape:xl:left-[100px]
`;

export const Main = tw.div`
w-full
h-full
flex
flex-col
items-center
z-20
relative
pt-10
bg-[#ED598D]

[&>h2]:text-white
[&>h2]:text-xl
[&>h2]:font-semibold

landscape:bg-transparent
landscape:items-end

landscape:lg:w-[550px]
landscape:lg:h-[600px]
landscape:lg:items-center

landscape:xl:w-[600px]
landscape:xl:h-[650px]
landscape:xl:mr-6
`;

export const Form = tw.form`
w-[320px]
h-[320px]
relative
flex
flex-col
items-center
justify-center
gap-2

[&>h2]:text-white
[&>h2]:text-lg
[&>h2]:font-semibold
[&>h2]:z-30

md:w-[550px]
md:h-[550px]
md:[&>h2]:text-2xl

landscape:xl:w-[600px]
landscape:xl:h-[600px]
`;

export const Logo = tw.div`
w-[100px]
z-30

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:w-[200px]
`;

export const Label = tw.label`
flex
flex-col
z-30
text-white
text-base
relative

[&>input]:rounded-lg
[&>input]:text-base
[&>input]:px-2
[&>input]:py-1
[&>input]:text-black

md:text-lg
md:[&>input]:w-[300px]
md:[&>input]:text-xl
md:[&>input]:px-4
md:[&>input]:py-2
`;

export const BgMain = tw.div`
w-full
h-full
absolute
top-0
right-0
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain
`;

export const ButtonEyes = tw.button`
w-[28px]
h-[28px]
flex
items-center
justify-center
absolute
right-1
top-[26px]
cursor-pointer

[&>svg]:text-[#ED598D]
[&>svg]:text-xl

md:w-[32px]
md:h-[32px]
md:right-2
md:top-[34px]
md:[&>svg]:text-2xl
`;

export const Button = tw.button`
bg-white
w-[150px]
rounded-lg
cursor-pointer
z-20
text-lg
font-semibold
text-[#ED598D]

disabled:cursor-not-allowed

md:text-xl
md:w-[200px]
md:py-2
`;