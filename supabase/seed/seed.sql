-- Seed existing public-site data into the new tables.
-- Safe to re-run: uses on conflict / where-not-exists guards.

-- Admin allowlist: replace with the real admin email before running in prod.
insert into public.admin_emails (email) values
  ('amirisgoofyashell@gmail.com')
on conflict (email) do nothing;

-- Portfolio
insert into public.portfolio (sort_order, num, year, title, italic, description, role, palette, accent, url, domain)
select 1, '001', '2025', 'The Yemeni House', 'Restaurant, Lynnwood',
       'Authentic Yemeni cuisine, slow-cooked and unapologetic. Sister to Taste of Yemen — Infatuation''s Best New Restaurant of 2025.',
       ARRAY['Web design','Build','Copy'],
       ARRAY['bg-[#7A2F0E]','bg-[#C8501E]','bg-[#EBC591]'],
       'from-amber-700 via-orange-800 to-stone-900',
       'https://yemenihouse.netlify.app','yemenihouse.netlify.app'
where not exists (select 1 from public.portfolio where num = '001');

insert into public.portfolio (sort_order, num, year, title, italic, description, role, palette, accent, url, domain)
select 2, '002', '2024', 'Northwest Fades', 'Barbershop, PNW',
       'Frankie and Ahmed''s shop. The cleanest cut in the Northwest — fades, beard work, straight razors, and real conversation.',
       ARRAY['Web design','Build','Local SEO'],
       ARRAY['bg-[#1E2230]','bg-[#4A5468]','bg-[#C0A572]'],
       'from-slate-700 via-slate-800 to-stone-900',
       'https://northwestfades.netlify.app','northwestfades.netlify.app'
where not exists (select 1 from public.portfolio where num = '002');

-- Testimonials
insert into public.testimonials (sort_order, quote, name, role, org, accent)
select 1,
  'Before Ussly we had no real online presence. Now people book through the site, find us on Google, and show up already knowing what we offer. The site just speaks for us.',
  'Frankie','Co-Owner','Northwest Fades','text-accent'
where not exists (select 1 from public.testimonials where name='Frankie' and org='Northwest Fades');

insert into public.testimonials (sort_order, quote, name, role, org, accent)
select 2,
  'We told them what we were about — community, quality, no corporate feel — and they nailed it on the first try. It actually looks like us.',
  'Ahmed','Co-Owner','Northwest Fades','text-ink'
where not exists (select 1 from public.testimonials where name='Ahmed' and org='Northwest Fades');

insert into public.testimonials (sort_order, quote, name, role, org, accent)
select 3,
  'We needed something that felt true to our food and culture, not a generic restaurant template. Ussly delivered exactly that — our regulars noticed it the day we launched.',
  'The Yemeni House','Restaurant','Lynnwood WA','text-accent'
where not exists (select 1 from public.testimonials where name='The Yemeni House');
