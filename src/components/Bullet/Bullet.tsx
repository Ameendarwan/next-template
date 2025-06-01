import { FC, HTMLAttributes, ReactNode } from 'react';

interface BulletProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  color?: string;
  disabled?: boolean;
}

const Bullet: FC<BulletProps> = ({ children, color, disabled, ...props }) => {
  return (
    <div
      {...props}
      className={`flex aspect-square h-[18px] w-[18px] items-center justify-center rounded-full ${props.className} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      style={{ backgroundColor: color }}>
      {children}
    </div>
  );
};

export default Bullet;
