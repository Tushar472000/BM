import { ProductSpecificationsProps } from "@/interfaces/propsinterfaces";

export default function ProductSpecifications({
  specifications
}: ProductSpecificationsProps) {
  let key: keyof typeof specifications;
  const rows: { label: string; value: any }[] = [];
  for (key in specifications) {
    if (key !== 'id' && key !== 'productId') {
      rows.push({
        label: key as string,
        value: specifications[key]
      });
    }
  }
  return (
    <div>
      <h2 className='mt-2  text-[0.7rem] font-semibold md:text-lg lg:text-xl'>Product Specifications</h2>
      <div className='overflow-auto rounded-lg capitalize shadow-lg'>
        <table className='mt-4 w-full border-separate border-spacing-0 rounded-lg border border-gray-200'>
          <tbody>
            {rows.map((row) => (
              <tr className='even:bg-gray-200' key={row.label}>
                <td className='py-2 text-[0.7rem] md:text-sm lg:text-base px-4'>{row.label}</td>
                <td className='py-2 px-4 text-[0.7rem] md:text-sm lg:text-base font-medium'>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
