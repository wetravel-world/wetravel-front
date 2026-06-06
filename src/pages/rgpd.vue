<template>
  <div class="min-h-screen bg-wt-bg font-sans">
    <div class="max-w-3xl mx-auto px-4 py-10 md:py-16">

      <h1 class="font-serif text-[32px] md:text-[40px] font-semibold text-wt-ink tracking-[-0.6px] mb-2">
        Privacy Policy
      </h1>
      <p class="text-wt-sub text-[14px] mb-10">Last updated: {{ lastUpdated }}</p>

      <div class="flex flex-col gap-10">

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">1. Data Controller</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            WeTravel is the data controller for your personal data within the meaning of Regulation (EU) 2016/679
            (GDPR). For any questions regarding your data, you can contact us at:
            <a href="mailto:contact@we-travel.world" class="text-wt-coral font-medium no-underline hover:underline">contact@we-travel.world</a>.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">2. Data We Collect</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-4">We collect the following data:</p>
          <ul class="flex flex-col gap-2 pl-0 list-none">
            <li v-for="item in dataCollected" :key="item.label" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <span class="mt-[5px] w-2 h-2 rounded-full bg-wt-coral flex-shrink-0"></span>
              <span><span class="font-semibold text-wt-ink">{{ item.label }} —</span> {{ item.desc }}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">3. Purposes and Legal Bases</h2>
          <div class="overflow-x-auto rounded-xl border border-wt-line">
            <table class="w-full text-[14px] text-left border-collapse">
              <thead>
                <tr class="bg-wt-ink text-[#e9e0d4]">
                  <th class="px-4 py-3 font-semibold rounded-tl-xl">Purpose</th>
                  <th class="px-4 py-3 font-semibold rounded-tr-xl">Legal basis</th>
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
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">4. Retention Periods</h2>
          <ul class="flex flex-col gap-2 pl-0 list-none">
            <li v-for="item in retention" :key="item.label" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <span class="mt-[5px] w-2 h-2 rounded-full bg-wt-coral flex-shrink-0"></span>
              <span><span class="font-semibold text-wt-ink">{{ item.label }} —</span> {{ item.desc }}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">5. Data Recipients</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-3">
            Your data is never sold to third parties. It may be shared with the following sub-processors
            strictly within the scope of providing the service:
          </p>
          <ul class="flex flex-col gap-2 pl-0 list-none">
            <li v-for="item in recipients" :key="item.label" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <span class="mt-[5px] w-2 h-2 rounded-full bg-wt-coral flex-shrink-0"></span>
              <span><span class="font-semibold text-wt-ink">{{ item.label }}</span> — {{ item.desc }}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">6. International Transfers</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            Some of our sub-processors (e.g. AWS, Google) may transfer data outside the European Union.
            These transfers are governed by standard contractual clauses approved by the European Commission,
            in accordance with Article 46 of the GDPR.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">7. Cookies</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-3">
            WeTravel uses cookies for the following purposes:
          </p>
          <ul class="flex flex-col gap-2 pl-0 list-none">
            <li v-for="item in cookies" :key="item.label" class="flex gap-3 text-[15px] text-wt-sub leading-relaxed">
              <span class="mt-[5px] w-2 h-2 rounded-full bg-wt-coral flex-shrink-0"></span>
              <span><span class="font-semibold text-wt-ink">{{ item.label }}</span> — {{ item.desc }}</span>
            </li>
          </ul>
          <p class="text-[15px] text-wt-sub leading-relaxed mt-3">
            You can configure your browser to refuse cookies. Strictly necessary cookies
            (authentication) cannot be disabled without affecting the functionality of the service.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">8. Your Rights</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-4">
            Under the GDPR, you have the following rights over your personal data:
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div v-for="right in rights" :key="right.title"
              class="bg-white rounded-xl border border-wt-line px-4 py-4">
              <div class="font-semibold text-wt-ink text-[14px] mb-1">{{ right.title }}</div>
              <div class="text-wt-sub text-[13px] leading-relaxed">{{ right.desc }}</div>
            </div>
          </div>
          <p class="text-[15px] text-wt-sub leading-relaxed mt-4">
            To exercise these rights, send your request to
            <a href="mailto:contact@we-travel.world" class="text-wt-coral font-medium no-underline hover:underline">contact@we-travel.world</a>.
            We will respond within one month. If you are not satisfied with our response, you may lodge a
            complaint with your local data protection authority.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">9. Security</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            We implement appropriate technical and organisational measures to protect your data:
            TLS encryption in transit, bcrypt-hashed passwords, short-lived JWT tokens stored in
            <code class="bg-wt-line/50 px-1 rounded text-[13px]">httpOnly</code> cookies, and restricted access to
            production data. In the event of a data breach likely to create a risk to your rights, we will
            notify you within 72 hours in accordance with Article 33 of the GDPR.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-3">10. Changes</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed">
            We may update this policy at any time. The last updated date shown at the top of this page
            will be revised accordingly. For any material change, we will notify you by email or via
            an in-app notification.
          </p>
        </section>

        <section class="bg-white rounded-2xl border border-wt-line px-6 py-6">
          <h2 class="font-serif text-[21px] font-semibold text-wt-ink mb-1">Contact Us</h2>
          <p class="text-[15px] text-wt-sub leading-relaxed mb-4">
            For any questions about this policy or your personal data, reach out to us:
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
const lastUpdated = 'June 2026'

const dataCollected = [
  { label: "Account data", desc: "username, email address, hashed password — collected at registration." },
  { label: "Social login data", desc: "name, email, and Google profile photo — only if you choose to sign in with Google." },
  { label: "Reviews & scores", desc: "the text of your review and the welcome score you submit for a city." },
  { label: "Browsing data", desc: "pages visited, session duration, country of origin — collected via self-hosted Matomo." },
  { label: "Technical data", desc: "IP address, browser type, timestamps — retained in server logs." },
]

const legalBases = [
  { purpose: "Account creation and management", basis: "Performance of contract (Art. 6.1.b)" },
  { purpose: "Authentication and security", basis: "Legitimate interest (Art. 6.1.f)" },
  { purpose: "Publishing your reviews", basis: "Performance of contract (Art. 6.1.b)" },
  { purpose: "Audience analytics (Matomo)", basis: "Legitimate interest (Art. 6.1.f) — anonymised data" },
  { purpose: "Sending transactional emails", basis: "Performance of contract (Art. 6.1.b)" },
  { purpose: "Compliance with legal obligations", basis: "Legal obligation (Art. 6.1.c)" },
]

const retention = [
  { label: "Active account data", desc: "retained for the duration of the account." },
  { label: "Data after account deletion", desc: "deleted within 30 days, unless a legal obligation requires otherwise." },
  { label: "Published reviews", desc: "anonymised (username replaced with 'Deleted user') after account deletion." },
  { label: "Server logs", desc: "retained for 12 months for security purposes." },
  { label: "Matomo analytics data", desc: "retained for a rolling 13-month period." },
]

const recipients = [
  { label: "Cloud host (AWS / Cloudflare)", desc: "storage of data and images." },
  { label: "Google OAuth2", desc: "social authentication, only if you consent." },
  { label: "Matomo (self-hosted)", desc: "audience analytics, no data transferred to third parties." },
  { label: "Booking.com", desc: "clicks on affiliate links transmit an anonymous session identifier." },
]

const cookies = [
  { label: "Authentication", desc: "httpOnly cookie containing your JWT token — strictly necessary." },
  { label: "Preferences", desc: "language, theme — stored in localStorage, no expiry date." },
  { label: "Analytics (Matomo)", desc: "_pk_id / _pk_ses cookies to measure traffic — anonymised, no third-party sharing." },
]

const rights = [
  { title: "Right of access", desc: "Obtain a copy of all data we hold about you." },
  { title: "Right to rectification", desc: "Correct inaccurate or incomplete data." },
  { title: "Right to erasure", desc: "Request deletion of your account and data." },
  { title: "Right to portability", desc: "Receive your data in a structured, machine-readable format." },
  { title: "Right to object", desc: "Object to processing based on legitimate interest." },
  { title: "Right to restriction", desc: "Request that processing of your data be suspended." },
]
</script>
