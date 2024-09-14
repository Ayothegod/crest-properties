import * as Icons from "lucide-react";

export default function RenderIcon({ Icon }: any) {
  const IconComponent: any =
  Icons[Icon.iconType as keyof typeof Icons];

  return (
    <>
      Icon
      {/* <IconComponent class="w-5 h-5" /> */}
    </>
  );
}
