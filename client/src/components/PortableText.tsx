import { urlFor } from '@/lib/sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface PortableTextProps {
  value: any[]
}

export function PortableText({ value }: PortableTextProps) {
  if (!value || !Array.isArray(value)) {
    return null
  }

  return (
    <div className="prose prose-lg max-w-none">
      {value.map((block, index) => {
        if (block._type === 'block') {
          return <Block key={block._key || index} block={block} />
        }
        if (block._type === 'image') {
          return <ImageBlock key={block._key || index} value={block} />
        }
        return null
      })}
    </div>
  )
}

function Block({ block }: { block: any }) {
  const style = block.style || 'normal'
  const children = block.children?.map((child: any, i: number) => {
    if (child._type === 'span') {
      let text = child.text
      const marks = child.marks || []
      
      if (marks.includes('strong')) {
        text = <strong key={i}>{text}</strong>
      }
      if (marks.includes('em')) {
        text = <em key={i}>{text}</em>
      }
      if (marks.includes('code')) {
        text = <code key={i} className="bg-gray-100 px-1 py-0.5 rounded">{text}</code>
      }
      
      // Handle links
      const linkMark = marks.find((mark: any) => typeof mark === 'object' && mark._type === 'link')
      if (linkMark) {
        text = (
          <a key={i} href={linkMark.href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        )
      }
      
      return text
    }
    return null
  })

  switch (style) {
    case 'h1':
      return <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    case 'h2':
      return <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
    case 'h3':
      return <h3 className="text-2xl font-bold mt-4 mb-2">{children}</h3>
    case 'h4':
      return <h4 className="text-xl font-bold mt-3 mb-2">{children}</h4>
    case 'blockquote':
      return <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>
    case 'normal':
    default:
      if (block.listItem === 'bullet') {
        return <li className="ml-6">{children}</li>
      }
      if (block.listItem === 'number') {
        return <li className="ml-6">{children}</li>
      }
      return <p className="mb-4">{children}</p>
  }
}

function ImageBlock({ value }: { value: any }) {
  if (!value.asset) return null
  
  return (
    <figure className="my-8">
      <img
        src={urlFor(value as SanityImageSource).width(800).url()}
        alt={value.alt || ''}
        className="w-full rounded-lg"
      />
      {value.caption && (
        <figcaption className="text-center text-sm text-gray-600 mt-2">
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}
