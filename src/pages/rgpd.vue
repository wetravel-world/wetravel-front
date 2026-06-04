<template>
  <div class="min-h-screen bg-wt-bg font-sans">
    <div class="max-w-3xl mx-auto px-4 py-10 md:py-16">

      <h1 class="font-serif text-[32px] md:text-[40px] font-semibold text-wt-ink tracking-[-0.6px] mb-2">
        Politique de confidentialité
      </h1>
      <p class="text-wt-sub text-[14px] mb-10">Dernière mise à jour : {{ lastUpdated }}</p>

      <div class="flex flex-col gap-10">

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">1. Responsable du traitement</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            WeTravel est le responsable du traitement de vos données personnelles au sens du Règlement (UE) 2016/679
            (RGPD). Pour toute question relative à vos données, vous pouvez nous contacter à l'adresse :
            <a href="mailto:contact@we-travel.world" class="text-wt-coral font-medium no-underline hover:underline">contact@we-travel.world</a>.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">2. Données collectées</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-4">Nous collectons les données suivantes :</p>
          <ul class="flex flex-col gap-2 pl-0 list-none">
            <li v-for="item in dataCollected" :key="item.label" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <span class="mt-[5px] w-2 h-2 rounded-full bg-wt-coral flex-shrink-0"></span>
              <span><span class="font-semibold text-wt-ink">{{ item.label }} —</span> {{ item.desc }}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">3. Finalités et bases légales</h2>
          <div class="overflow-x-auto rounded-xl border border-wt-line">
            <table class="w-full text-[14px] text-left border-collapse">
              <thead>
                <tr class="bg-wt-ink text-[#e9e0d4]">
                  <th class="px-4 py-3 font-semibold rounded-tl-xl">Finalité</th>
                  <th class="px-4 py-3 font-semibold rounded-tr-xl">Base légale</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in legalBases" :key="row.purpose" :class="i % 2 === 0 ? 'bg-white' : 'bg-wt-bg'">
                  <td class="px-4 py-3 text-wt-ink">{{ row.purpose }}</td>
                  <td class="px-4 py-3 text-wt-sub">{{ row.basis }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">4. Durée de conservation</h2>
          <ul class="flex flex-col gap-2 pl-0 list-none">
            <li v-for="item in retention" :key="item.label" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <span class="mt-[5px] w-2 h-2 rounded-full bg-wt-coral flex-shrink-0"></span>
              <span><span class="font-semibold text-wt-ink">{{ item.label }} —</span> {{ item.desc }}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">5. Destinataires des données</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-3">
            Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec les sous-traitants
            suivants dans le strict cadre de la fourniture du service :
          </p>
          <ul class="flex flex-col gap-2 pl-0 list-none">
            <li v-for="item in recipients" :key="item.label" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <span class="mt-[5px] w-2 h-2 rounded-full bg-wt-coral flex-shrink-0"></span>
              <span><span class="font-semibold text-wt-ink">{{ item.label }}</span> — {{ item.desc }}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">6. Transferts hors UE</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            Certains de nos sous-traitants (ex. : AWS, Google) peuvent transférer des données en dehors de l'Union
            européenne. Ces transferts sont encadrés par des clauses contractuelles types approuvées par la Commission
            européenne, conformément à l'article 46 du RGPD.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">7. Cookies</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-3">
            WeTravel utilise des cookies pour les finalités suivantes :
          </p>
          <ul class="flex flex-col gap-2 pl-0 list-none">
            <li v-for="item in cookies" :key="item.label" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <span class="mt-[5px] w-2 h-2 rounded-full bg-wt-coral flex-shrink-0"></span>
              <span><span class="font-semibold text-wt-ink">{{ item.label }}</span> — {{ item.desc }}</span>
            </li>
          </ul>
          <p class="text-[15px] text-wt-sub leading-relaxed mt-3">
            Vous pouvez configurer votre navigateur pour refuser les cookies. Les cookies strictement nécessaires
            (authentification) ne peuvent pas être désactivés sans affecter le fonctionnement du service.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">8. Vos droits</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-4">
            Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div v-for="right in rights" :key="right.title"
              class="bg-white rounded-xl border border-wt-line px-4 py-4">
              <div class="font-semibold text-wt-ink text-[14px] mb-1">{{ right.title }}</div>
              <div class="text-wt-sub text-[13px] leading-relaxed">{{ right.desc }}</div>
            </div>
          </div>
          <p class="text-[15px] text-wt-sub leading-relaxed mt-4">
            Pour exercer ces droits, envoyez votre demande à
            <a href="mailto:contact@we-travel.world" class="text-wt-coral font-medium no-underline hover:underline">contact@we-travel.world</a>.
            Nous y répondrons dans un délai d'un mois. En cas de réponse insatisfaisante, vous pouvez introduire une
            réclamation auprès de la
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" class="text-wt-coral font-medium no-underline hover:underline">CNIL</a>.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">9. Sécurité</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :
            chiffrement TLS en transit, mots de passe hachés (bcrypt), tokens JWT à durée de vie courte stockés en
            cookies <code class="bg-wt-line/50 px-1 rounded text-[13px]">httpOnly</code>, accès restreint aux données
            de production. En cas de violation de données susceptible d'engendrer un risque pour vos droits, nous vous
            en informerons dans les 72 heures conformément à l'article 33 du RGPD.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">10. Modifications</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            Nous pouvons mettre à jour cette politique à tout moment. La date de dernière mise à jour figurant en haut
            de cette page sera modifiée en conséquence. En cas de changement substantiel, nous vous en informerons par
            e-mail ou via une notification dans l'application.
          </p>
        </section>

        <section class="bg-white rounded-2xl border border-wt-line px-6 py-6">
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-1">Nous contacter</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-4">
            Pour toute question concernant cette politique ou vos données personnelles, contactez-nous :
          </p>
          <a href="mailto:contact@we-travel.world"
            class="inline-flex items-center gap-2.5 bg-wt-coral text-white no-underline rounded-[13px] px-5 py-3 font-bold text-[15px] hover:opacity-90 transition-opacity">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            contact@we-travel.world
          </a>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const lastUpdated = 'juin 2026'

const dataCollected = [
  { label: "Données de compte", desc: "nom d'utilisateur, adresse e-mail, mot de passe haché — lors de l'inscription." },
  { label: "Données de connexion sociale", desc: "nom, e-mail et photo de profil Google — uniquement si vous choisissez la connexion Google." },
  { label: "Avis et scores", desc: "texte de votre commentaire et score de bienvenue que vous soumettez pour une ville." },
  { label: "Données de navigation", desc: "pages visitées, durée de session, pays d'origine — collectées via Matomo, hébergé par nos soins." },
  { label: "Données techniques", desc: "adresse IP, type de navigateur, horodatages — conservées dans les journaux serveur." },
]

const legalBases = [
  { purpose: "Création et gestion de votre compte", basis: "Exécution du contrat (art. 6.1.b)" },
  { purpose: "Authentification et sécurité", basis: "Intérêt légitime (art. 6.1.f)" },
  { purpose: "Publication de vos avis", basis: "Exécution du contrat (art. 6.1.b)" },
  { purpose: "Analyse d'audience (Matomo)", basis: "Intérêt légitime (art. 6.1.f) — données anonymisées" },
  { purpose: "Envoi d'e-mails transactionnels", basis: "Exécution du contrat (art. 6.1.b)" },
  { purpose: "Respect des obligations légales", basis: "Obligation légale (art. 6.1.c)" },
]

const retention = [
  { label: "Données de compte actif", desc: "conservées pendant toute la durée d'activité du compte." },
  { label: "Données après suppression du compte", desc: "supprimées sous 30 jours, sauf obligation légale contraire." },
  { label: "Avis publiés", desc: "anonymisés (nom d'utilisateur remplacé par 'Utilisateur supprimé') après suppression du compte." },
  { label: "Journaux serveur", desc: "conservés 12 mois à des fins de sécurité." },
  { label: "Données d'analyse Matomo", desc: "conservées 13 mois glissants." },
]

const recipients = [
  { label: "Hébergeur cloud (AWS / Cloudflare)", desc: "stockage des données et des images." },
  { label: "Google OAuth2", desc: "authentification sociale uniquement si vous y consentez." },
  { label: "Matomo (auto-hébergé)", desc: "analyse d'audience, sans transfert vers des tiers." },
  { label: "Booking.com", desc: "les clics sur les liens d'affiliation transmettent un identifiant de session anonyme." },
]

const cookies = [
  { label: "Authentification", desc: "cookie httpOnly contenant votre token JWT — strictement nécessaire." },
  { label: "Préférences", desc: "langue, thème — stockés en localStorage, pas de date d'expiration." },
  { label: "Analyse (Matomo)", desc: "cookie _pk_id / _pk_ses pour mesurer l'audience — anonymisé, aucun partage tiers." },
]

const rights = [
  { title: "Droit d'accès", desc: "Obtenir une copie de toutes les données que nous détenons sur vous." },
  { title: "Droit de rectification", desc: "Corriger des données inexactes ou incomplètes." },
  { title: "Droit à l'effacement", desc: "Demander la suppression de votre compte et de vos données." },
  { title: "Droit à la portabilité", desc: "Recevoir vos données dans un format structuré et lisible par machine." },
  { title: "Droit d'opposition", desc: "Vous opposer à un traitement fondé sur l'intérêt légitime." },
  { title: "Droit à la limitation", desc: "Demander la suspension du traitement de vos données." },
]
</script>
