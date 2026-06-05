<template>
  <footer class="bg-wt-ink text-[#e9e0d4] px-4 md:px-14 pt-10 md:pt-12 pb-8">
    <div class="max-w-[1180px] mx-auto">
      <div class="flex flex-col md:flex-row justify-between gap-8 border-b border-white/10 pb-7 mb-5">
        <!-- brand -->
        <div class="max-w-xs">
          <div class="flex items-center mb-3">
            <img src="/logo.png" alt="WeTravel" width="40" height="27" class="h-8 w-auto" />
            <span class="font-serif text-xl font-semibold text-white tracking-[-0.3px]">WeTravel</span>
          </div>
          <p class="text-sm leading-relaxed text-[#b8ac9c] m-0">Helping black travellers and mixed-race couples find the places where they belong.</p>
        </div>
        <!-- links -->
        <div class="grid grid-cols-3 gap-6 md:flex md:gap-14">
          <div v-for="section in footerLinks" :key="section.heading">
            <div class="font-mono text-[11px] tracking-widest text-wt-peach uppercase mb-3">{{ section.heading }}</div>
            <div class="flex flex-col gap-2">
              <template v-for="link in section.links" :key="link.label">
                <RouterLink v-if="link.to" :to="link.to" class="text-sm text-[#cfc4b5] no-underline hover:text-white transition-colors">{{ link.label }}</RouterLink>
                <a v-else-if="link.href" :href="link.href" class="text-sm text-[#cfc4b5] no-underline hover:text-white transition-colors">{{ link.label }}</a>
                <span v-else class="text-sm text-[#cfc4b5] cursor-pointer">{{ link.label }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <span class="text-[13px] text-[#988c7c]">© {{ year }} WeTravel</span>
        <span class="font-mono text-[11px] text-[#988c7c] sm:max-w-[560px] leading-relaxed sm:text-right">
          Scores shown are community-driven data and do not represent official safety assessments of any city.
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
type FooterLink = { label: string; to?: string; href?: string }

const year = new Date().getFullYear()

const footerLinks: { heading: string; links: FooterLink[] }[] = [
  {
    heading: 'Discover',
    links: [
      { label: 'Explore cities' },
      { label: 'Top rated' },
      { label: 'New this month' },
      { label: 'Map' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Confidentialité', to: '/rgpd' },
      { label: 'CGU', to: '/terms' },
      { label: 'Cookies', to: '/cookies' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'contact@we-travel.world', href: 'mailto:contact@we-travel.world' },
    ],
  },
]
</script>
