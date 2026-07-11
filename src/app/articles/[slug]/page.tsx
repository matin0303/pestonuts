import DOMPurify from 'isomorphic-dompurify';
import TableOfContents from '@/components/Admin/Article/CreateArticle/TableOfContents/TableOfContents';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { Article } from '@/types/api.types';
import ArticleCard from '@/components/ArticleCard/ArticleCard';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const response = await getArticle(slug);
  const article:Article = response?.data?.article;
  if (!article?.content) {
    notFound();
  }
  
  const sanitizedContent = article.content
  console.log(sanitizedContent)
  //  DOMPurify.sanitize(article.content, {
  //   ALLOWED_TAGS: [
  //     'p', 'br', 'strong', 'em', 'a', 'img', 
  //     'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 
  //     'blockquote', 'code', 'pre', 'span',
  //     'table', 'thead', 'tbody', 'tr', 'th', 'td',
  //   ],
  //   ALLOWED_ATTR: [
  //     'href', 'src', 'alt', 'target', 'rel', 
  //     'class', 'id', 'width', 'height',
  //     'colspan', 'rowspan',
  //   ],
  //   ALLOW_UNKNOWN_PROTOCOLS: false,
  //   KEEP_CONTENT: true,
  // });

  const addHeadingsId = (html: string): string => {
    let counter = 0;
    const timestamp = Date.now();
    
    return html.replace(
      /<(h[1-6])([^>]*)>(.*?)<\/\1>/gi,
      (match, tag, attributes, content) => {
        if (attributes.includes('id=')) return match;
        const id = `heading-${counter++}-${timestamp}`;
        return `<${tag} ${attributes} id="${id}">${content}</${tag}>`;
      }
    );
  };

  const htmlWithIds = addHeadingsId(sanitizedContent);
  const parts = htmlWithIds.split(/(TableOfContent)/g);
  
  const renderedContent = parts.map((part, index) => {
    if (part === 'TableOfContent') {
      return <TableOfContents htmlContent={htmlWithIds} key={index} />;
    }
    return (
      <div 
        key={index} 
        dangerouslySetInnerHTML={{ __html: part }}
        className="prose prose-lg max-w-none"
      />
    );
  });

  return (
    <div className='w-full min-h-screen pt-20 pb-5 px-30 max-lg:px-10 max-sm:px-3 bg-white font-[sarvenaz]'>
      <div className='relative w-full h-full flex max-lg:flex-col-reverse justify-center items-start flex-row-reverse gap-1.5'>
        
        <aside className='w-110 max-lg:w-full max-md:w-full lg:min-h-140 flex gap-3 justify-start items-start flex-col sticky max-md:relative top-0 right-0 p-3 max-lg:pb-5 rounded-sm shadow-md'>
          <span className='text-xl'>مقاله های مرتبط</span>
          <div className='w-full flex flex-col justify-center items-center max-lg:flex-row max-md:flex-col gap-2'>
            {response?.data?.related?.length > 0 ? (
              response.data.related.map((relatedArticle: Article) => (
                <ArticleCard data={relatedArticle}/>
              ))
            ) : (
              <p className="text-gray-500 text-sm">مقاله مرتبطی یافت نشد</p>
            )}
          </div>
        </aside>
        
        <main className='w-full min-h-140 h-full rounded-sm shadow-md px-5 max-md:px-3'>
          {/* هدر مقاله */}
          {/* <header className="mb-8">
            <h1 className="text-3xl font-bold mb-3">
              {article.title}
            </h1>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>👁 {article.view_count || 0} بازدید</span>
              <span>
                📅 {new Date(article.created_at).toLocaleDateString('fa-IR')}
              </span>
            </div>
          </header> */}
          
          <article className={styles.articleContent}>
            {renderedContent}
          </article>
        </main>
        
      </div>
    </div>
  );
}

async function getArticle(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${slug}`, {
      // next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json(); 
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const response = await getArticle(slug);
  const article = response?.data?.article;
  return {
    title: article?.title || 'مقاله یافت نشد',
    description: article?.description?.replace(/<[^>]*>/g, '').substring(0, 150) || '',
  };
}