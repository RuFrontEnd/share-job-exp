// HeaderBlock 元件，接收 title 與 subtitle 兩個 props
interface HeaderBlockProps {
  title: string;
  subtitle: string;
}

export default function HeaderBlock({ title, subtitle }: HeaderBlockProps) {
  return (
    <header className="text-center py-12 bg-gradient-to-r from-blue-400 to-indigo-500">
      <h1 className="text-4xl font-bold text-white drop-shadow">{title}</h1>
      <p className="mt-2 text-lg text-blue-100">{subtitle}</p>
    </header>
  );
}
