<template>
  <div class="min-h-screen bg-wt-bg font-sans">
    <div class="max-w-3xl mx-auto px-4 py-10 md:py-16">

      <h1 class="font-serif text-[32px] md:text-[40px] font-semibold text-wt-ink tracking-[-0.6px] mb-2">
        Terms of Service
      </h1>
      <p class="text-wt-sub text-[14px] mb-10">Last updated: {{ lastUpdated }}</p>

      <div class="flex flex-col gap-10">

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">1. Purpose</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            These Terms of Service ("Terms") govern access to and use of the WeTravel platform, available at
            <a href="https://we-travel.world" class="text-wt-coral font-medium no-underline hover:underline">we-travel.world</a>
            (the "Service"). WeTravel is a community travel guide for Black travelers, mixed-race couples,
            and travelers of colour.
          </p>
          <p class="text-[15px] text-wt-sub leading-relaxed mt-3">
            By accessing the Service or creating an account, you unconditionally accept these Terms.
            If you do not accept these Terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">2. Service Operator</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            The Service is operated by WeTravel. For any enquiry:
            <a href="mailto:contact@we-travel.world" class="text-wt-coral font-medium no-underline hover:underline">contact@we-travel.world</a>.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">3. Access to the Service</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-3">
            The Service is freely accessible to anyone with an internet connection.
            Browsing cities and welcome scores does not require an account.
          </p>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            An account is required to post a review or score. You must be at least
            16 years old to create an account.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">4. Account Creation</h2>
          <ul class="flex flex-col gap-2 pl-0 list-none">
            <li v-for="item in accountRules" :key="item" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <span class="mt-[5px] w-2 h-2 rounded-full bg-wt-coral flex-shrink-0"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
          <p class="text-[15px] text-wt-sub leading-relaxed mt-4">
            You are responsible for keeping your credentials confidential and for all activity carried out
            from your account. Report any unauthorised access immediately to
            <a href="mailto:contact@we-travel.world" class="text-wt-coral font-medium no-underline hover:underline">contact@we-travel.world</a>.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">5. User-Generated Content</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-4">
            By posting a review or score on WeTravel, you:
          </p>
          <ul class="flex flex-col gap-2 pl-0 list-none mb-4">
            <li v-for="item in contentRules" :key="item" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <span class="mt-[5px] w-2 h-2 rounded-full bg-wt-coral flex-shrink-0"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            WeTravel reserves the right to moderate, edit, or remove any content without notice,
            particularly if it violates these Terms or undermines the mission of the Service.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">6. Prohibited Conduct</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-3">The following are strictly prohibited:</p>
          <ul class="flex flex-col gap-2 pl-0 list-none">
            <li v-for="item in forbidden" :key="item" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <span class="mt-[5px] w-2 h-2 rounded-full bg-wt-coral flex-shrink-0 opacity-60"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
          <p class="text-[15px] text-wt-sub leading-relaxed mt-4">
            Any breach of these rules may result in the suspension or permanent deletion of the account,
            without notice or refund.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">7. Intellectual Property</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-3">
            The Service, its source code, design, logos, and editorial content produced by WeTravel
            are protected by copyright and remain the exclusive property of WeTravel.
            Any reproduction or use without prior authorisation is strictly prohibited.
          </p>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            Content you publish (reviews, scores) remains your property. You grant WeTravel
            a worldwide, non-exclusive, royalty-free, irrevocable licence to display, reproduce, and
            distribute it within the Service.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">8. Affiliate Links</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            WeTravel may display affiliate links to partners (including Booking.com).
            Clicking these links may generate a commission for WeTravel at no extra cost to you.
            WeTravel is not responsible for offers, prices, or conditions provided by partners.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">9. Service Availability</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            WeTravel endeavours to keep the Service available 24/7, but cannot be held liable for
            interruptions due to maintenance, technical failures, or force majeure events.
            Access to the Service may be suspended at any time without notice.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">10. Limitation of Liability</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-3">
            Scores and reviews published on WeTravel reflect only the personal experiences of users.
            They do not constitute a guarantee of safety or hospitality and do not replace official sources
            (foreign affairs ministries, travel advisories, etc.).
          </p>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            WeTravel cannot be held liable for direct or indirect damages resulting from use of
            the Service or reliance on content published by third parties.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">11. Personal Data & Cookies</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            The processing of your personal data is described in our
            <RouterLink to="/rgpd" class="text-wt-coral font-medium no-underline hover:underline">Privacy Policy</RouterLink>.
            Our use of cookies is detailed in our
            <RouterLink to="/cookies" class="text-wt-coral font-medium no-underline hover:underline">Cookie Policy</RouterLink>.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">12. Account Termination</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            You may delete your account at any time from your profile settings or by sending a request to
            <a href="mailto:contact@we-travel.world" class="text-wt-coral font-medium no-underline hover:underline">contact@we-travel.world</a>.
            Deletion results in the erasure of your personal data within 30 days,
            in accordance with our privacy policy.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">13. Changes to These Terms</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            WeTravel reserves the right to modify these Terms at any time. Users will be informed of any
            material change by email or in-app notification at least 15 days before the new Terms take effect.
            Continued use of the Service constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">14. Governing Law & Jurisdiction</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            These Terms are governed by applicable law. In the event of a dispute, and after an attempt at
            amicable resolution, the competent courts will have sole jurisdiction. You may also seek recourse
            through an approved consumer mediation body at no cost to you.
          </p>
        </section>

        <section class="bg-white rounded-2xl border border-wt-line px-6 py-6">
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-1">Have a question?</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-4">
            For any question about these Terms, contact us:
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
  title: 'Terms of Service — WeTravel',
  description: 'Read the Terms of Service for WeTravel, the travel platform for Black travelers and mixed-race couples.',
  canonical: 'https://we-travel.world/terms',
}))

const lastUpdated = 'June 2026'

const accountRules = [
  'You agree to provide accurate information when registering.',
  'Only one account per person is permitted.',
  'Your username must not impersonate another person or organisation.',
  'Your password must be at least 8 characters and include one uppercase letter and one number.',
]

const contentRules = [
  'Confirm that your reviews are based on genuine personal experiences.',
  'Grant WeTravel the right to display them on the platform.',
  'Agree not to post hateful, discriminatory, defamatory, or unlawful content.',
  'Accept that your reviews may be anonymised if you delete your account.',
]

const forbidden = [
  'Posting fake, paid, or incentivised reviews.',
  'Impersonating another user or organisation.',
  'Using the Service for commercial purposes without prior agreement from WeTravel.',
  'Attempting unauthorised access to WeTravel\'s systems.',
  'Publishing racist, sexist, homophobic, or otherwise dehumanising content.',
  'Automated data extraction (scraping) without written authorisation.',
  'Disrupting the Service by any technical means.',
]
</script>
