<template>
  <div class="min-h-screen bg-wt-bg font-sans">
    <div class="max-w-3xl mx-auto px-4 py-10 md:py-16">

      <h1 class="font-serif text-[32px] md:text-[40px] font-semibold text-wt-ink tracking-[-0.6px] mb-2">
        Conditions Générales d'Utilisation
      </h1>
      <p class="text-wt-sub text-[14px] mb-10">Dernière mise à jour : {{ lastUpdated }}</p>

      <div class="flex flex-col gap-10">

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">1. Objet</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            Les présentes Conditions Générales d'Utilisation (« CGU ») régissent l'accès et l'utilisation de la
            plateforme WeTravel, accessible à l'adresse
            <a href="https://we-travel.world" class="text-wt-coral font-medium no-underline hover:underline">we-travel.world</a>
            (ci-après « le Service »). WeTravel est un guide communautaire de voyage à destination des voyageurs
            noirs, de la diaspora africaine et des couples mixtes.
          </p>
          <p class="text-[15px] text-wt-sub leading-relaxed mt-3">
            En accédant au Service ou en créant un compte, vous acceptez sans réserve les présentes CGU.
            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le Service.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">2. Éditeur du Service</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            Le Service est édité par WeTravel. Pour tout contact :
            <a href="mailto:contact@we-travel.world" class="text-wt-coral font-medium no-underline hover:underline">contact@we-travel.world</a>.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">3. Accès au Service</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-3">
            Le Service est accessible gratuitement à toute personne disposant d'un accès à Internet.
            La consultation des villes et des scores de bienvenue ne nécessite pas de compte.
          </p>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            La création d'un compte est nécessaire pour publier un avis ou un score. Vous devez avoir au moins
            16 ans pour créer un compte, conformément à l'article 8 du RGPD.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">4. Création de compte</h2>
          <ul class="flex flex-col gap-2 pl-0 list-none">
            <li v-for="item in accountRules" :key="item" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <span class="mt-[5px] w-2 h-2 rounded-full bg-wt-coral flex-shrink-0"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
          <p class="text-[15px] text-wt-sub leading-relaxed mt-4">
            Vous êtes responsable de la confidentialité de vos identifiants et de toute activité effectuée
            depuis votre compte. Signalez immédiatement tout accès non autorisé à
            <a href="mailto:contact@we-travel.world" class="text-wt-coral font-medium no-underline hover:underline">contact@we-travel.world</a>.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">5. Contenus générés par les utilisateurs</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-4">
            En publiant un avis ou un score sur WeTravel, vous :
          </p>
          <ul class="flex flex-col gap-2 pl-0 list-none mb-4">
            <li v-for="item in contentRules" :key="item" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <span class="mt-[5px] w-2 h-2 rounded-full bg-wt-coral flex-shrink-0"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            WeTravel se réserve le droit de modérer, modifier ou supprimer tout contenu sans préavis,
            notamment si celui-ci contrevient aux présentes CGU ou porte atteinte à la mission du Service.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">6. Comportements interdits</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-3">Il est notamment interdit de :</p>
          <ul class="flex flex-col gap-2 pl-0 list-none">
            <li v-for="item in forbidden" :key="item" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <span class="mt-[5px] w-2 h-2 rounded-full bg-wt-coral flex-shrink-0 opacity-60"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
          <p class="text-[15px] text-wt-sub leading-relaxed mt-4">
            Tout manquement à ces règles peut entraîner la suspension ou la suppression définitive du compte,
            sans préavis ni remboursement.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">7. Propriété intellectuelle</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-3">
            Le Service, son code source, son design, ses logos et les contenus éditoriaux produits par WeTravel
            sont protégés par le droit d'auteur et restent la propriété exclusive de WeTravel.
            Toute reproduction ou exploitation sans autorisation préalable est strictement interdite.
          </p>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            Les contenus que vous publiez (avis, scores) restent votre propriété. Vous accordez à WeTravel
            une licence mondiale, non exclusive, gratuite et irrévocable pour les afficher, reproduire et
            distribuer dans le cadre du Service.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">8. Liens d'affiliation</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            WeTravel peut afficher des liens d'affiliation vers des partenaires (notamment Booking.com).
            Cliquer sur ces liens peut générer une commission pour WeTravel, sans surcoût pour vous.
            WeTravel n'est pas responsable des offres, prix ou conditions proposés par les partenaires.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">9. Disponibilité du Service</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            WeTravel s'efforce de maintenir le Service accessible 24h/24 et 7j/7, mais ne saurait être tenu
            responsable des interruptions dues à des opérations de maintenance, des pannes techniques ou des
            événements de force majeure. L'accès au Service peut être suspendu à tout moment sans préavis.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">10. Limitation de responsabilité</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-3">
            Les scores et avis publiés sur WeTravel reflètent uniquement les expériences personnelles des
            utilisateurs. Ils ne constituent pas une garantie de sécurité ou d'accueil et ne remplacent pas
            les sources officielles (Ministère des Affaires étrangères, etc.).
          </p>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            WeTravel ne saurait être tenu responsable de dommages directs ou indirects résultant de l'utilisation
            du Service ou de la confiance accordée aux contenus publiés par des tiers.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">11. Données personnelles et cookies</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            Le traitement de vos données personnelles est décrit dans notre
            <RouterLink to="/rgpd" class="text-wt-coral font-medium no-underline hover:underline">Politique de confidentialité</RouterLink>.
            L'utilisation des cookies est détaillée dans notre
            <RouterLink to="/cookies" class="text-wt-coral font-medium no-underline hover:underline">Politique de cookies</RouterLink>.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">12. Résiliation du compte</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            Vous pouvez supprimer votre compte à tout moment depuis les paramètres de votre profil ou en
            envoyant une demande à
            <a href="mailto:contact@we-travel.world" class="text-wt-coral font-medium no-underline hover:underline">contact@we-travel.world</a>.
            La suppression entraîne l'effacement de vos données personnelles dans un délai de 30 jours,
            conformément à notre politique de confidentialité.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">13. Modifications des CGU</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            WeTravel se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront
            informés de toute modification substantielle par e-mail ou notification dans l'application au moins
            15 jours avant l'entrée en vigueur des nouvelles conditions. La poursuite de l'utilisation du Service
            vaut acceptation des CGU modifiées.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">14. Droit applicable et juridiction</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            Les présentes CGU sont régies par le droit français. En cas de litige, et après tentative de résolution
            amiable, les tribunaux français seront seuls compétents. Conformément à l'article L. 612-1 du Code de la
            consommation, vous pouvez recourir gratuitement à un médiateur de la consommation.
          </p>
        </section>

        <section class="bg-white rounded-2xl border border-wt-line px-6 py-6">
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-1">Une question ?</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-4">
            Pour toute question relative aux présentes CGU, contactez-nous :
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
import { useSeo } from '@/composables/useSeo'

useSeo(() => ({
  title: 'Conditions Générales d\'Utilisation — WeTravel',
  description: 'Consultez les conditions générales d\'utilisation de WeTravel, la plateforme de voyage pour voyageurs noirs et couples mixtes.',
}))

const lastUpdated = 'juin 2026'

const accountRules = [
  'Vous vous engagez à fournir des informations exactes lors de l\'inscription.',
  'Un seul compte par personne est autorisé.',
  'Votre nom d\'utilisateur ne doit pas usurper l\'identité d\'une tierce personne.',
  'Votre mot de passe doit comporter au moins 8 caractères, une majuscule et un chiffre.',
]

const contentRules = [
  'Garantissez que vos avis sont basés sur des expériences personnelles réelles.',
  'Accordez à WeTravel le droit de les afficher sur la plateforme.',
  'Vous engagez à ne pas publier de contenus haineux, discriminatoires, diffamatoires ou illégaux.',
  'Acceptez que vos avis puissent être anonymisés en cas de suppression de votre compte.',
]

const forbidden = [
  'Publier des avis fictifs, achetés ou rédigés en échange d\'une contrepartie.',
  'Usurper l\'identité d\'un autre utilisateur ou d\'une organisation.',
  'Utiliser le Service à des fins commerciales sans accord préalable de WeTravel.',
  'Tenter d\'accéder de manière non autorisée aux systèmes informatiques de WeTravel.',
  'Publier des contenus racistes, sexistes, homophobes ou portant atteinte à la dignité humaine.',
  'Automatiser l\'extraction de données (scraping) sans autorisation écrite.',
  'Perturber le fonctionnement du Service par tout moyen technique.',
]
</script>
