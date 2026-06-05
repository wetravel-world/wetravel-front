<template>
  <div class="min-h-screen bg-wt-bg font-sans">
    <div class="max-w-3xl mx-auto px-4 py-10 md:py-16">

      <h1 class="font-serif text-[32px] md:text-[40px] font-semibold text-wt-ink tracking-[-0.6px] mb-2">
        Politique de cookies
      </h1>
      <p class="text-wt-sub text-[14px] mb-10">Dernière mise à jour : {{ lastUpdated }}</p>

      <div class="flex flex-col gap-10">

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">Qu'est-ce qu'un cookie ?</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, téléphone, tablette)
            lorsque vous visitez un site web. Les cookies permettent au site de mémoriser vos préférences,
            de maintenir votre session ouverte et de collecter des données d'utilisation anonymes.
          </p>
          <p class="text-[15px] text-wt-sub leading-relaxed mt-3">
            Conformément aux recommandations de la
            <a href="https://www.cnil.fr/fr/cookies-et-traceurs-que-dit-la-loi" target="_blank" rel="noopener noreferrer"
              class="text-wt-coral font-medium no-underline hover:underline">CNIL</a>
            et à l'article 82 de la Loi Informatique et Libertés, nous vous informons de l'utilisation
            des cookies sur WeTravel.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-4">Cookies utilisés sur WeTravel</h2>

          <div class="flex flex-col gap-5">
            <div v-for="category in cookieCategories" :key="category.title"
              class="bg-white rounded-2xl border border-wt-line overflow-hidden">
              <div class="px-5 py-4 border-b border-wt-line flex items-center justify-between gap-3">
                <div>
                  <div class="flex items-center gap-2 mb-0.5">
                    <h3 class="font-semibold text-wt-ink text-[16px]">{{ category.title }}</h3>
                    <span :class="[
                      'text-[11px] font-bold px-2 py-0.5 rounded-full',
                      category.required
                        ? 'bg-wt-coral/10 text-wt-coral'
                        : 'bg-wt-line text-wt-sub'
                    ]">
                      {{ category.required ? 'Strictement nécessaire' : 'Non essentiel' }}
                    </span>
                  </div>
                  <p class="text-[13px] text-wt-sub">{{ category.description }}</p>
                </div>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-[13px] text-left border-collapse">
                  <thead>
                    <tr class="bg-wt-bg">
                      <th class="px-4 py-2.5 font-semibold text-wt-ink">Nom</th>
                      <th class="px-4 py-2.5 font-semibold text-wt-ink">Finalité</th>
                      <th class="px-4 py-2.5 font-semibold text-wt-ink">Durée</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="cookie in category.cookies" :key="cookie.name"
                      class="border-t border-wt-line">
                      <td class="px-4 py-3 font-mono text-wt-ink text-[12px]">{{ cookie.name }}</td>
                      <td class="px-4 py-3 text-wt-sub">{{ cookie.purpose }}</td>
                      <td class="px-4 py-3 text-wt-sub whitespace-nowrap">{{ cookie.duration }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">Matomo Analytics</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-3">
            Nous utilisons <strong class="text-wt-ink">Matomo</strong>, un outil d'analyse d'audience
            respectueux de la vie privée. Contrairement à Google Analytics, Matomo :
          </p>
          <ul class="flex flex-col gap-2 pl-0 list-none mb-4">
            <li v-for="item in matomoAdvantages" :key="item" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <svg class="w-4 h-4 mt-0.5 text-wt-coral flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 12l5 5L20 6"/></svg>
              <span>{{ item }}</span>
            </li>
          </ul>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            Conformément aux
            <a href="https://www.cnil.fr/fr/cookies-analytiques-la-cnil-publie-de-nouvelles-lignes-directrices" target="_blank" rel="noopener noreferrer"
              class="text-wt-coral font-medium no-underline hover:underline">lignes directrices de la CNIL</a>,
            notre configuration Matomo est exemptée de consentement car les données sont anonymisées
            et non partagées avec des tiers.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">Comment gérer vos cookies ?</h2>

          <div class="flex flex-col gap-4">
            <div class="bg-white rounded-xl border border-wt-line px-5 py-4">
              <h3 class="font-semibold text-wt-ink text-[15px] mb-2">Via votre navigateur</h3>
              <p class="text-[14px] text-wt-sub leading-relaxed mb-3">
                Vous pouvez configurer votre navigateur pour accepter, refuser ou supprimer les cookies.
                Notez que la désactivation des cookies strictement nécessaires peut empêcher la connexion
                à votre compte.
              </p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <a v-for="browser in browsers" :key="browser.name"
                  :href="browser.url" target="_blank" rel="noopener noreferrer"
                  class="flex items-center gap-2 text-[13px] text-wt-coral font-medium no-underline hover:underline py-1">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  {{ browser.name }}
                </a>
              </div>
            </div>

            <div class="bg-white rounded-xl border border-wt-line px-5 py-4">
              <h3 class="font-semibold text-wt-ink text-[15px] mb-2">Opt-out Matomo</h3>
              <p class="text-[14px] text-wt-sub leading-relaxed">
                Vous pouvez vous opposer à la mesure d'audience Matomo en cochant la case ci-dessous.
                Un cookie de refus sera déposé pour mémoriser votre choix.
              </p>
              <div class="mt-3 flex items-center gap-3">
                <input type="checkbox" id="matomo-optout" v-model="matomoOptOut"
                  @change="toggleMatomoOptOut"
                  class="w-4 h-4 accent-wt-coral cursor-pointer" />
                <label for="matomo-optout" class="text-[14px] text-wt-ink cursor-pointer">
                  Je m'oppose à la collecte de données d'audience par Matomo
                </label>
              </div>
              <p v-if="matomoOptOut" class="text-[13px] text-wt-coral mt-2">
                ✓ Votre opposition est enregistrée. Matomo ne collectera plus de données vous concernant.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">Cookies tiers</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-4">
            WeTravel peut intégrer des contenus ou liens tiers susceptibles de déposer leurs propres cookies :
          </p>
          <div class="overflow-x-auto rounded-xl border border-wt-line">
            <table class="w-full text-[14px] text-left border-collapse">
              <thead>
                <tr class="bg-wt-ink text-[#e9e0d4]">
                  <th class="px-4 py-3 font-semibold rounded-tl-xl">Tiers</th>
                  <th class="px-4 py-3 font-semibold">Finalité</th>
                  <th class="px-4 py-3 font-semibold rounded-tr-xl">Politique</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in thirdParties" :key="row.name" :class="i % 2 === 0 ? 'bg-white' : 'bg-wt-bg'">
                  <td class="px-4 py-3 font-semibold text-wt-ink">{{ row.name }}</td>
                  <td class="px-4 py-3 text-wt-sub">{{ row.purpose }}</td>
                  <td class="px-4 py-3">
                    <a :href="row.policyUrl" target="_blank" rel="noopener noreferrer"
                      class="text-wt-coral font-medium no-underline hover:underline text-[13px]">
                      Voir →
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-[13px] text-wt-sub mt-3">
            WeTravel n'a pas de contrôle sur les cookies déposés par ces tiers. Veuillez consulter
            leurs politiques respectives pour en savoir plus.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">Mise à jour de cette politique</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            Nous pouvons mettre à jour cette politique de cookies pour refléter les évolutions du Service
            ou les exigences réglementaires. La date de dernière mise à jour est indiquée en haut de page.
          </p>
        </section>

        <section class="bg-white rounded-2xl border border-wt-line px-6 py-6">
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-1">Questions sur les cookies ?</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-4">
            Contactez-nous pour toute question relative à notre utilisation des cookies :
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
import { ref, onMounted } from 'vue'
import { useSeo } from '@/composables/useSeo'

useSeo(() => ({
  title: 'Politique de cookies — WeTravel',
  description: 'Découvrez comment WeTravel utilise les cookies et comment gérer vos préférences.',
}))

const lastUpdated = 'juin 2026'
const matomoOptOut = ref(false)

onMounted(() => {
  matomoOptOut.value = document.cookie.includes('mtm_consent_removed=1')
})

function toggleMatomoOptOut() {
  if (matomoOptOut.value) {
    document.cookie = 'mtm_consent_removed=1; path=/; max-age=31536000; SameSite=Lax'
    if (window._paq) window._paq.push(['optUserOut'])
  } else {
    document.cookie = 'mtm_consent_removed=; path=/; max-age=0'
    if (window._paq) window._paq.push(['forgetUserOptOut'])
  }
}

const cookieCategories = [
  {
    title: 'Authentification',
    required: true,
    description: 'Maintiennent votre session ouverte et sécurisent votre compte.',
    cookies: [
      { name: 'access_token', purpose: 'Token JWT d\'authentification', duration: '15 minutes' },
      { name: 'refresh_token', purpose: 'Renouvellement automatique de session', duration: '7 jours' },
    ],
  },
  {
    title: 'Analyse d\'audience (Matomo)',
    required: false,
    description: 'Mesure anonyme du trafic. Aucune donnée personnelle transmise à des tiers.',
    cookies: [
      { name: '_pk_id.*', purpose: 'Identifiant visiteur anonyme', duration: '13 mois' },
      { name: '_pk_ses.*', purpose: 'Session de navigation en cours', duration: '30 minutes' },
      { name: 'mtm_consent_removed', purpose: 'Mémorisation du refus Matomo', duration: '1 an' },
    ],
  },
]

const matomoAdvantages = [
  'N\'envoie aucune donnée vers des serveurs aux États-Unis.',
  'Anonymise les adresses IP avant stockage.',
  'Ne crée pas de profil publicitaire.',
  'Est hébergé sur notre propre infrastructure (Matomo Cloud EU).',
  'Respecte le droit à l\'opt-out sans affecter le fonctionnement du site.',
]

const browsers = [
  { name: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
  { name: 'Firefox', url: 'https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent' },
  { name: 'Safari', url: 'https://support.apple.com/fr-fr/guide/safari/sfri11471/mac' },
  { name: 'Edge', url: 'https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
  { name: 'Opera', url: 'https://help.opera.com/en/latest/web-preferences/#cookies' },
]

const thirdParties = [
  {
    name: 'Google Fonts',
    purpose: 'Chargement des polices de caractères',
    policyUrl: 'https://policies.google.com/privacy',
  },
  {
    name: 'Booking.com',
    purpose: 'Liens d\'affiliation pour la réservation d\'hébergements',
    policyUrl: 'https://www.booking.com/content/privacy.html',
  },
  {
    name: 'Unsplash',
    purpose: 'Photos des villes (CDN)',
    policyUrl: 'https://unsplash.com/privacy',
  },
]
</script>
