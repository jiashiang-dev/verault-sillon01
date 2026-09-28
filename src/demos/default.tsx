import SakuraEditorialPoster from '@/components/ui/sakura-editorial-poster';

export default function DefaultDemo() {
  return (
    <main>
      <SakuraEditorialPoster className="w-full" />
      <footer className="flex flex-wrap items-center justify-between gap-4 bg-[#ece8df] px-6 py-8 text-xs text-[#4a2c32] md:px-10">
        <a className="underline underline-offset-4" href="/">Return to VÉRAULT</a>
        <span>
          Photograph by{' '}
          <a
            className="underline underline-offset-4"
            href="https://unsplash.com/photos/delicate-pink-cherry-blossoms-bloom-on-a-dark-background-8gpqu3UigeI"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pascal Debrunner on Unsplash
          </a>
        </span>
      </footer>
    </main>
  );
}
