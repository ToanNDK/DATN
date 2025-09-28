import React from 'react'
import Title from './Title'
import { Category } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'

const HomeCategories = ({categories}:{categories : Category[]}) => {
  return (
    <div className="bg-white border border-shop_light_green/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
        <Title className = "border-b pb-3">Popular Categories</Title>
        <div>
            {categories?.map((category)=>(
                <div key={category?._id}>
                    {category?.image && 
                        <div className="overflow-hidden border border-shop_orange/30 hover:border-shop_orange hoverEffect w-20 h-20 p-1" >
                            <Link href={`/category/${category?.slug?.current}`}>
                                <Image 
                                    src={urlFor(category?.image).url()} 
                                    alt="categoryImage" 
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                    />
                            </Link>
                        </div>
                    }
                </div>
            ))}
        </div>
    </div>
  )
}

export default HomeCategories