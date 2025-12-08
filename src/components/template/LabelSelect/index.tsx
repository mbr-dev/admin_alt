import * as S from "./styles";
import { cn } from "@/lib/utils";
import { Select } from "../../ui";
import { Spinner } from "../../template";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ILabelSelect {
  id?: string;
  value?: string;
  label?: string;
  items?: {id:string;label:string;}[];
  placeholder?: string;
  opened?: boolean;
  className?: string;
  classNameContent?: string;
  classNameItem?: string;
  disabled?: boolean;
  load?: boolean;
  onChange?: (value: string) => void | Promise<void>;
  onOpenChange?: (open: boolean) => void;
}

export const LabelSelect = ({ ...props }: ILabelSelect) => {
  const { t } = useTranslation("common");

  const [value, setValue] = useState<string>(props?.value ?? "");

  const onChange = (value: string) => {
    setValue(value);
    if (props?.onChange) props.onChange(value);
  }

  useEffect(() => { setValue(props?.value ?? ""); }, [props?.value]);

  return (
    <S.Container>
      {props?.label && <p>{props?.label}</p>}
  
      <Select.Select onValueChange={onChange} value={value} onOpenChange={props?.onOpenChange} disabled={props?.disabled}>
        <Select.SelectTrigger
          id={props?.id}
          className={cn("border-2 border-mbr-blue-10 shadow-lg text-black text-base md:text-xl md:h-[44px] md:rounded-xl landscape:lg:text-xl landscape:lg:h-[44px] landscape:lg:rounded-xl disabled:cursor-not-allowed relative", props?.className)}
          disabled={props?.disabled}
        >
          {props?.load && <Spinner className="w-[24px] h-[24px] absolute top-[5px] right-[8px] z-50 md:w-[32px] md:h-[32px] md:top-[4px] md:right-[4px]" />}
          <Select.SelectValue placeholder={props?.placeholder ?? t("select")} className="text-2xl" />
        </Select.SelectTrigger>

        <Select.SelectContent className={cn(props?.classNameContent)}>
          {props?.items && props?.items.map((item) => (
            <Select.SelectItem
              key={item.id}
              value={item.id}
              title={item.label}
              className={cn(props?.classNameItem)}
            >
              {item.label}
            </Select.SelectItem>
          ))}
        </Select.SelectContent>
      </Select.Select>
    </S.Container>
  );
}