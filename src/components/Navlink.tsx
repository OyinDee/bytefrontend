import Link from 'next/link';

interface NavLinkProps {
  href: string;
  label: string;
  getLinkClassName: (path: string) => string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, getLinkClassName }) => {
  return (
    <Link href={href} className={getLinkClassName(href)}>
      {label}
    </Link>
  );
};

export default NavLink;
