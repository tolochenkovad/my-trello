import { Tooltip, TooltipProps } from 'antd';
import { LucideProps, SquarePen, Trash2 } from 'lucide-react';

const icons = {
  edit: SquarePen,
  remove: Trash2,
};

type IconProps = {
  name: keyof typeof icons;
  tooltip?: TooltipProps;
} & LucideProps;

export const Icon = ({ name, tooltip, ...rest }: IconProps) => {
  const IconComponent = icons[name];
  const IconRender = <IconComponent name={name} size={16} {...rest} />;

  if (tooltip) {
    return <Tooltip {...tooltip}>{IconRender}</Tooltip>;
  }

  return IconRender;
};
