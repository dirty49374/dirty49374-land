import { FC } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import remarkGfm from "remark-gfm"
import style from "react-syntax-highlighter/dist/cjs/styles/prism/darcula";


type MarkdownViewProps = {
  content: string;
  className?: string;
}

const MarkdownView: FC<MarkdownViewProps> = ({ className, content }) => {
  return (
    <ReactMarkdown className={className} remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match
            ? <SyntaxHighlighter
              language={match[1]}
              PreTag="div"
              customStyle={{ backgroundColor: "transparent", }}
              style={style}
              {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
            : <code className={className} {...props}>
              {children}
            </code>;

        }
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default MarkdownView;
