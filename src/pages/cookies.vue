<template>
  <div class="min-h-screen bg-wt-bg font-sans">
    <div class="max-w-3xl mx-auto px-4 py-10 md:py-16">

      <h1 class="font-serif text-[32px] md:text-[40px] font-semibold text-wt-ink tracking-[-0.6px] mb-2">
        Cookie Policy
      </h1>
      <p class="text-wt-sub text-[14px] mb-10">Last updated: {{ lastUpdated }}</p>

      <div class="flex flex-col gap-10">

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">What is a cookie?</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            A cookie is a small text file placed on your device (computer, phone, tablet)
            when you visit a website. Cookies allow the site to remember your preferences,
            keep your session open, and collect anonymous usage data.
          </p>
          <p class="text-[15px] text-wt-sub leading-relaxed mt-3">
            In accordance with applicable privacy regulations, we inform you of the use
            of cookies on WeTravel.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-4">Cookies used on WeTravel</h2>

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
                      {{ category.required ? 'Strictly necessary' : 'Non-essential' }}
                    </span>
                  </div>
                  <p class="text-[13px] text-wt-sub">{{ category.description }}</p>
                </div>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-[13px] text-left border-collapse">
                  <thead>
                    <tr class="bg-wt-bg">
                      <th class="px-4 py-2.5 font-semibold text-wt-ink">Name</th>
                      <th class="px-4 py-2.5 font-semibold text-wt-ink">Purpose</th>
                      <th class="px-4 py-2.5 font-semibold text-wt-ink">Duration</th>
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
            We use <strong class="text-wt-ink">Matomo</strong>, a privacy-friendly analytics tool.
            Unlike Google Analytics, Matomo:
          </p>
          <ul class="flex flex-col gap-2 pl-0 list-none mb-4">
            <li v-for="item in matomoAdvantages" :key="item" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <svg class="w-4 h-4 mt-0.5 text-wt-coral flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 12l5 5L20 6"/></svg>
              <span>{{ item }}</span>
            </li>
          </ul>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            Our Matomo configuration is exempt from consent requirements because data is anonymised
            and not shared with third parties.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">How to manage your cookies?</h2>

          <div class="flex flex-col gap-4">
            <div class="bg-white rounded-xl border border-wt-line px-5 py-4">
              <h3 class="font-semibold text-wt-ink text-[15px] mb-2">Via your browser</h3>
              <p class="text-[14px] text-wt-sub leading-relaxed mb-3">
                You can configure your browser to accept, refuse, or delete cookies.
                Note that disabling strictly necessary cookies may prevent you from signing in
                to your account.
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
              <h3 class="font-semibold text-wt-ink text-[15px] mb-2">Matomo opt-out</h3>
              <p class="text-[14px] text-wt-sub leading-relaxed">
                You can opt out of Matomo audience measurement by checking the box below.
                A refusal cookie will be stored to remember your choice.
              </p>
              <div class="mt-3 flex items-center gap-3">
                <input type="checkbox" id="matomo-optout" v-model="matomoOptOut"
                  @change="toggleMatomoOptOut"
                  class="w-4 h-4 accent-wt-coral cursor-pointer" />
                <label for="matomo-optout" class="text-[14px] text-wt-ink cursor-pointer">
                  I object to audience data collection by Matomo
                </label>
              </div>
              <p v-if="matomoOptOut" class="text-[13px] text-wt-coral mt-2">
                ✓ Your opt-out has been saved. Matomo will no longer collect data about you.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">Third-party cookies</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-4">
            WeTravel may embed third-party content or links that may set their own cookies:
          </p>
          <div class="overflow-x-auto rounded-xl border border-wt-line">
            <table class="w-full text-[14px] text-left border-collapse">
              <thead>
                <tr class="bg-wt-ink text-[#e9e0d4]">
                  <th class="px-4 py-3 font-semibold rounded-tl-xl">Third party</th>
                  <th class="px-4 py-3 font-semibold">Purpose</th>
                  <th class="px-4 py-3 font-semibold rounded-tr-xl">Policy</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in thirdParties" :key="row.name" :class="i % 2 === 0 ? 'bg-white' : 'bg-wt-bg'">
                  <td class="px-4 py-3 font-semibold text-wt-ink">{{ row.name }}</td>
                  <td class="px-4 py-3 text-wt-sub">{{ row.purpose }}</td>
                  <td class="px-4 py-3">
                    <a :href="row.policyUrl" target="_blank" rel="noopener noreferrer"
                      class="text-wt-coral font-medium no-underline hover:underline text-[13px]">
                      View →
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-[13px] text-wt-sub mt-3">
            WeTravel has no control over cookies set by these third parties. Please refer to
            their respective policies for more information.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">Updates to this policy</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            We may update this cookie policy to reflect changes to the Service or regulatory requirements.
            The last updated date is shown at the top of this page.
          </p>
        </section>

        <section class="bg-white rounded-2xl border border-wt-line px-6 py-6">
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-1">Questions about cookies?</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-4">
            Contact us for any questions about our use of cookies:
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
  title: 'Cookie Policy — WeTravel',
  description: 'Learn how WeTravel uses cookies and how to manage your preferences.',
  canonical: 'https://we-travel.world/cookies',
}))

const lastUpdated = 'June 2026'
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
    title: 'Authentication',
    required: true,
    description: 'Keep your session open and secure your account.',
    cookies: [
      { name: 'access_token', purpose: 'JWT authentication token', duration: '15 minutes' },
      { name: 'refresh_token', purpose: 'Automatic session renewal', duration: '7 days' },
    ],
  },
  {
    title: 'Audience analytics (Matomo)',
    required: false,
    description: 'Anonymous traffic measurement. No personal data shared with third parties.',
    cookies: [
      { name: '_pk_id.*', purpose: 'Anonymous visitor identifier', duration: '13 months' },
      { name: '_pk_ses.*', purpose: 'Current browsing session', duration: '30 minutes' },
      { name: 'mtm_consent_removed', purpose: 'Stores Matomo opt-out preference', duration: '1 year' },
    ],
  },
]

const matomoAdvantages = [
  'Sends no data to servers in the United States.',
  'Anonymises IP addresses before storage.',
  'Does not build advertising profiles.',
  'Is hosted on our own infrastructure (Matomo Cloud EU).',
  'Respects the right to opt out without affecting site functionality.',
]

const browsers = [
  { name: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
  { name: 'Firefox', url: 'https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer' },
  { name: 'Safari', url: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac' },
  { name: 'Edge', url: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
  { name: 'Opera', url: 'https://help.opera.com/en/latest/web-preferences/#cookies' },
]

const thirdParties = [
  {
    name: 'Google Fonts',
    purpose: 'Loading web fonts',
    policyUrl: 'https://policies.google.com/privacy',
  },
  {
    name: 'Booking.com',
    purpose: 'Affiliate links for accommodation booking',
    policyUrl: 'https://www.booking.com/content/privacy.html',
  },
  {
    name: 'Unsplash',
    purpose: 'City photos (CDN)',
    policyUrl: 'https://unsplash.com/privacy',
  },
]
</script>
