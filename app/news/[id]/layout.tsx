import './font.css';
import '@fontsource/oswald'


export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-full">
        {children}
      </main>
    </>
  );
} 