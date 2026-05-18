#!/bin/bash
# Poženi: bash set-vercel-env.sh
# Doda vse env vars na Vercel production

ENV_FILE=".env.local"

while IFS= read -r line || [[ -n "$line" ]]; do
  # Preskoči komentarje in prazne vrstice
  [[ "$line" =~ ^#.*$ || -z "$line" ]] && continue

  KEY="${line%%=*}"
  VALUE="${line#*=}"

  # Preskoči placeholder vrednosti
  [[ "$VALUE" == *"placeholder"* || "$VALUE" == "http://localhost:3000" ]] && continue

  echo "→ Dodajam: $KEY"
  echo "$VALUE" | vercel env add "$KEY" production --force 2>/dev/null || \
  printf "%s" "$VALUE" | vercel env add "$KEY" production --force
done < "$ENV_FILE"

# APP_URL posebej (production vrednost)
echo "https://najindan.gudweb.si" | vercel env add NEXT_PUBLIC_APP_URL production --force

echo ""
echo "✓ Končano. Zdej poženi: vercel --prod"
