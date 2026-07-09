import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import HardBreak from '@tiptap/extension-hard-break' 
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import {Table} from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Blockquote from '@tiptap/extension-blockquote'


export const extensions = [
  StarterKit.configure({
    heading: false,
    codeBlock: false,
  }),
  Heading.configure({
    levels: [1, 2, 3],
    HTMLAttributes: {
      class: 'text-orange-600 text-3xl font-sarvenaz',
    },
  }),,
  HardBreak.configure({
    keepMarks: true,
    HTMLAttributes: {
      class: 'my-break'
    }
  }),
  Image.configure({
    inline: true,
    allowBase64: false,
    HTMLAttributes: {
      class: 'rounded-lg max-w-full w-full object-cover my-4 aspect-video '
    }
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      target: '_blank',
      rel: 'noopener noreferrer',
      class: 'text-blue-600 hover:underline '
    }
  }),
  Paragraph.configure({
    HTMLAttributes: {
      class: 'font-kalameh text-black text-lg leading-relaxed',
    },
  }),
  Placeholder.configure({
    placeholder: 'از اینجا بنویسید...'
  }),
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: 'my-4 w-full border-collapse',
    },
  }),
  TableRow,
  TableCell.configure({
    HTMLAttributes: {
      class: 'border border-gray-300 px-4 py-2',
    },
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: 'border border-gray-300 px-4 py-2 bg-gray-100 font-bold',
    },
  }),
  BulletList.configure({
    HTMLAttributes: {
      class: 'list-disc list-inside my-4',
    },
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: 'list-decimal list-inside my-4',
    },
  }),
  ListItem,
  Blockquote.configure({
    HTMLAttributes: {
      class: 'border-r-4 border-gray-300 pr-4 my-4',
    },
  }),
].filter(ext => ext !== undefined && ext !== null)
