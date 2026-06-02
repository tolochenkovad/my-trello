import { Tooltip, TooltipProps } from 'antd';
import { LucideProps, SquarePen, Trash2, ClipboardList, TriangleAlert, X, Search, Save, MoveLeft, Plus, Undo } from 'lucide-react';

const icons = {
  edit: SquarePen,
  remove: Trash2,
  clipboardList: ClipboardList,
  warning: TriangleAlert,
  cross: X,
  search: Search,
  save: Save,
  moveLeft: MoveLeft,
  plus: Plus,
  undo: Undo
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
