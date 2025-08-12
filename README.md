
# QB Tiers 2025 — Pack prêt à déployer (iPhone-friendly)

Site Next.js pour voter les tiers des QB NFL (5 niveaux cliquables), classement global + par tier, temps réel via SSE, Postgres (Render), Prisma.

## 🚀 Déploiement 100% depuis iPhone

1. **Uploader ce ZIP sur GitHub**
   - Depuis Safari sur iPhone, crée un repo, clique « Add file » → « Upload files » → uploade le ZIP puis « Commit changes ».
   - Ou dézippe localement et uploade le dossier complet.

2. **Créer la base Postgres sur Render**
   - Va sur render.com → « New » → « PostgreSQL » → copie ta `DATABASE_URL`.

3. **Créer le Web Service**
   - « New » → « Web Service » → connecte ton GitHub → choisis ce repo.
   - **Build command** :
     ```
     npm ci && npx prisma migrate deploy && npm run build
     ```
   - **Start command** :
     ```
     npm run start
     ```
   - **Environment variables** :
     - `DATABASE_URL` = l’URL Postgres Render
     - `NODE_ENV` = `production`

4. **Créer l’index « 1 nom = 1 bulletin » et Seed QBs**
   - Dans l’onglet **Shell** du Web Service :
     ```
     npx prisma db execute --file ./prisma/add_ci_index.sql --schema ./prisma/schema.prisma
     npm run seed
     ```

5. **Tester**
   - Ouvre l’URL Render.
   - `/` : vote (saisis ton nom, choisis T1..T5 pour chaque QB, envoie).
   - `/leaderboard` : classement live.

## 🧠 Règles

- 1 bulletin **par nom** (insensible à la casse).
- 32 choix (un tier de 1 à 5 par QB).
- Classement : moyenne des tiers par QB → arrondi avec **.5 vers le meilleur tier** (ex: 3.5 ⇒ 3).

## 🗂️ Structure

- `app/` : pages et API (App Router).
- `app/api/stream` : SSE pour rafraîchir le leaderboard.
- `prisma/` : schéma + seed + index SQL.
- `styles/` `tailwind.config.ts` : thème NFL (bleu/rouge).

## ⚙️ Dév local (optionnel, pas sur iPhone)
```bash
cp .env.example .env  # renseigne DATABASE_URL
npm i
npm run migrate:dev
npx prisma db execute --file ./prisma/add_ci_index.sql --schema ./prisma/schema.prisma
npm run seed
npm run dev
```

---

✍️ Remarque : la liste des 32 QBs du seed correspond aux titulaires pressentis à la pré-saison 2025. Tu peux l’ajuster dans `prisma/seed.ts` en cas de changement.
