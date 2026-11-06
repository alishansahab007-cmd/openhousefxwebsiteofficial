# Pocket Studio ecosystem navigation

The Pocket Studio spotlight previously sent visitors to /#services. Its primary action now preserves the complete public Pocket Studio package URL, with separate package/view query parameters and #packages anchor. A secondary Enter Production Studio action opens /studio on the same external origin. The optional secondary action is configured only for Pocket Studio.

Product copy is aligned with the requested creative workspace positioning. Orbital geometry, node order, selection state, connector animation, keyboard handling, screenshots, other product links and provider/backend configuration remain unchanged. No new media or dependency is added.

Validation: production build and its TypeScript stage passed; node --test tests/pocket-studio-navigation.mjs checks query semantics, separate destinations and unchanged product order. Browser verification/screenshots are recorded alongside the Studio 3.1 delivery. Production deployment requires review approval.
