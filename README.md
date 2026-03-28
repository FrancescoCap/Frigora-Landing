# Frigora-Landing — Deploy su GitHub Pages

Questo repository contiene il sito statico; la GitHub Action sotto `.github/workflows/deploy.yml` pubblicherà automaticamente il contenuto su GitHub Pages al push sul branch `main`.

Passaggi rapidi per pubblicare

1. Crea un repository su GitHub (es. `Frigora-Landing`).

2. Esegui i comandi seguenti localmente (sostituisci `USERNAME/REPO`):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:USERNAME/REPO.git
git push -u origin main
```

3. Dopo il push l'Action correrà e pubblicherà il sito in pochi minuti. L'URL sarà `https://USERNAME.github.io/REPO/`.

Custom domain: crea un file `CNAME` nella root con il tuo dominio e configura i record DNS come indicato da GitHub.

Note:

- Se usi un branch diverso da `main`, aggiorna `.github/workflows/deploy.yml`.
- Vuoi che io esegua `git init` e il primo push qui? Dimmi e procedo.
