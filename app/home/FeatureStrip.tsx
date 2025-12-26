export default function FeatureStrip() {
  const features = [
    {
      title: "Blazing Fast",
      desc: "Built with Next.js RSC and edge caching.",
      icon: "⚡",
    },
    {
      title: "SEO First",
      desc: "Schema, metadata, and optimized content structure.",
      icon: "🔍",
    },
    {
      title: "Writer Analytics",
      desc: "Track views, reads, and engagement.",
      icon: "📊",
    },
  ];

  return (
    <section className='border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950'>
      <div className='mx-auto max-w-7xl px-6 py-12'>
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((f) => (
            <div key={f.title} className='flex gap-4'>
              <span className='text-2xl'>{f.icon}</span>
              <div>
                <h3 className='font-semibold text-zinc-900 dark:text-white'>
                  {f.title}
                </h3>
                <p className='mt-1 text-sm text-zinc-600 dark:text-zinc-400'>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
