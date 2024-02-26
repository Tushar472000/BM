import Link from 'next/link';
import { Fragment } from 'react';
import { BreadcrumbsProps } from '@/interfaces/propsinterfaces';

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className='flex items-center text-sm text-dark-black md:text-base'>
      {items.map((item, itemIndex) => {
        return item.href && !item.active ? (
          <Fragment key={itemIndex}>
            <Link className='underline' href={item.href} prefetch={false}>
              {item.label}
            </Link>
            <span>/</span>
          </Fragment>
        ) : (
          <div key={itemIndex}>{item.label}</div>
        );
      })}
    </div>
  );
}
