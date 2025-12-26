import Link from "next/link";
import Navigation from "@/components/Navigation";

function Hero() {
  return (
    <section className='relative isolate overflow-hidden'>
      {/* Background */}
      <div className='absolute inset-0 -z-10 bg-linear-to-br from-indigo-50 via-white to-sky-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-indigo-950' />

      <div className='mx-auto max-w-7xl px-6 py-5'>
        <Navigation />
        <div className='grid gap-16 lg:grid-cols-2 lg:items-center'>
          {/* Left Content */}
          <div>
            <span className='inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'>
              🚀 Built for developers & writers
            </span>

            <h1 className='mt-6 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl xl:text-6xl'>
              Publish content that
              <span className='block text-indigo-600 dark:text-indigo-400'>
                actually gets read.
              </span>
            </h1>

            <p className='mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400'>
              A modern blogging platform focused on performance, SEO,
              readability, and analytics — designed to help creators grow
              without distractions.
            </p>

            {/* CTAs */}
            <div className='mt-10 flex flex-wrap items-center gap-4'>
              <Link
                href='/create'
                className='inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-8 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700'
              >
                Start Writing
              </Link>

              <Link
                href='/dashboard'
                className='inline-flex h-12 items-center justify-center rounded-xl border border-zinc-300 px-8 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800'
              >
                Explore Articles
              </Link>
            </div>

            {/* Trust Signals */}
            <div className='mt-10 flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400'>
              <span>⚡ Fast</span>
              <span>🔍 SEO-Optimized</span>
              <span>📊 Analytics</span>
            </div>
          </div>

          {/* Right Visual */}
          <div className='relative hidden lg:block'>
            <div className='rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900'>
              <div className='mb-4 flex items-center gap-2'>
                <div className='h-3 w-3 rounded-full bg-red-500' />
                <div className='h-3 w-3 rounded-full bg-yellow-400' />
                <div className='h-3 w-3 rounded-full bg-green-500' />
              </div>

              <pre className='text-sm leading-relaxed text-zinc-700 dark:text-zinc-300'>
                {`# Why performance matters

Fast blogs retain readers.
Optimized content ranks higher.
Clean UI builds trust.

Start writing today.`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
