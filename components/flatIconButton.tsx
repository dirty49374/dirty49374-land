import { ComponentType, FC } from "react";


type FlatIconButtonProps = {
  Icon: ComponentType<{ className?: string }>;
  loading?: boolean;
  onClick?: () => void;
}

const FlatIconButton: FC<FlatIconButtonProps> = ({ Icon, loading, onClick }) => {
  return (
    <button onClick={onClick} disabled={loading!!}>
      <Icon className={(loading ? 'animate-spin ' : '') + "w-5 h-5 mb-1 hover:text-blue-600 cursor-pointer inline-block mr-2 ml-6"} />
    </button>
  )
}

export default FlatIconButton;
