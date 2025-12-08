import tw from "tailwind-styled-components";

export const ChartLineLegendRow = tw.div`
  w-full
  flex
  items-center
  mb-4
`;

export const ChartCardContainer = tw.div`
  w-full
  mx-auto
  bg-white
  rounded-2xl
  flex
  flex-col
  items-center
  p-4
  shadow-[0_4px_24px_0_rgba(247,120,159,0.25)]
  mb-4
`;

export const SkeletonGraph = tw.div`
  w-full
  h-[220px]
  bg-gray-200
  rounded-lg
  animate-pulse
`;

export const ChartTitle = tw.h3`
  text-lg
  md:text-2xl
  font-bold
  text-[#414141]
  text-center
  mb-2
  uppercase
`;