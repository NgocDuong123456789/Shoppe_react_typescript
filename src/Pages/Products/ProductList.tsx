import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { AsideProduct } from './AsideProduct/AsideProduct'
import { SortProduct } from './SortProduct/SortProduct'
import { productApi } from '../../Components/Api/product.api'
import { QueryParams } from '../../Hook/QueryParams'
import { QueryConfigs } from '../../Types/Generality.type'
import { Product } from '../../Components/Product/Product'
import { Paginations } from '../../Types/Generality.type'
import { Pagination } from '../../Components/Pagination/Pagination'

const ProductList = () => {
  const query: QueryConfigs = QueryParams()
  const { data } = useQuery({
    queryKey: ['productList', query],
    queryFn: () => productApi.getProduct(query),
    staleTime: 1000
  })

  return (
    <div className='flex lg:px-10 bg-blackWhite px-2 ls:pt-[45px]'>
      <Helmet>
        <meta name='Product List' content='content description  product List' />
        <title>Shoppe Việt Name | Mua Bán Thương Mại</title>
      </Helmet>

      <div className='grid grid-cols-12 lg:px-20 mt-6 lg:gap-10'>
        <div className='col-span-2 w-full '>
          <AsideProduct />
        </div>

        <div className='lg:col-span-10 col-span-12 '>
          <SortProduct />
          <div className='grid lg:grid-cols-5 lg:mt-[20px] lg:gap-5 grid-cols-2 md:grid-cols-4   gap-3'>
            {data?.data.data.products.map((product) => {
              return (
                <div key={product._id} className='span-col-1 '>
                  <Product product={product} />
                </div>
              )
            })}
          </div>
          <div className='flex w-full  items-center m-auto justify-center text-center my-[50px] '>
            <Pagination QueryParam={query} pagination={data?.data.data.pagination as Paginations} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList