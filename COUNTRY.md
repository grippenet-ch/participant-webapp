# Grippenet Suisse: country notes

Owned by this repo: `copier update` never touches this file. The shared setup is in [README.md](README.md).

## Pages and integrations

- Languages: fr (default), de, it, en (fallback). Date formats: `dd.MM.yyyy` (fr, de), `dd/MM/yyyy` (it).
- `/results` is a markdown page (`locales/<lang>/markdowns/results_template.md`) that iframes
  `https://storage.googleapis.com/grippenetch-results/Grippenet_incidence.html` and shows the
  `Grippenet_symptom_<lang>.png` images from the same bucket: `frame-src` entry in
  `nginx/snippets/csp.conf` (images are covered by `img-src https:`).
- Third parties: reCAPTCHA only (see `nginx/snippets/csp.conf`).

## Country code

- `src/theme/` (`ch-theme.scss`, `color-scheme.scss`): Grippenet colours (primary `#2586BA`),
  imported by `src/index.scss`. `src/index.tsx`: fr/de/it date locales, no country extensions.

## Deploy

- Image `grippenetch/participant-webapp`; staging and production use the same image.
  cluster-management `svcWebParticipant` needs `unprivileged: true` for the nginx-unprivileged
  image (port 8080).
- Minikube (`https://local.grippenet.ch`): `make docker ENV_FILE=.env.minikube` (its own reCAPTCHA key).
