import TopProductItem from "@/containers/home/TopProductItem";
import { Suspense } from "react";
import { GridViewSkeleton } from "./Loaders/Grid/GridViewSkeleton";

export default function ProductArray({ topProducts,view }: any) {
    return (
      <>
        <Suspense fallback={<GridViewSkeleton/>}>
                    <div
                      className={`grid gap-x-2 gap-y-4 md:gap-y-4 ${
                        view === 'grid'
                          ? 'grid-cols-2 xl:grid-cols-4 '
                          : 'grid-cols-1 lg:grid-cols-2'
                      }`}
                    >
                      {topProducts.homePageProductDetails.map(
                        (product: any) => (
                          <TopProductItem
                            view={view}
                            key={product.productId}
                            {...product}
                          />
                        )
                      )}
                    </div>
                  </Suspense>
      </>
    );
    }
