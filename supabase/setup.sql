create table if not exists public.empreendimentos (
  id text primary key,
  nome text not null,
  status text not null check (status in ('na-planta', 'em-construcao', 'pronto')),
  cidade text not null,
  bairro text not null default '',
  metragem text not null default '',
  dormitorios text not null default '',
  vagas text not null default '',
  andares text not null default '',
  unidades text not null default '',
  descricao text not null default '',
  diferenciais text[] not null default '{}',
  galeria jsonb not null default '[]',
  whatsapp text not null default '',
  whatsapp_msg text not null default '',
  destaque boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.empreendimentos enable row level security;
grant select on public.empreendimentos to anon, authenticated;
grant insert, update, delete on public.empreendimentos to authenticated;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "Anyone can read empreendimentos" on public.empreendimentos;
create policy "Anyone can read empreendimentos"
  on public.empreendimentos for select
  using (true);

drop policy if exists "Authenticated admins can insert empreendimentos" on public.empreendimentos;
create policy "Authenticated admins can insert empreendimentos"
  on public.empreendimentos for insert to authenticated
  with check (public.is_admin());

drop policy if exists "Authenticated admins can update empreendimentos" on public.empreendimentos;
create policy "Authenticated admins can update empreendimentos"
  on public.empreendimentos for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated admins can delete empreendimentos" on public.empreendimentos;
create policy "Authenticated admins can delete empreendimentos"
  on public.empreendimentos for delete to authenticated
  using (public.is_admin());

insert into public.empreendimentos
  (id, nome, status, cidade, bairro, metragem, dormitorios, vagas, andares, unidades, descricao, diferenciais, galeria, whatsapp, whatsapp_msg, destaque)
values
  (
    'residencial-vila-nova',
    'Residencial Vila Nova',
    'na-planta',
    'Sorocaba, SP',
    'Vila Nova',
    '70 a 100 m²',
    '2 e 3 dorm.',
    '1 a 2 vagas',
    '14 andares',
    '96 unidades',
    'O Residencial Vila Nova une design contemporâneo e funcionalidade em uma localização privilegiada de Sorocaba. Apartamentos projetados para oferecer o máximo de conforto e bem-estar, com acabamentos de alto padrão e áreas de convivência completas.',
    array['Piscina adulto e infantil', 'Academia equipada', 'Salão de festas gourmet', 'Espaço kids', 'Playground', 'Portaria 24h'],
    '[{"src":"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80","alt":"Fachada"},{"src":"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80","alt":"Área de lazer"},{"src":"https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800&q=80","alt":"Sala de estar"}]'::jsonb,
    '5515999999999',
    'Olá! Tenho interesse no Residencial Vila Nova. Pode me enviar mais informações?',
    true
  ),
  (
    'jardim-sorocaba',
    'Jardim Sorocaba',
    'em-construcao',
    'Sorocaba, SP',
    'Jardim América',
    '80 a 120 m²',
    '3 dorm. (1 suíte)',
    '2 vagas',
    '10 andares',
    '60 unidades',
    'O Jardim Sorocaba é um empreendimento de médio padrão com projeto arquitetônico diferenciado e áreas comuns completas. Localizado em bairro nobre, oferece fácil acesso a comércio, escolas e serviços de saúde.',
    array['Piscina coberta e descoberta', 'Espaço gourmet', 'Brinquedoteca', 'Salão de festas', 'Quadra poliesportiva', 'Pet place'],
    '[{"src":"https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80","alt":"Fachada"},{"src":"https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80","alt":"Piscina"}]'::jsonb,
    '5515999999999',
    'Olá! Tenho interesse no Jardim Sorocaba. Pode me enviar mais informações?',
    true
  ),
  (
    'alto-das-torres',
    'Alto das Torres',
    'pronto',
    'Itu, SP',
    'Parque das Torres',
    '90 a 140 m²',
    '3 e 4 dorm.',
    '2 a 3 vagas',
    '16 andares',
    '80 unidades',
    'O Alto das Torres é um empreendimento completo, pronto para morar, com toda infraestrutura de lazer e segurança que sua família merece. Apartamentos espaçosos com vista privilegiada e acabamentos sofisticados.',
    array['Vista panorâmica', 'Spa completo', 'Sala de cinema', 'Coworking', 'Academia 24h', 'Concierge'],
    '[{"src":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80","alt":"Fachada"},{"src":"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80","alt":"Vista"},{"src":"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80","alt":"Apartamento"}]'::jsonb,
    '5515999999999',
    'Olá! Tenho interesse no Alto das Torres. Pode me enviar mais informações?',
    true
  )
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('empreendimentos', 'empreendimentos', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Anyone can view empreendimento images" on storage.objects;
create policy "Anyone can view empreendimento images"
  on storage.objects for select
  using (bucket_id = 'empreendimentos');

drop policy if exists "Authenticated admins can upload empreendimento images" on storage.objects;
create policy "Authenticated admins can upload empreendimento images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'empreendimentos' and public.is_admin());

drop policy if exists "Authenticated admins can delete empreendimento images" on storage.objects;
create policy "Authenticated admins can delete empreendimento images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'empreendimentos' and public.is_admin());
