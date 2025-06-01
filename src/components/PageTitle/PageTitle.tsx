import { FC } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface PageTitleProps {
  title: string;
  className?: string;
  secondaryTitle?: string;
  nevigationPath?: string;
}

const PageTitle: FC<PageTitleProps> = ({
  title,
  secondaryTitle,
  className,
  nevigationPath,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const handleClick = () => {
    if (nevigationPath) {
      router.push(nevigationPath);
    }
  };
  return (
    <h3
      className={`text-md md:text-xl font-bold pb-5 px-0 ${className}`}
      onClick={nevigationPath ? handleClick : undefined}
    >
      {t(title)} {secondaryTitle}
    </h3>
  );
};

export default PageTitle;
