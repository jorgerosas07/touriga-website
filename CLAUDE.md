@AGENTS.md

# ⚠️ MUITO IMPORTANTE — quando houver um domínio próprio (ou ao publicar com um)

O endereço do site está assumido como `https://touriga-website.vercel.app` em vários sítios. **Quando o cliente tiver um domínio próprio, lembrar o Jorge (jorgetouriga@gmail.com) logo que ele fale em domínio, em publicar ou em SEO, e fazer isto tudo:**

1. **Vercel:** definir a variável de ambiente `NEXT_PUBLIC_SITE_URL=https://<novo-domínio>` (Project → Settings → Environment Variables) e voltar a fazer deploy. Ela alimenta `metadataBase`, os canónicos, os `hreflang`, o `sitemap.xml`, o `robots.txt` e os dados estruturados (`src/lib/site.ts`).
2. **`public/llms.txt`:** os links estão escritos à mão com `touriga-website.vercel.app`. Trocar todos pelo novo domínio.
3. **Redirecionar** `touriga-website.vercel.app` para o novo domínio (Vercel → Domains), para não haver dois sites iguais para o Google.
4. **Google Search Console:** registar o novo domínio e enviar `https://<novo-domínio>/sitemap.xml`. Se já estava registado o endereço antigo, usar "Alteração de endereço".
5. **Google Business Profile** (ficha do Google Maps): pôr o novo endereço como site.
6. Pedir aos **importadores** e a quem já tem links para o site que atualizem para o novo domínio.
7. Confirmar a **imagem de partilha** (`public/og.jpg`) e os títulos colando o link novo no WhatsApp/LinkedIn.
8. Procurar no código por `vercel.app` e confirmar que já não sobra nenhum (`grep -rn "vercel.app" src public`).

## Também pendente antes do lançamento a sério
- **Importadores de exemplo** em `src/lib/importers.ts` (dados falsos, marcados "Exemplo"): trocar pelos contactos reais e tirar a etiqueta.
- **Traduções em PT e FR** (feitas por Claude, nunca revistas por quem domine a língua): texto do CEO, biografia, história da quinta, sexta geração, SEO.
- **Formulário de contacto** só abre o programa de email do visitante (`mailto:`); ligar a um serviço de envio a sério (ex.: Resend) com a chave guardada nas variáveis do Vercel.
- **Página `/compare`** (capturas das versões do site): apagar `public/compare/` e a entrada `compare` do `matcher` em `src/middleware.ts`.
- Fotos pedidas em melhor resolução: cápsula (876 px), foto da família (1066 px), vinho a salpicar (1167 px), garrafa Quinta da Touriga-Chã.

# 🔁 Refazer o SEO quando o site estiver acabado
O pacote de SEO (títulos e descrições em `src/dictionaries/*.json` → `seo`, `src/lib/seo.ts`, `src/lib/schema.ts`, `sitemap.ts`, `robots.ts`, `public/llms.txt`, `public/og.jpg`, textos `alts`) foi feito a meio da construção do site. **O Jorge pediu para o refazer quando o site estiver terminado**, para refletir o conteúdo final: secções e páginas finais, prémios e imprensa confirmados (com fonte), fichas técnicas, importadores reais e nomes definitivos. Lembrar o Jorge disto quando disser que o site está pronto. Avaliação online feita em 22/11/2026 (provisória, sem páginas abertas): Vivino 4,2 (≈8 370 avaliações; Chã 4,4, Puro 4,1), 95 pontos Parker/Squires para o 2013 por confirmar, Jancis Robinson com notas por ver, ouro no Concurso de Vinhos do Douro Superior (2011) e prémio de arquitetura do Douro por confirmar (ano?), nome legal a confirmar (INPI mostra "Casa Rosas - Vinhos, Unipessoal, Lda").

