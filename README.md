# Site institucional Torrense

Site institucional da Torrense Construtora e Incorporadora, voltado a pessoas interessadas em conhecer os empreendimentos e entrar em contato com a empresa. Reúne apresentação da empresa, listagem e detalhes dos empreendimentos e canais de contato.

## Demonstração
![alt text](image.png)

## Tecnologias

- React
- TypeScript
- React Router DOM
- Vite
- Tailwind CSS

## Como rodar

O projeto usa pnpm, conforme o arquivo de lock:

```bash
pnpm install
pnpm dev
```

## Banco de dados dos empreendimentos (Supabase)

Os cadastros feitos no painel precisam de um banco remoto para aparecerem para todos os visitantes. Para configurar:

1. Crie um projeto no [Supabase](https://supabase.com/).
2. No **SQL Editor** do projeto, execute o conteúdo de [`supabase/setup.sql`](./supabase/setup.sql). Ele cria a tabela, as regras de acesso e o bucket público das imagens, além de inserir os três empreendimentos de demonstração.
3. Em **Authentication**, desative o cadastro público de contas e crie o usuário administrativo.
4. No SQL Editor, conceda o papel administrativo à conta criada, substituindo o e-mail:

   ```sql
   update auth.users
   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
   where email = 'admin@seudominio.com';
   ```

5. Copie `.env.example` para `.env.local` e preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` com os valores do projeto em **Settings → API**. Use somente a chave pública/anon no frontend; nunca coloque a chave `service_role` no app.
6. Reinicie o servidor local. Para publicar, configure as mesmas duas variáveis no serviço de hospedagem e gere um novo deploy.

O acesso público pode consultar os empreendimentos, mas somente uma conta com papel `admin` pode criar, editar ou excluir. O painel usa autenticação do Supabase, não uma senha embutida no código.

Se já houver cadastros salvos no `localStorage` do navegador usado anteriormente, entre no painel pelo mesmo navegador e use **Importar dados deste navegador**. Essa ação copia para o banco os itens que ainda não existem; não consegue importar dados guardados em outro navegador ou perfil.

## Status: EM DESENVOLVIMENTO!