/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import SchoolsList from '@/components/Schools'



export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}) {
  const pathname = usePathname()
  const tagCounts = tagData
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <h1 className="text-3xl mx-6 my-5 font-extrabold leading-9 tracking-tight text-gray-900 dark:text-cyan-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        Schools
      </h1>
      <div className="m-4 flex justify-center">
        <SchoolsList />
      </div>
    </>
  )
}
